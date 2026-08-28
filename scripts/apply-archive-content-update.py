from pathlib import Path

# One-time content migration for the develop branch.
# Adds Run it back to Music, adds 나의 찬양 Vol.3 without removing SHOUT,
# and adds SHOUT to the deterministic Chris Pick catalog.

# music.html
p = Path('music.html')
s = p.read_text(encoding='utf-8')
s = s.replace('등 9개 앨범 41곡.', '등 10개 작품 42곡.')
s = s.replace('9개 앨범 41곡.', '10개 작품 42곡.')
old = """            { title_ko: 'We own the Cup',  title_en: 'We own the Cup',    type_ko: '정규 앨범', type_en: 'Album',         albumId: '0sR4hKvhzN4U2GaQKx6Qek', cover: 'images/music.jpg', embedUrl: 'https://open.spotify.com/embed/album/0sR4hKvhzN4U2GaQKx6Qek' }\n"""
new = old + """            ,{ title_ko: 'Run it back', title_en: 'Run It Back', type_ko: '싱글', type_en: 'Single', albumId: '6zhb0e3KvoFY5pcefQUHA6', cover: 'images/music.jpg', embedUrl: 'https://open.spotify.com/embed/artist/6zhb0e3KvoFY5pcefQUHA6', externalUrl: 'https://open.spotify.com/artist/6zhb0e3KvoFY5pcefQUHA6' }\n"""
if old not in s: raise SystemExit('musicData anchor missing')
s = s.replace(old, new, 1)
old_item = '''                <div class="track-item" onclick="loadTrack(8,this,false)">\n                    <img class="track-thumb" src="images/music.jpg" alt="We own the Cup — 정규 앨범" loading="lazy">\n                    <div class="track-details"><h4>We own the Cup</h4><p>정규 앨범</p></div>\n                </div>\n'''
new_item = old_item + '''                <div class="track-item" onclick="loadTrack(9,this,false)">\n                    <img class="track-thumb" src="images/music.jpg" alt="Run it back — 싱글" loading="lazy">\n                    <div class="track-details"><h4>Run it back</h4><p>싱글</p></div>\n                </div>\n'''
if old_item not in s: raise SystemExit('music playlist anchor missing')
s = s.replace(old_item, new_item, 1)
old_link = """            if (mainExternalLink) {\n                mainExternalLink.href = `https://open.spotify.com/album/${track.albumId}`;\n            }\n"""
new_link = """            if (mainExternalLink) {\n                mainExternalLink.href = track.externalUrl || `https://open.spotify.com/album/${track.albumId}`;\n            }\n"""
if old_link not in s: raise SystemExit('music external anchor missing')
s = s.replace(old_link, new_link, 1)
anchor = '''    <section style="max-width:960px; margin:0 auto 60px; padding:0 24px;">'''
insert = '''    <section style="max-width:960px; margin:0 auto 60px; padding:0 24px;">\n        <div style="border:1px solid rgba(201,168,76,0.2); border-radius:20px; padding:28px 32px; background:rgba(10,10,18,0.65); margin-bottom:22px;">\n            <div style="font-family:'Cinzel',serif; color:#c9a84c; font-size:0.72rem; letter-spacing:2px; margin-bottom:8px;">✦ NEW RELEASE</div>\n            <h2 style="color:#fff; font-size:1.5rem; margin:0 0 8px;">Run it back</h2>\n            <p style="color:#a8a4a0; font-size:0.9rem; line-height:1.8; margin:0 0 18px;">Chris LEE.PAPA의 최신 음악 작품입니다. 공식 Spotify 아티스트 페이지에서 감상할 수 있습니다.</p>\n            <div style="display:flex; gap:10px; flex-wrap:wrap;">\n                <a href="https://open.spotify.com/artist/6zhb0e3KvoFY5pcefQUHA6" target="_blank" rel="noopener" class="external-link-btn" style="margin-top:0;">Spotify ›</a>\n                <a href="https://youtube.com/channel/UC8d10MWy04bKDpdwA0DZ9aA" target="_blank" rel="noopener" class="external-link-btn" style="margin-top:0;">YouTube ›</a>\n            </div>\n        </div>\n'''+anchor
if anchor not in s: raise SystemExit('music archive anchor missing')
s = s.replace(anchor, insert, 1)
p.write_text(s, encoding='utf-8')

