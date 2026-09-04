# CLAUDE.md — joymin5655.github.io (포트폴리오 사이트)

조용민의 GitHub Pages 포트폴리오. AI 에이전트·인프라 엔지니어 포지셔닝. 한/영 병기.

## Stack
- **Astro 5** (정적, CWV 우선) + **vanilla Three.js** (2026-07-28 Orbital Console — React/R3F 불도입, three는 lazy chunk). (npm `before` 핀 때문에 Astro 7.x 불가 → 5.x 고정.)
- i18n = 2 라우트: `/`(ko 기본) · `/en/`. `prefixDefaultLocale: false`.
- 배포: GitHub Actions(`withastro/action` → `actions/deploy-pages`). Settings→Pages Source = **GitHub Actions**.

## 구조 (2026-07-28 Orbital Console 리디자인 — 디자인 SSOT = `DESIGN.md` v3)
- `src/data/site.ts` — **콘텐츠 SSOT**(ko/en 완전 분리). 모든 카피는 검증 사실만. `src/data/observatory.ts` — 관측 스냅샷(좌표·파형은 시각화용, 수치 라벨 금지). `src/data/worldDots.ts` — 점묘 지구 좌표.
- `src/layouts/Base.astro` — head·hreflang·OG·셀프호스트 폰트(CDN 금지). `src/components/Portfolio.astro` — 6막 오케스트레이터(HUD·스크롤→actF 동기화·reveal·카운터). 구 `sections/`·`HeroCanvas.astro`는 삭제됨.
- `src/scenes/console/` — Three.js 씬 엔진(`engine.ts` 6막 타임라인 + `boot.ts` capability probe/폴백). `src/styles/console.css` — `.oc-*` 네임스페이스(케이스스터디 페이지 global.css 불변).
- `src/pages/index.astro`(ko) · `src/pages/en/index.astro`(en) · `/writing`(noindex 예약 stub) · **`/research/` · `/en/research/`**(2026-09-03 신설 — `src/components/Research.astro`, 데이터 = `site.ts` `research` — 대학원 지원용: 연구 관심 4 · 방법론 표 · 졸업논문 · 원칙 · 진학 상태).
- 케이스스터디 = **6건**(`caseStudies.*.items`: airlens · agent · **brain · pitter · posture · craft** — 2026-09-03 추가). `CaseStudy` 타입에 `status`·`decisions[]`(결정 기록 — choice/over/why) 추가, `CaseStudy.astro`가 DECISION LOG 섹션 렌더. Act 03 하단 `MORE SYSTEMS` 그리드 = `work.cards.slice(1)` → 케이스 링크. Act 04 하단 `aiPractice` = AI 협업 궤적(2026-03 → 09, 날짜 있는 기록만 · 2026-03 이전 기록 없음 명시).
- **모션 시스템(2026-09-03)**: `console.css` 상단 주석 참조 — reveal = blur-in + rise + spring(`--spring`) + sibling stagger(`--i`), 네이티브 `animation-timeline: view()`(레일 드로잉·eyebrow 드리프트·실측 카드 숫자) `@supports` 점진 향상, 카드 pointer tilt(`.oc-tilt`, hover+fine pointer만, JS in `Portfolio.astro`). 케이스/리서치 페이지는 `global.css` 하단 scroll-driven `pg-rise`. 전부 `prefers-reduced-motion`에서 정지. Act 05 지구본 항적 마커 = 6개(경험 항목 수와 동기, `engine.ts`).
- `src/styles/tokens.css` + `global.css` — 다크 단일, accent 포스포 라임 #D7FF3F (구 cyan/violet 폐기).

