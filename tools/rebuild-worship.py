from pathlib import Path
import json

p = Path('worship.html')
s = p.read_text(encoding='utf-8')

# Update SHOUT card from internal wording to a visitor-facing work description.
s = s.replace(
    '기존 Worship 아카이브에서 계속 보존하는 작품입니다. 새로운 찬양이 추가되어도 이 작품은 삭제하지 않습니다.',
    '함께 외치고 노래하며 예배하는 기쁨을 담은 영어 워십 작품입니다. 강한 리듬의 찬양부터 조용한 고백까지, 다양한 예배의 순간을 한 앨범에 담았습니다.'
)

# Visual roles for the existing album cards.
s = s.replace('<article class="album-card"><img class="album-cover" src="images/My hymn3.jpg"', '<article class="album-card album-featured"><img class="album-cover" src="images/My hymn3.jpg"', 1)
s = s.replace('<article class="album-card"><img class="album-cover" src="images/vol3.jpg"', '<article class="album-card album-shout"><img class="album-cover" src="images/vol3.jpg"', 1)

# Add a chronological journey without disturbing the existing album/story content.
if 'class="worship-journey"' not in s:
    marker = '<section><div class="section-heading"><span class="section-kicker">THE STORY BEHIND THE SONGS</span>'
    journey = '''<section class="worship-journey" aria-labelledby="journey-title">
<div class="section-heading"><span class="section-kicker">THE JOURNEY</span><h2 id="journey-title">나의 찬양이 걸어온 길</h2><p>한 곡의 고백에서 시작해 앨범이 되고, 다시 새로운 예배의 언어로 이어진 시간의 기록입니다.</p></div>
<div class="journey-track">
<article><span>01</span><b>FIRST CONFESSION</b><strong>Vol.1</strong><p>처음 마음을 노래로 기록한 첫 번째 고백.</p></article>
<article><span>02</span><b>DEEPER PRAISE</b><strong>Vol.2</strong><p>개인의 고백에서 함께 부르는 예배로 넓어진 찬양.</p></article>
<article class="current"><span>03</span><b>MY HYMN</b><strong>Vol.3</strong><p>나를 아시는 주님과 은혜, 천국의 소망을 담은 기록.</p></article>
<article><span>04</span><b>SHOUT</b><strong>Worship</strong><p>함께 외치고 노래하는 영어 워십의 또 다른 표현.</p></article>
</div></section>
'''
    if marker not in s:
        raise SystemExit('story marker not found')
    s = s.replace(marker, journey + marker, 1)

# Add the 15-track SHOUT lyric archive after Vol.3 and before the closing archive statement.
if 'id="shout-lyrics"' not in s:
    tracks = json.loads(Path('tools/shout-lyrics.json').read_text(encoding='utf-8'))
    parts = ['''<section id="shout-lyrics" class="shout-lyrics-section">
<div class="section-heading"><span class="section-kicker">SHOUT · LYRIC BOOK</span><h2>SHOUT · 15 TRACKS</h2><p>Shout 앨범의 전체 가사를 원문 그대로 기록합니다. 음악 제작 지시는 제외하고, 곡의 가사와 Verse · Chorus · Bridge 및 보컬 구성 표시는 보존했습니다.</p></div>
<div class="shout-archive-head"><div><span>WORSHIP ARCHIVE</span><h3>SHOUT</h3></div><strong>15 TRACKS</strong></div>
<div class="lyrics-book shout-book">''']
    for i, track in enumerate(tracks, 1):
        parts.append(f'''<details class="lyrics-item shout-track"><summary><span><span class="lyrics-title">{i:02d}. {track['title']}</span><span class="lyrics-meta">Shout · Worship Archive</span></span><span class="lyrics-arrow">＋</span></summary><div class="lyrics-body"><p>{track['lyrics']}</p></div></details>''')
    parts.append('</div></section>')
    shout = '\n'.join(parts) + '\n'
    marker = '<section class="final-note">'
    if marker not in s:
        raise SystemExit('final-note marker not found')
    s = s.replace(marker, shout + marker, 1)

# Remove old internal cleanup notes from existing lyric books.
for token in ('\n[아웃트로 제외]', '[아웃트로 제외]', '\n[Instrumental Outro 제외]', '[Instrumental Outro 제외]'):
    s = s.replace(token, '')

