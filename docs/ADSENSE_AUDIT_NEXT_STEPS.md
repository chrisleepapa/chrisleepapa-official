# Chris LEE.PAPA AdSense 점검 — 이어하기 메모

- 기준일: 2026-11-02
- 저장소: chrisleepapa/chrisleepapa-official
- 작업 브랜치: develop only. main은 2026-11-02에 당시 develop HEAD 21b891c15c97de48e6788fc4210ff9ce52ee7c44까지 동기화됨. 이후 감사 수정은 develop에만 반영.
- 운영 도메인: https://chrisleepapa.com
- 개발 도메인: https://develop.chrisleepapa.com
- 상세 조사 기록: docs/ADSENSE_AUDIT_HANDOFF_2026-10-30.md

## 현재 진행 상태 / 다음 단일 작업 — 2026-11-02 갱신

### 정적 소스 점검 완료/재검증
- 주요 콘텐츠 페이지 간 긴 본문 완전 일치 0건. 공통 브랜드/시리즈 배경과 실제 본문 복제를 구분했으며, Yul/Jung 및 Sister Squad 허브/작품 페이지는 서로 다른 역할과 내용을 유지.
- TuTuPuPuPiPi: Shorts 6편 고유 ID/설명, 캐릭터·세계관·OST·창작자 노트, 로컬 이미지/alt 확인. 즉시 수정 불필요.
- About: 중복되던 제작 과정 소개 문단과 미사용 한/영 번역 키 제거. 수정 커밋 78476b2d3fb03676911a36f5c057eda7f2192adf.
- sitemap 24개: canonical 24/24, robots index/follow 24/24, GTM script/noscript 각각 1회, 직접 AdSense loader 18개, loader 없는 페이지 6개. 수동 광고 슬롯/push 0개.
- sitemap 밖 루트 HTML 13개: 직접 AdSense loader/수동 슬롯/push 모두 0개. shop만 index/follow이며 sitemap 밖. 게임/기능 페이지는 noindex/no-follow.
- develop Vercel 미리보기 READY. develop.chrisleepapa.com/about HTTP 200 및 About 수정 HTML을 확인. 현재 develop HEAD와 배포 커밋 차이는 NEXT_STEPS 문서만 수정한 1개 커밋.

### 다음 단일 작업
실서비스 검증을 위해 현재 게시된 GTM-NGDTQNVG 버전과 제공된 export v2의 일치 여부, 실제 AdSense Auto ads 위치, Google Search Console의 발견/색인 URL을 확인한다. 이 세 항목은 Google 계정 데이터가 필요하며, 연결 또는 실제 화면 확인 전에는 미완료로 둔다. 그동안 preview의 브라우저 모바일/PC 및 동적 JS 테스트를 수행할 수 있는 범위에서 분리해 진행한다.

### 미완료 실서비스 검증
- 현재 게시된 GTM 컨테이너 버전과 export v2 비교.
- AdSense Auto ads 실제 노출 화면/위치 확인(승인 전 계정 상태를 가정하지 말 것).
- Google Search Console의 실제 발견/색인 URL 및 sitemap 상태.
- 실제 브라우저 모바일/PC 렌더링, 동적 JS 실행 및 외부 플레이어.

### 변하지 않는 범위
- AdSense 거절 사유: 복제 콘텐츠 / 가치가 별로 없는 콘텐츠.
- 성경·찬송 및 게임 실행 페이지는 광고 대상 콘텐츠 심사에서 제외.
- 소스 수정은 develop에서만 진행하고 main은 추가 지시 전까지 수정하지 않는다.
- 새 페이지 생성, 이미 끝난 페이지의 근거 없는 반복 수정 금지.

---

- 기준일: 2026-11-02
- 저장소: chrisleepapa/chrisleepapa-official
- 작업 브랜치: develop only. main은 2026-11-02에 당시 develop HEAD 21b891c15c97de48e6788fc4210ff9ce52ee7c44까지 동기화됨. 이후 감사 수정은 develop에만 반영.
- 운영 도메인: https://chrisleepapa.com
- 개발 도메인: https://develop.chrisleepapa.com
- 상세 조사 기록: docs/ADSENSE_AUDIT_HANDOFF_2026-10-30.md

## 현재 진행 상태 / 다음 단일 작업 — 2026-11-02 갱신

### 정적 소스 점검 완료/재검증
- TuTuPuPuPiPi: Shorts 6편의 고유 ID/설명, 캐릭터·세계관·OST·창작자 노트, 로컬 이미지/alt 확인. 즉시 수정 불필요.
- About: 중복되던 제작 과정 소개 문단 및 미사용 한/영 번역 키 제거. 수정 커밋 78476b2d3fb03676911a36f5c057eda7f2192adf.
- 광고 대상 주요 콘텐츠 페이지 간 긴 본문 문단 완전 일치 0건. Yul/Jung 및 Sister Squad 공통 세계관/프로필 구조는 서로 다른 캐릭터 서사·페이지 역할로 확인.
- sitemap 24개: canonical 24/24, robots index/follow 24/24, GTM script/noscript 각각 1회, 직접 AdSense loader 18개, loader 없는 페이지 6개. 수동 광고 슬롯/push 0개.
- sitemap 밖 루트 HTML 13개: 직접 AdSense loader/수동 슬롯/push 모두 0개. shop만 index/follow이며 sitemap 밖. 게임/기능 페이지는 noindex/no-follow.
- 제외 대상 6개: music, movie, bible, contact, privacy, terms. MIRACLE SHOT 게임은 goal.html(noindex/no-follow, loader 0), miracleshot.html은 별도 작품 소개(index/follow, loader 1).

### 다음 단일 작업
정적 소스 단계는 현재 점검표상 마무리 단계다. 다음은 실서비스 검증 준비: GTM-NGDTQNVG의 현재 게시 버전과 2026-10-30 제공 export v2의 일치 여부, AdSense Auto ads의 실제 노출 화면/위치, Search Console의 실제 발견·색인 URL을 각각 확인한다. 계정 연결이나 브라우저 접근이 불가능한 항목은 미완료로 유지하고, 정적 소스 결과를 실서비스 정상 판정으로 바꾸지 않는다.

### 미완료 실서비스 검증
- 현재 게시된 GTM 컨테이너 버전과 export v2 비교.
- AdSense Auto ads 실제 노출 화면/위치 확인(승인 전 계정 상태를 가정하지 말 것).
- Google Search Console의 실제 발견/색인 URL 및 sitemap 상태.
- 실제 브라우저 모바일/PC 렌더링, 동적 JS 실행 및 외부 플레이어.

### 변하지 않는 범위
- AdSense 거절 사유: 복제 콘텐츠 / 가치가 별로 없는 콘텐츠.
- 성경·찬송 및 게임 실행 페이지는 광고 대상 콘텐츠 심사에서 제외.
- 소스 수정은 develop에서만 진행하고 main은 추가 지시 전까지 수정하지 않는다.
- 새 페이지 생성, 이미 끝난 페이지의 근거 없는 반복 수정 금지.

---

- 기준일: 2026-11-02
- 저장소: chrisleepapa/chrisleepapa-official
- 작업 브랜치: develop only. main은 사용자 요청으로 2026-11-02에 당시 develop HEAD 21b891c15c97de48e6788fc4210ff9ce52ee7c44와 동기화됨. 이후 감사 수정은 develop에만 반영.
- 운영 도메인: https://chrisleepapa.com
- 개발 도메인: https://develop.chrisleepapa.com
- 상세 조사 기록: docs/ADSENSE_AUDIT_HANDOFF_2026-10-30.md

## 현재 진행 상태 / 다음 단일 작업 — 2026-11-02 최종 갱신

### 이번 단계 완료
- 주요 광고 대상 페이지 간 중복 본문 대조:
  - Home, About, Sister Squad Hub/1/2, Yul, Jung: 80자 이상 본문 문단 완전 일치 0건. Yul/Jung의 공통 프로필 서식은 있으나 캐릭터 능력·성격·성장 설명은 구분됨.
  - Journal 1~6: 정확히 일치하는 본문 문단 0건(공통 내비게이션 제외). 각 글의 주제와 본문은 구분되며 Journal 5 영어 본문도 확인.
  - Wallpaper, Worship, English Worship, TuTuPuPuPiPi, Miracle Shot 스토리 페이지: 긴 본문 문단 완전 일치 0건.
- TuTuPuPuPiPi: 6개 Shorts의 고유 제목/설명/영상 ID/링크, 한국어·영어 번역, 장면별 썸네일 alt 확인. 정적 HTML 제목도 구체적이며, 영상/OST 외에 캐릭터·세계관·창작자 노트가 존재.
- About: 반복되던 영어 아카이브 소개 문단과 미사용 번역 키 제거. 창작자 소개·제작 과정·프로젝트 안내·연혁 유지. 커밋 `78476b2d3fb03676911a36f5c057eda7f2192adf`.
- Miracle Shot 페이지 역할 구분: `miracleshot.html`은 풋살 성장 드라마의 작품 소개(광고 대상, loader 1개), `goal.html`은 실제 게임 실행 페이지(noindex/nofollow, loader 0개). 게임 페이지 광고 제외 원칙을 유지하고 작품 소개 페이지의 광고 로더는 유지.
- sitemap 24개 URL을 현재 develop HTML과 대조:
  - 직접 AdSense loader 18개: Home, Wallpaper, Sister Squad Hub/1/2, Yul, Jung, Miracle Shot 작품 소개, TuTuPuPuPiPi, Worship/English Worship, Journal 1~6, About.
  - 직접 AdSense loader가 없는 6개: Music, Movie, Bible, Contact, Privacy, Terms.
  - 24개 모두 수동 광고 슬롯 0개, 직접 `adsbygoogle.push` 0개.
  - sitemap 밖의 실제 게임 실행 페이지 `goal.html`도 AdSense loader/publisher ID 0개이며 `noindex, nofollow`.
- 실제 사이트맵의 콘텐츠 페이지 정적 점검은 진행했으나, Google의 실제 색인 결과 및 Google이 렌더링한 최종 화면을 확인한 것은 아니다.

### Vercel Preview 상태
- 프로젝트: `chrisleepapa-official`, 팀 `chrisleepapas-projects`.
- 현재 develop HEAD 확인값: `3b2fc3d8b2ac21690d37083aee8b11f318ae69e2`.
- 최근 확인된 Preview는 READY 상태이며 `develop.chrisleepapa.com` 별칭을 갖지만, 연결된 커밋은 `3a880e077cf51d58082613b71386cbdbd83d24bb`이다.
- GitHub 비교 결과 현재 develop HEAD는 해당 Preview 커밋보다 14개 커밋 앞서 있고, `about.html`, `miracleshot.html`, `tutupupupipi.html` 및 점검 문서가 달라져 있다. 따라서 이 Preview는 현재 develop 최신 코드의 검증본이 아니다.
- 현재 develop HEAD와 정확히 일치하는 READY 배포는 확인되지 않았다. 새 배포는 실행하지 않았다(사용자가 알려준 일일 배포 한도 고려).
- 따라서 최신 코드의 브라우저 모바일/PC 렌더링 및 실제 광고 위치는 미검증으로 유지한다.

### 다음 단일 작업
최신 develop HEAD의 Preview가 생성되어 READY가 되면 해당 Preview를 기준으로 모바일/PC 실제 화면을 확인한다. 특히 TuTuPuPuPiPi의 한국어/영어 전환·영상 재생, About의 중복 제거 후 레이아웃, Miracle Shot 작품 소개와 GOAL 게임의 역할/광고 제외 구분을 확인한다. 최신 코드 Preview가 준비되기 전에는 과거 Preview를 최신 검증본으로 취급하지 않는다.

### 미완료 실서비스 검증
- 최신 코드 Preview에서의 실제 브라우저 모바일/PC 렌더링과 동적 JS 실행.
- 현재 게시된 GTM 컨테이너 버전 및 Auto ads 실제 노출 위치.
- Google Search Console의 실제 발견/색인 URL 및 sitemap 상태.
- 위 항목은 정적 소스만으로 완료 처리하지 않는다.

### 변하지 않는 범위
- AdSense 거절 사유: 복제 콘텐츠 / 가치가 별로 없는 콘텐츠.
- 성경/찬송 악보·뷰어 및 실제 게임 실행 페이지는 광고 대상 콘텐츠 심사에서 제외. Worship/English Worship은 사용자가 제작한 오리지널 앨범/가사 아카이브로 별도 구분한다.
- 소스 수정은 develop에서만 진행하고 main은 추가 지시 전까지 수정하지 않는다.
- 새 페이지 생성, 이미 끝난 페이지의 근거 없는 반복 수정 금지.

---

- 기준일: 2026-11-02
- 저장소: chrisleepapa/chrisleepapa-official
- 작업 브랜치: develop only (main은 직전 사용자 요청으로 develop HEAD 21b891c15c97de48e6788fc4210ff9ce52ee7c44까지 동기화됨. 이후 점검 수정은 develop에서만 진행)
- 운영 도메인: https://chrisleepapa.com
- 개발 도메인: https://develop.chrisleepapa.com
- 상세 조사 기록: docs/ADSENSE_AUDIT_HANDOFF_2026-10-30.md

## 현재 진행 상태 / 다음 단일 작업 — 2026-11-02 갱신

### 이번 단계에서 완료
- 점검 문서와 최신 develop 소스를 대조하고, 성경·찬송 및 게임 실행 페이지를 광고 대상 콘텐츠 감사에서 제외하는 원칙을 재확인.
- tutupupupipi.html: 캐릭터/세계관 설명, Shorts 6편의 고유 설명과 영상 ID, 로컬 이미지/alt, 직접 광고 코드 상태를 재검증. 중복 영상 목록이나 즉시 수정할 저가치 요소가 없어 변경하지 않음.
- about.html: 창작 과정 설명 상자 안에서 앞선 문단과 의미가 중복되던 별도 소개 문단을 제거하고 한국어/영어 미사용 번역 키도 제거. 제작 과정 설명, 창작자 소개, 프로젝트 안내, 연혁은 유지. 수정 커밋 78476b2d3fb03676911a36f5c057eda7f2192adf.
- About 재검증: canonical/robots 유지, 직접 AdSense loader 1개, 중복 키/마크업 0개, 정적 본문 약 2,505자.

### 다음 단일 작업
광고 로더가 있는 주요 콘텐츠 페이지 사이의 실질적인 본문 유사도/반복 문구를 대조한다. 우선 홈·About·Sister Squad 허브/1·2·Yul·Jung을 비교하고, 공통 브랜드 소개나 탐색용 요약은 복제 콘텐츠로 오판하지 않는다. 실제로 같은 설명이 반복되는 경우에만 최소 수정한다.

### 미완료 실서비스 검증
- 실제 브라우저의 모바일/PC 렌더링과 동적 JS 실행.
- 현재 게시된 GTM 컨테이너 버전 및 Auto ads 실제 노출 위치.
- Google Search Console의 실제 발견/색인 URL 및 sitemap 상태.
- 위 항목은 정적 HTML만으로 완료 처리하지 않는다.

### 변하지 않는 범위
- AdSense 거절 사유 두 가지: 복제 콘텐츠 / 가치가 별로 없는 콘텐츠.
- 성경·찬송 및 게임 실행 페이지는 광고 대상 콘텐츠 점검에서 제외. miracleshot.html은 작품 소개이고 실제 게임은 goal.html임을 구분.
- 소스 수정은 develop에서만 진행하고, main은 사용자의 추가 지시 전까지 수정하지 않는다.
- 새 페이지를 만들거나 이미 확인한 페이지를 근거 없이 반복 수정하지 않는다.

---



## 2026-11-02 후속 수정 — Miracle Shot 작품/게임 광고 구분 및 About 중복 설명

- develop의 커밋 90a2490a06caa7dbfb7e86dd06129274d61e488f가 miracleshot.html에서 AdSense loader를 제거한 것을 확인했다. 그러나 이 파일은 풋살 성장 드라마의 작품 소개 페이지이며, 게임 실행 화면이 아니다. 사용자가 광고 대상에서 제외하라고 한 Miracle Shot 게임은 별도 goal.html이다.
- 실제 파일 대조: miracleshot.html은 제목 'MIRACLE SHOT — 기적을 차올리다', canonical https://chrisleepapa.com/miracleshot, robots index/follow인 작품·스토리 페이지다. goal.html은 제목 'MIRACLE SHOT — GOAL', robots noindex/nofollow인 게임 실행 화면이며 AdSense loader가 0개다. game.html도 noindex/nofollow 및 loader 0개다.
- 따라서 develop에서 miracleshot.html에 기존 게시자 ID(pub-3207219520058740)의 표준 AdSense loader 1개를 복구했다. 수정 커밋 1e2660867489fc86ea4206e7a41393af2a965d93, 최신 blob SHA ead83ef26257c077389700f703273cb18096147d.
- 재검증: miracleshot.html loader 1개 / index, follow / canonical 유지. goal.html loader 0개 / noindex, nofollow 유지. 게임 실행 화면에는 광고 코드를 넣지 않았고 작품 소개 페이지의 광고 적용만 복구했다.
- 별도 develop 커밋 78476b2d3fb03676911a36f5c057eda7f2192adf에서 About 페이지의 반복되는 영어 아카이브 소개 블록을 제거한 변경도 대조했다. 핵심 제작 과정 설명과 4개 콘텐츠 유형 목록은 유지되며, 중복 제목/문단이 정적 HTML 및 번역 사전에서 제거된 것을 확인했다. About loader는 1개 유지.
- 이번 단계는 develop에서만 수정/검증했다. main 및 운영 배포는 변경하지 않았다. 실제 브라우저/모바일/PC 렌더링, Auto ads 위치는 미검증이다.

### 다음 단일 작업
현재 develop HEAD의 Vercel Preview 배포 상태를 확인한다. 최신 코드 커밋까지 READY가 아니면 실서비스 UI 점검 완료로 표시하지 않는다. READY라면 Miracle Shot 스토리 페이지와 GOAL 게임 페이지가 구분되어 표시되는지, About의 중복 제거 후 한국어/영어 레이아웃이 정상인지 브라우저에서 확인한다.



## 2026-11-02 추가 수정 — TuTuPuPuPiPi 영상별 제목/썸네일 설명 유지

- 직전 develop 커밋 c55ebf3e2da82e6a26e390881af7d188c12a3410에서 `tutupupupipi.html`의 Shorts 6개 정적 제목과 alt를 에피소드별로 구체화한 변경을 확인했다.
- 후속 스크립트 대조에서 페이지 하단의 applyLanguage()가 언어 전환 시 썸네일 alt를 다시 'YouTube Shorts 영상 01~06' 형식으로 덮어쓰고, 재생 버튼/iframe title도 영상 번호만 표시하는 문제가 발견됐다. 즉, 정적 HTML의 alt 개선이 실제 JS 실행 후 유지되지 않는 구조였다.
- develop에서 `tutupupupipi.html`의 언어 적용 로직을 수정했다. 한국어/영어 각각 6개 에피소드별 구체적인 썸네일 alt 배열을 적용하고, 재생 버튼의 aria-label과 iframe title에도 번역 사전의 실제 에피소드 제목을 사용하도록 변경했다.
- 수정 커밋: f4c3113f647ccd9782cede181da8f9d30c10853e. 최신 blob SHA: fc7740fb4161a30a06e33da99174950f4489930a.
- 정적 재검증: 영상 카드 6개 유지, 각 영상 ID가 data-video-id/썸네일/YouTube 링크에 연결됨, 직접 AdSense loader 1개, 한국어/영어 설명 키 존재, 6개 한국어 alt 및 6개 영어 alt 문자열 존재, 기존의 일반 번호형 alt 덮어쓰기 코드 제거, iframe title과 재생 버튼 aria-label이 에피소드 제목을 사용함을 확인했다.
- 이 변경은 기존 영상/OST/캐릭터 콘텐츠를 삭제하지 않고 접근성 텍스트와 영상별 식별 정보를 보완한다. 영상 실제 장면과 설명의 일치, 언어 전환의 실제 브라우저 동작, 모바일/PC 배치 및 Auto ads 위치는 여전히 미검증이다.
- 이번 수정은 develop에만 반영했다. main/운영 배포는 변경하지 않았다.

### 다음 단일 작업
TuTuPuPuPiPi 수정 후 develop 소스의 최신 HEAD와 Vercel Preview 상태를 다시 대조한다. 현재 HEAD 배포가 READY가 되면 브라우저에서 한국어/영어 전환, 영상 6개 재생, 모바일/PC 레이아웃을 확인하고, 그 다음 남은 승인 전 GTM/Auto ads/GSC 검증으로 넘어간다.



## 2026-11-02 메인 반영 후 심사 준비 상태 재대조

- GitHub main과 develop의 현재 HEAD는 모두 21b891c15c97de48e6788fc4210ff9ce52ee7c44로 동일하다. 두 브랜치의 compare 결과도 identical(ahead 0 / behind 0)이다.
- 이번 확인은 GitHub 소스 반영 상태를 확인한 것이며, Vercel 운영 배포 완료를 뜻하지 않는다. Vercel에서 확인한 최신 Production 배포는 READY 상태이나 커밋이 이전 c5e491bb6b125eb00b1e871163c7d0fb7cca74e8이다. 현재 HEAD 21b891c와 일치하는 Production 배포는 조회되지 않았다. 최신 develop Preview 조회 결과도 현재 HEAD와 다른 커밋을 가리켜, 최신 소스의 실제 렌더링 검증은 미완료다.
- 2026-11-02 현재 정적 감사 범위는 sitemap 24개 URL과 sitemap 밖 루트 HTML 13개다. sitemap URL은 파일 존재 24/24, canonical 일치 24/24, index, follow 24/24, GTM script/noscript 각각 1회씩 확인 기록이 있다.
- sitemap 내 직접 AdSense loader는 18개 페이지에 각 1개이며, 6개 페이지(/music, /movie, /bible, /contact, /privacy, /terms)는 직접 loader가 없다. 전체 24개에서 수동 광고 슬롯과 직접 adsbygoogle.push는 0개다. sitemap 밖 루트 HTML 13개도 직접 loader/수동 슬롯/push가 모두 0개다.
- 직접 광고 로더가 있는 18개 페이지는 Home, About, Sister Squad 1·2·Hub, Yul, Jung, TuTuPuPuPiPi, Miracle Shot 스토리, Worship, English Worship, Wallpaper, Journal 1~6이다. 각 페이지의 정적 콘텐츠/중복 여부는 기존 상세 감사 기록에 있다. Bible/찬송 및 게임 실행 화면은 사용자 지정에 따라 광고 대상 콘텐츠 심사 목록에서 제외한다.
- 이번 대조에서 새롭게 발견된 누락 페이지나 추가 직접 광고 로더는 확인되지 않았다. 기존 조치(Movie Shorts 중복 목록 제거, Shop 작품별 설명 및 대비 보완, Sister Squad 허브 앵커 수정, Yul/Jung hero alt 보완 등)는 현재 감사 기록을 유지한다.
- 남은 승인 전 핵심 검증은 ① 현재 HEAD와 일치하는 Vercel 배포 확인 ② 실제 브라우저의 모바일/PC 및 동적 콘텐츠 표시 ③ 현재 게시 GTM 버전 확인 ④ Auto ads 실제 삽입 위치/화면별 광고 노출 확인 ⑤ Search Console의 실제 발견·색인·canonical 상태 확인이다. 확인 전까지 완료로 표시하지 않는다.
- Shop은 sitemap 밖이지만 index, follow이고 직접 광고 코드는 없다. 판매처 링크 중심의 얇은 디렉터리 가능성은 기존 위험 후보로 유지하되, 검색/판매 목적에 영향이 있으므로 임의로 noindex 전환하지 않는다.
- 이번 재대조에서는 사이트 HTML/JS를 추가 수정하지 않았다. 점검 문서만 갱신하며, main 소스와 Vercel 설정/배포는 별도로 변경하지 않는다.

### 다음 단일 작업
현재 HEAD 21b891c와 일치하는 Vercel 배포가 생성·완료되는지 확인한다. 배포가 준비되면 실제 브라우저에서 광고 대상 페이지를 모바일/PC로 열어 동적 콘텐츠·링크·광고 위치를 확인한다. 배포가 아직 없으면 실서비스 확인을 완료 처리하지 않고, 정적 감사 결과와 미완료 항목을 구분해 유지。

# Chris LEE.PAPA AdSense 점검 — 이어하기 메모

## 최신 작업 상태 — 2026-11-02 (main 동기화 이후)

- 사용자의 명시적 요청에 따라 2026-11-02에 `develop`을 `main`에 fast-forward 반영했다. 동기화 기준 커밋은 `21b891c15c97de48e6788fc4210ff9ce52ee7c44`이며, 당시 두 브랜치는 동일했다.
- 동기화 이후의 AdSense 점검 수정은 이 문서의 기존 원칙에 따라 `develop`에서만 진행한다. 따라서 이후 `main`은 동기화 기준 커밋을 유지하고, 새 점검 커밋은 develop에만 쌓인다. 다음 main 반영은 사용자의 별도 요청이 있을 때 진행한다.
- 이번 후속 점검에서 `tutupupupipi.html`의 영상 카드 정적 제목 6개를 실제 한국어 제목으로 교체하고, 6개 썸네일 alt를 각 영상의 고유한 장면 설명으로 구체화했다. 기존 한국어/영어 동적 번역, 영상 ID, 링크, OST, 페이지 구조는 유지했다.
  - 수정 커밋: `c55ebf3e2da82e6a26e390881af7d188c12a3410`
  - 재검증: 정적 제목 6개, 고유 Shorts ID 6개, 고유 Shorts 링크 6개, 구체적 alt 6개, 한국어/영어 번역 키 존재. 직접 AdSense loader 1개, 수동 슬롯 0개, adsbygoogle.push 0개.
- Journal 1~6을 나란히 대조했다. 각 본문 길이는 약 3,453~9,402자이며, 정확히 일치한 문단은 공통 Journal 내비게이션 문구뿐이었다. 주제는 가족 창작의 시작, 원고/AI 활용, POD 출판, 캐릭터·삽화, 퇴근 후 창작, Worship 창작 기록으로 구분된다. Journal 5의 영어 본문도 소스에서 확인했다. 수정 불필요.
- 사용자가 광고 대상에서 제외한다고 명시한 MIRACLE SHOT 게임 페이지에서 AdSense 로더와 게시자 ID가 남아 있는 것을 발견해 제거했다.
  - 수정 커밋: `90a2490a06caa7dbfb7e86dd06129274d61e488f`
  - 재검증: `miracleshot.html` 직접 AdSense loader 0, publisher ID 0, 수동 슬롯 0, adsbygoogle.push 0. GTM 1개, canonical 및 `index, follow`는 유지. 게임 기능과 검색 색인 설정은 변경하지 않았다.
- 이번 단계는 GitHub develop 정적 소스 검증이다. 전체 사이트맵 24개 URL의 광고 로더 수는 이번 개별 수정 이후 전체 재집계를 남겨 두며, 실제 브라우저/모바일 렌더링, 현재 게시 GTM, Auto ads 실제 위치, GSC 실색인 상태는 미검증이다. 배포/실서비스 확인 완료로 표시하지 않는다.
- 다음 단일 작업: sitemap 24개 페이지의 현재 AdSense 로더/게시자 ID 현황을 재집계하고, 사용자 지정 제외 페이지(Bible·Worship/찬송·게임 등)에 광고 코드가 남아 있지 않은지 최종 대조한다.

- 기준일: 2026-11-01
- 저장소: chrisleepapa/chrisleepapa-official
- 작업 브랜치: develop only
- 운영 도메인: https://chrisleepapa.com
- 개발 도메인: https://develop.chrisleepapa.com
- 상세 조사 기록: docs/ADSENSE_AUDIT_HANDOFF_2026-10-30.md

## 현재 진행 상태 / 최근 점검 결과 — 2026-11-02 후속 갱신

- 작업 브랜치: `develop` only. `main`은 변경하지 않는다.
- 이번 후속 점검에서 실제 수정한 파일:
  - `movie.html`: 동일 Shorts 8편을 반복 노출하던 두 번째 카드/목록 블록을 제거하고, 한국어·영어 소개 및 제작 과정 설명을 구체화했다. 각 Shorts URL이 카드 링크로 1회씩만 남는지 재검증했다.
  - `shop.html`: Sister Squad 1·2와 Miracle Shot의 작품별 줄거리/주제 설명을 한국어·영어로 추가했다. 새 설명의 글자색이 어두운 배경에서 낮은 대비로 보일 수 있어 밝은 텍스트 색으로 조정했다.
- Shop 최종 blob SHA: `cac9f3749650af6305034a239fab24dd9fca2408`; 수정 커밋: `9a747cb26bc6dd0e807de0e3c9e4c056356c6293`.
- Movie 최종 blob SHA: `a1efa0b8566ad51893ee654c2ee9b891674d54cc`.
- 재검증:
  - Movie Shorts 8개 각각 YouTube Shorts 링크 1개씩 확인. 반복 목록의 제목 표식은 더 이상 없음. Movie 직접 AdSense loader 0개.
  - Shop의 3개 작품 소개 키는 각각 마크업 1개와 한국어/영어 번역을 모두 확인. 직접 AdSense loader 0개. Shop은 sitemap 밖이며 `index, follow`이므로 검색/판매 목적을 고려한 별도 관리 후보로 유지한다.
  - About 페이지는 약 2,661자 규모의 독립적인 창작자 소개, 창작 철학, 제작 방식, 아카이브 안내, 연혁이 확인됨. 직접 AdSense loader 1개. 중복/저가치 즉시 수정 사유를 찾지 못해 변경하지 않음.
  - Wallpaper 페이지는 모바일 MP4 4개와 PC PNG 9개, 각 컬렉션의 사용 목적·개별 장면 설명·다운로드 안내·기기별 설정 가이드가 확인됨. 직접 AdSense loader 1개. 단순 파일 링크만 모은 화면은 아니며, 정적 소스에서 즉시 수정할 중복/저가치 문제는 발견하지 못함.
  - Journal 목록은 6개 상세 글로 연결되며 목록 자체는 직접 AdSense loader 0개. 상세 글 1~6은 각각 가족 창작의 시작, Skywork 제작 과정, POD 출판, 캐릭터/삽화, 퇴근 후 창작 루틴, Worship 창작 기록으로 주제가 구분됨. 문서 간 일부 배경 설명은 자연스러운 연결 수준이며, 상세 글의 주제 자체가 중복된다고 판단할 근거는 찾지 못함.
- 이번 단계는 GitHub develop 정적 소스 기준이다. 실제 브라우저에서의 모바일/PC 렌더링, 링크 클릭, 광고 Auto ads 위치, 실제 게시 GTM 버전은 확인하지 못했다. 배포/실서비스 확인 완료로 표시하지 않는다.
- 다음 단일 작업: Yul/Jung 프로필의 Unsplash hero 이미지 URL, alt, 주변 설명을 다시 대조하고 실제 로컬 이미지 에셋과의 역할 중복 여부를 확인한다. 이미지의 실제 표시/크롭은 브라우저 확인 전까지 미검증으로 유지한다.

## 최신 진행 상태 — 2026-11-02 추가 점검

- Yul/Jung 프로필 hero 이미지의 실제 로컬 에셋 `images/yul01.png`, `images/jung01.png`가 develop 트리에 존재함을 확인했다.
- 두 프로필 hero 이미지의 기존 alt가 각각 "Yul Profile" / "Jung Profile"로 지나치게 일반적이어서, `율(Yul) — Sister Squad 캐릭터 프로필 일러스트`, `정(Jung) — Sister Squad 캐릭터 프로필 일러스트`로 수정했다.
- 수정 커밋: Yul `c6b91acca548ff8c7eec58d435242e3cf18edc8b`, Jung `c82d4cb4c7d8e0c726b3fa9d49b4cef234c59cc9`. 각 페이지의 로컬 hero asset 경로, alt 변경, 13개 갤러리 이미지 및 직접 AdSense loader 1개를 재확인했다.
- Unsplash URL은 로컬 hero 이미지가 로드되지 않을 때의 fallback으로만 존재한다. 실제 브라우저에서 로컬 이미지 로드 성공 여부와 fallback 발동 여부는 미검증이다.
- Worship 정적 점검: `worship.html`에는 한국어 앨범 3집 합계 30개 lyric details, `worship_eng.html`에는 SHOUT 15개 lyric details가 존재한다. 각 페이지의 가사 본문은 모두 서로 다른 내용으로 확인되며, 중복 ID와 완전히 동일한 가사 본문은 발견하지 못했다. 한국어 Vol.3 안에서 일부 곡 제목("나를 아시는 주님", "천국을 향해")이 반복되지만 가사 본문은 각각 달라 동일 곡/복제 본문으로 판정하지 않았다.
- Worship 두 페이지는 각각 직접 AdSense loader 1개. 앨범 이야기/창작 방향/제작 방식 설명과 가사 아카이브가 함께 있어 단순 외부 스트리밍 링크 모음은 아니다. 이번 단계에서 수정하지 않았다.
- 다음 단일 작업: P0 콘텐츠 페이지의 중복·저가치 점검은 정적 소스 기준으로 거의 마무리 단계다. 다음은 남은 광고 대상 페이지와 점검 문서의 결과를 대조하고, 미완료 브라우저/Auto ads/GTM/GSC 검증을 분리해 최종 승인 전 체크리스트를 정리한다. 실서비스 검증은 접근·배포 확인이 가능한 시점까지 미완료로 유지한다.

## 브랜치 대조 — 2026-11-02 후속 확인

- GitHub 현재 develop HEAD: `62c95793fe7302e170c955146487d0cadf158f07`.
- GitHub 현재 main HEAD: `c5e491bb6b125eb00b1e871163c7d0fb7cca74e8`.
- GitHub compare `main...develop`: develop은 main보다 77개 커밋 앞서 있고, main 쪽에만 있는 커밋은 0개다.
- 이 차이는 이번 AdSense 점검 변경만을 의미하지 않고, 기존 develop 작업 전체를 포함한다. 따라서 develop을 main에 바로 덮어쓰지 않는다. main 반영은 사용자의 별도 지시 및 전체 차이 검토 후에만 한다.
- 현재 AdSense 점검 작업은 develop에만 수행 중이다. 운영 도메인 배포나 main 수정은 하지 않았다.

## 진행 원칙
1. 한 번에 한 항목만 점검한다. 소스 확인 → 근거 기록 → 판정 → 필요한 경우 최소 수정 → 재검증 순서.
2. 정적 소스 검사와 실제 브라우저/AdSense 광고 노출 검증을 구분한다. 확인하지 못한 항목은 정상이라고 단정하지 않는다.
3. 모든 소스 수정은 develop에서만 한다. 사용자의 확인·승인 전에는 main에 반영하지 않는다.
4. 사이트 기능을 임의로 삭제하거나 새 페이지를 만들지 않는다.
5. 이미 확인된 제작 도구·에셋 출처·구독·출시 관련 사실을 다시 묻지 않는다.
6. AdSense 콘텐츠 가치 점검과 저작권/서비스 약관 검토는 별도 트랙으로 유지한다.
7. 매 단계 종료 시 이 메모와 상세 조사 문서를 갱신해 다른 대화방에서도 이어갈 수 있게 한다.

## 완료한 점검
- AdSense 거절 사유(복제 콘텐츠, 가치가 낮은 콘텐츠)에 맞춰 점검 기준 재정렬.
- P0 창작/미디어 페이지 9개 정적 소스 1차 감사.
- robots.txt, sitemap 24개 URL, canonical/robots, AdSense 로더, 제공된 GTM JSON 정적 확인.
- P1 기능/운영/Journal/홈 페이지 정적 소스 1차 감사.
- Music 페이지의 동적 제작 노트 출력 경로 정적 확인(아래 결과).
- 결과와 세부 근거는 상세 조사 기록에 있음.
- 아직 실제 브라우저 렌더링, 모바일/PC 표시, Auto ads 위치, 동적 JS의 실제 실행, 실시간 GSC 결과는 검증되지 않음.

## 최근 단일 작업 결과 — Music 동적 제작 노트
**판정: 소스 구조상 정상 출력 경로가 확인됨. 실제 브라우저 동작은 미검증.**

확인한 develop 파일:
- `music.html` (blob SHA: `669ec9e374733abbfa8aa907f998112f65a9bf15`)
- `js/music-production-notes.js` (blob SHA: `ce9d57fe3a9dfe7fa1e9eb7e849e69d06d38e560`)
- `js/main.js`의 언어 설정 흐름

확인 결과:
1. `music.html`에 `.music-creation-notes` 컨테이너가 실제로 존재한다.
2. `js/music-production-notes.js?v=20261013`는 HTML 하단에서 한 번 로드되고, 그 다음 `js/main.js`가 로드된다. 두 스크립트 모두 페이지 마크업 뒤에 있어 DOM 컨테이너를 찾을 수 있는 순서다.
3. 제작 노트 스크립트는 작품별 데이터(`R`)를 이용해 제목, 출발점, 제작 방향, 감상 포인트, 참고용 재구성 프롬프트를 렌더링한다.
4. 기존 `.music-creation-notes` 영역을 새 섹션으로 교체하고, `#music-production-record-list`에 작품별 기록을 삽입한다. 기존 HTML에 별도의 정적 창작 과정 설명 영역도 남아 있다.
5. `main.js`는 저장된 언어를 `document.documentElement.lang`에 설정하고 언어 변경 시에도 해당 속성을 갱신한다. 제작 노트 스크립트는 이 속성을 감시하는 `MutationObserver`로 한국어/영어 내용을 다시 렌더링한다. 스크립트 실행 순서와 언어 변경 연결은 소스상 일관된다.
6. 제작 노트 스크립트가 로드되지 않으면 원래 HTML의 정적 `.music-creation-notes`가 남는 구조다. 다만 스크립트가 컨테이너를 교체한 뒤 런타임 오류가 발생하는 상황을 위한 별도 오류 복구 처리는 확인되지 않았다.
7. 스크립트 URL의 캐시 버전 문자열은 `20261013`이다. 이 날짜가 실제 파일 최종 변경일과 일치하는지는 Git 이력 확인 전에는 단정하지 않는다. 향후 해당 JS를 수정하면 쿼리 버전도 함께 갱신해야 오래된 브라우저 캐시를 피할 수 있다.

이번 항목에서는 파일을 수정하지 않았다. 브라우저에서 실제 한국어/영어 전환, 콘솔 오류, 모바일/PC 레이아웃, 제작 노트 전체 표시 여부는 아직 확인하지 못했다.

## 현재 진행 상태 / 다음 단일 작업 — 2026-11-02 갱신

