# CLAUDE.md — joymin5655.github.io (포트폴리오 사이트)

조용민의 GitHub Pages 포트폴리오. AI 에이전트·인프라 엔지니어 포지셔닝. 한/영 병기.

## Stack
- **Astro 5** (zero-JS 정적, CWV 우선). React/MDX 미사용 — Three.js 글로브 island는 후속(Phase 5). (npm `before` 핀 때문에 7.x 불가 → 5.x 고정.)
- i18n = 2 라우트: `/`(ko 기본) · `/en/`. `prefixDefaultLocale: false`.
- 배포: GitHub Actions(`withastro/action` → `actions/deploy-pages`). Settings→Pages Source = **GitHub Actions**.

## 구조
- `src/data/site.ts` — **콘텐츠 SSOT**(ko/en 완전 분리). 모든 카피는 검증 사실만.
- `src/layouts/Base.astro` — head·hreflang·OG·폰트. `src/components/Portfolio.astro` — 전 섹션 렌더(lang prop).
- `src/pages/index.astro`(ko) · `src/pages/en/index.astro`(en) — 둘 다 Portfolio 재사용.
- `src/styles/global.css` — 디자인 토큰(다크, accent #25e2f4/#7c6cf0).

## 진실성 게이트 (필수)
- 출처 SSOT = `/Volumes/WD_BLACK/취업/master/session_summary_report.md`. 신규 주장은 여기 대조.
- **전화번호 게시 금지. GCP·Nginx·Flutter·Tailwind 미보유 — 표기 금지**(R8).
- Agent 하네스 수치는 정성 표기(부풀림 금지). 자격증 vs 온라인 수료 구분 유지.

## Dev / Build
- `npm run dev` (localhost:4321) · `npm run build` → `dist/` · `npm run preview`.
- 배포 전 점검: `dist/`에 전화번호·`gcp|nginx|flutter` grep → 0 hit.

## 후속 (미완)
- Phase 5: Three.js 글로브 React island(`metiq-clone` 재사용) + 정적 poster fallback + reduced-motion.
- 폴리시: README↔사이트 크로스링크 확인, Lighthouse 패스. (OG 이미지·sitemap·robots.txt·JSON-LD·favicon = 2026-07-04 완료.)
- 보류(사용자 결정 2026-07-04): Contact LinkedIn(검증 URL 확보 후), 이력서 PDF CTA(개인정보 리스크).
