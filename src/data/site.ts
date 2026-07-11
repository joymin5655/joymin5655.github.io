// Portfolio content — single source of truth (bilingual). Signal Observatory v2.
// Every claim here is cross-checked against the verified resume SSOT
// (취업/master/session_summary_report.md). NO unverified tech (no GCP/Nginx/
// Flutter/Tailwind), NO phone number, NO commit-count figures on screen
// (2026-07-11 user decision — the only allowed commit mention is the gitleaks
// scan-scope sentence). Traffic numbers always carry the requests≠users note.

export type Evidence = { label: string; url: string };

export type Panel = {
  eyebrow: string;
  value: string;
  unit?: string;
  label: string;
  span?: 4 | 6 | 8 | 12;
  tone?: 'ok';
  gauge?: boolean;
  evidence?: Evidence;
  chips?: string[];
};

export type Subsystem = {
  eyebrow: string;
  title: string;
  value: string;
  desc: string;
  href: string;
};

export type WorkCard = {
  name: string;
  tag: string;
  blurb: string;
  chips: string[];
  links: Evidence[];
  caseHref?: string;
};

export type DepthRow = { method: string; where: string; evidence: Evidence };

export type CaseStudy = {
  name: string;
  tagline: string;
  overview: string;
  metrics?: { value: string; label: string }[];
  timeline?: { date: string; label: string }[];
  sections: { id: string; title: string; hard: string; solution: string; tech: string[]; lesson: string }[];
  modernTech: { name: string; why: string }[];
  meta: { title: string; description: string };
  links: Evidence[];
};

export type Locale = {
  lang: 'ko' | 'en';
  altHref: string;
  altLabel: string;
  meta: { title: string; description: string };
  nav: { board: string; work: string; depth: string; timeline: string; contact: string };
  observedLabel: string; // "LAST OBSERVED 2026-07-11"
  hero: {
    role: string;
    headline: { before: string; em: string; after: string };
    sub: string;
    live: Evidence;
    metrics: { value: string; label: string }[];
    footnote: string;
    ctas: { label: string; url: string; primary?: boolean }[];
  };
  board: { heading: string; panels: Panel[] };
  work: {
    heading: string;
    lead: string;
    flagship: {
      name: string;
      tag: string;
      blurb: string;
      links: Evidence[];
      caseLabel: string;
      caseHref: string;
      subsystems: Subsystem[];
    };
    cards: WorkCard[];
  };
  depth: { heading: string; lead: string; rows: DepthRow[]; note: string };
  timeline: { heading: string; items: { period: string; title: string; body: string }[]; edu: string };
  contact: { heading: string; lead: string; items: Evidence[] };
};

const GITHUB = 'https://github.com/joymin5655';
const AIRLENS = 'https://airlens.cloud';
const EMAIL = 'mailto:joymin5655@gmail.com';
export const OBSERVED = '2026-07-11';

const STACK_CHIPS = [
  'Python', 'TypeScript', 'SQL',
  'OpenAI GPT-4o', 'Anthropic Claude', 'Model Context Protocol', 'LangChain', 'PyTorch', 'ONNX', 'RAG',
  'FastAPI', 'Docker', 'Supabase', 'GitHub Actions', 'Cloudflare Pages', 'Redis', 'Sentry', 'PostHog',
  'scikit-learn', 'pandas', 'XGBoost', 'GTWR', 'PINN', 'SDID',
  'React 19', 'Vite', 'Three.js',
];

