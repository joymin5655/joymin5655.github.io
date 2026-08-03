<p align="center">
  <img src="assets/readme/hero.svg" alt="Yongmin Cho — AI Agent / Infrastructure Engineer" width="900">
</p>

<p align="center">
  <a href="https://joymin5655.github.io"><img alt="Live site" src="https://img.shields.io/badge/live-joymin5655.github.io-d7ff3f?style=flat-square&labelColor=0a0c10"></a>
  <img alt="Astro 5" src="https://img.shields.io/badge/astro-5-232936?style=flat-square&labelColor=0a0c10">
  <img alt="Deploy" src="https://img.shields.io/badge/deploy-GitHub%20Pages-232936?style=flat-square&labelColor=0a0c10">
</p>

## About

This is my personal portfolio site — bilingual (한국어 / English), a single scroll-driven
page called **Orbital Console**. A fixed vanilla-Three.js scene sits behind normal-flow
content and reacts to scroll position across six acts (hero → operations board → work →
Agent → journey → contact); a fallback ladder (`prefers-reduced-motion`, no WebGL, or a
runtime engine failure) drops to a static poster background so every section stays fully
readable without WebGL.

Every number on the page (requests/30 days, DB migrations, blocked operations, etc.) is a
measured figure with an evidence link back to the source repo — the same "glass-box, no
fabricated numbers" discipline I apply to [AirLens](https://airlens.cloud) itself. Content
is bilingual at the data layer (`src/data/site.ts`), not machine-translated per page.

- **`/`** and **`/en/`** — the Orbital Console home page (ko / en)
- **`/projects/:slug`** and **`/en/projects/:slug`** — case studies (hard problem →
  solution → tech, per project: `airlens`, `agent`)
- **`/writing`** and **`/en/writing`** — reserved stub, kept out of the search index
  (`noindex`) until there's something to publish

## Built with

| | |
|---|---|
| Framework | [Astro 5](https://astro.build) (static output, zero client JS by default) |
| 3D scene | [Three.js](https://threejs.org) — vanilla, no React/Vue renderer |
| Fonts | [Pretendard](https://github.com/orioncactus/pretendard) (sans) · [IBM Plex Mono](https://github.com/IBM/plex) (mono), both self-hosted — no CDN font loading |
| SEO | [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) |
| Geo data | `world-atlas` + `topojson-client` (globe dot rendering) |

## Local dev

```sh
npm install
npm run dev       # localhost:4321
npm run build     # → ./dist/
npm run preview   # serve the production build locally
npm run astro ...  # any Astro CLI command, e.g. `npm run astro check`
```

Requires Node ≥ 22.12 (`engines.node` in `package.json`).

## Structure

```
src/
├── pages/
│   ├── index.astro                 # / (ko)
│   ├── en/index.astro              # /en/
│   ├── projects/[slug].astro       # /projects/:slug (ko case study)
│   ├── en/projects/[slug].astro    # /en/projects/:slug
│   ├── writing/index.astro         # /writing (noindex stub)
│   └── en/writing/index.astro      # /en/writing
├── layouts/
│   └── Base.astro                  # <head>, hreflang, OG/Twitter meta, JSON-LD
├── components/
│   ├── Portfolio.astro             # home page — renders the six acts
│   ├── CaseStudy.astro             # /projects/:slug renderer
│   └── ui/                         # Panel, Gauge, StatusDot, EvidenceLink
├── data/
│   ├── site.ts                     # bilingual content SSOT (hero, board, work, case studies)
│   ├── observatory.ts              # operations-board panel data
│   └── worldDots.ts                # globe dot-field coordinates
├── scenes/console/
│   ├── boot.ts                     # capability probe → lazy-load the engine
│   └── engine.ts                   # vanilla Three.js scene (scroll-driven act timeline)
└── styles/
    ├── tokens.css                  # design tokens (color, type, motion)
    ├── global.css
    └── console.css                 # Orbital Console layout + act choreography

public/
├── favicon.svg / favicon.ico
├── og.png                          # Open Graph / Twitter card image
└── robots.txt
```

## Deploy

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`
(also runnable manually via `workflow_dispatch`):

1. **build** — checkout, then [`withastro/action@v3`](https://github.com/withastro/action) runs `astro build`
2. **deploy** — [`actions/deploy-pages@v4`](https://github.com/actions/deploy-pages) publishes the build output to the `github-pages` environment

Live at **[joymin5655.github.io](https://joymin5655.github.io)**.

---

<details>
<summary>🇰🇷 한국어</summary>

## 소개

제 개인 포트폴리오 사이트입니다 — 한국어/영어 이중언어, **Orbital Console**이라는
스크롤 기반 원페이지 구성입니다. 고정된 vanilla Three.js 3D 씬이 일반 문서 흐름 콘텐츠
뒤에 배치되어 스크롤 위치에 따라 6개 액트(히어로 → 운영 관측 보드 → Work → Agent →
여정 → 연락처)로 반응합니다. `prefers-reduced-motion`, WebGL 미지원, 또는 엔진 실행
실패 시 정적 포스터 배경으로 폴백해 WebGL 없이도 모든 섹션이 읽힙니다.

페이지에 노출되는 모든 수치(30일 요청 수, DB 마이그레이션 수, 차단된 작업 수 등)는
실측값이며 근거 저장소로 역추적 가능한 링크가 함께 붙습니다 — [AirLens](https://airlens.cloud)
자체에 적용하는 "glass-box, 숫자 지어내지 않기" 원칙을 이 사이트에도 그대로 적용했습니다.
이중언어는 페이지별 기계번역이 아니라 데이터 레이어(`src/data/site.ts`)에서 관리합니다.

- **`/`**, **`/en/`** — Orbital Console 홈 (ko / en)
- **`/projects/:slug`**, **`/en/projects/:slug`** — 케이스스터디(어려웠던 점 → 해결 →
  적용 기술, 프로젝트별: `airlens`, `agent`)
- **`/writing`**, **`/en/writing`** — 예약된 스텁 페이지, 발행할 글이 생기기 전까지
  검색 색인 제외(`noindex`)

## 기술 스택

Astro 5(정적 출력) + vanilla Three.js(프레임워크 렌더러 없이) + 자체 호스팅 Pretendard/IBM
Plex Mono 폰트(CDN 미사용) + `@astrojs/sitemap` + `world-atlas`/`topojson-client`(글로브
좌표).

## 로컬 개발

```sh
npm install
npm run dev       # localhost:4321
npm run build     # → ./dist/
npm run preview   # 프로덕션 빌드 로컬 미리보기
```

Node ≥ 22.12 필요(`package.json`의 `engines.node`).

## 배포

`.github/workflows/deploy.yml`이 `main` 브랜치 push 시(또는 수동 `workflow_dispatch`)
`withastro/action@v3`로 빌드 후 `actions/deploy-pages@v4`로 GitHub Pages에 배포합니다.

</details>
