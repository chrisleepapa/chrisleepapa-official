#!/usr/bin/env python3
"""Persistent, API-key-free English-to-Korean news translator using an open model."""
import json
import re
import sys

MODEL_NAME = "Helsinki-NLP/opus-mt-en-ko"

def emit(value):
    sys.stdout.write(json.dumps(value, ensure_ascii=False) + "\n")
    sys.stdout.flush()

try:
    from transformers import MarianMTModel, MarianTokenizer
    import torch
    torch.set_num_threads(2)
    tokenizer = MarianTokenizer.from_pretrained(MODEL_NAME)
    model = MarianMTModel.from_pretrained(MODEL_NAME)
    model.eval()
except Exception as exc:
    emit({"error": "Could not load free local translation model: " + str(exc)})
    sys.exit(1)

def fix_translation(source, translated):
    text = re.sub(r"\s+", " ", translated).strip()
    src = source.lower()
    if re.search(r"\b(shooting|shot dead|shot and killed|gunfire|gunman|firearm|opened fire|fired shots|shot at)\b", src):
        text = re.sub(r"촬영\s*사건|총격\s*촬영|촬영", "총격", text)
    if "school shooting" in src and "총격" not in text:
        text = text.rstrip(" .…") + " (학교 총격 사건)"
    if re.search(r"\b(shot dead|shot and killed|killed by gunfire)\b", src):
        text = re.sub(r"총격당해\s*사망", "총에 맞아 사망", text)
    return text

for line in sys.stdin:
    try:
        request = json.loads(line)
        values = [str(x or "") for x in request.get("values", [])]
        if not values:
            emit({"values": []})
            continue
        inputs = tokenizer(values, return_tensors="pt", padding=True, truncation=True, max_length=512)
        with torch.inference_mode():
            generated = model.generate(**inputs, max_new_tokens=220, num_beams=4)
        translated = tokenizer.batch_decode(generated, skip_special_tokens=True)
        emit({"values": [fix_translation(source, target) for source, target in zip(values, translated)]})
    except Exception as exc:
        emit({"error": str(exc)})
