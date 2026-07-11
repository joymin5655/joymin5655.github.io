# DESIGN.md — Signal Observatory (redesign/v2)

> 2026-07-11 확정. 이 문서가 사이트·프로필 README 리스킨의 디자인 SSOT.
> 콘텐츠 진실성은 `CLAUDE.md` 진실성 게이트 + `/Volumes/WD_BLACK/취업/master/session_summary_report.md`가 우선.

## 0. 컨셉

**Signal Observatory** — 포트폴리오를 "읽는 문서"가 아니라 **운영 중인 시스템의 관측소**로 만든다.
실트래픽(55개국/66,307 요청), 고위험 작업 차단(296건/오탐 0), 인프라 규모(121 마이그레이션·35 Edge Functions)가
계기판·게이지·관측 로그의 형태로 스스로 말하게 한다.

세 축의 조합 (사용자 확정):
1. **모던 컴포넌트 정제** — bento 그리드, 마이크로 모션, 절제된 글로우
2. **몰입형 인터랙션** — 2D 캔버스 히어로 (점묘 세계지도 + 요청 아크 + 파형)
3. **라이브 관측 대시보드** — 정적 스냅샷 데이터 + `LAST OBSERVED` 타임스탬프 정직 표기

**커밋 수치는 화면 어디에도 노출하지 않는다** (사이트·README 공통, 2026-07-11 사용자 결정).
유일한 예외: gitleaks 서술("1,402커밋 전 이력 스캔, 유출 0")은 스캔 범위 서술로만 허용.

## 1. 컬러 토큰 (다크 단일 테마)