# worship.html
p = Path('worship.html')
s = p.read_text(encoding='utf-8')
s = s.replace('Vol.1(The First Confession), Vol.2(2nd Confession).', 'Vol.1(The First Confession), Vol.2(2nd Confession), Vol.3. Shout는 English Worship 작품으로 별도 보존됩니다.')
s = s.replace('나의 찬양 Vol.1 · Vol.2.', '나의 찬양 Vol.1 · Vol.2 · Vol.3 · Shout.')
anchor = '''    <div class="album-card" onclick="openModal('vol3')">'''
newcard = '''    <a class="album-card" href="https://open.spotify.com/artist/6zhb0e3KvoFY5pcefQUHA6" target="_blank" rel="noopener" style="display:block; text-decoration:none;">\n      <img class="album-cover" src="images/My hymn3.jpg" alt="나의 찬양 Vol.3 앨범 커버" loading="lazy" onerror="this.style.display='none'">\n      <div class="album-cover-overlay"></div>\n      <div class="album-info">\n        <span class="album-vol-badge">Vol. 3 · Korean Worship</span>\n        <div class="album-title">나의 찬양 Vol. 3</div>\n        <div class="album-cta"><span>Spotify에서 듣기</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg></div>\n      </div>\n    </a>\n'''+anchor
if anchor not in s: raise SystemExit('worship card anchor missing')
s = s.replace(anchor, newcard, 1)
s = s.replace('<span class="album-vol-badge">Vol. 3 · English Worship</span>', '<span class="album-vol-badge">English Worship · SHOUT</span>', 1)
anchor2 = '''      <div style="margin-bottom:32px; padding-bottom:28px; border-bottom:1px solid rgba(255,255,255,0.06);">\n        <div style="display:flex; align-items:center; gap:14px; margin-bottom:16px;">\n          <div style="width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg,rgba(30,60,120,0.3),rgba(201,168,76,0.2));'''
vol3block = '''      <div style="margin-bottom:32px; padding-bottom:28px; border-bottom:1px solid rgba(255,255,255,0.06);">\n        <div style="display:flex; align-items:center; gap:14px; margin-bottom:16px;">\n          <div style="width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg,rgba(60,90,160,0.3),rgba(201,168,76,0.2)); border:1px solid rgba(100,140,220,0.3); display:flex; align-items:center; justify-content:center; font-family:'Cinzel',serif; color:#a8c8f0; font-size:0.7rem; font-weight:700; text-align:center; line-height:1.3; flex-shrink:0;">Vol.<br>3</div>\n          <div>\n            <h3 style="font-family:'Cinzel',serif; color:#e8d08a; font-size:0.9rem; letter-spacing:1px; margin-bottom:4px;">나의 찬양 Vol. 3<br><span style="font-size:0.78rem; opacity:0.8;">— 3rd Confession</span></h3>\n            <p style="color:#888; font-size:0.78rem;">Spotify · YouTube</p>\n          </div>\n        </div>\n        <p style="color:#b0acaa; font-size:0.9rem; line-height:1.9; word-break:keep-all; text-align:left;">\n          <strong style="color:#e8d08a;">나의 찬양 Vol. 3</strong>는 Chris LEE.PAPA의 워십 프로젝트를 이어가는 세 번째 찬양 앨범입니다. 삶과 믿음의 고백을 새로운 음악으로 담아낸 예배의 기록입니다. 앨범 이미지는 <strong style="color:#c9a84c;">My hymn3</strong>을 사용합니다.\n        </p>\n      </div>\n'''
if anchor2 not in s: raise SystemExit('worship SEO block anchor missing')
s = s.replace(anchor2, vol3block + anchor2, 1)
p.write_text(s, encoding='utf-8')

# Chris Pick
p = Path('js/home-chris-pick-v2.js')
s = p.read_text(encoding='utf-8')
needle = """    {type:'WORSHIP',icon:'♩',title:'나의 찬양 Vol.3',sub:'3rd Confession',desc:{ko:'Chris LEE.PAPA의 워십 프로젝트를 이어가는 세 번째 찬양 앨범입니다. 삶과 믿음의 고백을 담아낸 새로운 예배의 기록입니다.',en:'The third worship collection in the Chris LEE.PAPA worship project, carrying new expressions of faith and confession.'},image:'/images/My hymn3.jpg',href:'worship.html',action:{ko:'워십 보기',en:'View Worship'}},\n"""
add = needle + """    {type:'WORSHIP',icon:'♩',title:'Shout',sub:'English Worship',desc:{ko:'한국어 고백을 넘어 온 땅이 함께 외칠 수 있는 영어 워십으로 확장한 작품입니다.',en:'An English worship work expanding the confession into a song of praise for all nations.'},image:'/images/vol3.jpg',href:'worship.html',action:{ko:'워십 보기',en:'View Worship'}},\n"""
if needle not in s: raise SystemExit('Chris Pick Vol3 anchor missing')
s = s.replace(needle, add, 1)
p.write_text(s, encoding='utf-8')

print('Archive content update applied successfully.')
# Trigger marker: 2026-08-29
