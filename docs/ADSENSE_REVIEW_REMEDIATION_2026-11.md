# AdSense 보완 검증 기록 — 2026-11-16

## 작업 원칙
- main을 기준으로 develop을 강제 동기화한 뒤 develop에서만 수정·검증한다.
- main 반영은 수정 사항의 검증이 끝난 다음에만 진행한다.
- 코드 확인과 실제 운영 URL 확인을 구분하고 AdSense 승인 가능성을 단정하지 않는다.
- 본 사이트 범위는 도서·음악·영상·SISTER SQUAD·제작기이며 Faith 성경·찬송가 서비스는 제외한다.

## 1. 브랜치 기준선
- 동기화 전 main: 7577748eb43a89e87418acea106124551d0d33a6
- 동기화 전 develop: 21a0b121a02a53f53d3cef53ac6a40106a808986
- develop을 main 커밋 7577748로 force-with-lease 동기화 성공.
- 과거 develop 전용 기록은 Git 커밋 히스토리에 보존되지만 최신 트리에서는 제외되어 본 문서를 새로 작성함.

## 2. 코드 전수 검사 (개발 브랜치)
- 저장소 트리 전체 조회 truncated=false; HTML 파일 27개 확인 (공통 헤더·푸터 및 검색 소유권 인증 파일 포함).
- 주요 창작 콘텐츠/정책 HTML 24개: canonical 태그 존재 확인. 목록: index, about, contact, privacy, terms, wallpaper, miracleshot, sistersquad-hub, sistersquad, sistersquad2, yul, jung, journal, journal-1~7, shop, movie, music, guestbook.
- guestbook: noindex, follow 설정 확인. sitemap에서 제외되어 있음.
- 주요 콘텐츠 24개 파일의 코드에서 faith.chrisleepapa.com, /images/hymn, /bible 관련 문자열 직접 탐색: 발견되지 않음 (검사한 파일 한정).
- main sitemap.xml: 홈, 작품, journal, about/contact/법률 URL 수록; Faith 관련 URL 없음.
- vercel.json: 이전 Faith 리디렉션 및 찬송가 전용 헤더 제거가 main과 develop 모두에 반영됨.

## 3. 아직 미검증
- 운영 URL별 HTTP 상태, 렌더링, 모바일 표시, 외부 링크와 광고 스크립트 실행.
- Google Search Console의 실제 색인 상태, AdSense 최신 심사 결과.
- 각 본문이 실질적으로 충분한 독창적 정보와 경험을 제공하는지에 대한 정성 평가.

## 4. 후속 순서
1. 실제 공개 URL 200/301/404, canonical, robots, sitemap, 배포 커밋 검증.
2. 독창적 작품 설명/제작기, 외부 링크, 저가치 페이지를 개별 심사하고 필요시 develop에서 수정.
3. 변경 전후 비교 및 모바일 점검 후 main 반영.

## 변경 이력
- 2026-11-16: main → develop 정확한 동기화. 초기 코드 감사 및 기록 문서 재작성.

## 5. 사이트맵 23개 canonical 1:1 검증 (2026-11-16)
- develop sitemap.xml의 <loc> 직접 파싱 결과 23개.
- 23개 대응 HTML(index, music, movie, wallpaper, sistersquad-hub, sistersquad, sistersquad2, yul, jung, miracleshot, journal, journal-1~7, shop, about, contact, privacy, terms) 각각 develop에서 fetch하여 canonical 확인: 23/23 일치, 0건 불일치.
- 이 항목은 수정 불필요. 실제 운영 URL 접속 시도는 웹 조회 도구에서 실패하여 HTTP 상태/배포 확인으로 간주하지 않음.
- 콘텐츠 품질과 실제 렌더링은 별도 검증 예정.

## 6. 23개 페이지의 정적 링크·콘텐츠 기초 검사 (2026-11-16)
- 23개 페이지의 href/src 중 루트 상대경로를 저장소 전체 트리와 대조: 소스상 누락 파일 0건. 자바스크립트로 동적 생성하는 링크와 외부 URL의 HTTP 동작은 검증 범위 밖.
- 23개 페이지 모두 코드에서 robots=index, follow 확인. 방명록은 별도 noindex, follow로 유지.
- 본문 구조 검사: journal-1~6에는 상세 제작 기록이 존재하며 journal-7에는 KDP 도련 반려 사례, PDF 페이지 비교 이미지, 외부 KDP 가이드 링크가 포함됨.
- music.html은 초반 동적 플레이어 때문에 main 태그만 추출하면 글이 적어 보이지만, main 다음에 음악 제작 기록 8개 절과 발매 아카이브가 존재함. **본문이 빈약하다는 자동 판정 철회.**
- music.html 상단에는 'anime-inspired fan works'의 권리 검토 전 AdSense loader를 생략한다는 기존 주석이 있음. 제3자 IP 권리 확인이 필요한 잠재 위험으로 기록; 검증 없이 광고를 켜거나 해당 작품을 삭제하지 않음.
- 공개 사이트 HTTP 접근: 현재 도구 환경에서 DNS/웹 조회 실패. 실제 200 응답, 브라우저 렌더링, 모바일 조작, 외부 링크 유효성, 광고 정책 준수는 미검증.
- 이번 코드 검사에서 확정적인 내부 경로 결함을 발견하지 못하여 HTML 콘텐츠를 임의로 수정하지 않음.

