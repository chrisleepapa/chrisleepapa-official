# Chris LEE.PAPA — AdSense Audit Handoff (2026-11-04)

> 이 문서는 새 ChatGPT 대화방 또는 다른 AI/개발자에게 그대로 전달해도 프로젝트의 목표, 현재 상태, 금지사항, 다음 작업을 오해 없이 이어갈 수 있도록 작성한 실행 인수인계 문서다.
> 기준 저장소는 GitHub의 실제 브랜치 상태이며, 아래의 커밋·배포 상태를 기준으로 삼는다. 이후 작업자는 반드시 최신 브랜치와 배포를 다시 확인한 뒤 작업한다.

## 1. 최우선 목표

- 공식 사이트 `https://chrisleepapa.com`의 Google AdSense 재심사 통과 가능성을 높이는 것이 최우선 목표다.
- Google에서 실제 통보한 거절 사유는 두 가지다.
  1. **가치가 별로 없는 콘텐츠**
  2. **Google served ads on screens with replicated content**
- 승인 여부는 Google만 결정한다. 어떤 AI도 승인 또는 통과를 보장한다고 말하면 안 된다.
- 작업은 위 두 거절 사유와 직접 연결되는 위험을 우선 확인한다. 단순히 페이지 분량을 늘리거나, 정상인 콘텐츠를 이유 없이 재작성하지 않는다.
- 사용자는 기술적인 선택을 원하지 않는다. AI가 합리적인 순서로 조사·검증·수정하고, 사용자에게는 쉬운 한국어로 진행 결과와 미확인 사항을 보고한다.

## 2. 저장소·배포 구조

- GitHub: `chrisleepapa/chrisleepapa-official`
- Vercel 프로젝트: `chrisleepapa-official`
- Vercel 팀: `chrisleepapas-projects`
- Production: `main` → `https://chrisleepapa.com`
- Develop: `develop` → `https://develop.chrisleepapa.com`

### 필수 작업 규칙

1. **모든 조사·수정은 기본적으로 develop에서 수행한다.**
2. 사용자가 develop을 확인하고 명시적으로 요청하기 전에는 main에 merge, cherry-pick, 덮어쓰기, 강제 push 또는 Production 배포를 하지 않는다.
3. main과 develop은 서로 갈라져 있다. 단순히 develop을 main에 덮어쓰면 안 된다.
4. 2026-11-04 최신 비교 결과:
   - main HEAD: `62125bf478454abac32b3f071d0f5d7bae2b492f`
   - develop HEAD: `c43aa7aef8c5524deebcc21af4e00dcda97a629c`
   - 상태: `diverged`
   - develop은 main보다 19 commits 앞서 있고, main은 develop보다 9 commits 앞서 있음.
   - 공통 조상: `2bc23ccc87e5d4f5cd3e23bcf44e0c457d80a4bb`
5. main/Production은 이번 작업 동안 수정하지 않았다.
6. 매 작업 전 최신 브랜치 HEAD, 파일 SHA, 최근 Vercel 배포를 다시 확인한다. 다른 작업자가 이후 변경했을 수 있다.

## 3. 광고 제외 정책 — 사용자 확정 사항

다음 8개 경로는 사용자가 광고 대상이 아니라고 명확히 지정했다. AdSense 콘텐츠 점검 대상 16개와 혼동하지 말고, 광고 로더·publisher ID 제외 상태를 유지한다.

- `/music`
- `/movie`
- `/bible`
- `/worship`
- `/worship_eng`
- `/contact`
- `/privacy`
- `/terms`

성경/찬송/워십 페이지를 광고 심사용 콘텐츠 개선 대상으로 임의 편입하지 않는다. 이 페이지들의 광고 제외 설정을 변경하지 않는다.

## 4. 광고·분석 설치 관련 확인된 값

- AdSense publisher ID: `pub-3207219520058740`
- ads.txt 게시자 행: `google.com, pub-3207219520058740, DIRECT, f08c47fec0942fa0`
- GTM container: `GTM-NGDTQNVG`
- GA4 measurement ID: `G-NBGELYQ4TZ`
- Google tag ID: `GT-5MJDBTR2`

### Production 정적 HTML 전수 검사 결과 (2026-11-04 기준)

Sitemap 24개 URL의 HTML 소스를 각각 검사했다.

