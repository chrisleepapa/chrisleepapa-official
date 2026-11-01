# Chris LEE.PAPA AdSense 점검 — 이어하기 메모

- 기준일: 2026-11-01
- 저장소: chrisleepapa/chrisleepapa-official
- 작업 브랜치: develop only
- 운영 도메인: https://chrisleepapa.com
- 개발 도메인: https://develop.chrisleepapa.com
- 상세 조사 기록: docs/ADSENSE_AUDIT_HANDOFF_2026-10-30.md

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

## 다음 단일 작업
**Sister Squad 1 페이지의 콘텐츠 가치와 기존 Journal 내부 링크 연결을 소스 기준으로 확인한다.**

대상:
- `sistersquad.html`
- 관련 Journal 상세 페이지의 링크 대상/실제 경로

확인할 것:
- 작품 줄거리, 캐릭터, 독자 대상, 핵심 갈등/주제 등 자체 콘텐츠가 독립적으로 이해되는지
- 기존 Journal 1·2·4로 연결되는 제작 과정 링크가 실제 존재하는지, 링크가 정확한 경로를 가리키는지
- 외부 도서/OST/영상 링크가 본문보다 먼저 과도하게 강조되는지
- 이미 있는 설명을 반복하지 않고 보완이 꼭 필요한 부분만 식별

우선 소스만 확인한다. 수정이 필요해도 사용자 확인 전에는 수정하지 말고, 실제 브라우저 확인이 불가능하면 그 한계를 명시한다.

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

### 다음 점검
최신 develop 변경분의 Vercel Preview 배포 상태를 확인하고, 접근 가능한 브라우저 환경에서 두 페이지의 라이트/다크 및 모바일/PC 레이아웃과 광고 배치를 검증한다. 실제 영상 장면을 확인하지 못한 설명은 계속 미검증으로 유지한다.
