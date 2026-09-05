// Portfolio content, single source of truth (bilingual). Signal Observatory v2.
// Every claim here is cross-checked against the verified resume SSOT
// (local, private: session_summary_report.md). NO unverified tech (no GCP/Nginx/
// Flutter/Tailwind), NO phone number, NO commit-count figures on screen
// (2026-07-11 user decision; 2026-09-03: the gitleaks scan-scope number was
// dropped too). Traffic numbers always carry the requests≠users note.
//
// 2026-09-03 exposure decisions (user delegated): awards (3, proof PDFs on
// file) and company names ARE shown; credentials limited to Azure AI-900 +
// Six Sigma GB (online course certs stay out); GPA stays withheld; Act 05 is
// now a full experience ledger + measured field notes (정량지표_실측_카탈로그).

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

export type TimelineKind = 'build' | 'work' | 'gig' | 'edu';
export type TimelineItem = {
  period: string;
  kind: TimelineKind;
  /** short badge text, e.g. "PRODUCT" / "INTERN" */
  kindLabel: string;
  title: string;
  role: string;
  body: string;
  bullets?: string[];
  tags?: string[];
  link?: Evidence;
};

export type FieldNote = {
  /** the measured number that carries the lesson, e.g. "65.6%" */
  metric: string;
  metricLabel: string;
  title: string;
  body: string;
  tone?: 'ok' | 'alert';
};

/** "why X over Y", one row per real fork in the road, traced to a vault record */
export type Decision = { choice: string; over: string; why: string };

export type CaseStudy = {
  name: string;
  tagline: string;
  /** honest lifecycle label shown under the title, e.g. "LIVE" / "진행 중, 설계·측정 완료" */
  status?: string;
  overview: string;
  /** decision log, rendered after the sections */
  decisions?: Decision[];
  /** 문제·역할·과정·결과 (+ 왜 AI) · one paragraph a reviewer can read in 20 seconds, rendered right under the overview */
  frame?: { problem: string; role: string; process: string; result: string; whyAI?: string };
  /** honest human/AI split, rendered as a 3-row block right after the overview */
  attribution: { label: string; body: string }[];
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
  nav: { board: string; work: string; depth: string; timeline: string; research: string; contact: string };
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
  /** Act 05, experience ledger. `kind` drives the badge; `bullets` are verified facts only. */
  timeline: {
    heading: string;
    lead: string;
    items: TimelineItem[];
    edu: string;
    /** graduation thesis title (verified from the thesis deck) */
    thesis: string;
  };
  /** "what production taught me", measured lessons, each traceable to a committed artifact */
  fieldNotes: { heading: string; lead: string; items: FieldNote[] };
  /** awards + credentials, only items with proof documents on file */
  recognition: { heading: string; awards: { year?: string; title: string; org: string }[]; certsLabel: string; certs: string[] };
  contact: { heading: string; lead: string; items: Evidence[] };
  /** "How I work with AI" disclosure, rendered inside Act 4 (AGENT GATE) */
  aiNote: { title: string; body: string; rows: string[] };
  /** AI-practice trajectory, dated, verified milestones of how the AI workflow itself evolved (Act 4) */
  aiPractice: { heading: string; lead: string; items: { date: string; title: string; body: string }[]; thesesLabel: string; theses: string[]; note: string };
};

const GITHUB = 'https://github.com/joymin5655';
const AIRLENS_WEB_REPO = 'https://github.com/AirLens-cloud/airlens-web';
const AIRLENS = 'https://airlens.cloud';
const EMAIL = 'mailto:joymin5655@gmail.com';
export const OBSERVED = '2026-09-06';