### 완료한 정적 점검
- AdSense 거절 사유(복제 콘텐츠 / 가치가 별로 없는 콘텐츠)에 맞춘 기준 재정렬.
- sitemap 24개 URL 전체의 파일 존재, canonical, robots, GTM, AdSense 직접 로더, 수동 슬롯 및 push 코드 대조.
- sitemap 밖 루트 HTML 13개도 robots 및 광고 코드 확인. 게임/기능 페이지는 광고 코드가 없고 noindex 설정임.
- P0/P1 광고 대상 콘텐츠: Sister Squad 1·2·허브·Yul·Jung, TuTuPuPuPiPi, Worship/English Worship, Music, Movie, Wallpaper, Miracle Shot, Home, Journal 1~6, About, Shop 정적 검토.
- 개인정보처리방침 문구 수정 및 기존 점검 결과 기록.
- Sister Squad 허브의 잘못된 탐색 앵커 2개를 develop에서 수정하고 재검증.
- 상세 근거는 `docs/ADSENSE_AUDIT_HANDOFF_2026-10-30.md`의 2026-11-02 기록을 기준으로 한다.

### 현재 확인된 사이트 전체 코드 상태
- sitemap URL 24개 모두 canonical이 일치하고 `index, follow`.
- 24/24에 GTM 스크립트와 noscript가 각각 1개.
- 직접 AdSense loader 18개, 광고 코드 없는 페이지 6개: `/music`, `/movie`, `/bible`, `/contact`, `/privacy`, `/terms`.
- sitemap 밖 HTML 13개는 모두 직접 AdSense loader/수동 슬롯/push 0개. 그중 `/shop`만 `index, follow`이며 sitemap에는 없음.
- 제공된 GTM export version 2(2026-10-30)는 GA4 Google tag 1개만 포함. 현재 실시간 게시 버전은 미확인.

### 남은 확인 / 개선 후보
1. 실제 브라우저에서 develop의 모바일·PC 렌더링, 동적 스크립트, 외부 플레이어, 링크 클릭을 검증한다. 배포 한도 또는 브라우저 접근 제약이 있으면 미검증으로 유지한다.
2. 현재 게시된 GTM 컨테이너 및 AdSense Auto ads의 실제 광고 노출 위치를 확인한다. 정적 HTML만으로 광고 미노출을 확정하지 않는다.
3. Movie Archive의 동일 Shorts 8편 목록 반복, Music Archive의 제작 원칙 중복, Shop의 얇은 판매 링크 디렉터리 여부를 최소 수정 관점에서 재평가한다.
4. Yul/Jung 프로필의 Unsplash hero 이미지와 alt가 실제 화면에서 적절한지 확인한다.
5. Google Search Console에서 실제 발견/색인 URL과 sitemap 상태를 확인한다.

### 다음 단일 작업
**기존 점검 기록을 최종 대조하고, 위 남은 항목을 AdSense 승인 영향도 순으로 분류한다.** 소스 수정이나 main 반영은 실제 문제가 확인된 경우에만 진행하며, 모든 수정은 develop에서만 한다.

## 다음 대화에서 그대로 사용할 요청
“Chris LEE.PAPA AdSense 점검을 이어서 진행해. 먼저 docs/ADSENSE_AUDIT_NEXT_STEPS.md와 상세 조사 기록을 확인하고, ‘다음 단일 작업’ 하나만 차분히 진행해. 이미 확인한 사실은 다시 묻지 말고 develop만 작업하며 main은 건드리지 마.”


## 최근 단일 작업 결과 — Sister Squad 1 콘텐츠 및 내부 링크

**판정: 자체 콘텐츠는 존재하지만, 작품의 제작 과정을 연결하는 내부 링크 보완 가치가 있음. 페이지 소스 수정은 하지 않음.**

확인한 develop 파일:
- `sistersquad.html` (blob SHA: `55f470906420959643210364ff1a058cfe8f7af5`)
- `journal-1.html` (blob SHA: `ca500717656000ee8d5b95d92989283cbf552b5b`)
- `journal-2.html` (blob SHA: `0d6f4b608996fc725a5be8544eda1e0b4b67e216`)
- `journal-4.html` (blob SHA: `37ae95f2a66a77d6981835817cbbdff4c5d1af45`)

확인 결과:
1. Sister Squad 1 페이지에는 자체 줄거리, 율·정 캐릭터의 성격과 능력, 첫 모험의 갈등/교훈, 창작 배경이 포함되어 있다. 외부 영상/음원만 임베드한 페이지는 아니다.
2. 페이지 본문 텍스트는 태그·스크립트 제거 기준 약 1,391자다. 이 숫자 자체를 합격/불합격 기준으로 삼을 수는 없지만, Sister Squad 2와 허브 페이지에 비해 설명이 짧고 독립적인 작품 소개의 깊이는 상대적으로 얕다.
3. 첫 모험 설명과 스토리 설명은 일부 의미가 겹친다. 단순히 문장을 늘리기보다는 책의 핵심 갈등, 독자 대상, 자매가 실제로 어떤 선택을 하는지 등 아직 페이지에서 충분히 구체적이지 않은 내용만 보완하는 편이 낫다.
4. 페이지 상단에는 OST의 YouTube/Spotify 링크와 영어판 샘플/구매 링크가 먼저 나오고, 상세한 이야기와 캐릭터 설명은 그 아래에 배치되어 있다. 외부 링크가 자체 콘텐츠보다 먼저 강조되는 현재 순서는 사용자 경험상 재검토할 가치가 있다. 단, 링크 자체를 제거할 근거는 없다.
5. Sister Squad 페이지에는 Journal 1·2·4로 이어지는 창작 과정 내부 링크가 없다.
6. Journal 1은 이야기의 출발점과 가족 참여 배경, Journal 2는 실제 이야기 구성·프롬프트·초안 수정·퇴고 과정, Journal 4는 캐릭터 디자인·삽화 선택·일관성 검수 과정을 구체적으로 설명한다. 세 문서는 Sister Squad 1의 독창성과 사람의 창작 판단을 뒷받침하는 관련 자료다.
7. 따라서 가장 유용한 최소 보완은 작품 페이지에 '창작 과정 기록' 영역을 추가해 Journal 1·2·4로 연결하는 것이다. 가능하면 각 링크에 무엇을 확인할 수 있는지 짧은 설명을 붙인다. 본문을 무리하게 늘리거나 외부 링크를 삭제할 필요는 없다.

이번 단계에서는 소스 수정 없이 확인만 했다. 실제 화면에서 상단 미디어/구매 링크와 본문이 차지하는 비율, 모바일 배치는 브라우저 검증이 필요하다.

## 다음 단일 작업
**Sister Squad 1의 내부 링크 보완을 위한 최소 수정안을 확정한다.**

제안 범위:
- 작품 본문 아래에 '창작 과정 기록' 소영역을 추가.
- Journal 1(이야기의 시작), Journal 2(AI와 함께 원고를 구성·수정한 과정), Journal 4(캐릭터와 삽화 제작 과정)로 연결.
- 각 링크는 기존 실제 경로 `/journal-1`, `/journal-2`, `/journal-4`를 사용한다.
- 기존 OST, 영어판 샘플, 구매 링크 및 작품 콘텐츠는 삭제하지 않는다.
- develop에만 최소 수정하고 변경 후 링크 경로와 HTML 구조를 재검증한다. 사용자 승인 전에는 main에 반영하지 않는다.


## 최근 작업 결과 — Sister Squad 1 창작 과정 내부 링크 추가

<badge>develop 반영 및 소스 재검증 완료</badge>

- 수정 파일: `sistersquad.html`
- 커밋: `d9e467baa4a72380f137bc77e6d8300f0c4501be`
- 재조회 blob SHA: `98bd00534db409d03567b77ced28a27a1b386169`

적용 내용:
1. 기존 작품 소개 마지막에 '창작 과정 기록' 영역을 추가했다.
2. Journal 1: 이야기의 시작 — 가족의 경험에서 출발한 창작.
3. Journal 2: 원고 구성과 수정 — AI 초안을 선택하고 다듬은 과정.
4. Journal 4: 캐릭터와 삽화 — 디자인 기준과 검수 과정.
5. 한국어/영어 페이지 번역 키를 모두 추가했다.
6. 기존 OST, 영어판 샘플, 구매 링크와 기존 작품 소개는 유지했다.

재검증:
- 새 섹션 존재: 확인.
- Journal 링크 3개와 경로 `/journal-1`, `/journal-2`, `/journal-4`: 확인.
- 한국어 번역 키: 확인.
- 영어 섹션/번역 키: 확인.
- 기존 YouTube/Spotify OST 링크 유지: 확인.
- 실제 브라우저에서 링크 클릭 및 모바일/PC 레이아웃 확인: 미검증.

이번 수정은 develop에만 반영했다. main은 변경하지 않았다.

## 다음 단일 작업
**TuTuPuPuPiPi 페이지의 에피소드별 설명이 각 영상의 고유한 내용을 충분히 안내하는지 소스 기준으로 점검한다.**

대상: `tutupupupipi.html` 및 영상 카드 설명에 연결된 데이터/스크립트.

확인할 것:
- 6개 Shorts 각각의 소개 문구가 서로 구별되는지
- 각 문구가 실제 영상의 주제/캐릭터/상황을 설명하는지(소스에서 확인 가능한 범위만)
- 영상 임베드만 나열된 형태가 아닌지
- 한국어/영어 설명이 있는지
- 기존 OST/YouTube/Spotify 링크와 영상 기능을 유지할 수 있는지

우선 소스만 점검하고, 설명을 임의로 지어내지 않는다. 실제 영상 내용과 소스 문구가 연결되지 않으면 그 한계를 명시한다. 수정은 점검 결과를 정리한 뒤 필요한 최소 범위만 진행한다.


## 2026-10-31 추가 점검 — MIRACLE SHOT

**판정: 자체 콘텐츠 가치 양호. 정적 소스에서 발견한 캐릭터 라벨/내부 앵커 오류 2건을 develop에서 수정하고 재검증했다. 실제 브라우저 및 Auto ads 배치는 미검증.**

대상 파일 및 변경:
- `miracleshot.html`
  - 기존 콘텐츠, 캐릭터 소개 영역의 `<section class="character-grid">`에 `id="characters"` 추가.
  - 페이지 커밋: `fcee7e182c738e252f47d96e7db2ba0916da423e`
  - 최신 blob SHA: `0650eff2879391a81bfc767a14ec8a862ab473ce`
- `js/miracle-shot-story-v2.js`
  - 창작 이야기 영역의 캐릭터 이미지 4장(Hwang, Gil, Go, Young)에 붙는 표시 이름 배열이 실제 이미지 DOM 순서와 달랐다. 기존 `['영','황','길','고']`를 `['황','길','고','영']`로 수정.
  - 커밋: `5a445331841d0797a63b2fe64ac0e4c0e53f597f`
  - 최신 blob SHA: `9d369f9f225088ed0b28680d59b366a9bae39e70`
- `js/work-miracle-shot.js`
  - 동적 이야기 스크립트 URL의 캐시 버전을 `20261013`에서 `20261031`로 갱신.
  - 커밋: `cb487ec17725e33bf6800855645a249f6c406c89`
  - 최신 blob SHA: `19910c79560a818410c2c1ced2916d6b096a5b5c`
- `js/main.js`
  - 페이지별 브리지 스크립트 URL의 캐시 버전을 `20261013`에서 `20261031`로 갱신.
  - 커밋: `bd6d6c32e1929b1f1f1b8fb19fc0ce716ebb1144`
  - 최신 blob SHA: `1c080b107c570f4de489af482c8412d467fb4bb3`

콘텐츠 점검:
1. 작품 소개와 시놉시스, 코치의 실패/재도전, 네 아이의 첫 만남, 네 캐릭터의 성격·상처·재능이 독립적인 문장으로 설명되어 있다.
2. 별도 테마 영역에서 코치의 성장, 아이들의 차이가 팀의 강점이 되는 과정, 성경 인물과 연결한 성장 주제를 구체적으로 설명한다.
3. 페이지 하단의 SEO/작품 소개 영역은 작품 메시지, 현재 원고의 진행 범위(네 아이가 팀으로 처음 만나는 장면까지), 성경적 영감, 풋살을 선택한 이유, 창작자 소개를 포함한다.
4. `js/miracle-shot-story-v2.js`가 별도로 추가하는 창작 배경에는 교회 어린이부 교사 경험에서 출발한 기획 의도, 왜 풋살인지, 신앙 메시지를 담은 이유, 4단계 제작 과정, OST 확장, 아이들에게 전하고 싶은 메시지가 한국어/영어로 들어 있다.
5. 시각 자료는 캐릭터 이미지와 하이라이트 사진 18장. 사진의 alt는 현재 'Miracle Shot 하이라이트 N' 형태로 일반적이며, 이미지별 구체적인 장면을 확인하지 않고 설명을 임의로 만들면 안 된다. 접근성/이미지 검색 설명을 강화하려면 실제 장면을 확인한 후 각 alt를 구체화할 수 있다.
6. OST는 Spotify 앨범 임베드와 YouTube 재생목록 링크가 있다. 동적 이야기 영역에도 5곡의 테마 명칭이 표시된다.
7. 페이지 본문은 한국어/영어 번역 키를 포함하며, canonical은 `https://chrisleepapa.com/miracleshot`, robots는 `index, follow`다.

AdSense/기술 정적 확인:
- AdSense 로더: 1개.
- 수동 광고 단위(`ins.adsbygoogle`): 0개.
- 직접 `adsbygoogle.push` 호출: 0개.
- iframe 2개: Spotify 앨범 임베드 1개와 GTM noscript iframe 1개. 페이지 소스에서 YouTube 영상 임베드는 확인되지 않았고, YouTube는 재생목록 링크로 연결된다.
- 정적 HTML에 게임 플레이 UI는 없다. 동적 이야기 영역의 게임은 향후 확장 계획/COMING SOON 안내로 표현된다. 현재 페이지 전체가 공사 중이거나 콘텐츠 없는 화면은 아니다.
- Auto ads가 실제로 어디에 배치되는지, 게임 예고 카드나 미디어 근처에 광고가 표시되는지, 광고가 사용자 인터페이스로 오인되는지는 브라우저/AdSense 설정에서 별도 확인해야 한다.

수정 후 재검증:
- `#characters` 링크 대상 존재: 확인.
- 캐릭터 시각 자료 표시 이름과 DOM 이미지 순서 일치: 확인.
- 동적 이야기 JS 및 페이지 브리지 JS 캐시 버전 갱신: 확인.
- AdSense 로더 1개 / 수동 광고 단위 0개 / push 호출 0개: 확인.
- Spotify 임베드 및 YouTube 재생목록 링크 유지: 확인.
- 하이라이트 사진 18장 유지: 확인.
- 실제 브라우저에서 동적 스크립트 실행, 한국어/영어 전환, 모바일/PC 레이아웃, Auto ads 위치: 미검증.

이번 작업은 develop에만 반영했다. main은 변경하지 않았다.

## 다음 단일 작업
**TuTuPuPuPiPi 페이지의 6개 Shorts별 설명과 실제 콘텐츠 안내를 소스 기준으로 점검한다.**

대상: `tutupupupipi.html` 및 해당 페이지에서 사용하는 영상 카드 데이터/스크립트. 각 설명이 서로 구별되는지, 영상 주제와 연결되는지, 한국어/영어가 제공되는지, 영상 임베드 외에 독립적인 콘텐츠가 있는지 확인한다. 영상 내용을 확인할 근거가 없으면 설명을 임의로 보완하지 않는다.


## 2026-11-01 점검 결과 — TuTuPuPuPiPi
- develop의 `tutupupupipi.html` 정적 소스 점검 완료 (blob SHA: `28414f4e2700e48ba660679ffefc6e7ea9486c1e`).
- 독립적인 세계관/캐릭터/OST 소개와 6개 Shorts별 한·영 제목/설명이 확인됨.
- 초기 HTML의 영상 섹션 소개 문구와 카드 제목 기본값은 구체성이 부족해 개선 검토 필요.
- 실제 영상 장면과 설명 일치, 브라우저 렌더링, Auto ads 위치는 확인 불가로 유지.
- 사이트 코드는 수정하지 않음.

## 다음 단일 작업
**Movie 페이지의 독립적인 콘텐츠 가치와 영상 중심 구성 비중을 develop 소스 기준으로 점검한다.**


## 현재 작업 위치 — 2026-11-01 (이 절이 이전 '다음 단일 작업' 메모보다 우선)

- 최신 기준 문서: docs/ADSENSE_AUDIT_HANDOFF_2026-10-30.md의 2026-10-31 기준 재정렬 및 2026-11-01 추가 기록.
- 작업 브랜치: develop only. main/develop은 현재 GitHub compare에서 diverged (main 기준 develop ahead 2 / behind 1)이므로 동일하다고 간주하거나 자동 병합하지 않는다.
- 2026-11-01 재확인: develop sitemap 24개 URL, robots 전체 허용, ads.txt 게시자 라인 존재. Home은 AdSense 로더 1회. TuTuPuPuPiPi, Miracle Shot, Wallpaper는 각 AdSense 로더 1회, Bible은 로더 없음.
- TuTuPuPuPiPi 6개 Shorts별 한·영 제목/설명과 캐릭터·세계관·OST 콘텐츠는 정적 소스에서 확인. 영상 장면과 설명의 일치 및 실제 렌더링은 미검증. 코드 수정은 하지 않음.
- '골이예요'는 Miracle Shot 프로젝트와 연결된 게임이다. miracleshot.html 스토리 페이지와 게임 실행 화면을 혼동하지 말고 실제 게임 진입 경로를 별도로 확인한다.
- 기존 2026-10-16 Audit 1.0 Library 문서는 역사 기록이다. 현재 사이트 페이지 목록·작업 우선순위의 기준으로 재사용하지 않는다.

### 다음 단일 작업
Movie 페이지의 독립적인 콘텐츠 가치와 영상 중심 구성 비중을 develop 소스 기준으로 점검한다. 먼저 실제 파일·본문·영상별 제목/설명·출처/링크·AdSense 로더를 확인하고, 영상 재생과 Auto ads 위치는 별도 미검증으로 기록한다. 수정은 필요성이 확인된 최소 범위만 제안하며, 이 단계에서는 main을 건드리지 않는다.

### 새 대화에서 이어갈 때
“먼저 최신 docs/ADSENSE_AUDIT_NEXT_STEPS.md와 docs/ADSENSE_AUDIT_HANDOFF_2026-10-30.md를 읽고, 2026-11-01 현재 작업 위치의 다음 단일 작업인 Movie 페이지 정적 점검만 진행해. develop만 사용하고, 확인한 사실·근거·미검증 항목을 문서에 기록해. main과 사이트 코드는 승인 없이 수정하지 마.”


## 최근 단일 작업 결과 — Movie 페이지 정적 감사 (2026-11-01)

- 파일: movie.html (develop blob SHA: ddcfbd1685d3fea0d79dd2d2357e8725ccff0483)
- canonical: /movie, robots: index/follow.
- AdSense 로더 0회, 수동 광고 단위 0개.
- YouTube 메인 임베드 1개, Shorts 외부 링크 8개.
- FURIOUS, 귀멸의 칼날, 사랑한다고 등 3개 작품의 제작 노트가 한국어/영어로 존재하며 아이디어·제작 과정·배운 점을 설명한다.
- VERTICAL ARCHIVES의 Shorts 8개는 제목/썸네일/YouTube 링크 중심이며 카드별 독립 설명은 확인되지 않았다. 페이지 전체에는 3개 제작 노트가 있으므로 단순 링크 모음으로 단정하지 않는다.
- 귀멸의 칼날·체인소맨·주술회전 팬메이드 AI 영상의 별도 허락이 없다는 과거 사용자 확인과, 사용자가 영상을 유지하되 문제가 제기되면 내리겠다는 방침을 기존 상세 기록에서 재확인했다. 권리 문제는 별도 트랙으로 유지.
- Movie 페이지 광고 로더 제거 이력과 현재 소스의 0회가 일치한다. 코드 수정 없음.
- 실제 Preview/운영 페이지는 웹 접근 실패로 브라우저 렌더링·모바일/PC·영상 재생·Auto ads 위치 미검증.

## 브랜치 비교 최신화 참고
- Movie 점검 직후 문서 갱신 전 compare 결과: main/develop diverged, develop ahead 4 / behind 1. 비교 파일은 점검 문서 2개뿐이었다.
- 이번에도 develop 문서만 갱신하며 main은 수정하지 않는다. 문서 갱신 이후 ahead/behind 수치는 새 compare로 다시 확인하기 전까지 확정값으로 사용하지 않는다.

### 다음 단일 작업
Movie 페이지의 Preview 배포/실제 렌더링 확인 가능성을 검증한다. 접근이 불가능하면 미검증으로 남기고, 그 다음 Music/Worship 중 한 페이지씩 동적 본문과 실제 광고 위치를 점검한다.


## 2026-11-01 Vercel Preview 확인 결과

- Vercel 프로젝트: chrisleepapa-official (팀 chrisleepapas-projects).
- develop 브랜치 도메인 develop.chrisleepapa.com은 Vercel 프로젝트에 검증된 상태로 연결되어 있다.
- 직전 READY 배포는 commit 272a7313cc91a2f6bb7e1b1f686839b8ddaa9261이며, 해당 배포에 develop.chrisleepapa.com alias가 연결된 것을 확인했다.
- 최신 문서 커밋 244ed95bcd9d98f4243f3355c2b7cba02dedc6fb의 Preview 배포는 확인 시점에 BUILDING 상태였다. 따라서 최신 문서 커밋의 배포 완료를 확인하지 않았다.
- 브라우저 확인 도구로 develop.chrisleepapa.com/movie 및 READY Preview URL을 열려고 했으나 접근 오류가 발생했다. 이는 사이트 사용자에게도 접근 불가하다는 증거가 아니며, 본 점검 도구에서 실제 렌더링을 확인하지 못했다는 뜻이다.
- main/develop compare는 이 확인 시점에 diverged, develop ahead 6 / behind 1이었다. 비교된 파일은 두 AdSense 점검 문서뿐이었다. 이 수치는 해당 비교 시점의 값이며, 문서 갱신 커밋 이후 다시 비교해야 한다.
- 사이트 소스/광고 설정/main 변경 없음. Vercel 배포 또는 도메인 설정을 수동 변경하지 않았다.

### 다음 단일 작업
최신 develop Preview 배포가 READY가 되었는지 확인하고, 실제 브라우저 렌더링을 검증할 수 있는 경로가 있는지 확인한다. 보호된 배포 또는 도구 접근 한계로 실제 렌더링을 확인할 수 없다면 그 한계를 명시하고, 정적 소스 결과를 브라우저 검증 완료로 승격하지 않는다.


## 2026-11-01 최신 Preview 확인 완료

- 최신 develop 커밋 `291c5d07909b954fc108c3306e468797923c15f3`의 Vercel 배포가 `READY`임을 확인.
- `develop.chrisleepapa.com`과 고유 Preview URL의 별칭 연결 확인.
- 빌드 로그에 `Build Completed`, `Deployment completed` 확인. ESM→CommonJS 경고 1건은 있었으나 배포는 성공.
- 두 URL의 `/movie`를 브라우저 확인 도구로 열지 못함. 실제 DOM/화면·모바일/PC·영상 재생·콘솔·Auto ads 위치는 미검증으로 유지.
- 보호 우회 링크는 만료된 것으로 보이며, 설정이나 자격 증명은 변경하지 않음.
- 사이트 코드와 main은 변경하지 않음.

### 다음 단일 작업
**Music 페이지(`music.html`)의 초기 HTML 본문, 동적 제작 노트 출력 경로, 미디어/광고 요소를 develop 소스 기준으로 점검한다.** 우선 정적 소스만 검사하고 코드 수정은 하지 않는다. 실제 브라우저 렌더링과 Auto ads 위치는 미검증으로 구분한다.

### 새 대화에서 이어갈 때
“최신 AdSense 점검 문서 두 개를 확인하고, 다음 단일 작업인 Music 페이지 정적 점검만 진행해. 기존에 확인된 제작 노트 스크립트 실행 순서와 언어 전환 구조를 재사용하되 현재 소스에서 달라진 점이 있는지 확인해. develop만 사용하고 main과 사이트 코드는 승인 없이 수정하지 마.”


## 2026-11-01 Music 페이지 정적 점검 완료

- `music.html`, `js/music-production-notes.js`, `js/main.js`의 develop 소스를 재확인.
- canonical/robots 정상, AdSense 로더 1회, 수동 광고 단위 0개.
- 14개 작품 데이터, Spotify/YouTube 링크, 14개 작품별 한·영 제작 기록, 별도의 창작 판단 설명 3개 주제 확인.
- `#archive-list`에 트랙리스트를 출력하는 렌더러와 작품 소개를 출력하는 렌더러가 중복으로 같은 영역을 갱신한다. 현재 최종 화면은 작품 소개로 구성되는 구조이며, 트랙리스트 출력은 덮어써진다. 의도 확인 전에는 수정하지 않음.
- 실제 브라우저 렌더링, 모바일/PC, Spotify 재생, 콘솔, Auto ads 위치는 미검증.
- 페이지 코드는 수정하지 않음.

### 다음 단일 작업
**Worship 페이지(`worship.html`)의 정적 콘텐츠 가치, 동적/정적 가사·제작 설명, 광고 로더와 미디어 구성을 점검한다.** 우선 develop 소스만 읽고, 수정은 필요성이 확인된 경우 별도 판단한다.

### 새 대화에서 이어갈 때
“최신 AdSense 점검 문서 두 개를 확인하고, 다음 단일 작업인 Worship 페이지 정적 점검만 진행해. 이미 확인된 Music 페이지 사실은 다시 묻지 말고 develop만 사용해. main과 사이트 코드는 승인 없이 수정하지 마.”


## 2026-11-01 Worship 페이지 정적 점검 완료

- `worship.html` develop 소스 점검: canonical/robots 정상, AdSense 로더 1회, 수동 광고 단위 0개, 직접 push 호출 0개.
- GTM은 head 로더 + body noscript iframe 구조.
- 앨범 카드 4개, 앨범 제작 이야기 4개 주제, Vol.1~3 가사 총 30곡이 정적 HTML에 존재.
- 제작 배경 및 주요 앨범 소개는 한국어/영어 번역 데이터가 확인됨.
- Whispers Of Grace 네 번째 앨범 카드는 번역 키가 없어 한국어로 고정되는 구조. Spotify oEmbed로 앨범 커버를 동적 교체하며 실패 시 초기 OG 이미지가 남을 것으로 보이나 실제 브라우저 동작은 미검증.
- Vol.3 01/05번은 거의 동일한 가사(Solo/여성 중창), 06/08번도 유사 가사(남성 중창/혼성 듀엣)로 확인. 서로 다른 편곡 버전일 수 있어 중복 삭제하지 않고 버전 표기 개선 후보로 기록.
- 실제 브라우저 렌더링, 모바일/PC, 가사 펼치기, Spotify 이미지 요청, Auto ads 위치는 미검증.
- 사이트 코드와 main은 수정하지 않음.

### 다음 단일 작업
**Sister Squad 2 페이지의 독립적인 이야기/캐릭터/영상 설명과 링크 구성을 develop 소스 기준으로 점검한다.** 영상 카드별 설명, 캐릭터/세계관 소개, 영상 임베드와 외부 링크 비중, AdSense 로더를 확인한다. 실제 영상 장면과 설명 일치 여부는 소스만으로 단정하지 않는다.

### 새 대화에서 이어갈 때
“최신 AdSense 점검 문서 두 개를 확인하고 다음 단일 작업인 Sister Squad 2 페이지 정적 점검만 진행해. develop만 사용하고 main은 건드리지 마. 실제 브라우저 렌더링과 영상 장면은 확인하지 못하면 미검증으로 기록해.”


## 2026-11-01 Sister Squad 2 정적 점검 완료

- `sistersquad2.html`, `js/sistersquad2-story.js`, `js/sistersquad2-ost.js` develop 소스 확인.
- canonical/robots 정상, AdSense 로더 1회, 수동 광고 단위 0개, 직접 push 호출 0개.
- YouTube nocookie 임베드 5개: 예고 3, NG/비하인드 1, 본편 1. GTM noscript iframe 1개는 별도.
- 네 가족 인물과 조력자/적대 세력 설정, 제작자 노트, 6단계 여정과 3개 성장 주제 확인.
- 59개 HTML 번역 키의 ko/en 사전 대응 확인. 동적 story와 OST도 한국어/영어 처리 경로가 있음.
- OST는 메인/Instrumental/English Edition 3개 YouTube 플레이리스트 및 Spotify 앨범 연결을 제공.
- 영상 1~3 카드의 개별 설명은 없고 공통 소개문만 존재. 실제 영상 내용을 확인하지 못해 설명은 추가하지 않음.
- body의 `user-select:none`은 본문 선택을 제한할 수 있는 UX 후보로 기록.
- 실제 브라우저 렌더링, 모바일/PC, 언어 전환, 영상/OST 재생, Auto ads 위치는 미검증.
- 사이트 코드와 main은 수정하지 않음.

### 다음 단일 작업
**게임 안내 페이지(`gameinfo.html`)에서 '골이예요' 게임의 실제 진입 경로와 독립 콘텐츠/광고 구조를 점검한다.** `miracleshot.html` 스토리 소개와 게임 실행 화면을 혼동하지 말고, 안내 페이지에서 연결되는 실제 게임 파일/경로를 정적 소스로 추적한다. 실제 플레이 동작은 브라우저 검증 전까지 미검증으로 둔다.

### 새 대화에서 이어갈 때
“최신 AdSense 점검 문서 두 개를 확인하고 다음 단일 작업인 gameinfo.html의 '골이예요' 게임 안내/진입 경로 정적 점검만 진행해. Miracle Shot 스토리 페이지와 게임 실행 화면을 혼동하지 말고 develop만 사용해. main과 사이트 코드는 승인 없이 수정하지 마.”


## 2026-11-01 Game Center 및 '골이예요' 경로 정적 점검 완료

- `gameinfo.html` 카드 7개와 GAME GUIDE 7개, 별도 창작 과정 노트 확인.
- 창작 과정 노트는 아이디어→규칙, 캐릭터→인터랙션, 플레이→개선의 세 주제로 ko/en 동적 삽입.
- 일곱 번째 카드 `/goal`은 `cleanUrls: true` 설정에 따라 실제 `goal.html` 실행 페이지로 연결되는 구조. `miracleshot.html`은 별도의 작품 소개 페이지임을 확인.
- `goal.html`은 `goal.js`와 `goal-result.js`를 로드하고 CPU/2인, 3라운드, 각 플레이어 10회 슛, 점수벽 및 결과/재시작 UI를 포함.
- `gameinfo.html`: AdSense 로더 1회, 수동 광고 0. `goal.html`: AdSense 로더 0, 수동 광고 0.
- 중요 확인: `gameinfo.html` HTML robots meta는 index,follow이나 Vercel 응답 헤더는 X-Robots-Tag noindex,follow로 충돌. sitemap에는 /gameinfo 및 /goal이 모두 없음.
- `goal.html`에는 canonical/description/robots meta가 없고, `game-auth.js` 및 `goal.js`에서 로그인 필요가 확인됨. 무료 플레이 안내와 계정 로그인 필요를 구분할지 검토 후보.
- Game Center meta description의 '테트리스, 테트리스' 중복 문구 확인.
- 색인 정책·로그인 안내·메타 문구는 개선 후보로 기록했으나 승인 없이 수정하지 않음.
- 실제 게임 플레이, 로그인 플로우, 모바일/PC, Auto ads 위치는 미검증.
- 사이트 소스, Vercel 설정, sitemap 및 main은 수정하지 않음.

### 다음 단일 작업
**다음 게임 페이지 `game.html`(부르마블 보드게임)의 독립 콘텐츠, 실행 로직, 계정 인증, 광고 로더, 색인/메타 설정을 develop 소스만으로 점검한다.** 실제 플레이는 브라우저 검증 전까지 미검증으로 둔다.

### 새 대화에서 이어갈 때
“최신 AdSense 점검 문서 두 개를 확인하고 다음 단일 작업인 game.html 부르마블 게임 정적 점검만 진행해. develop만 사용하고 main, 사이트 소스, Vercel 설정은 승인 없이 수정하지 마. 실제 플레이는 확인하지 못하면 미검증으로 기록해.”


## 2026-11-01 사용자 결정 및 Game Center 정책 통일

**사용자 결정: Game Center와 그 안의 개별 게임은 검색엔진 색인에서 제외하고 AdSense 광고도 제외한다.** 이 정책을 develop에 적용했다.

### 적용 범위
- 안내 허브: `/gameinfo`
- 개별 게임: `/game`, `/booktop`, `/fiveinrow`, `/curling`, `/tetris`, `/switch`, `/goal`

### 변경 사항
1. 위 8개 HTML 페이지 모두에 `<meta name="robots" content="noindex, nofollow">`를 설정했다. 기존 `index, follow` 값은 noindex로 교체했고, robots 메타가 없던 `goal.html`에는 새로 추가했다.
2. `vercel.json`에 위 8개 경로 각각 `X-Robots-Tag: noindex, nofollow` 응답 헤더를 추가했다. HTML 메타와 HTTP 헤더를 같은 정책으로 맞췄다.
3. Game Center 및 개별 게임 HTML에서 AdSense 로더를 제거했다. 실제 로더가 있었던 `gameinfo.html`, `booktop.html`, `fiveinrow.html`, `curling.html`, `switch.html`에서 제거했고, 나머지 `game.html`, `tetris.html`, `goal.html`은 기존에도 로더가 없어 그대로 유지했다.
4. `sitemap.xml`에는 이 8개 경로가 이미 없으므로 변경하지 않았다.
5. Google Tag Manager는 AdSense 로더와 별개이므로 기존 분석/태그 기능을 위해 유지했다. 개발 도메인 전체에 적용되던 별도 noindex 헤더도 그대로 유지했다.
6. robots.txt에서 게임 경로를 Disallow 처리하지 않았다. 검색엔진이 페이지를 크롤링해 noindex 지시를 읽을 수 있도록 하기 위함이다.

### 정적 소스 재검증
- 8개 HTML 모두 robots meta가 정확히 1개이며 값은 `noindex, nofollow`다.
- 8개 HTML 모두 AdSense 로더 URL `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`가 0회다.
- Vercel 설정에 8개 경로 각각의 `X-Robots-Tag: noindex, nofollow` 규칙이 존재한다.
- sitemap에는 게임센터 및 개별 게임 URL이 계속 포함되지 않는다.
- 작업 브랜치: develop only. main은 수정하지 않았다.

### 배포 후 확인이 남은 항목
- 현재 변경은 GitHub develop 소스에 반영된 상태다. Vercel 최신 배포가 READY가 된 후 실제 HTTP 응답에서 각 경로의 `X-Robots-Tag`가 전달되는지 확인해야 한다.
- Google Search Console에서 기존에 색인된 게임 URL이 있다면 noindex 재크롤링 이후 제외 상태로 바뀌는지 확인해야 한다. noindex 반영에는 크롤링 시간이 필요하며 즉시 검색 결과에서 사라진다고 보장할 수 없다.
- AdSense Auto ads는 HTML 로더를 제거했으므로 이 페이지들에서 로드되지 않는 구조다. 단, 배포된 페이지에서 브라우저 네트워크/DOM으로 광고 요청이 없는지 확인하는 실환경 검증은 아직 하지 않았다.
- GTM 컨테이너 자체가 별도의 광고 태그를 주입하지 않는지까지 포함한 실환경 광고 요청 검증은 별도 확인 사항이다.

이번 정책 변경은 develop에만 적용했다. main에 반영하지 않았다.


## 다음 단일 작업
**다음 게임 페이지 `game.html`(부르마블)의 콘텐츠/기능 정적 감사**를 이어간다. 색인·광고 정책은 이번 단계에서 이미 noindex 및 광고 로더 제외로 통일했으므로, 다음 점검은 게임의 독립 콘텐츠, 실행 로직, 인증 흐름, 링크/오류 가능성만 살펴본다. develop 소스만 확인하고 실제 플레이는 브라우저에서 검증하기 전까지 미검증으로 기록한다.


### 배포 후 실응답 검증에서 발견한 잔여 로더 및 추가 수정 (2026-11-01)
초기 noindex/광고 제외 변경 이후 배포된 develop 페이지를 HTTP로 직접 확인하던 중, 정적 소스 교체 작업에서 AdSense 로더 태그 5개가 실제로 남아 있던 것을 발견했다. 앞선 문서의 “로더 제거” 완료 표기는 이 5개 페이지에 대해서는 부정확했으며, 아래 후속 수정으로 바로잡았다.

- 잔여 로더가 남았던 페이지: `gameinfo.html`, `booktop.html`, `fiveinrow.html`, `curling.html`, `switch.html`
- 위 5개 파일에서 정확한 AdSense script 태그 문자열을 제거하고 develop에 각각 커밋했다.
- 수정 커밋: `acb47f493b29688bcec13a1c7aeb828e799c43fc`, `200bf39672271a2365ba85c420258c6734ded62c`, `b5a2e850030012f1ad61b21fef56ca3f8b936c5a`, `b4161e6dc2ca6610040df79f3b379ec69ad07961`, `32d1e85563ac6799b3a5873b5dbc9ee36895880e`.
- 이 수정들이 포함된 최신 develop 배포는 아직 별도 READY 확인 전이다. 앞서 READY였던 배포는 이 5개 후속 수정 이전 커밋이므로 광고 제외 검증 완료로 간주하면 안 된다.
- HTTP 응답에서 `X-Robots-Tag: noindex, nofollow`는 8개 경로 모두 확인했다. 앞선 HTTP 점검에서는 HTML 본문이 응답 래퍼 안에 이스케이프되어 robots meta 추출은 유효하게 검증되지 않았다. 최신 배포에서 HTML 원문을 다시 파싱할 것.
- 실제 광고 요청이 없는지는 최신 배포에서 HTML 로더 0회 확인과 별도로 브라우저 네트워크/DOM 검증이 필요하다. GTM에서 별도 광고 태그를 삽입할 가능성도 확인 대상으로 남긴다.


