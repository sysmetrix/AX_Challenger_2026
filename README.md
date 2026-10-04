# 2026 AX 챌린저 성과보고

클로드코드가 작업한 **v5 재단서식 최종본(24장)**과 최신 로컬 웹페이지를 기준으로 한 공개 성과보고 사이트입니다.

**웹페이지:** https://axchallenger2026.vercel.app/

## 배포 구조

- Vercel: 저장소 최상위를 프로젝트 루트로 유지하며 `vercel.json`의 `outputDirectory: docs`로 웹파일만 게시합니다. Framework Other, 빌드·설치 명령 없이 정적 배포합니다. GitHub main 변경 시 연결된 Vercel 프로젝트가 갱신됩니다.
- 기본 주소 `/`에서 바로 열립니다. 이전 `/docs/index.html`·`/index.html` 주소는 `/`로 이동하고 `/docs/` 아래 자산 주소는 루트 자산 주소로 이동합니다.

- `docs/`: 실제 웹페이지 전체. HTML·CSS·JavaScript, 재단 그래픽, KoPub 돋움, 도식 10종, 시연 영상 2편, 문서 다운로드 5종을 포함합니다.
- 기존 GitHub Pages 게시 소스: **main 브랜치 /docs 폴더**. `.nojekyll`로 정적 파일을 그대로 게시합니다. 기존 주소는 https://sysmetrix.github.io/AX_Challenger_2026/ 입니다.
- `SOURCE_SNAPSHOT.json`: 복사한 원본 파일의 SHA-256과 v5 기준을 기록합니다. 기존 `v4.js` 파일명은 이전부터 사용한 모듈 이름이며 v5의 4주 바이브 코딩 과정과 v5 발표자료를 함께 반영합니다.
- `tools/serve.mjs`: GitHub Pages의 프로젝트 경로를 재현하는 로컬 확인 서버입니다. Node로 실행하고 `http://127.0.0.1:8767/AX_Challenger_2026/`을 엽니다.
- `tools/sync_site.py`: 최초 로컬 파일 복사·해시 대조 도구입니다. 기존 docs를 덮어쓰지 않습니다.

## 내용과 사용

경과·수치 실적, 15명 전원 소개, 업무유형별 개발·적용 목록, 전체 사례 검색·필터, 시연·예제 체험, 직원 표창, 2026/2027 추진체계·로드맵, 4주 바이브 코딩 육성과정(검토안), 근거·자료를 제공합니다. 전체 사례 30개는 탐색 항목이며 완료 프로젝트 총계가 아닙니다. 설문은 응답자 기준이고 2027년 계획·예산은 검토안·요구액입니다.

수입관리 영상은 실제 프로그램의 가상자료 녹화(30초), 안전교육일지는 설명용 재구성(23초)입니다. 무음·한국어 설명·구간 이동과 데이터 체험을 제공합니다. 원본 운영 시스템에 연결되지 않습니다.

웹페이지와 첨부자료의 전체 공개는 사용자가 선택한 범위입니다. 외부 Notion 원문은 해당 페이지의 열람 권한이 필요합니다. 글꼴 안내는 `docs/assets/fonts/NOTICE.txt`에 있습니다.

## 수정과 업데이트

화면·스타일은 `docs/index.html`·`styles.css`, 사례·출처는 `data.js`, 경과·성과는 `v4.js`, 동작은 `app.js`·`experience.js`, 발표자료는 `docs/downloads/presentation.pptx`에서 관리합니다. main의 docs 변경을 커밋·푸시하면 GitHub Pages가 다시 배포합니다. 기존 Sites 주소는 별도의 이전 배포이며 이 저장소 변경으로 갱신되지 않습니다.

게시 방식: [GitHub Pages 공식 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