export const site: Record<'ko' | 'en', Locale> = {
  ko: {
    lang: 'ko',
    altHref: '/en/',
    altLabel: 'EN',
    meta: {
      title: '조용민 · AI 에이전트 / 인프라 엔지니어',
      description:
        'AI를 프로덕션까지 도달시키는 엔지니어. 30일 55개국 66,307 요청(사용자 아님)을 처리하는 AirLens와 멀티런타임 거버넌스 하네스 Agent를 단독 구축·운영합니다.',
    },
    nav: { board: '관측', work: 'Work', depth: 'DS Depth', timeline: '여정', contact: '연락처' },
    observedLabel: `LAST OBSERVED ${OBSERVED}`,
    hero: {
      role: 'AI 에이전트 · 인프라 엔지니어 — 조용민',
      headline: { before: 'AI를 ', em: '프로덕션', after: '까지 도달시키는 엔지니어' },
      sub: '기획→모델→인프라→배포→운영 모니터링까지 혼자 끝까지 갑니다. 아래 수치는 전부 실측이며, 근거 링크로 역추적할 수 있습니다.',
      live: { label: 'LIVE · airlens.cloud', url: AIRLENS },
      metrics: [
        { value: '66,307', label: '요청 / 30일 · 55개국*' },
        { value: '296', label: '고위험 작업 차단 · 오탐 0' },
        { value: '121', label: 'DB 마이그레이션' },
      ],
      footnote: `* 요청 수 기준 — 사용자 수가 아닙니다. 최종 관측 ${OBSERVED}.`,
      ctas: [
        { label: 'WORK 보기', url: '#work', primary: true },
        { label: 'GitHub', url: GITHUB },
        { label: '이메일', url: EMAIL },
      ],
    },
    board: {
      heading: '운영 관측 보드',
      panels: [
        {
          eyebrow: 'EDGE RUNTIME',
          value: '35',
          unit: 'Edge Functions',
          label: 'Supabase 위에서 121 마이그레이션 · GitHub Actions 41 파이프라인으로 배포·모니터링 자동화',
          span: 8,
          evidence: { label: 'github.com/joymin5655/AirLens', url: `${GITHUB}/AirLens` },
        },
        {
          eyebrow: 'GOVERNANCE',
          value: '296',
          label: '고위험 작업 차단 · 오탐 0 — 감사 로그 18,000+줄',
          span: 4,
          gauge: true,
          evidence: { label: 'github.com/joymin5655/Agent', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'DATA SOURCES',
          value: '10',
          label: '위성·지상 관측·기상 실데이터 융합 파이프라인',
          span: 4,
          evidence: { label: 'AirLens 데이터 파이프라인', url: `${GITHUB}/AirLens` },
        },
        {
          eyebrow: 'SECURITY SCAN',
          value: '0',
          unit: 'leaks',
          tone: 'ok',
          label: 'gitleaks 전 이력 스캔(1,402커밋 범위) — 시크릿 유출 0',
          span: 4,
          evidence: { label: '다층 시크릿 방어', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'RUNTIMES',
          value: '3',
          unit: 'AI 런타임',
          label: 'Claude Code · Codex · Gemini 단일 정책 제어 — 17 hooks · 블라인드 벤치마크 8/8',
          span: 4,
          evidence: { label: 'Agent 하네스', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'STACK',
          value: '',
          label: '',
          span: 12,
          chips: STACK_CHIPS,
        },
      ],
    },
    work: {
      heading: 'Work — 관측 대상 시스템',
      lead: '프로젝트 개수가 아니라 서브시스템의 깊이로 보여드립니다. 각 카드는 실제로 어려웠던 문제와 해결의 기록으로 연결됩니다.',
      flagship: {
        name: 'AirLens',
        tag: '대기질 인텔리전스 SaaS · 단독 설계·구축·운영 · LIVE',
        blurb:
          '위성·지상 10개 데이터 소스를 통합해 PM2.5를 추정하고, GPT-4o 분석 에이전트로 자연어 질의를 코드·인사이트로 바꾸는 플랫폼. 데이터 파이프라인부터 ML, 3D 글로브 프론트엔드, CI/CD 배포·운영 모니터링까지 혼자 구축해 30일 기준 55개국에서 66,307 요청(사용자 수 아님)을 처리했습니다.',
        links: [
          { label: 'airlens.cloud ↗', url: AIRLENS },
          { label: 'GitHub ↗', url: `${GITHUB}/AirLens` },
        ],
        caseLabel: '케이스스터디 →',
        caseHref: '/projects/airlens',
        subsystems: [
          {
            eyebrow: 'CAUSAL INFERENCE',
            title: 'SDID 정책 효과 분석',
            value: '6 → 53',
            desc: '데이터 함정을 제거해 추정 가능 국가를 확장 — 근거 약한 구간은 "추정 불가"로 정직하게 노출',
            href: '/projects/airlens#sdid',
          },
          {
            eyebrow: 'FORECASTING',
            title: 'TFT 7일 예보',
            value: 'train = serve',
            desc: '랜덤 스텁에 물려 있던 추론 입력을 실 168시간 관측 윈도우로 복원 — 피처 패리티 계약 테스트',
            href: '/projects/airlens#tft',
          },
          {
            eyebrow: 'CAMERA AI',
            title: 'DINOv2 · CORN 서수회귀',
            value: 'ONNX 엣지',
            desc: '사진 한 장으로 PM2.5 추정 — 단일값 대신 불확실성 구간을 함께 노출',
            href: '/projects/airlens#camera',
          },
          {
            eyebrow: 'DATABASE',
            title: 'RLS 정책 정리',
            value: '132 → 6',
            desc: '권한 매트릭스 적대적 검증으로 "누구의 접근도 변하지 않았음"을 증명하며 정리',
            href: '/projects/airlens#rls',
          },
          {
            eyebrow: 'RETRIEVAL',
            title: '하이브리드 RAG',
            value: 'BM25+벡터+RRF',
            desc: 'pgvector 하이브리드 검색 + Haiku 재랭킹으로 분석 챗봇의 검색 품질 개선',
            href: `${GITHUB}/AirLens`,
          },
          {
            eyebrow: 'INFRA / CI',
            title: '배포·관측 자동화',
            value: '41 pipelines',
            desc: 'GitHub Actions 41개 — 배포·Lighthouse·시각 회귀·스토리지 비용 모니터링',
            href: `${GITHUB}/AirLens`,
          },
        ],
      },
      cards: [
        {
          name: 'Agent',
          tag: '멀티런타임 거버넌스 하네스 · MIT OSS',
          blurb:
            'Claude Code · Codex · Gemini 세 런타임을 단일 YAML 정책으로 제어하는 벤더 중립 하네스. 고위험 작업 296건을 실제로 차단(오탐 0)했고, 블라인드 벤치마크에서 8/8 버그를 검출했습니다. gitleaks + pre-commit + pre-push + CI 다층 시크릿 방어로 "정책을 코드로" 강제합니다.',
          chips: ['Policy-as-Code', 'Portable Hooks', 'gitleaks', 'MIT OSS', 'Claude Code Plugin'],
          links: [{ label: 'GitHub ↗', url: `${GITHUB}/Agent` }],
          caseHref: '/projects/agent',
        },
        {
          name: '바른자세 지킴이',
          tag: 'KT AIVLE 빅프로젝트 · 6인 팀',
          blurb:
            '웹캠과 MediaPipe Holistic 기반 실시간 자세교정 SaaS. 6인 팀에서 프론트엔드를 약 80% 주도해 실시간 모니터링·통계 대시보드·챗봇 UI를 구축하고, 팀의 XGBoost 자세 분류기와 LangChain RAG 챗봇을 통합했습니다. Collaboration상(KT × 고용노동부) 수상.',
          chips: ['Django', 'MediaPipe Holistic', 'Chart.js', 'XGBoost', 'LangChain RAG'],
          links: [],
        },
      ],
    },
    depth: {
      heading: 'Data Science Depth',
      lead: '노트북 데모가 아니라, 55개국 실트래픽 서비스 안에서 운용 중인 방법론입니다.',
      rows: [
        {
          method: 'SDID 합성 이중차분',
          where: '국가 대기질 정책 효과 인과추론 — 데이터 함정 제거로 추정 가능 국가 6 → 53',
          evidence: { label: 'CASE', url: '/projects/airlens#sdid' },
        },
        {
          method: 'Temporal Fusion Transformer',
          where: '7일 PM2.5 예보 — train/serve 피처 패리티 복원 · 결측 시 정직한 skip',
          evidence: { label: 'CASE', url: '/projects/airlens#tft' },
        },
        {
          method: 'CORN 서수회귀 · DINOv2',
          where: '사진 기반 PM2.5 추정 — ONNX 엣지 추론, 불확실성 구간 노출',
          evidence: { label: 'CASE', url: '/projects/airlens#camera' },
        },
        {
          method: 'GTWR-XGBoost',
          where: '시공간 가중 PM2.5 추정 엔진',
          evidence: { label: 'REPO', url: `${GITHUB}/AirLens` },
        },
        {
          method: 'PINN',
          where: '물리 제약을 결합한 모델링 엔진',
          evidence: { label: 'REPO', url: `${GITHUB}/AirLens` },
        },
        {
          method: '하이브리드 RAG (BM25 + 벡터 + RRF)',
          where: 'pgvector 검색 + Haiku 재랭킹 — 분석 챗봇 검색 품질',
          evidence: { label: 'REPO', url: `${GITHUB}/AirLens` },
        },
        {
          method: 'Quantile Regression · Glass-box',
          where: '모든 ML 출력에 p10–p90 불확실성과 DQSS 품질 배지를 상시 노출',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
      ],
      note: 'Healthcare Data Science 복수전공(GPA 4.44/4.5) 위에서, 프로덕션 데이터로 방법론을 검증합니다.',
    },
    timeline: {
      heading: '여정',
      items: [
        {
          period: '2023.01 – 05',
          title: '로지체인 · 기획 인턴',
          body: '온디바이스 AI·비전 분석 솔루션 신규 사업 제안서 작성. 구조·시각 개선 제안이 채택되어 제안 통과에 기여 — 기획만으로는 닿지 못하는 "구현"의 벽을 느낀 시점.',
        },
        {
          period: '2023.08 – 2024.01',
          title: 'KT AIVLE School · AI 개발자 트랙 (840h)',
          body: '빅프로젝트에서 프론트엔드를 주도했으나 배포 단계에서 실패. "아무리 좋은 모델도 배포되지 않으면 의미가 없다" — 인프라·CI/CD를 파고든 전환점.',
        },
        {
          period: '2024.07 – 2025.01',
          title: '에듀인소프트 · 교육 운영·기획',
          body: '데이터 자격증(SQLD·ADsP) 과정 운영·진도·정산 행정 + 과정 제안·기획 보조.',
        },
        {
          period: '2024.08 – 2025',
          title: 'Sigma · Welodata (Google) · AI 데이터 QA·평가',
          body: '한국어 음성 전사·언어 QA, 광고·검색 적합성 평가 — AI 학습 데이터 파이프라인 (~8개월).',
        },
        {
          period: '2026.03 – 현재',
          title: 'AirLens 제품 개발 (단독) · Agent 하네스',
          body: '캡스톤 대기질 연구를 상용 SaaS로 고도화 — GPT-4o 에이전트 탑재, 30일 55개국에서 66,307 요청(사용자 수 아님) 처리. 멀티런타임 거버넌스 하네스 Agent 병행 운영.',
        },
      ],
      edu: '학력 — <b>강릉원주대학교 · 헬스케어 데이터사이언스 복수전공</b> GPA 4.44 / 4.5 (주전공 산업경영공학)',
    },
    contact: {
      heading: '연락처',
      lead: '협업·채용 문의는 이메일로 편하게 연락 주세요.',
      items: [
        { label: 'joymin5655@gmail.com', url: EMAIL },
        { label: 'github.com/joymin5655', url: GITHUB },
        { label: 'airlens.cloud', url: AIRLENS },
      ],
    },
  },

  en: {
    lang: 'en',
    altHref: '/',
    altLabel: 'KO',
    meta: {
      title: 'Yongmin Cho · AI Agent / Infrastructure Engineer',
      description:
        'AI-native engineer who ships to production. Solo-builds and operates AirLens — 66,307 requests (not users) across 55 countries in 30 days — and the multi-runtime governance harness Agent.',
    },
    nav: { board: 'Observatory', work: 'Work', depth: 'DS Depth', timeline: 'Journey', contact: 'Contact' },
    observedLabel: `LAST OBSERVED ${OBSERVED}`,
    hero: {
      role: 'AI Agent · Infrastructure Engineer — Yongmin Cho',
      headline: { before: 'AI-native engineer who ships to ', em: 'production', after: '' },
      sub: 'Planning → model → infra → deploy → operations monitoring, end to end and solo. Every number below is measured, and traceable through evidence links.',
      live: { label: 'LIVE · airlens.cloud', url: AIRLENS },
      metrics: [
        { value: '66,307', label: 'requests / 30d · 55 countries*' },
        { value: '296', label: 'high-risk ops blocked · 0 false positives' },
        { value: '121', label: 'DB migrations' },
      ],
      footnote: `* Requests, not users. Last observed ${OBSERVED}.`,
      ctas: [
        { label: 'VIEW WORK', url: '#work', primary: true },
        { label: 'GitHub', url: GITHUB },
        { label: 'Email', url: EMAIL },
      ],
    },
    board: {
      heading: 'Operations Board',
      panels: [
        {
          eyebrow: 'EDGE RUNTIME',
          value: '35',
          unit: 'Edge Functions',
          label: 'Runs on Supabase — 121 migrations · 41 GitHub Actions pipelines automate deploy & monitoring',
          span: 8,
          evidence: { label: 'github.com/joymin5655/AirLens', url: `${GITHUB}/AirLens` },
        },
        {
          eyebrow: 'GOVERNANCE',
          value: '296',
          label: 'high-risk operations blocked · 0 false positives — 18,000+ audit-log lines',
          span: 4,
          gauge: true,
          evidence: { label: 'github.com/joymin5655/Agent', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'DATA SOURCES',
          value: '10',
          label: 'satellite · ground-station · weather real-data fusion pipeline',
          span: 4,
          evidence: { label: 'AirLens data pipeline', url: `${GITHUB}/AirLens` },
        },
        {
          eyebrow: 'SECURITY SCAN',
          value: '0',
          unit: 'leaks',
          tone: 'ok',
          label: 'gitleaks full-history scan (1,402-commit scope) — zero secret leaks',
          span: 4,
          evidence: { label: 'multi-layer secret defense', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'RUNTIMES',
          value: '3',
          unit: 'AI runtimes',
          label: 'Claude Code · Codex · Gemini under one policy — 17 hooks · blind benchmark 8/8',
          span: 4,
          evidence: { label: 'Agent harness', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'STACK',
          value: '',
          label: '',
          span: 12,
          chips: STACK_CHIPS,
        },
      ],
    },
    work: {
      heading: 'Work — Systems Under Observation',
      lead: 'Depth over count: each card links to a record of a real hard problem and how it was solved.',
      flagship: {
        name: 'AirLens',
        tag: 'Air-quality intelligence SaaS · designed, built & operated solo · LIVE',
        blurb:
          'Fuses 10 satellite & ground data sources to estimate PM2.5 and turns natural-language questions into code and insight via a GPT-4o analysis agent. Built solo — data pipeline, ML, a 3D-globe frontend, CI/CD and operations monitoring — serving 66,307 requests (not users) across 55 countries in 30 days.',
        links: [
          { label: 'airlens.cloud ↗', url: AIRLENS },
          { label: 'GitHub ↗', url: `${GITHUB}/AirLens` },
        ],
        caseLabel: 'Case study →',
        caseHref: '/en/projects/airlens',
        subsystems: [
          {
            eyebrow: 'CAUSAL INFERENCE',
            title: 'SDID policy-impact analysis',
            value: '6 → 53',
            desc: 'Removed a data trap to expand estimable countries — weak cases surface honestly as "not estimable"',
            href: '/en/projects/airlens#sdid',
          },
          {
            eyebrow: 'FORECASTING',
            title: 'TFT 7-day forecast',
            value: 'train = serve',
            desc: 'Rewired inference from random stubs to a real 168-hour observation window — feature-parity contract tests',
            href: '/en/projects/airlens#tft',
          },
          {
            eyebrow: 'CAMERA AI',
            title: 'DINOv2 · CORN ordinal regression',
            value: 'ONNX edge',
            desc: 'PM2.5 from a single photo — exposing an uncertainty band instead of a single value',
            href: '/en/projects/airlens#camera',
          },
          {
            eyebrow: 'DATABASE',
            title: 'RLS policy consolidation',
            value: '132 → 6',
            desc: 'Adversarial access-matrix verification proved no principal gained or lost access',
            href: '/en/projects/airlens#rls',
          },
          {
            eyebrow: 'RETRIEVAL',
            title: 'Hybrid RAG',
            value: 'BM25+vector+RRF',
            desc: 'pgvector hybrid search + Haiku re-ranking for the analysis chatbot',
            href: `${GITHUB}/AirLens`,
          },
          {
            eyebrow: 'INFRA / CI',
            title: 'Deploy & observability automation',
            value: '41 pipelines',
            desc: '41 GitHub Actions — deploy, Lighthouse, visual regression, storage-cost monitoring',
            href: `${GITHUB}/AirLens`,
          },
        ],
      },
      cards: [
        {
          name: 'Agent',
          tag: 'Multi-runtime governance harness · MIT OSS',
          blurb:
            'A vendor-neutral harness controlling Claude Code · Codex · Gemini under a single YAML policy. Blocked 296 high-risk operations in real use (0 false positives) and detected 8/8 bugs in a blind benchmark. Multi-layer secret defense (gitleaks + pre-commit + pre-push + CI) enforces policy-as-code.',
          chips: ['Policy-as-Code', 'Portable Hooks', 'gitleaks', 'MIT OSS', 'Claude Code Plugin'],
          links: [{ label: 'GitHub ↗', url: `${GITHUB}/Agent` }],
          caseHref: '/en/projects/agent',
        },
        {
          name: 'Posture Keeper',
          tag: 'KT AIVLE Big Project · 6-person team',
          blurb:
            'A real-time posture-correction SaaS using webcam + MediaPipe Holistic. Led ~80% of the frontend on a 6-person team — real-time monitoring, statistics dashboard, chatbot UI — integrating the team’s XGBoost posture classifier and LangChain RAG chatbot. Won the Collaboration Award (KT × Ministry of Employment & Labor).',
          chips: ['Django', 'MediaPipe Holistic', 'Chart.js', 'XGBoost', 'LangChain RAG'],
          links: [],
        },
      ],
    },
    depth: {
      heading: 'Data Science Depth',
      lead: 'Not notebook demos — methodologies running inside a live service with traffic from 55 countries.',
      rows: [
        {
          method: 'Synthetic DiD (SDID)',
          where: 'Causal inference on national air-quality policy — estimable countries 6 → 53 after removing a data trap',
          evidence: { label: 'CASE', url: '/en/projects/airlens#sdid' },
        },
        {
          method: 'Temporal Fusion Transformer',
          where: '7-day PM2.5 forecast — restored train/serve feature parity · honest skip on missing data',
          evidence: { label: 'CASE', url: '/en/projects/airlens#tft' },
        },
        {
          method: 'CORN ordinal regression · DINOv2',
          where: 'PM2.5 from photos — ONNX edge inference with an exposed uncertainty band',
          evidence: { label: 'CASE', url: '/en/projects/airlens#camera' },
        },
        {
          method: 'GTWR-XGBoost',
          where: 'Spatio-temporally weighted PM2.5 estimation engine',
          evidence: { label: 'REPO', url: `${GITHUB}/AirLens` },
        },
        {
          method: 'PINN',
          where: 'Physics-constrained modeling engine',
          evidence: { label: 'REPO', url: `${GITHUB}/AirLens` },
        },
        {
          method: 'Hybrid RAG (BM25 + vector + RRF)',
          where: 'pgvector retrieval + Haiku re-ranking — analysis-chatbot search quality',
          evidence: { label: 'REPO', url: `${GITHUB}/AirLens` },
        },
        {
          method: 'Quantile Regression · Glass-box',
          where: 'Every ML output always exposes p10–p90 uncertainty and a DQSS data-quality badge',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
      ],
      note: 'Grounded in a Healthcare Data Science double major (GPA 4.44/4.5), validated on production data.',
    },
    timeline: {
      heading: 'Journey',
      items: [
        {
          period: '2023.01 – 05',
          title: 'Logichain · Planning Intern',
          body: 'Authored new-business proposals for on-device AI / vision solutions; structural and visual improvements were adopted, contributing to proposal approval — where I first hit the wall between planning and building.',
        },
        {
          period: '2023.08 – 2024.01',
          title: 'KT AIVLE School · AI Developer Track (840h)',
          body: 'Led the frontend on the big project but failed at the deployment step. "No matter how good the model, it’s meaningless if it never ships" — the turning point that drove me into infrastructure and CI/CD.',
        },
        {
          period: '2024.07 – 2025.01',
          title: 'Eduinsoft · Education Planning & Operations',
          body: 'Ran data-certification courses (SQLD · ADsP): student progress & settlement administration, plus proposal and planning support.',
        },
        {
          period: '2024.08 – 2025',
          title: 'Sigma · Welodata (Google) · AI Data QA & Evaluation',
          body: 'Korean speech transcription & linguistic QA, ads/search relevance evaluation — AI training-data pipeline (~8 months).',
        },
        {
          period: '2026.03 – Present',
          title: 'AirLens (solo) · Agent harness',
          body: 'Grew a capstone air-quality study into a production SaaS — GPT-4o agent onboard, serving 66,307 requests (not users) across 55 countries in 30 days. Runs the multi-runtime governance harness Agent in parallel.',
        },
      ],
      edu: 'Education — <b>Gangneung-Wonju National University · Healthcare Data Science (Double Major)</b> GPA 4.44 / 4.5 (Major: Industrial Engineering)',
    },
    contact: {
      heading: 'Contact',
      lead: 'For collaboration or hiring, email is the best way to reach me.',
      items: [
        { label: 'joymin5655@gmail.com', url: EMAIL },
        { label: 'github.com/joymin5655', url: GITHUB },
        { label: 'airlens.cloud', url: AIRLENS },
      ],
    },
  },
};

// ── Case studies (challenge → solution → modern tech). Mined from real repo /
// tech-verification docs / second-brain insights. No commit hashes or internal
// paths exposed; no commit-count figures (2026-07-11 decision). Harness details
// are qualitative — fact-verifier-checked against the resume SSOT.
export const caseStudies: Record<
  'ko' | 'en',
  {
    ui: {
      back: string;
      home: string;
      hard: string;
      solution: string;
      tech: string;
      lesson: string;
      overview: string;
      modern: string;
      footnote: string;
    };
    items: Record<string, CaseStudy>;
  }
> = {
  ko: {
    ui: {
      back: '← 홈',
      home: '← 홈',
      hard: '어려웠던 점',
      solution: '해결',
      tech: '적용 기술',
      lesson: '배운 점',
      overview: '개요',
      modern: '중간에 반영한 최신 기술',
      footnote: `트래픽 수치는 요청 수 기준(사용자 수 아님) · 최종 관측 ${OBSERVED}`,
    },
    items: {
      airlens: {
        name: 'AirLens',
        tagline: '대기질 인텔리전스 SaaS · 단독 개발 · 라이브',
        overview:
          'AirLens는 위성·지상 10여 개 데이터 소스를 통합해 PM2.5를 추정하고, 정책 효과를 인과추론으로 분석하며, GPT-4o 에이전트로 자연어 질의를 코드·인사이트로 바꾸는 대기질 인텔리전스 플랫폼입니다. 데이터 파이프라인부터 ML·프론트엔드·배포까지 혼자 구축해 55개국에서 라이브로 운영하고 있습니다. 가장 까다로웠던 문제들과 해결 방식, 그리고 진행 중 도입한 최신 기술입니다.',
        metrics: [
          { value: '3.5개월', label: '2026-03 → 06 구축' },
          { value: '10', label: '데이터 소스' },
          { value: '5', label: 'ML 엔진' },
          { value: '35', label: 'Edge Functions' },
          { value: '121', label: 'DB 마이그레이션' },
          { value: '55개국', label: '66,307 요청 / 30일' },
        ],
        timeline: [
          { date: '2026-03', label: '개발 시작 · PostHog·Sentry 관측 도입' },
          { date: '2026-04', label: 'DINOv2 → ONNX 내보내기 (Camera AI 엣지 추론)' },
          { date: '2026-05', label: 'npm workspaces 모노레포 마이그레이션 · TFT ONNX 추론 배선' },
          { date: '2026-06', label: 'pgvector 하이브리드 RAG + Haiku 재랭킹 · TFT 실데이터 배선 · SDID 6→53 · GPT-4o Edge' },
        ],
        sections: [
          {
            id: 'sdid',
            title: '정책 효과 분석이 "데이터의 함정"에 빠진 문제 (SDID 인과추론)',
            hard:
              '국가별 대기질 정책의 효과를 합성 이중차분(SDID)으로 추정했는데, 처음엔 6개국에서만 결과가 나왔고 그중 통계적으로 유의한 건 1개뿐이었습니다. 원인을 추적하니 알고리즘이 아니라 데이터의 함정이었습니다 — 한 나라의 시계열이 중간에 서로 다른 출처(편향이 있는 위성 재분석 데이터 ↔ 지상 관측값)로 바뀌며 생긴 인공적인 "점프"를, SDID가 정책의 효과로 잘못 해석하고 있었습니다.',
            solution:
              '출처를 단일 소스로 통일해 패널을 재구축했습니다(편향이 일정하면 차분 과정에서 상쇄됨). 희소한 데이터에서도 추정이 안정되도록 시간 가중치에 정규화를 더했고, 절대 오차 대신 사전 수준으로 정규화한 적합 게이트로 오염도가 다른 국가들을 공평하게 다뤘습니다. 마지막으로 표준오차가 0에 가깝게 반올림돼 "거짓 확신"으로 보고되는 경우를 잡아내는 정직성 게이트를 넣었습니다.',
            tech: ['합성 이중차분(SDID)', '시간가중 정규화', 'Glass-box 정직성 게이트'],
            lesson:
              '추정 가능한 국가가 6개에서 53개로 늘었고, 근거가 약한 구간은 숫자를 지어내는 대신 "추정 불가" 상태로 노출합니다. 모델이 그럴듯한 답을 내도 그것이 "신호"인지 "데이터 아티팩트"인지 먼저 의심해야 하며, 정확도보다 정직함(불확실성 노출)이 신뢰를 만든다는 걸 배웠습니다.',
          },
          {
            id: 'tft',
            title: '학습과 추론이 어긋난 숨은 버그 (TFT 예보)',
            hard:
              '7일 PM2.5 예보에 Temporal Fusion Transformer(TFT)를 썼는데, 인코더에 들어가는 과거 관측 컨텍스트가 실제 데이터가 아니라 랜덤 난수 스텁으로 배선돼 있었습니다. 학습은 실데이터로 했지만 추론은 가짜 입력으로 하고 있어서 프로덕션 예보가 현실과 단절돼 있었습니다(train ≠ serve).',
            solution:
              '실제 168시간 관측 윈도우를 도시 단위로 끌어오는 리졸버를 만들고, 학습에 쓴 피처 변환을 추론에서도 똑같이 미러링했습니다. 데이터가 결측이거나 오래됐으면 숫자를 만들어내는 대신 해당 도시를 건너뛰게 했고, 9가지 케이스 테스트로 입력 계약을 고정했습니다.',
            tech: ['Temporal Fusion Transformer', 'train/serve 피처 패리티', '결측 시 정직한 skip'],
            lesson:
              '학습 파이프라인과 서빙 파이프라인이 분리돼 있으면 둘이 미묘하게 어긋나는 버그는 지표상 잘 드러나지 않습니다. 입력이 어디서 오는지 끝까지 추적하는 습관이 필요합니다.',
          },
          {
            id: 'rls',
            title: 'RLS 권한 정책 폭증 정리 (132 → 6)',
            hard:
              'Supabase(Postgres) 성능 어드바이저가 24개 테이블에 걸쳐 중복된 permissive RLS 정책 132개를 경고했습니다. 같은 역할·동작에 정책이 여러 개면 OR로 모두 평가돼 성능 부담과 불필요한 공격면이 생깁니다. 특히 service_role용 정책 14개는 service_role이 애초에 RLS를 우회하기 때문에 실제로는 아무것도 막지 못하고 있었습니다.',
            solution:
              '(1) 무의미한 service_role 정책 삭제, (2) 중복 SELECT 정책 병합, (3) 관리자 정책을 동작별로 분리했습니다. 그리고 24개 테이블 전부를 "누가 무엇에 접근 가능한가" 매트릭스로 적대적 검증해, 어느 사용자도 권한이 늘거나 줄지 않았음을 확인했습니다.',
            tech: ['Supabase RLS', '권한 매트릭스 적대적 검증', 'pgvector 하이브리드 RAG'],
            lesson:
              '보안 정책은 "많이"가 아니라 "정확히"입니다. 정리하면서도 단 한 명의 권한도 바뀌지 않았음을 증명할 수 있어야 합니다.',
          },
          {
            id: 'camera',
            title: '사진 한 장으로 PM2.5 추정 (Camera AI)',
            hard:
              '사진으로 대기질을 추정하려면 두 가지가 까다로웠습니다. (1) "정확히 38.2 µg/m³"라는 절대값보다 "이 정도로 나쁨"이라는 순서가 더 자연스럽고 견고하며, (2) 수억 파라미터의 비전 트랜스포머를 서버가 아니라 브라우저·모바일 엣지에서 돌려야 했습니다.',
            solution:
              'DINOv2 파운데이션 모델을 백본으로 쓰고, 분류도 회귀도 아닌 CORN 서수회귀 헤드로 "순서"를 학습시켰습니다. 학습한 모델은 ONNX로 내보내 엣지에서 추론하고, glass-box 원칙대로 단일 값이 아니라 불확실성 구간을 함께 노출합니다.',
            tech: ['DINOv2', 'CORN 서수회귀', 'ONNX Runtime', 'Glass-box 불확실성'],
            lesson:
              '문제의 본질(절대값이 아니라 순서)에 맞는 모델 형식을 고르고, 추론이 일어날 위치(엣지)까지 설계에 넣어야 합니다.',
          },
        ],
        modernTech: [
          { name: 'React 18 → 19', why: '컴파일러가 ref 보일러플레이트를 줄여주지만, 엄격해진 호이스팅 규칙으로 478개의 TS2786 타입 에러가 터졌고 컴포넌트 경계 재정렬·훅 추출로 해소.' },
          { name: 'pgvector 하이브리드 RAG', why: '키워드(BM25) + 벡터 검색을 RRF로 융합해 RAG 챗봇의 검색 품질을 끌어올림.' },
          { name: 'DINOv2 → ONNX', why: '사진으로 PM2.5를 추정하는 비전 트랜스포머를 ONNX로 경량화해 엣지 추론.' },
          { name: 'GPT-4o · Anthropic Haiku', why: '분석 에이전트와 Edge Function 다국어 요약에 적용 — Edge 자격증명 제약에 맞춰 모델을 선택.' },
          { name: 'Glass-box 원칙', why: '모든 ML 출력에 p10~p90 불확실성과 데이터 품질 배지(DQSS)를 항상 노출.' },
        ],
        meta: {
          title: 'AirLens 케이스스터디 · 조용민',
          description: 'SDID 인과추론 데이터 함정, TFT train≠serve 버그, RLS 132→6 — AirLens에서 어려웠던 점과 해결, 적용한 최신 기술.',
        },
        links: [
          { label: 'airlens.cloud', url: AIRLENS },
          { label: 'GitHub', url: `${GITHUB}/AirLens` },
        ],
      },
      agent: {
        name: 'Agent',
        tagline: '멀티런타임 에이전트 거버넌스 하네스 · Claude Code 플러그인',
        overview:
          'Agent는 Claude Code·Codex·Gemini 세 AI 런타임을 하나의 정책으로 제어하는 멀티런타임 거버넌스 하네스입니다. "정책을 코드로" 강제해, 어떤 런타임을 쓰든 같은 보안·안전 규칙이 작동하게 만드는 것이 목표였습니다. 가장 까다로웠던 세 가지 문제입니다.',
        metrics: [
          { value: '296', label: '고위험 작업 차단' },
          { value: '0', label: '오탐' },
          { value: '8/8', label: '블라인드 벤치마크 버그 검출' },
          { value: '17', label: 'hooks' },
          { value: '3', label: '런타임 어댑터' },
          { value: '18,000+', label: '감사 로그 줄' },
        ],
        sections: [
          {
            id: 'hooks',
            title: '런타임마다 다른 훅을 하나로 추상화',
            hard:
              'Claude Code·Codex·Gemini는 도구 호출을 가로채는 훅의 이벤트 스키마와 생명주기가 제각각입니다. 추상화가 없으면 같은 보안 훅을 런타임마다 복제해야 하고, 버그를 고치면 여러 곳에서 회귀가 납니다.',
            solution:
              'stdin으로 이벤트를 받아 stdout으로 결정을 내는 canonical JSON 훅 프로토콜을 단일 진실원천으로 정의하고, 런타임별 네이티브 이벤트를 이 표준형으로 변환하는 벤더 어댑터 3개를 만들었습니다. 핵심 훅 로직은 한 벌만 유지됩니다. 세 런타임 모두 secrets 디렉터리 접근은 차단하고 무해한 명령은 허용하는 동일 동작을 케이스로 검증했습니다.',
            tech: ['Canonical JSON 프로토콜', '어댑터 패턴', '훅 기반 자동화'],
            lesson:
              '이질적인 도구를 다룰 땐 공통 프로토콜을 진실원천으로 두고 가장자리에서만 변환해야 핵심 로직의 중복이 사라집니다.',
          },
          {
            id: 'locks',
            title: '여러 에이전트가 같은 자원을 동시에 건드리는 레이스',
            hard:
              'Claude·Codex·Gemini를 worktree별로 병렬 실행하면, 셋이 동시에 같은 프로덕션 자원(DB 마이그레이션·배포)을 점유하려다 레이스 컨디션으로 마이그레이션이 꼬이거나 중복 배포가 날 수 있습니다.',
            solution:
              '파일 기반 JSON 락을 원자적으로(flock + 임시파일 + rename) 기록하고, PreToolUse 훅이 자원 소유권을 확인해 다른 세션이 점유 중이면 거부하게 했습니다. 5분 주기 heartbeat와 죽은 PID·30분 초과 세션의 자동 GC로 좀비 락을 방지했고, 상태 어휘는 Anthropic Agent Teams 프리미티브에 맞췄습니다.',
            tech: ['원자적 JSON 락', 'heartbeat / stale GC', 'git worktree 조율'],
            lesson:
              '분산 협업에선 "누가 무엇을 소유했는가"를 원자적으로 관리하고, 죽은 세션을 스스로 회수하는 장치가 반드시 필요합니다.',
          },
          {
            id: 'secrets',
            title: '스캐너가 놓친 시크릿 (defense-in-depth)',
            hard:
              'gitleaks 같은 시크릿 스캐너는 "알려진 형식"만 잡습니다. 실제로 NVIDIA NIM API 키 형식(nvapi-)은 기본 룰셋에 없어 그대로 빠져나갔고 수동 grep으로 여러 곳에서 발견됐습니다. "스캐너가 조용하다"는 건 "시크릿이 없다"가 아니라 "형식을 모른다"는 뜻이었습니다.',
            solution:
              'nvapi- 커스텀 룰을 추가하되 base 룰셋에 넣어 모든 프로젝트로 전파했고, 단일 스캐너에 의존하지 않도록 pre-commit·pre-push diff 스캔·MCP 콘텐츠 스캔·CI까지 다층으로 깔았습니다. 한 층이 놓쳐도 다른 층이 잡습니다.',
            tech: ['gitleaks 커스텀 룰', 'defense-in-depth', 'policy-as-code'],
            lesson:
              '단일 도구의 침묵을 신뢰하지 마라 — 중복된 방어 레이어가 자동화가 놓치는 빈틈을 메웁니다. (이 교훈은 제 세컨드 브레인에 인사이트 노드로 증류해 두었습니다.)',
          },
        ],
        modernTech: [
          { name: 'Model Context Protocol (MCP)', why: '표준화된 도구 인터페이스로 런타임 간 이식성을 확보.' },
          { name: 'Claude Code 플러그인 패키징', why: '`/plugin install` 한 번으로 프로젝트마다 복사 없이 설치(v0.2.0).' },
          { name: 'Policy-as-Code', why: '위험 영역을 YAML로 선언해 코드 변경 없이 강제하고, 자동 배포 게이트가 위험 시 중단.' },
        ],
        meta: {
          title: 'Agent 케이스스터디 · 조용민',
          description: '크로스런타임 훅 추상화, 멀티세션 락, 스캐너가 놓친 시크릿 방어 — Agent 하네스에서 어려웠던 점과 해결, 적용한 최신 기술.',
        },
        links: [{ label: 'GitHub', url: `${GITHUB}/Agent` }],
      },
    },
  },

  en: {
    ui: {
      back: '← Home',
      home: '← Home',
      hard: 'The hard part',
      solution: 'How I solved it',
      tech: 'Tech applied',
      lesson: 'What I learned',
      overview: 'Overview',
      modern: 'Modern tech adopted along the way',
      footnote: `Traffic figures are requests, not users · last observed ${OBSERVED}`,
    },
    items: {
      airlens: {
        name: 'AirLens',
        tagline: 'Air-quality intelligence SaaS · Solo · Live',
        overview:
          'AirLens fuses 10 satellite & ground data sources to estimate PM2.5, analyzes policy impact via causal inference, and turns natural-language questions into code and insight through a GPT-4o agent. I built it solo — from data pipeline to ML, frontend, and deployment — and run it live across 55 countries. Here are the hardest problems, how I solved them, and the modern tech I adopted along the way.',
        metrics: [
          { value: '3.5 mo', label: 'built 2026-03 → 06' },
          { value: '10', label: 'data sources' },
          { value: '5', label: 'ML engines' },
          { value: '35', label: 'Edge Functions' },
          { value: '121', label: 'DB migrations' },
          { value: '55', label: 'countries · 66,307 req/30d' },
        ],
        timeline: [
          { date: '2026-03', label: 'Development start · PostHog & Sentry observability' },
          { date: '2026-04', label: 'DINOv2 → ONNX export (Camera AI edge inference)' },
          { date: '2026-05', label: 'npm workspaces monorepo migration · TFT ONNX inference wiring' },
          { date: '2026-06', label: 'pgvector hybrid RAG + Haiku re-ranking · TFT real-data wiring · SDID 6→53 · GPT-4o Edge' },
        ],
        sections: [
          {
            id: 'sdid',
            title: 'When policy-impact analysis fell into a “data trap” (SDID causal inference)',
            hard:
              'I estimated the effect of national air-quality policies with synthetic difference-in-differences (SDID). At first only 6 countries produced a result, and just one was statistically significant. The root cause wasn’t the algorithm — it was the data: a country’s time series switched mid-stream between incompatible sources (biased satellite reanalysis ↔ ground observations), and SDID was misreading that artificial “jump” as a policy effect.',
            solution:
              'I rebuilt the panel from a single consistent source (a constant bias cancels under differencing), added regularization to the time weights so estimation stays stable on sparse panels, and replaced the absolute-error fit gate with one normalized to pre-period level so high- and low-pollution countries are treated fairly. Finally I added an honesty gate that catches standard errors rounding to ~0 and reports them as “false precision.”',
            tech: ['Synthetic DiD (SDID)', 'Regularized time weights', 'Glass-box honesty gate'],
            lesson:
              'Estimable countries went from 6 to 53, and weakly-supported cases surface as “not estimable” instead of fabricated numbers. Even when a model gives a plausible answer, you have to ask first whether it’s signal or a data artifact — and honesty (exposing uncertainty) builds more trust than raw accuracy.',
          },
          {
            id: 'tft',
            title: 'A hidden train ≠ serve bug (TFT forecasting)',
            hard:
              'The 7-day PM2.5 forecast used a Temporal Fusion Transformer (TFT), but the encoder’s historical-observation context was wired to random-noise stubs instead of real data. Training used real data while inference used fake input — so production forecasts were disconnected from reality.',
            solution:
              'I built a resolver that pulls a real 168-hour observation window per city, mirroring the exact feature transforms used in training. If data is missing or stale, it skips that city rather than fabricating a number, and a 9-case test suite locks the input contract.',
            tech: ['Temporal Fusion Transformer', 'train/serve feature parity', 'honest skip on missing data'],
            lesson:
              'When training and serving pipelines are separate, subtle mismatches rarely show up in the metrics. You have to trace where every input actually comes from.',
          },
          {
            id: 'rls',
            title: 'Taming RLS policy sprawl (132 → 6)',
            hard:
              'Supabase’s (Postgres) performance advisor flagged 132 redundant permissive RLS policies across 24 tables. Multiple policies for the same role/action are OR-evaluated per row — a performance tax and unnecessary attack surface. In particular, 14 service_role policies gated nothing, because service_role bypasses RLS by design.',
            solution:
              '(1) dropped the meaningless service_role policies, (2) merged duplicate SELECT policies, (3) split admin policies per action — then adversarially verified all 24 tables with a “who can access what” matrix to prove no principal gained or lost access.',
            tech: ['Supabase RLS', 'adversarial access matrix', 'pgvector hybrid RAG'],
            lesson:
              'Security policy is about being precise, not abundant. Even while consolidating, you must be able to prove not a single user’s access changed.',
          },
          {
            id: 'camera',
            title: 'Estimating PM2.5 from a single photo (Camera AI)',
            hard:
              'Estimating air quality from a photo was tricky for two reasons: (1) an ordering ("this bad") is more natural and robust than an absolute "38.2 µg/m³", and (2) a vision transformer with hundreds of millions of parameters had to run on the browser/mobile edge, not a server.',
            solution:
              'I used a DINOv2 foundation model as the backbone with a CORN ordinal-regression head — neither pure classification nor regression — to learn the ordering, exported it to ONNX for edge inference, and exposed an uncertainty band rather than a single value, per the glass-box principle.',
            tech: ['DINOv2', 'CORN ordinal regression', 'ONNX Runtime', 'Glass-box uncertainty'],
            lesson:
              'Pick a model formulation that matches the true nature of the problem (ordering, not an absolute value), and design for where inference actually runs (the edge).',
          },
        ],
        modernTech: [
          { name: 'React 18 → 19', why: 'The compiler removes ref boilerplate, but stricter hoisting surfaced 478 TS2786 type errors — resolved by reordering component boundaries and extracting hooks.' },
          { name: 'pgvector hybrid RAG', why: 'Fused keyword (BM25) + vector search via RRF to raise the RAG chatbot’s retrieval quality.' },
          { name: 'DINOv2 → ONNX', why: 'Exported the vision transformer that estimates PM2.5 from photos to ONNX for edge inference.' },
          { name: 'GPT-4o · Anthropic Haiku', why: 'Used for the analysis agent and multilingual Edge Function summaries — model chosen to fit Edge credential constraints.' },
          { name: 'Glass-box principle', why: 'Every ML output always exposes p10–p90 uncertainty and a data-quality badge (DQSS).' },
        ],
        meta: {
          title: 'AirLens Case Study · Yongmin Cho',
          description: 'SDID data-source trap, a TFT train≠serve bug, RLS 132→6 — the hard parts of AirLens, how I solved them, and the modern tech I adopted.',
        },
        links: [
          { label: 'airlens.cloud', url: AIRLENS },
          { label: 'GitHub', url: `${GITHUB}/AirLens` },
        ],
      },
      agent: {
        name: 'Agent',
        tagline: 'Multi-runtime agent governance harness · Claude Code plugin',
        overview:
          'Agent is a multi-runtime governance harness that controls three AI runtimes — Claude Code, Codex, and Gemini — under one policy. The goal was to enforce “policy as code” so the same security and safety rules apply no matter which runtime you use. Here are the three hardest problems.',
        metrics: [
          { value: '296', label: 'high-risk ops blocked' },
          { value: '0', label: 'false positives' },
          { value: '8/8', label: 'blind-benchmark bugs found' },
          { value: '17', label: 'hooks' },
          { value: '3', label: 'runtime adapters' },
          { value: '18,000+', label: 'audit-log lines' },
        ],
        sections: [
          {
            id: 'hooks',
            title: 'Abstracting different per-runtime hooks into one',
            hard:
              'Claude Code, Codex, and Gemini each expose a different hook event schema and lifecycle for intercepting tool calls. Without abstraction, the same security hook has to be copied per runtime, and a single bug fix regresses in several places.',
            solution:
              'I defined a canonical JSON hook protocol (event in via stdin → decision out via stdout) as the single source of truth, and built three vendor adapters that normalize each runtime’s native events into it. The core hook logic lives in exactly one place. I verified all three runtimes deny access to the secrets directory and allow harmless commands with identical behavior.',
            tech: ['Canonical JSON protocol', 'Adapter pattern', 'Hook-driven automation'],
            lesson:
              'For heterogeneous tools, keep a shared protocol as the source of truth and convert only at the edges — that’s what eliminates duplicated core logic.',
          },
          {
            id: 'locks',
            title: 'Races when multiple agents touch the same resource',
            hard:
              'Running Claude, Codex, and Gemini in parallel per worktree, all three can try to claim the same production resource (a DB migration, a deploy) at once — risking corrupted migrations or double deploys from a race condition.',
            solution:
              'I write a file-based JSON lock atomically (flock + temp file + rename); a PreToolUse hook checks resource ownership and denies if another session holds it. A 5-minute heartbeat plus automatic GC of dead PIDs / sessions idle >30 min prevents zombie locks, and the status vocabulary aligns with Anthropic’s Agent Teams primitives.',
            tech: ['Atomic JSON lock', 'heartbeat / stale GC', 'git worktree coordination'],
            lesson:
              'Distributed collaboration needs atomic ownership of “who holds what,” plus a mechanism that reclaims dead sessions on its own.',
          },
          {
            id: 'secrets',
            title: 'The secret a scanner missed (defense-in-depth)',
            hard:
              'Secret scanners like gitleaks only catch known formats. The NVIDIA NIM API key format (nvapi-) wasn’t in the base ruleset, so it slipped straight through and was found in several places by manual grep. A silent scanner doesn’t mean “no secrets” — it means “unknown format.”',
            solution:
              'I added an nvapi- custom rule into the base ruleset so it propagates to every project, and layered defenses so nothing relies on a single scanner: pre-commit, pre-push diff scan, MCP content scan, and CI. If one layer misses, another catches it.',
            tech: ['gitleaks custom rules', 'defense-in-depth', 'policy-as-code'],
            lesson:
              'Never trust a single tool’s silence — redundant defensive layers cover the gaps automation misses. (I distilled this into an insight node in my second brain.)',
          },
        ],
        modernTech: [
          { name: 'Model Context Protocol (MCP)', why: 'A standardized tool interface for portability across runtimes.' },
          { name: 'Claude Code plugin packaging', why: 'One `/plugin install` sets it up per project with no copy-paste (v0.2.0).' },
          { name: 'Policy-as-Code', why: 'Risk areas declared in YAML and enforced without code changes; the auto-ship gate aborts on risk.' },
        ],
        meta: {
          title: 'Agent Case Study · Yongmin Cho',
          description: 'Cross-runtime hook abstraction, multi-session locking, defending against the secret a scanner missed — the hard parts of the Agent harness and how I solved them.',
        },
        links: [{ label: 'GitHub', url: `${GITHUB}/Agent` }],
      },
    },
  },
};