### 최신 develop 배포 실응답 재검증 완료 (2026-11-01)
- 후속 로더 제거를 포함한 커밋 `32d1e85563ac6799b3a5873b5dbc9ee36895880e` 배포가 READY 되었고 `develop.chrisleepapa.com` 별칭이 연결됐다.
- 최신 개발 도메인의 8개 경로를 각각 HTTP GET으로 확인했다: `/gameinfo`, `/game`, `/booktop`, `/fiveinrow`, `/curling`, `/tetris`, `/switch`, `/goal`. 모두 HTTP 200.
- 8개 모두 응답 헤더 `X-Robots-Tag: noindex, nofollow` 확인.
- 8개 모두 HTML 본문에 robots 메타가 정확히 1개이며 `noindex, nofollow` 확인.
- 8개 모두 AdSense loader URL 0회, `adsbygoogle` 참조 0회 확인.
- `/goal`은 canonical이 없지만 색인 제외에는 영향을 주지 않으며, 사용자 결정에 따라 별도 색인 메타와 응답 헤더 noindex가 확인됨.
- 2026-10-30에 제공된 GTM-NGDTQNVG 버전 2 내보내기 파일을 읽었다. 포함된 태그는 GA4 Google tag(`G-NBGELYQ4TZ`) 1개이며 AdSense/광고 태그는 확인되지 않았다. 단, 이는 내보내기 파일 기준이며 GTM에 그 이후 게시된 버전이나 브라우저에서의 실시간 네트워크 요청까지 증명하지는 않는다.
- 실환경 브라우저에서 광고 요청이 전혀 없는지에 대한 네트워크 패널 확인은 아직 미실시. 따라서 “HTML 로더/태그 제외와 GTM v2 내보내기 점검 완료”는 말할 수 있지만, “브라우저 광고 요청 0건”이라고 단정하지 않는다.
- 위 검증은 develop 도메인 기준이며 main/운영 도메인에는 적용하지 않았다.


## 2026-11-01 game.html(SISTER SQUAD) 정적 점검 완료

- game.html develop 소스 및 js/game-auth.js 인증 흐름 확인.
- Sister Squad 세계관을 바탕으로 한 24칸 보드, 2개 캐릭터, 별 10개 승리 조건, 랜덤 칸 배치, 주사위 이동, 별 보상/차감, 휴식/추가 이동, 마법 이벤트, 자매 대결, 보스, 다크나이트 추격, 승리/재시작 기능을 확인.
- 게임 시작 화면에 핵심 목표와 플레이 개요가 있으며, 별도 상세 규칙 페이지는 확인되지 않음.
- 로그인 필수. 로컬 2캐릭터 교대 구조이며 온라인 멀티플레이/진행 저장 기능은 이 페이지 소스에서 확인되지 않음.
- game.html HTML robots noindex, nofollow, canonical /game, AdSense loader 및 adsbygoogle 참조 0회 확인.
- 실제 develop HTTP 응답은 200, X-Robots-Tag: noindex, nofollow, robots meta 1개, AdSense loader 0회, adsbygoogle 0회.
- 모바일 CSS 및 reduced-motion 대응은 있으나 viewport 확대 제한(user-scalable=no)과 overflow:hidden은 접근성/화면 사용성 검토 후보.
- 실제 게임 플레이, 인증 흐름, 모바일/PC 화면, 이미지/BGM 로딩, 콘솔, 브라우저 광고 네트워크 요청은 미검증. GTM v2 내보내기에서 광고 태그가 없었다는 이전 확인은 현재 게시 버전의 실시간 네트워크 확인과 구분.
- 게임 소스와 Vercel 설정, sitemap, main은 수정하지 않고 감사 문서만 갱신.

### 다음 단일 작업
**booktop.html(BOOK STACKING MASTER) 정적 감사**: 독립 콘텐츠, Matter.js 물리 로직, 게임 완성도, 로그인/인증, 외부 라이브러리, 링크/자산 참조, noindex 및 광고 제외 상태를 확인한다. 실제 플레이는 브라우저 검증 전까지 미검증으로 유지한다.

### 새 대화에서 이어갈 때
“최신 AdSense 감사 문서 두 개를 읽고 다음 작업인 booktop.html BOOK STACKING MASTER 정적 감사만 진행해. develop만 사용하고 main 및 게임 소스는 승인 없이 수정하지 마. 실제 브라우저 플레이와 물리 동작은 확인하지 못하면 미검증으로 기록해.”


## 2026-11-01 booktop.html(BOOK STACKING MASTER) 정적 점검 완료

- booktop.html과 공통 game-auth.js 확인. Matter.js 0.19.0 물리 엔진, Tailwind CDN, YouTube IFrame API 사용.
- '아빠의 서재' 책 쌓기 게임: 포인터 드래그 조준 후 낙하, 충돌/중력, 동적 카메라, 콤보/축하 효과, 게임오버/재시작, BGM.
- Supabase booktop_scores에서 TOP 5 조회 및 이니셜별 최고 점수 upsert 시도.
- 로그인 필수이며 계정 이니셜을 랭킹 필드에 자동 반영하고 숨김/읽기 전용 처리.
- canonical/description 존재, HTML robots noindex,nofollow. 실제 develop HTTP 200 및 X-Robots-Tag noindex,nofollow, AdSense loader 0회, adsbygoogle 0회 확인.
- Supabase RLS/실제 저장 권한 및 서버 측 점수 검증은 미확인. 클라이언트 점수 조작 방어는 별도 점검 후보.
- 최종 점수가 score-1로 표시되는 의도, 모바일/PC 조작, 실제 물리·카메라·충돌, BGM, CDN 실패, 콘솔, 광고 네트워크 요청은 미검증.
- 게임 코드, DB, Vercel 설정, sitemap, main은 수정하지 않고 감사 문서만 기록.

### 다음 단일 작업
**fiveinrow.html(오목) 정적 감사**: 승리 판정/대전 흐름/기록 및 로그인/모바일 입력/외부 라이브러리/정책 응답을 점검한다.

### 새 대화에서 이어갈 때
“다음 게임 fiveinrow.html(오목)을 develop 정적 소스 기준으로 빠르게 감사해. 게임별 색인·광고는 이미 제외 결정이므로 정책을 다시 논의하지 말고 HTTP 정책 확인만 간단히 해. 실제 대국은 확인하지 못하면 미검증으로 기록해. main과 게임 소스는 수정하지 마.”

## 2026-11-01 이어서 진행할 순서 업데이트

- 게임 감사 완료: game.html, booktop.html, fiveinrow.html.
- 다음 게임: curling.html.
- AdSense 핵심 페이지 정밀 감사 트랙도 병행: 먼저 홈페이지, 이어서 journal-1~6 개별 본문, 그다음 작품 소개 페이지와 음악/워십 잔여 이슈, 마지막으로 신뢰/정책 및 Bible 자료 출처 확인.
- Game Center noindex/광고 제외는 이미 확정된 정책이므로 반복 논의하지 않는다. 게임의 규칙/기능/오류/UX가 중심.
- 실제 브라우저 테스트와 정적 소스 검토를 구분하고, 테스트하지 않은 항목은 미검증으로 기록한다.
- 모든 수정은 develop만 사용한다. main 반영은 사용자 승인 이후에만 한다.

### 새 대화에서 이어갈 때
최신 감사 문서 확인 후 curling.html 게임 정적 감사를 진행하고, 이어서 홈페이지와 journal-1~6 등 AdSense 핵심 콘텐츠 페이지를 차례로 정밀 점검해. 게임은 빠르게 진행하고, 광고 대상 콘텐츠는 본문 가치와 독창성까지 꼼꼼히 봐. develop만 사용하고 main은 건드리지 마.

## 2026-11-01 점검 결과 추가 및 다음 순서

- 게임 감사 완료: game.html, booktop.html, fiveinrow.html, curling.html. 다음 게임은 tetris.html.
- 홈페이지 1차 정밀 점검: 원본 창작 소개, SISTER SQUAD 2 본편, Chris's Pick, Chris's Note, Faith Journey 등 독립 콘텐츠 확인. h1 복수, JS 주입 콘텐츠/외부 YouTube 데이터의 런타임 검증이 남음.
- Journal 1~6 본문 소스 감사 완료. 개인 경험/제작 과정이 중심이며 글별 주제 차별성은 존재. Skywork 가격·기능의 최신성, POD 실제 단계 구체화, Journal 5 메시지 중복 완화, Journal 6 성경 인용 출처 확인이 개선 후보.
- Journal 2·3·4의 CTA `/book`은 develop HTTP 404로 확인. 목적지 확인 후 수정할 것. 아직 소스 수정 전.
- Journal 3·5는 영어 UI/메타가 있더라도 본문이 한국어로 남을 수 있어 언어 전환 검증 필요.
- 다음 AdSense 정밀 대상: /miracleshot, /tutupupupipi, /sistersquad, /sistersquad2, /sistersquad-hub, /yul, /jung, /movie, /wallpaper, /music, /worship, /worship_eng, /about, /contact, /privacy, /terms, /bible. 이미 점검한 페이지는 새로운 잔여 이슈 중심으로 확인.

### 새 대화 이어가기
최신 감사 문서를 확인한 뒤 tetris.html 게임 정적 감사를 진행하고, 이어서 /miracleshot 및 /tutupupupipi 등 AdSense 핵심 콘텐츠 페이지를 정밀 점검해. Game Center 광고/색인 제외는 반복하지 말고, develop만 사용하며 main은 수정하지 마.

## 2026-11-01 이어서 진행

- 게임 감사 완료: game.html, booktop.html, fiveinrow.html, curling.html, tetris.html. 다음 switch.html, 이후 goal.html.
- AdSense 핵심 창작 페이지 1차 점검: miracleshot, tutupupupipi, sistersquad, sistersquad2, sistersquad-hub, yul, jung, shop.
- 가장 먼저 해결할 탐색 결함 후보: journal-2/3/4의 `/book` 링크는 404. 목적지는 작품 허브(/sistersquad-hub) 또는 Book 1 페이지(/sistersquad) 중 의미에 맞게 결정한 뒤 수정.
- 콘텐츠 보강 우선 후보: tutupupupipi (캐릭터·세계관·각 영상의 구체적 독창 설명 추가), sistersquad Book 1 (작품 구성/독자/제작 배경을 더 풍부하게), journal-5 영어 본문 번역 여부 확인.
- 다음 AdSense 페이지는 /movie, /wallpaper, /music, /worship, /worship_eng, /about, /contact, /privacy, /terms, /bible 순으로 잔여 이슈 확인.
- Google 공식 AdSense 기준은 고유하고 관련성 있는 원본 콘텐츠, 명확한 탐색, 충분한 완성 문장/문단, 자동 생성·저가치 페이지/끊어진 링크의 회피다. 글자 수 기준이나 승인 확률은 임의로 설정하지 않는다.

### 새 대화 이어가기
최신 감사 문서 확인 후 switch.html 게임 감사를 빠르게 진행하고, 이어서 /movie와 /wallpaper 및 남은 정책·신뢰 페이지를 AdSense 공개 기준에 맞춰 정밀 점검해. develop만 사용하고 main은 건드리지 마.

## 2026-11-01 점검 이어가기

- 게임 정적 감사 7종 완료: game, booktop, fiveinrow, curling, tetris, switch, goal. switch는 탭 복귀 후 게임 멈춤 가능성, goal은 방향 드래그가 실제 조준에 반영되지 않는 문제/캐릭터 능력치 미사용/라운드 번호 오프바이원 후보.
- AdSense 핵심 콘텐츠 점검: movie(제작 노트 강점, 일부 기존 IP 팬 영상 저작권 별도), wallpaper(설명/설정 가이드 강점), about(창작자 경험/사이트 정체성 강점).
- Trust pages: contact는 실제 email/Instagram/Facebook 연결. Privacy/Terms는 한국어/영어 본문 존재하지만 개인정보처리방침이 Supabase 계정/개인 기록 저장을 충분히 설명하지 않는다. 저장 데이터 범위, 보관기간, Supabase 리전, 삭제 요청 절차 확인 후 갱신해야 한다.
- EEA/영국/스위스 광고 방문자가 있을 경우 Google 인증 CMP/동의 요구사항이 적용되는지 AdSense 설정에서 확인 필요. 소스만으로 계정 CMP 설정을 확정하지 않는다.
- 다음: 음악/워십 페이지 잔여 이슈 확인, Bible page 외부 성경 데이터 라이선스/출처 및 저장 데이터 설명 확인, privacy policy 문구를 운영자 확인 후 갱신.
- 게임 소스 수정은 사용자 승인 전 보류. Privacy/Terms는 법적 문서이므로 운영자 확인 없이 보관기간/서버 리전/삭제 절차를 지어내지 않는다.

### 새 대화 이어가기
최신 감사 문서를 확인한 뒤 음악/워십과 Bible 자료 출처 및 개인정보처리방침의 실제 데이터 처리 범위를 정밀 점검해. switch/goal 게임 버그는 수정안 제시 후 승인받고, develop만 사용하며 main은 건드리지 마.

## 2026-11-01 최신 정밀 점검

- Music / Worship / English Worship은 앨범별 제작 이야기와 자체 가사 아카이브가 풍부해 독창적인 콘텐츠 가치가 높은 편. JS 렌더링/링크/언어 전환의 브라우저 확인은 남아 있음.
- Bible 페이지 직접 AdSense loader 0 유지. 현재 hymnFiles 400개(001~400)이며 401~645는 placeholder. 개역개정 JSON의 상업적 웹 게시 허락 및 찬송가 PDF의 온라인 재게시 권한은 여전히 미확정.
- 개인정보처리방침 갱신은 공통 계정 이니셜/PIN hash, Bible 기록, TODAY memo/prayer/todos, prayer notes, Supabase 처리/보관/삭제 범위를 실제 운영자에게 확인한 후 진행.
- EEA/UK/Switzerland 방문자 대상 Google 인증 CMP가 AdSense 계정 Privacy & Messaging에서 활성화되어 있는지 확인. 사이트 소스에서 자체 CMP가 보이지 않고 과거 GTM export의 consent state는 NOT_SET이었으므로 우선 확인 항목.
- 다음 단계: 확인된 privacy/CMP 이슈와 끊어진 `/book` 링크를 먼저 수정 승인받고, 이후 저널/작품 페이지의 브라우저 렌더링·언어 전환·외부 링크 검증.


## 2026-11-01 최우선 조치 추가 — Supabase 데이터 보호

- 역사적 P0 발견 사항(2026-11-01 조치 완료): `public.bible`의 anon 공개 CRUD 정책/권한은 제거했다. 현재 남은 인증 위험은 4자리 PIN의 unsalted SHA-256 및 localStorage 보관, 로그인/개인 RPC의 rate limit 부재다. 이는 별도 P1 인증 강화 작업으로 관리한다.
- Supabase project region: Tokyo (`ap-northeast-1`). New personal data tables: clp_accounts, clp_today, clp_bible_journey, clp_bible_reflections, clp_prayer_notes, clp_prayer_daily. Current privacy policy does not accurately describe these data categories or the processing region.
- Security Advisor: 18 SECURITY DEFINER RPCs callable by anon, 8 callable by authenticated; 6 private tables RLS enabled/no direct policies. Review each function because they run with owner privileges; not every warning is automatically a vulnerability, but public.bible direct access is confirmed.
- 완료: Bible 페이지와 관련 JS를 계정별 RPC 경로로 전환하고 main 배포를 확인한 뒤 `public.bible`의 anon/authenticated 직접 접근 권한과 4개 정책을 제거했다. 기존 기록은 삭제하지 않았으며, `PROFILE` hash row는 확인 당시 존재하지 않았다.
- The 4-digit PIN + unsalted SHA-256 + browser localStorage bearer hash + no visible login attempt limit needs hardening. No brute-force test was performed.
- No DB/source changes were made. User approval is required before security refactor because it affects Bible login and existing personal records.

### 새 대화 이어가기
우선 Supabase public.bible 테이블의 공개 접근 취약점을 안전하게 해결하는 단계별 설계를 제시하고, 사용자 승인 후 develop의 Bible 인증/기록 코드를 새 RPC 방식으로 전환해. 기존 기록을 보존하고 실제 계정 분리 테스트 후에만 anon 권한을 닫아. 개인정보처리방침은 Tokyo 리전과 실제 저장 데이터/삭제 절차를 반영해 함께 정리하되, main은 건드리지 마.

## 2026-11-01 production status

- `/book` 404 is confirmed on both develop and production. The three Journal CTA links are present in main and develop.
- `/privacy` and `/bible` production HTML both 200 and have no direct AdSense loader. Production Bible source is identical to develop and uses the public `bible` REST table.
- Supabase `public.bible` anon full CRUD grants and permissive policies are live on the project used by production. This is the first item to secure before continuing lower-priority page polishing.


## 2026-11-01 latest progress

- Develop Bible/TODAY source paths now use account-scoped RPCs for personal data. Direct REST reads/writes from Bible, Bible gate, Bible layout TOP5, TODAY check-in streak, and TODAY archive were removed. Public `bible_content` read remains for scripture text.
- Privacy policy Korean/English revised for account and personal-record data categories, Supabase Tokyo processing region, manual deletion request path (no self-service deletion), and Google's partner-site data-use disclosure.
- Develop deployment of latest code `b83ff66` is READY; privacy latest deployment `f97371d` is READY. HTTP/source verified for `/bible` and `/today`; interactive auth/save/load tests are not yet performed.
- P0 DB exposure closed on 2026-11-01: production main Bible/TODAY source uses RPC-only personal-data paths; `public.bible` and its sequence have no anon/authenticated direct privileges, and the four anon policies were dropped. Existing rows were preserved.
- Custom 4-digit PIN + unsalted SHA-256 + localStorage hash + no visible rate limiting on public SECURITY DEFINER RPCs remain hardening priorities. Plan stronger credentials/rate limiting and `search_path=''`/function privilege review.
- Next: verify latest privacy HTTP response, then manual browser tests of Bible/TODAY account features on develop. After user review, get explicit approval to update main and only then apply DB migration to revoke direct public table access. Continue AdSense review on substantive content; don't list removed YouTube charts as missing features.


- Follow-up verified latest develop privacy page HTTP 200/index/canonical and Google partner-site disclosure. Bible and TODAY HTTP 200, expected robots policy, and personal-table direct REST calls absent from current develop source. Invalid credential calls to Bible/TODAY RPCs were rejected without writes.
- Browser testing with the real account and the production DB permission cutover remain outstanding. Do not describe P0 as resolved until anon grants/policies are removed after main is updated.


## 2026-11-01 additional page fixes

- TuTu PuPu PiPi: explicit index/follow meta, stronger unique page description and OG description, visitor-friendly six-Shorts intro, bilingual creator note added. Deploy ready and HTTP verified.
- Journal 2/3/4 broken `/book` CTA fixed on develop to `/sistersquad`; recheck final deployment. Journal 2 pricing comparison now clearly marked as a historical snapshot.
- SISTER SQUAD hub/Book1/Book2/Yul/Jung and MIRACLE SHOT have substantial original story, character, world, and creation-process content. Journal 5 English body exists; remove old suspected gap from outstanding list.
- Do not treat removed YouTube chart as a missing page or AdSense issue.


 
## 2026-11-01 production cutover result
 
- P0 public table exposure closed: public.bible anon policies removed; anon/authenticated direct table grants and anon sequence usage revoked. Production main is now on RPC-only personal Bible data source.
- Production main deployed: six security-related files selectively synced from develop; latest main deployment READY. /bible, /today, /privacy HTTP 200 and expected canonical/robots confirmed.
- Database RPC test passed: ran as anon inside a rollback transaction for Bible save/load, Bible Journey, TODAY records, prayer notes, and Bible reflections. Wrong PIN rejected. No synthetic test account or rows remained after rollback.
- Function grants narrowed: 18 clp_* SECURITY DEFINER functions remain executable by anon for the current custom login flow; PUBLIC and authenticated EXECUTE removed. Security Advisor now has 0 authenticated SECURITY DEFINER warnings; 18 anon warnings remain because the custom PIN RPCs are still public endpoints.
- Leaderboard narrowed: public Bible TOP 5 function returns at most five rows; privacy policy now discloses public display of initials and reading progress.
- Remaining P1: 4-digit unsalted SHA-256 PIN, hash in localStorage, and no effective rate limit. Plan a versioned server-side salted hash + short-lived random session-token migration before calling account authentication fully secure.
- Manual UI testing still required: actual production login, Bible/TODAY/Prayer Notes CRUD, progress sync, and cross-account isolation were not browser-tested by the assistant. HTTP/SQL checks are not a substitute.
- Admin limitation: attempt to revoke default EXECUTE privileges for future functions failed due database permission denial; defaults unchanged.
- Branch note: main received selected security files, not the full develop branch. Histories remain diverged.


## 2026-11-01 홈페이지 잔여 YouTube 차트 코드 정리 및 CMP 정적 확인

**판정: 홈페이지에서 이전에 제거하기로 한 외부 YouTube 차트/오늘의 화제 영상 잔여 코드가 실제로 남아 있어 develop에서 제거했다. 배포 READY 확인. 운영 main은 변경하지 않았다.**

### 확인 및 수정 근거
- index.html의 기존 소스에는 #youtube-daily-top3, #youtube-trending-video 두 섹션과 각 CSS, 외부 차트 데이터를 불러오는 스크립트가 남아 있었다. youtube-trending-updated의 초기 문구는 “오늘의 영상을 불러오는 중…”이었다.
- 해당 영역은 CSS로 숨겨진 상태가 아니었다. 따라서 이전 문서의 “제거된 YouTube 차트는 누락 기능으로 취급하지 않는다”는 정책과 실제 HTML이 불일치했다.
- develop의 index.html에서 차트 관련 CSS 2개, 섹션 2개, 차트 로딩 스크립트 1개만 제거했다.
- SISTER SQUAD 2 본편 영상, Faith Journey, Chris's Pick, Chris's Note, 앨범 이동 스크립트 및 나머지 홈 콘텐츠는 보존했다.
- 커밋: b4b10ae7f8e4254206e3ebd1403a3740b7028466.
- Vercel 배포: dpl_4vy3x9LsY8tMJPwiemjSdAwAeojC, 상태 READY; develop 별칭 연결 확인.
- 재검증: develop index.html에 YouTube 차트 섹션/ID/로딩 문구가 더 이상 없고 Faith Journey, Chris's Pick, 앨범 이동 로직은 남아 있음.
- main은 수정하지 않았다. 웹 브라우저에서 preview 페이지를 열어 PC/모바일 화면을 직접 확인하는 단계는 도구 접근 실패로 미검증이다.

### 개인정보/동의 관리 정적 확인
- develop의 index.html, privacy.html, js/main.js, components/header.html, components/footer.html에서 googlefc, fundingchoices, __tcfapi, 별도 CMP SDK/스크립트 표식을 찾지 못했다.
- 개인정보처리방침에는 쿠키/광고 및 제3자 광고 파트너 설명이 있으나, 이 설명만으로 동의 관리 플랫폼이 구현되었다고 볼 수 없다.
- Google은 EEA·영국(2024-01-16부터), 스위스(2024-07-31부터) 이용자에게 개인 맞춤 광고를 제공하는 게시자에게 Google 인증 CMP와 IAB TCF 통합을 요구한다. Google Privacy & Messaging의 유럽 규정 메시지도 인증된 CMP 선택지다.
- 사이트 소스만으로 AdSense 계정의 Privacy & Messaging 설정, 실제 유럽 지역 광고 동의 메시지 노출, 실제 트래픽 지역은 확인할 수 없다.

### 다음 단일 작업
**AdSense 계정의 Privacy & Messaging에서 European regulations 메시지가 설정/활성화되어 있는지 계정 화면 기준으로 확인한다.** 외부 CMP를 임의로 설치하거나 사이트 코드를 추가하지 않는다. 계정 설정 확인 후 필요한 조치만 결정하고, 그 다음 Bible 페이지의 성경 본문/찬송가 자료 출처·게시 권한 점검을 별도 항목으로 진행한다.


## 2026-11-01 재점검 — 현재 sitemap 및 AdSense 핵심 페이지

**범위: develop/main GitHub 소스 정적 재검사, develop/main Vercel 배포 상태, 24개 sitemap URL의 기본 메타/콘텐츠 규모. 브라우저 렌더링과 AdSense 계정 설정은 별도 미검증. 코드 수정 없음.**

### 기준 및 제외
- Prompt Lab은 이미 삭제된 페이지이므로 점검 대상에서 제외. 현재 sitemap 24개에도 포함되지 않는다.
- Game Center 및 게임 페이지의 noindex/광고 제외 결정은 재논의하지 않는다.
- 제거된 YouTube 차트를 누락된 기능이나 AdSense 콘텐츠 부족 문제로 분류하지 않는다.

### 현재 확인 결과
- develop sitemap.xml: 24개 URL. 운영 도메인 https://chrisleepapa.com 사용. Prompt Lab 없음.
- robots.txt: Allow: /, sitemap 경로 정상.
- ads.txt: google.com, pub-3207219520058740, DIRECT, f08c47fec0942fa0 확인.
- develop 홈페이지 canonical /, AdSense loader 1회. YouTube 차트 섹션/스타일/로딩 스크립트 식별자가 없음.
- main 홈페이지에는 youtube-daily-top3, youtube-trending-video 및 관련 CSS/스크립트가 남아 있음. develop은 제거 완료. main 최신 production 배포는 commit ed13030c004861bec711d674a0df3cefaab6c226, develop 최신 READY 배포는 commit 4904cbcb562274d1da3624ae2d3eef0428946ba2. 따라서 해당 정리는 develop에만 반영되어 있으며 main 운영 소스와는 차이가 있다. 이를 새로운 콘텐츠 누락 문제로 기록하지 않고, 배포 브랜치 차이로만 기록한다.
- 현재 compare: main 대비 develop ahead 3 / behind 0. 변경 파일은 index.html과 점검 문서 2개. main은 수정하지 않았다.
- sitemap 24개 페이지의 기본 메타 점검: 개별 canonical 및 index/follow 확인. 단일 H1 확인. 각 페이지의 AdSense loader는 페이지별로 기록했으며, Bible/Movie/Contact/Privacy/Terms는 0회. 수동 adsbygoogle.push 단위는 확인한 대상에서 0회.
- 원본 콘텐츠 강점: Movie 제작 노트, Wallpaper 소개/설정 안내, SISTER SQUAD 허브·2권·캐릭터 페이지, MIRACLE SHOT, TuTuPuPuPiPi, Music/Worship, Journal 1~6. Worship 본문은 약 5,080단어, English Worship 약 3,580단어, Movie 약 1,380단어, Wallpaper 약 1,322단어, Journal 2 약 1,224단어 등 독립적인 설명/제작 기록이 존재한다. 단어 수는 승인 기준으로 사용하지 않는다.
- SISTER SQUAD 1은 약 336단어의 독립적인 줄거리·캐릭터·첫 모험·창작 배경이 있으며 Journal 1/2/4 내부 링크가 연결되어 있다. 다만 OST/영문판/구매 CTA가 상세한 자체 작품 설명보다 먼저 배치되어 있고, STORY와 FIRST ADVENTURE 일부 내용이 겹친다. 보완 후보로만 기록하며 자동으로 저가치 판정하지 않는다.
- /shop은 실제 shop.html이 존재하고 canonical /shop, index/follow이며 SISTER SQUAD 1에서 내부 링크로 연결된다. sitemap에는 포함되지 않지만 이는 곧바로 정책 위반이나 끊어진 링크를 뜻하지 않는다. 필요 시 sitemap 포함 여부를 별도 결정한다.
- Contact 약 47단어, Privacy 약 1,477단어, Terms 약 750단어. Contact/Privacy/Terms에는 AdSense loader가 없다. Contact의 짧은 분량만으로 문제로 판정하지 않는다.
- Privacy 페이지는 수집 데이터, Google Analytics/광고 파트너, Supabase 처리 리전/개인 기록 항목과 삭제 요청 경로를 설명하는 현행 문구를 포함한다. 실제 운영·보관 기간 및 계정 삭제 프로세스는 별도 사실 검증 필요.

### 미검증 및 잔여 위험
- 브라우저 실제 렌더링, 모바일/PC 레이아웃, JS 동적 본문 출력, Auto ads 배치, 광고 네트워크 요청은 확인하지 못했다.
- AdSense 계정의 Privacy & Messaging European regulations 설정/활성 상태는 사이트 소스에서 확인할 수 없다.
- Bible 본문 및 찬송가 PDF의 온라인 게시/상업적 이용 권한은 출처 링크만으로 확정할 수 없으며 저작권 트랙에서 별도 확인한다.
- Movie 페이지에 포함된 기존 제3자 IP 팬메이드 영상은 콘텐츠 가치와 별개인 권리 검토 대상으로 유지한다.

### 다음 단일 작업
**사용자가 AdSense 계정의 Privacy & Messaging → European regulations 메시지 설정 화면을 확인해 활성/비활성 상태를 알려주면 해당 항목을 판정한다.** 계정 화면 확인 전에는 CMP 정상/미설정을 단정하지 않는다. 이후 Bible 본문/찬송가 게시 권한과 출처를 확인한다.


## 2026-11-01 SISTER SQUAD / TuTu PuPu PiPi 콘텐츠 및 가독성 점검

### 점검 범위
- develop 브랜치의 `sistersquad-hub.html`, `sistersquad.html`, `sistersquad2.html`, `tutupupupipi.html` 정적 소스.
- Google AdSense 공식 정책 및 Google Search Central의 people-first 콘텐츠 안내를 기준으로 자체 콘텐츠, 외부 미디어 의존도, 광고 코드, 페이지 가독성을 확인.

### 확인 결과
- SISTER SQUAD 허브에는 율·정 주인공 소개, 세계관, 인물/조력자/적대 세력, 마법·유물, 1·2권 이야기, 시각 자료가 구성되어 있다. 단순 외부 링크 모음이 아니다.
- SISTER SQUAD 1에는 독립적인 이야기, 캐릭터, 첫 모험, 창작 배경이 있으며 Journal 제작 기록으로 연결된다.
- SISTER SQUAD 2에는 가족/조력자 소개, 여정과 세계관 설명, 아빠 캐릭터를 이야기 안에 넣은 창작 배경, 세 가지 주제별 해설이 있다. 다만 개별 예고 영상의 장면별 상세 설명은 정적 소스만으로 근거를 확보하지 못해 임의로 만들지 않았다.
- TuTuPuPuPiPi에는 세계관, 세 캐릭터별 소개와 특징, OST 제작 의도, 6개 Shorts별 한·영 제목/설명, 창작자 노트가 있다. 영상 설명을 영상 장면과 대조하는 것은 실제 재생 확인이 필요하므로 미검증으로 유지한다.
- 네 페이지 모두 AdSense 로더 1회, 수동 광고 단위 0개, 직접 adsbygoogle.push 호출 0개.
- 정적 소스 기준으로 콘텐츠가 전부 외부 임베드로만 구성된 페이지는 확인되지 않았다.

### develop에서 실제 수정한 사항
1. `tutupupupipi.html`: 라이트 모드에서 낮은 대비가 예상되는 캐릭터 특성 태그, 섹션 라벨, OST 라벨, 영상 링크 및 네 개 탐색 카드의 강조색을 읽기 쉬운 색상으로 조정했다. 다크 모드 규칙과 콘텐츠/링크/영상 ID는 변경하지 않았다.
   - 커밋: `e7375cee51b0141bdd9fe395995e67151459c9b6`
2. `sistersquad-hub.html`: 라이트 모드 전용 색상 규칙을 추가해 본문, 카드, 보조 설명, 섹션 라벨의 대비를 개선했다. 이미지 배경형 주인공/작품 링크 카드는 기존 어두운 오버레이와 흰색 텍스트를 유지했다.
   - 커밋: `e4a51acdfe5bb4622715fbedb39c5322ee619163`

### 재검증 및 한계
- 변경은 develop에만 기록했다. main은 수정하지 않았다.
- 위 수정은 정적 CSS 변경이며 실제 브라우저에서 다크/라이트 모드, 모바일/PC 화면을 눈으로 확인한 것은 아니다. 최신 develop Preview에서 배포 및 실제 화면 검증을 별도 수행해야 한다.
- AdSense Auto ads가 실제 화면에서 영상 플레이 버튼/탐색 링크와 얼마나 가까이 배치되는지, 실제 광고가 노출되는지는 계정 설정과 브라우저 실측이 필요하다.
- AdSense 승인은 보장할 수 없으며, 이번 작업은 콘텐츠/가독성 측면의 사전 개선이다.

### 배포 및 HTTP 재확인 결과 — 2026-11-01
- 최신 develop 통합 커밋 `949f1ab7d25b9bf71064c61b8ed88200bfac1af9`의 Vercel Preview 배포가 `READY`로 완료됐고 `develop.chrisleepapa.com` alias가 연결됐다.
- `https://develop.chrisleepapa.com/tutupupupipi`: HTTP 200, canonical 확인, AdSense 로더 1개, 새 라이트 모드 대비 CSS 포함.
- `https://develop.chrisleepapa.com/sistersquad-hub`: HTTP 200, canonical 확인, AdSense 로더 1개, 새 라이트 모드 가독성 CSS 포함.
- `sistersquad.html` 및 `sistersquad2.html`에는 기존 라이트 모드 CSS 규칙이 각각 33개/39개 존재하는 것을 정적으로 확인했다. 이 두 페이지는 이번 변경에서 수정하지 않았다.
- main 대비 develop은 ahead 8 / behind 0이며 변경 파일은 `index.html`, 두 점검 문서, `sistersquad-hub.html`, `tutupupupipi.html`이다. main은 변경하지 않았다.
- Preview HTTP 200은 서버가 최신 HTML을 제공한다는 확인이다. 실제 브라우저 화면 캡처/시각적 확인, 모바일·PC에서의 상호작용, Auto ads의 실제 위치와 노출, 개별 영상 장면과 설명의 일치까지 확인한 것은 아니다. 이 항목들은 미검증으로 유지한다.
- Vercel 빌드 로그에 ESM→CommonJS 경고가 있었으나 해당 배포는 READY로 완료됐다. 빌드 실패는 확인되지 않았다.

### 다음 점검
실제 브라우저에서 라이트/다크 모드 및 모바일/PC 레이아웃을 확인하고, AdSense Auto ads 위치가 재생·탐색 UI와 혼동되거나 과도하게 가까운지 점검한다. 실제 영상 장면과 설명을 대조하지 못한 항목은 미검증으로 유지한다.


## 2026-11-01 MIRACLE SHOT 원작과 골이예요 게임 관계 점검

**작품 관계를 바로잡아 점검했다. MIRACLE SHOT(기적을 차올리다)는 원작 이야기이며, 골이예요(GOAL)는 그 이야기의 네 주인공을 선택해 플레이하는 파생 게임이다. 두 콘텐츠는 연결하되 서로 다른 페이지·정책으로 관리한다.**

### 확인한 develop 소스
- `miracleshot.html`: 원작 스토리 페이지. 시놉시스, 세계관, 이 코치와 황·길·고·영 캐릭터, 성장 주제, 성경적 영감, 창작 의도, 하이라이트 이미지, OST가 포함된다.
- `gameinfo.html`: Game Center의 일곱 번째 게임 카드와 게임 안내에 골이예요가 포함된다.
- `goal.html`: 실제 게임 실행 화면. CPU 또는 2인 모드, 캐릭터 선택, 3라운드, 플레이어별 10회 슛, 점수벽과 결과 화면이 구현되어 있다.
- `js/miracleshot/goal.js`: 게임 시작 시 계정 로그인을 요구하며, 로그인 성공 후 매치를 시작한다.
- `vercel.json`: `/goal`, `/gameinfo` 응답에 X-Robots-Tag `noindex, nofollow` 설정.
- `sitemap.xml`: 원작 `/miracleshot`만 포함. `/gameinfo` 및 `/goal`은 포함하지 않는다.

### 광고·색인 정책 판정
| 페이지 | AdSense 로더 | robots meta | canonical | sitemap | 판정 |
|---|---:|---|---|---|---|
| `/miracleshot` | 1 | index, follow | 있음 | 포함 | 원작 콘텐츠, 광고/색인 대상 |
| `/gameinfo` | 0 | noindex, nofollow | 있음 | 제외 | 게임 허브, 광고/색인 제외 유지 |
| `/goal` | 0 | noindex, nofollow | 없음 | 제외 | 게임 실행 화면, 광고/색인 제외 유지 |

- 세 페이지 모두 정적 HTML에서 수동 광고 단위와 직접 adsbygoogle.push 호출은 0개.
- 게임 허브와 게임 실행 화면은 기존의 광고/색인 제외 결정을 유지했다. `/goal`의 noindex는 HTML meta와 Vercel 응답 헤더 양쪽에 존재한다. `/gameinfo`도 HTML meta 및 응답 헤더가 noindex,nofollow로 일치한다.
- 원작 `/miracleshot`은 독립적인 창작 설명과 캐릭터·세계관·주제 콘텐츠를 보유하고 index/follow 및 sitemap 대상임을 확인했다.

### develop에서 실제 수정
1. `miracleshot.html`
   - 페이지 title에 사용자가 확정한 한국어 작품명 `기적을 차올리다`를 반영했다.
   - 원작 이야기와 파생 게임의 관계를 분명히 하는 STORY → GAME 연결 영역을 추가하고 `/goal`로 연결했다.
   - 한국어/영어 번역 문구를 함께 추가했다.
   - 원작 페이지의 AdSense loader, canonical, index/follow 및 기존 스토리 콘텐츠는 유지했다.
   - 커밋: `291fa6f825ff3149799f1d63da6eac9fe6c4a9d0`
2. `gameinfo.html`
   - 검색/공유용 설명의 중복된 `테트리스, 테트리스` 문구를 실제 게임명 `독수리의 테트리스`로 바로잡고 게임 목록을 정확히 표시했다.
   - 골이예요 카드와 게임 안내의 한국어/영어 설명에 무료 계정 로그인 후 플레이 가능하다는 사실을 추가했다. 실제 게임 시작 로직의 로그인 요구와 일치한다.
   - AdSense 로더 0, noindex,nofollow 및 기존 게임 링크는 유지했다.
   - 커밋: `5d2507cfe45926ef1b0f5f43db06e5aaff794d0e`

### 정적 재검증
- 원작: title에 `기적을 차올리다`, canonical `/miracleshot`, index/follow, AdSense loader 1, /goal 연결 링크 1개 확인.
- Game Center: 중복 테트리스 문구 없음, 한국어/영어 로그인 안내 존재, AdSense loader 0, noindex,nofollow 확인.
- GOAL: AdSense loader 0, noindex,nofollow 확인.
- `vercel.json`의 /goal 및 /gameinfo noindex 헤더와 sitemap 제외 상태는 변경하지 않았다.
- main은 수정하지 않았다.

### 미검증
- 실제 브라우저에서 원작 CTA 클릭 후 게임 페이지 진입, 로그인 모달, 로그인 성공 후 게임 시작 및 CPU/2인 매치 진행은 아직 실제 조작 검증하지 않았다.
- 모바일/PC 레이아웃과 한국어/영어 전환은 정적 소스 확인만 했으며 시각적 렌더링 검증은 아니다.
- Auto ads의 실제 노출/배치는 계정과 브라우저 화면에서 별도 확인이 필요하다. 원작 페이지에는 로더가 있으나 게임 페이지에는 없다.

