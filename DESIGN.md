# DESIGN.md — Orbital Console (redesign/v3)

> 2026-07-28 확정. 이 문서가 사이트 디자인 SSOT. (구 v2 "Signal Observatory"를 대체 — 컬러·타이포 토큰과 진실성 규칙은 계승, 레이아웃·모션 문법은 전면 교체.)
> 콘텐츠 진실성은 `CLAUDE.md` 진실성 게이트 + `/Volumes/WD_BLACK/취업/master/session_summary_report.md`가 우선.

## 0. 컨셉

**Orbital Console** — 포지셔닝("AI를 프로덕션까지, 혼자, 거버넌스와 함께")을 하나의 연속된 3D 공간으로 서사화.
풀스크린 고정 WebGL 캔버스(vanilla Three.js) 위에 일반 문서 플로우의 HTML 콘텐츠가 흐르고, **스크롤 = 씬 타임라인**. 6막:

| 막 | id | 씬 | 콘텐츠 |
|---|---|---|---|
| 01 ORBIT ENTRY | `#top` | 점묘 지구 + fresnel 림 + 요청 아크(55개국→서울) | 헤드라인·실측 칩·CTA |
| 02 OBSERVATORY | `#board` | 풀백, 지구 축소 | 검증 지표 5타일 + STACK 타일 (카운터 롤업) |
| 03 AIRLENS ORBIT | `#work` | 궤도 링 3 + 데이터 소스 노드 10 | 플래그십 + 서브시스템 6 + DS Depth |
| 04 AGENT GATE | `#agent` | 파티클 재배열 → 게이트 회랑(3레인, 위험 파티클 차단·산란) | Agent 하네스 + PASS/DENIED 데모 |
| 05 TRAJECTORY | `#timeline` | 지구 축소, 항적 라인 + 마일스톤 마커 5 | 타임라인 5 + 학력 1줄 + 바른자세 미니카드 |
| 06 RE-ENTRY | `#contact` | 지구 재중심, 여명(dawn) 라이팅, 아크 복귀 | 연락 CTA |

## 1. WebGL 재결정 (구 v2의 "WebGL 기각" 번복 — 2026-07-28)

v2는 "3D 글로브는 무겁고 흔해서 기각, 2D 캔버스 히어로"였다. 이번 리디자인에서 사용자가 "3D 애니메이션 중심, 기존 틀 유지 불필요"를 명시 요청 → **번복이 아니라 요구 변경에 따른 재결정**. 원래 CLAUDE.md Phase 5(Three.js 글로브)의 실행이기도 하다.

- React/R3F 불도입 — vanilla Three.js 단일 씬 그래프(`src/scenes/console/engine.ts`)가 스크롤 타임라인 관리에 유리.
- three는 **첫 페인트 후 dynamic import** (lazy chunk ~505KB min / ~150KB gzip) — 초기 로드는 v2 수준 유지.

## 2. 카메라 정책 (사용자 결정 2026-07-28: "지구본 좌우 핑퐁 금지")

- 지구본은 **우측 상시 앵커** (CAM x 전부 > 0, 미세 드리프트만). 막 전환은 **줌·틸트·씬 드레싱**(궤도링·게이트·항적이 지구 주변에 형성)으로만 표현.
- 콘텐츠 패널은 전부 **좌측 정렬** (`.oc-col`, max 600px).
- 유일한 예외 = 마지막 06 RE-ENTRY: x→0 단일 센터링 무브(엔딩 연출, 핑퐁 아님).
- 마우스 패럴랙스 회전 진폭 0.18 (잔흔들림 완화).

## 3. 폴백 사다리 (`src/scenes/console/boot.ts`)

1. `prefers-reduced-motion` 또는 WebGL 불가 → `html.no-3d`: 정적 포스터 그라디언트, 콘텐츠 즉시 표시. 씬 로드 자체를 건너뜀.
2. 엔진 dynamic import 실패 → 동일 `no-3d` 경로.
3. 모바일/저사양(`width<860 || deviceMemory<4`) → 파티클 stride 2, 스타 수 축소.
4. `visibilitychange` → rAF 정지. 탭 복귀 시 재개.
5. no-3d에서도 진행바·액트 도트는 scroll 리스너로 동작(씬 루프 불필요).