const STACK_CHIPS = [
  'Python', 'TypeScript', 'SQL',
  'OpenAI GPT-4o', 'Anthropic Claude', 'Model Context Protocol', 'LangChain', 'PyTorch', 'ONNX', 'RAG',
  'FastAPI', 'Docker', 'Hugging Face', 'Cloudflare Workers', 'GitHub Actions', 'Cloudflare Pages', 'Redis', 'Sentry', 'PostHog',
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
        'AI를 프로덕션까지 도달시키는 엔지니어. 30일 55개국 66,307 요청(사용자 아님)을 처리하는 AirLens와 멀티런타임 거버넌스 하네스 Agent를 AI 에이전트 팀과 함께 만들고, 혼자 책임지고 운영합니다.',
    },
    nav: { board: '관측', work: 'Work', depth: 'DS Depth', timeline: '경험', research: 'Research', contact: '연락처' },
    observedLabel: `LAST OBSERVED ${OBSERVED}`,
    hero: {
      role: 'AI 에이전트 · 인프라 엔지니어 · 조용민',
      headline: { before: 'AI를 ', em: '프로덕션', after: '까지 도달시키는 엔지니어' },
      sub: '기획→모델→인프라→배포→운영까지, AI 에이전트 팀을 지휘해 혼자서 끝까지 갑니다. 코드 작성의 대부분은 AI가 하고, 방향·검증·운영의 책임은 제가 집니다. 아래 수치는 전부 실측이며, 근거 링크로 역추적할 수 있습니다.',
      live: { label: 'LIVE · airlens.cloud', url: AIRLENS },
      metrics: [
        { value: '66,307', label: '요청 / 30일 · 55개국*' },
        { value: '296', label: '고위험 작업 차단 · 오탐 0' },
        { value: '13', label: 'ML 모델 워크스페이스' },
      ],
      footnote: `* 요청 수 기준, 사용자 수가 아닙니다. 최종 관측 ${OBSERVED}.`,
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
          value: '3',
          unit: 'self-hosted 러너',
          label: 'Hugging Face 데이터셋 위에서 Cloudflare Workers API · self-hosted 러너 3대(Mac 1·Oracle VM 2)로 CI/배포 자동화',
          span: 8,
          evidence: { label: 'github.com/AirLens-cloud/airlens-web', url: AIRLENS_WEB_REPO },
        },
        {
          eyebrow: 'GOVERNANCE',
          value: '296',
          label: '고위험 작업 차단 · 오탐 0 · 감사 로그 18,000+줄',
          span: 4,
          gauge: true,
          evidence: { label: 'github.com/joymin5655/Agent', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'DATA SOURCES',
          value: '10',
          label: '위성·지상 관측·기상 실데이터 융합 파이프라인',
          span: 4,
          evidence: { label: 'AirLens 데이터 파이프라인', url: AIRLENS },
        },
        {
          eyebrow: 'SECURITY SCAN',
          value: '0',
          unit: 'leaks',
          tone: 'ok',
          label: 'gitleaks 전 히스토리 스캔 · pre-commit · pre-push · CI · 시크릿 유출 0',
          span: 4,
          evidence: { label: '다층 시크릿 방어', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'RUNTIMES',
          value: '3',
          unit: 'AI 런타임',
          label: 'Claude Code · Codex · Gemini 단일 정책 제어 · 17 hooks · 블라인드 벤치마크 8/8',
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
      heading: 'Work · 관측 대상 시스템',
      lead: '프로젝트 개수가 아니라 서브시스템의 깊이로 보여드립니다. 각 카드는 실제로 어려웠던 문제와 해결의 기록으로 연결됩니다.',
      flagship: {
        name: 'AirLens',
        tag: '대기질 인텔리전스 SaaS · AI 에이전트 협업 · 1인 책임·운영 · LIVE',
        blurb:
          '학부 논문에서 정책 효과를 분석하며, 흩어진 위성·지상 관측을 한 화면에서 신뢰도와 함께 볼 방법이 없다는 문제를 봤습니다. 기획부터 ML 방법론 선정, 아키텍처, 배포·운영까지 혼자 맡았고 구현은 AI 에이전트와 함께했습니다. 10개 소스 융합 파이프라인 위에 모든 ML 출력에 불확실성과 품질 배지를 붙이는 Glass-box 원칙을 택했고, 정책 효과는 단일 소스 패널로 재구축해 추정 가능 국가를 6에서 53으로 늘렸습니다. 30일 기준 55개국 66,307 요청(사용자 수 아님)을 1인 운영으로 처리하는 라이브 서비스입니다.',
        links: [
          { label: 'airlens.cloud ↗', url: AIRLENS },
          { label: 'GitHub ↗', url: AIRLENS_WEB_REPO },
        ],
        caseLabel: '케이스스터디 →',
        caseHref: '/projects/airlens',
        subsystems: [
          {
            eyebrow: 'CAUSAL INFERENCE',
            title: 'SDID 정책 효과 분석',
            value: '6 → 53',
            desc: '데이터 함정을 제거해 추정 가능 국가를 확장, 근거 약한 구간은 "추정 불가"로 정직하게 노출',
            href: '/projects/airlens#sdid',
          },
          {
            eyebrow: 'FORECASTING',
            title: 'TFT 7일 예보',
            value: 'train = serve',
            desc: '랜덤 스텁에 물려 있던 추론 입력을 실 168시간 관측 윈도우로 복원, 피처 패리티 계약 테스트',
            href: '/projects/airlens#tft',
          },
          {
            eyebrow: 'CAMERA AI',
            title: 'DINOv2 · CORN 서수회귀',
            value: 'ONNX 엣지',
            desc: '사진 한 장으로 PM2.5 추정, 단일값 대신 불확실성 구간을 함께 노출',
            href: '/projects/airlens#camera',
          },
          {
            eyebrow: 'DATABASE',
            title: 'RLS 정책 린트 정리',
            value: '132 → 6',
            desc: '권한 매트릭스 적대적 검증으로 "누구의 접근도 변하지 않았음"을 증명하며 정리',
            href: '/projects/airlens#rls',
          },
          {
            eyebrow: 'RETRIEVAL',
            title: '하이브리드 RAG',
            value: 'BM25+벡터+RRF',
            desc: 'pgvector 하이브리드 검색 + Haiku 재랭킹으로 분석 챗봇의 검색 품질 개선',
            href: AIRLENS,
          },
          {
            eyebrow: 'INFRA / CI',
            title: '배포·관측 자동화',
            value: '58 pipelines',
            desc: 'GitHub Actions 58개 · 3개 레포(수집·ML·웹), 배포·ML 크론·보안 스캔·모니터링 — self-hosted 러너 3대',
            href: AIRLENS_WEB_REPO,
          },
        ],
      },
      cards: [
        {
          name: 'Agent',
          tag: '멀티런타임 거버넌스 하네스 · MIT OSS',
          blurb:
            'AI 에이전트와 일하며 같은 실수(추측·미검증 완료·시크릿 접근)가 런타임마다 반복됐고 훅을 세 벌씩 복제해야 했습니다. 위협 모델·정책·검증 설계를 맡아, 런타임별 복제 대신 canonical JSON 프로토콜 하나에 어댑터 3개를 두는 안을 택했습니다. 본인 프로젝트 2곳에서 고위험 작업 296건을 차단했고 오탐 0, 블라인드 벤치마크 8/8입니다.',
          chips: ['Policy-as-Code', 'Portable Hooks', 'gitleaks', 'MIT OSS', 'Claude Code Plugin'],
          links: [{ label: 'GitHub ↗', url: `${GITHUB}/Agent` }],
          caseHref: '/projects/agent',
        },
        {
          name: 'Second Brain',
          tag: '타입드 지식 그래프 · 린트 게이트 · 3D 시각화',
          blurb: 'AI와 일하며 얻은 판단이 세션마다 사라지고 노트는 검색도 검증도 안 됐습니다. 스키마와 증류 규칙을 설계하고, 백링크 대신 typed edge 10종과 캡처/증류 분리를 택했습니다. 원자 노트 268 · edge 890 · lint 0을 유지하며, 이 포트폴리오의 결정 기록 대부분이 여기서 나왔습니다.',
          chips: ['LLM Wiki', 'typed edges', 'gitleaks fail-closed', 'Three.js'],
          links: [],
          caseHref: '/projects/brain',
        },
        {
          name: 'Pitter-Petter WGS',
          tag: '반려견 전장유전체 파이프라인 · 단독 · 산업연계',
          blurb: '개에는 병원성 truth set이 없고 기업 원시 데이터는 밖으로 나갈 수 없었습니다. 단독으로 문제 재정의부터 보고서까지 맡아 계산과 로컬 LLM 추론을 분리하고, 정확도 대신 도구 간 불일치를 재며 지표를 수치 전에 동결했습니다. 표준 8단계 전 구간에 실측값이 생겼고 불합격 지표도 그대로 보고했습니다.',
          chips: ['bcftools · freebayes', 'VEP · snpEff', 'ESM-2', 'llama.cpp'],
          links: [],
          caseHref: '/projects/pitter',
        },
        {
          name: '바른자세 지킴이',
          tag: 'KT AIVLE 빅프로젝트 · 6인 팀 · 2026 브라우저 재점화',
          blurb: '웹 서비스 경험이 없는 6인 팀에서 프론트엔드 약 80%를 자원해 맡았습니다. 화면 기준을 문서로 합의하고 관절 랜드마크 기반 경량 분류를 택해 Collaboration상을 받았지만 배포에 실패했습니다. 2026년 서버 대신 판정을 브라우저(WASM + ONNX)로 옮겨 원본과 오차 0.000005로 동작하게 만들었습니다.',
          chips: ['Django', 'MediaPipe', 'XGBoost → ONNX', 'onnxruntime-web'],
          links: [],
          caseHref: '/projects/posture',
        },
        {
          name: 'Design · Web Craft',
          tag: 'FABLE 65p · ALL-IN-ONE IA · Wardenkit',
          blurb: 'AI로 페이지를 대량 제작하자 병목이 검증으로 옮겨갔습니다. 디자인 규칙과 하네스 판정 기준을 맡아, 고치기 전에 87 스윕으로 문제가 레이아웃이 아닌 대비임을 확인했고 모션은 라이브러리 대신 모델만 이식해 수치로 검증했습니다. 65페이지가 195/195 통과로 라이브이고 운영 사이트 홈은 6섹션에서 4블록이 됐습니다.',
          chips: ['Playwright 스윕', '스프링 모션 모델', 'Next.js 16', 'gitleaks'],
          links: [],
          caseHref: '/projects/craft',
        },
      ],
    },
    depth: {
      heading: 'Data Science Depth',
      lead: '노트북 데모가 아니라, 55개국 실트래픽 서비스 안에서 운용 중인 방법론입니다.',
      rows: [
        {
          method: 'SDID 합성 이중차분',
          where: '국가 대기질 정책 효과 인과추론 · 데이터 함정 제거로 추정 가능 국가 6 → 53',
          evidence: { label: 'CASE', url: '/projects/airlens#sdid' },
        },
        {
          method: 'Temporal Fusion Transformer',
          where: '7일 PM2.5 예보 · train/serve 피처 패리티 복원 · 결측 시 정직한 skip',
          evidence: { label: 'CASE', url: '/projects/airlens#tft' },
        },
        {
          method: 'CORN 서수회귀 · DINOv2',
          where: '사진 기반 PM2.5 추정 · ONNX 엣지 추론, 불확실성 구간 노출',
          evidence: { label: 'CASE', url: '/projects/airlens#camera' },
        },
        {
          method: 'GTWR-XGBoost',
          where: '시공간 가중 PM2.5 추정 엔진',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'PINN',
          where: '물리 제약을 결합한 모델링 엔진',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: '하이브리드 RAG (BM25 + 벡터 + RRF)',
          where: 'pgvector 검색 + Haiku 재랭킹 · 분석 챗봇 검색 품질',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'Quantile Regression · Glass-box',
          where: '모든 ML 출력에 p10–p90 불확실성과 DQSS 품질 배지를 상시 노출',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
      ],
      note: 'Healthcare Data Science 융합전공 위에서, 프로덕션 데이터로 방법론을 검증합니다.',
    },
    timeline: {
      heading: '여정 · 경험의 기록',
      lead: '기획에서 시작해 "구현의 책임"으로 옮겨온 궤적입니다. 모든 항목은 증빙 문서·커밋·수료증으로 역추적됩니다.',
      items: [
        {
          period: '2026.03 – 현재',
          kind: 'build',
          kindLabel: 'PRODUCT · OSS',
          title: 'AirLens 제품 개발 · Agent 하네스',
          role: '1인 책임 · AI 에이전트 협업',
          body: '학부 캡스톤(대기질·공중보건 연구)을 상용 SaaS로 고도화. 위성·지상 10개 소스 파이프라인, ML 엔진 5종, GPT-4o 분석 에이전트, HF 데이터 플레인·Cloudflare Workers 백엔드, 3D 글로브 프론트를 AI 에이전트 팀과 함께 만들고 혼자 책임지고 운영합니다.',
          bullets: [
            '30일 기준 55개국에서 66,307 요청(사용자 수 아님) 처리 · Cloudflare 실측',
            'SDID 인과추론 추정 가능 국가 6 → 53 · RLS 중복 정책 린트 132 → 6건(접근 권한 무변경 증명)',
            'RAGAS 골든셋 기준 faithfulness 0.958 · 하늘 분할 mIoU 91.5% · 카메라 PM2.5 인접등급 정확도 92.9%',
            '멀티런타임 거버넌스 하네스 Agent 병행 · 고위험 작업 296건 실차단 · 오탐 0 · 블라인드 벤치마크 8/8',
          ],
          tags: ['GPT-4o', 'FastAPI', 'Cloudflare Workers', 'React 19', 'Three.js', 'ONNX', 'GitHub Actions'],
          link: { label: 'airlens.cloud ↗', url: AIRLENS },
        },
        {
          period: '2025 · 약 8개월',
          kind: 'gig',
          kindLabel: 'AI DATA QA',
          title: 'Sigma · Welodata (Google 협력사)',
          role: 'AI 학습 데이터 QA · 평가',
          body: '한·영 코드믹스 오디오 전사와 언어 QA(SOW 7건), 광고·검색 적합성 평가(Data Validation Tier 1·2)를 수행했습니다. 평가 기준이 V5 → V6로 개정될 때 두 버전을 대조해 적용한 경험이, 이후 AirLens에서 "게이트 지표를 어떻게 고르는가"를 설계하는 바탕이 됐습니다.',
          tags: ['언어 QA', '가이드라인 준수', '평가 루브릭', '인간-AI 피드백 루프'],
        },
        {
          period: '2024.07 – 2025.01',
          kind: 'work',
          kindLabel: 'OPERATIONS',
          title: '에듀인소프트',
          role: '교육 운영 · 기획',
          body: 'SQLD·ADsP 데이터 자격증 과정을 운영·담당(대학생 ~30명)했습니다. 교육생 진도 트래킹과 정산 행정, 과정 제안·기획 보조까지, 교육 사업의 운영 프로세스를 처음부터 끝까지 봤습니다.',
          tags: ['과정 운영', '진도·정산', '제안서'],
        },
        {
          period: '2023.08 – 2024.01',
          kind: 'edu',
          kindLabel: 'BOOTCAMP · 840h',
          title: 'KT AIVLE School · AI 개발자 트랙 4기',
          role: '빅프로젝트 「바른자세 지킴이」 프론트엔드 주도',
          body: 'Python·ML/DL·API·웹 서비스 840시간. 6인 팀 빅프로젝트에서 웹 서비스 경험이 없던 팀 상황에 자원해 프론트엔드 약 80%를 주도했고 Collaboration상을 받았습니다. 그러나 마지막 배포 단계에서 실패, "아무리 좋은 모델도 배포되지 않으면 의미가 없다"는 교훈이 인프라·CI/CD로 방향을 돌린 전환점이 됐습니다.',
          bullets: [
            'MediaPipe Holistic 실시간 자세 감지 · Chart.js 통계 대시보드 · 스트레칭 가이드 · 챗봇 UI 구축',
            '팀의 XGBoost 자세 분류기(바른자세 + 나쁜자세 4종)와 LangChain RAG 챗봇 통합',
          ],
          tags: ['Django', 'MediaPipe', 'Chart.js', 'XGBoost', 'LangChain'],
        },
        {
          period: '2023.01 – 05',
          kind: 'work',
          kindLabel: 'INTERN',
          title: '로지체인',
          role: '기획 인턴',
          body: '온디바이스 AI·비전 분석(위변조 방지) 솔루션의 신규 사업 제안서 5건을 작성했습니다. 제안서 구조와 시각 자료 개선 제안이 채택되어 제안 통과에 기여했고, 사내 데이터로 경영진용 인사이트 대시보드를 만들었습니다. 동시에 제 아이디어를 "실제 서비스"로 구현하지 못하는 한계를 깊이 느낀 시점, 엔지니어링으로 옮겨온 출발점입니다.',
          tags: ['사업 제안서', '대시보드', '기술-비즈니스 브릿지'],
        },
        {
          period: '2018.03 – 12',
          kind: 'gig',
          kindLabel: 'DATA LABELING',
          title: '자율주행 인지 데이터 구축',
          role: 'Ground Truth 바운딩박스 라벨링 · 약 10개월',
          body: '자율주행 카메라 이미지의 보행자·차량·도로시설물 GT 라벨링. 발주처 입력 기준 문서(개정판 포함)를 준수하며 차수별 납품·검수 구조에서 작업했습니다, 데이터 품질이 "기준 문서"에서 시작된다는 것을 처음 배운 곳입니다.',
          tags: ['GT 라벨링', '기준 문서 준수', '차수별 검수'],
        },
      ],
      edu: '학력, <b>강릉원주대학교 · 헬스케어 데이터사이언스 융합전공</b> (주전공 산업경영공학)',
      thesis: '졸업논문 「미세먼지 저감 정책의 효과 분석: 중국과 한국의 비교 분석」, AirLens의 출발점',
    },
    fieldNotes: {
      heading: '실측으로 배운 것',
      lead: '프로덕션에서 직접 측정해 파일로 남긴 교훈입니다. 좋은 숫자만이 아니라, 판정을 뒤집은 숫자와 효과가 없었던 실험도 함께 기록합니다.',
      items: [
        {
          metric: '65.6%',
          metricLabel: '가이드라인 충실도 · 게이트 80% 미달',
          title: '통과 지표를 잘못 고르면 불량이 그대로 통과한다',
          body: 'LLM 조언 생성물 게이트에서 금지어 0% · 페르소나 일관성 100% · 파싱 실패 0%는 전부 통과였습니다. LLM judge로 "실제 가이드라인 충실도"를 재는 지표를 추가하자 65.6%가 나와 전체 판정이 FAIL로 뒤집혔고, 프롬프트 수정 후에도 66.2%에 그쳤습니다.',
          tone: 'alert',
        },
        {
          metric: '93% → 14%',
          metricLabel: 'PICP@80 · 전체 → 고농도(≥150) 구간',
          title: '총계는 위험 구간을 가린다',
          body: 'PM2.5 예측구간 커버리지는 전체 93%였지만 가장 위험한 고농도 구간에서는 14%로 무너졌습니다. 관측소 단위 leave-station-out 교차검증(484 관측소)으로 구간별 수치를 파일에 커밋해, 총계 하나로 판단하지 않도록 했습니다.',
          tone: 'alert',
        },
        {
          metric: '−0.0014',
          metricLabel: 'RAG 리랭커 on/off · answer relevancy Δ',
          title: '개선이 없었던 실험도 기록한다',
          body: 'pgvector 하이브리드 RAG(faithfulness 0.958)에 리랭커를 켜고 끄는 A/B를 돌렸습니다. 유의미한 차이가 없었고, 그 "효과 없음"을 지우지 않고 리포트에 그대로 남겼습니다.',
          tone: 'ok',
        },
        {
          metric: '3회',
          metricLabel: '측정 도구 결함으로 인한 오진',
          title: '주제보다 측정 도구를 먼저 검증한다',
          body: 'WebGL 캔버스의 캡처 경로 세 가지가 모두 낡은 픽셀을 돌려줘 "동작하지 않는다"는 오진을 세 번 냈습니다. 측정을 고치자 실제 결함 두 개가 즉시 드러났습니다. "구성으로 검증됨"은 검증이 아닙니다.',
          tone: 'ok',
        },
      ],
    },
    recognition: {
      heading: '수상 · 자격',
      awards: [
        { year: '2024', title: '빅프로젝트 Collaboration상', org: 'KT AIVLE School (KT × 고용노동부)' },
        { year: '2022', title: '정밀의료 메이커톤 사업단장상', org: '강원지역혁신플랫폼' },
        { title: '일경험 사업 최우수상', org: '미래내일 일경험' },
      ],
      certsLabel: '자격',
      certs: ['Microsoft Azure AI Fundamentals (AI-900)', '6시그마 그린벨트'],
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
    aiNote: {
      title: 'AI와 함께 일하는 방식',
      body:
        '이 포트폴리오의 프로젝트들은 코드 작성의 대부분을 Claude Code 등 AI 에이전트가 수행했습니다. 저는 문제 정의·아키텍처 결정·검증 기준 설계·모든 머지 판단·프로덕션 운영을 담당하고, 그 협업 방식 자체를 시스템으로 만든 것이 위의 Agent 하네스입니다.',
      rows: [
        '방향 · 검증 · 운영 = 사람',
        '코드 작성의 대부분 = AI 에이전트',
        '모든 머지와 보안 게이트 = 사람의 결정',
      ],
    },
    aiPractice: {
      heading: 'AI 협업 궤적 · 도구 사용이 아니라 통제 구조',
      lead: '2026년 3월 이후 AI와 일하는 방식이 어떻게 바뀌었는지, 날짜가 있는 기록만 골랐습니다. 공통 패턴은 하나, 실패를 사람이 매번 잡는 대신 규칙·훅·게이트로 자산화한 것.',
      items: [
        { date: '2026-03', title: 'AirLens v3.0 · 첫 커밋부터 AI-native', body: 'Claude Code를 주 구현자로 두고 시작. 관측(Sentry · PostHog)을 첫 달에 깔아 "CI 초록불 ≠ 프로덕션 동작"을 처음부터 실측으로 잡을 수 있게 했습니다.' },
        { date: '2026-04 → 05', title: 'Agent 하네스 분리 · 공개', body: 'AirLens 안에서 자란 훅·정책을 벤더 중립 하네스로 추출해 Claude Code · Codex · Gemini 3런타임 단일 YAML 정책으로 통제. 블라인드 벤치마크 8/8, MIT 공개.' },
        { date: '2026-05', title: '멀티에이전트 규율 R1–R14 · 시크릿 다층 방어', body: 'worktree 격리 · 세션 락 · 파일 mutex · PR 직렬화로 동시 작업 충돌 0. 시크릿은 pre-commit → 명령 패턴 → content scan → pre-push → CI로 층을 쌓았고, 사용자가 직접 명령한 작업은 deny → ask로 격상했습니다.' },
        { date: '2026-05', title: '사용량을 재기 시작 · 에이전트 디스패치 256건 · 17 유형', body: '라우팅·계획 위험도·차단 이벤트를 append-only JSONL로 남기고 주간 digest를 산출. 무엇을 AI에 시키고 무엇이 막혔는지가 데이터가 됐습니다.' },
        { date: '2026-06', title: '기술 회고 · AI가 반복적으로 틀린 것 7종을 규칙으로', body: '기록 안 보고 추측 · 검증 없이 완료 단정 · 한 조각만 보고 판단 · 엉뚱한 전문가 호출… 각 실패에 대응하는 룰과 훅(memory-discipline, Stop 품질 게이트, DB ground-truth 검증)을 만들었습니다.' },
        { date: '2026-06', title: 'Second Brain · 세션을 증류하는 시스템', body: '캡처(기계)와 증류(LLM)를 분리하고, 5게이트를 통과한 것만 원자 노트로 승격. 268노드 · 890 typed edge · lint 0. 프로젝트 볼트는 내재화하되 병합하지 않습니다.' },
        { date: '2026-07', title: '거버넌스 실측 검증 · 시크릿 게이트 사고', body: '고위험·다부서 변경의 실차단(permissionDecision: deny)을 로그 296줄로 확인. 같은 달, 훅 없이 설정 파일만 있던 볼트에서 .env 유출을 발견 · fail-closed 게이트로 전환했습니다.' },
        { date: '2026-08', title: '자기 사용 전수 감사 · 1,952세션 · 654k줄', body: '결정적 스크립트로 전처리 → 집계본만 에이전트에 → 벤치마크 3종과 대조. 최대 토큰 소비처가 프롬프트가 아니라 메모리 observer(출력 36%)였고, 초기 발견 2건은 적용 직전 재검증에서 정정. 개선 11건을 같은 세션에서 적용.' },
        { date: '2026-09', title: '"토큰 절약 도구" 18개 스캔 · 실재 메커니즘은 5개', body: '판별 질문은 하나 · 컨텍스트에 들어오는 양을 줄이는가, 내가 하는 일을 정리해 줄 뿐인가. 실재하는 메커니즘은 셋으로 수렴(정밀 표현 치환 / 다른 컨텍스트로 밀어내기 / 덤프 대신 큐레이션 반환).' },
      ],
      thesesLabel: '이 기록에서 굳어진 주장',
      theses: [
        'AI를 얹지 마라, 워크플로우를 갈아엎어라',
        '성숙한 하네스의 병목은 인프라 추가가 아니라 기존 규칙의 집행이다',
        '완료는 자기승인이 아니라 신선-컨텍스트 적대 검증으로 확정한다',
        '자동화는 위험 행동을 영원히 회피한다',
        '지식은 무료, 맥락이 무기',
        '복사가 아니라 증류',
      ],
      note: '2026-03 이전의 AI 사용은 날짜 있는 기록이 없어 싣지 않았습니다.',
    },
  },

  en: {
    lang: 'en',
    altHref: '/',
    altLabel: 'KO',
    meta: {
      title: 'Yongmin Cho · AI Agent / Infrastructure Engineer',
      description:
        'AI-native engineer who ships to production. Directs AI agents to build · and single-handedly operates · AirLens (66,307 requests, not users, across 55 countries in 30 days) and the multi-runtime governance harness Agent.',
    },
    nav: { board: 'Observatory', work: 'Work', depth: 'DS Depth', timeline: 'Experience', research: 'Research', contact: 'Contact' },
    observedLabel: `LAST OBSERVED ${OBSERVED}`,
    hero: {
      role: 'AI Agent · Infrastructure Engineer · Yongmin Cho',
      headline: { before: 'AI-native engineer who ships to ', em: 'production', after: '' },
      sub: 'Planning → model → infra → deploy → operations, end to end, directing a team of AI agents. Most code is AI-written; direction, verification, and operational responsibility are mine. Every number below is measured, and traceable through evidence links.',
      live: { label: 'LIVE · airlens.cloud', url: AIRLENS },
      metrics: [
        { value: '66,307', label: 'requests / 30d · 55 countries*' },
        { value: '296', label: 'high-risk ops blocked · 0 false positives' },
        { value: '13', label: 'ML model workspaces' },
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
          value: '3',
          unit: 'self-hosted runners',
          label: 'Runs on a Hugging Face dataset · Cloudflare Workers API · 3 self-hosted runners (1 Mac, 2 Oracle VMs) automate CI & deploy',
          span: 8,
          evidence: { label: 'github.com/AirLens-cloud/airlens-web', url: AIRLENS_WEB_REPO },
        },
        {
          eyebrow: 'GOVERNANCE',
          value: '296',
          label: 'high-risk operations blocked · 0 false positives · 18,000+ audit-log lines',
          span: 4,
          gauge: true,
          evidence: { label: 'github.com/joymin5655/Agent', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'DATA SOURCES',
          value: '10',
          label: 'satellite · ground-station · weather real-data fusion pipeline',
          span: 4,
          evidence: { label: 'AirLens data pipeline', url: AIRLENS },
        },
        {
          eyebrow: 'SECURITY SCAN',
          value: '0',
          unit: 'leaks',
          tone: 'ok',
          label: 'gitleaks full-history scan · pre-commit · pre-push · CI · zero secret leaks',
          span: 4,
          evidence: { label: 'multi-layer secret defense', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'RUNTIMES',
          value: '3',
          unit: 'AI runtimes',
          label: 'Claude Code · Codex · Gemini under one policy · 17 hooks · blind benchmark 8/8',
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
      heading: 'Work · Systems Under Observation',
      lead: 'Depth over count: each card links to a record of a real hard problem and how it was solved.',
      flagship: {
        name: 'AirLens',
        tag: 'Air-quality intelligence SaaS · built with AI agents · one owner, operated solo · LIVE',
        blurb:
          'Analysing policy effects for my thesis, I saw no way to view scattered satellite and ground observations on one screen with a measure of trust. I owned planning, ML method choice, architecture, deployment and operations alone, building with AI agents. On a 10-source fusion pipeline I fixed a glass-box rule (every ML output carries an uncertainty band and a quality badge) and rebuilt the policy-effect panel from a single source, raising estimable countries from 6 to 53. A live service handling 66,307 requests (not users) from 55 countries in 30 days, operated by one person.',
        links: [
          { label: 'airlens.cloud ↗', url: AIRLENS },
          { label: 'GitHub ↗', url: AIRLENS_WEB_REPO },
        ],
        caseLabel: 'Case study →',
        caseHref: '/en/projects/airlens',
        subsystems: [
          {
            eyebrow: 'CAUSAL INFERENCE',
            title: 'SDID policy-impact analysis',
            value: '6 → 53',
            desc: 'Removed a data trap to expand estimable countries, weak cases surface honestly as "not estimable"',
            href: '/en/projects/airlens#sdid',
          },
          {
            eyebrow: 'FORECASTING',
            title: 'TFT 7-day forecast',
            value: 'train = serve',
            desc: 'Rewired inference from random stubs to a real 168-hour observation window, feature-parity contract tests',
            href: '/en/projects/airlens#tft',
          },
          {
            eyebrow: 'CAMERA AI',
            title: 'DINOv2 · CORN ordinal regression',
            value: 'ONNX edge',
            desc: 'PM2.5 from a single photo, exposing an uncertainty band instead of a single value',
            href: '/en/projects/airlens#camera',
          },
          {
            eyebrow: 'DATABASE',
            title: 'RLS policy-lint consolidation',
            value: '132 → 6',
            desc: 'Adversarial access-matrix verification proved no principal gained or lost access',
            href: '/en/projects/airlens#rls',
          },
          {
            eyebrow: 'RETRIEVAL',
            title: 'Hybrid RAG',
            value: 'BM25+vector+RRF',
            desc: 'pgvector hybrid search + Haiku re-ranking for the analysis chatbot',
            href: AIRLENS,
          },
          {
            eyebrow: 'INFRA / CI',
            title: 'Deploy & observability automation',
            value: '58 pipelines',
            desc: '58 GitHub Actions across 3 repos (ingest, ML, web) — deploys, ML crons, security scans, monitoring on 3 self-hosted runners',
            href: AIRLENS_WEB_REPO,
          },
        ],
      },
      cards: [
        {
          name: 'Agent',
          tag: 'Multi-runtime governance harness · MIT OSS',
          blurb:
            'Working with AI agents, the same mistakes (guessing, unverified “done”, secret access) recurred on every runtime and hooks had to be copied three times. I owned the threat model, policy and verification design, and chose one canonical JSON protocol with three adapters over per-runtime copies. In production on two of my projects: 296 high-risk operations blocked, 0 false positives, 8/8 on a blind benchmark.',
          chips: ['Policy-as-Code', 'Portable Hooks', 'gitleaks', 'MIT OSS', 'Claude Code Plugin'],
          links: [{ label: 'GitHub ↗', url: `${GITHUB}/Agent` }],
          caseHref: '/en/projects/agent',
        },
        {
          name: 'Second Brain',
          tag: 'Typed knowledge graph · lint gates · 3D view',
          blurb: 'Judgements from AI work vanished each session and notes could be neither searched with intent nor verified. I designed the schema and distillation rules, choosing ten typed edge types over backlinks and separating capture from distillation. 268 atomic notes · 890 edges · lint 0, maintained; most decision logs on this portfolio came out of it.',
          chips: ['LLM Wiki', 'typed edges', 'gitleaks fail-closed', 'Three.js'],
          links: [],
          caseHref: '/en/projects/brain',
        },
        {
          name: 'Pitter-Petter WGS',
          tag: 'Dog whole-genome pipeline · solo · industry-linked',
          blurb: 'Dogs have no pathogenicity truth set and the company’s raw data could not leave the machine. Working alone from problem definition to report, I separated computation from local-LLM reasoning, measured tool disagreement instead of accuracy, and froze metrics before seeing numbers. All eight standard stages now have measured values, with the failing metrics reported as they came.',
          chips: ['bcftools · freebayes', 'VEP · snpEff', 'ESM-2', 'llama.cpp'],
          links: [],
          caseHref: '/en/projects/pitter',
        },
        {
          name: 'Posture Guard',
          tag: 'KT AIVLE big project · 6-person team · reignited in-browser 2026',
          blurb: 'On a six-person team with no web experience I volunteered for about 80% of the frontend. We settled screen criteria in a document and chose a landmark-based lightweight classifier, won the Collaboration award, and then failed to deploy. In 2026 I moved inference into the browser (WASM + ONNX) instead of a server, matching the original within 0.000005.',
          chips: ['Django', 'MediaPipe', 'XGBoost → ONNX', 'onnxruntime-web'],
          links: [],
          caseHref: '/en/projects/posture',
        },
        {
          name: 'Design · Web Craft',
          tag: 'FABLE 65p · ALL-IN-ONE IA · Wardenkit',
          blurb: 'Once AI could build pages in volume, the bottleneck moved to verification. I owned the design rules and the harness pass criteria; before fixing anything, 87 sweeps showed the fault was contrast, not layout, and motion was ported as a model and verified numerically. 65 pages are live at 195/195 checks, and the production home went from six sections to four blocks.',
          chips: ['Playwright sweeps', 'Spring motion model', 'Next.js 16', 'gitleaks'],
          links: [],
          caseHref: '/en/projects/craft',
        },
      ],
    },
    depth: {
      heading: 'Data Science Depth',
      lead: 'Not notebook demos, methodologies running inside a live service with traffic from 55 countries.',
      rows: [
        {
          method: 'Synthetic DiD (SDID)',
          where: 'Causal inference on national air-quality policy · estimable countries 6 → 53 after removing a data trap',
          evidence: { label: 'CASE', url: '/en/projects/airlens#sdid' },
        },
        {
          method: 'Temporal Fusion Transformer',
          where: '7-day PM2.5 forecast · restored train/serve feature parity · honest skip on missing data',
          evidence: { label: 'CASE', url: '/en/projects/airlens#tft' },
        },
        {
          method: 'CORN ordinal regression · DINOv2',
          where: 'PM2.5 from photos · ONNX edge inference with an exposed uncertainty band',
          evidence: { label: 'CASE', url: '/en/projects/airlens#camera' },
        },
        {
          method: 'GTWR-XGBoost',
          where: 'Spatio-temporally weighted PM2.5 estimation engine',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'PINN',
          where: 'Physics-constrained modeling engine',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'Hybrid RAG (BM25 + vector + RRF)',
          where: 'pgvector retrieval + Haiku re-ranking · analysis-chatbot search quality',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'Quantile Regression · Glass-box',
          where: 'Every ML output always exposes p10–p90 uncertainty and a DQSS data-quality badge',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
      ],
      note: 'Grounded in an interdisciplinary major in Healthcare Data Science, validated on production data.',
    },
    timeline: {
      heading: 'Journey · a record of experience',
      lead: 'From planning to owning the build. Every entry traces back to a document, a commit, or a certificate on file.',
      items: [
        {
          period: '2026.03 – Present',
          kind: 'build',
          kindLabel: 'PRODUCT · OSS',
          title: 'AirLens product development · Agent harness',
          role: 'One owner · AI-agent collaboration',
          body: 'Grew an undergraduate capstone (air quality × public health) into a production SaaS: a 10-source satellite/ground pipeline, 5 ML engines, a GPT-4o analysis agent, a Hugging Face data-plane + Cloudflare Workers backend and a 3D-globe frontend, built with a team of AI agents, operated by one person.',
          bullets: [
            '66,307 requests (not users) from 55 countries in 30 days · Cloudflare measured',
            'SDID causal inference: estimable countries 6 → 53 · RLS duplicate-policy lint 132 → 6 with proof that no access changed',
            'RAGAS golden set faithfulness 0.958 · sky segmentation mIoU 91.5% · camera PM2.5 within-one-band accuracy 92.9%',
            'Agent, the multi-runtime governance harness, running alongside · 296 high-risk ops blocked · 0 false positives · 8/8 blind benchmark',
          ],
          tags: ['GPT-4o', 'FastAPI', 'Cloudflare Workers', 'React 19', 'Three.js', 'ONNX', 'GitHub Actions'],
          link: { label: 'airlens.cloud ↗', url: AIRLENS },
        },
        {
          period: '2025 · ~8 months',
          kind: 'gig',
          kindLabel: 'AI DATA QA',
          title: 'Sigma · Welodata (Google vendors)',
          role: 'AI training-data QA & evaluation',
          body: 'Korean–English code-mixed audio transcription and linguistic QA (7 SOWs), plus ads/search relevance evaluation (Data Validation Tier 1 & 2). Applying a guideline revision from V5 to V6 side by side is where I learned to think about how a gate metric gets chosen, the thinking I later built into AirLens.',
          tags: ['Linguistic QA', 'Guideline compliance', 'Evaluation rubrics', 'Human–AI feedback loop'],
        },
        {
          period: '2024.07 – 2025.01',
          kind: 'work',
          kindLabel: 'OPERATIONS',
          title: 'Eduinsoft',
          role: 'Education operations & planning',
          body: 'Ran data-certification courses (SQLD · ADsP) for ~30 university students: progress tracking, settlement administration, and support for course proposals, the full operating loop of an education business.',
          tags: ['Course operations', 'Progress & settlement', 'Proposals'],
        },
        {
          period: '2023.08 – 2024.01',
          kind: 'edu',
          kindLabel: 'BOOTCAMP · 840h',
          title: 'KT AIVLE School · AI Developer Track (4th cohort)',
          role: 'Frontend lead on the big project "Posture Guard"',
          body: '840 hours of Python, ML/DL, APIs and web services. On a 6-person team with no web-service experience I volunteered for ~80% of the frontend, and we won the Collaboration award. Then we failed at the final deployment step, "no matter how good the model, it means nothing if it never ships" became the turning point that drove me into infrastructure and CI/CD.',
          bullets: [
            'Built real-time posture monitoring with MediaPipe Holistic, a Chart.js statistics dashboard, stretching guides and the chatbot UI',
            'Integrated the team’s XGBoost posture classifier (good posture + 4 bad postures) and a LangChain RAG chatbot',
          ],
          tags: ['Django', 'MediaPipe', 'Chart.js', 'XGBoost', 'LangChain'],
        },
        {
          period: '2023.01 – 05',
          kind: 'work',
          kindLabel: 'INTERN',
          title: 'Logichain',
          role: 'Planning intern',
          body: 'Wrote five new-business proposals for on-device AI / vision-analysis (anti-tampering) solutions. My proposed changes to structure and visuals were adopted and contributed to proposal approval, and I built an executive insight dashboard from internal data. It is also where I felt the limit of not being able to build what I planned, the start of the move into engineering.',
          tags: ['Business proposals', 'Dashboards', 'Tech–business bridge'],
        },
        {
          period: '2018.03 – 12',
          kind: 'gig',
          kindLabel: 'DATA LABELING',
          title: 'Autonomous-driving perception dataset',
          role: 'Ground-truth bounding-box labeling · ~10 months',
          body: 'Labeled pedestrians, vehicles and road furniture in vehicle-camera imagery, following the client’s GT input standard (including its revision) in a batch-delivery and review structure, where I first learned that data quality starts with the standards document.',
          tags: ['GT labeling', 'Standards compliance', 'Batch review'],
        },
      ],
      edu: 'Education, <b>Gangneung-Wonju National University · Healthcare Data Science (Interdisciplinary Major)</b> (Major: Industrial Engineering)',
      thesis: 'Thesis: “Effectiveness of Fine-Dust Reduction Policies: A Comparative Analysis of China and Korea”, the seed of AirLens',
    },
    fieldNotes: {
      heading: 'What production taught me',
      lead: 'Lessons I measured myself and committed to files, not only the good numbers, but the number that flipped a verdict and the experiment that changed nothing.',
      items: [
        {
          metric: '65.6%',
          metricLabel: 'guideline fidelity · below the 80% gate',
          title: 'Pick the wrong pass metric and defects walk through',
          body: 'The LLM advice-generation gate passed on banned-word rate 0%, persona consistency 100% and parse failures 0%. Adding an LLM-judge metric for actual guideline fidelity returned 65.6% and flipped the whole verdict to FAIL; a prompt revision only reached 66.2%.',
          tone: 'alert',
        },
        {
          metric: '93% → 14%',
          metricLabel: 'PICP@80 · overall → high-concentration (≥150) band',
          title: 'Aggregates hide the dangerous band',
          body: 'PM2.5 prediction-interval coverage was 93% overall but collapsed to 14% in the band that matters most. Leave-station-out cross-validation across 484 stations put the per-band numbers into a committed file so no single total could stand in for them.',
          tone: 'alert',
        },
        {
          metric: '−0.0014',
          metricLabel: 'RAG reranker on/off · Δ answer relevancy',
          title: 'Record the experiment that changed nothing',
          body: 'I A/B-tested a reranker on the pgvector hybrid RAG (faithfulness 0.958). There was no meaningful difference, and that null result stayed in the report instead of being deleted.',
          tone: 'ok',
        },
        {
          metric: '3×',
          metricLabel: 'misdiagnoses caused by a broken measurement',
          title: 'Validate the instrument before the subject',
          body: 'Three different capture paths for a WebGL canvas all returned stale pixels, producing three false “it doesn’t work” verdicts. Fixing the measurement exposed two real defects immediately. “Verified by construction” is not verification.',
          tone: 'ok',
        },
      ],
    },
    recognition: {
      heading: 'Awards · Credentials',
      awards: [
        { year: '2024', title: 'Big Project Collaboration Award', org: 'KT AIVLE School (KT × Ministry of Employment and Labor)' },
        { year: '2022', title: 'Precision-Medicine Makerthon · Director’s Award', org: 'Gangwon Regional Innovation Platform' },
        { title: 'Work-Experience Program, Grand Prize', org: 'Mirae Naeil Work Experience' },
      ],
      certsLabel: 'Credentials',
      certs: ['Microsoft Azure AI Fundamentals (AI-900)', 'Six Sigma Green Belt'],
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
    aiNote: {
      title: 'How I work with AI',
      body:
        'Most of the code in this portfolio was written by AI agents (Claude Code and others). My work is problem definition, architecture decisions, verification design, every merge decision, and production operations · and I built that collaboration itself into a system: the Agent harness above.',
      rows: [
        'Direction · verification · operations = human',
        'Most code authorship = AI agents',
        'Every merge and security gate = a human decision',
      ],
    },
    aiPractice: {
      heading: 'AI practice trajectory · control structures, not tool use',
      lead: 'How my way of working with AI changed since March 2026, restricted to dated records. One pattern throughout: instead of catching failures by hand each time, turn them into rules, hooks and gates.',
      items: [
        { date: '2026-03', title: 'AirLens v3.0 · AI-native from the first commit', body: 'Claude Code as the primary implementer from day one. Observability (Sentry · PostHog) went in during the first month so that “CI green ≠ production working” could be caught by measurement, not surprise.' },
        { date: '2026-04 → 05', title: 'Agent harness extracted and published', body: 'Hooks and policies that grew inside AirLens were extracted into a vendor-neutral harness controlling Claude Code, Codex and Gemini under one YAML policy. Blind benchmark 8/8, MIT.' },
        { date: '2026-05', title: 'Multi-agent discipline R1–R14 · layered secret defence', body: 'Worktree isolation, session locks, file mutexes and PR serialisation · zero concurrent-work collisions. Secrets are defended in layers (pre-commit → command patterns → content scan → pre-push → CI), and user-commanded operations were escalated from deny to ask.' },
        { date: '2026-05', title: 'Started measuring usage · 256 agent dispatches across 17 types', body: 'Routing, plan-risk classification and block events logged as append-only JSONL with weekly digests. What I delegate to AI, and what gets blocked, became data.' },
        { date: '2026-06', title: 'Technical retrospective · seven recurring AI failures turned into rules', body: 'Guessing instead of reading the record · declaring done without verifying · judging from one fragment · calling the wrong specialist… each failure got a matching rule or hook (memory-discipline, Stop quality gate, DB ground-truth checks).' },
        { date: '2026-06', title: 'Second Brain · a system that distils sessions', body: 'Capture (machine) and distillation (LLM) split; only items passing five gates become atomic notes. 268 nodes · 890 typed edges · lint 0. Project vaults are internalised but never merged.' },
        { date: '2026-07', title: 'Governance verified in the logs · the secret-gate incident', body: 'Real blocking of high-risk, multi-department changes (permissionDecision: deny) confirmed in 296 log lines. The same month a vault with a config file but no hook leaked a .env · switched to fail-closed gates.' },
        { date: '2026-08', title: 'Full audit of my own usage · 1,952 sessions · 654k lines', body: 'Deterministic pre-processing → only aggregates to the agent → compared against three benchmarks. The biggest token consumer was not prompts but the memory observer (36% of output); two early findings were corrected on re-verification before applying. Eleven improvements applied in the same session.' },
        { date: '2026-09', title: 'Scanned 18 “token-saving” tools · five real mechanisms', body: 'One diagnostic question: does it reduce what enters the context, or merely organise what I do? The real mechanisms converge on three (precise substitution / pushing work into another context / returning curation instead of dumps).' },
      ],
      thesesLabel: 'Positions this record hardened into',
      theses: [
        'Don’t bolt AI on · redesign the workflow',
        'A mature harness is bottlenecked by enforcement of existing rules, not by more infrastructure',
        '“Done” is confirmed by fresh-context adversarial review, never by self-approval',
        'Automation avoids dangerous actions forever',
        'Knowledge is free; context is the weapon',
        'Distil, don’t copy',
      ],
      note: 'AI use before 2026-03 has no dated records and is not listed.',
    },
  },
};

// ── Case studies (challenge → solution → modern tech). Mined from real repo /
// tech-verification docs / second-brain insights. No commit hashes or internal
// paths exposed; no commit-count figures (2026-07-11 decision). Harness details
// are qualitative, fact-verifier-checked against the resume SSOT.
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
      attribution: string;
      modern: string;
      footnote: string;
      decisions: string;
      decisionsLead: string;
      over: string;
      status: string;
      frame: { heading: string; problem: string; role: string; process: string; result: string; whyAI: string };
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
      attribution: '기여 분리, 누가 무엇을 했나',
      modern: '중간에 반영한 최신 기술',
      footnote: `트래픽 수치는 요청 수 기준(사용자 수 아님) · 최종 관측 ${OBSERVED}`,
      decisions: '결정 기록, 왜 이쪽을 골랐나',
      decisionsLead: '갈림길마다 무엇을 버렸는지 함께 적었습니다. 각 행은 프로젝트 볼트의 회고·비교 문서로 역추적됩니다.',
      over: '대신',
      status: '상태',
      frame: { heading: '한 문단 요약 · 문제 → 역할 → 과정 → 결과', problem: '문제', role: '역할', process: '과정', result: '결과', whyAI: '왜 AI였나' },
    },
    items: {
      airlens: {
        name: 'AirLens',
        tagline: '대기질 인텔리전스 SaaS · AI 에이전트 협업 · 1인 책임·운영 · 라이브',
        status: 'LIVE · airlens.cloud · 2026-03 → 현재 (캡스톤 2023–24 → 제품 2026)',
        overview:
          'AirLens는 위성·지상 10여 개 데이터 소스를 통합해 PM2.5를 추정하고, 정책 효과를 인과추론으로 분석하며, GPT-4o 에이전트로 자연어 질의를 코드·인사이트로 바꾸는 대기질 인텔리전스 플랫폼입니다. 데이터 파이프라인부터 ML·프론트엔드·배포까지 AI 에이전트 팀과 함께 만들고, 혼자 책임지고 55개국에서 라이브로 운영하고 있습니다. 가장 까다로웠던 문제들과 해결 방식, 그리고 진행 중 도입한 최신 기술입니다.',
        frame: {
          problem: '학부 논문에서 대기질 정책 효과를 분석하면서, 위성·지상 관측이 국가마다 흩어져 있고 일반인이 자기 동네의 대기질과 정책 효과를 한 화면에서 볼 방법이 없다는 문제를 봤습니다. 기존 서비스는 관측값만 보여주고 "왜 그런지", "얼마나 믿을 수 있는지"는 말해주지 않았습니다.',
          role: '기획, 데이터 소스 선정, ML 방법론 선정과 검증 기준 설계, 아키텍처, 배포·운영·장애 대응까지 전 과정을 혼자 맡았습니다. 구현 코드의 대부분은 AI 에이전트가 썼고, 모든 머지와 보안 게이트는 제가 판단했습니다.',
          process: '10개 소스를 하나로 융합하는 파이프라인을 먼저 세우고, 모든 ML 출력에 불확실성 구간과 데이터 품질 배지를 붙이는 Glass-box 원칙을 정했습니다. 정책 효과는 여러 소스를 섞는 안과 단일 소스로 패널을 재구축하는 안을 비교해 후자를 택했고(추정 가능 국가 6 → 53), 학습된 GNN은 서비스에 배선되지 않아 공개 목록에서 뺐습니다.',
          result: '30일 기준 55개국에서 66,307 요청(사용자 수 아님)을 1인이 운영하는 라이브 서비스로 처리하고 있습니다. 근거가 약한 구간은 숫자를 지어내지 않고 "추정 불가"로 보여주며, 여기서 만든 검증 습관이 이후 모든 프로젝트의 기준이 됐습니다.',
          whyAI: '자연어로 "이번 주 서울 PM2.5가 왜 높았나"를 묻는 질문은 사전에 만들어 둔 차트로 답할 수 없어서, 질의를 pandas·plotly 코드로 바꾸는 GPT-4o 에이전트를 제품 기능으로 넣었습니다. 반면 추정과 예측은 검증 가능한 통계·ML 엔진이 맡고 LLM은 결과를 설명만 하도록 경계를 뒀습니다.',
        },
        attribution: [
          {
            label: '내가 한 일',
            body: '문제 정의와 도메인 리서치 · 아키텍처·기술 선택 · 데이터 소스 선정 · ML 방법론 선정(왜 SDID·TFT·CORN인가)과 검증 기준 설계 · 모든 PR 리뷰와 머지 판단 · 배포·장애 대응·비용 관리.',
          },
          {
            label: 'AI 에이전트가 한 일',
            body: '구현 코드의 대부분, Claude Code 등 AI 에이전트가 작성했습니다. 아래 케이스들의 해결책도 방향과 판단은 제가 정하고, 구현은 AI 에이전트와 함께 했습니다.',
          },
          {
            label: '내가 책임진 것',
            body: '모든 머지 결정과 보안 게이트, 프로덕션에서 벌어지는 일의 최종 책임. AI 산출물은 기계 게이트(gitleaks·정책 훅)와 제 리뷰를 통과해야 main에 도달합니다.',
          },
        ],
        metrics: [
          { value: '3.5개월', label: '2026-03 → 06 구축' },
          { value: '10', label: '데이터 소스' },
          { value: '5', label: 'ML 엔진' },
          { value: '13', label: 'ML 모델 워크스페이스' },
          { value: '4', label: '데이터 계약 (HF 발행물)' },
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
              '국가별 대기질 정책의 효과를 합성 이중차분(SDID)으로 추정했는데, 처음엔 6개국에서만 결과가 나왔고 그중 통계적으로 유의한 건 1개뿐이었습니다. 원인을 추적하니 알고리즘이 아니라 데이터의 함정이었습니다 · 한 나라의 시계열이 중간에 서로 다른 출처(편향이 있는 위성 재분석 데이터 ↔ 지상 관측값)로 바뀌며 생긴 인공적인 "점프"를, SDID가 정책의 효과로 잘못 해석하고 있었습니다.',
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
            title: 'RLS 권한 정책 폭증 정리 (린트 132 → 6)',
            hard:
              '당시 데이터베이스였던 Supabase(Postgres)의 성능 어드바이저가 24개 테이블에 걸쳐 중복 permissive RLS 정책 경고(multiple_permissive 린트) 132건을 보고했습니다. 같은 역할·동작에 정책이 여러 개면 OR로 모두 평가돼 성능 부담과 불필요한 공격면이 생깁니다. 특히 service_role용 정책 14개는 service_role이 애초에 RLS를 우회하기 때문에 실제로는 아무것도 막지 못하고 있었습니다.',
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
              '사진으로 대기질을 추정하려면 두 가지가 까다로웠습니다. (1) "정확히 38.2 µg/m³"라는 절대값보다 "이 정도로 나쁨"이라는 순서가 더 자연스럽고 흔들림이 적으며, (2) 수억 파라미터의 비전 트랜스포머를 서버가 아니라 브라우저·모바일 엣지에서 돌려야 했습니다.',
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
          { name: 'GPT-4o · Anthropic Haiku', why: '분석 에이전트와 Edge Function 다국어 요약에 적용 · Edge 자격증명 제약에 맞춰 모델을 선택.' },
          { name: 'Glass-box 원칙', why: '모든 ML 출력에 p10~p90 불확실성과 데이터 품질 배지(DQSS)를 항상 노출.' },
        ],
        decisions: [
          {
            choice: '공개 ML 엔진 5종 · 학습까지 끝낸 GNN은 목록에서 제외',
            over: '"6개 엔진"으로 홍보',
            why: 'GNN은 학습됐지만 웹·Edge·cron 어디에도 노출된 곳이 없었습니다. 안 쓰는 건 광고하지 않는다, 모델 개수보다 사용자와 면접관의 신뢰가 중요했고, 이 원칙이 이력서의 미검증 표현 제거로도 이어졌습니다.',
          },
          {
            choice: 'SDID 패널을 단일 출처(CAMS)로 재구축',
            over: '여러 소스를 섞어 표본을 늘리기',
            why: '출처가 섞이면 소스별 편향이 차분에서 상쇄되지 않습니다. 편향이 일정한 단일 소스가 오히려 추정을 안정시켰고, 추정 가능 국가가 6 → 53으로 늘었습니다. 근거가 약한 구간은 "추정 불가"로 남깁니다.',
          },
          {
            choice: '웹은 무료, 수익은 앱으로 분리',
            over: 'Free / Explorer / Researcher 3티어 구독',
            why: '공기는 누구나 숨 쉬는 공익 문제라 웹 접근성은 무료여야 했고, 3티어 권한 관리는 1인 운영 부담 대비 가치가 낮았습니다. 스코프 축소는 약점이 아니라 제품 판단의 증거로 남겼습니다.',
          },
          {
            choice: 'ML two-track · 자체 개발 + 외부 모델 흡수',
            over: '전부 자체 개발',
            why: 'GNN PoC의 시공간 처리를 ClimaX 계열로 흡수했습니다. 1인 프로젝트에서 모든 엔진을 자체 구현하는 것은 검증 깊이를 희생시키기 때문에, "무엇을 직접 만들고 무엇을 위임할지"를 먼저 정했습니다.',
          },
          {
            choice: '디자인 시스템(토큰 SOT · 8축 coherence)을 먼저 잠그기',
            over: '화면별로 고쳐 나가기',
            why: '프론트엔드가 백엔드·ML보다 오래 걸린 원인은 실력이 아니라 레거시 관습과 CSS cascade가 겹친 "보이지 않는 경계"였습니다. 화면별 수정은 드리프트를 누적시켰고, 토큰 단일 출처와 lint로 잠근 뒤에야 churn이 멈췄습니다. 다시 한다면 디자인 시스템부터 합니다.',
          },
          {
            choice: 'AI 실패를 규칙과 훅으로 자산화',
            over: '매번 사람이 잡기',
            why: '기록을 안 보고 추측 · 검증 없이 "완료" 단정 · 한 조각만 보고 판단, AI 협업에서 가장 비싼 실수는 코드 버그가 아니라 이미 결정된 것을 추측으로 뒤집는 것이었습니다. 사람이 매번 잡는 대신 memory-discipline 룰과 검증 게이트가 잡게 만들었고, 그 체계가 Agent 하네스가 됐습니다.',
          },
          {
            choice: '레포 3분리 + Supabase 완전 은퇴 → Hugging Face 데이터 플레인',
            over: '단일 모노레포 + Supabase 유지',
            why: '데이터·ML·웹의 경계가 흐려지며 배포 위험이 한 레포에 뒤섞였습니다. AirLens(데이터·ML, private) · airlens-data(수집, private) · airlens-web(웹 제품, public)으로 분리하고, Supabase는 완전히 은퇴시켜 Hugging Face 데이터셋(read-only 소비) + Cloudflare Workers로 데이터 플레인을 재구성했습니다.',
          },
        ],
        meta: {
          title: 'AirLens 케이스스터디 · 조용민',
          description: 'SDID 인과추론 데이터 함정, TFT train≠serve 버그, RLS 132→6 · AirLens에서 어려웠던 점과 해결, 적용한 최신 기술.',
        },
        links: [
          { label: 'airlens.cloud', url: AIRLENS },
          { label: 'GitHub', url: AIRLENS_WEB_REPO },
        ],
      },
      agent: {
        name: 'Agent',
        tagline: '멀티런타임 에이전트 거버넌스 하네스 · Claude Code 플러그인',
        status: 'MIT OSS · 2026-04 → 현재 · 본인 프로젝트 2곳에서 실운영 (외부 채택 없음)',
        overview:
          'Agent는 Claude Code·Codex·Gemini 세 AI 런타임을 하나의 정책으로 제어하는 멀티런타임 거버넌스 하네스입니다. "정책을 코드로" 강제해, 어떤 런타임을 쓰든 같은 보안·안전 규칙이 작동하게 만드는 것이 목표였습니다. 가장 까다로웠던 세 가지 문제입니다.',
        frame: {
          problem: 'AirLens를 AI 에이전트와 만들면서 같은 실수가 반복됐습니다. 기록을 안 보고 추측하고, 검증 없이 완료라고 하고, 시크릿 파일을 읽으려 하고, 세 런타임(Claude Code · Codex · Gemini)마다 보안 훅을 따로 복제해야 했습니다. 사람이 매번 잡는 방식은 확장되지 않았습니다.',
          role: '위협 모델과 정책 규칙, 훅 프로토콜과 락 설계, 검증 방식(블라인드 벤치마크)을 설계했고 릴리스와 정책의 최종 결정을 맡았습니다. 훅·어댑터·테스트 구현의 대부분은 AI 에이전트가 썼습니다.',
          process: '런타임마다 훅을 복제하는 안과 canonical JSON 프로토콜 하나에 어댑터 3개를 두는 안을 비교해 후자를 택했습니다. 사용자가 직접 명령한 작업은 무조건 차단 대신 deny → ask로 격상했고, 스캐너가 없으면 커밋을 막는 fail-closed를 택했습니다. 수치는 공개 레포 기준만 쓰기로 했습니다.',
          result: '본인 프로젝트 2곳에서 실운영하며 고위험 작업 296건을 차단했고 오탐은 0건, 버그를 심은 블라인드 벤치마크에서 8/8을 검출했습니다. MIT로 공개했고 외부 채택은 아직 없습니다.',
          whyAI: 'AI에게 코드를 맡길수록 필요한 건 더 좋은 프롬프트가 아니라 실수할 수 없는 환경이었습니다. 그래서 프롬프트 대신 훅과 정책, 게이트를 만들었습니다.',
        },
        attribution: [
          {
            label: '내가 한 일',
            body: '위협 모델 정의(무엇을 막아야 하는가) · 훅 프로토콜과 락 설계 방향 · YAML 정책 규칙 설계 · 블라인드 벤치마크 등 검증 설계.',
          },
          {
            label: 'AI 에이전트가 한 일',
            body: '훅·어댑터·테스트 구현 코드의 대부분, Claude Code 등 AI 에이전트가 작성했습니다.',
          },
          {
            label: '내가 책임진 것',
            body: '릴리스와 정책의 최종 결정. 이 하네스 자체가 "AI와 함께 일하는 방식"을 시스템으로 만든 결과물입니다.',
          },
        ],
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
              '단일 도구의 침묵을 신뢰하지 마라 · 중복된 방어 레이어가 자동화가 놓치는 빈틈을 메웁니다. (이 교훈은 제 세컨드 브레인에 인사이트 노드로 증류해 두었습니다.)',
          },
        ],
        modernTech: [
          { name: 'Model Context Protocol (MCP)', why: '표준화된 도구 인터페이스로 런타임 간 이식성을 확보.' },
          { name: 'Claude Code 플러그인 패키징', why: '`/plugin install` 한 번으로 프로젝트마다 복사 없이 설치(v0.2.0).' },
          { name: 'Policy-as-Code', why: '위험 영역을 YAML로 선언해 코드 변경 없이 강제하고, 자동 배포 게이트가 위험 시 중단.' },
        ],
        decisions: [
          {
            choice: 'canonical JSON 훅 프로토콜 + 런타임별 어댑터 3개',
            over: '런타임마다 훅을 복제',
            why: 'Claude Code · Codex · Gemini는 이벤트 스키마와 생명주기가 제각각입니다. 진실원천을 하나로 두고 가장자리에서만 변환해야 보안 훅의 버그를 한 곳에서 고칠 수 있습니다.',
          },
          {
            choice: '사용자가 직접 명령한 작업은 deny → ask로 격상',
            over: '자동 차단 유지 / 가드 끄기',
            why: '"내가 명령한 건 접근 가능하게"라는 요구에 가드를 끄는 대신 결정을 사람에게 올렸습니다. 자동 통과는 없고 명시 의도는 존중하는 절충, 보안 완화는 스위치가 아니라 결정의 격상이어야 합니다.',
          },
          {
            choice: '스캐너가 없으면 커밋을 막는 fail-closed 훅',
            over: '"미설치면 건너뜀"',
            why: '.gitleaks.toml이 있어도 훅이 안 돌면 검사는 없는 것입니다. 실제로 디렉터리 임포트로 딸려온 .env가 한 달 넘게 원격에 있었고, 손으로 gitleaks를 돌려서야 발견했습니다. 설정은 규칙이지 게이트가 아니고, 조용히 통과시키는 훅은 없는 것보다 나쁩니다.',
          },
          {
            choice: '공개 레포 기준 수치만 게시 (17 hooks · 3 runtimes)',
            over: '사설 버전의 더 큰 숫자',
            why: '정리 전 사설 버전에는 훅과 에이전트가 더 많았지만 외부가 검증할 수 없는 수치는 쓰지 않기로 했습니다. 부풀린 숫자 하나가 나머지 실측 전부의 신뢰를 깎습니다.',
          },
          {
            choice: '버그를 심은 블라인드 벤치마크로 검출력 측정',
            over: '자기 보고식 "잡았다"',
            why: '리뷰 에이전트가 정말 버그를 잡는지는 답을 모르는 상태에서 재야 합니다. 8개 픽스처에 결함을 심고 블라인드로 돌려 8/8을 얻었고, 그 방법을 README에 공개해 재현 가능하게 했습니다.',
          },
        ],
        meta: {
          title: 'Agent 케이스스터디 · 조용민',
          description: '크로스런타임 훅 추상화, 멀티세션 락, 스캐너가 놓친 시크릿 방어 · Agent 하네스에서 어려웠던 점과 해결, 적용한 최신 기술.',
        },
        links: [{ label: 'GitHub', url: `${GITHUB}/Agent` }],
      },
      brain: {
        name: 'Second Brain',
        tagline: '타입드 지식 그래프 · 결정적 린트 게이트 · 3D 뉴런 시각화 · 로컬 우선',
        status: '개인 인프라 · 2026-06 → 현재 · 원자 노트 268 · typed edge 890 · orphan 0 · lint 0',
        overview:
          '모델이 바뀌어도 도구가 바뀌어도 남는 "포터블 컨텍스트"를 만들기 위해 시작한 개인 지식 그래프입니다. Karpathy의 LLM Wiki 패턴 위에 10종 노드 타입과 10종 typed edge를 얹었고, 캡처와 증류를 두 층으로 분리했습니다. 캡처는 모델 호출 없는 스크립트가, 증류는 LLM이 5개 게이트를 통과한 항목만 원자 노트로 승격합니다. 그래프 추출·린트·정직 집계·3D 시각화가 전부 결정적 스크립트로 돌아가고, 린트가 0이 아니면 세션을 끝낼 수 없습니다.',
        frame: {
          problem: '매일 AI와 일하며 얻은 판단과 실패가 세션이 끝나면 사라졌고, 같은 것을 다시 물어보고 있었습니다. 노트 앱에 쌓아 봤지만 "관련 있음" 링크만 있어서 찾을 수도, 검증할 수도 없었습니다.',
          role: '노드·엣지 스키마, 캡처와 증류를 나누는 워크플로우, 5개 승격 게이트와 린트 규칙을 설계했고 매일의 증류 판단을 직접 합니다. 스크립트와 3D 뷰어 구현의 대부분은 AI 에이전트가 썼습니다.',
          process: '일반 백링크 대신 10종 typed edge를, Notion 대신 마크다운·git·결정적 스크립트를 골랐습니다. 프로젝트 문서 668개를 통째로 넣어 봤다가 위키가 오염되는 것을 겪고 "복사가 아니라 증류" 규칙을 세웠고, 설정 파일만 있고 훅이 없어 시크릿이 새는 사고를 겪은 뒤 fail-closed 게이트로 바꿨습니다.',
          result: '원자 노트 268개, typed edge 890개, orphan 0, 린트 0을 유지하고 있습니다. 세션 기록이 재사용 가능한 규칙으로 바뀌었고, 이 포트폴리오의 케이스와 결정 기록 대부분이 여기서 나왔습니다.',
          whyAI: '캡처는 모델 호출 없이 기계가 하고, 증류는 LLM이 합니다. 요약하며 저장하면 원본이 사라지기 때문에 LLM은 나중에, 게이트를 통과한 것만 승격하는 자리에만 둡니다.',
        },
        attribution: [
          { label: '내가 한 일', body: '스키마(노드·엣지 타입) 설계 · 2-tier 캡처/증류 워크플로우와 5게이트 규칙 제정 · 린트·통계·시각화 파이프라인 요구 정의 · 매일의 증류 판단 자체.' },
          { label: 'AI 에이전트가 한 일', body: '스크립트(extract_graph · wiki_lint · stats · build_viz · query · brain_sync)와 neuron-cosmos 3D 뷰어의 구현 대부분, 노트 초안.' },
          { label: '내가 책임진 것', body: '무엇을 위키에 올리고 무엇을 raw에 남길지의 최종 판단, 정직 집계 규칙, 시크릿 게이트 사고 이후의 fail-closed 정책.' },
        ],
        metrics: [
          { value: '268', label: '원자 노트 (typed)' },
          { value: '890', label: 'typed edges · 10종 전부 사용' },
          { value: '0', label: 'orphan · lint findings' },
          { value: '4,985', label: '3D 뷰 전체 레이어 노드' },
          { value: '≤3', label: '세션당 자동 승격 상한' },
        ],
        timeline: [
          { date: '2026-06-10', label: '브레인 구축 · 스키마·스크립트 초기화' },
          { date: '2026-06-15', label: 'AirLens 668파일 bulk import → 격리 · 규칙 11 발의' },
          { date: '2026-07-13', label: '시크릿 사고 발견 → fail-closed pre-commit 게이트' },
          { date: '2026-07-17', label: 'neuron-cosmos 3D 뷰어 · 5레이어 4,985노드' },
          { date: '2026-07-18', label: '/record 캡처 전용 재설계 (2-tier 확정)' },
        ],
        sections: [
          {
            id: 'bulk',
            title: '위키를 오염시킨 668개 파일 (규칙 11의 탄생)',
            hard:
              '프로젝트 볼트를 "브레인으로 통합"하면서 668개 문서를 위키에 통째로 복사했습니다. 그래프는 커졌지만 typed edge 없는 노드가 쏟아져 린트가 무의미해졌고, 검색은 증류된 통찰 대신 운영 문서를 돌려줬습니다. 노드 수는 늘었는데 지식은 늘지 않았습니다.',
            solution:
              '전량을 raw/ 격리 구역으로 되돌리고 "위키에는 증류된 typed 원자 노트만"이라는 규칙 11을 세웠습니다. 이후 외부 볼트는 내재화(심링크)하되 브레인 위키와 병합하지 않고, 재사용 가능한 통찰만 선별해 옮깁니다. 이 사건이 뒤에 나오는 시크릿 사고와도 같은 뿌리였습니다.',
            tech: ['LLM Wiki 패턴', 'raw/ 격리 구역', '규칙 11, distill, don’t copy'],
            lesson: '노드 수는 지표가 아닙니다. 그래프의 가치는 엣지의 밀도와 각 노드가 "하나의 아이디어"인지에 있습니다.',
          },
          {
            id: 'gate',
            title: '설정 파일은 게이트가 아니었다 (시크릿 사고)',
            hard:
              '.gitleaks.toml이 있어서 "이 레포는 스캔이 걸려 있다"고 믿고 있었습니다. 실제로는 훅이 설치돼 있지 않았고, 몇 달 전 디렉터리 단위 임포트가 .env(실제 API 키 2종·GPU 키·SSH 개인키)를 함께 가져와 한 달 넘게 원격에 올라가 있었습니다. 손으로 gitleaks를 돌려서야 발견했습니다.',
            solution:
              '키를 전부 폐기·교체하고, pre-commit 훅을 fail-closed로 만들었습니다 · gitleaks가 없으면 커밋 자체를 막습니다. core.hooksPath는 로컬 설정이라 클론마다 setup 스크립트를 밟아야 한다는 사실을 README에 명시했고, 이후 모든 디렉터리 임포트 전에 .env·pem·id_* 스캔을 절차로 넣었습니다.',
            tech: ['gitleaks', 'fail-closed pre-commit', 'core.hooksPath'],
            lesson: '규칙이 있느냐가 아니라 무엇이 그 규칙을 돌리느냐를 확인해야 합니다. 조용히 통과시키는 게이트는 없는 것보다 나쁩니다, 있다고 믿게 만드니까요.',
          },
          {
            id: 'honest',
            title: '정직 집계 · index의 숫자는 stats.py와 같아야 한다',
            hard:
              '초기 index.md에는 "710 노드" 같은 수치가 있었는데, 소스 요약 노트와 원자 노트가 섞여 있었고 사람이 손으로 적은 추정치였습니다. 브레인이 자랑하는 숫자가 정확히 무엇을 세는지 스스로 설명할 수 없었습니다.',
            solution:
              'stats.py가 atomic(typed edge 보유)과 source를 분리 집계하고, index.md 수치는 이 산출값과 일치해야 한다는 규칙 12를 세웠습니다. 결과 268 원자 노트 · 890 엣지 · orphan 0 · 작아졌지만 전부 설명 가능한 숫자입니다.',
            tech: ['scripts/stats.py', '규칙 12, 정직 통계'],
            lesson: '포트폴리오의 숫자도 같은 규칙을 따릅니다. 설명 못 하는 숫자는 쓰지 않습니다.',
          },
          {
            id: 'cosmos',
            title: '4,985노드를 3D로 · force layout이 코어에서 폭발하다',
            hard:
              '위키 코어에 영역·기록·계획·서버 레이어를 동심 쉘로 얹어 4,985노드를 WebGL로 그리려 하자, 혼합 그래프에서 force layout이 허브 주변에서 발산해 코어가 뭉개졌습니다. 브라우저 메인 스레드에서는 프레임이 떨어졌습니다.',
            solution:
              '레이아웃을 Web Worker에서 사전 계산해 정적 좌표로 저장하고, 렌더는 좌표만 읽게 분리했습니다. 기본 뷰는 wiki-only, ?layers=all로 확장. 데이터 재생성은 세 스크립트를 순서대로 돌리는 결정적 절차로 고정했습니다.',
            tech: ['Three.js', 'Web Worker 사전 레이아웃', 'Vite'],
            lesson: '시각화의 병목은 렌더가 아니라 레이아웃이었습니다. 계산과 표현을 분리하면 둘 다 단순해집니다.',
          },
        ],
        decisions: [
          { choice: 'typed edge 10종', over: '일반 백링크', why: '"관련 있음"은 정보가 아닙니다. supports · contradicts · triggered-by처럼 관계의 종류가 있어야 그래프를 순회해 질문에 답할 수 있고, 린트가 깨진 관계를 잡을 수 있습니다.' },
          { choice: '마크다운 + git + 결정적 스크립트', over: 'Notion·전용 DB', why: '모델과 도구가 바뀌어도 남아야 하는 자산이라 잠금 없는 형식을 골랐습니다. 그래프 추출·린트·통계가 전부 파일 위에서 돌아가고 diff로 검토됩니다.' },
          { choice: '캡처(기계) / 증류(LLM) 2-tier 분리', over: '캡처 시점 요약', why: '요약하며 캡처하면 원본이 사라지고 나중에 검증할 수 없습니다. 캡처는 모델 호출 없이 전문을 남기고, 증류는 나중에 5개 게이트를 통과한 것만 승격합니다, 세션당 3개 상한으로 bulk를 막습니다.' },
          { choice: '린트 0이 아니면 세션 종료 금지', over: '경고만 남기기', why: '깨진 엣지와 고아 노드는 방치되면 복리로 쌓입니다. 완료 조건을 "TOTAL findings: 0"으로 고정하니 그래프가 항상 순회 가능한 상태로 유지됩니다.' },
        ],
        modernTech: [
          { name: 'LLM Wiki (Karpathy)', why: '"Obsidian이 IDE, LLM이 프로그래머, 위키가 코드베이스" · 검색하고 잊는 RAG 대신 축적하고 복리로 자라는 위키.' },
          { name: 'v2 메모리 생명주기', why: 'confidence · last_verified · supersedes 필드로 신뢰도·망각·대체를 추적 · 린트가 저신뢰·stale 노트를 surface.' },
          { name: 'Three.js + Web Worker', why: '4,985노드 5레이어 뉴런 우주 · 레이아웃 사전 계산, WebGL 폴백은 2D 그래프.' },
          { name: 'gitleaks fail-closed', why: '스캐너 부재 시 커밋 차단 · "설정은 규칙, 훅이 게이트".' },
        ],
        meta: {
          title: 'Second Brain 케이스스터디 · 조용민',
          description: '타입드 지식 그래프 268노드·890엣지, bulk import 오염과 시크릿 사고에서 배운 게이트 설계, 4,985노드 3D 시각화 · 개인 지식 인프라를 만든 기록.',
        },
        links: [],
      },
      pitter: {
        name: 'Pitter-Petter WGS',
        tagline: '희귀 혈액질환 반려견 전장유전체 분석 프로토타입 · 계산·추론 플레인 분리 · 사전등록 측정',
        status: '이어드림스쿨 산업연계 · 단독 수행 · 2026-07 → 08 · 표준 8단계 라이프사이클 전 구간 실측 · 이중 보고서 렌더까지',
        overview:
          '기업이 제공한 반려견 한 마리의 paired FASTQ를 정렬 → 변이 검출 → 주석 → 집단 빈도 필터 → 후보 우선순위화 → 근거 등급 보고서까지 연결한 로컬 WGS 파이프라인입니다. 검증된 생물정보학 도구가 계산을 맡고, 로컬 LLM(llama.cpp · Qwen)은 비식별 집계와 후보의 해석·보고서 검증만 합니다. 개에는 truth set이 없으므로 "정확도"를 주장하지 않고, 도구 간 불일치의 크기와 출처를 측정합니다. 모든 지표는 수치를 보기 전에 계약 파일로 동결했습니다.',
        frame: {
          problem: '희귀 혈액질환 반려견 한 마리의 전장유전체 데이터를 기업이 제공했지만, 개에는 사람 같은 병원성 truth set이 없고 원시 데이터는 외부로 나갈 수 없었습니다. 초기 범위는 품질 분석과 해석 보조에 머물러 있었는데 제안서는 정렬부터 보고서까지 전체를 요구했습니다.',
          role: '단독으로 문제 재정의, 파이프라인 아키텍처, reference·caller·annotator 선택, 측정 계약 사전 등록, 결과 해석과 보고서, 데이터 서약 준수 설계를 맡았습니다. 스크립트 구현의 대부분은 AI 에이전트가 썼습니다.',
          process: '계산(BWA·bcftools·freebayes)과 추론(로컬 llama.cpp)을 분리했습니다. 정확도를 잴 수 없으니 두 caller와 세 annotator를 돌려 불일치의 크기를 쟀고, 지표·합격선·검증 방식을 수치를 보기 전에 계약 파일로 동결했습니다. 클라우드 LLM 대신 CPU 로컬 모델을 택해 속도를 감수했습니다.',
          result: '표준 8단계 라이프사이클 전 구간에 실측값이 생겼고 이중 보고서까지 렌더했습니다. 합격 2건과 불합격 2건을 그대로 보고했고, 원시 데이터 반출과 병원성 단정은 0건입니다.',
          whyAI: 'LLM은 후보표를 사람이 읽을 문장으로 옮기는 서술층에만 뒀고, 그 층이 절대 하지 말아야 할 것(표 밖 유전자 언급, 병원성 단정, 가명 뒤 정보 누출)을 지표로 재서 0건임을 확인했습니다. 계산을 LLM에 맡기지 않은 이유는 재현성과 보안 둘 다였습니다.',
        },
        attribution: [
          { label: '내가 한 일', body: '문제 재정의(제안서 17쪽 대조) · 계산/추론 플레인 분리 아키텍처 · reference·caller·annotator 선택 근거 · 측정 계약(지표·합격선·CV 방식·중단 게이트) 사전 등록 · 결과 해석과 보고서 · 데이터 서약 준수 설계.' },
          { label: 'AI 에이전트가 한 일', body: '파이프라인 스크립트·평가 코드·문서 렌더의 구현 대부분, 문헌 노트 초안.' },
          { label: '내가 책임진 것', body: '원시 데이터가 기기를 떠나지 않는다는 0순위 원칙, 반출 게이트, 그리고 FAIL로 나온 지표를 그대로 보고하는 결정.' },
        ],
        metrics: [
          { value: '8 / 8', label: '표준 라이프사이클 단계 실측' },
          { value: '0.3677', label: 'caller 간 Jaccard (bcftools · freebayes)' },
          { value: '88.7%', label: '집단 대립빈도 필터로 탈락' },
          { value: '4 / 4', label: '주석 도구 결정론 (동일 해시)' },
          { value: '0', label: '원시 데이터 반출 · 병원성 단정' },
        ],
        timeline: [
          { date: '2026-07-31', label: '문제 정의 확정 · 계산/추론 플레인 분리' },
          { date: '2026-08-07', label: '사전등록 지표 실측 (M1–M4)' },
          { date: '2026-08-08', label: '지도학습 M5 · 합격 2 · 불합격 2 그대로 보고' },
          { date: '2026-08-09', label: '집단 빈도 · ROH · 구조변이 · 8단계 완주' },
          { date: '2026-08', label: 'AVCG 채점 · 이중 보고서 렌더 · Pages 비식별 공개' },
        ],
        sections: [
          {
            id: 'planes',
            title: 'LLM이 계산을 대체하지 않게 · 두 플레인의 경계',
            hard:
              '초기 정의는 "FASTQ 품질 분석 + 후보 변이 해석 Copilot"에 치우쳐 있었는데, 제안서는 정렬부터 보고서까지 전체를 요구했습니다. 생성 모델이 파이프라인 중간에 끼면 재현성이 깨지고, 기업 데이터가 모델 프롬프트로 새어 나갈 위험도 있었습니다.',
            solution:
              'Bioinformatics Compute Plane(BWA-MEM · samtools · bcftools · freebayes · 결정론)과 Local AI Reasoning Plane(llama.cpp CPU · 127.0.0.1만 허용)을 분리했습니다. LLM은 가명화된 후보·집계·근거만 읽고, 원시 read·서열·경로는 프롬프트에도 로그에도 남기지 않습니다. reference는 Dog10K 집단 VCF 좌표와의 호환성으로 canFam4를 1순위로 두되, 회사 내부 빌드 확인 전엔 확정하지 않았습니다.',
            tech: ['BWA-MEM · samtools · bcftools · freebayes', 'llama.cpp · Qwen 4B/8B (CPU)', 'canFam4 · Dog10K'],
            lesson: 'reference assembly는 파일 하나가 아니라 데이터 계약입니다. 집단 VCF·주석·contig 이름·회사의 기존 산출물까지 좌표가 맞아야 선택이 끝납니다.',
          },
          {
            id: 'contract',
            title: '수치를 보기 전에 지표를 동결하다 · 그리고 FAIL을 그대로 적다',
            hard:
              '단일 검체·유전자 7~29개라는 작은 표본에서 지도학습을 돌리면 어떤 지표든 골라서 "잘 됐다"고 말할 수 있습니다. 게다가 개에는 truth set이 없어 정확도 자체가 정의되지 않습니다.',
            solution:
              '지표·합격선·교차검증 방식·중단 게이트를 measurement_contract.json에 동결한 뒤에만 수치를 봤습니다. 결과: caller 합의 예측 AUROC 0.9778(PASS)이지만 단일 특징 QUAL 하나가 0.9822로 더 높았고, 잔기 판별(ESM-2 + phyloP, LOGO)은 0.6664로 FAIL, 결합이 단일보다 나빴습니다(Δ −0.1037). 순환성 감사는 통과. 전부 헤더에 "합의는 진실이 아니다"를 기계 삽입해 보고했습니다.',
            tech: ['사전등록 측정 계약', 'leave-one-gene-out CV', '유전자층 부트스트랩 · 그룹보존 순열 검정'],
            lesson: '합격만 읽으면 표를 잘못 읽은 것입니다. 사전등록은 결과를 좋게 만들지 않지만, 결과를 믿을 수 있게 만듭니다.',
          },
          {
            id: 'disagreement',
            title: '정확도 대신 불일치를 잰다',
            hard:
              '"어느 caller가 더 정확한가"는 개에서 답할 수 없는 질문입니다. 그런데 단일 caller 결과를 단정적으로 읽으면 리포트가 잘못된 확신을 전달합니다.',
            solution:
              'bcftools와 freebayes를 둘 다 돌려 교집합·차집합을 실측했습니다(Jaccard 0.3677 · 셋 중 하나만 공유). 공유 변이의 Ts/Tv 2.44와 Dog10K 중복률 0.931이 각 도구 고유분보다 높다는 것으로 "공유분이 더 신뢰할 만하다"는 방향만 확인했고, 주석 도구 3종(VEP · snpEff · csq)은 동일 GFF3에서 쌍별 일치 0.98/0.85/0.84와 결정론 4/4를 쟀습니다. 집단 대립빈도 필터 한 단계가 후보의 88.7%를 걷어냈습니다.',
            tech: ['다중 caller 합의', 'Ts/Tv · 집단 중복률 검정', 'VEP · snpEff · bcftools csq'],
            lesson: '"안 봤다"와 "봤는데 없다"는 리포트에서 전혀 다른 문장입니다. 구조변이·ROH처럼 SNV caller가 못 보는 것도 봤다는 사실 자체를 남겨야 합니다.',
          },
          {
            id: 'narrator',
            title: '로컬 LLM 서술층에 가드레일을 재다',
            hard:
              '후보표를 사람이 읽을 문장으로 옮기는 서술층은 가장 유용하면서 가장 위험합니다 · 표 밖 유전자를 지어내거나, 병원성을 단정하거나, 가명 뒤의 정보를 흘릴 수 있습니다.',
            solution:
              'Qwen 4B와 8B를 같은 스키마 제약 아래 돌리고 6개 지표를 쟀습니다: 표 밖 유전자 서술 0건, 병원성 단정 0건, 빈 후보표에서 명명 0건, 자유서술 유전자 누출은 4B에서 3/5 → 필터 후 0/5. 수치 오귀속은 4B 1건으로 미달을 그대로 적었습니다. AVCG 기준 채점은 23개 중 6개만 근거 있음으로 표기했습니다.',
            tech: ['스키마 제약 생성', '누출 필터', 'AVCG 채점 체크리스트'],
            lesson: 'LLM을 민감 도메인에 넣을 때 질문은 "얼마나 잘 쓰나"가 아니라 "무엇을 절대 하지 않나"이고, 그것은 측정해야 합니다.',
          },
        ],
        decisions: [
          { choice: 'canFam4 (UU_Cfam_GSD_1.0)를 reference 1순위', over: 'canFam3', why: 'Dog10K 집단 변이 VCF와 좌표가 맞아야 빈도 필터가 성립합니다. 다만 회사의 기존 산출물 빌드 확인 전엔 확정하지 않고 후보로 두었습니다.' },
          { choice: 'DeepVariant는 작은 interval 비교 실험으로 제한', over: '단독 정답 caller로 채택', why: '내장 모델이 사람 데이터로 학습된 점을 반영했습니다. 개 WGS에서 그 결과를 정답처럼 쓰면 근거 없는 확신이 됩니다.' },
          { choice: '지표를 계약 파일에 사전 등록', over: '결과를 보고 지표 선택', why: '표본이 작을수록 사후 지표 선택은 원하는 결론을 만들어냅니다. 라벨 유병률만 보고 CV 분할을 정한 뒤 성능은 동결 뒤에만 봤고, "블라인드가 아니다"라는 사실도 문서 맨 위에 적었습니다.' },
          { choice: '로컬 CPU llama.cpp', over: '클라우드 LLM API', why: '데이터 서약상 원시 파생물은 어떤 외부 위치에도 두지 않습니다. 정렬·변이 검출과 CPU quota를 나눠 쓰는 대신 추론 속도(4B 15 tok/s · 8B 8.7 tok/s)를 감수했습니다.' },
          { choice: '합의 예측 점수는 근거 주석, 순위엔 불개입', over: 'ML 점수로 후보 순위 결정', why: '순위는 (tier, −QUAL, contig, pos)의 명시 규칙으로만 정합니다. 합의를 예측하는 모델은 합의를 예측할 뿐 진실을 예측하지 않기 때문입니다.' },
        ],
        modernTech: [
          { name: 'ESM-2 잔기 임베딩', why: '단백질 언어 모델로 병원성 잔기 변별 · 결합 AUROC 0.7163(합격), 단 LOGO 일반화에선 FAIL로 정직 보고.' },
          { name: 'Dog10K 집단 빈도', why: '종 수준 흔한 다형성 제거 · 후보 88.7% 탈락, 이 분야에서 가장 큰 단일 축소 단계.' },
          { name: 'ROH 기반 열성 사전확률', why: '자가접합 구간(F_ROH 0.2004) 내부 후보 57건 · 단일 검체라 진단이 아닌 사전확률 조정까지만.' },
          { name: '반출 게이트 sanitize_or_die', why: 'GitHub Pages 공개본은 좌표·유전형·서열 없는 비식별 집계만 · 경계 테스트로 강제.' },
        ],
        meta: {
          title: 'Pitter-Petter WGS 케이스스터디 · 조용민',
          description: '반려견 전장유전체 파이프라인 · 계산/추론 플레인 분리, 사전등록 측정 계약, truth set 없는 도메인에서 불일치를 재는 법, 로컬 LLM 서술층 가드레일.',
        },
        links: [{ label: 'Pages (비식별 집계)', url: 'https://joymin5655.github.io/Pitter-petter/' }],
      },
      posture: {
        name: '바른자세 지킴이',
        tagline: 'KT AIVLE 빅프로젝트 · 6인 팀 · 프론트엔드 ~80% 주도 · 2026년 브라우저 ONNX로 재점화',
        status: '2023.08 → 2024.01 팀 프로젝트 (Collaboration상) · 2026 사후 제작 브라우저 라이브 데모',
        overview:
          '웹캠으로 자세를 실시간 분류해 나쁜 자세가 1분 넘게 이어지면 알려주는 헬스케어 웹 서비스입니다. 팀에서 프론트엔드를 약 80% 주도해 실시간 모니터링·통계 대시보드·스트레칭 가이드·챗봇 UI를 만들었고, 팀의 XGBoost 분류기와 LangChain RAG 챗봇을 통합했습니다. 그러나 완성된 결과물을 서버에 올리는 데 실패했습니다. 2026년, 그 실패를 갚기 위해 서버가 하던 일을 전부 브라우저로 옮긴 라이브 데모를 만들었고, 파이썬 원본과 오차 0.000005로 일치함을 검증했습니다.',
        frame: {
          problem: '오래 앉아 일하면 거북목이 되는데 자기 자세를 실시간으로 알려주는 도구가 없었습니다. 팀 6명 중 웹 서비스를 만들어 본 사람이 없었고, 화면과 데이터를 어떻게 보여줄지 의견이 갈렸습니다.',
          role: '프론트엔드 약 80%를 자원해 맡았습니다. 실시간 모니터링 화면, 통계 대시보드 지표 설계, 스트레칭 가이드, 챗봇 UI를 만들고 팀의 XGBoost 분류기와 RAG 챗봇을 통합했습니다. 2026년의 브라우저 라이브 데모는 AI 에이전트와 함께 사후 제작했습니다.',
          process: '의견 충돌은 사용자 기준을 문서로 정리해 풀었습니다. 모델은 픽셀 CNN 대신 관절 랜드마크 특징과 XGBoost를 택해 조명과 거리가 달라져도 흔들리지 않고 CPU에서 실시간으로 돌게 했습니다. 프로젝트 마지막 배포는 인프라 지식 부족으로 실패했고, 2026년에 서버를 다시 올리는 대신 판정을 전부 브라우저(WASM + ONNX)로 옮기는 안을 택했습니다.',
          result: 'Collaboration상을 받았고, 배포 실패는 인프라·CI/CD를 파고드는 전환점이 됐습니다. 2026년 라이브 데모는 파이썬 원본과 오차 0.000005로 일치하며 외부 요청 0건으로 동작합니다.',
        },
        attribution: [
          { label: '내가 한 일 (2023–24)', body: '프론트엔드 약 80%, 실시간 모니터링 화면·통계 대시보드 지표 설계·스트레칭 가이드·챗봇 UI · 모델 선택 논의 참여 · 화면 구조와 데이터 흐름 문서화로 팀 합의 도출.' },
          { label: '팀이 한 일', body: 'XGBoost 자세 분류기(AI 2인) · Django 백엔드·인증(백엔드 2인) · 데이터 증강.' },
          { label: '내가 한 일 (2026)', body: '브라우저 라이브 데모, 특징 계산 JS 이식, XGBoost → ONNX, 패리티 검증, CSP·벤더 번들, AI 에이전트 협업으로 사후 제작.' },
        ],
        metrics: [
          { value: '6', label: '팀원 · FE ~80% 주도' },
          { value: '5', label: '자세 클래스 (바른 + 나쁜 4)' },
          { value: '201', label: '관절 거리·각도 특징' },
          { value: '0.000005', label: '브라우저 ↔ 파이썬 특징 오차' },
          { value: '0', label: '라이브 데모 외부 요청' },
        ],
        timeline: [
          { date: '2023.08', label: 'KT AIVLE 4기 시작 (840h)' },
          { date: '2023.12 – 2024.01', label: '빅프로젝트 · 웹 서비스 경험 없는 팀에서 FE 자원' },
          { date: '2024.01', label: 'Collaboration상 · 배포 실패' },
          { date: '2026', label: '브라우저 ONNX 라이브 데모 · 패리티 검증' },
        ],
        sections: [
          {
            id: 'team',
            title: '웹 서비스 경험이 없는 팀에서 프론트를 자원하다',
            hard:
              '6인 팀 누구도 웹 서비스를 만들어 본 적이 없었고, 초기에 데이터를 어떻게 보여줄지·화면을 어떻게 구성할지 의견이 갈렸습니다. 감정적 설득으로는 정렬이 되지 않았습니다.',
            solution:
              '사용자 입장에서 어떤 정보가 가장 직관적인지 기준을 먼저 정리하고, 화면 구조와 데이터 흐름을 문서로 만들어 지속적으로 공유했습니다. 통계 대시보드의 지표(바른/나쁜 자세 비율·주간 추이)는 제가 정했고, 알림 임계값 같은 UX 규칙은 문서 위에서 합의했습니다. 결과적으로 역할 분담과 개발 방향이 명확해졌고 Collaboration상을 받았습니다.',
            tech: ['Django 4.2.7 · jQuery', 'Chart.js', 'django-allauth (Google · Naver)'],
            lesson: '의견 충돌은 개인 주장이 아니라 사용자 기준 + 문서화로 푸는 게 가장 빠릅니다. 이 원리는 이후 AirLens에서도 그대로 씁니다.',
          },
          {
            id: 'model',
            title: '픽셀이 아니라 관절로 · 경량 분류기를 선택한 이유',
            hard:
              '웹캠 프레임을 그대로 CNN에 넣으면 거리·조명·마스크 착용에 취약하고, CPU에서 실시간으로 돌리기 어려웠습니다.',
            solution:
              'MediaPipe로 관절 랜드마크를 뽑고 코·눈·귀·어깨·손목 9개 관절의 거리·각도 201개를 특징으로 XGBoost가 5클래스를 분류하는 방식으로 팀과 합의했습니다. 랜드마크 기반이라 거리·조명·마스크가 달라져도 흔들리지 않았고, 실시간 판정이 가능했습니다(본인 확인 기준 85–90% @ 30 FPS).',
            tech: ['MediaPipe Holistic (33 landmarks)', '거리·각도 특징 201', 'XGBoost 5-class'],
            lesson: '문제의 불변량(관절 관계)에 맞는 표현을 고르면 모델은 작아도 됩니다.',
          },
          {
            id: 'deploy',
            title: '배포에 실패하다 · 인프라로 방향을 튼 전환점',
            hard:
              '프로젝트 마지막, 완성된 Django 앱을 서버에 올리는 단계에서 막혔습니다. 클라우드·네트워크 인프라 지식이 없어 호스팅 자체가 되지 않았고, 팀이 고생해 만든 모델이 서비스화되지 못하는 것을 봤습니다.',
            solution:
              '당시엔 해결하지 못했습니다. 대신 "아무리 좋은 모델도 배포되지 않으면 의미가 없다"는 결론을 얻고, 프로젝트 종료 후 인프라·CI/CD·클라우드를 집중 학습했습니다. 그 결과가 GitHub Actions로 자동 배포되고 1인이 운영하는 AirLens입니다.',
            tech: ['- (실패 기록)'],
            lesson: '가장 아쉬웠던 순간이 가장 큰 전환점이었습니다. 실패를 숨기지 않고 다음 프로젝트의 요구사항으로 바꿨습니다.',
          },
          {
            id: 'browser',
            title: '2026 · 서버가 하던 일을 전부 브라우저로 옮기다',
            hard:
              'GitHub Pages는 정적 호스팅이라 서버가 없습니다. 그런데 자세 판별은 MediaPipe·파이썬 특징 계산·XGBoost .pkl 전부 서버에 있었습니다. "진짜 같은 결과가 나오나"를 증명해야 했습니다.',
            solution:
              'MediaPipe PoseLandmarker(WASM)로 같은 관절 구조를 뽑고, preprocessing.py를 자바스크립트로 이식하고, 같은 XGBoost 모델을 ONNX로 변환해 onnxruntime-web으로 추론합니다. 검증: 브라우저 특징 계산은 파이썬 원본과 오차 0.000005, ONNX 추론은 .pkl과 분류 결과·확률 일치. 영상·판정은 기기 밖으로 나가지 않고(전송 코드 자체가 없음), 라이브러리를 저장소에 번들해 외부 요청 0건, CSP로 변조 시 유출도 차단합니다.',
            tech: ['MediaPipe Tasks Vision (WASM)', 'XGBoost → ONNX · onnxruntime-web', 'CSP · 벤더 번들'],
            lesson: '2년 전 실패의 답이 "더 좋은 서버"가 아니라 "서버 없음"이었습니다. 프라이버시는 정책이 아니라 구조로 보장할 때 가장 강합니다.',
          },
        ],
        decisions: [
          { choice: '랜드마크 거리·각도 특징 + XGBoost', over: '픽셀 입력 CNN', why: '거리·조명·마스크가 달라져도 흔들리지 않고 CPU에서 실시간으로 돕니다. 문제의 불변량이 관절 관계라면 표현을 거기에 맞추는 게 모델을 키우는 것보다 낫습니다.' },
          { choice: '화면 구조·데이터 흐름을 문서로 먼저 합의', over: '구현하며 맞추기', why: '경험 없는 팀에서 구현 중 조정은 재작업으로 돌아옵니다. 사용자 기준을 문서에 적자 갈등이 판단 문제로 바뀌었습니다.' },
          { choice: '(2026) 브라우저 내 ONNX 추론', over: '서버를 다시 호스팅', why: '운영 비용 0, 프라이버시는 구조로 보장, 그리고 정적 호스팅에서도 "진짜로 동작"합니다. 단, 원본과 같다는 것을 수치로 증명해야 했습니다.' },
          { choice: '두 프론트엔드를 정직하게 구분해 표기', over: 'React 목업을 실제 앱처럼 보이기', why: '레포에는 실제 Django 앱과 목업 데이터의 React 데모가 공존합니다. 무엇이 진짜로 동작하고 무엇이 둘러보기용인지 README에 표로 적었습니다.' },
        ],
        modernTech: [
          { name: 'onnxruntime-web', why: '같은 XGBoost 모델을 브라우저에서 · 분류·확률 원본과 일치 검증.' },
          { name: 'MediaPipe Tasks (WASM)', why: '서버 Holistic과 같은 관절 구조를 클라이언트에서 추출.' },
          { name: 'LangChain + ChromaDB RAG', why: '팀 파트 · FAQ 기반 챗봇, 제가 UI를 통합.' },
          { name: 'CSP', why: '코드가 변조돼도 외부 전송을 브라우저가 차단 · 프라이버시의 마지막 층.' },
        ],
        meta: {
          title: '바른자세 지킴이 케이스스터디 · 조용민',
          description: 'KT AIVLE 빅프로젝트 · 경험 없는 팀에서 FE 80% 주도, 랜드마크 기반 경량 분류, 배포 실패라는 전환점, 그리고 2026년 브라우저 ONNX로 갚은 답.',
        },
        links: [
          { label: '라이브 데모 (브라우저 판정)', url: 'https://joymin5655.github.io/KT-AIVLE-SCHOOL/dashboard/live/' },
          { label: 'GitHub', url: `${GITHUB}/KT-AIVLE-SCHOOL` },
        ],
      },
      craft: {
        name: 'Design · Web Craft',
        tagline: 'FABLE 컬렉션 65페이지 · ALL-IN-ONE 라이브 IA 재설계 · Wardenkit · AI로 대량 제작하고 기계로 검증하는 방식',
        status: 'FABLE LIVE (2026-07) · ALL-IN-ONE LIVE · Wardenkit 스캐폴드 (2026-07-29 개시)',
        overview:
          '세 프로젝트를 하나의 방법으로 묶었습니다 · AI 에이전트로 빠르게 많이 만들되, 사람의 눈 대신 검증 하네스가 먼저 판정한다는 것. FABLE은 사이트 35 + 데이터 그래프 10 + 대시보드 15 + 애니메이션 프리미티브 라이브러리의 디자인 쇼케이스이고, ALL-IN-ONE은 운영 중인 Next.js 16 트렌드·딜 사이트의 정보구조 재설계이며, Wardenkit은 AirLens에서 쓰던 보안 훅을 남이 쓰는 킷으로 옮기는 상업 프로젝트입니다.',
        frame: {
          problem: 'AI로 페이지를 빠르게 많이 만들 수 있게 되자 병목이 제작이 아니라 검증으로 옮겨갔습니다. "디자인이 깨진다"는 제보는 왔지만 무엇이 깨졌는지 아무도 특정하지 못했고, 운영 중인 사이트는 기능이 계속 증축돼 정신없다는 체감이 있었습니다.',
          role: '디자인 방향과 토큰 규칙, 검증 하네스의 판정 기준, 물리·모션 모델 이식 판단, 정보구조 재설계의 결정, Wardenkit의 라이선스 규칙을 맡았습니다. 65페이지 구현과 스윕 스크립트, Next.js 리팩토링의 대부분은 AI 에이전트가 썼습니다.',
          process: '고치기 전에 87 page×viewport를 스윕해 레이아웃이 아니라 대비 토큰이 문제임을 먼저 확인했습니다. 모션은 Swift 라이브러리를 번역하는 대신 파라미터 모델만 옮겨 수치로 검증했고, 정보구조는 선택형 인터뷰로 결정 지점을 드러낸 뒤 토큰은 불변으로 두고 층위만 바꿨습니다.',
          result: 'FABLE 65페이지가 195/195 검증을 통과한 채 라이브이고, ALL-IN-ONE 홈은 6섹션에서 4블록으로 줄어 리뷰가 잡은 버그 2건을 배포 전에 되돌렸습니다. Wardenkit은 테스트 9 suites·225 checks의 스캐폴드 단계입니다.',
          whyAI: 'AI는 제작 속도를 올리지만 판정은 못 합니다. 그래서 검증 하네스를 사람의 눈보다 먼저 두고, 하네스 자체가 틀린 네 번의 오탐도 기록했습니다.',
        },
        attribution: [
          { label: '내가 한 일', body: '디자인 방향과 토큰 규칙 · 검증 하네스의 판정 기준 · 물리·모션 모델 이식 판단 · IA 재설계의 결정(선택형 인터뷰 답변이 곧 스펙) · Wardenkit 라이선스·정직 마케팅 규칙.' },
          { label: 'AI 에이전트가 한 일', body: '65페이지 대부분의 구현, 검증 스윕 스크립트, 이식 코드, Next.js 리팩토링.' },
          { label: '내가 책임진 것', body: '"깨진다"는 제보를 액면대로 받지 않고 측정부터 한 것, 리뷰에서 잡은 버그 2건을 배포 전에 되돌린 것, 킷에 출처 불명 파일을 넣지 않은 것.' },
        ],
        metrics: [
          { value: '65', label: 'FABLE 페이지 (35 + 10 + 15 + motion)' },
          { value: '195 / 195', label: '검증 통과 (일반 + reduced-motion)' },
          { value: '87', label: 'page × viewport 스윕' },
          { value: '6 → 4', label: 'ALL-IN-ONE 홈 섹션 → 목적 블록' },
          { value: '9 / 225', label: 'Wardenkit 테스트 suites / checks' },
        ],
        sections: [
          {
            id: 'measure',
            title: '"디자인이 깨진다" · 레이아웃이 아니라 대비였다',
            hard:
              '30페이지 규모에서 "일부 디자인이 깨진다"는 제보가 들어왔습니다. 액면대로 받으면 레이아웃을 뒤져야 했지만, 그러면 시간을 버릴 확률이 높았습니다.',
            solution:
              '먼저 검증 하네스(sweep.mjs)로 87 page×viewport를 쓸었습니다. 콘솔 에러 0, 실패 요청 0, 가로 오버플로 0 · 레이아웃은 멀쩡했습니다. 실제 결함은 muted 색 토큰의 WCAG 미달(최저 2.39:1)과 빈 렌더 3건이었습니다. 하네스 자체도 네 번 틀렸습니다(이탤릭 폰트 체크 누락, 희소 샘플링이 살아있는 점 도표를 "죽음"으로, 호버 전용 캔버스 오판, 리빌 중 대비 계산) · 각각 재사용 가능한 함정으로 기록했습니다.',
            tech: ['Playwright 스윕 하네스', 'WCAG 대비 토큰', 'reduced-motion 이중 검증'],
            lesson: '주제를 판정하기 전에 측정 도구를 판정합니다. "구성으로 검증됨"은 검증이 아닙니다.',
          },
          {
            id: 'motion',
            title: '라이브러리가 아니라 모델을 이식하다',
            hard:
              'b3ll/Motion은 Swift·Core Animation이라 웹에서 실행할 수 없습니다. 그런데 요구는 "그 느낌"이었고, 코드를 베낄 수도 라이브러리를 쓴 척할 수도 없었습니다.',
            solution:
              '코드가 아니라 모델을 옮겼습니다 · 디자이너 파라미터(damping 0–1 + response 초), 속도를 보존하는 retarget, 지수 감쇠 운동량 투사, 러버밴딩. 브라우저에서 수치로 검증했습니다: ζ=1 오버슈트 0.0000, ζ=0.7 피크 103.95, 60Hz vs 144Hz 0.5초 후 Δ0.055px, retarget 시 속도 577.0 → 577.0 보존. 페이지에 "무엇을 옮겼는지"를 명시했습니다.',
            tech: ['스프링 물리 (damping · response)', '프레임레이트 독립 검증', '/motion/ 프리미티브 라이브러리'],
            lesson: '영감의 출처와 구현의 출처를 구분해 적습니다. 이식했다면 무엇을 이식했는지, 검증했다면 어떤 수치로 했는지.',
          },
          {
            id: 'ia',
            title: '"뒤죽박죽"의 정체는 문서-코드 드리프트였다',
            hard:
              '운영 중인 ALL-IN-ONE 홈과 특가 페이지가 "정신없다"는 체감이 있었습니다. 컴포넌트와 토큰은 체계적이었는데도요. 신규 기능(쿠팡·무료앱)이 특가 하단에 계속 증축돼 6단이 됐고, 레이아웃 규칙 문서는 실제 홈보다 한 세대 뒤였습니다.',
            solution:
              'AI 기획 워크스페이스(manyfast)에 현황 인벤토리·타겟별 문제·제약을 브리핑하고 선택형 인터뷰 6문항 → PRD → 유저플로우 → 와이어프레임을 받았습니다. 가치는 기획 자체보다 인터뷰가 결정 지점을 강제로 드러낸 것 · 홈의 대표 행동은? 특가 통합 방식은? 답이 곧 스펙이 됐습니다. 홈 6섹션 → 4블록(목적 라우터), 특가 6단 → 칩 8개 탐색기, 모바일 탭바 신설. v3 토큰·다크모드·금지 규칙 9개는 불변. 리뷰가 로케일 접두사 누락(다른 언어로 튐)과 탭바가 쿠키 배너에 가리는 버그를 배포 전에 잡았습니다.',
            tech: ['Next.js 16 · React 19 · Tailwind v4', 'Supabase', 'Vercel'],
            lesson: '체감상 "정신없음"이 반드시 디자인 문제는 아닙니다. SSOT 문서가 낡으면 사람도 에이전트도 매번 코드를 다시 읽어야 하고, 그 인지 부하가 뒤죽박죽으로 느껴집니다. 그래서 코드 변경과 문서 갱신을 같은 브랜치에 묶습니다.',
          },
          {
            id: 'kit',
            title: '나만 쓰던 훅을 남이 쓰는 킷으로 · 라이선스 위생부터',
            hard:
              'AirLens에서 검증된 보안 훅을 팀용 킷으로 팔려면, 도메인 경로·테이블명 같은 종속을 제거하고 모든 파일의 출처를 확인해야 했습니다. 판매물은 "대충 동작"이 허용되지 않습니다.',
            solution:
              '판정 SSOT(LICENSING.md)를 먼저 세웠습니다 · 자작이거나 재배포 허용 + attribution 동봉만, 불명확하면 넣지 않음. 시크릿 0·내부 절대경로 0을 gitleaks로 강제하고, 실측하지 않은 성능 수치는 랜딩에 쓰지 않습니다. 무료 유입용 .claude/ 설정 오딧은 업로드 없는 클라이언트사이드로 만들었습니다. 현재 스캐폴드 단계(테스트 9 suites / 225 checks), 결제·도메인 미연동.',
            tech: ['셸·파이썬 훅 번들', '바닐라 HTML/CSS/JS (번들러 없음)', 'gitleaks · 라이선스 SSOT'],
            lesson: '자기 인프라를 남이 쓰는 인프라로 한 칸 미는 순간, 정직성 규칙이 마케팅 규칙이 됩니다.',
          },
        ],
        decisions: [
          { choice: '고치기 전에 검증 하네스부터', over: '제보대로 레이아웃 수정', why: '87 스윕이 "레이아웃은 멀쩡, 대비가 문제"를 30분 만에 알려줬습니다. 측정 없이 고쳤다면 없는 버그를 고쳤을 겁니다.' },
          { choice: '모션 모델 이식 + 수치 검증', over: '유사 라이브러리 채택 또는 코드 번역', why: 'Swift 코드는 옮길 수 없고, 웹 라이브러리는 그 느낌이 아니었습니다. 파라미터 모델만 옮기고 오버슈트·프레임레이트 독립성을 수치로 증명했습니다.' },
          { choice: 'IA는 바꾸되 v3 토큰·팔레트는 불변', over: '전면 리디자인', why: '문제는 정보구조 층위였습니다. 디자인 시스템을 건드리면 검증된 접근성·다크모드까지 다시 검증해야 합니다.' },
          { choice: 'Wardenkit은 번들러 없는 정적 사이트 + 클라이언트사이드 오딧', over: '프레임워크 앱 + 서버 업로드', why: '보안 도구의 유입 장치가 사용자 설정을 업로드하면 모순입니다. 업로드 0이 제품의 첫 약속입니다.' },
        ],
        modernTech: [
          { name: 'Next.js 16 · Tailwind v4', why: 'ALL-IN-ONE 운영 스택 · IA 재설계를 토큰 불변으로 수행.' },
          { name: 'CSS 스프링 모션 모델', why: 'damping·response 파라미터로 디자이너 언어 그대로 · 프레임레이트 독립.' },
          { name: 'Playwright 검증 스윕', why: '87 page×viewport · reduced-motion 이중 통과 195/195.' },
          { name: 'manyfast (AI 기획)', why: '선택형 인터뷰 → PRD → 와이어프레임 · 결정 지점을 강제로 드러내는 용도.' },
        ],
        meta: {
          title: 'Design · Web Craft 케이스스터디 · 조용민',
          description: 'FABLE 65페이지 쇼케이스, ALL-IN-ONE IA 재설계, Wardenkit · AI로 대량 제작하고 검증 하네스로 먼저 판정하는 방식.',
        },
        links: [
          { label: 'FABLE 컬렉션', url: 'https://fable-collection.netlify.app' },
          { label: 'Wardenkit', url: `${GITHUB}/Wardenkit` },
        ],
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
      attribution: 'Attribution, who did what',
      modern: 'Modern tech adopted along the way',
      footnote: `Traffic figures are requests, not users · last observed ${OBSERVED}`,
      decisions: 'Decision log, why this, not that',
      decisionsLead: 'Every fork in the road, with what was given up. Each row traces back to a retrospective or comparison document in the project vault.',
      over: 'over',
      status: 'Status',
      frame: { heading: 'In one paragraph · problem → role → process → result', problem: 'Problem', role: 'Role', process: 'Process', result: 'Result', whyAI: 'Why AI' },
    },
    items: {
      airlens: {
        name: 'AirLens',
        tagline: 'Air-quality intelligence SaaS · Built with AI agents · One owner · Live',
        status: 'LIVE · airlens.cloud · 2026-03 → present (capstone 2023–24 → product 2026)',
        overview:
          'AirLens fuses 10 satellite & ground data sources to estimate PM2.5, analyzes policy impact via causal inference, and turns natural-language questions into code and insight through a GPT-4o agent. I built it with a team of AI agents · from data pipeline to ML, frontend, and deployment · and I operate it solo, live across 55 countries. Here are the hardest problems, how they were solved, and the modern tech adopted along the way.',
        frame: {
          problem: 'While analysing air-quality policy effects for my thesis I saw that satellite and ground observations were scattered by country, and that no service let an ordinary person see local air quality and policy effects on one screen. Existing services showed readings but never said why, or how far to trust them.',
          role: 'I owned the whole loop alone: planning, data-source selection, ML method choice and verification design, architecture, deployment, operations and incident response. AI agents wrote most of the implementation; every merge and security gate was my call.',
          process: 'I built a pipeline fusing 10 sources first, then fixed a glass-box rule: every ML output ships with an uncertainty band and a data-quality badge. For policy effects I compared mixing sources against rebuilding the panel from a single source and chose the latter (estimable countries 6 → 53). A trained GNN that was never wired into the service was dropped from the public list.',
          result: 'A live service, operated by one person, handling 66,307 requests (not users) from 55 countries in 30 days. Weak-evidence regions show "not estimable" instead of invented numbers, and the verification habits built here became the standard for every later project.',
          whyAI: 'Questions like "why was Seoul PM2.5 high this week" cannot be answered by pre-built charts, so a GPT-4o agent that turns the question into pandas/plotly code became a product feature. Estimation and forecasting stay with verifiable statistical and ML engines; the LLM only explains their output.',
        },
        attribution: [
          {
            label: 'What I did',
            body: 'Problem definition and domain research · architecture and tech choices · data-source selection · ML methodology choices (why SDID, TFT, CORN) and verification design · every PR review and merge decision · deployment, incident response, and cost management.',
          },
          {
            label: 'What AI agents did',
            body: 'Most of the implementation code, written by Claude Code and other AI agents. For the cases below, direction and judgment were mine; implementation was done with AI agents.',
          },
          {
            label: 'What I own',
            body: 'Every merge decision, the security gates, and final accountability for what happens in production. AI output must pass machine gates (gitleaks · policy hooks) and my review before reaching main.',
          },
        ],
        metrics: [
          { value: '3.5 mo', label: 'built 2026-03 → 06' },
          { value: '10', label: 'data sources' },
          { value: '5', label: 'ML engines' },
          { value: '13', label: 'ML model workspaces' },
          { value: '4', label: 'data contracts (HF publications)' },
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
              'I estimated the effect of national air-quality policies with synthetic difference-in-differences (SDID). At first only 6 countries produced a result, and just one was statistically significant. The root cause wasn’t the algorithm · it was the data: a country’s time series switched mid-stream between incompatible sources (biased satellite reanalysis ↔ ground observations), and SDID was misreading that artificial “jump” as a policy effect.',
            solution:
              'I rebuilt the panel from a single consistent source (a constant bias cancels under differencing), added regularization to the time weights so estimation stays stable on sparse panels, and replaced the absolute-error fit gate with one normalized to pre-period level so high- and low-pollution countries are treated fairly. Finally I added an honesty gate that catches standard errors rounding to ~0 and reports them as “false precision.”',
            tech: ['Synthetic DiD (SDID)', 'Regularized time weights', 'Glass-box honesty gate'],
            lesson:
              'Estimable countries went from 6 to 53, and weakly-supported cases surface as “not estimable” instead of fabricated numbers. Even when a model gives a plausible answer, you have to ask first whether it’s signal or a data artifact · and honesty (exposing uncertainty) builds more trust than raw accuracy.',
          },
          {
            id: 'tft',
            title: 'A hidden train ≠ serve bug (TFT forecasting)',
            hard:
              'The 7-day PM2.5 forecast used a Temporal Fusion Transformer (TFT), but the encoder’s historical-observation context was wired to random-noise stubs instead of real data. Training used real data while inference used fake input · so production forecasts were disconnected from reality.',
            solution:
              'I built a resolver that pulls a real 168-hour observation window per city, mirroring the exact feature transforms used in training. If data is missing or stale, it skips that city rather than fabricating a number, and a 9-case test suite locks the input contract.',
            tech: ['Temporal Fusion Transformer', 'train/serve feature parity', 'honest skip on missing data'],
            lesson:
              'When training and serving pipelines are separate, subtle mismatches rarely show up in the metrics. You have to trace where every input actually comes from.',
          },
          {
            id: 'rls',
            title: 'Taming RLS policy sprawl (132 → 6 lint findings)',
            hard:
              'Supabase (Postgres), the database at the time, had its performance advisor flag 132 multiple-permissive RLS lint findings across 24 tables. Multiple policies for the same role/action are OR-evaluated per row · a performance tax and unnecessary attack surface. In particular, 14 service_role policies gated nothing, because service_role bypasses RLS by design.',
            solution:
              '(1) dropped the meaningless service_role policies, (2) merged duplicate SELECT policies, (3) split admin policies per action · then adversarially verified all 24 tables with a “who can access what” matrix to prove no principal gained or lost access.',
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
              'I used a DINOv2 foundation model as the backbone with a CORN ordinal-regression head · neither pure classification nor regression · to learn the ordering, exported it to ONNX for edge inference, and exposed an uncertainty band rather than a single value, per the glass-box principle.',
            tech: ['DINOv2', 'CORN ordinal regression', 'ONNX Runtime', 'Glass-box uncertainty'],
            lesson:
              'Pick a model formulation that matches the true nature of the problem (ordering, not an absolute value), and design for where inference actually runs (the edge).',
          },
        ],
        modernTech: [
          { name: 'React 18 → 19', why: 'The compiler removes ref boilerplate, but stricter hoisting surfaced 478 TS2786 type errors · resolved by reordering component boundaries and extracting hooks.' },
          { name: 'pgvector hybrid RAG', why: 'Fused keyword (BM25) + vector search via RRF to raise the RAG chatbot’s retrieval quality.' },
          { name: 'DINOv2 → ONNX', why: 'Exported the vision transformer that estimates PM2.5 from photos to ONNX for edge inference.' },
          { name: 'GPT-4o · Anthropic Haiku', why: 'Used for the analysis agent and multilingual Edge Function summaries · model chosen to fit Edge credential constraints.' },
          { name: 'Glass-box principle', why: 'Every ML output always exposes p10–p90 uncertainty and a data-quality badge (DQSS).' },
        ],
        decisions: [
          {
            choice: 'Five public ML engines · the trained GNN stays off the list',
            over: 'advertising "six engines"',
            why: 'The GNN was trained but not wired into the web, Edge or cron anywhere. Don’t advertise what you don’t use, user and interviewer trust matters more than a model count, and the same principle later removed every unverified claim from my résumé.',
          },
          {
            choice: 'Rebuild the SDID panel from a single source (CAMS)',
            over: 'mixing sources to enlarge the sample',
            why: 'Mixed sources carry source-specific bias that does not cancel in the differencing. A single source with constant bias stabilised the estimator and lifted estimable countries from 6 to 53; weak-evidence regions stay marked "not estimable".',
          },
          {
            choice: 'Web free, revenue in a separate app',
            over: 'a Free / Explorer / Researcher subscription',
            why: 'Air is a public good everyone breathes, so web access had to be free, and three-tier permissions cost more than they were worth for a one-person operation. I kept the scope cut on record as product judgement, not a weakness.',
          },
          {
            choice: 'Two-track ML · build some, absorb some',
            over: 'building every engine in-house',
            why: 'The GNN proof of concept’s spatiotemporal handling was absorbed into a ClimaX-style model. Building everything solo would have sacrificed verification depth, so I decided first what to build and what to delegate.',
          },
          {
            choice: 'Lock the design system first (token SOT · 8-axis coherence)',
            over: 'fixing screen by screen',
            why: 'The frontend took longer than backend and ML not because of skill but because of “invisible boundaries”, legacy conventions and CSS cascade quirks stacked on each other. Per-screen fixes accumulated drift; churn stopped only after a single token source and lint locked it. Next time, design system first.',
          },
          {
            choice: 'Turn AI failures into rules and hooks',
            over: 'catching them by hand every time',
            why: 'Guessing instead of reading the record · declaring “done” without verification · judging from one fragment, the most expensive mistake in AI collaboration was not a code bug but overturning a settled decision by guesswork. Instead of me catching it each time, a memory-discipline rule and verification gates catch it; that system became the Agent harness.',
          },
          {
            choice: 'Split into 3 repos + fully retired Supabase → Hugging Face data plane',
            over: 'one monorepo + keeping Supabase',
            why: 'The data/ML/web boundaries had blurred and deploy risk pooled into a single repo. I split into AirLens (data/ML, private) · airlens-data (ingestion, private) · airlens-web (product, public), and retired Supabase entirely, rebuilding the data plane on a read-only Hugging Face dataset plus Cloudflare Workers.',
          },
        ],
        meta: {
          title: 'AirLens Case Study · Yongmin Cho',
          description: 'SDID data-source trap, a TFT train≠serve bug, RLS 132→6 · the hard parts of AirLens, how I solved them, and the modern tech I adopted.',
        },
        links: [
          { label: 'airlens.cloud', url: AIRLENS },
          { label: 'GitHub', url: AIRLENS_WEB_REPO },
        ],
      },
      agent: {
        name: 'Agent',
        tagline: 'Multi-runtime agent governance harness · Claude Code plugin',
        status: 'MIT OSS · 2026-04 → present · in production on two of my own projects (no external adopters yet)',
        overview:
          'Agent is a multi-runtime governance harness that controls three AI runtimes · Claude Code, Codex, and Gemini · under one policy. The goal was to enforce “policy as code” so the same security and safety rules apply no matter which runtime you use. Here are the three hardest problems.',
        frame: {
          problem: 'Building AirLens with AI agents, the same mistakes kept recurring: guessing instead of reading the record, declaring "done" without verifying, trying to read secret files, and every security hook had to be duplicated across three runtimes (Claude Code · Codex · Gemini). Catching each one by hand did not scale.',
          role: 'I designed the threat model and policy rules, the hook protocol and locking, and the verification method (blind benchmark), and I own release and policy decisions. AI agents wrote most of the hooks, adapters and tests.',
          process: 'I compared duplicating hooks per runtime against one canonical JSON protocol with three adapters and chose the latter. User-commanded operations were escalated from deny to ask instead of hard-blocked, commits fail closed when the scanner is missing, and only public-repo numbers are published.',
          result: 'In production on two of my own projects: 296 high-risk operations blocked, 0 false positives, 8/8 on a seeded-bug blind benchmark. Released under MIT; no external adopters yet.',
          whyAI: 'The more code I delegated to AI, the less I needed a better prompt and the more I needed an environment where mistakes are impossible. So instead of prompts I built hooks, policy and gates.',
        },
        attribution: [
          {
            label: 'What I did',
            body: 'Threat-model definition (what must be blocked) · direction of the hook protocol and lock design · YAML policy rules · verification design, including the blind benchmark.',
          },
          {
            label: 'What AI agents did',
            body: 'Most of the hook, adapter, and test implementation code, written by Claude Code and other AI agents.',
          },
          {
            label: 'What I own',
            body: 'Final decisions on releases and policy. This harness is itself the systematization of how I work with AI.',
          },
        ],
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
              'For heterogeneous tools, keep a shared protocol as the source of truth and convert only at the edges · that’s what eliminates duplicated core logic.',
          },
          {
            id: 'locks',
            title: 'Races when multiple agents touch the same resource',
            hard:
              'Running Claude, Codex, and Gemini in parallel per worktree, all three can try to claim the same production resource (a DB migration, a deploy) at once · risking corrupted migrations or double deploys from a race condition.',
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
              'Secret scanners like gitleaks only catch known formats. The NVIDIA NIM API key format (nvapi-) wasn’t in the base ruleset, so it slipped straight through and was found in several places by manual grep. A silent scanner doesn’t mean “no secrets” · it means “unknown format.”',
            solution:
              'I added an nvapi- custom rule into the base ruleset so it propagates to every project, and layered defenses so nothing relies on a single scanner: pre-commit, pre-push diff scan, MCP content scan, and CI. If one layer misses, another catches it.',
            tech: ['gitleaks custom rules', 'defense-in-depth', 'policy-as-code'],
            lesson:
              'Never trust a single tool’s silence · redundant defensive layers cover the gaps automation misses. (I distilled this into an insight node in my second brain.)',
          },
        ],
        modernTech: [
          { name: 'Model Context Protocol (MCP)', why: 'A standardized tool interface for portability across runtimes.' },
          { name: 'Claude Code plugin packaging', why: 'One `/plugin install` sets it up per project with no copy-paste (v0.2.0).' },
          { name: 'Policy-as-Code', why: 'Risk areas declared in YAML and enforced without code changes; the auto-ship gate aborts on risk.' },
        ],
        decisions: [
          {
            choice: 'A canonical JSON hook protocol plus three runtime adapters',
            over: 'duplicating hooks per runtime',
            why: 'Claude Code, Codex and Gemini each have different event schemas and lifecycles. One source of truth with translation only at the edges means a security hook bug gets fixed in one place.',
          },
          {
            choice: 'Escalate user-commanded operations from deny to ask',
            over: 'keeping auto-block / switching guards off',
            why: 'When asked to “let me do what I explicitly command”, I raised the decision to a human instead of disabling the guard. No silent pass, explicit intent respected, relaxing security should be an escalation of the decision, not a switch.',
          },
          {
            choice: 'A fail-closed hook that blocks commits when the scanner is missing',
            over: '“skip if not installed”',
            why: 'A .gitleaks.toml does nothing if no hook runs it. A .env pulled in by a directory import sat on a remote for over a month and was found only by running gitleaks by hand. Config is a rule, not a gate, and a hook that silently passes is worse than no hook.',
          },
          {
            choice: 'Publish only public-repo numbers (17 hooks · 3 runtimes)',
            over: 'the larger counts from the private version',
            why: 'The pre-cleanup private version had more hooks and agents, but numbers nobody outside can verify stay off the page. One inflated figure discounts every measured one next to it.',
          },
          {
            choice: 'Measure detection with a blind, seeded-bug benchmark',
            over: 'self-reported “we caught it”',
            why: 'Whether a review agent really finds bugs must be measured without knowing the answers. I seeded defects into 8 fixtures, ran it blind, got 8/8, and published the method in the README so it can be reproduced.',
          },
        ],
        meta: {
          title: 'Agent Case Study · Yongmin Cho',
          description: 'Cross-runtime hook abstraction, multi-session locking, defending against the secret a scanner missed · the hard parts of the Agent harness and how I solved them.',
        },
        links: [{ label: 'GitHub', url: `${GITHUB}/Agent` }],
      },
      brain: {
        name: 'Second Brain',
        tagline: 'Typed knowledge graph · deterministic lint gates · 3D neuron visualisation · local-first',
        status: 'Personal infrastructure · 2026-06 → present · 268 atomic notes · 890 typed edges · 0 orphans · 0 lint findings',
        overview:
          'A personal knowledge graph built to be “portable context” that outlives any model or tool. On top of Karpathy’s LLM Wiki pattern I added 10 node types and 10 typed edge types, and split capture from distillation: capture is a script with no model call; distillation is an LLM that promotes only items passing five gates into atomic notes. Graph extraction, lint, honest counting and the 3D view all run as deterministic scripts · and a session cannot end while lint is non-zero.',
        frame: {
          problem: 'Judgements and failures from daily AI work vanished when a session ended, and I kept asking the same things again. Piling them into a note app did not help: "related" links could neither be searched with intent nor verified.',
          role: 'I designed the node and edge schema, the workflow that separates capture from distillation, the five promotion gates and the lint rules, and I make the daily distillation calls. AI agents wrote most of the scripts and the 3D viewer.',
          process: 'Ten typed edge types instead of plain backlinks; Markdown, git and deterministic scripts instead of Notion. After dumping 668 project documents polluted the wiki I wrote the "distil, don’t copy" rule, and after a secret leaked because a config existed without a hook, I switched to fail-closed gates.',
          result: '268 atomic notes, 890 typed edges, 0 orphans, 0 lint findings, maintained. Session records became reusable rules, and most of the cases and decision logs on this portfolio came out of it.',
          whyAI: 'Capture is done by a script with no model call; distillation is done by the LLM. Summarising at capture time destroys the original, so the LLM sits only where it promotes what has passed the gates.',
        },
        attribution: [
          { label: 'What I did', body: 'Designed the schema (node and edge types) · wrote the 2-tier capture/distil workflow and the five-gate rule · specified the lint, stats and visualisation pipeline · and make the daily distillation calls myself.' },
          { label: 'What AI agents did', body: 'Most of the implementation of the scripts (extract_graph · wiki_lint · stats · build_viz · query · brain_sync) and the neuron-cosmos 3D viewer, plus note drafts.' },
          { label: 'What I own', body: 'The final call on what enters the wiki versus stays raw, the honest-count rule, and the fail-closed policy adopted after the secret-leak incident.' },
        ],
        metrics: [
          { value: '268', label: 'atomic notes (typed)' },
          { value: '890', label: 'typed edges · all 10 types in use' },
          { value: '0', label: 'orphans · lint findings' },
          { value: '4,985', label: 'nodes in the all-layer 3D view' },
          { value: '≤3', label: 'auto-promotions per session' },
        ],
        timeline: [
          { date: '2026-06-10', label: 'Brain bootstrapped · schema and scripts' },
          { date: '2026-06-15', label: '668-file bulk import from AirLens → quarantined · Rule 11 born' },
          { date: '2026-07-13', label: 'Secret leak discovered → fail-closed pre-commit gate' },
          { date: '2026-07-17', label: 'neuron-cosmos 3D viewer · 5 layers, 4,985 nodes' },
          { date: '2026-07-18', label: '/record redesigned as capture-only (2-tier finalised)' },
        ],
        sections: [
          {
            id: 'bulk',
            title: 'The 668 files that polluted the wiki (how Rule 11 was born)',
            hard:
              'While “merging a project vault into the brain” I copied 668 documents straight into the wiki. The graph got bigger, but nodes without typed edges flooded in, lint became meaningless, and search returned operations docs instead of distilled insight. Node count went up; knowledge did not.',
            solution:
              'Everything went back into a raw/ quarantine area and Rule 11 was written: the wiki holds only distilled, typed atomic notes. External vaults are now internalised via symlink but never merged into the brain’s wiki; only reusable insight is moved across by hand. The same root cause later produced the secret-leak incident below.',
            tech: ['LLM Wiki pattern', 'raw/ quarantine', 'Rule 11, distil, don’t copy'],
            lesson: 'Node count is not a metric. A graph’s value lies in edge density and in every node being exactly one idea.',
          },
          {
            id: 'gate',
            title: 'The config file was never a gate (the secret-leak incident)',
            hard:
              'A .gitleaks.toml existed, so I believed “this repo is scanned”. No hook was installed. Months earlier a directory-level import had carried a .env (two real API keys, a GPU key, an SSH private key) into the repo, and it sat on the remote for over a month. I found it only by running gitleaks by hand.',
            solution:
              'Revoked and rotated every key, then made the pre-commit hook fail-closed · no gitleaks, no commit. Because core.hooksPath is local git config, the README now says every clone must run the setup script once, and every directory import is preceded by a scan for .env, .pem and id_* files.',
            tech: ['gitleaks', 'fail-closed pre-commit', 'core.hooksPath'],
            lesson: 'Check not whether a rule exists but what runs it. A gate that silently passes is worse than none, it makes you believe you are covered.',
          },
          {
            id: 'honest',
            title: 'Honest counts · the index number must equal stats.py',
            hard:
              'The early index claimed figures like “710 nodes”, mixing source-summary notes with atomic notes, hand-typed as an estimate. The brain could not explain what its own headline number counted.',
            solution:
              'stats.py now counts atomic (has typed edges) and source notes separately, and Rule 12 requires the index to match its output. Result: 268 atomic notes · 890 edges · 0 orphans · smaller, but every figure is explainable.',
            tech: ['scripts/stats.py', 'Rule 12, honest statistics'],
            lesson: 'The numbers on this portfolio follow the same rule. A number I cannot explain does not get published.',
          },
          {
            id: 'cosmos',
            title: '4,985 nodes in 3D · when force layout explodes at the core',
            hard:
              'Rendering the wiki core plus areas, records, plans and server layers as concentric shells (4,985 nodes) in WebGL made the force layout diverge around hubs and crush the core, and the browser main thread dropped frames.',
            solution:
              'Layout is precomputed in a Web Worker and stored as static coordinates; rendering only reads them. The default view is wiki-only, ?layers=all expands. Regeneration is a fixed, deterministic three-script sequence.',
            tech: ['Three.js', 'Web Worker precomputed layout', 'Vite'],
            lesson: 'The bottleneck was layout, not rendering. Separating computation from presentation simplified both.',
          },
        ],
        decisions: [
          { choice: 'Ten typed edge types', over: 'plain backlinks', why: '“Related” is not information. Supports · contradicts · triggered-by give the graph traversable meaning, let lint catch broken relations, and let a query script answer questions deterministically.' },
          { choice: 'Markdown + git + deterministic scripts', over: 'Notion or a dedicated database', why: 'An asset meant to outlive models and tools needs a lock-in-free format. Extraction, lint and stats all run over plain files and are reviewed as diffs.' },
          { choice: 'Two tiers, machine capture, LLM distillation', over: 'summarising at capture time', why: 'Summarising while capturing destroys the original and makes later verification impossible. Capture keeps the full transcript with no model call; distillation later promotes only what passes five gates, capped at three notes per session to prevent bulk.' },
          { choice: 'No session ends with lint above zero', over: 'warnings only', why: 'Broken edges and orphans compound if left alone. Fixing the completion condition at “TOTAL findings: 0” keeps the graph permanently traversable.' },
        ],
        modernTech: [
          { name: 'LLM Wiki (Karpathy)', why: '“Obsidian is the IDE, the LLM the programmer, the wiki the codebase” · a wiki that accumulates and compounds instead of a RAG that retrieves and forgets.' },
          { name: 'v2 memory lifecycle', why: 'confidence · last_verified · supersedes fields track trust, decay and replacement · lint surfaces low-confidence and stale notes.' },
          { name: 'Three.js + Web Worker', why: 'A 4,985-node, five-layer neuron cosmos with precomputed layout; the WebGL fallback is a 2D graph.' },
          { name: 'gitleaks fail-closed', why: 'Blocks commits when the scanner is absent · “config is a rule, the hook is the gate”.' },
        ],
        meta: {
          title: 'Second Brain Case Study · Yongmin Cho',
          description: 'A typed knowledge graph of 268 nodes and 890 edges, the gate design learned from a bulk-import pollution and a secret leak, and a 4,985-node 3D view · building personal knowledge infrastructure.',
        },
        links: [],
      },
      pitter: {
        name: 'Pitter-Petter WGS',
        tagline: 'Whole-genome analysis prototype for a dog with a rare blood disorder · compute/reasoning plane split · pre-registered measurement',
        status: 'Industry-linked project (Yeardream School) · solo · 2026-07 → 08 · all 8 standard lifecycle stages measured · through dual-report rendering',
        overview:
          'A local WGS pipeline that takes a single dog’s paired FASTQ from a partner company through alignment → variant calling → annotation → population-frequency filtering → candidate prioritisation → an evidence-graded report. Validated bioinformatics tools do the computation; a local LLM (llama.cpp · Qwen) only interprets de-identified aggregates and candidates and checks the report. Dogs have no truth set, so no accuracy is claimed · I measure the size and origin of disagreement between tools instead. Every metric was frozen in a contract file before any number was seen.',
        frame: {
          problem: 'A company provided whole-genome data for one dog with a rare blood disorder, but dogs have no pathogenicity truth set and the raw data could not leave the machine. The initial scope stopped at quality analysis and interpretation support, while the proposal required everything from alignment to report.',
          role: 'Working alone, I redefined the problem, designed the pipeline architecture, chose and justified reference, callers and annotators, pre-registered the measurement contract, interpreted results and wrote the reports, and designed for the data pledge. AI agents wrote most of the scripts.',
          process: 'Computation (BWA · bcftools · freebayes) and reasoning (local llama.cpp) were separated. Since accuracy could not be measured, two callers and three annotators were run to measure the size of disagreement, and metrics, pass lines and validation were frozen in a contract before any number was seen. A CPU-local model was chosen over a cloud LLM, accepting slower inference.',
          result: 'All eight stages of the standard lifecycle have measured values and a dual report renders. Two passes and two fails were reported as they came; raw-data exports and pathogenicity assertions: zero.',
          whyAI: 'The LLM sits only in the narration layer that turns a candidate table into readable prose, and the things that layer must never do (mention genes not in the table, assert pathogenicity, leak what sits behind a pseudonym) were measured at zero. Computation stayed out of the LLM for both reproducibility and security.',
        },
        attribution: [
          { label: 'What I did', body: 'Re-defined the problem against the 17-page proposal · designed the compute/reasoning plane split · chose and justified reference, callers and annotators · pre-registered the measurement contract (metrics, pass lines, CV scheme, stop gates) · interpreted results and wrote the reports · designed for the data pledge.' },
          { label: 'What AI agents did', body: 'Most of the implementation of pipeline scripts, evaluation code and document rendering, plus literature-note drafts.' },
          { label: 'What I own', body: 'The zero-order principle that raw data never leaves the machine, the export gate, and the decision to report the FAIL metrics as they came out.' },
        ],
        metrics: [
          { value: '8 / 8', label: 'standard lifecycle stages measured' },
          { value: '0.3677', label: 'caller Jaccard (bcftools · freebayes)' },
          { value: '88.7%', label: 'removed by population allele-frequency filter' },
          { value: '4 / 4', label: 'annotator determinism (identical hashes)' },
          { value: '0', label: 'raw-data exports · pathogenicity assertions' },
        ],
        timeline: [
          { date: '2026-07-31', label: 'Problem definition fixed · compute/reasoning planes split' },
          { date: '2026-08-07', label: 'Pre-registered metrics measured (M1–M4)' },
          { date: '2026-08-08', label: 'Supervised M5 · 2 pass · 2 fail, reported as-is' },
          { date: '2026-08-09', label: 'Population frequency · ROH · structural variants · all 8 stages' },
          { date: '2026-08', label: 'AVCG scoring · dual report · de-identified Pages release' },
        ],
        sections: [
          {
            id: 'planes',
            title: 'Keeping the LLM out of the computation · the two-plane boundary',
            hard:
              'The initial scope leaned toward “FASTQ quality analysis plus a candidate-variant copilot”, while the proposal required everything from alignment to report. A generative model sitting mid-pipeline would break reproducibility, and company data could leak into model prompts.',
            solution:
              'A Bioinformatics Compute Plane (BWA-MEM · samtools · bcftools · freebayes · deterministic) and a Local AI Reasoning Plane (llama.cpp on CPU, 127.0.0.1 only). The LLM reads only pseudonymised candidates, aggregates and evidence; raw reads, sequences and paths never appear in prompts or logs. canFam4 was ranked first as reference for coordinate compatibility with the Dog10K population VCF, but not finalised until the company’s internal build could be checked.',
            tech: ['BWA-MEM · samtools · bcftools · freebayes', 'llama.cpp · Qwen 4B/8B (CPU)', 'canFam4 · Dog10K'],
            lesson: 'A reference assembly is not a file but a data contract. The choice is not made until the population VCF, annotation, contig names and the company’s existing outputs all share coordinates.',
          },
          {
            id: 'contract',
            title: 'Freezing the metrics before seeing the numbers · and writing down the FAILs',
            hard:
              'With one sample and 7–29 genes, any supervised result can be made to look good by choosing the metric afterwards. And with no truth set in dogs, accuracy itself is undefined.',
            solution:
              'Metrics, pass lines, cross-validation scheme and stop gates were frozen in measurement_contract.json before any number was looked at. Results: caller-consensus prediction AUROC 0.9778 (PASS) · but a single feature, QUAL, scored 0.9822 on its own; residue discrimination (ESM-2 + phyloP, leave-one-gene-out) 0.6664 FAIL, with the combination worse than the best single feature (Δ −0.1037). Circularity audit passed. Every output carries machine-inserted headers such as “consensus is not truth”.',
            tech: ['Pre-registered measurement contract', 'Leave-one-gene-out CV', 'Gene-stratified bootstrap · group-preserving permutation test'],
            lesson: 'Reading only the passes means misreading the table. Pre-registration does not make results better; it makes them believable.',
          },
          {
            id: 'disagreement',
            title: 'Measuring disagreement instead of accuracy',
            hard:
              '“Which caller is more accurate” cannot be answered in dogs. Yet reading a single caller’s output as definitive puts false confidence into the report.',
            solution:
              'Ran both bcftools and freebayes and measured the actual intersection and differences (Jaccard 0.3677 · only one in three variants shared). Shared calls showed Ts/Tv 2.44 and a Dog10K overlap of 0.931, both higher than either tool’s private calls · confirming only the direction “shared is more trustworthy”. Three annotators (VEP · snpEff · csq) on the same GFF3 gave pairwise agreement 0.98 / 0.85 / 0.84 and 4/4 determinism. One population allele-frequency step removed 88.7% of candidates.',
            tech: ['Multi-caller consensus', 'Ts/Tv · population-overlap checks', 'VEP · snpEff · bcftools csq'],
            lesson: '“Not examined” and “examined, none found” are different sentences in a report. Structural variants and ROH, things an SNV caller cannot see, must be recorded as looked at.',
          },
          {
            id: 'narrator',
            title: 'Putting guardrails on the local LLM narration layer · and measuring them',
            hard:
              'The layer that turns a candidate table into prose is the most useful and the most dangerous: it can invent genes not in the table, assert pathogenicity, or leak what sits behind a pseudonym.',
            solution:
              'Qwen 4B and 8B ran under the same schema constraints and six metrics were measured: out-of-table gene mentions 0, pathogenicity assertions 0, naming on an empty candidate table 0, free-text gene leakage 3/5 → 0/5 after a filter (4B). One numeric misattribution by the 4B model was recorded as a miss. AVCG scoring marked only 6 of 23 criteria as evidenced.',
            tech: ['Schema-constrained generation', 'Leak filter', 'AVCG scoring checklist'],
            lesson: 'When an LLM enters a sensitive domain the question is not “how well does it write” but “what does it never do”, and that has to be measured.',
          },
        ],
        decisions: [
          { choice: 'canFam4 (UU_Cfam_GSD_1.0) as first-choice reference', over: 'canFam3', why: 'Coordinates must match the Dog10K population VCF for the frequency filter to work at all. Kept as a candidate, not final, until the company’s existing build was confirmed.' },
          { choice: 'DeepVariant limited to a small interval experiment', over: 'adopting it as the sole truth caller', why: 'Its built-in model is trained on human data. Treating its dog-WGS output as ground truth would be unearned confidence.' },
          { choice: 'Pre-registering metrics in a contract file', over: 'choosing metrics after seeing results', why: 'The smaller the sample, the more post-hoc metric choice manufactures the desired conclusion. Only label prevalence was inspected to set the CV split; performance was seen only after the freeze, and the document states up front that this was not fully blind.' },
          { choice: 'Local llama.cpp on CPU', over: 'a cloud LLM API', why: 'Under the data pledge no raw derivative may sit in any external location. I accepted slower inference (4B 15 tok/s · 8B 8.7 tok/s) and shared CPU quota with alignment and calling.' },
          { choice: 'Consensus-prediction score as an evidence annotation, never a ranking input', over: 'ranking candidates by an ML score', why: 'Ranking uses only the explicit rule (tier, −QUAL, contig, pos). A model that predicts consensus predicts consensus, not truth.' },
        ],
        modernTech: [
          { name: 'ESM-2 residue embeddings', why: 'Protein language model for pathogenic-residue discrimination · combined AUROC 0.7163 (pass), but honestly reported as FAIL under leave-one-gene-out generalisation.' },
          { name: 'Dog10K population frequency', why: 'Removes species-common polymorphisms · 88.7% of candidates, the largest single reduction step in the field.' },
          { name: 'ROH-based recessive prior', why: '57 candidates inside runs of homozygosity (F_ROH 0.2004) · with a single sample this adjusts priors, it does not diagnose.' },
          { name: 'Export gate sanitize_or_die', why: 'The public GitHub Pages copy carries only de-identified aggregates · no coordinates, genotypes or sequences · enforced by a boundary test.' },
        ],
        meta: {
          title: 'Pitter-Petter WGS Case Study · Yongmin Cho',
          description: 'A dog whole-genome pipeline · compute/reasoning plane split, pre-registered measurement contract, measuring disagreement where no truth set exists, and guardrails on a local LLM narration layer.',
        },
        links: [{ label: 'Pages (de-identified aggregates)', url: 'https://joymin5655.github.io/Pitter-petter/' }],
      },
      posture: {
        name: 'Posture Guard',
        tagline: 'KT AIVLE big project · 6-person team · led ~80% of the frontend · reignited in 2026 with in-browser ONNX',
        status: '2023.08 → 2024.01 team project (Collaboration award) · 2026 follow-up browser live demo',
        overview:
          'A healthcare web service that classifies your posture from a webcam in real time and alerts you when a bad posture lasts over a minute. I led about 80% of the frontend · real-time monitoring, statistics dashboard, stretching guide, chatbot UI · and integrated the team’s XGBoost classifier and LangChain RAG chatbot. Then we failed to deploy the finished product. In 2026 I paid that failure back by moving everything the server did into the browser, and verified the result matches the original Python within 0.000005.',
        frame: {
          problem: 'Long desk hours produce forward-head posture, and nothing told you about your posture in real time. Nobody on our six-person team had built a web service, and we disagreed on how to present screens and data.',
          role: 'I volunteered for about 80% of the frontend: the real-time monitoring screen, the dashboard metric design, the stretching guide and the chatbot UI, integrating the team’s XGBoost classifier and RAG chatbot. The 2026 in-browser live demo was built afterwards with AI-agent collaboration.',
          process: 'Disagreements were settled by writing user criteria into a document. For the model we chose joint-landmark features with XGBoost over a pixel CNN so it stayed robust to lighting and distance and ran in real time on CPU. The final deployment failed for lack of infrastructure knowledge; in 2026, instead of hosting a server again, I moved all inference into the browser (WASM + ONNX).',
          result: 'We won the Collaboration award, and the deployment failure became the turning point that pushed me into infrastructure and CI/CD. The 2026 live demo matches the Python original within 0.000005 and runs with zero external requests.',
        },
        attribution: [
          { label: 'What I did (2023–24)', body: 'About 80% of the frontend, real-time monitoring screen, statistics-dashboard metric design, stretching guide, chatbot UI · took part in the model-selection discussion · documented screen structure and data flow to reach team consensus.' },
          { label: 'What the team did', body: 'The XGBoost posture classifier (2 AI members) · Django backend and auth (2 backend members) · data augmentation.' },
          { label: 'What I did (2026)', body: 'The browser live demo, feature computation ported to JS, XGBoost → ONNX, parity verification, CSP and vendored bundles, built afterwards with AI-agent collaboration.' },
        ],
        metrics: [
          { value: '6', label: 'team members · ~80% of FE' },
          { value: '5', label: 'posture classes (good + 4 bad)' },
          { value: '201', label: 'joint distance/angle features' },
          { value: '0.000005', label: 'browser ↔ Python feature error' },
          { value: '0', label: 'external requests in the live demo' },
        ],
        timeline: [
          { date: '2023.08', label: 'KT AIVLE 4th cohort begins (840h)' },
          { date: '2023.12 – 2024.01', label: 'Big project · volunteered for FE on a team with no web experience' },
          { date: '2024.01', label: 'Collaboration award · deployment failed' },
          { date: '2026', label: 'In-browser ONNX live demo · parity verified' },
        ],
        sections: [
          {
            id: 'team',
            title: 'Volunteering for the frontend on a team with no web experience',
            hard:
              'None of the six of us had built a web service, and early on we disagreed about how to present the data and structure the screens. Arguing did not align anyone.',
            solution:
              'I wrote down, from the user’s point of view, which information was most intuitive first, then documented the screen structure and data flow and kept sharing it. I chose the dashboard metrics (good/bad posture ratio, weekly trend), and UX rules such as the alert threshold were agreed on paper. Roles and direction became clear, and we won the Collaboration award.',
            tech: ['Django 4.2.7 · jQuery', 'Chart.js', 'django-allauth (Google · Naver)'],
            lesson: 'Disagreements resolve fastest through user criteria plus documentation, not personal argument. I use the same principle in AirLens today.',
          },
          {
            id: 'model',
            title: 'Joints, not pixels · why a lightweight classifier',
            hard:
              'Feeding raw webcam frames to a CNN is fragile to distance, lighting and masks, and hard to run in real time on CPU.',
            solution:
              'We agreed on extracting joint landmarks with MediaPipe, computing 201 distance and angle features from nine joints (nose, eyes, ears, shoulders, wrists), and classifying five classes with XGBoost. Landmark features made it robust to distance, lighting and masks and fast enough for real time (85–90% at 30 FPS, per my own verification).',
            tech: ['MediaPipe Holistic (33 landmarks)', '201 distance/angle features', 'XGBoost 5-class'],
            lesson: 'Choose the representation that matches the problem’s invariant (joint relationships) and the model can stay small.',
          },
          {
            id: 'deploy',
            title: 'Failing to deploy · the turning point toward infrastructure',
            hard:
              'At the very end, putting the finished Django app on a server was where we got stuck. Without cloud or networking knowledge the hosting itself never worked, and I watched a model the team had worked hard on fail to become a service.',
            solution:
              'We did not solve it then. What I took away was “no matter how good the model, it means nothing if it never ships”, and after the project I studied infrastructure, CI/CD and cloud intensively. The result is AirLens · deployed automatically through GitHub Actions and operated by one person.',
            tech: ['- (a record of failure)'],
            lesson: 'The most frustrating moment became the biggest turning point. I did not hide the failure; I turned it into the next project’s requirement.',
          },
          {
            id: 'browser',
            title: '2026 · moving everything the server did into the browser',
            hard:
              'GitHub Pages is static hosting: no server. But posture classification lived entirely on the server · MediaPipe, Python feature computation, the XGBoost .pkl. I had to prove the browser version gives the same answer.',
            solution:
              'MediaPipe PoseLandmarker (WASM) extracts the same joint structure, preprocessing.py was ported to JavaScript, and the same XGBoost model was converted to ONNX and run with onnxruntime-web. Verification: browser feature computation matches the Python original within 0.000005; ONNX inference matches the .pkl in both class and probabilities. Video and verdicts never leave the device (there is no transmission code at all), every library is vendored so there are zero external requests, and a CSP blocks exfiltration even if the code were tampered with.',
            tech: ['MediaPipe Tasks Vision (WASM)', 'XGBoost → ONNX · onnxruntime-web', 'CSP · vendored bundles'],
            lesson: 'The answer to a failure two years earlier was not “a better server” but “no server”. Privacy is strongest when it is guaranteed by structure, not policy.',
          },
        ],
        decisions: [
          { choice: 'Landmark distance/angle features + XGBoost', over: 'a pixel-input CNN', why: 'Robust to distance, lighting and masks, and real-time on CPU. When the invariant is joint relationships, matching the representation beats growing the model.' },
          { choice: 'Agree on screen structure and data flow in a document first', over: 'adjusting while implementing', why: 'On an inexperienced team, mid-implementation adjustments come back as rework. Writing user criteria down turned conflict into a judgement problem.' },
          { choice: '(2026) In-browser ONNX inference', over: 'hosting a server again', why: 'Zero operating cost, privacy guaranteed by structure, and it truly works on static hosting, provided parity with the original is proven numerically.' },
          { choice: 'Label the two frontends honestly', over: 'passing the React mock-up off as the real app', why: 'The repo holds both the real Django app and a React demo with mock data. The README states in a table which one actually runs and which is for browsing.' },
        ],
        modernTech: [
          { name: 'onnxruntime-web', why: 'The same XGBoost model in the browser · class and probability parity verified.' },
          { name: 'MediaPipe Tasks (WASM)', why: 'The same joint structure as the server-side Holistic, extracted on the client.' },
          { name: 'LangChain + ChromaDB RAG', why: 'Team component · FAQ chatbot; I integrated the UI.' },
          { name: 'CSP', why: 'The browser blocks any outbound transfer even if the code is tampered with · the last privacy layer.' },
        ],
        meta: {
          title: 'Posture Guard Case Study · Yongmin Cho',
          description: 'KT AIVLE big project · leading 80% of the frontend on an inexperienced team, a landmark-based lightweight classifier, the deployment failure that became a turning point, and the 2026 in-browser ONNX answer.',
        },
        links: [
          { label: 'Live demo (in-browser)', url: 'https://joymin5655.github.io/KT-AIVLE-SCHOOL/dashboard/live/' },
          { label: 'GitHub', url: `${GITHUB}/KT-AIVLE-SCHOOL` },
        ],
      },
      craft: {
        name: 'Design · Web Craft',
        tagline: 'FABLE collection, 65 pages · ALL-IN-ONE live IA redesign · Wardenkit · build at volume with AI, verify by machine',
        status: 'FABLE LIVE (2026-07) · ALL-IN-ONE LIVE · Wardenkit scaffold (started 2026-07-29)',
        overview:
          'Three projects tied by one method: build fast and in volume with AI agents, but let a verification harness judge before a human eye does. FABLE is a design showcase of 35 sites, 10 data graphs, 15 dashboards and an animation-primitive library; ALL-IN-ONE is an information-architecture redesign of a live Next.js 16 trends-and-deals site; Wardenkit is a commercial project turning the security hooks I used in AirLens into a kit other teams can use.',
        frame: {
          problem: 'Once AI could produce pages quickly and in volume, the bottleneck moved from building to verifying. Reports said "the design is broken" but nobody could say what; and a live site kept growing bolt-on features until it felt chaotic.',
          role: 'I owned design direction and token rules, the harness’s pass criteria, the call to port physics/motion models, the information-architecture decisions and Wardenkit’s licensing rules. AI agents wrote most of the 65 pages, the sweep scripts and the Next.js refactor.',
          process: 'Before fixing anything I swept 87 page×viewport combinations and found contrast tokens, not layout, were at fault. Motion was ported as a parameter model rather than a translated Swift library and verified numerically; the IA was redesigned after a forced-choice interview surfaced the decisions, with tokens left untouched.',
          result: 'FABLE’s 65 pages are live with 195/195 checks passing, the ALL-IN-ONE home went from six sections to four blocks with two review-caught bugs reverted before deploy, and Wardenkit is a scaffold with 9 test suites and 225 checks.',
          whyAI: 'AI raises build speed but cannot judge. So the verification harness sits ahead of the human eye, and the four times the harness itself was wrong are on record too.',
        },
        attribution: [
          { label: 'What I did', body: 'Design direction and token rules · the harness’s pass criteria · the call to port physics/motion models · the IA decisions (the forced-choice interview answers became the spec) · Wardenkit’s licensing and honest-marketing rules.' },
          { label: 'What AI agents did', body: 'Most of the 65 pages, the verification sweep scripts, the ported code, the Next.js refactor.' },
          { label: 'What I own', body: 'Not taking “it’s broken” at face value and measuring first, reverting the two bugs review caught before deploy, and keeping any file of unclear provenance out of the kit.' },
        ],
        metrics: [
          { value: '65', label: 'FABLE pages (35 + 10 + 15 + motion)' },
          { value: '195 / 195', label: 'checks passed (normal + reduced-motion)' },
          { value: '87', label: 'page × viewport sweeps' },
          { value: '6 → 4', label: 'ALL-IN-ONE home sections → purpose blocks' },
          { value: '9 / 225', label: 'Wardenkit test suites / checks' },
        ],
        sections: [
          {
            id: 'measure',
            title: '“The design is broken” · it was contrast, not layout',
            hard:
              'At 30 pages a report came in that “some designs are broken”. Taken literally it meant digging through layouts, which was most likely wasted time.',
            solution:
              'The verification harness (sweep.mjs) swept 87 page×viewport combinations first. Console errors 0, failed requests 0, horizontal overflow 0 · layout was fine. The real defects were muted colour tokens below WCAG (worst 2.39:1) and three empty renders. The harness itself was wrong four times (font check without style/weight, sparse sampling calling a live dot plot “dead”, hover-only canvases flagged, contrast computed mid-reveal) · each recorded as a reusable trap.',
            tech: ['Playwright sweep harness', 'WCAG contrast tokens', 'reduced-motion double verification'],
            lesson: 'Validate the instrument before the subject. “Verified by construction” is not verification.',
          },
          {
            id: 'motion',
            title: 'Porting the model, not the library',
            hard:
              'b3ll/Motion is Swift and Core Animation · it cannot run on the web. The brief was “that feel”, and I could neither copy the code nor pretend to use the library.',
            solution:
              'I ported the model, not the code: designer parameters (damping 0–1 + response in seconds), velocity-preserving retarget, exponential-decay momentum projection, rubber-banding. Verified numerically in the browser: ζ=1 overshoot 0.0000, ζ=0.7 peak 103.95, 60 Hz vs 144 Hz Δ0.055 px after 0.5 s, velocity 577.0 → 577.0 preserved on retarget. The page states exactly what was ported.',
            tech: ['Spring physics (damping · response)', 'Frame-rate-independence verification', '/motion/ primitive library'],
            lesson: 'Write down the source of the inspiration and the source of the implementation separately. If you ported, say what; if you verified, say with which numbers.',
          },
          {
            id: 'ia',
            title: 'The “mess” was document–code drift',
            hard:
              'The live ALL-IN-ONE home and deals pages felt chaotic · even though the components and tokens were systematic. New features (Coupang, free apps) kept being bolted onto the bottom of the deals page until it was six tiers deep, and the layout-rules document was a generation behind the real home.',
            solution:
              'I briefed an AI planning workspace (manyfast) with a current-state inventory, per-audience problems and constraints, and got a six-question forced-choice interview → PRD → user flows → wireframes. The value was less the plan than the interview forcing the decisions into the open · what is the home’s primary action? how do deals merge? · the answers became the spec. Home 6 sections → 4 blocks (a purpose router), deals 6 tiers → an 8-chip explorer, a new mobile tab bar. v3 tokens, dark mode and nine forbidden patterns stayed untouched. Review caught a missing locale prefix (jumping to another language) and the tab bar hidden behind the cookie banner before deploy.',
            tech: ['Next.js 16 · React 19 · Tailwind v4', 'Supabase', 'Vercel'],
            lesson: 'A felt “mess” is not necessarily a design problem. When the SSOT document is stale, people and agents re-read the code every time, and that cognitive load feels like chaos. So code changes and doc updates now ship in the same branch.',
          },
          {
            id: 'kit',
            title: 'From hooks only I used to a kit others can · licence hygiene first',
            hard:
              'Selling AirLens-proven security hooks as a team kit meant stripping domain paths and table names and confirming the provenance of every file. A product does not get to “mostly work”.',
            solution:
              'A licensing SSOT (LICENSING.md) came first · only self-authored files or ones whose licence allows redistribution with attribution attached; anything unclear stays out. Zero secrets and zero internal absolute paths are enforced with gitleaks, and no unmeasured performance figure goes on the landing page. The free lead-in · a .claude/ config audit · runs client-side with zero uploads. Currently a scaffold (9 test suites / 225 checks), payments and domain not yet wired.',
            tech: ['Shell/Python hook bundle', 'Vanilla HTML/CSS/JS (no bundler)', 'gitleaks · licensing SSOT'],
            lesson: 'The moment you push your own infrastructure one step toward being infrastructure others use, your honesty rules become your marketing rules.',
          },
        ],
        decisions: [
          { choice: 'Verification harness before any fix', over: 'fixing layouts as reported', why: '87 sweeps said “layout fine, contrast broken” within half an hour. Fixing without measuring would have fixed bugs that did not exist.' },
          { choice: 'Port the motion model and verify numerically', over: 'adopting a similar library or translating the code', why: 'Swift code cannot be moved and web libraries did not have the feel. Only the parameter model was ported, and overshoot and frame-rate independence were proven with numbers.' },
          { choice: 'Change the IA, keep v3 tokens and palette invariant', over: 'a full redesign', why: 'The problem lived at the information-architecture layer. Touching the design system would have meant re-verifying accessibility and dark mode from scratch.' },
          { choice: 'Wardenkit as a bundler-free static site with a client-side audit', over: 'a framework app with server uploads', why: 'A security product whose lead-in uploads your config is a contradiction. Zero uploads is the product’s first promise.' },
        ],
        modernTech: [
          { name: 'Next.js 16 · Tailwind v4', why: 'ALL-IN-ONE’s production stack · the IA redesign shipped with tokens untouched.' },
          { name: 'CSS spring motion model', why: 'Damping and response parameters in the designer’s own language · frame-rate independent.' },
          { name: 'Playwright verification sweep', why: '87 page×viewport · 195/195 passing in both normal and reduced-motion.' },
          { name: 'manyfast (AI planning)', why: 'Forced-choice interview → PRD → wireframes · used to surface decision points, not to outsource judgement.' },
        ],
        meta: {
          title: 'Design · Web Craft Case Study · Yongmin Cho',
          description: 'The FABLE 65-page showcase, the ALL-IN-ONE IA redesign and Wardenkit · building at volume with AI and letting a verification harness judge first.',
        },
        links: [
          { label: 'FABLE collection', url: 'https://fable-collection.netlify.app' },
          { label: 'Wardenkit', url: `${GITHUB}/Wardenkit` },
        ],
      },
    },
  },
};