# Archive-focused visual layer.
if '/* === WORSHIP ARCHIVE REDESIGN === */' not in s:
    css = r'''/* === WORSHIP ARCHIVE REDESIGN === */
.worship-journey{margin-top:10px;padding:6px 0 20px}.journey-track{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative}.journey-track:before{content:"";position:absolute;left:8%;right:8%;top:26px;height:1px;background:linear-gradient(90deg,rgba(201,168,76,.15),rgba(201,168,76,.55),rgba(201,168,76,.15))}.journey-track article{position:relative;text-align:center;padding:0 18px}.journey-track article>span{position:relative;z-index:1;display:flex;width:52px;height:52px;margin:0 auto 18px;align-items:center;justify-content:center;border:1px solid rgba(201,168,76,.45);border-radius:50%;background:#08070c;color:var(--gold-light);font:700 .7rem Cinzel,serif}.journey-track article.current>span{background:var(--gold);color:#07060a;box-shadow:0 0 35px rgba(201,168,76,.22)}.journey-track b{display:block;color:var(--gold);font:600 .62rem Cinzel,serif;letter-spacing:.16em}.journey-track strong{display:block;color:#fff;font-family:'Noto Serif KR',serif;font-size:1rem;margin-top:6px}.journey-track p{margin:7px auto 0;color:#88838c;font-size:.78rem;line-height:1.75;max-width:180px;word-break:keep-all}.album-featured{grid-column:span 2;min-height:510px}.album-shout{border-color:rgba(201,168,76,.34);box-shadow:0 24px 80px rgba(0,0,0,.72),0 0 0 1px rgba(201,168,76,.06)}.album-shout .album-badge:after{content:'  ·  15 TRACKS';color:#77727a;letter-spacing:.16em}.album-shout .album-title{font-size:1.7rem}.album-shout .album-desc{max-width:650px}.shout-lyrics-section{margin-top:95px;padding-top:15px}.shout-archive-head{display:flex;align-items:end;justify-content:space-between;gap:20px;padding:28px 30px;margin-bottom:16px;border:1px solid rgba(201,168,76,.25);border-radius:20px;background:linear-gradient(120deg,rgba(201,168,76,.08),rgba(10,10,16,.75));box-shadow:0 18px 50px rgba(0,0,0,.35)}.shout-archive-head span{font:600 .62rem Cinzel,serif;letter-spacing:.25em;color:var(--gold)}.shout-archive-head h3{margin:5px 0 0;font:700 2rem Cinzel,serif;letter-spacing:.12em;color:#fff}.shout-archive-head strong{font:600 .72rem Cinzel,serif;letter-spacing:.18em;color:#8d8890}.shout-track{background:rgba(7,7,12,.78)}.shout-track[open]{background:rgba(12,10,16,.92);border-color:rgba(201,168,76,.38)}.shout-track .lyrics-title{font-family:Cinzel,'Noto Serif KR',serif;letter-spacing:.02em}.shout-track .lyrics-body{max-width:820px;margin:0 auto}.shout-track .lyrics-body p{font-family:Pretendard,'Noto Serif KR',sans-serif;color:#bcb6c0}.shout-book{gap:11px}.final-note{border-color:rgba(201,168,76,.25);box-shadow:0 25px 70px rgba(0,0,0,.4)}
@media(max-width:850px){.journey-track{grid-template-columns:1fr 1fr;gap:28px 0}.journey-track:before{display:none}.album-featured{grid-column:span 1}.album-shout{min-height:440px}.shout-archive-head{align-items:flex-start;flex-direction:column}.shout-archive-head strong{margin-top:-6px}}
@media(max-width:520px){.journey-track{grid-template-columns:1fr}.journey-track article{padding:0 8px}.journey-track article>span{width:46px;height:46px}.shout-lyrics-section{margin-top:70px}.shout-archive-head{padding:22px}.shout-archive-head h3{font-size:1.65rem}}
'''
    if '</style>' not in s:
        raise SystemExit('style marker not found')
    s = s.replace('</style>', css + '</style>', 1)

p.write_text(s, encoding='utf-8')
print('Worship rebuild complete:', len(tracks) if 'tracks' in locals() else 0, 'SHOUT tracks')