## 진실성 게이트 (필수)
- **표현 규칙 SSOT = `~/Dev_joy/취업/master/WRITING_GUIDE.md`** (2026-09-04): 금지 표현·대시 금지·문제→역할→과정→결과 프레임·"왜 AI" 칸·수치 규칙. site.ts 카피를 고칠 때 이 가이드의 체크리스트(§6)를 먼저 돌린다.
- 출처 SSOT = `~/Dev_joy/취업/master/session_summary_report.md` (2026-09-02 로컬 이주 — 구 `/Volumes/WD_BLACK/취업/`). 신규 주장은 여기 대조.
- **전화번호 게시 금지. GCP·Nginx·Flutter·Tailwind 미보유 — 표기 금지**(R8).
- Agent 하네스 수치는 정성 표기(부풀림 금지). 사설 pre-sanitization 수치(구 24·6·8) 게시 금지 — 공개 repo 기준만.
- 노출 규칙(2026-09-03 갱신): **커밋 수치 화면 노출 전면 금지**(gitleaks 스캔 범위 "1,402커밋" 서술도 제거 — "전 히스토리 스캔"으로만) · 트래픽 = 요청 단위만("사용자" 금지, 부인 각주 상시) · 데이터 소스 = **10**(정확값) · 미검증 항목 게시 금지(온라인 수료 3종·이어드림 LLM 부트캠프·빅데이터분석기사 예정·SKT T1 아카데미 = 게시 안 함).
- **수상·자격 노출(2026-09-03 사용자 위임 결정 — 구 "진열 금지" IA 해제)**: 수상 3건만(AIVLE Collaboration상 2024 · 정밀의료 메이커톤 사업단장상 2022 · 일경험 최우수상 — 연도 미확인이라 연도 비움) · 자격 = **Azure AI-900 · 6시그마 GB만**(ITQ·온라인 수료증 미게시) · 경력은 **회사명 실명**(로지체인·에듀인소프트·Sigma·Welodata) · 2018 GT 라벨링은 "자율주행 인지 데이터 구축"으로만(발주처 미확인) · 물량·정확도 미기록 수치 금지(`정량지표_실측_카탈로그_2026-08-28.md` §1·§2 결정).
- **Act 05 = 경험 원장(ledger)**: `timeline.items[]`(kind·role·bullets·tags) + `fieldNotes`(실측 교훈 4건 — 65.6% 게이트 FAIL · PICP 93%→14% · 리랭커 Δ−0.0014 · 측정도구 오진 3회, 출처 = 정량지표 카탈로그 §3 + brain `insight-validate-the-measurement-before-the-subject`) + `recognition`. 구 `oc-mile`/`oc-minicard`(바른자세 미니카드) 폐기 — 바른자세는 AIVLE 항목 bullets로 흡수. Act 05 컬럼만 `.oc-col--wide`(720px, 좌측 정렬 유지 — 카메라 정책 불변).
- 학력 표기(2026-07-28 갱신): **"융합전공"**(성적표 실측 — "복수전공/double major" 오기 금지) · **GPA 4.44 노출 보류**(공식 증명서 확인 전 게시 금지, SSOT `취업/master/education_history.md`) · RLS 수치는 "multiple_permissive 린트 132→6건"으로만(정책 총수 아님 — 근거 커밋 AirLens `133a2604`/PR#594) · SDID 6→53은 검증됨(커밋 `a214fd84`/PR#687).

## Resume PDF 파이프라인 (2026-09-02 — **로컬 전용**, 공개 보류 결정 유지)
- SSOT = 루트 `resume.json`(JSON Resume v1.0.0) → `npm run build:resume`(`scripts/build-resume.mjs`, Puppeteer)이 `public/resume.pdf` 생성(git 미추적·**CI 미빌드**). PDF 공개는 2026-07-04 개인정보 리스크 보류 결정에 따라 **하지 않음**(2026-09-02 재확인) — deploy.yml에 resume 스텝 넣지 말 것. 공개하려면 사용자 결정 후 deploy.yml에 pre-build 스텝 추가(방법 = `~/Dev_joy/_docs-inbox/json-resume-pdf-automation.md`). 진실성 게이트 동일 적용(전화번호 금지, resume.json summary ↔ site.ts ↔ LinkedIn 동기화 체크).

## Dev / Build
- `npm run dev` (localhost:4321) · `npm run build` → `dist/` · `npm run preview`.
- 배포 전 점검: `dist/`에 전화번호·`gcp|nginx|flutter|tailwind` grep → 0 hit (Tailwind는 ALL-IN-ONE 스택 서술로만 등장 가능 — 본인 보유 스택 표기가 아님을 문맥으로 유지).
- 2026-09-03 인터뷰 답변 원문 = `~/joy_brain/raw/inbox/2026-09-03-portfolio-interview-answers.md` (바른자세 역할·배포 실패·졸업논문 방법·연구 관심·Pitter 노출 범위·링크 허용). 미회신: 일경험 최우수상 연도 · 2026-03 이전 AI 사용 기록.

## 후속 (미완)
- ~~Phase 5: Three.js 글로브~~ → **2026-07-28 완료** (Orbital Console — vanilla three 씬 + no-3d poster fallback + reduced-motion, `metiq-clone` 셰이더 이식).
- 폴리시: README↔사이트 크로스링크 확인, Lighthouse 패스. (OG 이미지·sitemap·robots.txt·JSON-LD·favicon = 2026-07-04 완료.)
- 보류(사용자 결정 2026-07-04): Contact LinkedIn(검증 URL 확보 후), 이력서 PDF CTA(개인정보 리스크).
