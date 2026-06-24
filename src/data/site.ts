// Portfolio content — single source of truth (bilingual).
// Every claim here is cross-checked against the verified resume SSOT.
// NO unverified tech (no GCP/Nginx/Flutter/Tailwind), NO phone number, distilled not copied.

export type Project = {
  name: string;
  slug?: string; // when set, card links to /projects/<slug> case study
  tag: string;
  blurb: string;
  stack: string[];
  links: { label: string; url: string }[];
  flagship?: boolean;
};

export type CaseStudy = {
  name: string;
  tagline: string;
  overview: string;
  metrics?: { value: string; label: string }[];
  timeline?: { date: string; label: string }[];
  sections: { title: string; hard: string; solution: string; tech: string[]; lesson: string }[];
  modernTech: { name: string; why: string }[];
  meta: { title: string; description: string };
  links: { label: string; url: string }[];
};

export type Locale = {
  lang: 'ko' | 'en';
  altHref: string;
  altLabel: string;
  meta: { title: string; description: string };
  nav: { about: string; principles: string; projects: string; skills: string; timeline: string; contact: string };
  hero: {
    name: string;
    role: string;
    tagline: string;
    sub: string;
    ctas: { label: string; url: string; primary?: boolean }[];
  };
  metrics: { value: string; label: string }[];
  about: { heading: string; lead: string; pillars: { title: string; body: string }[]; motto: string };
  principles: { heading: string; items: { title: string; body: string }[] };
  projects: { heading: string; items: Project[] };
  skills: { heading: string; groups: { group: string; items: string[] }[] };
  timeline: { heading: string; items: { period: string; title: string; body: string }[] };
  credentials: { heading: string; groups: { label: string; items: string[] }[] };
  contact: { heading: string; lead: string; items: { label: string; url: string }[] };
};

const GITHUB = 'https://github.com/joymin5655';
const AIRLENS = 'https://airlens.cloud';
const EMAIL = 'mailto:joymin5655@gmail.com';