### 다음 단일 작업
**최신 develop Preview 배포가 READY인지 확인한 뒤 `/miracleshot`, `/gameinfo`, `/goal` HTTP 응답에서 최신 title/CTA/설명/robots 헤더를 재확인한다.** 이어서 실제 브라우저 조작이 가능한 환경이 확보되면 CTA → 로그인 → 게임 시작 흐름과 모바일 레이아웃을 검증한다. main은 계속 수정하지 않는다.


### Preview 배포 및 HTTP 재검증 결과
- 최종 develop 커밋 `01cd13b7cefec4aa92ef7b3b0a6f754e386871b1`의 Vercel 배포 `dpl_C8xEvYLgBDZQ7Wy3s2CsKnB7XojS`가 `READY`이며 `develop.chrisleepapa.com` alias 연결을 확인했다.
- `/miracleshot`: HTTP 200, 최신 title에 `기적을 차올리다`, STORY → GAME CTA 및 /goal 링크 1개, index/follow, AdSense loader 1개.
- `/gameinfo`: HTTP 200, noindex,nofollow, 중복 Tetris 문구 수정 및 로그인 안내 반영, AdSense loader 0개.
- `/goal`: HTTP 200, noindex,nofollow, AdSense loader 0개.
- Vercel JSON의 /gameinfo 및 /goal X-Robots-Tag noindex,nofollow 규칙과 sitemap에서 두 URL이 빠진 상태도 정적 소스에서 확인했다.
- HTTP 요청은 HTML 제공 여부와 본문 반영을 확인한 것이며, 실제 브라우저에서 CTA 클릭·로그인·게임 조작·모바일 레이아웃을 직접 시험한 것은 아니다.

### 다음 단일 작업
**MIRACLE SHOT → 골이예요 연결 흐름의 실제 브라우저 검증**을 진행한다. 특히 로그인 전/후 게임 시작, CPU/2인 모드, 3라운드 및 10회 슛 동작, 모바일 화면을 확인한다. 실제 브라우저 조작이 불가능한 항목은 미검증으로 유지하고, main은 수정하지 않는다.


## 2026-11-02 골이예요 게임 흐름 정밀 점검 및 수정

### 점검한 실행 구조
- `goal.html`은 설정 화면, 플레이 화면, 결과 화면으로 구성된다. 게임 JS는 `js/miracleshot/goal.js`, 결과 화면 보조 스타일은 `js/miracleshot/goal-result.js`, 공통 계정 게이트는 `js/game-auth.js`가 담당한다.
- 비로그인 상태에서는 공통 게임 인증 스크립트가 로그인 모달을 띄우며, BATTLE START에서도 `CLPAuth.isLoggedIn()`을 재확인한다. 로그인 상태가 아니면 경기 시작을 허용하지 않는다.
- CPU 모드는 P1이 직접 플레이하고 CPU가 P2를 자동으로 진행한다. 2인 모드는 양쪽 모두 직접 조작한다.
- 각 라운드에서 양 플레이어 각각 10회 슛이 끝나야 라운드가 종료된다. CPU는 P2 턴에서 자동 슛을 예약한다. 세 번째 라운드까지 점수를 누적하고 라운드 승수를 기준으로 최종 결과를 표시한다.

### 발견한 불일치와 수정
1. **조준 안내 문구와 실제 입력 불일치**
   - 기존 안내는 드래그 방향으로 공의 방향을 조절하는 것처럼 설명했지만, 구현은 드래그 좌표를 읽지 않고 공을 누르고 있는 동안 점수판 강조 대상을 주기적으로 바꾸는 방식이었다.
   - `goal.html`의 안내를 실제 동작에 맞게 수정했다. 이제 사용자가 공을 누르고 게이지를 채우며, 원하는 점수판이 강조될 때 손을 떼도록 설명한다.
   - 실제 드래그 벡터 기반 조준은 구현되어 있지 않으며, 이번에는 안내와 실제 기능을 일치시켰다.
2. **3라운드 규칙**
   - 기존 로직은 한쪽이 라운드 2승을 먼저 얻으면 2라운드에서 경기를 종료했다. 화면은 `1 / 3`으로 표시하므로 3라운드 진행과 불일치했다.
   - 조기 종료 조건을 제거하고 세 번째 라운드 종료 후에만 최종 결과 화면으로 이동하도록 수정했다.
3. **라운드 결과 번호 오류**
   - 기존에는 라운드 번호를 먼저 증가시킨 뒤 결과 팝업을 생성해 직전 라운드 결과가 다음 라운드 번호로 표시될 수 있었다.
   - 종료된 라운드 번호를 별도 변수로 보존해 정확한 번호를 표시하도록 수정했다.
   - 마지막 라운드 결과 팝업이 최종 결과 화면 위에 겹치지 않도록 마지막 라운드에서는 결과 화면으로 바로 전환한다.

### 수정 커밋
- `js/miracleshot/goal.js`: `7c3304769c1608bc0bffd6759e5ea526f65d08bd` 및 후속 `81f4de20d3cb5225b9aad755e4bb3232a16f3a04`
- `goal.html`: `964bda5819be61b6786a6de28c297478c4bfa1b7`

### 정적 재검증 및 Preview 배포
- `goal.js`에서 라운드 3 종료 조건, 2승 조기 종료 제거, 종료 라운드 번호 사용, 플레이어별 10회 슛 검사, CPU 10회 슛 제한, 로그인 게이트를 재확인했다.
- `goal.html`: 수정한 조준 안내, robots `noindex,nofollow`, AdSense loader 0개 확인.
- `gameinfo.html`: 로그인 필요 안내, robots `noindex,nofollow`, AdSense loader 0개 확인.
- `miracleshot.html`: 원작의 index/follow 및 AdSense loader 1개 유지 확인.
- `vercel.json`: `/goal` 및 `/gameinfo`에 `X-Robots-Tag: noindex, nofollow` 헤더 규칙이 존재한다. `sitemap.xml`에는 두 게임 URL이 없다.
- Vercel develop 배포 `dpl_D1iHvsUADdp7CGHgLLwYzPbbFTbz`가 READY이며 `develop.chrisleepapa.com` alias 연결 확인.
- Preview HTTP 확인: `/goal`, `/gameinfo`, `/miracleshot` 모두 HTTP 200. 게임 두 페이지는 noindex,nofollow 및 광고 로더 0, 원작은 index,follow 및 광고 로더 1을 유지한다.

### 아직 실제 플레이로 확인하지 못한 항목
- 이 환경에서는 실제 브라우저 터치/클릭을 실행하지 못했다. 따라서 로그인 모달에서 계정 인증 완료, BATTLE START, CPU 자동 슛 10회, 2인 교대 슛 10회씩, 라운드 3회, 최종 결과 계산, 모바일 터치 및 화면 높이/잘림 여부는 소스 논리 검토와 Preview HTML 확인만 완료했다. 실제 플레이 테스트 완료로 간주하지 않는다.
- 현재 조준은 드래그 방향이 아니라 점수판 자동 강조 타이밍 방식이다. 향후 방향 조준을 원하면 별도 게임 기능 변경이 필요하다.
- main 브랜치는 수정하지 않았다.

### 다음 점검
**실제 브라우저 플레이 테스트가 가능한 환경에서 로그인 → CPU 모드 3라운드 → 2인 모드 → 모바일 조작을 직접 검증한다.** 그 전까지 위 항목은 미검증으로 유지한다.


## 2026-11-02 성경 본문 및 찬송가 자료 출처·권리 점검

### 점검 범위
- develop의 `bible.html`, `today.html`, `js/bible-creator-story.js`, `images/hymn/` 저장소 파일 목록.
- develop Preview의 `/bible`, `/today` HTTP 응답.
- 성경 데이터 원본 프로젝트 README와 대한성서공회 공식 저작권 안내, 데크레센도 블로그의 공개 소개 문구.
- 이번 점검은 권리 보유자와의 계약서/허가서가 저장소에 존재하는지 확인하는 법률 실사 전체가 아니며, 법률 자문도 아니다.

### 확인된 사실
1. **성경 본문 데이터**
   - `bible.html`은 `https://raw.githubusercontent.com/stranger828/bibleAPI/main/bible_structured.json`에서 전체 본문 데이터를 불러온다.
   - `today.html`도 같은 JSON 데이터 원본을 불러온다.
   - `js/bible-creator-story.js`의 자체 제작 노트는 해당 데이터가 개역개정이며, 원본 프로젝트 README가 대한성서공회 저작권 가능성과 상업적 이용 전 확인 필요성을 명시한다고 설명한다.
   - 원본 프로젝트 README는 소스 코드의 자유 이용과 성경 데이터의 권리를 구분하고, 데이터의 저작권이 대한성서공회에 있을 수 있으므로 상업적 이용 시 확인해야 한다고 명시한다.
   - 야고보서 1~5장은 별도의 Supabase `bible_content` 테이블에서 읽는다. 현재 저장소 코드와 공개 노트만으로는 이 별도 데이터의 정확한 원본·역본·이용 허가를 확정하지 못했다.

2. **대한성서공회 공식 안내**
   - 대한성서공회 저작권 안내는 대한성서공회가 번역한 한글 성경을 보호되는 2차 저작물로 설명하고, 이용하려면 권리자의 허락이 필요하다고 안내한다.
   - 대한성서공회 FAQ는 교회 홈페이지에서 성경 읽기 서비스를 제공하는 경우 컴퓨터성경 범주의 저작권 사용허가가 필요하며, 공식 성경읽기 사이트로 링크하는 방식은 무료로 이용할 수 있다고 안내한다.
   - 따라서 데이터 출처를 표시했다는 사실만으로 웹사이트에서 본문 전체를 재현할 권리가 확보되는 것은 아니다. 특히 광고 등 수익화와 결합된 이용은 허가 범위를 별도로 확인해야 한다.

3. **찬송가 PDF**
   - `images/hymn/` 디렉터리에는 PDF 400개가 있으며 파일 번호는 001~400장이다. 101~125장 PDF도 이 경로 안에 존재한다.
   - 저장소 루트에는 PDF 파일이 없으며, 루트에 101~125장 PDF 중복본도 없다. 기존 경로 정리 상태를 확인했다.
   - 화면의 출처 표시는 데크레센도 블로그 홈(`https://w-decrecendo.tistory.com/`)으로 연결된다. 해당 블로그의 공개 소개글은 찬송가 PPT 자료를 다른 사람이 올린 자료를 재편집해 공유한다고 설명하지만, 현재 사이트에 보관된 400개 PDF 각각의 원저작자·정확한 원 게시물·재배포 허가·상업적 이용 허가까지 확인해 주지는 않는다.
   - 따라서 일반 출처 링크만으로 PDF 400개의 재호스팅 및 공개 제공 권한이 확인됐다고 볼 수 없다.
   - UI는 1~645장으로 표시하지만 실제 PDF 등록 수는 400개이며, 나머지 번호는 미등록 상태로 안내하는 구조다. 645개 전체가 제공되는 것으로 오인되지 않도록 콘텐츠 설명과 실제 등록 수의 일치 여부를 계속 관리한다.

### Preview 및 광고/색인 상태 — 정정
- 두 페이지 모두 develop Preview HTTP 200, canonical 정상, AdSense loader 0개, 직접 `adsbygoogle.push` 0개다.
- **중요 정정:** Preview에서 관찰한 `X-Robots-Tag: noindex, nofollow`는 `develop.chrisleepapa.com` 전체에 적용되는 Preview 보호 헤더다. 이를 개별 페이지의 Production 색인 설정으로 해석하면 안 된다.
- `bible.html` 자체의 meta robots는 `index, follow`이며 canonical은 `https://chrisleepapa.com/bible`이다. 현재 develop sitemap에도 `/bible`이 포함되어 있다. 따라서 성경 페이지는 기술적으로 색인 대상이지만 AdSense loader는 제외된 상태다.
- `today.html` 자체의 meta robots는 `noindex, follow`이며 canonical은 `https://chrisleepapa.com/today`이다. sitemap에는 포함되지 않고 AdSense loader도 없다.
- noindex 및 광고 로더 제외는 검색·광고 노출을 조절하는 기술 설정일 뿐, 저작권 허가를 대신하지 않는다.

### 판정 및 조치
- **고위험 미확인 항목:** 개역개정 본문 전체의 웹 재현 허가, Supabase 야고보서 데이터의 출처/허가, 찬송가 PDF 400개의 원저작자 및 재배포·상업적 이용 권한.
- 이번 점검에서는 사용자 기능을 임의로 삭제하거나 PDF를 삭제하지 않았다. 출처 표기만으로 허가가 확보됐다고 간주하지 않도록 감사 문서에 위험을 명확히 기록했다.
- 안전한 운영을 위해서는 대한성서공회에 현재 사용 방식(개인 운영 웹사이트, 성경 본문 전체 온라인 열람, 묵상·기록 기능, 광고 수익화 여부)을 구체적으로 제시해 서면 허가/이용 조건을 확인해야 한다. 허가가 확보되지 않는 동안은 개역개정 전체 본문을 직접 제공하지 않고 공식 성경읽기 서비스로 연결하는 방식이 가장 보수적인 대안이다.
- 찬송가 PDF는 데크레센도 운영자뿐 아니라 각 악보의 원저작권자/제작자와 재배포 권한을 확인해야 한다. 확인 전에는 사이트가 자체 제작 또는 권리 확보 자료라고 표현하지 않는다.
- 광고 심사 기준 점검과 별개로 권리 확인 전까지 이 자료들을 독창적 창작 콘텐츠로 평가하지 않는다.

### 공식·원본 참고 링크
- 데이터 원본 프로젝트: https://github.com/stranger828/bibleAPI
- 대한성서공회 저작권 안내: https://www.biblekorea.kr/bbs/content.php?co_id=subpage2_3_4_1
- 대한성서공회 FAQ — 교회 홈페이지 성경읽기 서비스: https://www.biblekorea.kr/bbs/board.php?bo_table=copyright_faq&wr_id=9
- 데크레센도 블로그: https://w-decrecendo.tistory.com/

### 다음 점검
**성경·찬송가 권리 미확인 항목은 허가 확인 전까지 미해결로 유지한다.** 다음 AdSense 점검은 이 권리 문제를 승인 완료로 오인하지 않고, 다른 색인 대상 페이지의 독창적 콘텐츠·정책 페이지·광고 배치 적합성을 순서대로 확인한다.


## 2026-11-02 ABOUT 페이지 및 표준 URL 재점검

### 확인한 항목
- develop의 `about.html`, `vercel.json`, sitemap 및 develop/production/기존 Vercel 호스트의 HTTP 응답.
- About 페이지의 본문 구성, canonical/robots, 구조화 데이터, AdSense 로더 및 외부 링크.

### 결과
- `/about`은 title `ABOUT — Chris LEE.PAPA`, canonical `https://chrisleepapa.com/about`, meta robots `index, follow`로 설정되어 있다.
- 본문에는 창작자 소개, 신앙과 창작 여정, SISTER SQUAD 탄생 배경, AI 창작 도구 활용, The Creative Archive 설명, 창작 과정, 프로젝트 타임라인, 공식 YouTube/Spotify/TikTok 링크가 있다. 단순 링크 모음이 아니라 자체 창작자 소개와 제작 과정 설명을 포함한다.
- H1은 1개이며, 주요 섹션 제목은 창작 방식/아카이브 소개/영문 소개로 구분된다.
- Person, WebSite, AboutPage를 연결한 JSON-LD 구조화 데이터가 있으며, Person의 sameAs에 공식 YouTube, Spotify 아티스트, TikTok 링크가 들어 있다.
- AdSense 로더 1회, 수동 광고 단위 및 직접 `adsbygoogle.push` 호출 0개.
- 본문에서 확인한 공식 외부 링크는 YouTube, Spotify, TikTok 3개다.
- Production `https://chrisleepapa.com/about`은 HTTP 200으로 최신 title 및 canonical을 제공한다.
- 기존 호스트 `https://chrisleepapa-official.vercel.app/about`은 HTTP 301을 반환한다. `vercel.json`에는 해당 호스트의 모든 경로를 `https://chrisleepapa.com/:path*`로 영구 리디렉션하는 규칙이 존재한다. 따라서 이전 Vercel 주소를 표준 공개 주소로 유지하지 않는 설정은 확인됐다.
- develop 호스트 응답의 `X-Robots-Tag: noindex, nofollow`는 develop 전체에 적용되는 Preview 보호 설정이다. Production 응답에는 이 헤더가 없다.

### 판정 및 잔여 확인
- 소스와 Production HTTP 기준으로 About 페이지의 canonical/robots/AdSense 로더 설정은 일치한다. 이 점검에서 페이지 코드 수정은 필요하지 않아 변경하지 않았다.
- Google Search Console이 과거에 old Vercel URL을 Google-selected canonical로 표시했던 문제는, 현재 Google 색인 보고서에 다시 접속해 확인하지 못했으므로 완전 해결로 표시하지 않는다. 기존 호스트 301 리디렉션이 확인됐으므로 다음 크롤링 후 Google-selected canonical이 `https://chrisleepapa.com/about`로 갱신되는지 확인한다.
- 브라우저에서 실제 시각 렌더링 및 모바일/PC 레이아웃은 별도 검증 대상이다.

### 다음 점검
**Contact, Privacy, Terms 페이지를 실제 기능·개인정보 처리 코드와 대조한다.** 특히 개인정보처리방침의 Supabase 데이터 처리, 계정/기록 삭제 경로, Google Analytics·AdSense·쿠키 안내가 실제 구현과 일치하는지 확인한다. 해당 페이지는 AdSense 로더를 추가하지 않는다.


## 2026-11-02 Contact / Privacy / Terms 및 Supabase 실제 설정 대조

### Contact
- Contact 페이지에는 협업 제안 안내, 이메일 링크, Instagram/Facebook 링크와 응답 시간 안내가 있다.
- AdSense loader 0개, canonical `/contact`, index/follow. 단순 연락 창구 페이지 목적에 맞으며 별도 광고 코드를 추가하지 않는다.

### Privacy — 실제 구현과 대조해 수정
- 개인정보처리방침은 한국어/영어 양쪽으로 구성되어 있고, 운영자·수집 정보·이용 목적·광고·국외 처리·쿠키·보관 기간·권리 행사·문의 항목을 포함한다.
- 실제 Supabase 프로젝트 정보를 읽기 전용으로 확인한 결과, DB 기본 리전은 일본 도쿄 `ap-northeast-1`이다. 기존 개인정보처리방침의 도쿄 리전 표기는 실제 설정과 일치한다.
- 실제 스키마에는 공통 계정, TODAY 기록, 성경 일독 진행/묵상, 기도노트 및 일일 기도 선택, 방명록, 게임 점수·순위 관련 테이블이 있다.
- 실제 방명록 UI와 테이블에는 비밀번호/비공개글 기능이 없다. 기존 방침에 있던 “비공개글 설정 시 비밀번호” 설명을 제거하고, 닉네임·메시지·페이지·작성 시각을 수집하며 이메일/비밀번호 입력을 요구하지 않는다고 바로잡았다.
- 실제 공개 게임 순위 테이블을 반영해 게임 이니셜·점수·승리 횟수·마지막 플레이 시각 등의 정보가 일부 순위표에 표시될 수 있음을 추가했다.
- `js/auth.js`가 브라우저 localStorage에 계정 이니셜, PIN 인증 해시, 로그인 세션을 보관하는 구조를 반영했다.
- 기도노트 및 날짜별 TODAY 기록 일부는 화면에서 직접 삭제할 수 있지만, 계정 전체와 그 밖의 개인 기록을 한 번에 삭제하는 셀프서비스 기능은 없다. 기존의 “모든 기록은 이메일로 수동 삭제”라는 포괄 문구를 이 차이에 맞게 수정했다.
- 한국어/영어 모두 최종 수정일을 2026년 11월 2일로 갱신했다.
- 변경 커밋: `58fd54c81ae3ada9453c6ff9545802e36afd36d4`.

### Terms — 제3자 권리 구분
- 기존 이용약관은 사이트에 게시된 모든 콘텐츠가 운영자 소유인 것처럼 넓게 선언하고 있었다. 이는 성경 번역문, 찬송가 PDF, 제3자 미디어 및 사용자 게시물의 권리와 혼동될 수 있다.
- 운영자가 직접 제작한 음악·가사·소설·그림·게임·영상·이미지·글·코드·고유 브랜드/디자인 자산에 대한 저작권 표시로 범위를 명확히 했다.
- 성경 번역문, 찬송가 악보·가사, 제3자 음악·영상·이미지·상표·임베드 콘텐츠 및 사용자 게시물은 해당 권리자/작성자에게 권리가 있으며, 출처 표시만으로 재배포·상업 이용 허가가 생기지 않는다고 한국어/영어 모두 명시했다.
- 인용도 관련 법령과 권리자의 이용 조건이 허용하는 범위에서 해야 한다고 수정했다.
- 최종 수정일을 2026년 11월 2일로 갱신했다.
- 변경 커밋: `2030b3059f296eee57523ec3b21af7b7d317499f`.

### Supabase 계정 격리 및 보안 점검 — 읽기 전용
- 프로젝트 리전은 Tokyo `ap-northeast-1`; 현재 상태는 ACTIVE_HEALTHY.
- 개인 계정·TODAY·성경 기록·기도노트 테이블에는 RLS가 활성화되어 있고 직접 접근 정책이 없는 테이블은 브라우저에서 직접 조회하는 방식이 아니라 RPC 경로로만 접근하도록 설계되어 있다. `bible_content`와 게임 순위/방명록은 별도의 공개 읽기/쓰기 정책을 가진다.
- 공통 계정은 영문 3자리 이니셜과 4자리 PIN으로 운영된다. 프런트엔드는 PIN을 SHA-256 해시로 변환해 Supabase RPC에 전달하며, 브라우저 localStorage에도 해시를 저장한다. 원문 PIN은 브라우저에서 서버로 직접 전달하지 않는 구조다.
- `clp_login`을 포함한 개인정보 RPC는 `SECURITY DEFINER`로 실행되며 `anon` 역할에서 호출할 수 있다. 실제 데이터 함수 샘플에서는 이니셜과 PIN 해시를 대조하고, 함수의 `search_path`도 `pg_catalog, public, pg_temp`로 고정되어 있음을 확인했다. 이는 사용자 지정 PIN 인증을 위한 구조이지만, 공개 호출이 가능한 SECURITY DEFINER 함수라는 사실 자체는 지속적인 보안 점검 대상이다.
- **중요한 미해결 보안 위험:** PIN은 4자리 숫자이며 해시 생성은 salt 없는 SHA-256이다. 현재 `clp_login` 함수 정의에서 실패 시도 횟수 제한/잠금 로직을 확인하지 못했고, 로그인 시도 테이블이나 Edge Function도 없다. 따라서 반복적인 온라인 PIN 추측 시도를 제한하는 보호 장치가 부족하다. 실제 침입이나 계정 탈취가 발생했다는 뜻은 아니지만, 계정 분리 기능의 보안 강도를 높이기 위한 우선 개선 과제다.
- Supabase Security Advisor는 공개 실행 가능한 SECURITY DEFINER 함수와 RLS가 켜져 있지만 정책이 없는 테이블에 경고/정보 항목을 표시한다. RLS 정책이 없는 개인 테이블은 의도된 RPC 전용 접근 설계와 맞지만, 공개 RPC의 인증 검증과 호출 제한은 별도 보완해야 한다.
- 이번 점검은 스키마·함수 정의·정책 메타데이터만 읽었으며 개인 기록이나 계정의 실제 데이터는 조회하지 않았다.
- 계정 잠금/속도 제한과 PIN 강화는 기존 이용자 로그인을 중단시키지 않는 방식으로 설계·마이그레이션·테스트가 필요하므로 이번 단계에서 DB 함수를 임의 변경하지 않았다. 특히 단순히 SECURITY DEFINER 권한을 일괄 취소하면 로그인과 개인 기록 기능이 중단될 수 있어 실행하지 않았다.

### 미검증
- Privacy/Terms의 실제 배포 응답, 한국어/영어 전환 및 브라우저 렌더링은 코드 반영 후 Preview에서 최종 확인해야 한다.
- Supabase RPC에 대한 실제 공격 시뮬레이션이나 로그인 실패 횟수 테스트는 수행하지 않았다.
- Google Analytics/AdSense의 실제 브라우저 쿠키 발급 및 동의 상태는 브라우저와 계정 설정에서 별도 검증해야 한다.

### 다음 점검
**최신 develop Preview에서 Contact / Privacy / Terms의 변경 내용을 HTTP 응답으로 검증한다.** 이후에는 계정 격리 구조를 깨뜨리지 않는 로그인 속도 제한 및 PIN 보안 강화 설계를 별도 우선 과제로 진행한다. main은 계속 수정하지 않는다.