/* ── /research, graduate-application view of the same evidence ─────────── */
export type ResearchInterest = {
  rank: string;
  title: string;
  question: string;
  done: string;
  next: string;
  evidence: Evidence[];
};
export type ResearchMethod = { method: string; where: string; detail: string; evidence: Evidence };
export type Research = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  background: { label: string; body: string }[];
  interestsHeading: string;
  interestsLead: string;
  interests: ResearchInterest[];
  methodsHeading: string;
  methodsLead: string;
  methods: ResearchMethod[];
  thesisHeading: string;
  thesis: { title: string; body: string; meta: string; coursework: string[] };
  principlesHeading: string;
  principlesLead: string;
  principles: { title: string; body: string }[];
  status: { label: string; body: string };
  ctas: Evidence[];
  back: string;
  altLabel: string;
  altHref: string;
};

export const research: Record<'ko' | 'en', Research> = {
  ko: {
    meta: {
      title: 'Research · 조용민',
      description: '환경·보건 데이터의 인과추론, ML 시스템의 신뢰성·평가, 민감 도메인의 로컬 LLM 해석 · 프로덕션과 산업연계 프로젝트에서 실측한 방법론과 연구 관심.',
    },
    eyebrow: 'RESEARCH',
    title: '측정하지 않은 것은 주장하지 않는다',
    lead: '산업경영공학과 헬스케어 데이터사이언스(융합전공)에서 출발해, 졸업논문의 대기질 정책 분석을 55개국 실트래픽 SaaS의 인과추론 엔진으로 키웠고, 같은 태도로 반려견 전장유전체 파이프라인을 만들었습니다. 이 페이지는 같은 증거를 연구자의 질문으로 다시 정리한 것입니다, 무엇을 물었고, 어떻게 쟀고, 무엇이 실패했는지.',
    background: [
      { label: '학부', body: '강릉원주대학교, 산업경영공학(주전공) · 헬스케어 데이터사이언스(융합전공). 졸업논문은 미세먼지 저감 정책의 한·중 비교 효과 분석.' },
      { label: '실무 훈련', body: 'KT AIVLE School AI 개발자 트랙 840h · 이어드림스쿨 LLM 부트캠프 산업연계 프로젝트(피터페터 바이오) · AI 학습데이터 QA·평가(Sigma · Welodata, Google 협력사).' },
      { label: '지금', body: '대기질 인텔리전스 SaaS AirLens를 1인으로 운영하며, 그 안의 모든 ML 출력에 불확실성과 데이터 품질 배지를 상시 노출합니다. 미국 데이터사이언스 석사 진학을 준비 중입니다.' },
    ],
    interestsHeading: '연구 관심',
    interestsLead: '우선순위 순서입니다. 각 항목에 이미 한 일과 다음에 배우고 싶은 것을 나눠 적었습니다.',
    interests: [
      {
        rank: '01',
        title: '환경·보건 데이터의 인과추론 · 정책은 효과가 있었나',
        question: '관측 데이터만으로 대기질 정책의 효과를 얼마나 정직하게 추정할 수 있는가? 어디까지가 신호이고 어디부터가 데이터 아티팩트인가?',
        done: '졸업논문에서 한·중 정책 전후 농도를 공공 관측 데이터로 비교(시각화 + t-test·회귀)한 뒤, AirLens에서 합성 이중차분(SDID)으로 국가 단위 정책 효과를 추정했습니다. 처음 6개국만 추정되던 문제의 원인이 알고리즘이 아니라 출처가 섞인 패널이었음을 찾아 단일 소스로 재구축, 추정 가능 국가 6 → 53. 근거가 약한 구간은 "추정 불가"로 노출합니다.',
        next: '시공간 교락(confounding)과 오염 전이(spillover)를 다루는 인과 방법, 위성 프록시(AOD)의 측정 오차가 추정치에 미치는 영향, 그리고 정책 효과의 이질성(heterogeneity)을 지역·계절별로 분해하는 방법을 체계적으로 배우고 싶습니다.',
        evidence: [
          { label: 'SDID 케이스', url: '/projects/airlens#sdid' },
          { label: '졸업논문', url: '#thesis' },
        ],
      },
      {
        rank: '02',
        title: 'ML 시스템의 신뢰성과 평가 · 지표가 숨기는 실패',
        question: '통과한 지표는 무엇을 보증하고 무엇을 보증하지 못하는가? 집계는 어떤 구간의 실패를 가리는가?',
        done: 'PM2.5 예측구간 커버리지(PICP@80)가 전체 93%지만 고농도(≥150) 구간에서 14%로 무너지는 것을 관측소 단위 leave-station-out 교차검증(484 관측소, 540만 행)으로 실측해 파일에 남겼습니다. LLM 조언 생성물 게이트에서 표면 지표 3개가 전부 통과했는데 LLM-judge 충실도 지표를 추가하자 65.6%로 전체 판정이 FAIL로 뒤집혔습니다. 리랭커 A/B의 "효과 없음"도 지우지 않고 보고했습니다.',
        next: '분포 이동 하의 보정(calibration)과 conformal prediction, 평가 지표 자체의 검증(meta-evaluation), LLM-as-judge의 신뢰도 측정을 깊이 공부하고 싶습니다.',
        evidence: [
          { label: '실측 노트', url: '/#timeline' },
          { label: 'TFT · Camera 케이스', url: '/projects/airlens#tft' },
        ],
      },
      {
        rank: '03',
        title: '민감 도메인에서의 로컬 LLM 해석 · 유전체·의료',
        question: '원시 데이터가 기기를 떠나지 않으면서, 생성 모델이 결정론적 파이프라인의 결과를 "설명"만 하도록 경계를 어떻게 설계하고 측정하는가?',
        done: '반려견 WGS 파이프라인에서 계산 플레인(BWA·bcftools·freebayes)과 추론 플레인(llama.cpp · Qwen, 127.0.0.1)을 분리했습니다. 개에는 truth set이 없어 정확도 대신 도구 간 불일치(Jaccard 0.3677)를 쟀고, 지표를 수치 전에 계약 파일로 동결해 FAIL(잔기 판별 LOGO 0.6664, 결합이 단일보다 나쁨)을 그대로 보고했습니다. 서술층은 표 밖 유전자 0건·병원성 단정 0건으로 측정했습니다.',
        next: '변이 해석의 표준(ACMG/AMP · AVCG)을 계산 가능한 근거 체계로 옮기는 방법, 종 간 ortholog 매핑의 불확실성, 소표본 유전체 연구의 통계적 검정력을 배우고 싶습니다.',
        evidence: [
          { label: 'Pitter-Petter 케이스', url: '/projects/pitter' },
          { label: 'Pages (비식별 집계)', url: 'https://joymin5655.github.io/Pitter-petter/' },
        ],
      },
      {
        rank: '04',
        title: 'AI 에이전트 거버넌스 · 정책을 코드로',
        question: '여러 AI 런타임이 코드를 쓰는 환경에서, 무엇을 사람이 결정하고 무엇을 기계 게이트가 강제해야 하는가?',
        done: 'Claude Code · Codex · Gemini를 단일 YAML 정책으로 제어하는 하네스 Agent를 만들어 본인 프로젝트 2곳에서 실운영 중입니다(고위험 작업 296건 차단 · 오탐 0 · 블라인드 벤치마크 8/8). 1,952세션의 자기 사용 기록을 전수 감사해 "인프라 부족이 아니라 집행 부족"이 병목임을 실측했습니다.',
        next: '에이전트 시스템의 평가 벤치마크 설계와 안전 정책의 형식화(policy-as-code의 검증 가능성)에 관심이 있습니다.',
        evidence: [
          { label: 'Agent 케이스', url: '/projects/agent' },
          { label: 'Second Brain', url: '/projects/brain' },
        ],
      },
    ],
    methodsHeading: '방법론, 어디서 무엇을 쟀나',
    methodsLead: '노트북 데모가 아니라 운영 중인 시스템과 산업연계 프로젝트 안에서 쓴 방법입니다. 각 행은 케이스스터디나 공개 산출물로 이어집니다.',
    methods: [
      { method: '합성 이중차분 (SDID)', where: 'AirLens · 국가 정책 효과', detail: '단일 소스 패널 재구축 · 시간가중 정규화 · 추정 가능 국가 6 → 53', evidence: { label: 'CASE', url: '/projects/airlens#sdid' } },
      { method: 'Leave-station-out 공간 교차검증', where: 'AirLens · AOD-XGBoost', detail: '484 관측소 · 5,405,283행 · 53 피처 · 구간별 PICP@80 (전체 0.93 → ≥150 0.14)', evidence: { label: 'NOTE', url: '/#timeline' } },
      { method: 'CORN 서수회귀 · DINOv2', where: 'AirLens · Camera AI', detail: '4단계 서열 분류 · 정확 57.9%, 인접등급 92.9% · 하늘 분할 mIoU 91.5%', evidence: { label: 'CASE', url: '/projects/airlens#camera' } },
      { method: 'Temporal Fusion Transformer', where: 'AirLens · 7일 예보', detail: 'train/serve 피처 패리티 계약 · 결측 시 정직한 skip', evidence: { label: 'CASE', url: '/projects/airlens#tft' } },
      { method: 'RAGAS 골든셋 · A/B', where: 'AirLens · 하이브리드 RAG', detail: 'n=24 · faithfulness 0.958 · 리랭커 Δ −0.0014 (효과 없음 보고)', evidence: { label: 'NOTE', url: '/#timeline' } },
      { method: 'LLM-as-judge 품질 게이트', where: 'AirLens · 조언 생성', detail: '표면 지표 3개 PASS → 충실도 65.6% FAIL로 판정 반전', evidence: { label: 'NOTE', url: '/#timeline' } },
      { method: '사전등록 측정 계약', where: 'Pitter-Petter WGS', detail: '지표·합격선·CV·중단 게이트를 수치 전에 동결 · 유전자층 부트스트랩 · 그룹보존 순열 검정', evidence: { label: 'CASE', url: '/projects/pitter#contract' } },
      { method: '다중 caller · 다중 annotator 일치도', where: 'Pitter-Petter WGS', detail: 'Jaccard 0.3677 · Ts/Tv 검정 · 3도구 결정론 4/4 · 집단 빈도 필터 88.7%', evidence: { label: 'CASE', url: '/projects/pitter#disagreement' } },
      { method: '관절 랜드마크 특징 + XGBoost', where: '바른자세 지킴이', detail: '9관절 201특징 · 5클래스 · 브라우저 ONNX 패리티 오차 0.000005', evidence: { label: 'CASE', url: '/projects/posture#model' } },
    ],
    thesisHeading: '졸업논문',
    thesis: {
      title: '「미세먼지 저감 정책의 효과 분석: 중국과 한국의 비교 분석」',
      body: '한국(AirKorea)과 중국 관측망의 공공 대기질 데이터로 정책 시행 전후의 농도 변화를 비교했습니다. 라인차트·boxplot·지도 시각화로 정책 시점과 농도의 대응을 살피고, t-test와 회귀로 차이를 검정했습니다. 이 질문, "정책이 정말 효과가 있었나, 아니면 기상·계절이 설명하나", 이 뒤에 AirLens의 SDID 엔진으로 이어졌습니다.',
      meta: '산업경영공학 · 개인 논문 · 지도교수 지도 · 2023',
      coursework: ['머신러닝', '딥러닝 프로젝트', '헬스케어 데이터마이닝 (R)', '빅데이터 고급 통계', '실험계획법', '데이터시각화', '데이터베이스관리', '품질경영'],
    },
    principlesHeading: '일하는 원칙',
    principlesLead: '프로덕션에서 배운 것을 연구 태도로 옮긴 것입니다.',
    principles: [
      { title: '통과 지표를 잘못 고르면 불량이 그대로 통과한다', body: '지표는 결과를 보기 전에 정하고, 표면 지표가 통과해도 "실제로 재고 싶은 것"을 재는 지표를 하나 더 둡니다.' },
      { title: '총계는 위험 구간을 가린다', body: '집계 하나로 판단하지 않고 구간별·그룹별로 쪼개 파일에 남깁니다. 가장 위험한 구간이 가장 중요합니다.' },
      { title: '개선이 없었던 실험도 기록한다', body: '음성 결과를 지우면 다음 사람이 같은 실험을 반복합니다.' },
      { title: '측정 도구부터 검증한다', body: '주제를 판정하기 전에 측정이 맞는지 봅니다. "구성으로 검증됨"은 검증이 아닙니다.' },
      { title: '설명할 수 없는 숫자는 쓰지 않는다', body: '이 사이트의 모든 수치는 커밋·리포트·수료증으로 역추적됩니다. 커밋 수·사용자 수처럼 오해를 부르는 숫자는 뺐습니다.' },
    ],
    status: { label: '진학 준비', body: '미국 데이터사이언스 석사(MS) 지원을 준비 중입니다. CV·성적표·추천서 관련 자료는 이메일로 요청하시면 보내드립니다.' },
    ctas: [
      { label: 'joymin5655@gmail.com', url: 'mailto:joymin5655@gmail.com' },
      { label: 'GitHub', url: 'https://github.com/joymin5655' },
      { label: '케이스스터디 전체', url: '/#work' },
    ],
    back: '← 홈',
    altLabel: 'EN',
    altHref: '/en/research/',
  },
  en: {
    meta: {
      title: 'Research · Yongmin Cho',
      description: 'Causal inference on environmental and health data, ML reliability and evaluation, local-LLM interpretation in sensitive domains · methods measured in production and in an industry-linked genomics project, and where I want to go next.',
    },
    eyebrow: 'RESEARCH',
    title: 'What I don’t measure, I don’t claim',
    lead: 'Starting from Industrial Engineering and an interdisciplinary major in Healthcare Data Science, I grew an undergraduate thesis on air-quality policy into the causal-inference engine of a SaaS serving 55 countries, and carried the same discipline into a dog whole-genome pipeline. This page reorganises the same evidence as a researcher’s questions, what I asked, how I measured, and what failed.',
    background: [
      { label: 'Undergraduate', body: 'Gangneung-Wonju National University, Industrial Engineering (major) · Healthcare Data Science (interdisciplinary major). Thesis: a Korea–China comparative analysis of fine-dust reduction policies.' },
      { label: 'Applied training', body: 'KT AIVLE School AI Developer Track, 840h · Yeardream School LLM bootcamp industry project (Pitter-Petter Bio) · AI training-data QA and evaluation (Sigma · Welodata, Google vendors).' },
      { label: 'Now', body: 'Operating AirLens, an air-quality intelligence SaaS, as its only engineer, every ML output ships with an uncertainty band and a data-quality badge. Preparing MS applications in Data Science in the United States.' },
    ],
    interestsHeading: 'Research interests',
    interestsLead: 'In priority order. For each: what I have already done, and what I want to learn next.',
    interests: [
      {
        rank: '01',
        title: 'Causal inference on environmental and health data · did the policy work?',
        question: 'How honestly can observational data estimate the effect of an air-quality policy? Where does signal end and data artefact begin?',
        done: 'My thesis compared pre/post-policy concentrations in Korea and China from public monitoring data (visualisation plus t-tests and regression). In AirLens I estimate country-level policy effects with synthetic difference-in-differences (SDID). When only six countries were estimable, the cause turned out to be a mixed-source panel, not the algorithm; rebuilding from a single source raised estimable countries from 6 to 53, and weak-evidence regions are shown as “not estimable”.',
        next: 'I want to study spatiotemporal confounding and spillover in causal designs, how measurement error in satellite proxies (AOD) propagates into estimates, and how to decompose effect heterogeneity by region and season.',
        evidence: [
          { label: 'SDID case', url: '/en/projects/airlens#sdid' },
          { label: 'Thesis', url: '#thesis' },
        ],
      },
      {
        rank: '02',
        title: 'Reliability and evaluation of ML systems · the failures metrics hide',
        question: 'What does a passing metric guarantee, and what does it not? Which bands of failure does an aggregate conceal?',
        done: 'PM2.5 prediction-interval coverage (PICP@80) was 93% overall but 14% in the high-concentration (≥150) band, measured with leave-station-out cross-validation over 484 stations and 5.4 M rows and committed to a file. In an LLM advice-generation gate, three surface metrics all passed until an LLM-judge fidelity metric returned 65.6% and flipped the verdict to FAIL. A reranker A/B with no effect was reported rather than deleted.',
        next: 'I want to go deeper into calibration under distribution shift and conformal prediction, meta-evaluation of the metrics themselves, and measuring the reliability of LLM-as-judge.',
        evidence: [
          { label: 'Field notes', url: '/en/#timeline' },
          { label: 'TFT · Camera cases', url: '/en/projects/airlens#tft' },
        ],
      },
      {
        rank: '03',
        title: 'Local-LLM interpretation in sensitive domains · genomics and health',
        question: 'How do you design and measure a boundary where raw data never leaves the machine and a generative model only explains the outputs of a deterministic pipeline?',
        done: 'In a dog WGS pipeline I separated a compute plane (BWA · bcftools · freebayes) from a reasoning plane (llama.cpp · Qwen on 127.0.0.1). With no truth set in dogs I measured tool disagreement (Jaccard 0.3677) instead of accuracy, froze the metrics in a contract before any number, and reported the FAILs (residue discrimination LOGO 0.6664; the combined model worse than the best single feature). The narration layer was measured at zero out-of-table genes and zero pathogenicity assertions.',
        next: 'I want to learn how variant-interpretation standards (ACMG/AMP · AVCG) can be turned into computable evidence systems, the uncertainty of cross-species ortholog mapping, and statistical power in small-sample genomics.',
        evidence: [
          { label: 'Pitter-Petter case', url: '/en/projects/pitter' },
          { label: 'Pages (de-identified)', url: 'https://joymin5655.github.io/Pitter-petter/' },
        ],
      },
      {
        rank: '04',
        title: 'AI agent governance · policy as code',
        question: 'When several AI runtimes write code, what must a human decide and what should a machine gate enforce?',
        done: 'I built Agent, a harness that controls Claude Code, Codex and Gemini under one YAML policy, and run it in production on two of my own projects (296 high-risk operations blocked · 0 false positives · 8/8 blind benchmark). A full audit of my own 1,952 sessions showed the bottleneck was enforcement, not infrastructure.',
        next: 'I am interested in benchmark design for agent systems and in formalising safety policy so that policy-as-code becomes verifiable.',
        evidence: [
          { label: 'Agent case', url: '/en/projects/agent' },
          { label: 'Second Brain', url: '/en/projects/brain' },
        ],
      },
    ],
    methodsHeading: 'Methods, where each one was measured',
    methodsLead: 'Not notebook demos: methods used inside a running system and an industry-linked project. Each row links to a case study or a public artefact.',
    methods: [
      { method: 'Synthetic difference-in-differences (SDID)', where: 'AirLens · national policy effects', detail: 'Single-source panel rebuild · time-weight regularisation · estimable countries 6 → 53', evidence: { label: 'CASE', url: '/en/projects/airlens#sdid' } },
      { method: 'Leave-station-out spatial cross-validation', where: 'AirLens · AOD-XGBoost', detail: '484 stations · 5,405,283 rows · 53 features · PICP@80 by band (overall 0.93 → ≥150 0.14)', evidence: { label: 'NOTE', url: '/en/#timeline' } },
      { method: 'CORN ordinal regression · DINOv2', where: 'AirLens · Camera AI', detail: '4-band ordinal classification · exact 57.9%, within-one-band 92.9% · sky segmentation mIoU 91.5%', evidence: { label: 'CASE', url: '/en/projects/airlens#camera' } },
      { method: 'Temporal Fusion Transformer', where: 'AirLens · 7-day forecast', detail: 'Train/serve feature-parity contract · honest skip on missing data', evidence: { label: 'CASE', url: '/en/projects/airlens#tft' } },
      { method: 'RAGAS golden set · A/B', where: 'AirLens · hybrid RAG', detail: 'n=24 · faithfulness 0.958 · reranker Δ −0.0014 (null result reported)', evidence: { label: 'NOTE', url: '/en/#timeline' } },
      { method: 'LLM-as-judge quality gate', where: 'AirLens · advice generation', detail: 'Three surface metrics PASS → fidelity 65.6% FAIL flips the verdict', evidence: { label: 'NOTE', url: '/en/#timeline' } },
      { method: 'Pre-registered measurement contract', where: 'Pitter-Petter WGS', detail: 'Metrics, pass lines, CV and stop gates frozen before any number · gene-stratified bootstrap · group-preserving permutation', evidence: { label: 'CASE', url: '/en/projects/pitter#contract' } },
      { method: 'Multi-caller · multi-annotator concordance', where: 'Pitter-Petter WGS', detail: 'Jaccard 0.3677 · Ts/Tv checks · 3-tool determinism 4/4 · population-frequency filter 88.7%', evidence: { label: 'CASE', url: '/en/projects/pitter#disagreement' } },
      { method: 'Joint-landmark features + XGBoost', where: 'Posture Guard', detail: '9 joints, 201 features · 5 classes · in-browser ONNX parity error 0.000005', evidence: { label: 'CASE', url: '/en/projects/posture#model' } },
    ],
    thesisHeading: 'Undergraduate thesis',
    thesis: {
      title: '“Effectiveness of Fine-Dust Reduction Policies: A Comparative Analysis of China and Korea”',
      body: 'Using public air-quality data from Korea (AirKorea) and Chinese monitoring networks, I compared concentration changes before and after policy implementation. Line charts, box plots and maps related policy timing to concentrations; t-tests and regression tested the differences. The question, did the policy work, or do weather and season explain it, is the one that later became AirLens’s SDID engine.',
      meta: 'Industrial Engineering · individual thesis · faculty-advised · 2023',
      coursework: ['Machine Learning', 'Deep Learning Project', 'Healthcare Data Mining (R)', 'Advanced Statistics for Big Data', 'Design of Experiments', 'Data Visualization', 'Database Management', 'Quality Management'],
    },
    principlesHeading: 'How I work',
    principlesLead: 'Lessons from production, carried over as research habits.',
    principles: [
      { title: 'Pick the wrong pass metric and defects walk through', body: 'Metrics are fixed before results are seen, and even when surface metrics pass there is one more that measures the thing actually wanted.' },
      { title: 'Aggregates hide the dangerous band', body: 'Never judge from one total; split by band and by group and commit the split. The riskiest band matters most.' },
      { title: 'Record the experiment that changed nothing', body: 'Deleting null results makes the next person repeat the experiment.' },
      { title: 'Validate the instrument before the subject', body: 'Check that the measurement is right before judging what it measures. “Verified by construction” is not verification.' },
      { title: 'Don’t publish a number you can’t explain', body: 'Every figure on this site traces to a commit, a report or a certificate. Misleading ones, commit counts, “users”, were removed.' },
    ],
    status: { label: 'Applications', body: 'Preparing MS applications in Data Science in the United States. CV, transcripts and reference materials are available on request by email.' },
    ctas: [
      { label: 'joymin5655@gmail.com', url: 'mailto:joymin5655@gmail.com' },
      { label: 'GitHub', url: 'https://github.com/joymin5655' },
      { label: 'All case studies', url: '/en/#work' },
    ],
    back: '← Home',
    altLabel: 'KO',
    altHref: '/research/',
  },
};