## 7. 저작권 위험 표현 정정 및 music.html 주석 수정 (2026-11-16)
- 창작자 확인: 게시된 작품은 모두 본인의 창작물. 외부 Spotify/YouTube/도서 판매처 링크 자체를 저작권 위험으로 분류하지 않음.
- 기존 music.html의 'anime-inspired fan works' 권리 검토 보류 주석은 실제 권리 침해의 근거가 아니므로 삭제하고 광고 배치 별도 관리라는 중립 주석으로 교체함. 커밋 03a93be.
- develop 재검증: 기존 권리 위험 주석 없음, 중립 주석 존재, adsbygoogle.js 신규 삽입 없음. 사이트 디자인·작품 목록 수정 없음.
- 향후 권리 위험 판단은 실제 개별 작품과 사용 소재에 대한 구체적인 증거가 있을 때만 표시한다.

## 8. 실제 콘텐츠 보완: 홈 탐색 가이드 (2026-11-16)
- develop index.html에 '처음 방문하셨나요? / Start here' 신규 섹션 추가 (commit a6e1deb).
- 작품 세계관→1·2권, 실제 제작기, 음악·영상 세 경로를 고유한 설명과 함께 제시. 한국어/영어 문구 동시 제공.
- 검증: 신규 섹션 존재, 카드 제목 3개, 내부 링크 /sistersquad-hub /journal /music /movie 4개 확인. 기존 index.html 본문은 신규 섹션 삽입 외 변경 없음. HTML 종료 태그 확인.
- 이 수정은 콘텐츠 탐색·사용자 가치 개선이며 AdSense 승인 보장을 의미하지 않음.
- 개발 프리뷰의 실제 렌더링 및 모바일 표시 검증은 아직 별도 필요.

## 9. 전체 23개 페이지 색상 정적 점검 및 Shop 본문 개선 (2026-11-16)
- 사이트맵 23개 HTML을 직접 읽어 색상 하드코딩과 공통 CSS 연결 여부를 검사: 23/23 css/common.css 사용.
- 일관된 기본 브랜드: cobalt #2544cb, warm paper #f6f4ee, dark #11121a. 기존 About/Shop에는 일부 골드·브라운·그린 하드코딩이 남아 있었음.
- Shop 본문 개선: 책 형식 배지, 설명문, 구매 버튼, 오디오 버튼, 추천 도서 섹션, OGQ 섹션, 페이지 하단 문구를 코발트 계열로 조정. 다크모드 대비 정의. 560px 이하 책 목록은 1열로 변경하여 제목/설명/버튼 가독성 강화. commit 894190f.
- 전체 페이지 공통 네비게이션 포커스 브랜드 컬러 보강. commit d652896.
- 작품 페이지는 개별 세계관의 포인트 컬러(율이 cyan, 정이 pink, SISTER SQUAD 영상 등)를 브랜드 위반으로 간주하지 않고 유지함. 다만 콘텐츠 내부의 골드 강조가 많이 남아 있어 전 페이지의 완전한 시각 통일은 아직 완료되지 않음.
- 검증: shop.html CSS 중괄호 균형, 1열 모바일 규칙, canonical, 브랜드 스타일 블록 존재 확인. 실제 모바일 스크린샷/다크모드 브라우저 렌더링은 미검증.

## 10. AdSense UX 보완: 브라우저 기본 기능 차단 해제 (2026-11-16)
- 2026-11-16 이전 방명록 전용 페이지 분리 운영 배포 7cf34b4 READY 확인.
- 전체 페이지에 로드되는 js/main.js의 initSecurity()가 우클릭, 텍스트 복사, 인쇄/일부 브라우저 단축키를 preventDefault()로 막는 사실 확인.
- 사용자 편의와 접근성을 위해 이벤트 차단 코드를 제거하고 빈 호환 함수로 대체. commit 14d168d.
- develop 검증: 이벤트 차단 코드 제거, 함수 호출 호환성 유지, 중괄호 균형 0. 실제 브라우저 조작 및 모바일 렌더링 미검증.
- 운영 반영은 develop Vercel READY 확인 후 수행.