### Preview 배포 제한 및 현재 상태 — 2026-11-02
- Privacy/Terms 수정 커밋 `58fd54c81ae3ada9453c6ff9545802e36afd36d4` 및 `2030b3059f296eee57523ec3b21af7b7d317499f`는 develop에 반영되어 있다. 최신 감사 문서도 develop에만 기록되어 있으며 main은 변경하지 않았다.
- Vercel에서 확인 가능한 마지막 READY develop 배포는 `dpl_3i7K31UDPr7c4uT8Ms1zbnivdwF9` (commit `81d5012c42d154607ca3631f1bcbd28cb3306dc7))이며 `develop.chrisleepapa.com` alias가 연결되어 있다.
- 이 Preview의 `/privacy` 응답은 여전히 2026년 11월 1일 문구와 이전 방명록 비밀번호 안내를 제공한다. 따라서 11월 2일 Privacy/Terms 수정은 아직 Preview에서 서비스되는 상태가 아니다.
- 최신 소스 커밋을 대상으로 Preview 재배포를 요청했으나 Vercel API가 `api-deployments-free-per-day` 한도 초과(24시간 후 재시도 가능)로 거부했다. 재배포 성공으로 표시하지 않는다.
- main은 변경하지 않았다. develop에는 기존 main에 없는 점검·수정 커밋이 누적되어 있다.
- 다음 단계는 Vercel 배포 한도 초기화 후 현재 develop HEAD를 Preview로 빌드하고, `/contact`, `/privacy`, `/terms`의 HTTP 200, canonical, robots, 광고 로더, 수정일 및 변경 문구를 확인하는 것이다. 그 전까지 코드 수정은 develop 소스에만 보관하며 main에 반영하지 않는다.


## 2026-11-02 Journal 1~6 및 Music / Movie / Wallpaper 콘텐츠 점검

### Journal 1~6 정적 콘텐츠 확인
- 6개 글 모두 고유한 제목·canonical·index/follow 메타를 갖고 있으며, 본문에 작성자의 실제 창작 경험과 제작 판단을 담고 있다.
- 정적 HTML 본문 텍스트 기준 대략적인 단어 수: Journal 1 약 778, Journal 2 약 1,128, Journal 3 약 896, Journal 4 약 881, Journal 5 약 790, Journal 6 약 1,793.
- 각 글은 한국어/영어 본문 또는 언어별 콘텐츠를 제공하며, 이전/다음 글 및 관련 프로젝트로 이어지는 내부 링크가 있다.
- 6개 글 모두 AdSense loader가 1회이며, 수동 광고 단위와 직접 `adsbygoogle.push` 호출은 0개다. 광고 슬롯을 직접 삽입하지 않고 페이지 로더만 둔 상태다.
- 모든 글에 H1은 1개다. 본문에는 글별 제작 과정, 시행착오, 선택 기준, 개인 경험이 포함되어 있어 단순 링크 모음이나 자동 생성된 짧은 페이지 형태는 아니다.
- Journal 2는 Skywork 및 GPT/Gemini 요금제 표를 포함하지만, “글 작성 당시 비교 기록이며 현재 요금은 공식 가격 페이지에서 재확인”하라는 주의 문구가 있다. 요금·크레딧은 바뀔 수 있으므로 최신 정보로 오인되지 않도록 이 안내를 유지한다.
- Journal 2~6에는 Article JSON-LD가 있으나 Journal 1에는 없었다. 게시일을 소스에서 확인할 수 없어 임의의 날짜를 넣지 않고, 날짜를 생략한 Article 구조화 데이터(제목, 설명, URL, 대표 이미지, 작성자, 섹션)를 추가했다.
- Journal 1 Article JSON-LD 추가 커밋: `99f3a6de0afb55c4c28422ca94676d140679cce9`.
- Journal 1~6은 본문 대표 이미지 파일을 직접 삽입하지 않고 영상 임베드/본문 중심으로 구성되어 있다. OG 공유 이미지는 메타 태그에서 별도로 지정한다. 이미지가 없다는 사실만으로 정책 위반은 아니지만, 실제 글의 시각적 보조 자료를 더하면 독자 경험이 개선될 여지는 있다.

### Music Archive
- canonical 및 index/follow, AdSense loader 1회 확인.
- 정적 HTML에도 음악 창작 과정 설명이 있으며, 별도 JS가 앨범별 이야기와 제작 기록을 추가 렌더링한다.
- JS 안의 `${a.title}`은 템플릿 문자열로서 실제 플레이리스트 제목을 출력하는 코드이며, HTML에 잘못 노출된 문구가 아니다. 정적 HTML의 별도 제작 기록 섹션은 실제 텍스트로 존재한다.
- 동적 앨범 스토리/제작 기록은 브라우저에서 JavaScript 실행 후 표시되므로, Google 렌더링 및 실제 화면 검증은 별도 대상이다. 이번 단계에서는 기능 변경을 하지 않았다.

### Movie Archive
- canonical 및 index/follow 확인.
- 직접 제작 영상 3편의 기획·제작 노트와 이미지/영상 자료가 포함된 콘텐츠 페이지다.
- AdSense loader가 없는 것은 파일 내 주석에 “Movie page is excluded from page-level ad loading”이라고 명시된 의도적 설정이다. 이번 점검에서는 광고 코드를 임의로 추가하지 않았다.
- 페이지의 실제 광고 제외 여부는 사이트 운영 의도와 AdSense 설정을 함께 고려해 유지한다.

### Wallpaper Studio
- canonical 및 index/follow, AdSense loader 1회 확인.
- 모바일 무빙 월페이퍼와 PC 배경화면 설명, 이용 방법, 작품 소개 및 이미지 9개/영상 1개가 포함되어 있다.
- 무료 개인용 배경화면 제공이라는 목적과 사용 안내가 확인되며, 이번 점검에서 코드 수정은 필요하지 않았다.

### Preview 상태와 제한
- Journal 1 Article JSON-LD 변경 및 Privacy/Terms 수정 이후 최신 develop 소스를 대상으로 한 새 Preview 배포는 아직 확인되지 않았다. 이전 READY 배포는 이전 소스를 서비스한다.
- Vercel 공식 한도 문서상 Hobby 플랜은 하루 100 deployments(rolling 24-hour window)이며, 시간당 빌드 한도도 별도로 존재한다. 직전 API 호출은 `api-deployments-free-per-day` 오류를 반환했다. quota 초기화 시점은 단순히 시계 날짜가 바뀌는 시점으로 단정하지 않고, 다음 배포 요청 전 Vercel 상태를 확인한다.
- 최신 코드가 Preview에서 서비스되는지 확인하기 전까지 Journal 1 구조화 데이터와 Privacy/Terms 변경은 소스 반영 완료·실서비스 미검증으로 분류한다.

### 판정
- Journal 1~6, Music, Wallpaper는 자체 경험/창작 과정 설명을 포함하고 있으며 현재 코드상 index/follow와 AdSense loader 설정이 확인됐다.
- Movie는 의도적으로 AdSense loader를 제외한 상태로 유지한다.
- Journal 1의 Article 구조화 데이터 누락은 수정했다.
- 이번 단계에서는 AdSense 정책상 위험 페이지를 임의로 삭제하거나 광고 코드를 추가하지 않았다.
- main은 변경하지 않았다.

### 다음 점검
**Sister Squad 허브 및 개별 페이지, Yul/Jung 캐릭터 소개, TuTuPuPuPiPi 페이지를 작품 설명·저작권/출처·내부 링크·이미지/영상·광고/색인 설정 기준으로 교차 점검한다.** 기존에 수정한 라이트 모드 대비도 함께 살펴보되, Preview 배포가 막힌 동안에는 소스 검사와 정적 검증까지만 수행한다.


## 2026-11-02 SISTER SQUAD / 캐릭터 프로필 / TuTu PuPu PiPi 점검

### 공통 확인
- 점검 파일: `sistersquad-hub.html`, `sistersquad.html`, `sistersquad2.html`, `yul.html`, `jung.html`, `tutupupupipi.html`.
- 6개 모두 canonical이 chrisleepapa.com의 해당 경로를 가리키며 meta robots는 `index, follow`.
- 6개 모두 AdSense loader 1회, 직접 `adsbygoogle.push` 0회다. 페이지 내부에 수동 광고 슬롯은 이번 정적 검사에서 확인되지 않았다.
- 6개 페이지의 H1은 각각 1개다. 이미지 요소는 모두 alt 속성이 있다. 라이트 모드 대비 CSS 규칙이 각 페이지에 존재한다. 실제 화면 대비/반응형 레이아웃은 브라우저 Preview 확인 전까지 미검증이다.

### SISTER SQUAD 허브
- 약 1,120단어의 소개와 두 자매·가족·요정·적대 세력·세계관·마법 아이템·두 권의 이야기 설명이 포함되어 있다.
- 이미지 45개와 영상 임베드 1개가 있으며 이미지 alt 속성은 모두 존재한다.
- 창작 세계관의 중심 허브로서 작품·캐릭터·후속 이야기로 연결하는 구조다.
- 별도 JSON-LD 구조화 데이터는 확인되지 않았다. 필수 AdSense 요건은 아니며, 이후 SEO 개선 시 CreativeWork/WebPage 구조화 데이터를 추가할 수 있다.

### SISTER SQUAD 1
- 페이지에는 1권의 핵심 줄거리, 율·정 캐릭터 설명, 작가의 창작 의도, OST, 책 구매/영문 샘플 링크, 창작 과정 Journal 링크가 포함되어 있다.
- 본문 문단 추출만으로는 약 299단어로 짧게 집계되지만, 페이지에는 추가 언어별 콘텐츠 데이터와 2개의 영상 임베드가 있어 단순 링크 페이지만은 아니다.
- Article JSON-LD가 이미 존재하며, canonical·index/follow·AdSense loader 설정도 확인했다.
- 이번 점검에서 콘텐츠를 불필요하게 반복 확장하지 않았다. 향후 책 소개의 독자 가치, 상세 목차/샘플, 출판 정보 등을 실제 출판물과 대조해 추가할 수 있다.

### SISTER SQUAD 2
- 약 649단어의 소개, 두 자매와 아빠의 캐릭터 변화, 두 번째 모험의 갈등/회복 주제, OST, 세 편의 짧은 영상과 본편, NG 영상 및 제작 노트가 있다.
- 이미지 3개, 영상 임베드 6개, FULL STORY 안내가 확인됐다.
- 섹션 제목은 `SISTER SQUAD 2 영상`, 본편 CTA는 `Full Story`로 구분되어 있다. 영상 소개 문장에서 세 개의 예고편을 설명하는 것은 콘텐츠 유형 안내로 유지했다.
- canonical·index/follow·AdSense loader 설정은 정상이다.

### Yul / Jung 캐릭터 프로필
- Yul 약 604단어, Jung 약 598단어의 소개로 각 캐릭터의 성격, 능력, 자매 관계, 1·2권의 성장, 창작 배경을 각각 설명한다.
- 두 페이지 모두 이미지 15개, 영상 임베드 1개, 이미지 alt 속성 전체 존재, 라이트 모드 관련 CSS 규칙이 확인됐다.
- 두 프로필 모두 canonical·index/follow·AdSense loader 1회다.
- 별도 JSON-LD는 없지만 필수 광고 정책 문제로 보지는 않는다. 필요 시 캐릭터 프로필을 설명하는 CreativeWork/WebPage 구조화 데이터를 추가할 수 있다.

### TuTu PuPu PiPi
- 약 510단어의 소개와 캐릭터 3명의 역할, 세계관, 제작 의도, 공식 OST 설명이 있다.
- 이미지 11개, YouTube Shorts 6개가 개별 제목·설명·YouTube 링크와 함께 등록되어 있으며, YouTube/Spotify 공식 OST 임베드도 존재한다.
- 메타 설명의 “6편 Shorts”와 실제 6개 영상 링크 수가 일치한다.
- canonical·index/follow·AdSense loader 1회, 이미지 alt 전체 존재, 라이트 모드 CSS 규칙을 확인했다.
- 별도 JSON-LD는 확인되지 않았다. 필수 AdSense 정책 문제는 아니며 추후 SEO 개선 항목이다.

### 판정
- 이번 점검 범위에서 잘못된 canonical, noindex, 광고 로더 중복, 이미지 alt 누락, TuTu 영상 수 불일치 등 즉시 수정이 필요한 기술 오류는 발견하지 못했다.
- SISTER SQUAD 허브와 개별 작품 페이지는 독창적인 세계관·캐릭터·창작 과정 설명을 포함한다.
- 다만 SISTER SQUAD 1의 정적 본문 텍스트는 상대적으로 짧게 집계되므로, 향후 실제 책의 목차·출판 정보·독자가 얻을 수 있는 내용 등 검증 가능한 세부 정보를 보강할 여지가 있다. 임의의 줄거리나 출판 사실을 추가하지 않는다.
- 이번 점검에서는 페이지 본문이나 광고 설정을 임의로 변경하지 않았다. main은 변경하지 않았다.

### 다음 점검
**Music / Worship / Worship English / Movie 페이지의 음원·영상 출처, 원작·커버·AI 활용 고지, 내부 링크와 광고 대상 범위를 교차 점검한다.** 특히 커버곡·리믹스·연주곡·워십 음원의 권리/배포 플랫폼 정보를 구분해 사실과 일치하는지 확인한다. Preview 배포 한도 해소 전까지는 소스 검사와 정적 검증만 진행한다.


## 2026-11-02 Music / Worship / Movie 권리·콘텐츠·광고 범위 점검

### Music Archive
- `music.html`은 14개 발매작을 Spotify/YouTube 링크와 함께 소개하고, AI 활용과 창작자의 선택·수정 과정을 설명한다. 정적 HTML 기준 약 746단어의 창작 설명이 있다.
- 다만 앨범 `영역전개`는 주술회전의 캐릭터/기술에서 영감을 받았다고, `벽력일섬`은 귀멸의 칼날의 주(柱) 캐릭터에서 영감을 받았다고 페이지 설명이 명시한다. 이는 제3자 IP와 연관된 팬 창작물일 수 있으며, 단순히 “영감” 또는 출처를 표기한 것만으로 상업적 이용 권한이 확보되는 것은 아니다.
- 두 앨범의 실제 음원·커버 이미지·배포 권한은 이 저장소만으로 확인할 수 없고, 권리자 허가나 이용 가능한 라이선스 문서도 저장소에서 확인하지 못했다.
- **예방 조치:** 혼합형 Music Archive에는 위 두 IP 연관 작품이 함께 표시되므로, 권리 확인 전까지 `music.html`에서 AdSense loader를 임시 제외했다. 페이지는 index/follow와 canonical을 유지하고, 앨범·작품을 삭제하지 않았다. 직접 광고 push도 없다.
- 변경 커밋: `004c7745bb4cf9f296add5148b6169423a8599f0`.
- 권리 확인 후 두 작품의 원작 IP 사용 범위와 커버 아트/음원 권리를 확인하고, 필요하면 팬 창작물 전용 비광고 페이지로 분리한 뒤 Music Archive의 광고 여부를 다시 결정한다.

### Korean Worship
- `worship.html`에는 Vol.1~Vol.3 각 10곡의 가사(총 30곡), 앨범 이야기, Spotify/YouTube 공식 링크, Whispers Of Grace 앨범 소개가 있다.
- 기존 meta description은 Vol.1~Vol.3만 언급하고 Whispers Of Grace를 누락해 실제 앨범 구성에 맞게 수정했다.
- 가사·예배 방향은 창작자가 직접 구상·수정하고 Suno 등 AI 음악 도구는 보컬·연주·편곡 구현을 돕는 제작 도구로 사용했다는 설명을 추가했다. AI 생성 결과를 자동 게시하지 않고 선택·수정한다는 제작 과정도 설명한다.
- AdSense loader 1회, 직접 push 0, canonical 및 index/follow 유지.
- 변경 커밋: `aa1a7c9ff02c92aa406f9f7664674114be72d426`.

### English Worship — SHOUT
- `worship_eng.html`에는 SHOUT 앨범 소개, 앨범 스토리, 공식 Spotify/YouTube 링크, 15곡의 전체 가사가 있다.
- 창작자가 가사·주제·예배 방향을 개발·수정하고 AI 음악 도구(Suno 포함)가 보컬·연주·편곡 제작을 보조한다는 설명을 추가했다. 생성 결과를 자동으로 발매하지 않고 사람이 검토·선택한다는 점을 명확히 했다.
- AdSense loader 1회, 직접 push 0, canonical 및 index/follow 유지.
- 변경 커밋: `5658a82176e62cc89b328314b388f00362de3f3d`.

### Creator's stated music workflow — 권리 문서 대체 아님
- 사용자는 이전 대화에서 본인의 곡을 기획·작사하고 AI 초안을 직접 수정·보완했으며, Suno에서 WAV로 출력해 DistroKid에 배포했다고 설명했다.
- 또한 Suno의 Cover 기능은 타인의 곡을 무단으로 커버하기 위한 것이 아니라 본인이 만든 곡의 영어 버전 또는 연주곡 버전을 제작하는 데 사용했다고 설명했다.
- 이 설명은 제작 과정의 맥락이며, 실제 배포 권리·Suno/DistroKid 라이선스·샘플/보컬 권리·제3자 IP 포함 여부를 증명하는 계약서나 권리 증빙을 대신하지 않는다. 관련 증빙은 별도로 보관해야 한다.

### Movie Archive
- `movie.html`에는 FURIOUS, 귀멸의 칼날 캐릭터를 실사 촬영 현장에 배치한 AI 영상 콘셉트, 사랑한다고 등 3개 제작 노트와 이미지/쇼츠 자료가 있다.
- 귀멸의 칼날 캐릭터를 명시적으로 사용한 영상은 제3자 IP 기반 파생 콘텐츠로 취급해야 하며, 권리 허가 여부는 미확인이다.
- 이 페이지는 기존 주석에 따라 AdSense loader가 0개이고, 이번 점검에서도 광고 코드를 추가하지 않았다. index/follow 및 canonical은 유지한다.
- Google Publisher Policies는 타인의 저작권을 침해하는 콘텐츠를 허용하지 않으며, 다른 사람의 콘텐츠를 복제·임베드한 화면에는 추가 설명·큐레이션·가치가 필요하다고 안내한다. 단순 출처 표기나 비공식 고지만으로 저작권 허가가 생기는 것은 아니다.

### 최종 확인 및 미해결
- Music: canonical 정상, index/follow, AdSense loader 0(예방 조치), 직접 push 0.
- Korean Worship: canonical 정상, index/follow, AdSense loader 1, 직접 push 0, 30곡 가사 및 4개 앨범 설명.
- English Worship: canonical 정상, index/follow, AdSense loader 1, 직접 push 0, 15곡 가사 및 SHOUT 설명.
- Movie: canonical 정상, index/follow, AdSense loader 0, 직접 push 0.
- 이 단계의 점검은 소스 기준이다. 최신 변경 소스의 Preview 배포가 아직 완료되지 않아 브라우저 렌더링과 실제 광고 요청 여부는 미검증이다.
- 제3자 IP 연관 음원·영상의 권리 허가 여부는 미해결 상태로 유지한다. 페이지의 광고 제외는 위험을 줄이는 조치이지 권리 허가나 법률 판단이 아니다.

### 참고 정책
- Google Publisher Policies — Intellectual property abuse 및 replicated content: https://support.google.com/adsense/answer/10502938
- AdSense Program Policies: https://support.google.com/adsense/answer/48182

### 다음 점검
**Shop / Contact / Privacy / Terms 및 나머지 sitemap 대상 페이지의 광고 로더·색인·canonical·내부 링크를 최종 대조한다.** 특히 Shop은 구매 링크 중심 페이지이므로 자체 설명과 상품 소개의 독창적 가치가 충분한지 확인하고, 광고 로더가 없는 현재 상태를 유지한다.


## 2026-11-02 Shop / Contact / Privacy / Terms / Guestbook 최종 대조

### Shop
- `shop.html`은 canonical `/shop`, robots `index, follow`, 이미지 10개, 공식 서점/플랫폼 구매 링크를 제공한다.
- SISTER SQUAD 1·2, 컬러링북, 오디오북, MIRACLE SHOT의 종이책/전자책 링크가 실제 소스에 존재한다. meta description의 MIRACLE SHOT 언급과 본문 상품 구성이 일치한다.
- 본문은 약 251단어로 구매 링크 중심의 카탈로그 성격이다. 현재 sitemap에는 포함되지 않으며 AdSense loader 0개다. 광고를 추가하지 않고, 검색 노출이 꼭 필요한 상점 랜딩페이지로 운영할지 여부는 별도 판단 대상으로 남긴다.
- 페이지 목적이 구매처 연결이므로 별도 광고를 추가하지 않는 현재 상태를 유지한다.

### Contact
- canonical `/contact`, robots `index, follow`, AdSense loader 0개.
- 이메일, Instagram, Facebook 연락 링크와 협업/문의 목적을 제공한다. 연락 창구 페이지 특성상 짧은 본문은 기능상 자연스럽고, 광고도 없다.

### Privacy / Terms
- 두 페이지 모두 canonical 정상, robots `index, follow`, AdSense loader 0개.
- Privacy는 한국어/영어 양쪽의 수집 항목, 이용 목적, AdSense/Analytics, 국외 처리, 쿠키, 보관 기간, 권리 행사 및 문의 정보를 제공한다.
- Terms는 한국어/영어 양쪽의 이용 조건, 운영자 창작물과 제3자 자료의 권리 구분, 금지 행위, 방명록/UGC, 외부 서비스, 면책 및 약관 변경 안내를 제공한다.
- 11월 2일 수정본은 develop 소스에 존재하지만 새 Preview 배포가 되지 않아 실제 제공 응답은 아직 검증되지 않았다.

### Guestbook
- `guestbook.html`은 canonical `/guestbook`, robots `noindex, follow`, AdSense loader 0개다.
- 사용자 게시 기능만 제공하는 페이지이므로 sitemap에 포함되지 않는 현재 상태가 적절하다.

### Bible / Today 색인 정책 재확인
- `bible.html`: meta robots `index, follow`, canonical `/bible`, sitemap 포함, AdSense loader 0개.
- `today.html`: meta robots `noindex, follow`, canonical `/today`, sitemap 제외, AdSense loader 0개.
- develop Preview 전체에 붙는 `X-Robots-Tag: noindex, nofollow`를 개별 Production 페이지의 색인 설정으로 오해하지 않도록 앞선 Bible/Today 점검 기록을 정정했다.

### 종합 판정
- Shop, Contact, Privacy, Terms, Guestbook에는 AdSense loader가 없다.
- Shop은 sitemap에 없고, Guestbook은 noindex 및 sitemap 제외다.
- Bible은 검색 대상이지만 광고 로더는 제외되어 있다. 개역개정 본문과 찬송가 자료 권리 확인은 계속 미해결로 남는다.
- 이번 단계에서 Shop/Contact/Privacy/Terms/Guestbook의 코드는 추가 수정하지 않았다. main은 변경하지 않았다.
- 새 Preview가 준비되기 전까지 11월 2일 변경분은 develop 소스 반영 완료, 실제 Preview/Production 미검증으로 유지한다.


## 2026-11-02 최신 develop Preview 검증 — 코드 변경분 반영 확인

### 확인한 배포
- 코드 변경 검증 배포: `dpl_5Qd49Cw7YGJXSi9NNJP3cKcySbd8` (READY, commit `1f1499d28d53a4558abbd206b4f405361bc8a379`).
- 후속 develop 배포: `dpl_rAmmWbrvknRUU7d8Ba2L5KbU1vyo` (READY, commit `c2c5be679886ae8d0717ac5bce845bca0bfda7f7`).
- Alias: `develop.chrisleepapa.com` — 후속 READY 배포에 연결 확인.
- 이 배포는 Journal 1 구조화 데이터, Privacy/Terms 수정, Music 광고 로더 제외, Korean/English Worship 제작 설명 변경을 모두 포함한 코드 커밋이다.
- 이후 감사 문서만 수정한 커밋 `f943adf`, `c2c5be6`까지 포함한 develop 배포 `dpl_rAmmWbrvknRUU7d8Ba2L5KbU1vyo`도 READY가 되었고, `develop.chrisleepapa.com` alias가 연결된 것을 확인했다. 이 배포의 코드 결과는 앞서 검증한 코드 변경을 그대로 포함한다.

### HTTP 200 및 HTML 원문 확인
| 경로 | HTTP | Meta robots | AdSense loader | 핵심 확인 |
|---|---:|---|---:|---|
| `/music` | 200 | index, follow | 0 | 권리 확인 전 광고 로더 제외 문구 반영 |
| `/worship` | 200 | index, follow | 1 | AI 제작 과정 설명 및 앨범 설명 수정 반영 |
| `/worship_eng` | 200 | index, follow | 1 | SHOUT AI 보조 제작 설명 반영 |
| `/journal-1` | 200 | index, follow | 1 | Article JSON-LD 반영 |
| `/privacy` | 200 | index, follow | 0 | 2026-11-02 수정일·방명록·게임 순위·삭제 안내 반영 |
| `/terms` | 200 | index, follow | 0 | 제3자 콘텐츠 권리 구분 반영 |
| `/shop` | 200 | index, follow | 0 | 구매 링크 페이지, 광고 없음 |
| `/contact` | 200 | index, follow | 0 | 연락처 페이지, 광고 없음 |
| `/bible` | 200 | index, follow | 0 | canonical 정상, sitemap 포함 |
| `/today` | 200 | noindex, follow | 0 | sitemap 제외 |
| `/guestbook` | 200 | noindex, follow | 0 | 광고 없음 |
| `/goal` | 200 | noindex, nofollow | 0 | 광고 없음 |
| `/gameinfo` | 200 | noindex, nofollow | 0 | 광고 없음 |

### Preview 헤더 주의
- 위 경로들은 모두 Preview에서 응답 헤더 `X-Robots-Tag: noindex, nofollow`를 받는다. 이는 develop 호스트 전체의 보호 설정이며, 각 페이지의 Production meta robots와 별개다.
- 따라서 위 표는 HTML 원문 meta robots와 페이지별 광고 코드 유무를 검증한 것이다. Production 색인 상태를 직접 확인한 결과로 오해하지 않는다.

### 판정
- 코드 변경이 포함된 READY Preview에서 Music 광고 제외, Worship 제작 설명, Journal 1 Article JSON-LD, Privacy/Terms 수정이 모두 응답 HTML에 반영된 것을 확인했다.
- 광고 로더는 Music 0, Korean Worship 1, English Worship 1, Journal 1 1, Privacy/Terms/Shop/Contact/Bible/Today/Guestbook/Goal/Gameinfo 0으로 확인했다.
- main은 변경하지 않았다. 최신 main 대비 develop은 ahead이며 behind 0 상태를 유지한다.
- 실제 브라우저 화면/모바일 상호작용과 Google Search Console 색인 상태는 별도 검증 대상이다.


## 2026-11-02 계정 보안 후속 설계 — 모든 개인 RPC 경로 추적

### 확인한 직접 호출 지점
- `js/auth.js`: `clp_login`, `clp_load_today`, `clp_save_today`.
- `today.html`: `clp_list_today_records`, `clp_save_today`, `clp_load_bible_journey`, `clp_save_bible_journey`.
- `js/today-history.js`: `clp_list_today_records`, `clp_delete_today`.
- `js/today-prayer-notes.js`: `clp_prayer_notes_load`, `clp_prayer_notes_save`, `clp_prayer_notes_delete`, `clp_prayer_daily_set`.
- `bible.html`: `clp_load_bible_records`, `clp_save_bible_record`, `clp_load_bible_journey`, `clp_load_bible_leaderboard`.
- `js/bible-layout.js`: `clp_load_bible_records`, `clp_save_bible_record`.
- 따라서 로그인만 제한하는 것으로는 충분하지 않다. TODAY, 성경 묵상/진행, 기도노트 RPC도 브라우저에서 직접 호출되며 같은 이니셜/PIN 해시 검증에 의존한다.

### 보안 위험의 정확한 범위
- `clp_login`은 `anon` 역할에서 호출 가능하고, 영문 3자리 이니셜 계정을 생성할 수 있으며, PIN 해시를 직접 비교한다.
- 프런트엔드는 4자리 PIN을 SHA-256으로 해시한 값을 보내고 localStorage에 보관한다. 이 해시는 salt 없이 계산된다.
- 개인 기록 관련 `SECURITY DEFINER` RPC도 `anon` 역할에서 호출할 수 있다. 각 RPC가 PIN 해시와 이니셜을 다시 검증하므로 단순히 로그인 UI를 통과하지 않는 것만으로 보호되지 않는다.
- 로그인 실패 횟수 제한을 확인하지 못했다. 그러나 `clp_login`만 잠그면 다른 개인 기록 RPC를 통한 온라인 추측 시도는 계속 가능하다.
- 반대로 개인 RPC의 `anon EXECUTE` 권한을 일괄 취소하면 현재 브라우저 코드가 직접 호출하는 계정·성경·TODAY·기도노트 기능이 중단될 수 있다. 이번 점검에서 권한을 변경하지 않았다.

### 권장 개선 아키텍처
1. **공통 Edge Function 게이트웨이**를 만들어 로그인 및 모든 개인 기록 RPC 호출을 통과시킨다. 클라이언트는 Supabase REST의 `/rpc/clp_*`를 직접 호출하지 않고 Edge Function만 호출한다.
2. 게이트웨이에서 요청 IP와 이니셜을 함께 기준으로 실패 시도를 제한한다. IP 원문을 저장하지 않고 서버 비밀키를 사용한 해시값만 보관한다. 초기 정책은 계정 영구 잠금 대신 짧은 쿨다운/점진적 지연을 사용해 공격자의 계정 잠금 유발(DoS)을 줄인다.
3. Edge Function은 서버 전용 `service_role` 키로 내부 RPC를 호출한다. 이 키는 브라우저 코드나 Git 저장소에 절대 넣지 않는다.
4. 모든 개인 RPC를 Edge Function 경유로 전환하고 Preview에서 로그인·계정 생성·TODAY 저장/삭제·성경 진행/묵상·기도노트 저장/삭제를 확인한 다음에만 개인 RPC의 직접 `anon EXECUTE`를 제한한다.
5. 공개 콘텐츠 및 공개 순위 조회는 별도 검토한다. `clp_load_bible_leaderboard`처럼 로그인 없는 공개 순위 데이터와 개인 기록 RPC를 같은 권한 묶음으로 취급하지 않는다.
6. PIN 저장은 단계적으로 salt가 있는 강한 KDF로 이전한다. 기존 계정은 다음 정상 로그인 때 새 방식으로 재해시하는 방식으로 마이그레이션하고, 이전 로그인 호환 기간과 롤백 경로를 둔다. 단순히 기존 PIN 해시를 한 번에 폐기하지 않는다.

### 이번 단계의 조치 여부
- 직접 RPC 호출 지점을 전부 추적해 보안 개선 범위를 확인했다.
- 현재 Supabase 프로젝트에는 테스트용 branch가 없으며, 실제 계정이 사용하는 DB다. 브라우저 코드만 먼저 바꾸거나 DB 권한을 먼저 잠그면 기존 개인 기록 기능이 끊길 수 있다.
- 따라서 이번 단계에서는 운영 DB 함수, 권한, 테이블, Edge Function을 변경하지 않았다. 계정 데이터도 읽지 않았다.
- 이 작업은 AdSense 콘텐츠 점검과 별개의 보안 개선 작업이며, 테스트 환경을 마련하고 모든 클라이언트 호출을 한 번에 전환할 수 있을 때 진행한다.


## 2026-11-02 Home 페이지 heading 정리

- `index.html`은 canonical `/`, robots `index, follow`, AdSense loader 1회, 직접 `adsbygoogle.push` 0회로 설정되어 있다.
- 정적 소스에서 H1이 2개였던 원인은 실제 페이지 제목과 `noscript` 대체 안내가 각각 H1을 사용했기 때문이다.
- 실제 표시 콘텐츠의 H1인 `창작 기록과 제작 과정`은 유지하고, `noscript` 대체 제목은 굵은 문단으로 변경해 H1을 1개로 정리했다.
- 변경 커밋: `fbe40fa56d0e334b2bf335ecf8e0b2156d53deee`.
- 정적 재검증: H1 1개, canonical 정상, index/follow, AdSense loader 1회, 직접 push 0회.
- Preview 배포는 코드 변경 후 자동 빌드 상태를 확인하고 별도로 검증한다. main은 변경하지 않았다.


### Home H1 수정 Preview 확인 — 2026-11-02
- Home H1 수정 `fbe40fa56d0e334b2bf335ecf8e0b2156d53deee`를 포함한 최신 READY Preview 배포는 `dpl_JAQPbN17kL4m6yx33QiCxxNQbtDQ` (최종 audit doc commit `e722f150bff92c468bc1961b0964fb3e34781472))다.
- `develop.chrisleepapa.com/` HTTP 200, canonical `/`, meta robots index/follow, H1 1개, AdSense loader 1개를 확인했다.
- 같은 최신 Preview에서 `/music` loader 0, `/worship` 및 `/worship_eng` 제작 안내 반영/loader 1, `/privacy` 및 `/terms` 최신 문구 반영/loader 0을 재확인했다.
- Production 비교: `chrisleepapa.com/`은 기존 H1 2개, `/music` loader 1개, Worship 페이지는 신규 AI 제작 안내가 아직 없고, Privacy/Terms는 11월 2일 수정 전 문구를 제공한다. 이는 main을 변경하지 않고 develop에서만 검증 중인 현재 배포 절차와 일치한다.
- 최신 main 대비 develop: ahead 39 / behind 0. main은 수정하지 않았다.


## 2026-11-02 이어서 점검 — 최신 Preview 상태 및 Music 페이지

### Preview 상태
- 직전 문서 커밋 `07eba16205c24e69285305616a9971960287ecea`의 Vercel 배포 `dpl_3YzszGkSUzCZvTC3D7a6tYBFLBzR`를 다시 조회했다.
- 상태: `READY`; alias: `develop.chrisleepapa.com`.
- 이번 Music 수정 커밋은 이 READY 배포 이후에 생성되었으므로, 수정된 Music 페이지가 Preview에 반영되었다고 간주하지 않는다.
- 일일 배포 한도 상황을 고려해 새 배포를 수동 요청하지 않았다.

### Music 페이지 정적 감사
**대상:** `music.html`, `js/music-production-notes.js`

**수정 전 확인**
1. `music.html` canonical은 `https://chrisleepapa.com/music`, robots는 `index, follow`.
2. AdSense 로더 0회, 수동 광고 단위 0개, `adsbygoogle.push` 0회. 페이지 상단 주석은 애니메이션 팬메이드 작품의 권리 검토가 끝날 때까지 광고 로더를 제외한다고 설명한다.
3. 음악 데이터는 14개 작품을 포함한다. 별도 동적 제작 노트 스크립트에는 14개 작품 각각의 출발점·제작 방향·감상 포인트·참고용 프롬프트가 있고, 한국어/영어 설명 데이터가 존재한다.
4. 기존 앨범 이야기 데이터 `MUSIC_STORIES`는 12개 작품만 포함해 `Winter town`, `Winter groove` 두 작품이 앨범 이야기 영역에서 누락되는 것을 확인했다. 두 작품은 제작 노트에는 이미 존재했다.
5. Spotify 플레이어는 iframe API와 fallback iframe을 사용하는 구조다. 정적 HTML에서 확인되는 iframe은 GTM noscript와 Spotify fallback 2개이며, YouTube는 앨범별 외부 링크로 제공된다.
6. 음악 제작 노트는 작품별 설명과 함께 프롬프트가 실제 원문 입력값이 아니라 작품의 분위기와 주제를 바탕으로 재구성한 참고용이라는 점을 명시한다. 이는 실제 제작 로그와 재구성 예시를 혼동하지 않도록 하는 설명이다.
7. 본문에는 별도의 창작 판단 기준(감정에서 사운드로 옮기기, 생성 결과 검토·수정, 발매 이후 맥락 기록)이 한국어/영어로 포함되어 있다.

**최소 수정**
- `music.html`의 `MUSIC_STORIES.ko`와 `MUSIC_STORIES.en`에 `Winter town`, `Winter groove`의 작품별 이야기를 추가했다.
- 추가 설명은 기존 제작 노트의 주제·제작 방향에 근거해 작성했으며, 새로운 발매 이력이나 실제 작업 과정을 만들어 넣지 않았다.
- 기존 음원 링크, 앨범 데이터, 플레이어, 광고 제외 상태는 변경하지 않았다.
- develop 커밋: `832298fc05c61ff6a3b4394e9cefeabce46d86bd`
- 수정 파일 blob SHA: `9e8e3f065bbccad45f0da0fc455ad5b389b03478`

**재검증**
- [x] 음악 데이터 작품 수 14개 확인
- [x] 앨범 이야기 키 14개로 일치, 누락 0개
- [x] Winter town 한국어/영어 설명 존재
- [x] Winter groove 한국어/영어 설명 존재
- [x] canonical 1개 및 robots index/follow 유지
- [x] AdSense 로더 0회, 수동 광고 단위 0개 유지
- [x] 수정은 develop에만 반영
- [ ] 수정 커밋의 Vercel Preview 배포 완료 및 실제 렌더링
- [ ] 한국어/영어 전환, Spotify 재생, 모바일/PC 레이아웃 브라우저 확인
- [ ] Auto ads가 페이지에 실제 노출되지 않는지 AdSense/브라우저에서 확인

**별도 미해결 사항**
- `영역전개`, `벽력일섬` 등 제3자 애니메이션 IP에서 영감을 받은 작품의 권리·서비스 약관 문제는 이번 콘텐츠 보완으로 해결되지 않는다. 현재 Music 페이지의 AdSense 로더는 계속 제외 상태로 둔다.
- 저작권/서비스 약관의 적법성 판단은 이 정적 감사의 범위를 벗어나며, 권리 확인을 완료했다고 기록하지 않는다.

### 다음 단일 작업
**Worship 페이지의 동적/정적 창작 설명, 앨범·곡별 정보, 광고 로더 및 외부 임베드 구성을 소스 기준으로 점검한다.** 실제 화면의 재생·광고 위치는 배포 및 브라우저 확인 전까지 미검증으로 둔다.


## 2026-11-02 이어서 점검 — Worship / English Worship

### Korean Worship 정적 감사
**파일:** `worship.html` (수정 후 blob SHA는 후속 재검증 결과 참조)

- canonical `/worship`, robots `index, follow`, H1 1개.
- AdSense 로더 1회, 수동 광고 단위 0개, `adsbygoogle.push` 0회. 자동 광고 실제 배치는 브라우저/AdSense 설정에서 별도 확인해야 한다.
- 앨범 카드 4개: 나의 찬양 Vol.1·Vol.2·Vol.3 및 Whispers Of Grace ver1. Spotify/YouTube 외부 링크가 각 앨범 카드에 연결되어 있다.
- 가사 아카이브는 나의 찬양 Vol.1~3의 30개 트랙으로 구성된다. 앨범 이야기 4개와 창작/제작 과정 카드가 있으며, 가사·앨범 설명 외에도 창작 동기, 앨범별 주제, 제작 판단을 설명한다.
- 제작 설명은 가사·곡 주제·예배 방향을 창작자가 기획·수정하고, Suno 등 AI 도구는 보컬·연주·편곡 구현에 활용했으며 여러 생성 결과를 검토·선택·수정했다는 역할 구분을 포함한다.
- Spotify 앨범 커버 이미지는 Spotify oEmbed API로 동적으로 가져오는 코드가 있다. 실제 API 성공, 이미지 표시, 네트워크 실패 시 대체 이미지 및 모바일 표시 상태는 브라우저 검증 전까지 미확인이다.
- 별도 Spotify 음악 iframe 임베드는 없고, 앨범 외부 링크와 동적 커버 조회를 사용한다. 정적 iframe은 GTM noscript 1개다.

### English Worship 정적 감사
**파일:** `worship_eng.html`

- canonical `/worship_eng`, robots `index, follow`, H1 1개.
- AdSense 로더 1회, 수동 광고 단위 0개, `adsbygoogle.push` 0회.
- SHOUT 앨범 카드, Spotify/YouTube 공식 링크, 5개 제작·주제 스토리 카드, 15개 트랙 가사 아카이브가 있다.
- Human direction / AI-assisted production 영역에서 가사·주제·예배 방향의 창작자 역할과 AI 도구의 제작 보조 역할을 구분한다.
- 외부 음악은 링크로 제공하며, 별도 Spotify 임베드는 확인되지 않았다. 정적 iframe은 GTM noscript 1개다.

### 발견 및 최소 수정
- Korean Worship의 일반 meta description에는 Whispers Of Grace가 포함되어 있었지만 Open Graph description에는 빠져 있어 검색/공유 메타 설명이 서로 달랐다.
- Open Graph description에도 Whispers Of Grace를 추가해 네 앨범 정보가 일치하도록 수정했다.
- develop 커밋: `29807c30a62715f41417ac389be506080809d32c`
- 이번 수정은 메타 설명 한 줄만 변경했다. 앨범, 가사, 링크, 광고 설정은 변경하지 않았다.

### 재검증 및 미완료
- [x] Korean Worship 4개 앨범 카드 및 Vol.1~3 가사 30개 확인
- [x] English Worship SHOUT 15개 가사 확인
- [x] 양쪽 페이지의 창작·AI 제작 과정 설명 확인
- [x] canonical/robots/H1 및 광고 로더 구조 확인
- [x] Korean Worship Open Graph 설명에 Whispers Of Grace 반영
- [ ] Spotify 커버 API, 외부 링크, 모바일/PC 실제 렌더링 확인
- [ ] 자동 광고 실제 노출 위치 및 본문/가사와의 간섭 여부 확인
- [ ] 앨범별 음원·커버 아트 권리 및 플랫폼 약관 확인은 별도 권리 검토로 유지

### 다음 단일 작업
**About 페이지의 콘텐츠 독립성, 사이트 내 창작자/운영 정보, canonical 및 구 Vercel 도메인 참조를 소스 기준으로 점검한다.** 과거 Search Console에서 구 Vercel 주소가 Google 선택 canonical로 잡힌 이력이 있으므로, 내부 링크·canonical·사이트맵 일치 여부를 특히 확인한다.


## 2026-11-02 이어서 점검 — About 페이지 및 표준 URL

**대상:** `about.html`, `index.html`, `js/main.js`, `sitemap.xml`

- `about.html` canonical은 `https://chrisleepapa.com/about`, robots는 `index, follow`, H1 1개.
- `about.html` AdSense 로더 1회, 수동 광고 단위 0개, `adsbygoogle.push` 0회. 자동 광고 실제 위치는 별도 브라우저 확인이 필요하다.
- 본문에는 창작자 소개와 여정, Creative Philosophy, 아카이브에서 다루는 작품 분야, 제작 과정, 2025.07~2026.10 연혁, YouTube/Spotify/TikTok 공식 프로필 링크가 있다. 태그·스크립트 제거 기준 약 586단어이며, 외부 임베드만으로 구성된 페이지가 아니다.
- About 페이지의 링크는 공식 SNS 3개이며, 작품 상세 페이지로 직접 연결하는 본문 링크는 확인되지 않았다. 다만 전역 메뉴를 통한 탐색이 가능하므로 이번에는 임의로 링크를 추가하지 않았다. 향후 사용자가 작품별 바로가기 영역을 원하면 별도 개선 대상으로 검토한다.
- About 페이지 자체에서 구 Vercel `.vercel.app` 주소 참조는 발견되지 않았다.
- `index.html` canonical은 루트 `https://chrisleepapa.com/`, robots는 `index, follow`이며 구 Vercel 주소 참조가 없다.
- `js/main.js`에서도 구 Vercel 주소 참조가 발견되지 않았다.
- `sitemap.xml`에는 `https://chrisleepapa.com/about`이 포함되어 있으며 구 Vercel 주소는 없다.
- 위 네 파일의 정적 소스에서 표준 도메인과 구 Vercel 주소 참조는 일관된다. 다만 과거 Search Console의 Google 선택 canonical 이력은 실제 Google 색인 상태이므로, 이 소스 검사만으로 해결되었다고 판정하지 않는다.

**판정:** About 페이지의 독립적인 창작자·사이트 설명은 확인되며, canonical/robots/sitemap 소스도 일치한다. 코드 수정은 하지 않았다.

**미완료:** Search Console에서 `/about`의 Google 선택 canonical이 현재도 구 Vercel 도메인인지, 새 크롤링 후 갱신되었는지 확인해야 한다. 실제 브라우저의 모바일/PC 표시와 자동 광고 위치도 미검증이다.

### 다음 단일 작업
**Journal 1~6의 Article 구조화 데이터, 날짜·작성자·canonical·내부 링크를 한 번에 대조한다.** 이미 확인한 Journal 1의 Article JSON-LD 추가 이력을 포함해 6개 문서 사이의 메타데이터 일관성을 정적 소스로 확인한다.


## 2026-11-02 이어서 점검 — Journal 1~6 Article 구조화 데이터

**대상:** `journal-1.html` ~ `journal-6.html`

### 공통 확인
- 여섯 페이지 모두 canonical이 각 페이지의 `https://chrisleepapa.com/journal-N` 경로와 일치한다.
- 여섯 페이지 모두 robots `index, follow`.
- 여섯 페이지 모두 Article JSON-LD 블록 1개가 있고 JSON 파싱 오류가 없다.
- 여섯 페이지 모두 AdSense 로더 1회, 수동 광고 단위 0개, `adsbygoogle.push` 0회.
- 각 Article의 headline, author, mainEntityOfPage는 존재하며, mainEntityOfPage는 해당 페이지 canonical과 일치한다.
- 본문 분량은 정적 태그 제거 기준 약 860~1,975단어로 확인되며, 여섯 문서 모두 제작 경험·과정·배운 점을 설명하는 독립적인 글이다.
- Journal 내부 링크는 1→2, 2→1·3, 3→2·4, 4→3·5, 5→4, 6→5로 연결된다. Worship 페이지에서도 Journal 6으로 연결되는 링크가 있다.

### 문서별 차이 및 보완 판단
- Journal 1: Article JSON-LD의 headline, description, URL, mainEntityOfPage, image, author, publisher, articleSection이 유효하게 존재한다. 다만 정확한 게시일/수정일을 확인할 수 있는 근거가 없어 datePublished/dateModified는 넣지 않은 상태다. 날짜를 임의로 만들지 않고 유지한다.
- Journal 2·3: datePublished `2026-08-01`, dateModified `2026-09-11` 및 image, author, publisher 등이 포함된다.
- Journal 4·5·6: datePublished/dateModified와 author가 포함된다. Journal 4·5·6은 Article JSON-LD의 image/publisher 세부 필드가 앞선 문서와 다르다. 실제 대표 이미지가 무엇인지 임의로 지정하지 않고, 현재 구조를 유지한다.
- 모든 문서의 og:image는 존재한다. 일부 문서는 공통 공유 이미지, Journal 6은 `images/My hymn3.jpg`를 사용한다. OG 이미지가 있다는 사실만으로 그것을 기사 대표 이미지로 자동 복사하지 않는다.

**판정:** 구조화 데이터는 여섯 페이지 모두 파싱 가능하고 핵심 식별 정보가 canonical과 일치한다. 날짜·이미지 근거가 확인되지 않은 필드는 임의로 보충하지 않는다. 이번 단계에서 사이트 코드는 수정하지 않았다.

**미완료:** Search Console/리치 결과 테스트에서 실제 Google 해석 결과를 확인하지 못했다. 실제 브라우저의 글 본문, 광고 위치, 모바일/PC 표시도 미검증이다.

### 다음 단일 작업
**사이트맵에 포함된 URL과 실제 canonical/index 상태, 페이지별 AdSense 로더 수를 다시 대조해 사이트 전체 공개·광고 범위의 최종 정적 매트릭스를 작성한다.** 이미 수정된 develop 파일을 기준으로 확인하고, 광고 제외 대상(Bible/게임/기타 기능 페이지)이 사이트맵이나 자동 광고 범위에 잘못 포함되지 않았는지 함께 점검한다.


## 2026-11-02 이어서 점검 — 사이트맵 24개 URL과 광고 적용 범위

### 사이트맵 / robots
- `sitemap.xml`에 공개 URL 24개가 있다.
- 24개 모두 실제 HTML 파일의 canonical이 해당 sitemap URL과 일치하며 robots는 `index, follow`.
- `robots.txt`는 `User-agent: *`에 `Allow: /`를 적용하고 `https://chrisleepapa.com/sitemap.xml`을 가리킨다.
- 사이트맵 대상 24개 HTML에서 구 Vercel `.vercel.app` 주소 참조는 발견되지 않았다.

### AdSense 로더 정적 매트릭스
**로더 1회 (18개):**
- `/`
- `/wallpaper`
- `/sistersquad-hub`
- `/sistersquad`
- `/sistersquad2`
- `/yul`
- `/jung`
- `/miracleshot`
- `/tutupupupipi`
- `/worship`
- `/worship_eng`
- `/journal-1` ~ `/journal-6`
- `/about`

**로더 0회 (6개):**
- `/music` — 제3자 IP 영감 작품의 권리 검토가 끝날 때까지 광고 제외 유지
- `/movie` — 팬메이드 영상 및 제3자 IP 권리 검토와 미디어 중심 구성 고려
- `/bible` — 사용자의 광고 제외 결정 유지
- `/contact`
- `/privacy`
- `/terms`

**공통 정적 결과:**
- 사이트맵 24개 HTML 모두 수동 광고 단위 `ins.adsbygoogle` 0개.
- 사이트맵 24개 HTML 모두 직접 `adsbygoogle.push` 호출 0개.
- 모든 페이지의 H1은 1개였다. 단, Privacy/Terms는 한국어·영어 언어별 H1이 각각 소스에 있으나 `css/common.css`의 `html[lang]` 선택자로 한 언어만 표시하도록 구성되어 있다.
- AdSense 로더가 있다는 사실은 실제 광고가 표시된다는 뜻이 아니다. 자동 광고 노출 및 위치는 AdSense 설정과 실제 브라우저에서 별도로 확인해야 한다.

### 사이트맵에서 제외된 기능 페이지 확인
- `/today`: `noindex, follow`, AdSense 로더 0회, sitemap 제외.
- `/guestbook`: `noindex, follow`, AdSense 로더 0회, sitemap 제외.
- `/goal`: `noindex, nofollow`, AdSense 로더 0회, sitemap 제외. canonical은 설정되어 있지 않다. 현재 검색 색인 대상이 아닌 게임 실행 페이지이므로 이번에는 추가하지 않았다.
- `/gameinfo`: `noindex, nofollow`, AdSense 로더 0회, sitemap 제외.
- `ads.txt`에는 `google.com, pub-3207219520058740, DIRECT, f08c47fec0942fa0` 게시자 라인이 존재한다.

**판정:** develop 소스의 sitemap 24개 URL, canonical, robots, AdSense 로더 범위는 서로 일치한다. Bible/기능 페이지 광고 제외 결정도 코드상 유지된다. 사이트 코드 변경은 하지 않았다.

**미완료:** Google Search Console의 실제 색인/선택 canonical, AdSense Auto ads의 실제 노출 여부, 브라우저 모바일/PC 렌더링은 이 정적 소스 대조로 확인할 수 없다. Music/Movie 및 Bible/찬송가 관련 권리 검토도 별도 미해결이다.

### 다음 단일 작업
**현재 develop의 최근 변경 커밋과 Vercel 자동 배포 상태를 대조하고, 배포 한도가 풀린 뒤 Preview에서 확인해야 할 페이지별 테스트 목록을 확정한다.** 새 배포를 수동 요청하지 않고 상태 조회만 한다.


## 2026-11-02 배포 한도 중 작업 상태 및 Preview 테스트 대기표

### 브랜치 비교
- GitHub compare 기준 `main` 대비 `develop`은 ahead 47 / behind 0.
- main에는 반영하지 않았다. main을 develop으로 덮어쓰거나 병합하지 않았다.

### Vercel 자동 배포 상태 조회
- 이번 세션에서 수동 배포 명령은 실행하지 않았다.
- Music 콘텐츠 수정 커밋 `832298fc05c61ff6a3b4394e9cefeabce46d86bd`: READY 확인.
- Worship OG 설명 수정 커밋 `29807c30a62715f41417ac389be506080809d32c`: READY 확인.
- Journal/ About/ 점검 문서 커밋들의 자동 배포도 READY 상태인 항목을 확인했다.
- 가장 최근 사이트 전체 매트릭스 문서 커밋 `0d86ab1e6b265e0151f68de87e5ab7112aea961b`: 조회 시점 BUILDING. 문서만 변경한 커밋이므로 사이트 HTML/JS 수정은 포함하지 않는다.
- 자동 배포가 GitHub 커밋 이후 생성되고 있음을 확인했다. 사용자가 말한 일일 배포 한도 때문에 실제 Preview가 최신 커밋까지 갱신되었다고 단정하지 않는다.