- canonical: 24/24 존재, 공식 `.com` URL
- robots meta: 24/24 `index, follow`
- 광고 대상 16개: 각 페이지 AdSense loader 1개 및 publisher ID 1개
- 사용자 광고 제외 8개: AdSense loader 0개 및 publisher ID 0개
- GTM loader: 24/24 각 1개
- GTM noscript: 24/24 각 1개
- 직접 HTML GA4 gtag loader: 0/24
- inline `gtag('config')`: 0/24
- GA4/Google tag ID의 직접 HTML 중복 삽입: 0/24
- 24개 HTML 안에서 구 Vercel 도메인 참조: 0건
- `ads.txt`, `robots.txt`, `sitemap.xml`의 저장소 소스 내용은 점검됨.
- GTM 컨테이너의 **현재 Published 버전**에서 어떤 태그가 실제 실행되는지는 아직 검증되지 않았다. 과거 export 파일에서 GA4 태그 하나가 All Pages 트리거로 확인됐다는 사실은 있으나, 현재 게시 버전이라고 단정하지 않는다.
- 사용자는 AdSense 사이트 승인을 받은 적이 없다. 따라서 Auto Ads 콘솔에서 광고 제외를 설정할 수 있는 것처럼 안내하지 않는다.

## 5. 콘텐츠 점검 결과 — Audit 1.97까지

Sitemap 24개 중 광고 제외 8개를 뺀 광고 대상 16개:
- `/`
- `/sistersquad-hub`
- `/sistersquad`
- `/sistersquad2`
- `/yul`
- `/jung`
- `/miracleshot`
- `/tutupupupipi`
- `/wallpaper`
- `/about`
- `/journal-1` ~ `/journal-6`

각 페이지의 고유한 창작 배경, 인물·스토리, 제작 과정, 사용 안내, 독자 효용 등을 정적 소스에서 심층 검토했다. 현재까지 두 거절 사유에 해당하는 명확한 고위험 결함을 찾지 못했다. 따라서 기존의 좋은 내용을 불필요하게 늘리거나 다시 쓰지 않았다.

주요 세부 확인:
- SISTER SQUAD Hub는 세계관·인물·장소·마법 규칙·두 권의 이야기와 개별 페이지를 안내하는 고유 길잡이로 확인됨.
- YUL/JUNG은 같은 자매 이야기의 일부지만 능력·성격·실제 창작 일화와 성장 방향이 구분됨.
- MIRACLE SHOT은 풋살 공동체 이야기, 네 아이의 성장, 성경 인물 연결, 창작 이유, OST 및 게임 요소를 담음.
- TuTuPuPuPiPi는 자체 캐릭터·영상·OST를 설명하는 오리지널 키즈 프로젝트.
- Wallpaper는 모바일 영상 4개, PC 이미지 9개, 장면 설명, 파일 형식, 개인 이용 라이선스와 사용 안내를 제공.
- About은 운영자·가족 창작 배경·AI 활용 및 선택/수정 철학·연혁을 설명.
- Journal 1~6은 시작 배경, Skywork 사용, POD 출판, 캐릭터 디자인, 시간 관리, 워십 창작 과정 등 서로 다른 개인 경험을 다룸. Journal 2의 가격표는 2026.08 작성 당시 정보와 변동 가능 안내가 있어 즉시 오류로 보지 않고 최신성 관리 후보로 남김.
- 이 평가는 Google의 실제 심사 결과가 아니며, 외부 원문과의 문장 단위 비교 및 실제 Googlebot 렌더링을 완료했다는 뜻도 아니다.

## 6. 기술 점검 결과

### Sitemap 외 HTML 13개
main/develop 각각 sitemap에 없는 HTML 13개를 확인했다.
- 직접 AdSense loader 0/13
- publisher ID 0/13
- GTM loader 12/13 (Naver 소유권 확인 파일 제외)
- 게임 등 7개 noindex,nofollow
- guestbook/journal/today noindex,follow
- shop.html은 index,follow지만 sitemap에는 미포함, 직접 AdSense 코드 없음. 사용자 의도 확인 전 변경하지 않는다.
- GTM Published 상태는 미확인.

### 로컬 미디어
- 광고 대상 16개 페이지의 정적 HTML에서 로컬 미디어 참조 125건 확인.
- **125/125 파일 존재, 누락 0건.**
- CSS background-image, JS 동적 URL, 외부 미디어 응답, 브라우저의 실제 디코딩/재생은 검사에 포함되지 않음.

### 내부 링크 및 정적 파일 경로
- 광고 대상 16개 페이지의 href/src/poster 로컬 경로를 develop 파일 트리와 대조.
- **누락 0건.**
- 외부 URL 응답, JS에서 동적으로 생성되는 링크, CSS 배경 이미지, 실제 브라우저 동작은 별도 미검증.

