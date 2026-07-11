# CLAUDE.md — joymin5655.github.io (포트폴리오 사이트)

조용민의 GitHub Pages 포트폴리오. AI 에이전트·인프라 엔지니어 포지셔닝. 한/영 병기.

## Stack
- **Astro 5** (zero-JS 정적, CWV 우선). React/MDX 미사용 — Three.js 글로브 island는 후속(Phase 5). (npm `before` 핀 때문에 7.x 불가 → 5.x 고정.)
- i18n = 2 라우트: `/`(ko 기본) · `/en/`. `prefixDefaultLocale: false`.
- 배포: GitHub Actions(`withastro/action` → `actions/deploy-pages`). Settings→Pages Source = **GitHub Actions**.

## 구조 (2026-07-11 Signal Observatory 리디자인 — 디자인 SSOT = `DESIGN.md`)
- `src/data/site.ts` — **콘텐츠 SSOT**(ko/en 완전 분리). 모든 카피는 검증 사실만. `src/data/observatory.ts` — 관측 스냅샷(좌표·파형은 시각화용, 수치 라벨 금지).
- `src/layouts/Base.astro` — head·hreflang·OG·셀프호스트 폰트(CDN 금지). `src/components/Portfolio.astro` — 섹션 오케스트레이터(`sections/` 6종 + `ui/` 4종 조립).
- `src/pages/index.astro`(ko) · `src/pages/en/index.astro`(en) · `/writing`(noindex 예약 stub).
- `src/styles/tokens.css` + `global.css` — 다크 단일, accent 포스포 라임 #D7FF3F (구 cyan/violet 폐기).

## 진실성 게이트 (필수)
- 출처 SSOT = `/Volumes/WD_BLACK/취업/master/session_summary_report.md`. 신규 주장은 여기 대조.
- **전화번호 게시 금지. GCP·Nginx·Flutter·Tailwind 미보유 — 표기 금지**(R8).
- Agent 하네스 수치는 정성 표기(부풀림 금지). 사설 pre-sanitization 수치(구 24·6·8) 게시 금지 — 공개 repo 기준만.
- 노출 규칙(2026-07-11 갱신): **커밋 수치 화면 노출 전면 금지**(구 "1,200+" 규칙 대체 — 유일 예외는 gitleaks "1,402커밋 스캔 범위" 서술) · 트래픽 = 요청 단위만("사용자" 금지, 부인 각주 상시) · 데이터 소스 = **10**(정확값) · 미검증 항목 게시 금지(온라인 수료 3종·이어드림 LLM 부트캠프·빅데이터분석기사 예정 = 삭제됨) · 자격 섹션 미설치(2026-07-11 IA — 수상·자격 진열 금지, 학력은 타임라인 1줄 4.44만).

## Dev / Build
- `npm run dev` (localhost:4321) · `npm run build` → `dist/` · `npm run preview`.
- 배포 전 점검: `dist/`에 전화번호·`gcp|nginx|flutter` grep → 0 hit.

## 후속 (미완)
- Phase 5: Three.js 글로브 React island(`metiq-clone` 재사용) + 정적 poster fallback + reduced-motion.
- 폴리시: README↔사이트 크로스링크 확인, Lighthouse 패스. (OG 이미지·sitemap·robots.txt·JSON-LD·favicon = 2026-07-04 완료.)
- 보류(사용자 결정 2026-07-04): Contact LinkedIn(검증 URL 확보 후), 이력서 PDF CTA(개인정보 리스크).