### 배포 가능 시 Preview에서 수행할 테스트
1. Music: 14개 작품별 이야기, 한국어/영어 전환, Spotify iframe API 및 fallback, 광고 로더 미포함 확인.
2. Worship: 4개 앨범 카드, Vol.1~3 가사 30개, Spotify 커버 API, 한국어/영어 전환, 자동 광고 위치 확인.
3. English Worship: SHOUT 15개 가사, Spotify/YouTube 링크, 모바일 가사 아코디언 확인.
4. About: 창작자 소개·연혁·SNS 링크, canonical 및 공유 미리보기 확인.
5. Privacy/Terms: 한국어·영어 전환 시 언어별 H1 하나만 표시되는지 확인.
6. 사이트 공통: 모바일 메뉴, PC/모바일 레이아웃, 콘솔 오류, AdSense 광고가 본문·플레이어·링크와 혼동되지 않는지 확인.
7. Google 도구: Search Console의 /about 선택 canonical 및 사이트맵 처리 결과, AdSense Auto ads 실제 노출 위치 확인.

**현재 결론:** 배포 한도와 무관하게 GitHub 소스 점검·수정·정적 재검증은 계속할 수 있다. 다만 실제 Preview 렌더링 검증은 최신 배포 READY 확인 후에만 완료 처리한다.


## 2026-11-02 AdSense 최우선 재점검 — 콘텐츠 가치 및 개인정보 동의(CMP)

### 적용한 공식 기준
- Google AdSense 준비 가이드는 고유하고 관련성 있는 콘텐츠, 명확한 탐색, 방문자에게 유용한 독창적 콘텐츠를 확인하도록 안내한다.
- Google Publisher Policies는 저가치 콘텐츠, 콘텐츠가 없는 화면, 공사 중 화면, 알림·탐색 등 행동 목적 화면에 광고를 게재하지 못하도록 한다. 자동 생성 콘텐츠는 사람의 검토·선별 없이 게시하면 안 된다.
- 광고가 메뉴·탐색·다운로드 버튼으로 오인되거나 클릭을 유도하는 배치도 금지된다.
- 출처: Google AdSense 공식 도움말(준비 가이드, Publisher Policies, Site behavior).

### 광고가 있는 창작 페이지 재점검
대상: `wallpaper.html`, `sistersquad-hub.html`, `sistersquad.html`, `sistersquad2.html`, `yul.html`, `jung.html`, `miracleshot.html`, `tutupupupipi.html`, `index.html`

- Wallpaper: 개인용 무료 배경화면 4개 MP4와 PC PNG 9개, 작품별 설명, 포맷·사용 범위·기기별 설정 가이드, 창작자 노트가 존재한다. 단순 다운로드 목록만 있는 페이지는 아니다.
- Sister Squad Hub: 캐릭터 14개 이상, 세계관·마법·두 모험의 주제 설명, 시각 자료가 있고 독립적인 소개 콘텐츠가 있다.
- Sister Squad 1: 현재 약 344단어(HTML 태그/스크립트 제거 기준), 작품 소개·줄거리·캐릭터·창작 동기·창작 과정 기록, YouTube 트레일러와 공식 OST/도서 링크가 있다. 글 분량은 다른 작품 페이지보다 짧아 **콘텐츠 깊이 보완 우선 후보**로 분류한다. 다만 영상·이미지·원작 소개가 있으므로 단어 수만으로 저가치라고 판정하지 않는다.
- Sister Squad 2: 약 730단어, 영상 3개와 NG 영상 2개, 등장인물·후속 이야기·제작기·작품을 읽는 세 가지 관점이 있다.
- Yul/Jung 캐릭터 페이지: 각각 약 670/656단어, 캐릭터 프로필·능력·관계·탄생 비화·성장 분석 및 이미지가 있다. 단순 이미지 갤러리 형태가 아니다.
- Miracle Shot: 약 938단어, 독립 줄거리·캐릭터·성경적 영감·창작 의도·OST 설명과 이미지가 있다. lightbox용 이미지 요소는 `alt=""`로 비어 있으나 동적 이미지 확대용 요소이며, 일반 본문 이미지 26개에는 대체 텍스트가 있다. 이번에는 장식/동적 요소인지 확인 전 임의 수정하지 않았다.
- TuTu PuPu PiPi: 약 572단어, 캐릭터 소개, 세계관, OST 및 6개 Shorts의 개별 설명, 창작자 노트가 있다.
- Home: 약 269단어의 일반 텍스트 외에 큐레이션 카드와 프로젝트 진입 동선이 있는 아카이브 랜딩 페이지다. 일반 문서와 단어 수를 직접 비교하지 않는다.

**판정:** 이번에 확인한 페이지들은 단순 외부 영상·이미지 모음만으로 구성된 화면은 아니다. 다만 Sister Squad 1은 작품별 독립 설명이 비교적 짧아 추가 보완 후보로 남긴다. 이번 단계에서 콘텐츠 문구나 광고 코드를 임의로 바꾸지 않았다.

### 개인정보 동의 및 CMP — 계정 설정 확인이 필요한 P0 항목
- `privacy.html`에는 Google AdSense 광고 쿠키, Google Analytics, 제3자 광고 파트너, 맞춤형 광고 설정 링크가 설명되어 있다.
- `privacy.html`, `js/main.js`, `js/home-language.js`, `css/common.css`, `index.html`에서 CMP/TCF 동의 UI 또는 `googlefc` / Funding Choices 구현을 확인하지 못했다.
- 이는 사이트 소스에서 찾지 못했다는 뜻이며, AdSense 계정의 Privacy & messaging에서 Google CMP를 설정했는지는 이 저장소만으로 확인할 수 없다.
- Google 공식 요구사항: EEA/UK/스위스 사용자에게 개인화 광고를 제공하는 경우 Google 인증 및 IAB TCF 통합 CMP가 필요하다. CMP가 없거나 인증되지 않은 트래픽은 개인화 광고 대상이 되지 않을 수 있다.
- 따라서 AdSense 계정의 **개인정보 보호 및 메시지(Privacy & messaging)**에서 유럽 규정 메시지 생성·게시 여부, CMP 상태, TCF 신호, 대상 지역을 확인해야 한다. 글로벌 영어 콘텐츠가 있으므로 유럽 방문자 유입 가능성을 무시하지 않는다.
- 공식 출처: Google AdSense Help — `Google consent management requirements for serving ads in the EEA, the UK, and Switzerland` 및 `Set up and manage your Consent Management Platform (CMP)`.

### AdSense 우선 위험순위
1. **P0 — CMP/유럽 규정 메시지:** AdSense 계정 설정 확인 필요. 저장소만으로 완료 판정 불가.
2. **P1 — Sister Squad 1 독립 콘텐츠 깊이:** 작품별 줄거리·창작 과정의 설명이 상대적으로 짧음. 기존 원고에 근거한 내용 보강을 우선 검토.
3. **P1 — 저작권/라이선스 증빙:** 음악·영상·이미지·도서 샘플·외부 임베드의 권리 범위를 항목별로 확인. 광고 제외된 Music/Movie 외에도 각 광고 대상 페이지의 이미지·음원·영상 사용권을 검토해야 함.
4. **P2 — 자동 광고 실제 배치:** 메뉴·다운로드·재생 버튼과 인접하거나 오인될 수 있는 위치, 모바일 화면의 오클릭 위험을 Preview/실기기에서 확인.
5. **P2 — 실제 색인 및 사이트 승인 상태:** Search Console의 선택 canonical과 AdSense 사이트 검토/정책 센터 상태는 계정 UI에서 확인.

### 다음 작업
**Sister Squad 1 페이지의 작품별 독창적 설명과 제작 과정 기록을 원작에 근거해 보완하고, 나이·권수 등 기존 페이지 간 정보가 서로 어긋나지 않도록 사실 대조부터 한다.** 사실관계가 확정되지 않은 나이는 임의로 고치지 않는다.


### 후속 사실 대조 — Sister Squad 연령 표기
- `sistersquad.html`의 Book 1 연령 표기(율 11세, 정 7세)는 캐릭터 프로필과 일치한다. `yul.html`은 현재 12세 / 1권 11세, `jung.html` 본문은 현재 8세 / 1권 7세, `sistersquad2.html`은 2권 기준 12세 / 8세로 확인했다.
- 다만 `jung.html`의 검색·공유 메타 설명 3곳(name description, og:description, twitter:description)은 정이를 7세라고만 표기해 현재 프로필 설명과 시점이 불명확했다.
- 세 메타 설명을 "현재 8살, 1권에서는 7살"로 구분하고 2권에서 이어지는 모험을 설명하도록 수정했다.
- develop 커밋: `d00a076c22b37c43807e4f85aa176c1e45d547c6`
- 본문·캐릭터 설정·이미지·광고 코드는 변경하지 않았다.

### AdSense 최우선 점검 상태 갱신
- [x] 창작 페이지의 독립적인 설명·창작 과정·미디어 구성 정적 점검
- [x] Sister Squad 1의 Book 1 연령 표기와 Yul/Jung 프로필 및 Book 2 연령 대조
- [x] Jung SEO/공유 메타의 연령 시점 불명확 문제 수정
- [ ] AdSense 계정 Privacy & messaging에서 유럽 규정 메시지와 CMP 인증/TCF 상태 확인
- [ ] AdSense Policy Center에서 현재 사이트/페이지별 정책 이슈 확인
- [ ] 실제 Auto ads가 다운로드·재생·메뉴 등 상호작용 요소와 인접하는지 실기기 검증

## 2026-11-02 Book Stacking Master 정적 감사 및 메인 배포 대조

### Book Stacking Master (booktop.html)
- develop 소스 blob SHA: f737a605c94f39e873e9cb51dccee11179bbcf51.
- 메인 소스와 개발 소스의 파일은 현재 동기화되어 있으며, 동일한 페이지 구조를 사용한다.
- 페이지 title: BOOK STACKING MASTER — Chris LEE.PAPA.
- canonical: https://chrisleepapa.com/booktop.
- HTML robots: noindex, nofollow.
- Vercel vercel.json에 /booktop 응답 헤더 X-Robots-Tag: noindex, nofollow 규칙이 있다.
- Production과 develop 실제 HTTP 응답 모두 200, robots meta noindex, nofollow, X-Robots-Tag noindex, nofollow, AdSense loader 0회, adsbygoogle 참조 0회 확인.
- 자체 기능: Matter.js 0.19.0 물리 엔진으로 책을 하나씩 떨어뜨려 쌓는 싱글 플레이 캐주얼 게임. 점수/높이, 책 충돌·균형, 카메라 추적, 게임 오버, 재시작, 점수 TOP 5, 효과음/축하 애니메이션을 포함.
- 인증: /js/game-auth.js가 공통 /js/auth.js를 불러 로그인 여부를 확인하고, 로그인 계정 이니셜을 기존 랭킹 필드에 적용한다. 게임 페이지 진입 시 로그인 모달을 표시하는 경로가 소스에 존재한다.
- 외부 의존성: Matter.js CDN, Tailwind CDN, YouTube IFrame API(숨김 BGM 플레이어), Google Fonts, Supabase REST(랭킹 조회/저장). Google Tag Manager는 분석용으로 포함되어 있으며, 사용자가 제공한 GTM v2 내보내기에는 GA4 태그만 확인되었다. 최신 GTM 게시 버전의 계정 확인은 별도 미완료.
- 콘텐츠 가치 판정: 게임 자체가 기능형 콘텐츠이며 설명·작품 소개를 제공하는 랜딩 페이지가 아니다. 그러나 noindex 및 AdSense 코드 제외가 양쪽 실응답에서 확인되어 광고가 노출되는 공개 콘텐츠 화면으로 취급하지 않는다. 현재 AdSense의 두 거절 사유에 대한 직접 위험은 낮음.
- 정확성/UX 후보: 시작 모달의 MULTIPLAYER CHALLENGE 문구와 달리 소스에서 확인되는 플레이 방식은 한 사용자의 책 쌓기와 전역 TOP 5 기록 경쟁이다. 실시간 동시 플레이/온라인 멀티플레이 로직은 확인되지 않아 표현이 실제 기능과 다를 가능성이 있다. 또한 viewport에 user-scalable=no, body에 overflow:hidden 및 touch-action:none이 있어 모바일 확대/일반 스크롤을 제한한다. AdSense 직접 이슈로 단정하지 않고 기능/접근성 개선 후보로만 기록한다.
- Supabase 점수 저장의 실제 RLS/권한은 소스만으로 확정할 수 없어 미검증으로 유지한다. 공개 publishable key는 클라이언트용 키로 보이며, 실제 접근 가능 범위는 DB 정책 확인이 필요하다.
- 실제 게임 플레이, 로그인 성공/실패, 점수 저장/랭킹 반영, 모바일·PC 레이아웃, 브라우저 콘솔/네트워크는 미검증. 정적 소스 검사를 실기능 검증으로 간주하지 않는다.
- 조치: 페이지 소스 수정 없음. noindex/광고 제외를 유지한다.

### 2026-11-02 메인 반영 및 Production 배포 대조
- GitHub compare 기준 main과 develop은 커밋 fad7304d3635dc0bb6e44081535113fd98bb6166에서 동일(앞섬 0 / 뒤처짐 0).
- GitHub main 소스에서는 홈의 YouTube Chart 관련 키워드 0개, music.html의 AdSense loader 0개가 확인됨. About, TuTuPuPuPiPi, Worship, English Worship 파일도 develop에서 검토한 최신 소스와 동일한 수정이 포함됨.
- 그러나 Vercel production 도메인 별칭을 조회한 결과 현재 연결된 Production 배포는 dpl_AcctC86mhR9eqcQUGJrGHGTXyJSF, Git commit ed13030c004861bec711d674a0df3cefaab6c226임을 확인. fad7304를 대상으로 한 Production 배포는 확인되지 않음.
- Production HTTP 응답에서 홈은 YouTube Chart 관련 코드가 여전히 존재하고 AdSense loader 1개, /music도 AdSense loader 1개로 확인됨. 따라서 GitHub main 소스에는 수정이 반영되었지만, 실제 운영 도메인에는 아직 새 수정이 반영되지 않은 상태.
- Develop HTTP 응답에서는 홈 YouTube Chart 코드 0개, /music AdSense loader 0개를 확인함.
- 중요: GitHub 브랜치 동기화와 Vercel Production 배포는 별개의 상태다. 사용자가 요청한 GitHub main 동기화는 완료했지만, 이번 점검 요청만으로 Production 배포를 추가 실행하지 않았다. Production 배포 승인/실행 후 동일 URL을 다시 확인해야 한다.
- 일부 기존 페이지는 최신 소스와 무관하게 이전 Production 배포에서도 noindex/광고 제외 상태였을 수 있으므로, 특정 페이지의 현재 HTTP 응답을 전체 사이트 배포 완료의 증거로 일반화하지 않는다.

### 판정 및 다음 단일 작업
- Book Stacking Master: 광고 제외 및 색인 제외 상태 실응답 확인. AdSense 직접 위험 낮음. 실제 게임 동작은 미검증.
- 메인 소스 반영: 완료.
- Production 배포: 미완료/최신 커밋 미배포. 홈과 Music의 P0 항목이 운영 도메인에서 아직 남아 있음.
- 다음 단일 작업: fiveinrow.html(오목) 정적 감사. 독립 콘텐츠/게임 기능/계정 인증/외부 라이브러리/광고 로더/noindex 상태를 develop 소스 기준으로 점검하고, 실제 게임 플레이는 브라우저 검증 전까지 미검증으로 유지.


## 2026-11-02 추가 점검 — Movie 페이지 정적 소스 및 개발 배포 확인

**대상:** `movie.html` / `https://develop.chrisleepapa.com/movie`
**기준:** AdSense 거절 사유 2가지(복제 콘텐츠가 있는 화면에 Google 게재 광고 / 가치가 별로 없는 콘텐츠)
**브랜치:** develop
**파일 blob SHA:** `ddcfbd1685d3fea0d79dd2d2357e8725ccff0483`

### 확인 결과

1. 개발 사이트 `/movie` 응답은 HTTP 200이다. canonical은 `https://chrisleepapa.com/movie`, robots는 `index, follow`로 확인했다.
2. 페이지 HTML에 AdSense 로더 0개, `adsbygoogle.push` 호출 0개다. HTML 주석에도 Movie 페이지가 페이지 단위 광고 로딩에서 제외된다고 명시되어 있다. 따라서 정적 소스 기준 이 페이지는 광고 제외 상태다. Auto ads 계정 설정 및 실제 브라우저 광고 노출은 별도 확인 사항으로 남긴다.
3. 메인 영상 3편(FURIOUS, 귀멸의 칼날 실사 촬영 현장 콘셉트, 사랑한다고)에 각각 제목·소개와 별도 제작 노트가 있다. 제작 노트는 아이디어, 제작 과정, 배운 점을 한·영으로 설명한다. 단순히 YouTube 플레이어만 모아 둔 페이지는 아니다.
4. Shorts는 8개 고유 영상으로 구성되어 있으며, 같은 8개 링크와 썸네일이 VERTICAL ARCHIVES 갤러리와 SEO 소개 아래 SHORTS VIDEO LIST에 각각 반복된다. 소스상 Shorts 링크는 총 16개이며 고유 ID는 8개다.
5. Shorts 상세 설명 중 일부는 서로 구분이 약하다. 특히 두 개의 Demon Slayer 콘서트 영상 카드에 동일한 한국어 설명이 사용되고, 촬영 준비/비하인드 영상 설명도 유사한 표현을 반복한다. 실제 영상 장면을 검증하지 않은 상태이므로 설명을 임의로 새로 쓰지는 않는다.
6. 페이지의 생성형 AI 비주얼·음악 결합 및 단독 기획/편집에 관한 HOW IT'S MADE 설명이 존재한다. 다만 이는 페이지 전체에 대한 일반 설명이므로, Shorts 개별 설명의 중복을 완전히 해소하지는 않는다.
7. `renderCarousel()`은 `#carousel-list`를 조회하지만 현재 HTML에는 해당 요소가 확인되지 않는다. `.carousel-section` 스타일도 실제 섹션과 연결되지 않는 것으로 보인다. 현재는 빈 NodeList에 대한 반복 처리이므로 치명적 오류라고 단정하지 않지만, 사용되지 않는 이전 캐러셀 코드 가능성이 있어 후속 정리 후보로 기록한다.
8. 애니메이션 원작 캐릭터를 사용한 팬 콘셉트 Shorts는 AdSense 콘텐츠 가치 판단과 별도로 지식재산권/상표/캐릭터 이용 권리 검토 트랙에 남긴다. 출처나 자체 제작 설명만으로 권리 문제가 자동 해결된다고 보지 않는다.

### 판정

- **독창적 콘텐츠 가치:** 보완 필요성이 낮은 편. 세 편의 구체적인 제작 노트가 페이지 고유 가치를 제공한다.
- **복제 콘텐츠 위험:** 페이지 소스만으로 타인 영상의 무단 복제 여부를 확정할 수 없다. 외부 YouTube 링크/썸네일은 존재하지만, 본 페이지에는 광고 로더가 없다.
- **저가치/반복 구성:** Shorts 8개를 두 방식으로 반복 노출하고 일부 설명이 동일/유사하므로 정리 권장. 이는 동일 페이지 내 UI/문구 중복이며 Google의 '타인 콘텐츠 복제' 정책 위반으로 단정하지 않는다.
- **광고 설정:** AdSense 로더 및 수동 광고 호출은 정적 소스에서 확인되지 않아 페이지 단위 광고 제외 상태로 판정한다.

### 미검증 항목

- 실제 브라우저에서 메인 플레이어, 제작 노트의 클릭 재생, featured 선택 및 언어 전환 동작
- 모바일/PC 레이아웃과 실제 가독성
- Auto ads 계정 설정에 의한 광고 노출 여부(페이지 HTML에 로더가 없어도 계정/태그 전체 흐름은 별도 검증 필요)
- Shorts 실제 장면과 카드별 설명의 일치
- 애니메이션 캐릭터 사용 권리

### 조치

이번 단계에서는 `movie.html`을 수정하지 않았다. 중복 Shorts 영역은 시각 갤러리와 설명 목록의 역할을 합치거나 한쪽을 정리하는 최소 수정안을 후속 검토한다. 실제 장면 확인 없이 설명을 창작하지 않는다. main은 수정하지 않았다.

### 다음 단일 작업

**Wallpaper 페이지의 독립적인 콘텐츠 가치, 다운로드 안내의 완결성, 외부 미디어/이미지 의존도, AdSense 로더 및 광고 제외 상태를 develop 소스 기준으로 점검한다.** 실제 파일과 링크 경로를 먼저 확인하고, 모바일/PC 배치 및 다운로드 동작은 브라우저 미검증으로 구분한다.


## 2026-11-02 추가 점검 — Wallpaper 페이지 정적 소스 및 개발 배포 확인

**대상:** `wallpaper.html` / `https://develop.chrisleepapa.com/wallpaper`
**기준:** AdSense 콘텐츠 가치, 광고 제외 여부, 사용자 경험 및 크롤링
**브랜치:** develop
**파일 blob SHA:** `94a3fc1615cb03f23b519ad3855fc016afead6f7`

### 확인 결과

1. 개발 사이트 `/wallpaper` 응답 HTTP 200. canonical은 `https://chrisleepapa.com/wallpaper`, robots는 `index, follow`. develop sitemap 24개 URL 중 `https://chrisleepapa.com/wallpaper` 포함을 확인했다.
2. 페이지 HTML에 AdSense 로더 1개가 있고, 수동 광고 슬롯(`ins.adsbygoogle`) 0개, `adsbygoogle.push` 호출 0개다. 즉 페이지 단위 로더는 설치되어 있으며 수동 광고 단위는 없다. 실제 Auto ads 위치 및 다운로드 버튼 주변 광고 노출은 브라우저/AdSense 화면에서 별도 검증해야 한다.
3. 모바일 MP4 4편과 PC PNG 9점, 총 13개 파일이 develop `images/` 경로에 존재한다. 페이지에 13개의 다운로드 링크가 있고, 모바일은 MP4, PC는 PNG 파일을 제공한다.
4. 모바일 4편은 각각 북유럽 풍경, 남유럽 풍경, 야간 도시 드라이브, 구름 위 정자라는 구별되는 제목과 한국어 설명이 있다. 영어 설명, 개인 잠금화면 사용 안내, 파일 형식 안내도 제공된다.
5. 기기별 사용 안내는 Android의 제조사별 지원 차이, iPhone에서 MP4를 바로 움직이는 잠금화면으로 지정할 수 없고 Live Photo 변환본도 없다는 제한, Windows와 macOS의 PNG 적용 절차를 구분해 설명한다. 지원하지 않는 기능을 지원한다고 오인시키는 문구는 확인되지 않았다.
6. 창작자 노트는 배경화면이 일상에서 갖는 의미, 모바일 영상과 PC 정지 이미지의 차이, 개인 사용/재배포 제한을 설명한다. 이용약관과 Contact 문의 경로도 있다. 모바일 컬렉션은 개별 작품 소개가 있어 독립적 정보가 제공된다.
7. PC 이미지 9점은 각각 'Desktop Wallpaper 01~09'라는 번호 중심 제목과 'desktop wallpaper artwork 01~09'라는 일반적인 alt만 제공한다. 이미지별 주제·구도·분위기를 설명하는 고유 문구는 없다. 이미지 자체의 실제 장면을 확인하지 않은 상태에서 alt나 설명을 임의로 작성하지 않는다.
8. PC PNG 02~09의 `img` 태그에는 `loading="lazy"` 속성이 중복으로 두 번 들어가 있다. 브라우저가 일반적으로 첫 속성만 처리할 수 있으나 HTML 마크업 정리가 필요하다.
9. 페이지 본문 CSS에 텍스트 선택을 비활성화하는 `user-select: none` 규칙이 있다. 배경화면 이미지 보호 목적과 별개로, 사용 안내/이용 조건 등 텍스트를 복사하거나 선택하는 사용자 경험에는 불리할 수 있다. AdSense 직접 위반으로 단정하지 않고 접근성/UX 보완 후보로 기록한다.
10. 페이지 내 로컬 영상 미리보기는 IntersectionObserver로 화면에 보일 때 재생하고 벗어나면 멈추며, `prefers-reduced-motion` 설정을 고려한다. 외부 YouTube/Spotify 임베드는 확인되지 않았다.

### 판정

- **독창적 콘텐츠 가치:** 모바일 4편과 사용 안내/창작자 노트는 비교적 양호. PC 이미지 9점은 이미지 파일과 다운로드 기능 외에 개별 설명이 부족해 보완 권장.
- **복제 콘텐츠 위험:** 외부 미디어를 단순 임베드한 구조는 아니다. 로컬 이미지/영상 파일이므로 실제 창작 권리 및 원본성은 별도 확인이 필요하며, 소스만으로 저작권 소유를 확정하지 않는다.
- **광고 설정:** 페이지 단위 AdSense 로더 1개. 수동 광고 단위는 없다. Auto ads가 다운로드 UI와 혼동될 위치에 표시되는지는 미검증.
- **기술/UX:** PC PNG 8개에 중복 `loading` 속성, 본문 텍스트 선택 차단 규칙이 정리 후보.

### 미검증 항목

- 실제 브라우저에서 4개 MP4 미리보기/다운로드 및 9개 PNG 원본 열기·다운로드 동작
- PC/모바일 레이아웃과 라이트/다크 모드의 가독성
- Auto ads 실제 배치와 다운로드 버튼 주변 광고 혼동 여부
- PC PNG 9개 및 MP4 4개의 실제 시각 장면과 개별 설명의 정확성
- 각 미디어 파일의 원본 제작 및 이용 권리

### 조치

이번 단계에서는 `wallpaper.html`을 수정하지 않았다. PC 이미지 9점의 실제 장면을 확인한 뒤 개별 alt/설명 보완 여부를 판단하고, 중복 속성은 후속 기술 정리 후보로 남긴다. main은 수정하지 않았다.

### 다음 단일 작업

**Music 및 Worship 페이지를 AdSense 콘텐츠 가치 기준으로 교차 점검한다.** 앨범/곡별 자체 소개, 가사·제작 노트의 독창성, 외부 Spotify/YouTube 임베드 비중, 초기 HTML과 동적 JavaScript 콘텐츠의 차이, 광고 로더 및 수동 광고 슬롯을 develop 소스에서 확인한다. 이미 확인된 음악 제작 경험과 앨범 정보를 다시 묻지 않는다.


## 2026-11-02 추가 점검 — Music / Worship / English Worship

**대상:** `music.html`, `worship.html`, `worship_eng.html`, `js/music-production-notes.js`
**기준:** 독창적 콘텐츠 가치, 외부 미디어 의존도, 동적 렌더링, 광고 로더 중복
**브랜치:** develop

### 1) Music 페이지

- 파일 `music.html` 최신 blob SHA: `2af4684d64ae2d103e0e663f928564951d7ea7eb`
- 동적 제작 노트 파일 `js/music-production-notes.js` blob SHA: `ce9d57fe3a9dfe7fa1e9eb7e849e69d06d38e560`
- develop 배포: `dpl_6QDJixpvszVoPBTNVRa2ty5JcQah`, commit `693bc3ac7a5b1504bc8fa3931b0d42ac096a80ff`, READY, alias `develop.chrisleepapa.com`.

확인:
1. 14개 앨범/EP/싱글/연주 작품에 대해 한국어·영어 앨범 스토리가 각각 존재한다.
2. `js/music-production-notes.js`에 14개 작품별 제작 기록이 있다. 작품의 출발점, 제작 방향, 감상 포인트와 참고용 재구성 프롬프트를 제공하며, 원래 입력 프롬프트를 그대로 인용한 것이 아니라는 안내도 명시한다.
3. 페이지는 Spotify 플레이어와 YouTube/Spotify 외부 감상 경로를 제공하지만, 작품별 스토리와 제작 기록도 함께 제공한다. 외부 플레이어만 나열한 구조는 아니다.
4. 페이지 단위 AdSense 로더 0개, 수동 광고 슬롯 0개, `adsbygoogle.push` 0개. 공통 `js/main.js`와 `js/guestbook.js`에도 AdSense 삽입 코드가 없어 공통 스크립트 중복 삽입은 확인되지 않았다.
5. canonical은 `https://chrisleepapa.com/music`, robots는 `index, follow`, sitemap 포함을 확인했다.
6. 앨범 스토리와 제작 노트는 JavaScript로 동적 삽입된다. 제작 노트는 정적 대체 영역이 있지만 앨범 스토리는 초기 HTML의 빈 목록에 인라인 스크립트가 내용을 채우는 구조다. 실제 브라우저/Google 렌더링 결과는 별도 검증이 필요하다.

### 2) Music 페이지 최소 수정

기존 데이터에서 4개 앨범은 로컬 트랙 목록과 trackCount가 비어 있어 플레이리스트에 `0 TRACKS`로 표시될 수 있었다. 또 `Run it back`은 전체 4곡으로 표기되지만 로컬 제목 목록은 1개뿐이었다.

수정:
- `music.html`의 플레이리스트에서 트랙 수가 미입력된 작품은 `0 TRACKS` 대신 Spotify 트랙리스트 안내를 표시한다.
- 트랙 수와 로컬 제목 목록이 일치하지 않는 경우 불완전한 로컬 목록 대신 Spotify 트랙리스트 안내를 사용한다.
- 미확인 트랙 수를 전체 합계에 포함하지 않으며, 불완전한 데이터로 전체 트랙 수를 단정하지 않도록 처리했다.
- 앨범 데이터, Spotify/YouTube 링크, 플레이어 기능은 변경하지 않았다.

커밋:
- 최초 수정 `081226fcd80f9149dc1111e373e2929c6011d73f`
- 최종 보완 `693bc3ac7a5b1504bc8fa3931b0d42ac096a80ff`

재검증:
- develop 소스에 미확인 트랙 수 fallback 로직 존재 확인.
- Vercel develop 배포 READY 확인.
- 배포 URL 및 `https://develop.chrisleepapa.com/music` HTTP 200, 최신 수정 로직이 응답 HTML에 포함됨 확인.
- 실제 화면에서 텍스트 줄바꿈/모바일 표시 및 Spotify 재생은 미검증.

### 3) 한국어 Worship 페이지

- 파일 `worship.html` blob SHA: `ff78261a80c023007fbf465f9527206653259424`
- 나의 찬양 Vol.1·2·3 각 10곡, 총 30곡의 가사가 HTML에 직접 포함되어 있다.
- 30개 `details` 항목 모두 비어 있지 않고, 본문 길이는 최소 252자 이상이다.
- 앨범 카드 4개(Vol.1·2·3, Whispers Of Grace ver1), 앨범을 만든 이야기, 창작자의 신앙적 동기, AI를 제작 보조로 활용하고 결과를 선별·수정한 과정, Journal 연결, 전체 가사집이 있다.
- Spotify 앨범 링크 4개와 YouTube 재생목록 링크 3개는 외부 감상 경로로 제공된다. 외부 Spotify/YouTube 플레이어 임베드는 확인되지 않았다.
- AdSense 로더 1개, 수동 광고 슬롯 0개, `adsbygoogle.push` 0개.
- canonical `https://chrisleepapa.com/worship`, robots `index, follow`, sitemap 포함 확인.

### 4) English Worship 페이지

- 파일 `worship_eng.html` blob SHA: `44f2e0c6ee779f1592ad240b882e92c33eea531c`
- SHOUT 앨범 15곡의 영어 가사가 HTML에 직접 포함되어 있다. 15개 `details` 항목 모두 비어 있지 않고, 본문 길이는 최소 546자 이상이다.
- 앨범 스토리, 찬양의 주제, 개인적 고백과 공동체적 선포, 영어 워십 컬렉션으로 분리한 이유, 사람의 기획과 AI 보조 제작 과정을 설명한다.
- Spotify 앨범 링크와 YouTube 앨범 재생목록 링크를 제공하며, 외부 플레이어 임베드는 확인되지 않았다.
- AdSense 로더 1개, 수동 광고 슬롯 0개, `adsbygoogle.push` 0개.
- canonical `https://chrisleepapa.com/worship_eng`, robots `index, follow`, sitemap 포함 확인.

### 종합 판정

- **독창적 콘텐츠 가치:** Music은 14개 앨범별 이야기와 제작 기록, 한국어 Worship은 30곡의 가사와 앨범 창작 배경, English Worship은 SHOUT 15곡의 가사와 고유한 스토리를 보유해 양호.
- **복제 콘텐츠 위험:** 세 페이지 모두 외부 음원 링크/플레이어가 페이지의 유일한 가치가 아니다. Worship 페이지는 외부 미디어 임베드 없이 가사와 자체 설명을 직접 제공한다. 실제 음원/가사의 권리 확인은 별도 권리 트랙이다.
- **광고 설정:** Music은 AdSense 로더 없음. Worship과 English Worship은 각 1개이며 수동 슬롯/중복 공통 삽입은 확인되지 않았다. Auto ads의 실제 위치는 미검증.
- **동적 렌더링:** Music의 앨범 스토리와 제작 노트가 JavaScript로 생성되므로 실제 브라우저 및 검색엔진 렌더링 검증이 남아 있다.
- **미검증:** 모바일/PC 실제 레이아웃, 언어 전환, Spotify 플레이어 재생, Worship 가사 접기/펼치기 동작, Auto ads 위치.

이번 단계의 소스 수정은 Music의 잘못된 0곡 표기만 develop에 반영했다. Worship과 English Worship은 수정하지 않았다. main은 변경하지 않았다.

### 다음 단일 작업

**Chris's Note / Journal의 목록 페이지와 상세 글을 AdSense 기준으로 점검한다.** 먼저 실제 `/journal` 경로의 파일·canonical·robots·사이트맵·내부 링크 상태를 확인하고, Journal 1~6은 기존 점검 기록을 재활용해 복제/저가치 위험과 실제 본문 접근성을 확인한다. 이전에 확인한 Journal 1·2·4의 제작 경험을 다시 묻지 않는다.


## 2026-11-02 추가 점검 — Chris's Journal 목록 및 상세 글 1~6

**대상:** `journal.html`, `journal-1.html`~`journal-6.html`
**기준:** 독창적 본문 가치, 복제 문단, 색인/사이트맵 정합성, 광고 로더, 내부 이동
**브랜치:** develop
**최종 develop HEAD:** `45611a7655f7d8dbe2073fc774195c354075d345`

### 1) 목록 페이지 `/journal`

- canonical `https://chrisleepapa.com/journal`
- robots `noindex, follow`
- AdSense 로더 0개
- sitemap에서 제외됨
- 여섯 편의 제목, 카테고리, 개별 요약과 상세 페이지 링크를 제공한다.

**판정:** 목록은 상세 글로 안내하는 디렉터리 역할이다. 본문 상세 글과 달리 독립적인 검색 유입용 콘텐츠가 아니므로 noindex 및 sitemap 제외 상태를 유지한다. 광고도 로딩하지 않는다.

### 2) 상세 글 1~6

| 페이지 | 본문 텍스트 길이(공백 포함) | 핵심 고유 내용 |
|---|---:|---|
| Journal 1 | 약 3,574자 | 두 딸과 Sister Squad를 시작한 개인적 계기, 시행착오, 가족과 함께 만든 기억 |
| Journal 2 | 약 5,021자 | 실제 Skywork 활용, 첫 프롬프트, 도구 비교, 초안 검토·수정 과정 |
| Journal 3 | 약 4,000자 | POD 출판, 원고·표지·판형·ISBN·유통·가격·업로드·검토의 실제 순서 |
| Journal 4 | 약 3,975자 | 율이·정이 캐릭터 디자인 기준, AI 이미지 일관성, 두 딸의 검수, 삽화 선택 |
| Journal 5 | 약 3,408자 | 직장·가족 일상 속 창작 시간 관리, 작업 단위, 다섯 가지 실천 원칙 |
| Journal 6 | 약 9,370자 | 찬양 창작 동기, 기도·가사·작곡·AI 결과 선택·수정, 개인 기도문 |

확인:
1. 여섯 상세 글 모두 개별 canonical이 정확하고 `index, follow`다.
2. sitemap에는 Journal 1~6이 모두 포함되고 목록 `/journal`은 제외된다.
3. 각 상세 글에는 AdSense 로더 1개, 수동 광고 슬롯 0개, `adsbygoogle.push` 0개가 있다. `js/main.js`와 `js/guestbook.js`에는 AdSense 삽입 코드가 없어 공통 스크립트 중복 로딩은 확인되지 않았다.
4. 6개 상세 글의 본문은 각각 다른 경험과 실무 과정을 다룬다. 120자 이상 문단의 앞부분을 비교했을 때 페이지 사이에 동일 문단 반복은 확인되지 않았다.
5. Journal 2는 실제 프롬프트와 도구 비교표, 당시 가격이라는 시점 안내를 포함한다. Journal 3은 실제 POD 절차와 체크 항목을 포함한다. Journal 4~6도 구체적인 창작·시간 관리·기도 과정을 담고 있어 단순한 홍보문이나 짧은 요약 페이지가 아니다.
6. Journal 1의 타 예술가 인용문은 인물명을 표기하고 있다. 인용 권리 여부는 콘텐츠 가치 판단과 별도의 권리 검토 항목이다.
7. 상세 글은 본문이 HTML에 직접 포함되어 있어 핵심 텍스트가 빈 JavaScript placeholder에만 의존하지 않는다.

### 3) 발견된 내부 이동 문구 불일치 및 수정

- Journal 2 → Journal 3: 기존 다음 글 문구의 '나도 작가!'를 실제 상세 글 제목 `POD로 직접 책을 출판하는 법`에 맞게 정리.
- Journal 3 → Journal 4: 기존 '공식 아카이브 정식 오픈' 안내를 실제 다음 글인 캐릭터 디자인/삽화 글로 수정. 본문 마지막 예고도 같은 주제로 변경.
- Journal 4 → Journal 5: 기존 '음악과 영상으로 이야기를 확장' 안내를 실제 다음 글인 `퇴근 후, 나는 다시 창작자가 된다`로 수정. 본문 마지막 예고도 직장·가족 일상 속 창작 이야기로 정렬.
- Journal 4의 이전 글 제목도 Journal 3의 실제 제목과 일치시켰다.

수정 커밋:
- `journal-2.html`: `fb056570941ace952b8d3e248f1d26491262a641`
- `journal-3.html`: `dd621c59930cc586eafa8f74c87e4c26f5f94dfb`
- `journal-4.html`: `45611a7655f7d8dbe2073fc774195c354075d345`

### 4) 배포 상태 — 중요

