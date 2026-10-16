import json
import sys

import argostranslate.translate

values = json.load(sys.stdin)
if not isinstance(values, list) or not values:
    raise SystemExit("Expected a non-empty JSON array of English text segments.")

translated = [
    argostranslate.translate.translate(str(value), "en", "ko")
    for value in values
]
if any(not value or not any("\uac00" <= char <= "\ud7a3" for char in value) for value in translated):
    raise SystemExit("Local translator returned an empty or non-Korean segment.")

json.dump(translated, sys.stdout, ensure_ascii=False)