관측소는 밤에 작동한다 — 다크 단일 커밋. 라이트 대응은 README SVG만(GitHub 렌더 특성).
구 아이덴티티(cyan #25e2f4 → violet #7c6cf0)는 전면 폐기, 재사용 금지.

```css
--bg:        #0A0C10;  /* 옵시디언 슬레이트 — 순검정 아님, 청색 편향 */
--bg-deep:   #06080B;  /* 캔버스 히어로 바닥 */
--panel:     #12151C;  /* bento 패널 표면 */
--panel-2:   #171B24;  /* hover / 중첩 표면 */
--line:      #232936;  /* 괘선·보더 (저채도) */
--grid:      #1A1F2A;  /* 배경 그리드 라인 */
--ink:       #EDEFF4;  /* 본문 */
--muted:     #8A93A6;  /* 보조 텍스트 (청회색 — 액센트 방향 휴 바이어스) */
--faint:     #5A6375;  /* 각주·타임스탬프 */
--signal:    #D7FF3F;  /* 포스포 라임 — 관측 신호. 절제 사용(포인트만) */
--signal-dim:#9DBD2A;  /* signal의 저휘도 변형 (보더·라벨) */
--alert:     #FF6B4A;  /* 경보·차단 게이지 */
--ok:        #43D9AD;  /* 정상 상태 도트·LIVE */
```

규칙:
- `--signal`은 화면당 1–2곳(헤드라인 키워드, 활성 게이지)만. 넓은 면적 채색 금지.
- 상태 의미색(`--ok`/`--alert`)과 액센트(`--signal`)는 역할 분리 — 상태색을 장식에 쓰지 않는다.
- 글로우는 `box-shadow: 0 0 24px rgba(215,255,63,.08)` 수준의 저휘도만.

## 2. 타이포그래피

| 역할 | 폰트 | 비고 |
|---|---|---|
| 본문·헤드라인 | **Pretendard Variable** (한글 서브셋 woff2) | `public/fonts/` 셀프호스트, CDN 금지 |
| 수치·게이지·타임스탬프·eyebrow | **IBM Plex Mono** (Regular/Medium woff2) | 셀프호스트. `font-variant-numeric: tabular-nums` |

- `font-display: swap` + preload(본문 웨이트만). Google Fonts CDN 링크 제거.
- 타입 스케일 (clamp, 1.25배율 기반):
  - `--t-xs: 0.75rem` (각주) · `--t-sm: 0.875rem` · `--t-base: 1rem` · `--t-lg: 1.25rem`
  - `--t-xl: clamp(1.5rem, 3vw, 1.95rem)` (섹션 타이틀)
  - `--t-hero: clamp(2.6rem, 6.5vw, 4rem)` (히어로, letter-spacing -0.03em, `text-wrap: balance`)
- eyebrow/라벨: mono, uppercase, `letter-spacing: 0.14em`, `--faint` 또는 `--signal-dim`.

## 3. 모션 언어

| 패턴 | 스펙 |
|---|---|
| 마이크로 (hover) | 180–200ms ease-out. 카드 lift 2px + 보더 `--line`→`--signal-dim` + 저휘도 글로우 |
| 섹션 진입 | IntersectionObserver 1회 reveal — translateY(12px)+opacity, 500ms, 자식 60ms stagger |
| 카운터 롤업 | 최초 진입 1회, 900ms, tabular-nums로 폭 고정 |
| 게이지 스윕 | SVG stroke-dashoffset CSS transition, 최초 진입 1회 |
| 상태 도트 | `--ok` 2s pulse (LIVE 표시만) |
| 캔버스 | §4. 탭 blur 시 rAF 정지 |

**`prefers-reduced-motion: reduce`** — 모든 트랜지션·애니메이션 즉시 최종 상태, 캔버스는 1프레임 정적 렌더 후 종료. 예외 없음.

## 4. 캔버스 히어로 (2D Canvas — WebGL 기각)

- 내용: 점묘 세계지도(도트 그리드) + 요청 아크 펄스(국가 좌표 → 서울, 동시 ≤12) + 하단 30일 요청량 파형.
- 데이터: `src/data/observatory.ts` 정적 스냅샷만. 국가 좌표 ~55점, 일별 요청 30점.
- 성능 예산: JS ≤15KB gzip, rAF 단일 루프, DPR cap 2, 파티클 ≤300, 탭 blur 정지.
- 인터랙션: 마우스 근접 시 도트 미세 반발(반경 80px, lerp 복귀).
- 폴백: reduced-motion → 1프레임 정적 / noscript·canvas 실패 → CSS 그리드 배경.
- 구현: Astro 일반 `<script>`(Vite 번들). `is:inline` 금지.

## 5. 레이아웃 — Bento 관측 보드

- 컨테이너 max-width 1120px, 여백 clamp(1rem, 4vw, 2.5rem).
- bento: CSS Grid, `grid-template-columns: repeat(12, 1fr)`, gap 12px. 패널 스팬 12/6/4/3 조합. 모바일(≤768px) 전부 12.
- **패널 해부**: 상단 헤더 = 상태 도트 + mono eyebrow + 우측 `LAST OBSERVED 2026-07-11` 타임스탬프(`--faint`). 본문 = 수치(mono, 대형) + 라벨 + EvidenceLink.
- 라운딩 10px 단일값. 보더 1px `--line`. 그림자 대신 보더+배경 층위로 깊이 표현.

## 6. 카피 톤 — 관측 로그

- 선언이 아니라 **관측 기록** 톤: "~를 자신합니다" ✕ → "30일간 55개국에서 66,307 요청 처리" ○
- 모든 트래픽 수치 옆에 각주 상시: **"요청 수 기준, 사용자 수 아님"** — Footnote 컴포넌트로 구조화(누락 불가).
- 모든 정량 클레임에 EvidenceLink(repo·라이브 URL·로그 근거).
- 헤드라인(R7, 분석 §5): "AI를 프로덕션까지 도달시키는 엔지니어" / EN: "AI-native engineer who ships to production".
- 금지: 커밋 수치 노출, "users/사용자"(트래픽 맥락), GCP·Nginx·Flutter·Tailwind, 6개국어, RWS·Telus, 빅데이터분석기사, 외부 도입·고객·매출.

## 7. 프로필 README SVG 적응 노트

- SMIL 애니메이션만(JS·외부 CSS/폰트 불가 — GitHub camo). 폰트는 `font-family="ui-monospace, monospace"` 시스템 스택.
- 팔레트: 다크 기준 §1 그대로 쓰되, GitHub 라이트 모드 렌더 대비 확인 — 배경을 SVG 내부에서 직접 채운다(투명 배경 금지).
- 커밋 기반 위젯 제거: github-readme-stats 커밋 카드 삭제(top-langs만 유지), contribution snake 삭제.
- metrics SVG의 커밋 수치 → 운영 관측치(요청·차단·마이그레이션·Edge Functions)로 교체.

## 8. 데이터 어댑터 (라이브 교체 예약)

```ts
interface ObservatorySnapshot {
  observedAt: string;            // "2026-07-11" — 화면에 상시 표기
  windowDays: number;            // 30
  totalRequests: number;         // 66307
  countryCount: number;          // 55
  countries: { code: string; lat: number; lon: number; weight: number }[];
  dailyRequests: number[];       // 길이 30, 상대값
  gauges: { id: string; label: { ko: string; en: string }; value: number; max?: number; unit?: string; evidence?: string }[];
}
interface ObservatoryAdapter { load(): Promise<ObservatorySnapshot> | ObservatorySnapshot; }
```

- 현재 구현 = `staticSnapshot` (하드코딩). 추후 Cloudflare Worker 공개 stats API가 생기면 어댑터만 교체.
- `dailyRequests`·`countries.weight`는 시각화용 **상대 분포**(실측 일별 데이터 없음 — 합계만 검증됨). 화면에 개별 일값·국가별 수치를 **표기하지 않는다**(파형·아크의 형태 재료로만 사용, 수치 라벨은 검증된 합계·국가 수만).
