# Chris Lee.Papa — The Creative Archive

개인 크리에이티브 포트폴리오 웹페이지입니다.

## 구성

```
chris-portfolio/
├── index.html      # 메인 페이지
├── vercel.json     # Vercel 배포 설정
└── README.md
```

## 로컬 미리보기

`index.html` 파일을 브라우저에서 직접 열거나, VS Code Live Server 등으로 실행합니다.

## GitHub → Vercel 배포 방법

1. 이 폴더를 GitHub 새 Repository에 push합니다.
2. [vercel.com](https://vercel.com) 로그인 후 **Add New Project** 클릭
3. GitHub Repository 연결 → **Deploy** 클릭
4. 자동으로 `index.html`을 감지하여 배포됩니다.

이후 `main` 브랜치에 push할 때마다 자동으로 재배포됩니다.

## 커스터마이징

- **텍스트 수정**: `index.html` 내 카드 태그라인, 섹션 내용 수정
- **이미지 교체**: 각 카드의 `.card-bg` 영역에 `background-image: url('이미지경로')` 추가
- **연락처 수정**: Contact 섹션의 이메일, SNS 링크 교체