export const site: Record<'ko' | 'en', Locale> = {
  ko: {
    lang: 'ko',
    altHref: '/en/',
    altLabel: 'EN',
    meta: {
      title: '조용민 · AI 에이전트 / 인프라 엔지니어',
      description:
        '프로덕션 AI 에이전트와 멀티런타임 거버넌스 하네스를 혼자 끝까지 만드는 AI 에이전트·인프라 엔지니어. AirLens · Agent.',
    },
    nav: { about: '소개', principles: '원칙', projects: '프로젝트', skills: '기술', timeline: '여정', contact: '연락처' },
    hero: {
      name: '조용민',
      role: 'AI 에이전트 · 인프라 엔지니어',
      tagline: '기능이 아니라, 시스템을 만듭니다.',
      sub: '프로덕션 AI 에이전트를 만들고, 안정적으로 배포·운영·거버넌스하는 시스템까지 혼자 끝까지 설계합니다.',
      ctas: [
        { label: '프로젝트 보기', url: '#projects', primary: true },
        { label: 'AirLens 라이브', url: AIRLENS },
        { label: 'GitHub', url: GITHUB },
        { label: '이메일', url: EMAIL },
      ],
    },
    about: {
      heading: '소개',
      lead: '기획에서 출발해, AI 제품을 데이터·ML·프론트엔드·배포까지 혼자 출시하는 엔지니어입니다. AI 모델을 “만드는” 데서 멈추지 않고, 그 모델이 안정적으로 사용자에게 닿는 배포·운영·거버넌스 시스템 전체를 설계합니다.',
      pillars: [
        {
          title: '프로덕션 AI 에이전트',
          body: '대기질 SaaS AirLens에 GPT-4o 분석 에이전트(AnalysisEngine)를 제품 기능으로 탑재 · 단독 1,200+ 커밋 · 라이브 운영.',
        },
        {
          title: '멀티런타임 거버넌스',
          body: 'Claude Code · Codex · Gemini 3개 런타임을 단일 YAML 정책으로 제어하는 Agent 하네스 · 다층 시크릿 방어 · 정책 as code.',
        },
        {
          title: 'ML · 물리 기반 모델링',
          body: 'GTWR-XGBoost · PINN · SDID 인과추론 · DINOv2 → ONNX 엣지 추론. 불확실성을 정량화하는 글래스박스 접근.',
        },
      ],
      motto: 'Context is the weapon · Defense-in-depth · Distill, don’t copy.',
    },
    metrics: [
      { value: '1,261', label: '커밋 · 3.5개월 단독 (AirLens)' },
      { value: '71%', label: 'feat · fix · refactor 비중' },
      { value: '10+', label: '융합 데이터 소스' },
      { value: '5', label: 'ML 엔진 (AirLens)' },
      { value: '3', label: 'AI 런타임 통합 (Agent)' },
    ],
    principles: {
      heading: '엔지니어링 원칙',
      items: [
        { title: '맥락이 무기다 · Context over knowledge', body: 'LLM 시대엔 지식이 아니라 구조화된 개인 맥락이 차별점입니다. 그래서 경험·판단·도메인 지식을 자체 구축한 타입 지식그래프(130 원자노드 · 0 lint)로 구조화해 어떤 모델에서도 재사용합니다.' },
        { title: "복사 말고 증류 · Distill, don't copy", body: '미증류 문서를 그대로 쌓으면 그래프가 오염되고 통계가 거짓이 됩니다. 외부 자료는 원자 단위로 증류하고, 미증류 소스는 따로 격리합니다.' },
        { title: '도구가 아니라 워크플로를 갈아엎어라 · Workflow redesign', body: 'AI를 기존 워크플로에 얹는 건 한계가 명확합니다. 계획→구현→리뷰→테스트→배포 파이프라인 전체를 AI 중심으로 재설계할 때 차이가 납니다.' },
        { title: '다층 방어 · Defense in depth', body: '하나의 통제는 반드시 뚫립니다. gitleaks → CI → 훅 → 정책 게이트처럼 독립 레이어를 엮어, 한 층이 놓친 걸 다음 층이 잡게 합니다.' },
        { title: '불확실성을 숨기지 마라 · Glass-box honesty', body: '단일 예측값은 과신을 부릅니다. 모든 ML 출력에 p10~p90 구간과 데이터 품질 배지를 노출해, 불확실성을 제품의 일부로 만듭니다.' },
      ],
    },
    projects: {
      heading: '대표 프로젝트',
      items: [
        {
          name: 'AirLens',
          slug: 'airlens',
          tag: '대기질 인텔리전스 SaaS · 단독 개발',
          blurb:
            '위성·지상 10+ 데이터 소스를 통합해 PM2.5를 추정하고, GPT-4o 분석 에이전트로 자연어 질의를 코드·인사이트로 변환하는 대기질 인텔리전스 플랫폼. 데이터 파이프라인부터 ML, 프론트엔드, CI/CD 배포까지 혼자 구축해 라이브 운영 중.',
          stack: ['GPT-4o AnalysisEngine', 'FastAPI', 'Docker', 'Supabase (RLS · pgvector RAG)', 'React 19 / TS', 'ONNX (DINOv2)', 'GTWR-XGBoost · PINN', 'SDID 인과추론', 'GitHub Actions', 'Sentry · PostHog'],
          links: [
            { label: 'airlens.cloud', url: AIRLENS },
            { label: 'GitHub', url: `${GITHUB}/AirLens` },
          ],
          flagship: true,
        },
        {
          name: 'Agent',
          slug: 'agent',
          tag: '멀티런타임 에이전트 거버넌스 하네스',
          blurb:
            'Claude Code · Codex · Gemini 3개 런타임을 단일 YAML 정책으로 제어하는 벤더 중립 하네스. 이식 가능한 보안 훅과 다층 시크릿 방어(gitleaks + pre-commit + pre-push + CI)로 “정책을 코드로” 강제한다. Claude Code 플러그인으로 설치 가능.',
          stack: ['Policy-as-Code', 'Portable Hooks', 'gitleaks', 'CI/CD Auto-ship', 'Claude Code Plugin'],
          links: [{ label: 'GitHub', url: `${GITHUB}/Agent` }],
        },
        {
          name: '바른자세 지킴이',
          tag: 'KT AIVLE 빅프로젝트 · 6인 팀 · 프론트엔드 ~80% 주도',
          blurb:
            '웹캠과 MediaPipe Holistic 기반 실시간 자세교정 SaaS. 6인 팀에서 프론트엔드를 약 80% 주도해 실시간 모니터링·Chart.js 통계 대시보드·스트레칭 가이드·챗봇 UI를 구축. 팀의 XGBoost 자세 분류기(자세 4범주·스트레칭 7종)와 LangChain RAG 챗봇을 프론트에 통합. Collaboration상(KT × 고용노동부) 수상.',
          stack: ['Django', 'MediaPipe Holistic', 'Chart.js', 'XGBoost', 'LangChain RAG'],
          links: [],
        },
      ],
    },
    skills: {
      heading: '기술 스택',
      groups: [
        { group: 'AI / Agent', items: ['OpenAI GPT-4o', 'Anthropic Claude', 'Model Context Protocol', 'LangChain', 'PyTorch', 'ONNX', 'RAG'] },
        { group: 'Backend / Infra', items: ['FastAPI', 'Docker', 'Supabase', 'GitHub Actions', 'Cloudflare Pages', 'Redis', 'Sentry', 'PostHog', 'Prometheus'] },
        { group: 'ML / Data', items: ['scikit-learn', 'pandas', 'NumPy', 'XGBoost', 'GTWR', 'PINN', 'SDID'] },
        { group: 'Frontend', items: ['React 19', 'TypeScript', 'Vite', 'Three.js'] },
        { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL'] },
      ],
    },
    timeline: {
      heading: '여정',
      items: [
        { period: '2023.01 – 05', title: '로지체인 · 기획 인턴', body: '온디바이스 AI·비전 분석 솔루션 신규 사업 제안서 작성. 구조·시각 개선 제안이 채택되어 제안 통과에 기여 — 기획만으로는 닿지 못하는 “구현”의 벽을 느낀 시점.' },
        { period: '2023.08 – 2024.01', title: 'KT AIVLE School · AI 개발자 트랙 (840h)', body: '빅프로젝트에서 프론트엔드를 주도했으나 배포 단계에서 실패. “아무리 좋은 모델도 배포되지 않으면 의미가 없다” — 인프라·CI/CD를 파고든 전환점.' },
        { period: '2024.07 – 2025.01', title: '에듀인소프트 · 교육 운영·기획', body: '데이터 자격증(SQLD·ADsP) 과정 운영·진도·정산 행정 + 과정 제안·기획 보조.' },
        { period: '2026.03 – 현재', title: 'AirLens 제품 개발 (단독) · Agent 하네스', body: '캡스톤 대기질 연구를 상용 SaaS로 고도화. 단독 1,200+ 커밋, GPT-4o 에이전트 탑재, 라이브 운영. 멀티런타임 거버넌스 하네스 Agent 병행 운영.' },
        { period: '계약', title: 'Sigma · Welodata (Google) · AI 데이터 QA·평가', body: '한국어 음성 전사·언어 QA, 광고·검색 적합성 평가 — AI 학습 데이터 파이프라인 (~8개월).' },
      ],
    },
    credentials: {
      heading: '학력 · 자격',
      groups: [
        { label: '학력', items: ['강릉원주대학교 — 헬스케어데이터사이언스 (복수전공) GPA 4.44 / 4.5', '산업경영공학 (주전공) · 전체 GPA 3.68 / 4.5'] },
        { label: '수상', items: ['AIVLE 빅프로젝트 Collaboration상 (KT × 고용노동부)', '정밀의료 메이커톤 사업단장상 (2022)', '청년 일경험사업 최우수상'] },
        { label: '교육', items: ['KT AIVLE School · AI 개발자 트랙 (840h)', '이어드림스쿨 · LLM 부트캠프'] },
        { label: '자격증', items: ['Microsoft Azure AI Fundamentals (AI-900)', 'Six Sigma Green Belt', 'ITQ (Excel · Word · PPT)', '빅데이터분석기사 (예정)'] },
        { label: '온라인 수료', items: ['Google AI · IBM Data Science · DeepLearning.AI 등 온라인 과정 수료'] },
      ],
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
        'AI Agent / Infrastructure Engineer who solo-builds production AI agents and a multi-runtime governance harness. AirLens · Agent.',
    },
    nav: { about: 'About', principles: 'Principles', projects: 'Projects', skills: 'Skills', timeline: 'Journey', contact: 'Contact' },
    hero: {
      name: 'Yongmin Cho',
      role: 'AI Agent · Infrastructure Engineer',
      tagline: 'System builder, not feature builder.',
      sub: 'I build production AI agents — and design the whole system that ships, runs, and governs them, end to end and solo.',
      ctas: [
        { label: 'View Projects', url: '#projects', primary: true },
        { label: 'AirLens Live', url: AIRLENS },
        { label: 'GitHub', url: GITHUB },
        { label: 'Email', url: EMAIL },
      ],
    },
    about: {
      heading: 'About',
      lead: 'I started in product planning and now ship AI products end to end — data, ML, frontend, and deployment, solo. I don’t stop at building models; I design the deployment, operation, and governance systems that get them reliably into users’ hands.',
      pillars: [
        {
          title: 'Production AI Agent',
          body: 'Shipped a GPT-4o analysis agent (AnalysisEngine) as a product feature inside AirLens, a live air-quality SaaS — 1,200+ solo commits.',
        },
        {
          title: 'Multi-runtime Governance',
          body: 'Agent: a harness controlling Claude Code · Codex · Gemini under one YAML policy, with multi-layer secret defense and policy-as-code.',
        },
        {
          title: 'ML & Physics Modeling',
          body: 'GTWR-XGBoost · PINN · SDID causal inference · DINOv2 → ONNX edge inference — a glass-box approach that quantifies uncertainty.',
        },
      ],
      motto: 'Context is the weapon · Defense-in-depth · Distill, don’t copy.',
    },
    metrics: [
      { value: '1,261', label: 'commits · solo · 3.5 months (AirLens)' },
      { value: '71%', label: 'feat · fix · refactor share' },
      { value: '10+', label: 'fused data sources' },
      { value: '5', label: 'ML engines (AirLens)' },
      { value: '3', label: 'AI runtimes unified (Agent)' },
    ],
    principles: {
      heading: 'Engineering Principles',
      items: [
        { title: 'Context over knowledge', body: "In the LLM era the edge isn't knowledge — it's structured personal context. I encode my experience, judgment, and domain knowledge into a self-built typed knowledge graph (130 atomic nodes, 0 lint findings) so it stays reusable across any model." },
        { title: "Distill, don't copy", body: 'Piling up undigested documents pollutes the graph and turns its statistics into lies. I distill external material into atomic notes and quarantine raw sources separately.' },
        { title: 'Workflow redesign over tool adoption', body: 'Bolting AI onto an existing workflow has a hard ceiling. The difference comes from redesigning the whole pipeline — plan → build → review → test → deploy — around AI.' },
        { title: 'Defense in depth', body: 'A single control always breaks. I chain independent layers (gitleaks → CI → hook → policy gate) so the next catches what the last one missed.' },
        { title: 'Glass-box honesty', body: 'Single-point predictions breed overconfidence. Every ML output exposes a p10–p90 band and a data-quality badge, making uncertainty part of the product.' },
      ],
    },
    projects: {
      heading: 'Featured Projects',
      items: [
        {
          name: 'AirLens',
          slug: 'airlens',
          tag: 'Air-quality intelligence SaaS · Solo',
          blurb:
            'An air-quality intelligence platform that fuses 10+ satellite & ground data sources to estimate PM2.5, and turns natural-language questions into code and insight via a GPT-4o analysis agent. Built solo from data pipeline to ML, frontend, and CI/CD — live in production.',
          stack: ['GPT-4o AnalysisEngine', 'FastAPI', 'Docker', 'Supabase (RLS · pgvector RAG)', 'React 19 / TS', 'ONNX (DINOv2)', 'GTWR-XGBoost · PINN', 'SDID causal inference', 'GitHub Actions', 'Sentry · PostHog'],
          links: [
            { label: 'airlens.cloud', url: AIRLENS },
            { label: 'GitHub', url: `${GITHUB}/AirLens` },
          ],
          flagship: true,
        },
        {
          name: 'Agent',
          slug: 'agent',
          tag: 'Multi-runtime agent governance harness',
          blurb:
            'A vendor-neutral harness that controls Claude Code · Codex · Gemini under a single YAML policy. Portable security hooks and multi-layer secret defense (gitleaks + pre-commit + pre-push + CI) enforce policy-as-code. Installable as a Claude Code plugin.',
          stack: ['Policy-as-Code', 'Portable Hooks', 'gitleaks', 'CI/CD Auto-ship', 'Claude Code Plugin'],
          links: [{ label: 'GitHub', url: `${GITHUB}/Agent` }],
        },
        {
          name: 'Posture Keeper',
          tag: 'KT AIVLE Big Project · 6-person team · led ~80% of frontend',
          blurb:
            'A real-time posture-correction SaaS using webcam + MediaPipe Holistic. On a 6-person team I led ~80% of the frontend — real-time monitoring, a Chart.js statistics dashboard, a stretching guide, and the chatbot UI — integrating the team’s XGBoost posture classifier (4 postures / 7 stretches) and a LangChain RAG chatbot. Won the AIVLE Big Project Collaboration Award (KT × Ministry of Employment & Labor).',
          stack: ['Django', 'MediaPipe Holistic', 'Chart.js', 'XGBoost', 'LangChain RAG'],
          links: [],
        },
      ],
    },
    skills: {
      heading: 'Tech Stack',
      groups: [
        { group: 'AI / Agent', items: ['OpenAI GPT-4o', 'Anthropic Claude', 'Model Context Protocol', 'LangChain', 'PyTorch', 'ONNX', 'RAG'] },
        { group: 'Backend / Infra', items: ['FastAPI', 'Docker', 'Supabase', 'GitHub Actions', 'Cloudflare Pages', 'Redis', 'Sentry', 'PostHog', 'Prometheus'] },
        { group: 'ML / Data', items: ['scikit-learn', 'pandas', 'NumPy', 'XGBoost', 'GTWR', 'PINN', 'SDID'] },
        { group: 'Frontend', items: ['React 19', 'TypeScript', 'Vite', 'Three.js'] },
        { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL'] },
      ],
    },
    timeline: {
      heading: 'Journey',
      items: [
        { period: '2023.01 – 05', title: 'Logichain · Planning Intern', body: 'Authored new-business proposals for on-device AI / vision solutions; my structural and visual improvements were adopted, contributing to proposal approval — where I first hit the wall between planning and building.' },
        { period: '2023.08 – 2024.01', title: 'KT AIVLE School · AI Developer Track (840h)', body: 'Led the frontend on the big project but failed at the deployment step. “No matter how good the model, it’s meaningless if it never ships” — the turning point that drove me into infrastructure and CI/CD.' },
        { period: '2024.07 – 2025.01', title: 'Eduinsoft · Education Planning & Operations', body: 'Ran data-certification courses (SQLD · ADsP): student progress & settlement administration, plus proposal and planning support.' },
        { period: '2026.03 – Present', title: 'AirLens (solo) · Agent harness', body: 'Grew a capstone air-quality study into a production SaaS — 1,200+ solo commits, GPT-4o agent onboard, live. Run the multi-runtime governance harness Agent in parallel.' },
        { period: 'Contract', title: 'Sigma · Welodata (Google) · AI Data QA & Evaluation', body: 'Korean speech transcription & linguistic QA, ads/search relevance evaluation — AI training-data pipeline (~8 months).' },
      ],
    },
    credentials: {
      heading: 'Education & Credentials',
      groups: [
        { label: 'Education', items: ['Gangneung-Wonju National University — Healthcare Data Science (Double Major) GPA 4.44 / 4.5', 'Industrial Engineering (Major) · Overall GPA 3.68 / 4.5'] },
        { label: 'Awards', items: ['AIVLE Big Project Collaboration Award (KT × Ministry of Employment & Labor)', 'Business Director Award, Precision-Medicine Maker-thon (2022)', 'Grand Prize, Youth Work-Experience Program'] },
        { label: 'Training', items: ['KT AIVLE School · AI Developer Track (840h)', 'Yeardream School · LLM Bootcamp'] },
        { label: 'Certifications', items: ['Microsoft Azure AI Fundamentals (AI-900)', 'Six Sigma Green Belt', 'ITQ (Excel · Word · PPT)', 'Big Data Analysis Engineer (in progress)'] },
        { label: 'Online Coursework', items: ['Google AI · IBM Data Science · DeepLearning.AI online course completions'] },
      ],
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
// paths exposed; Agent counts kept qualitative per truthfulness gate.
export const caseStudies: Record<
  'ko' | 'en',
  {
    ui: { back: string; home: string; hard: string; solution: string; tech: string; lesson: string; overview: string; modern: string };
    items: Record<string, CaseStudy>;
  }
> = {
  ko: {
    ui: {
      back: '← 프로젝트로',
      home: '← 홈',
      hard: '어려웠던 점',
      solution: '해결',
      tech: '적용 기술',
      lesson: '배운 점',
      overview: '개요',
      modern: '중간에 반영한 최신 기술',
    },
    items: {
      airlens: {
        name: 'AirLens',
        tagline: '대기질 인텔리전스 SaaS · 단독 개발 · 라이브',
        overview:
          'AirLens는 위성·지상 10여 개 데이터 소스를 통합해 PM2.5를 추정하고, 정책 효과를 인과추론으로 분석하며, GPT-4o 에이전트로 자연어 질의를 코드·인사이트로 바꾸는 대기질 인텔리전스 플랫폼입니다. 데이터 파이프라인부터 ML·프론트엔드·배포까지 혼자 구축해 라이브로 운영하고 있습니다. 가장 까다로웠던 문제들과 해결 방식, 그리고 진행 중 도입한 최신 기술입니다.',
        metrics: [
          { value: '1,261', label: '커밋 · 단독' },
          { value: '3.5개월', label: '2026-03 → 06' },
          { value: '71%', label: 'feat · fix · refactor' },
          { value: '10+', label: '데이터 소스' },
          { value: '5', label: 'ML 엔진' },
        ],
        timeline: [
          { date: '2026-03', label: '첫 커밋 · PostHog·Sentry 관측 도입' },
          { date: '2026-04', label: 'DINOv2 → ONNX 내보내기 (Camera AI 엣지 추론)' },
          { date: '2026-05', label: 'npm workspaces 모노레포 마이그레이션 · TFT ONNX 추론 배선' },
          { date: '2026-06', label: 'pgvector 하이브리드 RAG + Haiku 재랭킹 · TFT 실데이터 배선 · SDID 6→53 · GPT-4o Edge' },
        ],
        sections: [
          {
            title: '정책 효과 분석이 “데이터의 함정”에 빠진 문제 (SDID 인과추론)',
            hard:
              '국가별 대기질 정책의 효과를 합성 이중차분(SDID)으로 추정했는데, 처음엔 6개국에서만 결과가 나왔고 그중 통계적으로 유의한 건 1개뿐이었습니다. 원인을 추적하니 알고리즘이 아니라 데이터의 함정이었습니다 — 한 나라의 시계열이 중간에 서로 다른 출처(편향이 있는 위성 재분석 데이터 ↔ 지상 관측값)로 바뀌며 생긴 인공적인 “점프”를, SDID가 정책의 효과로 잘못 해석하고 있었습니다.',
            solution:
              '출처를 단일 소스로 통일해 패널을 재구축했습니다(편향이 일정하면 차분 과정에서 상쇄됨). 희소한 데이터에서도 추정이 안정되도록 시간 가중치에 정규화를 더했고, 절대 오차 대신 사전 수준으로 정규화한 적합 게이트로 오염도가 다른 국가들을 공평하게 다뤘습니다. 마지막으로 표준오차가 0에 가깝게 반올림돼 “거짓 확신”으로 보고되는 경우를 잡아내는 정직성 게이트를 넣었습니다.',
            tech: ['합성 이중차분(SDID)', '시간가중 정규화', 'Glass-box 정직성 게이트'],
            lesson:
              '추정 가능한 국가가 6개에서 53개로 늘었고, 근거가 약한 구간은 숫자를 지어내는 대신 “추정 불가” 상태로 노출합니다. 모델이 그럴듯한 답을 내도 그것이 “신호”인지 “데이터 아티팩트”인지 먼저 의심해야 하며, 정확도보다 정직함(불확실성 노출)이 신뢰를 만든다는 걸 배웠습니다.',
          },
          {
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
            title: 'RLS 권한 정책 폭증 정리 (132 → 6)',
            hard:
              'Supabase(Postgres) 성능 어드바이저가 24개 테이블에 걸쳐 중복된 permissive RLS 정책 132개를 경고했습니다. 같은 역할·동작에 정책이 여러 개면 OR로 모두 평가돼 성능 부담과 불필요한 공격면이 생깁니다. 특히 service_role용 정책 14개는 service_role이 애초에 RLS를 우회하기 때문에 실제로는 아무것도 막지 못하고 있었습니다.',
            solution:
              '(1) 무의미한 service_role 정책 삭제, (2) 중복 SELECT 정책 병합, (3) 관리자 정책을 동작별로 분리했습니다. 그리고 24개 테이블 전부를 “누가 무엇에 접근 가능한가” 매트릭스로 적대적 검증해, 어느 사용자도 권한이 늘거나 줄지 않았음을 확인했습니다.',
            tech: ['Supabase RLS', '권한 매트릭스 적대적 검증', 'pgvector 하이브리드 RAG'],
            lesson:
              '보안 정책은 “많이”가 아니라 “정확히”입니다. 정리하면서도 단 한 명의 권한도 바뀌지 않았음을 증명할 수 있어야 합니다.',
          },
          {
            title: '사진 한 장으로 PM2.5 추정 (Camera AI)',
            hard:
              '사진으로 대기질을 추정하려면 두 가지가 까다로웠습니다. (1) “정확히 38.2 µg/m³”라는 절대값보다 “이 정도로 나쁨”이라는 순서가 더 자연스럽고 견고하며, (2) 수억 파라미터의 비전 트랜스포머를 서버가 아니라 브라우저·모바일 엣지에서 돌려야 했습니다.',
            solution:
              'DINOv2 파운데이션 모델을 백본으로 쓰고, 분류도 회귀도 아닌 CORN 서수회귀 헤드로 “순서”를 학습시켰습니다. 학습한 모델은 ONNX로 내보내 엣지에서 추론하고, glass-box 원칙대로 단일 값이 아니라 불확실성 구간을 함께 노출합니다.',
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
          'Agent는 Claude Code·Codex·Gemini 세 AI 런타임을 하나의 정책으로 제어하는 멀티런타임 거버넌스 하네스입니다. “정책을 코드로” 강제해, 어떤 런타임을 쓰든 같은 보안·안전 규칙이 작동하게 만드는 것이 목표였습니다. 가장 까다로웠던 세 가지 문제입니다.',
        sections: [
          {
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
            title: '여러 에이전트가 같은 자원을 동시에 건드리는 레이스',
            hard:
              'Claude·Codex·Gemini를 worktree별로 병렬 실행하면, 셋이 동시에 같은 프로덕션 자원(DB 마이그레이션·배포)을 점유하려다 레이스 컨디션으로 마이그레이션이 꼬이거나 중복 배포가 날 수 있습니다.',
            solution:
              '파일 기반 JSON 락을 원자적으로(flock + 임시파일 + rename) 기록하고, PreToolUse 훅이 자원 소유권을 확인해 다른 세션이 점유 중이면 거부하게 했습니다. 5분 주기 heartbeat와 죽은 PID·30분 초과 세션의 자동 GC로 좀비 락을 방지했고, 상태 어휘는 Anthropic Agent Teams 프리미티브에 맞췄습니다.',
            tech: ['원자적 JSON 락', 'heartbeat / stale GC', 'git worktree 조율'],
            lesson:
              '분산 협업에선 “누가 무엇을 소유했는가”를 원자적으로 관리하고, 죽은 세션을 스스로 회수하는 장치가 반드시 필요합니다.',
          },
          {
            title: '스캐너가 놓친 시크릿 (defense-in-depth)',
            hard:
              'gitleaks 같은 시크릿 스캐너는 “알려진 형식”만 잡습니다. 실제로 NVIDIA NIM API 키 형식(nvapi-)은 기본 룰셋에 없어 그대로 빠져나갔고 수동 grep으로 여러 곳에서 발견됐습니다. “스캐너가 조용하다”는 건 “시크릿이 없다”가 아니라 “형식을 모른다”는 뜻이었습니다.',
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
      back: '← Projects',
      home: '← Home',
      hard: 'The hard part',
      solution: 'How I solved it',
      tech: 'Tech applied',
      lesson: 'What I learned',
      overview: 'Overview',
      modern: 'Modern tech adopted along the way',
    },
    items: {
      airlens: {
        name: 'AirLens',
        tagline: 'Air-quality intelligence SaaS · Solo · Live',
        overview:
          'AirLens fuses 10+ satellite & ground data sources to estimate PM2.5, analyzes policy impact via causal inference, and turns natural-language questions into code and insight through a GPT-4o agent. I built it solo — from data pipeline to ML, frontend, and deployment — and run it live. Here are the hardest problems, how I solved them, and the modern tech I adopted along the way.',
        metrics: [
          { value: '1,261', label: 'commits · solo' },
          { value: '3.5 mo', label: '2026-03 → 06' },
          { value: '71%', label: 'feat · fix · refactor' },
          { value: '10+', label: 'data sources' },
          { value: '5', label: 'ML engines' },
        ],
        timeline: [
          { date: '2026-03', label: 'First commit · PostHog & Sentry observability' },
          { date: '2026-04', label: 'DINOv2 → ONNX export (Camera AI edge inference)' },
          { date: '2026-05', label: 'npm workspaces monorepo migration · TFT ONNX inference wiring' },
          { date: '2026-06', label: 'pgvector hybrid RAG + Haiku re-ranking · TFT real-data wiring · SDID 6→53 · GPT-4o Edge' },
        ],
        sections: [
          {
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
        sections: [
          {
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