- Journal 2 변경은 Vercel preview 배포 `dpl_CVxUNFHaxLBUmq6xxjgaHXHEMrht`에서 READY 및 개발 URL 반영을 확인했다.
- Journal 3·4 변경은 GitHub develop 브랜치에 반영되었고 정적 소스에서 수정 내용을 확인했다.
- 그러나 Vercel 수동 preview 배포 시 `402 payment_required`, `api-deployments-free-per-day`, retryAfter 86400초(24시간) 응답을 받았다.
- 따라서 현재 `develop.chrisleepapa.com`의 Journal 3·4는 이전 배포본 문구가 남아 있을 수 있다. 최신 GitHub develop 소스와 실제 develop alias를 혼동하지 않는다.
- main은 수정하지 않았다. main SHA는 `c5e491bb6b125eb00b1e871163c7d0fb7cca74e8`; develop은 main보다 11개 커밋 앞서 있으며 뒤처진 커밋은 없다.

### 판정

- **독창적 콘텐츠 가치:** 상세 글 1~6 양호. 개인 경험, 실제 프롬프트, 단계별 제작 과정, 구체적인 판단 기준과 시행착오가 담겨 있다.
- **복제 콘텐츠 위험:** 상세 글 간 긴 동일 문단 반복은 확인되지 않았다. 목록 페이지는 짧은 요약으로 상세 글을 안내하며 noindex·무광고 처리되어 있다.
- **광고 설정:** 상세 글 각각 로더 1개, 수동 슬롯/호출 없음. Auto ads의 실제 배치 위치는 브라우저에서 별도 확인해야 한다.
- **내부 이동:** Journal 2~4 제목 불일치를 소스에서 정리했다. Journal 5는 Journal Home으로 이동하며 Journal 6의 이전 글 링크는 정상이다. Journal 5의 다음 글 버튼은 현재 없다(경미한 UX 사항).

### 다음 단일 작업

**MIRACLE SHOT(골이예요) 게임 및 Game Center 페이지를 점검한다.** 게임 자체의 독창적 기능·설명·규칙·조작 안내·모바일 UX, 게임 페이지와 허브 사이의 중복 설명, AdSense 로더/광고 제외 상태, 사이트맵 및 canonical을 develop 소스 기준으로 확인한다. 게임은 광고가 주목적인 페이지로 취급하지 않고, 실제 게임 경험과 자체 설명의 완결성을 중심으로 평가한다.


## 2026-11-02 추가 점검 — MIRACLE SHOT / Game Center / 골이예요 경로 교차 확인

**대상:** `miracleshot.html`, `goal.html`, `gameinfo.html`, Game Center 개별 게임 7종
**기준:** 광고 대상 페이지와 게임 실행 페이지의 분리, 독창적 콘텐츠 가치, 색인/사이트맵, 광고 로더
**브랜치:** develop

### 확인 결과

1. **MIRACLE SHOT 스토리 소개 `/miracleshot`**
   - canonical `https://chrisleepapa.com/miracleshot`, robots `index, follow`, sitemap 포함.
   - AdSense 로더 1개, 수동 광고 슬롯 0개, `adsbygoogle.push` 0개.
   - 약 3,981자의 본문, 9개 섹션, 스토리 세계관/코치/네 아이 캐릭터/성경 인물 연결/성장 주제/제작 의도/작가 소개/게임 CTA가 있다.
   - 5곡 오리지널 OST, Spotify 앨범 플레이어와 YouTube 재생목록 링크, 책 구매 링크가 있다.
   - 18개 하이라이트 이미지와 8개 캐릭터·성경 인물 이미지가 있으며, 26개 실제 파일은 develop `images/`에 모두 존재한다. 추가 1개 빈 `src` 이미지는 lightbox 모달의 동적 이미지 자리표시자이므로 누락 이미지로 계산하지 않는다.
   - 18개 갤러리 이미지 파일의 합계는 약 92.6MB다. 모두 `loading="lazy"`이나 `decoding="async"`와 명시적 width/height는 없다. 초기 로드는 지연되지만 전체 갤러리를 탐색할 때 전송량이 커질 수 있어 성능 최적화 후보로 기록한다.
   - 18개 갤러리 alt는 `Miracle Shot 하이라이트 1~18` 수준으로 일반적이다. 실제 장면을 확인하지 않은 채 상세 설명을 임의로 쓰지 않는다.
   - 긴 본문 문단의 정확한 반복은 확인되지 않았다. Story/Theme/About 블록은 주제를 확장해 설명하며 문단을 그대로 복제한 구조는 아니다.

2. **실제 게임 실행 `/goal`**
   - 개발 응답 HTTP 200, robots `noindex, nofollow`, AdSense 로더 0개, 수동 광고 0개, sitemap 제외.
   - 캐릭터 선택, CPU/2인 모드, 점수벽, 슛 게이지 안내, 라운드/결과 UI가 있는 실제 게임 화면이다. 본문 정보가 짧은 것은 게임 실행 화면의 성격과 일치하며, 광고를 로드하지 않는다.
   - canonical/description은 없으나 noindex 정책 페이지이며 별도 검색 노출 대상이 아니다.

3. **Game Center `/gameinfo`**
   - 개발 응답 HTTP 200, canonical `https://chrisleepapa.com/gameinfo`, robots `noindex, nofollow`, AdSense 로더 0개, sitemap 제외.
   - 7개 게임 카드와 GAME GUIDE, 게임별 규칙/조작 개요, 창작자 노트를 제공한다.
   - 허브는 게임을 안내하지만 검색 색인이나 광고 대상 페이지로 사용하지 않는 현재 정책을 유지한다.

4. **Game Center 개별 게임 7종**
   - `/game`, `/booktop`, `/fiveinrow`, `/curling`, `/tetris`, `/switch`, `/goal` 모두 HTML robots `noindex, nofollow`, AdSense 로더 0개, 수동 슬롯 0개이며 sitemap에서 제외되어 있다.
   - 이 설정은 2026-11-01 사용자 결정(게임 허브 및 개별 게임을 검색 색인/AdSense 광고에서 제외)에 부합한다.
   - `/miracleshot`는 스토리/작품 소개 페이지이므로 indexable + sitemap + AdSense loader 1개이고, 실제 게임 `/goal`과 분리되어 있다.

### 판정

- **독창적 콘텐츠 가치:** `/miracleshot`은 게임 실행 UI가 아니라 독립적인 스토리/캐릭터/신앙적 주제/제작 의도/OST를 제공하므로 광고 대상 콘텐츠로서 자체 가치가 있다.
- **복제 콘텐츠 위험:** Game Center 카드의 한 줄 요약은 허브 역할이며 광고·색인 대상이 아니다. MIRACLE SHOT 본문에서 동일 문단 반복은 확인되지 않았다.
- **광고 범위:** 실제 게임 화면과 Game Center는 광고 제외, 스토리 소개 페이지에만 AdSense 로더가 있다. 현재 의도된 분리 구조가 유지된다.
- **성능/접근성 개선 후보:** MIRACLE SHOT 갤러리 18장의 총 파일 크기 약 92.6MB, 일반적인 alt, 이미지 width/height 미지정. 이는 복제/저가치 정책 위반으로 단정하지 않고 성능·접근성 보완 항목으로 관리한다.

### 미검증 항목

- 실제 브라우저에서 스토리 페이지의 이미지 라이트박스, Spotify 재생, 책/게임 CTA 동작
- 실제 게임의 로그인, CPU/2인 모드, 3라운드/10회 슛, 모바일 조작
- Auto ads 실제 배치와 브라우저 네트워크 요청
- 18개 갤러리 이미지의 장면별 상세 설명 및 압축/반응형 이미지 적용 전후 성능

이번 단계에서 게임/스토리 페이지 코드는 수정하지 않았다. 사용자 결정에 따른 게임 noindex/광고 제외도 변경하지 않았다.

### 다음 단일 작업

**Bible 페이지(`bible.html`)의 성경 본문 데이터 출처·게시 권한, 찬송가 자료 파일 범위, 광고 제외, 페이지 본문 독립성 및 개인정보 저장 기능 안내를 develop 소스 기준으로 점검한다.** 성경 번역본과 찬송가 PDF의 온라인 게시 권한은 실제 허가 근거가 없으면 완료로 표시하지 않는다. 이어서 Privacy 페이지의 실제 데이터 처리 설명과 일치 여부를 확인한다.


## 2026-11-02 추가 점검 — Bible / Today / Privacy / Terms

**대상:** `bible.html`, `js/bible-auth-gate.js`, `js/bible-creator-story.js`, `images/hymn/`, `today.html`, Today 관련 저장 스크립트, `privacy.html`, `terms.html`
**기준:** AdSense 페이지 가치, 성경/악보 데이터 출처와 게시 권한, 광고 제외, 개인정보 처리 고지
**브랜치:** develop

### 1) Bible 페이지와 성경 데이터

- `bible.html` canonical `https://chrisleepapa.com/bible`, robots `index, follow`, sitemap 포함.
- AdSense 로더 0개, 수동 광고 슬롯 0개, `adsbygoogle.push` 0개. 사용자가 지정한 Bible 페이지 광고 제외 상태가 유지된다.
- 기본 성경 데이터는 `https://raw.githubusercontent.com/stranger828/bibleAPI/main/bible_structured.json`을 우선 사용하고 `bible.json`을 fallback으로 사용한다. 인증 후 로딩되며 브라우저 캐시를 사용한다.
- GitHub API에서 해당 저장소의 `license` 필드는 null이고 저장소에 LICENSE 파일이 없다. README는 개역개정 데이터의 저작권이 대한성서공회에 있을 수 있고 상업적 이용 전 확인이 필요하다고 경고한다.
- `bible-creator-story.js`에는 데이터 출처 링크와 권리 안내가 실제로 표시된다. 이 사이트가 성경 본문을 직접 번역하거나 독창적 창작물로 주장하지 않는다는 설명도 있다. 이는 출처 투명성에는 도움이 되지만 저작권자의 이용 허가를 대신하지 않는다.
- 야고보서 1~5장은 별도로 Supabase `bible_content` 테이블에서 읽는다. 현재 페이지의 출처 안내는 별도 Supabase 본문의 구체적 원출처/이용 권한까지 증명하지 않으므로 별도 확인 대상으로 남긴다.
- Bible reader는 책/장 선택, 검색, 읽기 진행, 형광펜, 북마크, 구절 메모, 묵상/일독 진행과 계정별 기록 기능을 제공한다. 기능적 독창성은 충분하나, 본문 데이터의 권리 문제와는 별개다.

### 2) 찬송가 PDF

- `bible.html`의 `hymnFiles` 배열은 400개이며 번호 1~400에 누락/중복이 없다.
- 모든 PDF 경로는 `/images/hymn/`를 사용하고 해당 디렉터리에 400개 파일이 존재한다.
- 루트 디렉터리에는 별도 찬송가 PDF가 0개이며, 과거 요청한 루트 101~125 파일 제거 상태도 확인했다.
- UI는 전체 1~645장 구조를 보여주되 현재 400개 PDF 등록 상태와 나머지 준비 중 상태를 구분해 안내한다.
- 페이지에는 자료 출처 `https://w-decrecendo.tistory.com/`가 표시된다. 그러나 블로그 출처 표기만으로 원저작권자의 온라인 재게시 권한이 확인되지는 않는다.
- 한국찬송가공회는 21세기 새찬송가/통일찬송가 저작권과 온라인 악보 다운로드 이용 유형을 별도로 안내한다. 현재 400개 파일의 곡별 권리 및 재게시 허가 문서는 확인되지 않았다.

### 3) 외부 권리 근거 — 미완료 고위험 항목

- 대한성서공회 공식 안내는 저작권이 있는 한글 성경 본문을 컴퓨터 데이터 등으로 사용하는 경우 허가가 필요하며, 비상업적 교회 교육용 인용도 허가 신청 대상이라고 설명한다.
- 공개 GitHub 저장소의 데이터 제공이나 출처 링크만으로 개역개정 전체 본문의 웹 게시/캐싱 권한을 확보했다고 볼 수 없다.
- 한국찬송가공회의 온라인 악보 다운로드 라이선스 안내와 현재 사이트의 400개 PDF 제공 방식에 대한 권리 확인이 필요하다.
- 따라서 **개역개정 본문 전체와 찬송가 PDF 400개는 게시 권한 미확인**으로 남긴다. 허가를 받은 것으로 표시하지 않는다. 실제 서면 허가가 확인되기 전까지 이 항목을 완료 처리하지 않는다.
- Bible 페이지는 현재 광고가 없지만 index/follow 및 sitemap 대상이다. 권리 미확인 상태는 광고 승인 여부와 별도의 저작권/콘텐츠 위험으로 관리한다. 필요 시 권리 확인 전 색인 범위 축소 또는 자료 비공개 여부를 별도 결정한다. 이번 단계에서는 페이지를 임의로 비공개하거나 삭제하지 않았다.

### 4) 개인정보처리방침 및 Today 저장 기능 대조

- `privacy.html` canonical `https://chrisleepapa.com/privacy`, robots `index, follow`, sitemap 포함, AdSense 로더 0개.
- 정책에는 영문 3자리 이니셜, PIN 인증 해시, 계정 생성/수정/최근 로그인 시각, 성경 읽기 진행률, 하이라이트/북마크/구절 메모, Bible Journey, Today 날짜별 메모/기도/할 일/출석, 묵상, 기도노트, 공개 TOP 5, 게임 점수/순위, localStorage 세션/해시/설정, Google Analytics/AdSense 쿠키가 기재되어 있다.
- Supabase 리전은 일본 도쿄 `ap-northeast-1`로 고지되어 있다. 전체 계정/연결 기록 삭제는 자동 기능이 없으며 이메일 요청 경로와 7일 이내 처리 안내가 있다.
- 코드에서 Bible chapter progress는 `clp_save_bible_record`, Today records는 `clp_list_today_records`/`clp_save_today`/`clp_delete_today`, Bible Journey는 `clp_load_bible_journey`/`clp_save_bible_journey`, reflection archive는 `clp_list_bible_reflections`/`clp_upsert_bible_reflection`/`clp_delete_bible_reflection` RPC를 사용한다. Today/Bible 개인 기록을 직접 REST 테이블에 노출하는 코드는 확인되지 않았다.
- `today.html`은 `noindex, follow`, AdSense 로더 0개, sitemap 제외다. 개인 대시보드의 광고/검색 노출 제외 상태와 맞는다.
- `terms.html` canonical `https://chrisleepapa.com/terms`, robots `index, follow`, sitemap 포함, AdSense 로더 0개. 2026-11-02 수정본은 성경 번역문, 찬송가 악보/가사, 제3자 미디어가 각 권리자에게 귀속되고 출처 표기만으로 재배포/상업적 이용 허가가 되지 않는다는 문구를 명시한다.
- Privacy와 Terms는 실제 기능 및 제3자 권리 구분을 비교적 정확하게 설명한다. 이번 단계에서 수정하지 않았다.

### 판정

- **Bible 기능 가치:** 독립적인 읽기/검색/진도/메모 기능과 창작자 설명이 있어 단순 복제 텍스트만 있는 페이지는 아니다.
- **복제/권리 위험:** 전체 개역개정 데이터와 400개 찬송가 PDF의 재게시 허가가 확인되지 않아 고위험 미완료. 공개 GitHub/블로그 출처는 허가 증빙이 아니다.
- **광고 설정:** Bible/Today/Privacy/Terms 모두 AdSense 로더 0개. Bible과 Today의 광고 제외 정책이 코드와 일치한다.
- **개인정보 고지:** Supabase 일본 리전, 이니셜/PIN 해시, 읽기/묵상/기도/할 일/순위 기록, 브라우저 저장, 삭제 요청 경로가 정책에 반영되어 있다.
- **미검증:** AdSense 계정의 Privacy & Messaging/CMP 설정 및 실제 동의 배너 노출은 사이트 소스만으로 확인할 수 없다. 계정 화면에서 별도 확인이 필요하다.

이번 단계에서는 성경/찬송가 자료를 삭제하거나 비공개하지 않았고, 코드도 수정하지 않았다. 권리 확인 전에는 허가 완료로 처리하지 않는다.

### 다음 단일 작업

**About / Contact / Privacy / Terms 및 사이트 전반의 공개 연락처·운영자 정보·저작권 고지를 교차 점검한다.** 특히 사이트의 독창적 창작물과 제3자 자료의 구분, Contact 응답 경로, Privacy/Terms의 언어별 동일성, AdSense 로더 제외, sitemap/canonical/robots를 확인한다. 계정의 Privacy & Messaging/CMP는 별도 계정 UI 미검증으로 유지한다.


## 2026-11-02 추가 점검 — About / Contact / Privacy / Terms 교차 검증

**대상:** `about.html`, `contact.html`, `privacy.html`, `terms.html`
**기준:** 독창적 About 본문, Contact 기능/개인정보 수집 여부, 법적 고지, 광고 로더, 색인/사이트맵
**브랜치:** develop

### 확인 결과

1. **About**
   - canonical `https://chrisleepapa.com/about`, robots `index, follow`, sitemap 포함.
   - develop 응답 HTTP 200.
   - 본문 약 2,638자. 창작자 소개, 개인적 창작 계기, Sister Squad, 음악/영상/신앙 프로젝트, Creative Archive 제작 방식, 창작 철학, 연혁을 제공한다.
   - 긴 본문 문단 8개를 홈과 비교했을 때 동일한 120자 이상 문단 반복은 없었다.
   - AdSense 로더 1개, 수동 광고 슬롯 0개, `adsbygoogle.push` 0개. About 페이지는 고유한 소개 콘텐츠를 제공하므로 현재 광고 로더를 유지한다.

2. **Contact**
   - canonical `https://chrisleepapa.com/contact`, robots `index, follow`, sitemap 포함.
   - develop 응답 HTTP 200.
   - 본문 약 234자. 연락 목적, 24시간 이내 응답 안내, 이메일 `mailto:`, Instagram, Facebook 링크를 제공한다.
   - 문의 폼이나 사이트 내 입력 데이터 저장 기능은 없다. 이메일 클라이언트를 여는 링크 중심이므로 별도 문의 폼 데이터 수집은 확인되지 않았다.
   - AdSense 로더 0개, 수동 슬롯 0개. 짧은 길이는 Contact 유틸리티 페이지의 목적에 맞으며 광고도 없어 저가치 광고 페이지로 보지 않는다.

3. **Privacy / Terms**
   - Privacy: canonical `/privacy`, `index, follow`, sitemap 포함, AdSense 로더 0개.
   - Terms: canonical `/terms`, `index, follow`, sitemap 포함, AdSense 로더 0개.
   - 두 페이지 모두 한국어/영어 조항을 제공한다.
   - Privacy는 자동 수집 정보, 게스트북, 공통 계정 이니셜/PIN 해시, Bible/TODAY 개인 기록, 게임 점수, localStorage, 쿠키, Supabase 일본 리전, 보관/삭제 요청 경로를 설명한다.
   - Terms는 운영자 창작물과 성경 번역문·찬송가 악보/가사·제3자 미디어를 구분하고, 출처 표기가 재배포/상업적 이용 허가를 의미하지 않는다고 명시한다.

### 종합 판정

- About은 자체 창작자 소개와 제작 철학이 있어 독립적 가치가 충분하다.
- Contact는 연락 수단 안내 전용 페이지이며 광고가 없어 본문 길이 자체를 저가치 문제로 보지 않는다.
- Privacy/Terms는 검색 노출과 사이트맵이 정상이며 광고를 로딩하지 않는다.
- 네 페이지 모두 develop에서 HTTP 200, canonical 및 robots 설정이 소스와 일치한다.
- 이번 단계에서 소스 수정은 하지 않았다.

### 다음 단일 작업

**사이트 전체의 sitemap.xml / robots.txt / canonical / 라우트 리다이렉트 정합성을 일괄 점검한다.** sitemap 24개 URL 각각의 실제 HTTP 상태, canonical 대상, robots 지시, 삭제 페이지/옛 vercel.app 주소 노출 여부를 대조하고, AdSense 심사에 불필요한 중복 URL이 남아 있는지 확인한다. Google Search Console이 선택한 canonical은 계정 화면 접근 전까지 별도 미검증으로 유지한다.


## 2026-11-02 추가 점검 — 개인정보처리방침과 실제 처리 흐름 대조

- 범위: 개인정보처리방침의 고지 내용과 개발 브랜치의 실제 코드 흐름 대조. 성경·찬송·게임의 콘텐츠 가치/저작권 심사는 제외.
- 방명록: `js/guestbook.js`가 Supabase `guestbook` 테이블에 닉네임, 메시지, 방문 페이지를 전송하고, `created_at`을 화면에 표시. 입력 폼은 이메일/비밀번호를 받지 않음. 정책 설명과 일치.
- 공통 계정: `js/auth.js`에서 3자리 이니셜과 4자리 PIN을 검증하고 SHA-256 해시를 생성. 로그인 세션과 이니셜/PIN 해시를 localStorage에 저장하며 Supabase RPC로 인증. 정책의 브라우저 저장/계정 정보 설명과 일치.
- TODAY/기도노트: `js/today-history.js`, `js/today-prayer-notes.js`, `js/today-archive-v2.js`에서 기록 조회·저장·삭제 RPC를 사용. 기도노트 및 날짜별 TODAY 기록 일부의 사용자 삭제 가능, 전체 계정/연결 기록 일괄 삭제는 이메일 수동 요청이라는 정책 설명과 부합.
- 제3자/국외 처리: 페이지에 GTM 컨테이너 `GTM-NGDTQNVG`가 설치되어 있고, 기존 GTM 구성은 GA4를 전 페이지에서 처리. Supabase 프로젝트 조회 결과 프로젝트 `cvfmkcxmxkmemmshfttn`의 리전은 `ap-northeast-1`(도쿄)로 확인되어 정책의 국외 처리 고지와 일치.
- 발견 및 조치: 기존 정책은 AdSense 광고가 현재 게재 중이라고 단정했으나, 현재 승인 상태와 일치하지 않아 한국어/영어 Article 02·03·04·06의 광고·쿠키 표현을 “광고가 실제 제공되는 경우” 조건부 표현으로 수정. 한국어 Article 07에도 전체 삭제 요청 시 운영자가 본인 확인 후 수동 처리한다는 설명을 추가해 영어 문구와 맞춤.
- 페이지 자체 점검: `privacy.html`은 canonical `https://chrisleepapa.com/privacy`, `index, follow`, GTM 코드가 있으며 AdSense 직접 로더는 없음. 개인정보 안내 페이지 자체에서 광고를 직접 로드하지 않음.
- 수정 파일: `privacy.html`; 개발 브랜치 커밋 `4c638f26530d330ae8adb2a01cdd30b486a48867`.
- 검증 한계: GitHub 개발 소스 재조회로 수정 문자열과 메타 설정을 확인. 현재 Vercel 일일 배포 한도 때문에 수정본의 develop 실서비스 렌더링은 아직 검증하지 않음. 운영(main)에는 반영하지 않음.
- 다음 순서: 실제 AdSense 대상인 SisterSquad 및 SisterSquad 2 페이지의 독립 콘텐츠 가치/중복성 점검. 광고 제외 페이지는 콘텐츠 가치 심사에서 제외.


## 2026-11-02 추가 점검 — Sister Squad 계열 페이지 독립성/중복성

- 점검 범위: `/sistersquad`, `/sistersquad2`, `/sistersquad-hub`, `/yul`, `/jung`. 두 가지 AdSense 거절 사유(복제 콘텐츠, 가치가 별로 없는 콘텐츠) 기준으로만 확인.
- 기본 설정: 다섯 페이지 모두 canonical이 각 페이지 고유 URL을 가리키고 `index, follow`이며 AdSense 로더 1개, 수동 광고 슬롯/adsbygoogle.push 0개.
- 메타 정보: 각 페이지에 페이지 주제에 맞는 title/description이 존재함. `sistersquad.html` description은 줄바꿈된 여러 줄 속성이라 단순 한 줄 정규식에는 잡히지 않았지만 실제 head에 정상 존재.
- `/sistersquad`: 1편의 기본 설정, 자매 캐릭터 소개, 첫 번째 모험의 구체적 전개, 창작 동기, Fairy Town 세계관 형성 과정, 실제 제작 기록(Journal 1·2·4 링크)을 포함. 단순 영상/책 링크 모음이 아니라 원작 IP의 기원과 독립적인 소개 콘텐츠가 있음.
- `/sistersquad2`: 3개 예고편, NG 영상, 본편 영상 외에도 성장한 자매와 아빠의 갈등, 주요 인물·동료·적 소개, OST, 2편의 여정, 창작자의 제작 의도, 세 가지 주제 해설을 포함. 임베드 중심 페이지이지만 자체 서사·해설 콘텐츠가 함께 존재함.
- `/sistersquad-hub`: 시리즈 전체 탐색 허브로 캐릭터, 세계관, 인물 관계, 마법/유물, 시리즈, 갤러리 및 캐릭터 심층 소개로 연결. 개별 작품 페이지와 목적이 구분됨.
- `/yul`, `/jung`: 각 캐릭터별 성장 서사, 능력 설명, 두 자매 관계, 실제 창작 기원, 갤러리와 추가 캐릭터 노트를 보유. 단순히 같은 프로필 문구를 복제한 구성은 아님.
- 중복 검사: 다섯 페이지의 100자 이상 문단을 비교했으며 완전히 동일한 본문 문단은 발견되지 않음. 주제·인물명·세계관 용어의 반복은 동일 IP의 연속성을 위한 것으로, 그 자체를 복제 콘텐츠로 판정하지 않음.
- 판정: 현재 소스 기준으로 두 가지 거절 사유에 해당하는 명백한 복제 문단 또는 빈약한 링크 모음 페이지는 확인되지 않음. 다섯 페이지 모두 서로 다른 방문 목적과 고유한 설명을 제공함. 이 결과는 콘텐츠 소스 점검이며 Google의 승인 보장은 아님.
- 조치: 콘텐츠 수정은 하지 않음. 불필요한 문구 추가나 페이지 중복 확장은 피함.
- 검증 한계: 현재 Vercel 일일 배포 한도 때문에 develop 실서비스의 최신 렌더링은 확인하지 못함. GitHub develop 소스만 점검했고 main/production에는 반영하지 않음.
- 다음 순서: `/tutupupupipi` 실제 콘텐츠 구성과 독립 설명, 영상 임베드 비중, 광고 코드/메타/중복 여부 점검.


## 2026-11-02 추가 점검 — TuTu PuPu PiPi 페이지

- 대상: `/tutupupupipi` (광고 대상 페이지).
- 기본 설정: canonical `https://chrisleepapa.com/tutupupupipi`, `index, follow`, 페이지 설명 존재, AdSense 로더 1개. 수동 광고 슬롯 및 `adsbygoogle.push`는 확인되지 않음.
- 고유 콘텐츠: 세 캐릭터의 성격·역할·대사, 하늘섬/숲/마을 세계관, OST 설명, 여섯 Shorts 각각의 영상 ID·제목·개별 설명·YouTube 링크, 창작자 노트를 포함.
- 영상 구현: Shorts 6개는 각각 고유 ID 6개를 사용하며, 최초 HTML에 Shorts 플레이어 iframe을 6개 미리 삽입하지 않고 클릭 시 `youtube-nocookie.com` iframe을 생성하는 방식. OST YouTube playlist 및 Spotify 앨범 embed는 별도로 1개씩 존재.
- 중복/가치 검토: 기존 Creator Note가 세계관 소개와 Feature 설명의 여섯 에피소드 요약을 거의 다시 말하고 있어 본문 반복을 줄일 필요가 있었음. 한국어/영어 Creator Note를 캐릭터 성격을 장면으로 보여주는 기획 의도와 페이지 구성 이유를 설명하도록 수정해 앞선 세계관·영상 설명과 역할을 분리.
- 수정 파일: `tutupupupipi.html`; 개발 브랜치 커밋 `d0399af3bd661877627e62700c0c59adbff57cb6`.
- 확인: 수정 후 GitHub develop 재조회에서 새 한국어/영어 문구 확인, 기존 반복 문구 부재 확인, Shorts 6개/고유 ID 6개/AdSense 로더 1개/클릭형 Shorts 로딩 구조 확인.
- 판정: 기존 페이지는 단순 임베드 모음이 아니라 독립 캐릭터·세계관 설명과 개별 영상 안내를 갖추고 있음. 이번 수정은 중복 설명을 줄여 고유한 창작 의도를 더 분명히 함. AdSense 승인 보장은 아님.
- 검증 한계: Vercel 일일 배포 제한으로 develop 실서비스 반영 및 브라우저 화면 검증은 미실시. main/production에는 반영하지 않음.
- 다음 순서: `/worship` 및 `/worship_eng`의 독립 창작 설명, 앨범/플레이리스트 임베드 비중, 중복 문구, 광고 코드 점검.


## 2026-11-02 추가 점검 — Korean Worship / English Worship

- 대상: `/worship`, `/worship_eng` (오리지널 음악 콘텐츠 페이지).
- 기본 설정: 두 페이지 모두 고유 canonical, `index, follow`, 페이지별 meta description 존재, AdSense 로더 1개, 수동 광고 슬롯/adsbygoogle.push 0개.
- Korean Worship: 나의 찬양 Vol.1·2·3 및 Whispers Of Grace 앨범 소개, 앨범별 외부 스트리밍 링크, 앨범을 만든 배경과 각 권의 주제, AI 보조 제작 과정 설명, 한국어 가사집을 포함. 외부 YouTube/Spotify 플레이어 iframe을 본문에 직접 삽입하지 않고 앨범/플레이리스트 링크를 제공.
- English Worship: SHOUT 단일 앨범의 별도 소개, 영어 워십의 주제와 방향, 제작 과정, 공식 스트리밍 링크, 15곡 전체 가사 아카이브를 포함. Korean Worship의 내용을 그대로 복사한 페이지가 아니라 별도 언어·앨범·가사 콘텐츠로 구성.
- 중복/가치 검토: 단순 Spotify/YouTube 임베드 모음이 아니며, 창작 배경·앨범별 의미·제작 과정·전체 가사 등 독립적인 원문 콘텐츠가 존재함. 현재 확인한 소스에서 명백한 동일 본문 복제나 빈약한 링크 전용 구성을 발견하지 않음.
- 판정: 두 페이지 모두 광고 심사 대상 창작 콘텐츠로서 자체 설명과 원문이 충분히 존재하는 구조. 실제 가사 원문과 창작 과정은 소유자가 제공한 작품이라는 전제하에 콘텐츠 가치 측면에서 검토했으며, 저작권을 별도 심사하지 않음. AdSense 승인 보장은 아님.
- 조치: 콘텐츠 수정 없음. 과도한 요약문이나 임베드를 추가하지 않음.
- 검증 한계: GitHub develop 소스 기준 점검. Vercel 일일 배포 제한으로 develop 실서비스 렌더링과 브라우저 시각 검증은 미실시. main/production에는 반영하지 않음.
- 다음 순서: Chris's Note의 페이지 구성, 원문/큐레이션 비중, 외부 링크·임베드 의존도 및 광고 코드 점검.


## 2026-11-02 추가 점검 — 홈의 Chris's Note 섹션

- 대상: 홈 `index.html`의 `#chris-note`와 렌더러 `js/home-chris-note.js`. 별도 URL이 아닌 홈 내부 섹션이므로 독립 페이지로 분류하지 않음.
- 홈 기본 설정: `index, follow`, canonical은 홈 URL, AdSense 로더 1개. 홈에는 SISTER SQUAD 2 본편 iframe이 별도 섹션에 존재.
- 섹션 구성: 창작 아카이브의 목적을 설명하는 소개와 편집자 노트, Journal 1~4 카드, 전체 Journal 링크를 제공. 각 카드는 서로 다른 글 제목/요약/목적지로 연결되며 `/journal` 전체 목록으로 나머지 글도 탐색 가능.
- 독립성: Chris's Note는 독립된 기사라기보다 홈의 창작 기록 내비게이션/편집자 소개 역할. 실제 독립 콘텐츠는 연결된 Journal 상세 글에서 제공됨. 홈의 정적 소개와 Chris's Note의 편집자 소개는 “결과물뿐 아니라 제작 과정도 기록”이라는 메시지가 일부 겹치지만, 동일 문단 복제는 아님.
- 판정: 이 섹션 자체를 독립 AdSense 콘텐츠 페이지로 평가할 필요는 없음. 홈의 전체 원본 설명 및 개별 프로젝트 섹션과 Journal 연결을 보조하는 탐색 요소로 기능함. 이 섹션만으로 복제 콘텐츠나 가치 부족을 판정할 근거는 없음.
- 조치: 코드 수정 없음. 현재 구성이 홈 탐색 목적에 부합하며, 동일 내용을 더 늘리는 것은 불필요.
- 검증 한계: GitHub develop 소스 점검. 브라우저 렌더링은 배포 한도 때문에 미확인. main/production 미변경.
- 다음 순서: `/music` 및 `/movie`의 실제 작품 설명과 외부 임베드/링크 의존도, 특히 Movie 페이지의 광고 로더 제외 여부 점검.


## 2026-11-02 추가 점검 — Wallpaper Studio

- 대상: `/wallpaper` (광고 대상 페이지).
- 기본 설정: title/description 존재, canonical `https://chrisleepapa.com/wallpaper`, `index, follow`, AdSense 로더 1개, 수동 광고 슬롯/adsbygoogle.push 0개.
- 독립 콘텐츠: 모바일 무빙 월페이퍼 4편과 PC 정지 이미지 9점, 각 모바일 작품별 설명, 창작자 노트, 개인 사용 라이선스, Android/iPhone/Windows/macOS 설정 가이드를 포함. 단순 파일 다운로드 링크 모음이 아님.
- 파일 경로 확인: `images/lockscreen00.mp4`, `mobile01.mp4`~`mobile04.mp4`, `wallpaper01.png`~`wallpaper09.png` 총 14개 파일이 모두 GitHub develop의 `images/` 디렉터리에 존재. 다운로드 링크는 모바일 MP4 4개 및 PC PNG 9개로 연결됨.
- 영상/이미지 동작: 상단 컬렉션 영상 1개와 모바일 미리보기 4개, 총 5개 video 요소. 모바일 미리보기는 `preload=none`, PC 이미지는 lazy loading/async decoding을 사용. 광고 슬롯을 삽입한 별도 수동 코드는 없음. 기존 사용자 요청대로 별도 이미지 오버레이 요소는 확인되지 않음.
- 성능 주의: 확인한 14개 원본 파일 합계 약 115.7MB(상단 영상 포함). 파일 자체는 모두 존재하지만, 모바일 네트워크 환경에서는 초기/개별 다운로드 부담이 될 수 있음. 이는 AdSense 정책 위반이 아니라 성능 최적화 후보. 상단 영상은 autoplay/muted/loop이며 metadata preload.
- 독창성 판정: 각 작품을 무료 개인 배경화면으로 제공하는 목적과 사용 범위가 명확하고, 모바일/PC별 파일 형식·설정 안내 및 창작 노트가 있어 다운로드만 제공하는 빈약한 페이지는 아님. 다만 PC 이미지 9점은 번호 중심의 일반 제목이므로, 실제 이미지 내용을 확인한 뒤 작품별 고유 설명을 추가하면 더 나아질 수 있음. 이미지 장면은 이번 소스 점검에서 직접 시각 검증하지 않음.
- 조치: 코드 수정 없음. 이미지 장면을 확인하지 않고 설명을 추측해 추가하지 않음.
- 검증 한계: GitHub develop 소스 및 파일 존재/크기 확인. 실제 브라우저 다운로드, 모바일/PC 화면, 영상 재생 및 최신 preview는 Vercel 배포 한도 때문에 미검증. main/production 미변경.
- 다음 순서: `/about` 등 실제 색인/광고 대상 소개 페이지의 고유 콘텐츠, 중복성, 광고 코드 점검. `/contact`, `/privacy`, `/terms`는 광고 제외 정책 페이지로 콘텐츠 가치 심사에서 제외.


## 2026-11-02 추가 점검 — About 페이지

- 대상: `/about` (광고 대상 소개 페이지).
- 기본 설정: title/description 존재, canonical `https://chrisleepapa.com/about`, `index, follow`, AdSense 로더 1개, 수동 광고 슬롯/adsbygoogle.push 0개.
- 독립 콘텐츠: 운영자 소개와 창작 여정, Sister Squad 창작 배경, 음악·영상·출판 등 창작 철학, AI 도구를 초안/실험에 사용하고 결과를 선택·수정하는 제작 방식, 아카이브에서 만날 수 있는 콘텐츠 종류, 2025~2026 연혁, 공식 채널 링크를 포함.
- 중복/가치 검토: 홈의 창작 아카이브 소개와 주제상 일부 겹치지만, 동일한 문단을 그대로 복제하지 않음. About은 개인 서사와 연혁, 창작 방식에 초점을 둔 별도 소개 페이지로 역할이 구분됨.
- 광고 심사 기준 판정: 단순 링크 모음이 아니라 운영자 고유의 경험·제작 철학·연혁을 담고 있어 저가치 콘텐츠로 볼 명백한 근거는 확인되지 않음. 외부 플랫폼 링크는 보조 경로이며 본문 자체 설명이 존재함.
- 조치: 코드 수정 없음. 현재 구조 유지.
- 검증 한계: GitHub develop 소스 기준 점검. 최신 develop 실서비스 렌더링/브라우저 시각 검증은 배포 한도로 미실시. main/production 미변경.
- 다음 순서: 현재까지 점검한 광고 대상 페이지들의 체크리스트 상태와 develop/main 차이를 다시 대조한 뒤, 미점검 광고 대상 페이지가 남아 있는지 순서대로 확인.


## 2026-11-02 추가 점검 — Sister Squad 계열 페이지 독립성/중복성 1차 확인

- 점검 브랜치: develop. 운영 main에는 반영하지 않음.
- 대상: `sistersquad.html` (`/sistersquad`), `sistersquad2.html` (`/sistersquad2`), `sistersquad-hub.html` (`/sistersquad-hub`), `yul.html` (`/yul`), `jung.html` (`/jung`).
- 공통 기본 설정: 모두 canonical이 개별 URL을 가리키고 `index, follow`로 설정됨. 페이지별 직접 AdSense 로더는 각 1개이며 수동 광고 슬롯은 확인되지 않음.
- 본문 구조: 1편은 이야기의 시작, 두 자매의 성격/능력, 첫 모험, 창작 동기와 Fairy Town 세계 형성 기록을 포함. 2편은 후속 모험의 줄거리, 장소별 시험, 아빠 캐릭터를 포함시킨 창작 이유, 가족 서사 관점을 별도 설명. 허브는 주요 인물, 세계관, 마법/유물, 시리즈 및 갤러리 탐색 구조. 율·정 개별 페이지는 각각 인물 중심 상세 프로필.
- 긴 문단 비교: 다섯 페이지의 100자 이상 본문 문단을 추출해 완전 동일 문단을 비교했으며, 정확히 동일한 긴 문단은 발견되지 않음. 이는 문장 일부 유사성/의미상 반복까지 없다는 뜻은 아님.
- 1차 평가: 각 페이지의 목적은 구분되고, 창작자 관점과 작품 고유 설정이 있어 단순히 같은 콘텐츠를 복제한 페이지로 보이지는 않음. 다만 Sister Squad 1편과 허브, 인물 페이지 사이에는 세계관·인물 소개가 필연적으로 겹치므로 각 페이지의 고유 역할을 더 선명하게 유지할 필요가 있음.
- 추가 확인 필요: 각 페이지의 영상/이미지/구매 링크가 실제로 작동하는지, 소개 문단과 메타 description이 페이지별 고유 내용을 충분히 설명하는지, 허브가 상세 페이지 내용을 단순 재나열하지 않는지 후속 확인. 현재는 코드 정적 검토이며 실제 브라우저 시각 검증은 아님.
- 현 단계 수정 사항 없음. 페이지 본문을 더 부풀리기보다 실제 작품·창작 과정·독자에게 제공하는 구체 정보가 고유하게 드러나는지 중심으로 이어서 확인.
- 다음 순서: Sister Squad의 미디어/내부 링크와 독립 가치 확인을 마친 뒤 TuTuPuPuPiPi 페이지 점검.


