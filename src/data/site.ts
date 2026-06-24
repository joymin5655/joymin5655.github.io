// Portfolio content — single source of truth (bilingual).
// Every claim here is cross-checked against the verified resume SSOT.
// NO unverified tech (no GCP/Nginx/Flutter/Tailwind), NO phone number, distilled not copied.

export type Project = {
  name: string;
  tag: string;
  blurb: string;
  stack: string[];
  links: { label: string; url: string }[];
  flagship?: boolean;
};

export type Locale = {
  lang: 'ko' | 'en';
  altHref: string;
  altLabel: string;
  meta: { title: string; description: string };
  nav: { about: string; projects: string; skills: string; timeline: string; contact: string };
  hero: {
    name: string;
    role: string;
    tagline: string;
    sub: string;
    ctas: { label: string; url: string; primary?: boolean }[];
  };
  about: { heading: string; lead: string; pillars: { title: string; body: string }[]; motto: string };
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
    nav: { about: '소개', projects: '프로젝트', skills: '기술', timeline: '여정', contact: '연락처' },
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
    projects: {
      heading: '대표 프로젝트',
      items: [
        {
          name: 'AirLens',
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
    nav: { about: 'About', projects: 'Projects', skills: 'Skills', timeline: 'Journey', contact: 'Contact' },
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
    projects: {
      heading: 'Featured Projects',
      items: [
        {
          name: 'AirLens',
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