주의(실측 2026-07-28): 창이 다른 창에 **가려지면(occluded)** Chrome이 rAF를 ~1fps로 스로틀 → 씬 전환이 기어가는 것처럼 보임. 버그 아님 — 전면 창에서는 60fps.

## 4. 성능 예산

- 초기 로드(three 제외) = v2 수준 유지. three = lazy chunk만.
- 파티클: 지구 점묘 ≤ 8k points (모바일 stride 2로 ≈ 절반), 스타 420(모바일 220).
- 셰이더 1개(포인트 클라우드, uGateMix로 globe↔corridor 모핑) + fresnel 1개 — draw call 최소.
- fresnel은 **rim-only 공식** (`1-abs(dot(N,V))`) — metiq 원본 BackSide 공식은 불투명 지구가 중심부를 가리는 전제라 포인트 클라우드에선 청록 블롭이 됨(2026-07-28 실측 수정).

## 5. 스크롤 → actF 동기화 (`Portfolio.astro` 스크립트)

- 섹션 midpoint 배열을 뷰포트 중심으로 보간해 actF(0~5) 산출, lerp 0.09로 스무딩.
- **midpoint는 폰트 스왑 후 재측정 필수** (`document.fonts.ready` + `load` + `resize`) — 부트 시점 측정만으로는 한글 폰트 스왑 후 레이아웃이 변해 최하단에서 actF가 5에 못 미칠 수 있음(2026-07-28 방어 수정).

## 6. 컬러·타이포 토큰 (v2 계승)

- 다크 단일: bg `#07090D` 계열, accent 포스포 라임 `#D7FF3F`, ok `#43D9AD`, alert `#FF6B4A`, ink `#AEB8C9`.
- Pretendard(본문) + IBM Plex Mono(수치·라벨) 셀프호스트 — CDN 금지.
- `.oc-*` 네임스페이스(`src/styles/console.css`). 케이스스터디 페이지의 구 global.css 클래스는 불변.

## 7. 진실성 게이트 (불변 — CLAUDE.md가 SSOT)

- 커밋 수치 화면 노출 금지(유일 예외 gitleaks 스캔 범위 서술) · 트래픽 = 요청 단위 + 부인 각주 · 데이터 소스 10 정확값 · GPA 4.44 보류 · 융합전공 · 전화번호 금지 · GCP/Nginx/Flutter/Tailwind 금지.
- observatory.ts 국가별 가중치는 시각화용 — 수치 라벨로 렌더 금지.
- act4 PASS/DENIED 행은 디자인 데모(aria-hidden) — 실로그 수치 주장 아님.
- **AI 기여 공개 (2026-08-03 사용자 결정)**: "단독 구축/설계/개발"·"built solo"·"designed, built & operated solo" 류의 *제작* 단독 주장 금지 — 제작은 항상 "AI 에이전트 협업"과 병기하고, 단독 주장은 *운영·책임*("1인 책임·운영"·"operated solo")에만 허용. AI 기여율 수치(~N%) 날조 금지 — 정성 서술만. 케이스스터디의 `attribution` 3분할(내가 한 일/AI가 한 일/내가 책임진 것)과 `aiNote`(Act 4)는 이 결정의 렌더 표면 — 제거 금지.

## 8. 검증 절차 (배포 전)

`npm run build` → dist grep 배터리(전화번호 `010-\d{4}-\d{4}`·`4.44`·복수전공·double major·gcp|nginx|flutter = 0 hit, **단독 구축|단독 설계|단독 개발|built solo|operated solo(운영 문맥 제외)|Solo-builds = 0 hit** — AI-공개 병기 없는 제작-단독 주장 재유입 차단, 바이너리 제외) → preview 3경로(풀 스크롤·no-3d·EN) → 리뷰 레인 → push.