## 2026-11-02 추가 점검 — TuTu PuPu PiPi 독립 콘텐츠 및 미디어 구조

- 대상: `tutupupupipi.html`, canonical `https://chrisleepapa.com/tutupupupipi`, robots `index, follow`.
- 광고: 페이지 내 AdSense 로더 1개, 수동 광고 슬롯/adsbygoogle.push 호출 0개. 광고 적용 대상 페이지로 분류.
- 본문: 텍스트 추출 약 2,680자. 캐릭터별 성격·역할·대사, 세계관, 여섯 개 에피소드의 개별 설명, 공식 OST, 창작자 노트가 포함됨. 단순 외부 영상 링크 모음이 아니라 캐릭터·에피소드 기획 의도를 설명하는 고유 본문이 존재함.
- 이미지: `tutupupupipi_top.png`, `tutu.png`, `pupu.png`, `pipi.png`, `tutupupupipi.png` 5개가 develop `images/` 디렉터리에 존재. 캐릭터 이미지는 구체적 alt 제공.
- 영상: 여섯 개 카드에 서로 다른 YouTube video ID가 연결되어 있으며, 미리보기 버튼 클릭 시 `youtube-nocookie.com/embed/{videoId}`로 교체하는 인라인 로직 확인. 이미지 로드 실패 시 대체 UI 로직 존재. 실제 브라우저 재생은 아직 테스트하지 않음.
- 음악: YouTube OST playlist ID `OLAK5uy_lTkP61UkmmjKHmHaH0Ox54kggQeQieSLY` 및 Spotify album ID `5sdI03qLb0yoBQKN7BZ86r` 임베드/외부 링크가 구성되어 있음.
- 1차 평가: 캐릭터와 에피소드 설명, 창작자 노트가 있어 독립 콘텐츠 가치가 있음. 동일 문구를 반복하는 대량 페이지 형태는 확인되지 않음. 다만 2,680자 정도로 길이가 아주 긴 페이지는 아니므로 실제 영상 6편과 OST가 안정적으로 열리고, 설명이 영상 내용과 정확히 일치하는지 최종 검증이 중요함.
- 조치: 이번 정적 검토에서 즉시 수정이 필요한 AdSense 콘텐츠 가치/복제 콘텐츠 문제는 확인하지 못함. 소스 변경 없음.
- 다음 순서: Worship 앨범 소개 페이지를 점검하고, 특히 외부 스트리밍 임베드만으로 구성된 페이지인지, 앨범별 독립 설명과 창작 맥락이 있는지 확인.
- 검증 한계: 개발 브랜치 GitHub 소스 기준. 배포 일일 한도 문제로 live develop 렌더링 및 실제 영상 재생 테스트는 미실시. main 미반영.


## 2026-11-02 추가 점검 — Worship / English Worship / Music Archive

- 대상: `worship.html` (`/worship`), `worship_eng.html` (`/worship_eng`), 참고 비교 `music.html` (`/music`).
- 인덱싱/광고: `/worship`, `/worship_eng`는 각각 고유 canonical과 `index, follow`, AdSense 직접 로더 1개씩. `/music`은 AdSense 직접 로더 0개. (직접 로더 수 기준이며 GTM 내부 태그의 조건/실행 여부를 대체하지 않음.)
- 한국어 Worship의 독립 내용: 예배 아카이브 소개, Vol.1~3 및 Whispers Of Grace 각 앨범 소개, 앨범별 제작 배경, AI 보조 제작 과정에 대한 창작자 설명, 앨범별 가사집이 포함됨. 본문 텍스트 추출 약 20,476자이며 가사집에 원곡 가사가 수록되어 있음.
- English Worship의 독립 내용: SHOUT 앨범 15곡, 영어 워십 컬렉션의 별도 기획 의도, 앨범 서사, 창작자 주도·AI 보조 제작 설명, 15곡 가사 아카이브. 본문 텍스트 추출 약 18,839자.
- 스트리밍 링크: 한국어 페이지는 Spotify 앨범 4개와 YouTube 재생목록 3개, 영어 페이지는 Spotify 앨범 1개와 YouTube 재생목록 1개에 연결됨. 각 페이지의 앨범 ID/앵커(Vol.1~3, Whispers of Grace, SHOUT)는 구분되어 있음.
- `music.html` 비교: 워십 페이지와 달리 AI 음악 제작의 판단 기준/창작 과정 중심의 별도 아카이브이며 직접 AdSense 로더는 없음. 주제상 AI 제작 설명은 일부 공통되지만, 동일 문단의 단순 복제는 확인되지 않음.
- 1차 평가: 두 워십 페이지는 외부 스트리밍 임베드만으로 구성된 얇은 페이지가 아님. 앨범별 맥락과 창작자 노트, 전체 가사 아카이브가 자체 콘텐츠로 존재하므로 독립 콘텐츠 가치가 분명함. 한국어/영어 페이지도 단순 언어 복제라기보다 서로 다른 앨범 컬렉션(한국어 Vol.1~3/Whispers vs 영어 SHOUT)을 제공함.
- 주의/후속: 가사 아카이브가 페이지의 상당 부분을 차지하므로 앨범별 고유 제작 배경과 곡의 주제/메시지가 충분히 드러나는지 확인할 것. 가사 저작권이나 권리 상태는 이번 AdSense 콘텐츠 가치 점검 범위가 아니며, 사용자 소유 원곡 가사로 취급하여 별도 이슈를 만들지 않음. 실제 외부 플레이어 재생은 브라우저에서 아직 검증하지 않음.
- 조치: 정적 소스 검토에서 즉시 수정이 필요한 AdSense 복제 콘텐츠/가치 부족 문제는 발견되지 않아 소스 변경 없음.
- 다음 순서: `Chris's Note` 및 영상·Spotify 임베드 중심 페이지의 고유 설명/독립 콘텐츠 가치 점검.
- 검증 한계: develop 브랜치 소스 기준, 실제 플레이어 재생/브라우저 시각 검증 미실시. 운영 main 미반영.


## 최근 단일 작업 결과 — Movie Archive (광고 제외 화면의 콘텐츠/중복 확인)

- 점검 브랜치: develop. 소스 파일 `movie.html`의 현재 blob SHA: `ddcfbd1685d3fea0d79dd2d2357e8725ccff0483`.
- 페이지 기본 설정: canonical `https://chrisleepapa.com/movie`, `index, follow`, description 존재.
- 광고 코드 정적 확인: 페이지 직접 AdSense loader 0개, 수동 광고 슬롯 0개, `adsbygoogle.push` 0개. 소스에 “Movie page is excluded from page-level ad loading” 주석이 있음. 다만 GTM 컨테이너 스크립트/noscript는 남아 있으므로, GTM 내부 AdSense 태그의 URL 제외 조건까지 확인하기 전에는 “실제 광고 미노출”로 최종 확정하지 않음.
- 독립 콘텐츠: FURIOUS, 귀멸의 칼날 실사 촬영 콘셉트, 사랑한다고 3개 영상 각각에 한국어/영어 제작 노트가 있음. 각 작품별 아이디어, 제작 과정, 배운 점을 설명하며 단순 영상 임베드만 제공하는 구조는 아님.
- 미디어 구성: 메인 YouTube 플레이어 1개, YouTube Shorts 8개 링크/썸네일. GTM noscript iframe을 제외하면 영상 iframe은 메인 플레이어 1개. Shorts는 외부 YouTube 링크로 연결됨.
- 중복/가치 확인: 상단 VERTICAL ARCHIVES와 하단 SHORTS VIDEO LIST에 동일한 Shorts 8편의 제목/목록이 반복 노출되고, 일부 설명도 사실상 동일함. 이는 별도 작품 페이지를 복제한 문제라기보다 동일 목록을 두 섹션에서 반복하는 편집상 중복임. 페이지에는 3개 작품의 구체적인 제작 노트가 있어 고유한 창작자 콘텐츠도 확인됨.
- 판정: 콘텐츠 가치 자체는 양호. 다만 동일 Shorts 8편을 두 번 나열하는 부분은 사용자 경험과 페이지 고유성 측면에서 정리 후보. 현재 즉시 삭제/수정은 하지 않음. 광고 제외가 실제로 GTM에서도 적용되는지 별도 확인 필요.
- 조치: 코드 변경 없음. 기존 영상/기능은 유지.
- 검증 한계: GitHub develop 정적 소스만 확인. 실제 브라우저 렌더링, 영상 재생, GTM 컨테이너의 실시간 태그 실행, AdSense 광고 미노출은 검증하지 못함. main/production 미변경.
- 다음 단일 작업: `music.html`의 앨범 이야기/제작 기록이 서로 중복되지 않는지, 동적 렌더링 영역이 실제 본문으로 정상 구성되는지, 광고 코드와 외부 플레이어 구조가 적절한지 확인한다.


### Movie Archive 광고 제외 — GTM export 추가 근거 (2026-11-02)
- 제공된 `GTM-NGDTQNVG_v2.json`(2026-10-30 export, container version 2)의 태그 목록은 GA4 Google tag 1개이며 AdSense 태그는 없음.
- 따라서 확인한 HTML의 직접 AdSense loader/수동 슬롯 0개와 해당 GTM export를 함께 보면, 확인 가능한 소스/버전 범위에서는 Movie 페이지의 광고 로딩 코드가 발견되지 않음.
- 다만 export가 현재 실시간 게시 버전과 동일한지 확인하지 않았으므로 실제 운영 광고 미노출의 최종 증명으로 간주하지 않음.


## 최근 단일 작업 결과 — Music Archive (독립 콘텐츠 및 동적 제작 기록)

- 대상: `music.html` 및 `js/music-production-notes.js`.
- develop 파일 SHA: `music.html` = `2af4684d64ae2d103e0e663f928564951d7ea7eb`; `js/music-production-notes.js` = `ce9d57fe3a9dfe7fa1e9eb7e849e69d06d38e560`.
- 기본 설정: canonical `https://chrisleepapa.com/music`, `index, follow`, 직접 AdSense loader 0개, 수동 광고 슬롯 0개, `adsbygoogle.push` 0개.
- 본문/기능: 앨범 아카이브와 Spotify 플레이어, 앨범별 이야기, 음악 제작 기록, 창작자의 실제 판단 기준을 설명하는 본문이 있음. 외부 음악 플레이어만 나열한 화면은 아님.
- 동적 콘텐츠: `music-production-notes.js`가 페이지 내 `.music-creation-notes` 영역을 대상으로 작품별 출발점·제작 방향·감상 포인트·참고 프롬프트를 렌더링한다. HTML에서 컨테이너와 스크립트 로드가 확인되고, `main.js` 언어 설정에 따라 한국어/영어를 다시 렌더링하는 MutationObserver 구조가 있음. 소스상 출력 경로는 연결되어 있으나 실제 브라우저 렌더링/콘솔 검증은 미실시.
- 앨범별 설명: 앨범 스토리와 제작 노트가 서로 다른 역할(작품의 의미·배경 vs 실제 제작 판단/감상 포인트)을 갖도록 구성되어 있음. 다만 상단 8개 원칙과 하단 “FROM IDEA TO RELEASE” 3개 항목은 ‘창작 의도’, ‘AI 결과를 그대로 채택하지 않는 판단’, ‘발매 후 맥락 기록’에서 의미가 반복됨. 분량을 늘리는 것보다 두 영역을 통합하거나 하단 요약을 간결하게 하는 편집 후보임.
- 외부 미디어: Spotify 플레이어 API 및 오류 시 fallback iframe 경로가 있음. 음악 아카이브의 핵심 기능으로, 이를 제거할 근거는 없음.
- 판정: 독창적인 제작 관점과 앨범별 이야기/기록이 있어 저가치 임베드 모음으로 보이지 않음. 현재 정적 소스에서 즉시 수정이 필요한 복제 콘텐츠 문제는 확인되지 않음. 설명 영역 간 일부 반복은 편집 개선 후보로만 기록.
- 광고/GTM 보충 확인: 사용자가 제공한 `GTM-NGDTQNVG_v2.json`(2026-10-30 export, container version 2)을 확인한 결과 태그는 GA4 Google tag 1개뿐이며 AdSense 태그는 없음. 이 export가 현재 실시간 게시 버전과 동일한지는 별도 확인이 필요하므로, 실제 광고 미노출은 실서비스 태그 확인 전까지 확정하지 않음.
- 조치: 코드 변경 없음. 기존 앨범/Spotify 기능 유지.
- 검증 한계: GitHub develop 정적 소스 및 제공된 GTM v2 export만 확인. 실제 브라우저 표시, Spotify 재생, 모바일/PC 레이아웃, 현재 게시된 GTM 버전은 미검증. main/production 미변경.
- 다음 단일 작업: `/journal` 목록의 `noindex` 설정과 사이트맵 포함 여부를 대조하고, 색인 대상인 Journal 상세 글 1~6의 독립 콘텐츠·광고 코드·목록 링크 연결을 확인한다.


## 최근 단일 작업 결과 — Journal 목록 및 상세 글 1~6

- 대상: `journal.html`, `journal-1.html`~`journal-6.html`, `sitemap.xml`, `robots.txt`.
- 사이트맵: 총 24개 URL. `/journal` 목록 페이지는 sitemap에 포함되지 않고, 상세 글 `/journal-1`~`/journal-6` 6개가 포함됨.
- 목록 페이지: canonical `https://chrisleepapa.com/journal`, `noindex, follow`, 직접 AdSense loader 0개, 광고 슬롯 0개. 여섯 상세 글로 연결되는 카드와 창작 기록 아카이브 소개가 존재함. 목록 자체를 색인 대상에서 제외하고 상세 글만 노출하려는 설정과 sitemap 구성이 일치함.
- 상세 글 공통: 각 canonical이 개별 URL을 가리키고 `index, follow`; 직접 AdSense loader 각 1개, 수동 광고 슬롯 0개, 직접 `adsbygoogle.push` 0개. robots.txt는 전체 크롤링을 허용하고 sitemap을 지정함.
- 독립 콘텐츠:
  - Journal 1: 창작을 시작한 이유, 두 딸의 참여, AI를 도구로 활용하며 겪은 초기 시행착오.
  - Journal 2: Skywork AI 사용 경험, 첫 프롬프트, 이야기/이미지 구성과 수정 과정.
  - Journal 3: POD 출판을 위한 원고 확정, 판형·표지·파일 규격, 등록 및 유통 과정.
  - Journal 4: 실제 두 캐릭터의 성격을 디자인 기준으로 옮기고 일관성을 검수한 과정.
  - Journal 5: 직장·가족과 창작을 병행하는 시간 관리, 모바일 중심 작업 방식과 시행착오.
  - Journal 6: Worship 창작의 출발점, 기도/생각을 가사와 곡으로 발전시키는 과정, AI 결과를 선택·수정한 경험.
- 분량/역할: 정적 HTML 텍스트 추출 기준 약 3,624~9,402자. 단순 외부 링크나 결과물 소개만 있는 글이 아니라 실제 경험과 구체적인 작업 과정을 설명함. 여섯 글의 주제는 서로 구분됨.
- 내부 연결: 목록에서 상세 글 6개로 연결. 상세 글은 이전/다음 글 및 목록 복귀 링크를 제공하는 구조가 확인됨. 개별 링크의 실제 브라우저 클릭은 미검증.
- 판정: 목록의 noindex 및 sitemap 제외는 상세 글을 색인시키는 현재 목적과 일치하므로 변경 불필요. 상세 글은 고유 경험·과정 설명을 제공하며 정적 소스에서 명백한 복제/저가치 페이지를 확인하지 못함. Journal 6은 성경/찬송 기능 페이지가 아니라 창작 경험을 다루는 독립 글이므로 별도 광고 제외 대상으로 자동 분류하지 않음.
- 조치: 코드 변경 없음.
- 검증 한계: develop 정적 소스, sitemap 및 robots만 확인. 실제 Google 색인 상태, 검색결과, 브라우저 렌더링/광고 노출, 링크 클릭은 미검증. main/production 미변경.
- 다음 단일 작업: `shop.html`의 작품별 고유 설명, 판매처 링크 의존도, 광고 로더/슬롯 및 색인 설정을 확인한다.


## 최근 단일 작업 결과 — Official Shop

- 대상: `shop.html`; develop blob SHA `b9f5dc8ff71da65a59bd2dbacd74c59b19df44fd`.
- 기본 설정: canonical `https://chrisleepapa.com/shop`, `index, follow`.
- 광고 코드: 직접 AdSense loader 0개, 수동 광고 슬롯 0개, `adsbygoogle.push` 0개. 확인한 GTM v2 export(2026-10-30, version 2)에도 GA4 Google tag만 있고 AdSense 태그는 없음. 현재 실시간 게시 GTM 버전은 별도 미검증.
- 페이지 목적/구성: Sister Squad 1·2, 컬러링북, Miracle Shot 등 출판물과 이모티콘의 공식 판매처로 연결하는 쇼핑 안내/상품 디렉터리. YES24, 영풍문고, Google Play, Amazon 및 OGQ/Naver 링크가 있음.
- 콘텐츠 가치: 가족 동화, 창작 세계, 상품 유형을 소개하는 짧은 문구가 있으나 정적 본문 텍스트는 약 1,351자이며 페이지의 주된 기능은 외부 판매처 링크 연결임. 작품 자체의 상세한 서사/제작 설명은 별도 작품 페이지에 존재함.
- 판정: 광고 코드가 없는 판매처 안내 페이지이므로 현재 확인 범위에서 “복제 콘텐츠 화면에 광고” 위험은 낮음. 다만 `index, follow`인 상태에서 독립적인 작품 정보보다 외부 구매 링크 비중이 높아 사이트 전체의 콘텐츠 가치 관점에서는 얇은 디렉터리로 보일 여지가 있음. 상세 작품 설명을 무리하게 복사해 붙이지 말고, 각 상품의 차이/독자 대상/판본과 형식 등 이 페이지에서만 필요한 구매 판단 정보를 제공할지 검토할 가치가 있음.
- 조치: 코드 변경 없음. 상품/판매처 링크와 기능 유지.
- 검증 한계: GitHub develop 정적 소스만 확인. 각 외부 판매 링크의 현재 목적지/재고/상품 상태, 브라우저 UI 및 모바일 표시, 실시간 광고 노출은 미검증. main/production 미변경.
- 다음 단일 작업: `index.html` 홈 화면의 광고 대상 콘텐츠 구성, Sister Squad 2 본편 임베드 주변의 자체 설명/카드 반복, 광고 코드 및 동적 렌더링 구조를 확인한다.


## 최근 단일 작업 결과 — Home 페이지 및 동적 홈 섹션

- 대상: `index.html`, `js/home-chris-pick-v2.js`, `js/home-chris-note.js`, `js/home-language.js`, `js/main.js`.
- develop blob SHA: `index.html` = `c56d154d11629bcb087169118c5e370e6b77b7f1`; `home-chris-pick-v2.js` = `76f505eed40196b5f65d8cc09bdb4255bc156b2f`; `home-chris-note.js` = `3262cfc304f4feaa3d944189f00449da20d7ac1b`.
- 기본 설정: canonical `https://chrisleepapa.com/`, `index, follow`, 직접 AdSense loader 1개, 수동 광고 슬롯 0개, 직접 `adsbygoogle.push` 0개.
- 미디어: Sister Squad 2 본편 YouTube-nocookie iframe 1개. 제목, 저주받은 요정마을의 줄거리, 본편 공개 안내, 작품 상세 페이지 링크가 영상 주변에 있음. 영상만 단독으로 제공하는 화면은 아님.
- 독립 본문: 창작 아카이브의 목적, 두 딸과 함께 시작한 이야기, 음악·워십·출판·AI 제작 과정에 대한 설명이 정적 HTML에 있음. 홈은 개별 작품 상세 페이지가 아니라 프로젝트 탐색 허브 역할.
- 동적 콘텐츠: Chris's Pick 스크립트는 다양한 책/음악/영상 작품을 큐레이션하는 데이터 배열을 보유하고, Chris's Note는 Journal 1~6의 제목·요약·목적지 6개를 각각 제공함. 두 섹션의 컨테이너가 HTML에 있고 관련 스크립트가 페이지 하단에서 로드됨. 홈 언어 스크립트는 문서 언어에 맞춰 Faith Journey 및 Sister Squad 2 관련 텍스트를 갱신함.
- 중복 검토: Chris's Note 요약은 Journal 상세 글의 탐색용 요약이며 상세 글의 본문을 그대로 복제하는 구조는 아님. Chris's Pick도 작품 링크를 제공하는 큐레이션 역할로 판단. 홈에 Faith Journey의 성경 읽기/묵상/기도 기능 안내가 있지만 성경 본문·찬송 악보를 제공하는 화면이 아니라 기능 페이지로 이동시키는 안내 영역임.
- 광고/GTM: 제공된 GTM v2 export(2026-10-30, version 2)는 GA4 Google tag 1개만 포함하고 AdSense 태그는 없음. 현재 게시 버전과의 동일성 및 실제 Auto ads 배치는 미검증.
- 판정: 자체 창작 아카이브 소개와 프로젝트별 고유 탐색 정보가 존재하며, 메인 영상 임베드 주변에도 독립적인 작품 소개가 있음. 정적 소스에서 즉시 수정이 필요한 복제 콘텐츠/가치 부족 문제를 확인하지 못함.
- 조치: 코드 변경 없음. 기존 홈 영상과 동적 큐레이션 유지.
- 검증 한계: develop 정적 소스 및 JS 구조 확인. 실제 브라우저에서 동적 섹션 표시, 언어 전환, 모바일/PC 레이아웃, 영상 재생, 현재 광고 노출 위치는 미검증. main/production 미변경.
- 다음 단일 작업: sitemap의 24개 URL을 현재 develop 파일과 대조해 색인 대상/광고 대상/광고 제외 대상, canonical, robots, 직접 AdSense loader 수를 한 표로 재검증하고 누락된 광고 대상 페이지가 없는지 확인한다.


## 최근 단일 작업 결과 — 사이트맵 전체 24개 URL canonical / robots / 광고 코드 교차 점검

- 기준: GitHub develop의 `sitemap.xml`과 24개 실제 HTML 파일. sitemap 총 24 URL.
- URL별 파일 존재: 24/24 확인.
- canonical: 24/24가 각 페이지의 `https://chrisleepapa.com/{path}` 또는 홈 정식 URL을 가리킴.
- robots: sitemap에 포함된 24개 URL은 모두 `index, follow`.
- GTM: 24/24 HTML에 GTM 컨테이너 스크립트와 noscript 참조가 각각 1개씩 존재(문자열 기준 GTM ID 2회).
- 직접 AdSense loader: 총 18개 페이지에서 각 1개 확인.
- 직접 AdSense loader 0개: `/music`, `/movie`, `/bible`, `/contact`, `/privacy`, `/terms` 총 6개.
- 수동 광고 슬롯 `<ins class="adsbygoogle">`: 24개 페이지 전체 0개.
- 직접 `adsbygoogle.push`: 24개 페이지 전체 0개.
- 이전 점검 기록에는 20개 로더/4개 제외로 기재되어 있었으나, 현재 develop 소스는 18개 로더/6개 제외로 확인됨. 새로 직접 로더가 없는 Music/Movie 두 페이지가 추가 광고 제외 상태로 확인됨. 이는 정적 HTML의 직접 로더 기준이며 실제 Auto ads 및 현재 게시 GTM 버전의 광고 동작을 의미하지 않음.
- GTM 보충 근거: 사용자가 제공한 2026-10-30 GTM export version 2는 GA4 Google tag 1개만 포함하고 AdSense 태그는 없음. 현재 GTM 실시간 게시 버전과 동일성은 미확인.
- 판정: sitemap 내 URL 누락, canonical 불일치, robots 차단, 중복 수동 광고 슬롯은 이번 정적 점검에서 발견되지 않음. 광고 제외 대상 6개 URL은 직접 AdSense 로더가 없는 상태로 확인됨.
- 검증 한계: GitHub develop 정적 파일 및 제공된 GTM export만 확인. 실제 Google 크롤링/색인, 실시간 GTM 게시 버전, 브라우저 광고 노출 위치와 Auto ads 동작은 미검증. main/production 미변경.
- 다음 단일 작업: Sister Squad 1·2·허브·캐릭터 페이지의 남은 후속 항목(영상/이미지/구매 링크 목적지, 페이지별 고유 역할과 내부 링크)을 하나씩 재검증한다.


## 최근 단일 작업 결과 — Sister Squad 1 내부 링크 및 미디어 참조

- 대상: `sistersquad.html`; develop blob SHA `9004c878f986d96cba5f0886ab8ce19dbf418a9b`.
- 기본 설정: canonical `https://chrisleepapa.com/sistersquad`, `index, follow`, 직접 AdSense loader 1개.
- 미디어: YouTube trailer iframe 1개(`C0lluI-l0gc`), OST YouTube playlist 링크 1개, Spotify 앨범 링크 1개. 외부 플레이어/음원은 작품 소개를 보조하는 구조.
- 내부 연결: 허브 `sistersquad-hub.html`, 공식 Shop `/shop.html`, Journal 1·2·4 링크를 확인. GitHub develop tree에서 각 내부 HTML 파일이 실제 존재함을 확인.
- 이미지: `/images/sistersquad1_banner.png`가 develop tree에 존재함을 확인.
- 고유 가치: 첫 모험의 이야기·캐릭터 설명과 창작 배경이 있으며, 새로 추가한 Journal 링크는 이야기의 시작, 원고 수정, 캐릭터/삽화 제작 과정을 더 깊이 읽을 수 있게 연결함.
- 판정: 정적 소스에서 깨진 내부 링크나 누락된 배너 파일은 발견되지 않음. 독립 작품 소개와 제작 과정 링크가 존재하여 외부 미디어만 나열한 화면은 아님.
- 조치: 코드 변경 없음.
- 검증 한계: YouTube/Spotify/Amazon 외부 목적지의 실시간 가용성 및 실제 브라우저 클릭·재생은 확인하지 못함. 광고 노출 위치도 미검증. main/production 미변경.
- 다음 단일 작업: `sistersquad2.html`의 본편/예고편/NG 영상 연결, 작품 설명과 제작 노트, 내부 링크/이미지 참조를 같은 기준으로 확인한다.


## 최근 단일 작업 결과 — Sister Squad 2 영상/이미지/내부 링크

- 대상: `sistersquad2.html`; develop blob SHA `529d9358a7945dd77a7afbce33049bdf2796c6ed`.
- 기본 설정: canonical `https://chrisleepapa.com/sistersquad2`, `index, follow`, 직접 AdSense loader 1개.
- 영상: 예고편 3개, NG/비하인드 1개, 본편 1개로 YouTube-nocookie iframe 총 5개. 모두 개별 title이 있고 `loading="lazy"`가 설정됨. 본편 iframe ID `sKkPYaMM75A`와 별도 YouTube 링크의 영상 ID가 일치함.
- 이미지: `/images/sistersquad2_banner.png`, `images/yul00.jpg`, `images/jung00.jpg` 3개가 develop tree에 존재하고 alt가 설정됨.
- 내부 링크: `/gameinfo`, `/shop.html` 대상 파일이 develop tree에 존재함.
- 독립 콘텐츠: 두 번째 모험의 서사, 등장인물, 가족, 동료/요정, OST, 제작 노트, 아빠 캐릭터를 이야기 속에 포함시킨 이유, 세 가지 주제 해설이 있음. 본문 텍스트 추출 약 3,044자.
- 상태 문구: “곧 공개”, “공개 예정”, “COMING SOON”, “준비 중” 등 본편 공개 상태와 충돌하는 문구를 발견하지 못함.
- 판정: 페이지는 다수의 영상을 포함하지만 작품 고유 서사와 창작자 해설이 함께 있으며, 영상 iframe은 지연 로딩됨. 정적 소스에서 즉시 수정이 필요한 복제 콘텐츠/가치 부족 또는 깨진 내부 파일 참조를 확인하지 못함.
- 조치: 코드 변경 없음.
- 검증 한계: YouTube 영상의 실제 공개/재생 가능 여부, 외부 링크 실시간 상태, 실제 브라우저/모바일 표시 및 광고 위치는 미검증. main/production 미변경.
- 다음 단일 작업: `sistersquad-hub.html`의 허브 고유 목적, 개별 작품/캐릭터 페이지로의 링크, 중복 설명 및 이미지 참조를 확인한다.


## 최근 단일 작업 결과 — Sister Squad Hub 앵커 링크 수정

- 대상: `sistersquad-hub.html`; 수정 전 blob SHA `cab246530aa0797d452d11dd942144936dce8f3a`, 수정 후 blob SHA `f156fc1d7c039e3a22fac217443edde7021e02b0`.
- 기본 설정: canonical `https://chrisleepapa.com/sistersquad-hub`, `index, follow`, 직접 AdSense loader 1개.
- 콘텐츠: 세계관, 율·정 주인공 소개, 가족/요정/조력자/적 캐릭터, 마법과 유물, 1·2편 시리즈 안내, 스토리 가이드, 비주얼 갤러리 및 공식 스티커 링크. 본문 텍스트 추출 약 6,476자.
- 이미지: 갤러리의 이미지 45개가 모두 develop tree에 존재하고 alt가 설정됨.
- 내부 링크: `/yul`, `/jung`, `/sistersquad`, `/sistersquad2` 대상 파일 모두 존재함.
- 발견한 문제: 상단 탐색 카드의 `#characters` 및 `#deep-dive` 링크가 실제 ID와 일치하지 않아 클릭 시 목적지로 이동하지 않는 앵커 오류 2건.
- 수정: `#characters`를 `#other-characters`로, `#deep-dive`를 `#protagonists`로 변경. 첫 링크의 한국어/영어 안내도 가족·요정·조연 캐릭터 영역에 맞게 수정하고, 두 번째 링크는 율·정 주인공 프로필 영역으로 연결.
- 재검증: 페이지 내 모든 탐색 앵커 5개(`other-characters`, `world`, `series`, `gallery`, `protagonists`)가 실제 ID와 일치. 이전 잘못된 앵커 2개는 0개. 한국어/영어 문구 변경 확인.
- 판정: 페이지의 허브 역할과 고유한 세계관 정보는 유지하면서 탐색 오류를 제거함. 복제/저가치 콘텐츠를 이유로 본문을 늘릴 필요는 없음.
- 검증 한계: develop 소스와 저장소 내 이미지/내부 파일 존재만 확인. 실제 브라우저 클릭·이미지 로딩 및 모바일/PC 레이아웃은 미검증. main/production 미변경.
- 다음 단일 작업: `yul.html`의 캐릭터 고유 설명, 이미지 참조, 내부 링크 및 반복 콘텐츠를 점검한다.


## 최근 단일 작업 결과 — Yul 캐릭터 프로필

- 대상: `yul.html`; develop blob SHA `b8a38fc072845d59b56f4a40967e078de3c314f2`.
- 기본 설정: canonical `https://chrisleepapa.com/yul`, `index, follow`, 직접 AdSense loader 1개.
- 독립 콘텐츠: 캐릭터 기본 소개, 성장 서사, 염력의 단계별 설명, 정이와의 관계, 실제 첫째 딸의 성격에서 출발한 캐릭터 탄생 배경, 1·2편에서의 성장 관점이 포함됨. 정적 본문 텍스트 추출 약 2,988자.
- 이미지: Yul 캐릭터 이미지 13개가 develop `images/` 디렉터리에 존재하고, 각 이미지에 장면/캐릭터를 설명하는 alt가 설정됨.
- 내부 링크: `sistersquad.html` 복귀 링크 대상 파일 존재. 페이지 내 해시 앵커 링크는 없음.
- 외부 이미지: hero 영역에 Unsplash 이미지 URL 1개가 사용됨. 저장소 내부 에셋은 아니며 실제 표시 이미지/alt의 정확성은 브라우저에서 확인하지 못함. AdSense 콘텐츠 가치 문제로 단정할 근거는 없으므로 이번에는 수정하지 않음.
- 중복/가치: 허브와 캐릭터 공통 주제는 공유하지만, 율이의 사고 방식·염력·자매 관계·실제 캐릭터 기원과 성장에 초점을 둔 별도 프로필임. 동일한 긴 본문 문단의 복제는 이전 5개 페이지 비교에서도 발견되지 않음.
- 판정: 고유한 캐릭터 해설과 창작 배경이 충분히 존재하며 단순 이미지 갤러리가 아님. 정적 소스에서 즉시 수정할 AdSense 복제/저가치 문제는 확인되지 않음.
- 조치: 코드 변경 없음.
- 검증 한계: develop 정적 소스 및 저장소 이미지 존재 확인. Unsplash 이미지의 실제 표시, 외부 URL 가용성, 브라우저/모바일 표시 및 광고 위치는 미검증. main/production 미변경.
- 다음 단일 작업: `jung.html`의 캐릭터 고유 설명, 이미지 참조, 내부 링크 및 반복 콘텐츠를 점검한다.


## 최근 단일 작업 결과 — Jung 캐릭터 프로필

- 대상: `jung.html`; develop blob SHA `88654de42d13a743e9f120db262f43f96bda0f0c`.
- 기본 설정: canonical `https://chrisleepapa.com/jung`, `index, follow`, 직접 AdSense loader 1개.
- 독립 콘텐츠: 캐릭터 기본 소개, 테이밍/교감 능력, 율이와의 관계, 실제 둘째 딸의 성격과 경험에서 출발한 캐릭터 탄생 배경, 1·2편의 성장 서사가 포함됨. 정적 본문 텍스트 추출 약 2,927자.
- 이미지: Jung 캐릭터 이미지 13개가 develop `images/` 디렉터리에 존재하고, 각 이미지에 장면/캐릭터를 설명하는 alt가 설정됨.
- 내부 링크: `sistersquad.html` 복귀 링크 대상 파일 존재. 페이지 내 해시 앵커 링크는 없음.
- 외부 이미지: hero 영역에 Unsplash 이미지 URL 1개가 사용됨. 저장소 내부 에셋이 아니며 실제 표시 이미지/alt의 정확성은 브라우저에서 확인하지 못함. AdSense 콘텐츠 가치 문제로 단정할 근거가 없어 이번에는 수정하지 않음.
- 중복/가치: Yul 페이지와 레이아웃은 유사하지만, Jung의 공감·생명 교감·두려움과 용기·실제 캐릭터 기원에 초점을 둔 별도 설명임. 두 페이지의 핵심 서사와 능력 설명은 서로 구분됨.
- 판정: 독립적인 캐릭터 해설과 창작 배경이 있어 단순 이미지 갤러리가 아님. 정적 소스에서 즉시 수정할 AdSense 복제/저가치 문제는 확인되지 않음.
- 조치: 코드 변경 없음.
- 검증 한계: develop 정적 소스 및 저장소 이미지 존재 확인. Unsplash 이미지의 실제 표시, 외부 URL 가용성, 브라우저/모바일 표시 및 광고 위치는 미검증. main/production 미변경.
- 다음 단일 작업: P0/P1 페이지별 점검 기록과 현재 develop 파일 상태를 최종 대조하고, 남은 미완료 항목을 우선순위로 정리한다.


## 최근 단일 작업 결과 — 사이트맵 밖의 루트 HTML 13개

- develop Git tree의 루트 HTML 37개와 sitemap 24개를 대조. sitemap 밖 HTML은 13개: `booktop`, `curling`, `fiveinrow`, `game`, `gameinfo`, `goal`, `guestbook`, `naver8c846221d6596a175ea38d4f8e3ec89a`, `shop`, `switch`, `tetris`, `today`, `journal`.
- AdSense 코드: 이 13개 파일 모두 직접 AdSense loader 0개, 수동 광고 슬롯 0개, 직접 `adsbygoogle.push` 0개.
- 색인 설정:
  - `shop`: `index, follow`, canonical 존재. sitemap에는 없지만 내부 링크로 발견될 수 있는 indexable 페이지. 본문은 공식 판매처/상품 디렉터리 성격이며, 별도 상세 작품 설명보다 구매 링크 비중이 높음. 광고 코드는 없으므로 즉시 광고 노출 문제는 없으나, 사이트 전체 콘텐츠 가치 관점에서 얇은 페이지 후보로 기록. noindex 전환은 검색 유입/판매 목적에 영향을 주므로 이번에는 임의 변경하지 않음.
  - `journal`: `noindex, follow`, 광고 코드 없음. 상세 글 6개는 sitemap에 포함됨.
  - `today`, `guestbook`: `noindex, follow`, 광고 코드 없음.
  - `booktop`, `gameinfo`, `game`, `tetris`, `curling`, `fiveinrow`, `goal`, `switch`: `noindex, nofollow`, 광고 코드 없음.
  - Naver 소유권 확인 HTML: title/canonical/robots/GTM/AdSense 코드가 없는 짧은 검증 파일.
- 게임/기능 페이지는 사용자의 기존 운영 원칙대로 광고 대상에서 제외되어 있고, 확인한 게임 HTML은 모두 noindex/no-follow 및 광고 코드 0개.
- 판정: 사이트맵 밖에서 예상하지 못한 광고 로더를 가진 페이지는 발견되지 않음. 주의 대상으로 남는 것은 광고가 없는 indexable `/shop` 한 페이지이며, 콘텐츠 확장 또는 noindex 여부는 판매/검색 목적을 고려해 별도 판단할 사항.
- 검증 한계: GitHub develop 정적 소스 기준. Google이 실제로 발견/색인한 URL 목록은 Search Console에서 확인해야 함. main/production 미변경.
- 다음 단일 작업: 전체 점검 결과를 다시 읽고 미완료/실서비스 검증 항목과 콘텐츠 개선 후보를 분리해 최종 체크리스트를 정리한다.