### 삭제 페이지 잔여 참조
- 공통 헤더/푸터, 홈페이지, 공통 내비게이션 JS, Chris's Pick, SISTER SQUAD Hub, 주요 콘텐츠 페이지 등 핵심 파일 20개 검사.
- `js/main.js`에 삭제된 Prompt Lab / World Lore를 페이지 활성 상태로 처리하는 잔여 코드가 있어 제거함.
- 수정 후 `js/main.js`에서 `prompt-lab` 및 `world-lore` 문자열이 모두 제거된 것을 확인.
- Chris's News, YouTube Chart, Daily Today Word 등의 사용자 노출 링크/문구는 검사한 핵심 파일 20개에서 발견되지 않음.
- 저장소 파일명 `css/world-lore-responsive.css`는 남아 있어 별도 참조 확인 후보. 사용처를 확인하기 전에 파일을 임의 삭제하지 않는다.
- 저장소 전체 666개 파일의 모든 텍스트를 전수 검색한 것은 아니다. 핵심 파일 20개 정적 검사로 한정한다.

### HTTP/실제 브라우저 검증 제한
- 현재 사용한 도구에서는 `chrisleepapa.com`, `develop.chrisleepapa.com`, `/ads.txt`, `/robots.txt`, `/sitemap.xml`의 실제 HTTP 응답을 안정적으로 확인하지 못했다. web open은 내부 오류, container DNS 요청도 실패했다.
- 이것은 사이트 장애를 의미하지 않는다. 단지 이 세션에서 실제 HTTP status/headers/redirect/브라우저 렌더링을 확인하지 못했다는 뜻이다.
- `vercel.json` 소스에는 구 Vercel host에서 공식 .com으로 보내는 permanent redirect 조건이 있으나, live HTTP redirect는 미검증이다.

## 7. 이번 세션의 변경·커밋·배포

### 소스 수정
- 파일: `js/main.js`
- 목적: 삭제된 Prompt Lab / World Lore 메뉴 활성화 판별 잔여 코드 제거
- 커밋:
  - `91b8d6c9d1d5cb85b73cfaebd65e96e6adf9e10d` — 초기 잔여 참조 정리
  - `9883209ee8a56b7925be4e0efa5d4023de4d5fae` — 남은 Prompt Lab page-state 참조 제거
- 최종 수정 후 `prompt-lab` 및 `world-lore` 문자열 모두 0건임을 확인했다.
- 이 변경은 내비게이션 상태 판별 코드만 수정했으며 메뉴 디자인이나 콘텐츠는 바꾸지 않았다.

### 통합 점검문서
- 파일: `docs/Chris_LEE_PAPA_AdSense_Audit_2026-10-16.md`
- Audit 1.98: 삭제 페이지 잔여 참조 정리
- Audit 1.99: 광고 대상 16개 페이지 내부 링크·정적 파일 경로 검사
- Audit 1.99 기록 커밋: `c43aa7aef8c5524deebcc21af4e00dcda97a629c`
- 최신 Vercel develop 배포:
  - ID: `dpl_5W3ufCAieNWvycRFsuUg2Qnc4Fqr`
  - 상태: **READY**
  - alias: `develop.chrisleepapa.com`
  - commit: `c43aa7aef8c5524deebcc21af4e00dcda97a629c`
- Production/main 변경 없음.

## 8. 반드시 다음으로 진행할 일

아래 순서로 진행한다. 사용자에게 선택을 요구하지 말고, 가능한 것은 직접 수행한다.

### A. 이 인수인계 문서와 통합 점검문서 일치 여부
- 두 문서의 최신 Audit 번호, commit SHA, 배포 상태, 제외 경로가 일치하는지 확인.
- 이후 작업 때마다 통합 점검문서에 근거·범위·결과·한계·수정 커밋을 기록하고, 이 인수인계 문서의 현재 상태/다음 단계도 갱신한다.

### B. GTM 실제 게시 태그 확인
- 컨테이너 `GTM-NGDTQNVG`의 현재 Published 버전에서 태그 목록과 트리거를 확인한다.
- GA4 `G-NBGELYQ4TZ`가 중복 발화하는지, AdSense 관련 태그가 있는지, 모든 페이지에서 광고 제외 8개 경로에도 광고 태그가 발화하는지 확인한다.
- Google Tag Manager 계정 연결/권한이 없다면 과거 export를 현재 Published 버전으로 오인하지 않는다. 연결된 도구/권한 여부를 확인하고, 불가능하면 필요한 최소한의 계정 확인만 사용자에게 쉽게 안내한다.
- AdSense 승인을 받은 것처럼 Auto Ads 설정을 제안하지 않는다.

