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
- `src/pages/index.astro`(ko) · `src/pages/en/index.astro`(en) · `/writing`(noindex 예약 stub).
- `src/styles/tokens.css` + `global.css` — 다크 단일, accent 포스포 라임 #D7FF3F (구 cyan/violet 폐기).

## 진실성 게이트 (필수)
- 출처 SSOT = `/Volumes/WD_BLACK/취업/master/session_summary_report.md`. 신규 주장은 여기 대조.
- **전화번호 게시 금지. GCP·Nginx·Flutter·Tailwind 미보유 — 표기 금지**(R8).
- Agent 하네스 수치는 정성 표기(부풀림 금지). 사설 pre-sanitization 수치(구 24·6·8) 게시 금지 — 공개 repo 기준만.
- 노출 규칙(2026-07-11 갱신): **커밋 수치 화면 노출 전면 금지**(구 "1,200+" 규칙 대체 — 유일 예외는 gitleaks "1,402커밋 스캔 범위" 서술) · 트래픽 = 요청 단위만("사용자" 금지, 부인 각주 상시) · 데이터 소스 = **10**(정확값) · 미검증 항목 게시 금지(온라인 수료 3종·이어드림 LLM 부트캠프·빅데이터분석기사 예정 = 삭제됨) · 자격 섹션 미설치(2026-07-11 IA — 수상·자격 진열 금지, 학력은 타임라인 1줄만).
- 학력 표기(2026-07-28 갱신): **"융합전공"**(성적표 실측 — "복수전공/double major" 오기 금지) · **GPA 4.44 노출 보류**(공식 증명서 확인 전 게시 금지, SSOT `취업/master/education_history.md`) · RLS 수치는 "multiple_permissive 린트 132→6건"으로만(정책 총수 아님 — 근거 커밋 AirLens `133a2604`/PR#594) · SDID 6→53은 검증됨(커밋 `a214fd84`/PR#687).

## Dev / Build
- `npm run dev` (localhost:4321) · `npm run build` → `dist/` · `npm run preview`.
- 배포 전 점검: `dist/`에 전화번호·`gcp|nginx|flutter` grep → 0 hit.

## 후속 (미완)
- ~~Phase 5: Three.js 글로브~~ → **2026-07-28 완료** (Orbital Console — vanilla three 씬 + no-3d poster fallback + reduced-motion, `metiq-clone` 셰이더 이식).
- 폴리시: README↔사이트 크로스링크 확인, Lighthouse 패스. (OG 이미지·sitemap·robots.txt·JSON-LD·favicon = 2026-07-04 완료.)
- 보류(사용자 결정 2026-07-04): Contact LinkedIn(검증 URL 확보 후), 이력서 PDF CTA(개인정보 리스크).