### C. 실제 페이지 브라우저 검사
- develop에서 광고 대상 16개 페이지를 PC/모바일 뷰로 확인한다.
- JS 렌더링 실패, 빈 섹션, 깨진 이미지/영상, 언어 전환, 메뉴/내부 링크, 첫 화면 광고와 콘텐츠 비율, 반복·복제 화면 여부를 확인한다.
- 광고 제외 8개는 광고 로더가 빠진 상태를 보존한다.
- 사용자가 직접 확인해야 하는 화면만 마지막에 최소한으로 요청한다.

### D. 외부 링크 및 동적 리소스
- 광고 대상 페이지의 외부 YouTube/Spotify/출판사/크리에이터 링크가 현재 목적지에 맞는지 확인한다.
- 외부 링크가 응답하지 않거나 옛 페이지로 가면 실제 문제인 경우에만 수정한다.
- JS/CSS가 동적으로 생성하는 리소스와 CSS background-image 경로를 확인한다.

### E. Google Search Console 및 AdSense 상태
- 사용자에게서 전달받은 GSC의 5개 URL 오류 화면/URL이 있으면 정확한 URL을 기준으로 확인한다. URL을 추측하지 않는다.
- 실제 GSC/AdSense 계정 접근이 불가능하면 그 한계를 명확히 기록한다.
- 색인 상태와 AdSense 사이트 심사 상태를 혼동하지 않는다.

### F. 실제 결함만 수정
- 모든 변경은 develop에서 최소 범위로 수정한다.
- 수정 후 정적 검사와 배포 READY 상태를 확인한다.
- 문서만 수정한 배포와 사이트 소스가 바뀐 배포를 구분해 보고한다.
- 사용자가 확인하기 전에 main으로 반영하지 않는다.

## 9. 새 AI/대화방 시작 지침 — 그대로 따라야 할 핵심

이 프로젝트를 이어받는 AI는 다음을 지킨다.

1. 먼저 이 파일 `docs/AI_HANDOFF_ADSENSE_AUDIT_2026-11-04.md`와 통합 문서 `docs/Chris_LEE_PAPA_AdSense_Audit_2026-10-16.md`를 develop에서 읽는다.
2. 이 문서가 오래되었을 수 있으므로 GitHub의 현재 main/develop HEAD와 Vercel 최신 배포 상태를 다시 조회한다.
3. 사용자가 이미 정한 광고 제외 8개 경로를 재질문하거나 임의로 변경하지 않는다.
4. 두 거절 사유(가치가 별로 없는 콘텐츠 / replicated content)를 모든 우선순위 판단의 기준으로 삼는다.
5. 이미 양호하다고 확인한 페이지를 근거 없이 다시 쓰지 않는다. 중복 콘텐츠가 실제로 입증된 경우에만 수정한다.
6. 삭제된 Prompt Lab / Chris's News는 현재 기능처럼 부활시키지 않는다. 잔여 CSS 파일은 사용처 확인 전 삭제하지 않는다.
7. Bible/hymn/worship 관련 광고 제외 범위를 광고 콘텐츠 감사로 확대하지 않는다.
8. main/Production을 건드리지 않는다. 사용자가 명시적으로 요청하기 전에는 develop을 main에 덮어쓰지 않는다.
9. 실제 확인하지 않은 HTTP 응답, GTM 게시 태그, 브라우저 렌더링, Google 심사 결과를 확인했다고 주장하지 않는다.
10. 각 작업 결과를 통합 점검문서와 이 인수인계 문서에 기록한다. 날짜, 검사 대상, 검사 방법, 정량 결과, 수정 여부, commit SHA, deployment ID/state, 한계를 남긴다.
11. 사용자에게는 한국어로 쉬운 말로 "무엇을 확인했는지 / 무엇을 발견했는지 / 무엇을 수정했는지 / 무엇이 아직 미확인인지"를 짧게 보고한다. 기술 선택지를 사용자에게 떠넘기지 않는다.
12. 현재 작업 상태는 **Audit 1.99까지 기록, develop 최신 배포 READY, main 미변경, 다음 핵심 작업은 GTM Published 태그 확인과 실제 브라우저 검증**이다.

## 10. 현재 상태 한 줄 요약

**AdSense 심사 거절 사유 2가지를 기준으로 광고 대상 콘텐츠 16개를 정적 검토했고, 로컬 미디어 125/125 및 내부 링크 경로 누락 0건을 확인했으며, 삭제된 Prompt Lab/World Lore의 내비게이션 잔여 코드를 develop에서 제거했다. 통합 점검문서 Audit 1.99까지 기록했고 최신 develop 배포는 READY다. main/Production은 건드리지 않았다. 다음은 GTM Published 태그와 실제 PC/모바일 렌더링 검증이다.**
