// Portfolio content, single source of truth (bilingual). Orbital Console v3.
// Every claim here is cross-checked against the verified fact sheet of
// 2026-10-25 (local, private) and the resume SSOT (local, private:
// session_summary_report.md). NO unverified tech (no GCP/Nginx/Flutter/
// Tailwind), NO phone number, NO commit-count figures, and NO traffic or
// usage numbers of any kind (2026-10-25 user decision, permanent). Work history
// the user excluded from public pages stays off this site (see CLAUDE.md).
//
// 2026-09-03 exposure decisions (user delegated): awards (3, proof PDFs on
// file) and company names ARE shown; credentials limited to Azure AI-900 +
// Six Sigma GB (online course certs stay out); GPA stays withheld; Act 05 is
// a full experience ledger + measured field notes.

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

export type TimelineKind = 'build' | 'work' | 'edu';
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
  hero: {
    role: string;
    headline: { before: string; em: string; after: string };
    sub: string;
    live: Evidence;
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
const AIRLENS_DATA_REPO = 'https://github.com/AirLens-cloud/airlens-data';
const AIRLENS = 'https://airlens.cloud';
const EMAIL = 'mailto:joymin5655@gmail.com';

const STACK_CHIPS = [
  'Python', 'TypeScript', 'Bash',
  'Claude Code', 'Codex', 'Antigravity', 'Model Context Protocol',
  'XGBoost', 'LightGBM', 'GTWR', 'Conformal prediction', 'TimesFM', 'SDID',
  'Workers AI', 'Hugging Face', 'Cloudflare Workers', 'Cloudflare Pages', 'GitHub Actions', 'gitleaks',
  'React 19', 'Vite', 'Three.js', 'Zustand',
];

export const site: Record<'ko' | 'en', Locale> = {
  ko: {
    lang: 'ko',
    altHref: '/en/',
    altLabel: 'EN',
    meta: {
      title: '조용민 · AI 에이전트 / 인프라 엔지니어',
      description:
        'AI를 프로덕션까지 도달시키는 엔지니어. 키 없이 쓰는 공개 API를 갖춘 대기질 웹 서비스 AirLens와 AI 코딩 에이전트 거버넌스 하네스 Agent를 AI 에이전트 팀과 함께 만들고, 혼자 책임지고 운영합니다.',
    },
    nav: { board: '관측', work: 'Work', depth: 'DS Depth', timeline: '경험', research: 'Research', contact: '연락처' },
    hero: {
      role: 'AI 에이전트 · 인프라 엔지니어 · 조용민',
      headline: { before: 'AI를 ', em: '프로덕션', after: '까지 도달시키는 엔지니어' },
      sub: '기획→모델→인프라→배포→운영까지, AI 에이전트 팀을 지휘해 혼자서 끝까지 갑니다. 코드 작성의 대부분은 AI가 하고, 방향·검증·운영의 책임은 제가 집니다.',
      live: { label: 'LIVE · airlens.cloud', url: AIRLENS },
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
          value: 'A~F',
          unit: '신뢰 등급',
          label: 'PM2.5 추정마다 p10 · p50 · p90 구간과 등급이 붙습니다 · 공개 Hugging Face 데이터셋 위에서 Cloudflare Workers가 서빙 · 배치 잡은 GitHub Actions 호스티드 러너',
          span: 8,
          evidence: { label: 'AirLens 웹 저장소', url: AIRLENS_WEB_REPO },
        },
        {
          eyebrow: 'GOVERNANCE',
          value: '25',
          unit: '/ 27 오탐',
          label: '세션 기록 감사에서 시크릿 가드 차단 27건 중 25건이 오탐이었습니다 · 실제 읽기만 막도록 가드를 다시 만들었습니다',
          span: 4,
          evidence: { label: 'Agent 하네스', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'DATA QUALITY',
          value: '88',
          unit: '/ 581곳',
          label: '관측소 중 일주일 이상 된 값을 현재값으로 내보내던 곳입니다 · 기록 나이 필터가 걸러 내고 제외 목록을 남깁니다',
          span: 4,
          evidence: { label: '케이스스터디', url: '/projects/airlens#stale' },
        },
        {
          eyebrow: 'CAUSAL PANEL',
          value: '119',
          unit: '개국',
          tone: 'ok',
          label: '지상 관측으로 보정한 단일 출처 패널에서 정책 효과를 다시 추정 · 추정 가능 88개국',
          span: 4,
          evidence: { label: '케이스스터디', url: '/projects/airlens#causal' },
        },
        {
          eyebrow: 'RUNTIMES',
          value: '27',
          unit: 'hooks',
          label: 'Claude Code · Codex · Antigravity를 하나의 정책 코어로 제어 · 위험 경로 커밋은 다른 회사 AI의 검토가 필요합니다',
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
        tag: '대기질 웹 서비스 · 키 없는 공개 API · AI 에이전트 협업 · 1인 책임·운영 · LIVE',
        blurb:
          '학부 논문에서 정책 효과를 분석하며, 관측소·기상·위성 데이터가 흩어져 있고 대부분의 대기질 서비스가 추정값을 얼마나 믿을 수 있는지 보여 주지 않는다는 문제를 봤습니다. 문제 정의, 데이터 출처 선정, 평가 설계, 아키텍처, 릴리스 판단, 모니터링, 장애 대응을 혼자 맡고 모든 머지를 승인하며, 구현은 이 통제 안에서 AI 에이전트가 대부분 씁니다. PM2.5 추정마다 p10~p90 구간과 A~F 신뢰 등급이 붙고, 도시 예보와 정책 효과 추정, 인용을 붙여 답하는 도우미가 함께 있습니다. 계정과 결제는 없습니다. 케이스스터디에는 틀렸다가 고친 일을 기록했고, 첫 번째가 순환이었던 0.99 R²입니다.',
        links: [
          { label: 'airlens.cloud ↗', url: AIRLENS },
          { label: 'GitHub (web) ↗', url: AIRLENS_WEB_REPO },
          { label: 'GitHub (data) ↗', url: AIRLENS_DATA_REPO },
        ],
        caseLabel: '케이스스터디 →',
        caseHref: '/projects/airlens',
        subsystems: [
          {
            eyebrow: 'LEAKAGE',
            title: '순환이었던 정확도 수치',
            value: 'R² 0.99',
            desc: '위성 특성 병합이 조용히 실패해 학습 행에 정답에서 계산한 값이 들어가 있던 것을 찾아 병합을 고침',
            href: '/projects/airlens#r2',
          },
          {
            eyebrow: 'EVALUATION',
            title: '예측구간 포함률 점검',
            value: '93% → 14%',
            desc: '관측소 제외 교차검증에서 80% 구간은 전체의 93%를 담았지만 150 µg/m³ 이상에서는 14%만 담았습니다. 구간은 이후 재학습 없이 재보정했고 부족분은 계속 보고합니다.',
            href: '/projects/airlens#coverage',
          },
          {
            eyebrow: 'DATA QUALITY',
            title: '오래된 관측소 필터',
            value: '88 / 581',
            desc: '일주일 이상 된 값을 현재값으로 내보내던 관측소를 기록 나이 필터가 걸러 내고 목록으로 남김',
            href: '/projects/airlens#stale',
          },
          {
            eyebrow: 'CAUSAL INFERENCE',
            title: 'SDID 정책 효과 추정',
            value: '119개국',
            desc: '지상 관측으로 보정한 단일 출처 패널 · 119개국 중 88개국 추정 가능',
            href: '/projects/airlens#causal',
          },
          {
            eyebrow: 'FORECASTING',
            title: 'TimesFM 도시 예보',
            value: '1 · 6 · 24 h',
            desc: '세 지평선의 예보마다 conformal 구간을 붙임',
            href: '/projects/airlens',
          },
          {
            eyebrow: 'ASSISTANT',
            title: '인용을 붙여 답하는 도우미',
            value: 'Workers AI',
            desc: '공개 데이터에서 인용을 붙여 답하고 가드레일과 호출자별 한도를 거침 · 일일 예산이 바닥나면 검색 전용 응답',
            href: AIRLENS_WEB_REPO,
          },
        ],
      },
      cards: [
        {
          name: 'Agent',
          tag: '멀티런타임 거버넌스 하네스 · MIT OSS',
          blurb:
            'AI 에이전트와 일하며 같은 일이 반복됐습니다. 계획 없이 바로 수정하고, 검증 없이 완료라고 말하고, 시크릿 파일에 접근하려 했고, 같은 규칙을 런타임 세 곳에 복제해야 했습니다. 하나의 정책 코어에 Claude Code · Codex · Antigravity용 어댑터와 27개 hook을 붙였습니다. 위험 경로 파일이 든 커밋은 다른 회사 AI의 검토가 같은 내용에 묶여 있어야 저장되고, 리뷰어 에이전트는 읽기 전용입니다. 세션 기록을 감사해 시크릿 가드 차단 27건 중 25건이 오탐임을 찾아 실제 읽기만 막도록 다시 만들었습니다. MIT, 참고용 공개.',
          chips: ['Policy-as-Code', '27 hooks', 'gitleaks', 'MIT OSS', 'Claude Code · Codex · Antigravity'],
          links: [{ label: 'GitHub ↗', url: `${GITHUB}/Agent` }],
          caseHref: '/projects/agent',
        },
        {
          name: 'Second Brain',
          tag: '타입드 지식 그래프 · 린트 게이트 · 3D 시각화',
          blurb: 'AI와 일하며 얻은 판단이 세션마다 사라지고 노트는 검색도 검증도 안 됐습니다. 스키마와 증류 규칙을 설계하고, 백링크 대신 typed edge 10종과 캡처/증류 분리를 택했습니다. 원자 노트 268 · edge 890 · lint 0을 유지하며, 이 포트폴리오의 결정 기록 대부분이 여기서 나왔습니다.',
          chips: ['LLM Wiki', 'typed edges', 'gitleaks 커밋 차단 훅', 'Three.js'],
          links: [],
          caseHref: '/projects/brain',
        },
        {
          name: '반려견 전장유전체 분석 파이프라인 · 반려동물 바이오 기업 협력 프로젝트',
          tag: '반려견 전장유전체 파이프라인 · AI 에이전트 협업 · 산업 연계',
          blurb: '개에는 병원성 정답셋이 없고 원시 데이터는 받은 환경 밖으로 나갈 수 없었습니다. 문제 정의부터 보고서까지 실무는 혼자 맡았고, 스크립트 대부분은 AI 코딩 에이전트가 썼습니다. 계산과 로컬 LLM 서술 단계를 분리하고, 정확도 대신 도구 간 불일치를 재며, 지표를 결과를 보기 전에 계약 파일에 고정했습니다. 방법만 공개하고 결과 수치는 싣지 않습니다.',
          chips: ['bcftools · freebayes', 'VEP · snpEff', 'llama.cpp'],
          links: [],
          caseHref: '/projects/canine-wgs',
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
      lead: '노트북 데모가 아니라, 라이브 서비스의 추정과 예보에 쓰고 직접 감사한 방법론입니다.',
      rows: [
        {
          method: 'SDID 합성 이중차분',
          where: '지상 보정 단일 출처 패널에서 정책 효과 추정 · 119개국 재추정, 추정 가능 88개국',
          evidence: { label: 'CASE', url: '/projects/airlens#causal' },
        },
        {
          method: 'XGBoost + LightGBM 분위수 블렌드',
          where: '관측소 관측에 맞춘 PM2.5 nowcast · 추정마다 p10 / p50 / p90',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'GTWR',
          where: 'nowcast의 중앙값에 얹은 지리·시간 가중 회귀',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'Conformalized quantile regression (Mondrian CQR)',
          where: '재학습 없이 구간 재보정 · 고농도 구간의 남은 부족분은 계속 보고',
          evidence: { label: 'CASE', url: '/projects/airlens#coverage' },
        },
        {
          method: 'TimesFM + conformal 구간',
          where: '1 · 6 · 24시간 도시 예보, 예보마다 conformal 구간',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'DQSS · A~F 신뢰 등급',
          where: '규칙 기반 데이터 품질 점수(5개 구성요소)와 추정마다 붙는 신뢰 등급',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'Leave-station-out 교차검증',
          where: '관측소 484곳을 떼어 놓고 집계가 숨기는 것을 확인 · 전체 포함률 93%, 150 µg/m³ 이상 14%',
          evidence: { label: 'CASE', url: '/projects/airlens#coverage' },
        },
      ],
      note: 'Healthcare Data Science 융합전공 위에서, 프로덕션 데이터로 방법론을 검증합니다.',
    },
    timeline: {
      heading: '여정 · 경험의 기록',
      lead: '기획에서 시작해 "구현의 책임"으로 옮겨온 궤적입니다. 모든 항목은 증빙 문서·커밋·수료증으로 역추적됩니다.',
      items: [
        {
          period: '2026.03 ~ 현재',
          kind: 'build',
          kindLabel: 'PRODUCT · OSS',
          title: 'AirLens 제품 개발 · Agent 하네스',
          role: '1인 책임 · AI 에이전트 협업',
          body: '학부 캡스톤(대기질·공중보건 연구)을 키 없는 공개 API를 갖춘 대기질 웹 서비스 AirLens로 키웠습니다. 관측소 관측에 맞춘 nowcast 격자, 도시 예보, 정책 효과 추정, 공개 데이터를 인용하는 도우미를 공개 Hugging Face 데이터셋 위에서 Cloudflare로 서빙합니다. 문제 정의, 평가 설계, 릴리스 판단과 모든 머지 승인은 제가 맡고, 구현은 이 통제 안에서 AI 에이전트가 대부분 씁니다.',
          bullets: [
            'PM2.5 추정마다 p10 · p50 · p90 구간과 A~F 신뢰 등급 · 키 없는 읽기 전용 API와 MCP 서버',
            '순환이었던 R² 0.99(정답에서 계산한 특성)를 찾아 고침 · 관측소 581개 중 88개가 내보내던 오래된 값을 필터로 차단',
            '지상 보정 패널에서 119개국 정책 효과 재추정(추정 가능 88개국)',
            '매일 쓰는 거버넌스 하네스 Agent · Claude Code · Codex · Antigravity 27 hooks · 위험 경로 커밋에 다른 회사 AI 검토 게이트 · 시크릿 가드 차단 27건 중 25건이 오탐임을 찾아 다시 만듦',
          ],
          tags: ['Cloudflare Workers', 'Hugging Face', 'GitHub Actions', 'React 19', 'Three.js', 'XGBoost · LightGBM', 'TimesFM'],
          link: { label: 'airlens.cloud ↗', url: AIRLENS },
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
      ],
      edu: '학력, <b>강릉원주대학교 · 헬스케어 데이터사이언스 융합전공</b> (주전공 산업경영공학)',
      thesis: '졸업논문 「미세먼지 저감 정책의 효과 분석: 중국과 한국의 비교 분석」, AirLens의 출발점',
    },
    fieldNotes: {
      heading: '실측으로 배운 것',
      lead: '직접 측정해 파일로 남긴 교훈입니다. 좋은 숫자만이 아니라, 판정을 뒤집은 숫자와 너무 좋아서 먼저 의심한 숫자도 함께 기록합니다.',
      items: [
        {
          metric: '65.6%',
          metricLabel: '가이드라인 충실도 · 게이트 80% 미달 (운영에 반영하지 않은 실험)',
          title: '통과 지표를 잘못 고르면 불량이 그대로 통과한다',
          body: 'LLM 조언 생성물 게이트에서 금지어 0% · 페르소나 일관성 98% 이상 · 파싱 실패 0%는 전부 통과였습니다. LLM judge로 "실제 가이드라인 충실도"를 재는 지표를 추가하자 69.2%로 기준 80%에 못 미쳐 전체 판정이 FAIL로 뒤집혔고, 프롬프트 보강(66.2%)과 재학습(65.6%, 다른 평가셋)으로도 기준을 넘지 못했습니다.',
          tone: 'alert',
        },
        {
          metric: '93% → 14%',
          metricLabel: '80% 구간 포함률 · 전체 → 150 µg/m³ 이상',
          title: '총계는 위험 구간을 가린다',
          body: '관측소 단위 leave-station-out 교차검증(484개 관측소)에서 PM2.5 80% 예측구간은 전체 관측의 93%를 담았지만 150 µg/m³ 이상 구간에서는 14%만 담았습니다. 구간별 수치를 파일에 커밋해, 총계 하나로 판단하지 않도록 했습니다.',
          tone: 'alert',
        },
        {
          metric: '0.99 R²',
          metricLabel: '순환 · 특성이 정답에서 계산됨',
          title: '좋은 숫자는 먼저 의심한다',
          body: '모델 레지스트리의 R²가 0.99였습니다. 위성 특성 병합이 열 이름 불일치로 조용히 실패해, 모든 학습 행의 AOD 특성이 정답에서 계산한 값으로 채워져 있었습니다. 병합을 고쳐 순환을 없앴습니다(2026-07-11).',
          tone: 'alert',
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
        { date: '2026-03', title: 'AirLens · 첫 커밋부터 AI-native', body: 'Claude Code를 주 구현자로 두고 시작했습니다.' },
        { date: '2026-04 → 05', title: 'Agent 하네스 분리 · 공개', body: 'AirLens 안에서 자란 훅·정책을 벤더 중립 하네스로 추출했습니다. 지금은 Claude Code · Codex · Antigravity를 하나의 정책 코어로 통제하며, MIT로 참고용 공개했습니다.' },
        { date: '2026-05', title: '멀티에이전트 규율 · 시크릿 다층 방어', body: '같은 위험 영역을 AI 세션 둘이 동시에 건드리지 못하게 하는 락 파일(mutex)을 두고 여러 에이전트를 함께 돌렸습니다. 시크릿은 pre-commit → 명령 패턴 → content scan → pre-push → CI로 층을 쌓았고, 사용자가 직접 명령한 작업은 deny → ask로 격상했습니다.' },
        { date: '2026-05', title: '사용량을 재기 시작 · 디스패치·차단·계획 위험도를 데이터로', body: '라우팅·계획 위험도·차단 이벤트를 JSONL 기록으로 남기고 digest 스크립트로 집계했습니다. 무엇을 AI에 시키고 무엇이 막혔는지가 데이터가 됐습니다.' },
        { date: '2026-06', title: '기술 회고 · AI가 반복적으로 틀린 것을 규칙으로', body: '기록 안 보고 추측 · 검증 없이 완료 단정 · 한 조각만 보고 판단 · 엉뚱한 전문가 호출… 각 실패에 대응하는 룰과 훅(memory-discipline, Stop 품질 게이트, DB ground-truth 검증)을 만들었습니다.' },
        { date: '2026-06', title: 'Second Brain · 세션을 증류하는 시스템', body: '캡처(기계)와 증류(LLM)를 분리하고, 5게이트를 통과한 것만 원자 노트로 승격. 268노드 · 890 typed edge · lint 0. 프로젝트 볼트는 내재화하되 병합하지 않습니다.' },
        { date: '2026-07', title: '거버넌스 실측 검증 · 시크릿 게이트 사고', body: 'AirLens 당시 감독 훅이 고위험 변경을 실제로 막은(permissionDecision: deny) 기록을 로그로 확인. 같은 달, 훅 없이 설정 파일만 있던 볼트에서 .env 유출을 발견하고, 스캐너가 없으면 커밋을 막는 게이트로 바꿨습니다.' },
        { date: '2026-08', title: '자기 사용 전수 감사', body: '결정적 스크립트로 전처리 → 집계본만 에이전트에 → 참조 벤치마크와 대조하고, 초기 발견은 적용 직전 재검증에서 정정했습니다. 개선은 같은 세션에서 적용.' },
        { date: '2026-09', title: '"토큰 절약 도구" 지형 스캔', body: '판별 질문은 하나 · 컨텍스트에 들어오는 양을 줄이는가, 내가 하는 일을 정리해 줄 뿐인가. 실재하는 메커니즘은 몇 가지로 수렴(정밀 표현 치환 / 다른 컨텍스트로 밀어내기 / 덤프 대신 큐레이션 반환).' },
      ],
      thesesLabel: '이 기록에서 굳어진 주장',
      theses: [
        'AI를 얹지 마라, 워크플로우를 갈아엎어라',
        '성숙한 하네스의 병목은 인프라 추가가 아니라 기존 규칙의 집행이다',
        '완료는 자기승인이 아니라 신선-컨텍스트 적대 검증으로 확정한다',
        '게이트는 에이전트를 늦추는 과속방지턱이지, 경계가 아니다',
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
        'AI-native engineer who ships to production. Directs AI agents to build, and single-handedly operates, AirLens (a live air-quality web service with a keyless public API) and Agent (a governance harness for AI coding agents).',
    },
    nav: { board: 'Observatory', work: 'Work', depth: 'DS Depth', timeline: 'Experience', research: 'Research', contact: 'Contact' },
    hero: {
      role: 'AI Agent · Infrastructure Engineer · Yongmin Cho',
      headline: { before: 'AI-native engineer who ships to ', em: 'production', after: '' },
      sub: 'Planning → model → infra → deploy → operations, end to end, directing a team of AI agents. Most code is AI-written; direction, verification, and operational responsibility are mine.',
      live: { label: 'LIVE · airlens.cloud', url: AIRLENS },
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
          value: 'A to F',
          unit: 'confidence grade',
          label: 'Every PM2.5 estimate carries p10 · p50 · p90 and a grade · Cloudflare Workers over a public Hugging Face dataset · batch jobs on GitHub Actions hosted runners',
          span: 8,
          evidence: { label: 'AirLens web repo', url: AIRLENS_WEB_REPO },
        },
        {
          eyebrow: 'GOVERNANCE',
          value: '25',
          unit: '/ 27 false positives',
          label: 'secret-guard denials that turned out to be false positives in my session logs · the guard was rebuilt to block only real reads',
          span: 4,
          evidence: { label: 'Agent harness', url: `${GITHUB}/Agent` },
        },
        {
          eyebrow: 'DATA QUALITY',
          value: '88',
          unit: '/ 581 stations',
          label: 'were serving readings a week or more old as current · a record-age filter now drops them and lists the exclusions',
          span: 4,
          evidence: { label: 'Case study', url: '/en/projects/airlens#stale' },
        },
        {
          eyebrow: 'CAUSAL PANEL',
          value: '119',
          unit: 'countries re-estimated',
          tone: 'ok',
          label: 'policy effects re-estimated on a single-source panel calibrated to ground observations · 88 estimable',
          span: 4,
          evidence: { label: 'Case study', url: '/en/projects/airlens#causal' },
        },
        {
          eyebrow: 'RUNTIMES',
          value: '27',
          unit: 'hooks',
          label: 'Claude Code · Codex · Antigravity under one policy core · risk-area commits need a review from another vendor’s AI',
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
        tag: 'Air-quality web service · keyless public API · built with AI agents · one owner, operated solo · LIVE',
        blurb:
          'Analysing policy effects for my thesis, I found station, weather and satellite data scattered, and most air-quality services silent on how far an estimate can be trusted. I own problem definition, data-source selection, evaluation design, architecture, release decisions, monitoring and incident response, and I approve every merge; AI agents write most of the implementation inside those controls. Every PM2.5 estimate carries a p10 to p90 interval and an A to F confidence grade, beside city forecasts, policy-effect estimates and an assistant that answers with citations. There are no accounts and no payments. The case study logs what turned out wrong and how I fixed it, starting with a 0.99 R² that was circular.',
        links: [
          { label: 'airlens.cloud ↗', url: AIRLENS },
          { label: 'GitHub (web) ↗', url: AIRLENS_WEB_REPO },
          { label: 'GitHub (data) ↗', url: AIRLENS_DATA_REPO },
        ],
        caseLabel: 'Case study →',
        caseHref: '/en/projects/airlens',
        subsystems: [
          {
            eyebrow: 'LEAKAGE',
            title: 'An accuracy score that was circular',
            value: 'R² 0.99',
            desc: 'A silent satellite-feature merge failure filled training rows with values computed from the target; found it and fixed the merge',
            href: '/en/projects/airlens#r2',
          },
          {
            eyebrow: 'EVALUATION',
            title: 'Interval coverage audit',
            value: '93% → 14%',
            desc: 'In leave-station-out cross-validation, 80% intervals covered 93% overall but only 14% at 150 µg/m³ or more. The intervals were later recalibrated without retraining, and the shortfall is still reported.',
            href: '/en/projects/airlens#coverage',
          },
          {
            eyebrow: 'DATA QUALITY',
            title: 'Stale-station filter',
            value: '88 / 581',
            desc: 'Stations serving week-old readings as current are now dropped by a record-age filter and listed',
            href: '/en/projects/airlens#stale',
          },
          {
            eyebrow: 'CAUSAL INFERENCE',
            title: 'SDID policy-impact estimates',
            value: '119 countries',
            desc: 'Single-source panel calibrated to ground observations; 88 of the 119 are estimable',
            href: '/en/projects/airlens#causal',
          },
          {
            eyebrow: 'FORECASTING',
            title: 'TimesFM city forecasts',
            value: '1 · 6 · 24 h',
            desc: 'Three forecast horizons, each with a conformal band',
            href: '/en/projects/airlens',
          },
          {
            eyebrow: 'ASSISTANT',
            title: 'Assistant that answers with citations',
            value: 'Workers AI',
            desc: 'Answers from public data with citations, behind guardrails and per-caller limits; retrieval-only fallback when the daily budget is spent',
            href: AIRLENS_WEB_REPO,
          },
        ],
      },
      cards: [
        {
          name: 'Agent',
          tag: 'Multi-runtime governance harness · MIT OSS',
          blurb:
            'Working with AI agents, the same things kept recurring: editing without a plan, claiming completion without verification, reaching for secret files, and the same rules duplicated across three runtimes. I designed one policy core with native adapters for Claude Code, Codex and Antigravity and 27 hooks. A commit that stages risk-area files is blocked until a review by another vendor’s AI is bound to the exact staged content, and the reviewer agents are read-only. When my session logs showed that 25 of 27 secret-guard denials were false positives, I rebuilt the check to block only real reads. MIT licensed, published as a reference.',
          chips: ['Policy-as-Code', '27 hooks', 'gitleaks', 'MIT OSS', 'Claude Code · Codex · Antigravity'],
          links: [{ label: 'GitHub ↗', url: `${GITHUB}/Agent` }],
          caseHref: '/en/projects/agent',
        },
        {
          name: 'Second Brain',
          tag: 'Typed knowledge graph · lint gates · 3D view',
          blurb: 'Judgements from AI work vanished each session and notes could be neither searched with intent nor verified. I designed the schema and distillation rules, choosing ten typed edge types over backlinks and separating capture from distillation. 268 atomic notes · 890 edges · lint 0, maintained; most decision logs on this portfolio came out of it.',
          chips: ['LLM Wiki', 'typed edges', 'gitleaks commit-blocking hook', 'Three.js'],
          links: [],
          caseHref: '/en/projects/brain',
        },
        {
          name: 'Canine Whole-Genome Analysis Pipeline · Industry Project with a Pet-Bio Company',
          tag: 'Dog whole-genome pipeline · built with AI agents · industry project',
          blurb: 'Dogs have no pathogenicity truth set, and the raw data could not leave the environment it arrived in. I did the hands-on work alone, from problem definition to report, and AI coding agents wrote most of the scripts. I kept computation apart from a local-LLM narration stage, measured disagreement between tools instead of accuracy, and froze the metrics in a contract before any result was seen. Method only; no result numbers are published.',
          chips: ['bcftools · freebayes', 'VEP · snpEff', 'llama.cpp'],
          links: [],
          caseHref: '/en/projects/canine-wgs',
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
      lead: 'Not notebook demos: methods I used and audited inside a live service.',
      rows: [
        {
          method: 'Synthetic DiD (SDID)',
          where: 'Policy-impact estimates from a single-source panel calibrated to ground observations · 119 countries re-estimated, 88 estimable',
          evidence: { label: 'CASE', url: '/en/projects/airlens#causal' },
        },
        {
          method: 'XGBoost + LightGBM quantile blend',
          where: 'PM2.5 nowcast conditioned on station observations · p10 / p50 / p90 per estimate',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'GTWR',
          where: 'Geographically and temporally weighted regression on the median of the nowcast',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'Conformalized quantile regression (Mondrian CQR)',
          where: 'Intervals recalibrated without retraining · the remaining high-concentration shortfall is still reported',
          evidence: { label: 'CASE', url: '/en/projects/airlens#coverage' },
        },
        {
          method: 'TimesFM + conformal bands',
          where: 'City forecasts at 1, 6 and 24 hours, each with a conformal band',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'DQSS · A to F confidence grade',
          where: 'Rule-based data-quality score (5 components) and a confidence grade beside every estimate',
          evidence: { label: 'LIVE', url: AIRLENS },
        },
        {
          method: 'Leave-station-out cross-validation',
          where: 'Held-out stations (484) expose what an aggregate hides: 93% coverage overall, 14% at 150 µg/m³ or more',
          evidence: { label: 'CASE', url: '/en/projects/airlens#coverage' },
        },
      ],
      note: 'Grounded in an interdisciplinary major in Healthcare Data Science, validated on production data.',
    },
    timeline: {
      heading: 'Journey · a record of experience',
      lead: 'From planning to owning the build. Every entry traces back to a document, a commit, or a certificate on file.',
      items: [
        {
          period: '2026.03 ~ Present',
          kind: 'build',
          kindLabel: 'PRODUCT · OSS',
          title: 'AirLens product development · Agent harness',
          role: 'One owner · AI-agent collaboration',
          body: 'Grew an undergraduate capstone (air quality × public health) into AirLens, a live air-quality web service with a keyless public API: a nowcast grid conditioned on station observations, city forecasts, policy-effect estimates and an assistant that cites public data, running on Cloudflare over a public Hugging Face dataset. I own problem definition, evaluation design, release decisions and every merge approval; AI agents write most of the implementation inside those controls.',
          bullets: [
            'Every PM2.5 estimate carries a p10 · p50 · p90 interval and an A to F confidence grade · keyless read-only API and MCP server',
            'Found a circular 0.99 R² (a feature computed from the target) and fixed it · 88 of 581 stations were serving stale readings, now filtered',
            'Policy effects re-estimated for 119 countries on a ground-calibrated panel (88 estimable)',
            'Agent, the governance harness I run daily: 27 hooks across Claude Code, Codex and Antigravity · cross-vendor review gate for risk-area commits · 25 of 27 secret-guard denials found to be false positives and the guard rebuilt',
          ],
          tags: ['Cloudflare Workers', 'Hugging Face', 'GitHub Actions', 'React 19', 'Three.js', 'XGBoost · LightGBM', 'TimesFM'],
          link: { label: 'airlens.cloud ↗', url: AIRLENS },
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
      ],
      edu: 'Education, <b>Gangneung-Wonju National University · Healthcare Data Science (Interdisciplinary Major)</b> (Major: Industrial Engineering)',
      thesis: 'Thesis: “Effectiveness of Fine-Dust Reduction Policies: A Comparative Analysis of China and Korea”, the seed of AirLens',
    },
    fieldNotes: {
      heading: 'What measuring taught me',
      lead: 'Lessons I measured myself and committed to files, not only the good numbers, but the number that flipped a verdict and the number that was too good to be true.',
      items: [
        {
          metric: '65.6%',
          metricLabel: 'guideline fidelity · below the 80% gate (experiment never put into operation)',
          title: 'Pick the wrong pass metric and defects walk through',
          body: 'The LLM advice-generation gate passed on banned-word rate 0%, persona consistency 98% or higher and parse failures 0%. Adding an LLM-judge metric for actual guideline fidelity returned 69.2%, below the 80% gate, and flipped the whole verdict to FAIL; neither a prompt revision (66.2%) nor retraining (65.6%, on a different evaluation set) cleared the gate.',
          tone: 'alert',
        },
        {
          metric: '93% → 14%',
          metricLabel: '80% interval coverage · overall → 150 µg/m³ or more',
          title: 'Aggregates hide the dangerous band',
          body: 'In leave-station-out cross-validation across 484 stations, 80% prediction intervals covered 93% of observations overall but only 14% at PM2.5 of 150 µg/m³ or more. The per-band numbers went into a committed file so no single total could stand in for them.',
          tone: 'alert',
        },
        {
          metric: '0.99 R²',
          metricLabel: 'circular · a feature was computed from the target',
          title: 'Distrust a good number first',
          body: 'The model registry showed an R² of 0.99. A satellite-feature merge had failed silently because of a column-name mismatch, and every training row’s AOD feature was filled with a value computed from the target. Fixing the merge removed the circularity (2026-07-11).',
          tone: 'alert',
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
        { date: '2026-03', title: 'AirLens · AI-native from the first commit', body: 'Claude Code as the primary implementer from day one.' },
        { date: '2026-04 → 05', title: 'Agent harness extracted and published', body: 'Hooks and policies that grew inside AirLens were extracted into a vendor-neutral harness. It now runs Claude Code, Codex and Antigravity under one policy core, MIT licensed and published as a reference.' },
        { date: '2026-05', title: 'Multi-agent discipline · layered secret defence', body: 'A lock file (mutex) kept two AI sessions from touching the same risky area at once while several agents ran together. Secrets were defended in layers (pre-commit → command patterns → content scan → pre-push → CI), and user-commanded operations were escalated from deny to ask.' },
        { date: '2026-05', title: 'Started measuring usage · dispatches, blocks and plan risk as data', body: 'Routing, plan-risk classification and block events were logged as JSONL and summarized by a digest script. What I delegate to AI, and what gets blocked, became data.' },
        { date: '2026-06', title: 'Technical retrospective · recurring AI failures turned into rules', body: 'Guessing instead of reading the record · declaring done without verifying · judging from one fragment · calling the wrong specialist… each failure got a matching rule or hook (memory-discipline, Stop quality gate, DB ground-truth checks).' },
        { date: '2026-06', title: 'Second Brain · a system that distils sessions', body: 'Capture (machine) and distillation (LLM) split; only items passing five gates become atomic notes. 268 nodes · 890 typed edges · lint 0. Project vaults are internalised but never merged.' },
        { date: '2026-07', title: 'Governance verified in the logs · the secret-gate incident', body: 'Confirmed in the logs that the AirLens-era supervisor hook actually blocked high-risk changes (permissionDecision: deny). The same month a vault with a config file but no hook leaked a .env, and I switched to gates that block the commit when the scanner is missing.' },
        { date: '2026-08', title: 'Full audit of my own usage', body: 'Deterministic pre-processing → only aggregates to the agent → compared against reference benchmarks, with early findings re-verified and corrected before anything was applied. The improvements were applied in the same session.' },
        { date: '2026-09', title: 'Scanned the “token-saving” tool landscape', body: 'One diagnostic question: does it reduce what enters the context, or merely organise what I do? The real mechanisms reduce to a few (precise substitution / pushing work into another context / returning curation instead of dumps).' },
      ],
      thesesLabel: 'Positions this record hardened into',
      theses: [
        'Don’t bolt AI on · redesign the workflow',
        'A mature harness is bottlenecked by enforcement of existing rules, not by more infrastructure',
        '“Done” is confirmed by fresh-context adversarial review, never by self-approval',
        'A gate is a speed bump against an agent, not a boundary',
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
      decisions: '결정 기록, 왜 이쪽을 골랐나',
      decisionsLead: '갈림길마다 무엇을 버렸는지 함께 적었습니다. 각 행은 변경 기록, PR, 회고 문서로 역추적됩니다.',
      over: '대신',
      status: '상태',
      frame: { heading: '한 문단 요약 · 문제 → 역할 → 과정 → 결과', problem: '문제', role: '역할', process: '과정', result: '결과', whyAI: '왜 AI였나' },
    },
    items: {
      airlens: {
        name: 'AirLens',
        tagline: '대기질 웹 서비스 · 키 없는 공개 API · AI 에이전트 협업 · 1인 책임·운영 · 라이브',
        status: 'LIVE · airlens.cloud · 2026.03 ~ 현재 (캡스톤 2023 ~ 24 → 제품 2026)',
        overview:
          'AirLens는 airlens.cloud에서 운영하는 무료 대기질 웹 서비스입니다. 관측소 관측값에 맞춰 추정한 PM2.5 nowcast 격자, 1 · 6 · 24시간 도시 예보, 정책 효과 추정, 공개 데이터에서 인용을 붙여 답하는 도우미를 보여 주고, 키 없이 쓰는 읽기 전용 공개 API와 MCP 서버도 함께 제공합니다. 계정과 결제는 없습니다. 문제 정의, 평가 설계, 릴리스 판단과 모든 머지 승인은 제가 맡고, 구현은 이 통제 안에서 AI 에이전트가 대부분 쓰는 방식으로 혼자 책임지고 운영합니다. 아래는 실제로 틀렸다가 고친 네 가지 사례와 지금의 구조입니다.',
        frame: {
          problem: '학부 논문에서 대기질 정책 효과를 분석하며, 관측소·기상·위성 데이터가 흩어져 있고 대부분의 대기질 서비스가 추정값을 얼마나 믿을 수 있는지 보여 주지 않는다는 문제를 봤습니다.',
          role: '문제 정의, 데이터 출처 선정, 평가 설계, 아키텍처, 릴리스 판단, 모니터링, 장애 대응을 혼자 맡았습니다. 모든 머지는 제가 승인했고, 구현은 이 통제 안에서 AI 에이전트가 대부분 썼습니다.',
          process: '관측소 관측값에 맞춰 PM2.5 nowcast 격자를 추정합니다(XGBoost · LightGBM 분위수 블렌드, 중앙값에 GTWR, Mondrian CQR로 구간 재보정). 추정마다 p10 · p50 · p90과 A~F 신뢰 등급을 붙이고, 도시 예보(TimesFM)에는 conformal 구간을 붙입니다. 정책 효과는 출처가 섞인 패널을 단일 출처로 다시 만들고 지상 관측으로 보정해 SDID로 추정했습니다.',
          result: '화면, API, 도우미는 Cloudflare에서 돌고, 데이터는 공개 Hugging Face 데이터셋을 거치며, 수집·추론 잡은 GitHub Actions에서 돕니다. 이 과정에서 0.99 R²가 순환이었음을 찾아 고쳤고(2026-07-11), 관측소 581개 중 88개가 일주일 이상 된 값을 현재값으로 내보내던 것을 기록 나이 필터로 막았으며(2026-09-04), 80% 예측구간이 전체 관측의 93%를 담지만 150 µg/m³ 이상에서는 14%만 담는다는 것을 교차검증으로 확인했습니다(2026-08-02).',
          whyAI: '미리 만든 차트로는 "이번 주 서울은 왜 나빴나" 같은 자연어 질문에 답할 수 없어 도우미를 넣었습니다. 도우미는 공개 데이터를 검색해 인용을 붙여 답하고, 가드레일과 호출자별 한도 안에서 움직입니다. 추정과 예보 숫자는 통계·ML 모델이 냅니다.',
        },
        attribution: [
          {
            label: '내가 한 일',
            body: '문제 정의 · 데이터 출처 선정 · 평가 설계 · 아키텍처 · 릴리스 판단 · 모니터링 · 장애 대응.',
          },
          {
            label: 'AI 에이전트가 한 일',
            body: '구현 코드의 대부분을 AI 에이전트가 썼습니다. 그 구현을 점검하는 평가 설계는 제 몫이고, 0.99 R²가 순환임을 찾은 것과 관측소 581개 중 88개의 오래된 값을 걸러 낸 것도 그 점검의 결과입니다.',
          },
          {
            label: '내가 책임진 것',
            body: '모든 머지 승인과 릴리스 판단, 운영 중에 벌어지는 일의 최종 책임.',
          },
        ],
        metrics: [
          { value: '119', label: '정책 효과를 재추정한 국가 (추정 가능 88)' },
          { value: '88 / 581', label: '오래된 값을 내보내던 관측소' },
          { value: '93% → 14%', label: '80% 구간 포함률 · 전체 → 150 µg/m³ 이상' },
          { value: '1 · 6 · 24 h', label: 'TimesFM 도시 예보 (conformal 구간)' },
          { value: 'A~F', label: 'p10 · p50 · p90 구간과 함께 붙는 신뢰 등급' },
        ],
        timeline: [
          { date: '2026-03', label: '개발 시작' },
          { date: '2026-06-20', label: '인과 패널 재구축 시작 · 출처 혼합 제거' },
          { date: '2026-07-11', label: '레지스트리 R² 0.99가 순환이었음을 발견하고 병합 수정' },
          { date: '2026-08-02', label: '관측소 제외 교차검증으로 구간 포함률 점검 · 구간별로 쪼개 파일에 기록' },
          { date: '2026-08-10', label: '배포 모델의 구간을 재학습 없이 재보정 · 남은 부족분은 계속 보고' },
          { date: '2026-08-26', label: '이 시점까지 경도 버그 수정 · 지상 보정 패널에서 119개국 재추정(추정 가능 88개국)' },
          { date: '2026-09-04', label: '581개 관측소 중 88개의 오래된 값 발견 · 기록 나이 필터' },
          { date: '2026-09-05', label: '관계형 데이터베이스 은퇴 (코드는 2026-10-15 삭제)' },
          { date: '2026-10-10', label: 'airlens-data 저장소 공개' },
          { date: '2026-10-19', label: '자체 운영 러너 제거 · 수집·추론은 GitHub Actions 호스티드 러너로' },
        ],
        sections: [
          {
            id: 'r2',
            title: '0.99 R²가 순환이었던 문제 (정답 누수)',
            hard:
              '모델 레지스트리에 기록된 R² 0.99는 지나치게 좋은 숫자였습니다. 추적해 보니 위성 특성 병합이 열 이름 불일치로 조용히 실패했고, 그 결과 모든 학습 행의 AOD 특성이 정답에서 계산한 값으로 채워져 있었습니다. 모델이 정답을 보고 정답을 맞히고 있었으니 0.99는 순환이었습니다.',
            solution:
              '조용히 실패하던 병합을 고쳐 정답에서 계산한 값이 특성에 들어가지 않게 했습니다(2026-07-11).',
            tech: ['누수·순환 점검', '모델 레지스트리', '위성 특성(AOD) 병합 수정'],
            lesson:
              '좋은 숫자는 먼저 의심합니다. 0.99는 모델이 뛰어나서가 아니라 측정이 틀려서 나온 숫자였습니다. 특성이 정답에서 계산된 것은 아닌지, 병합이 조용히 실패하지 않았는지부터 확인합니다.',
          },
          {
            id: 'coverage',
            title: '집계 지표가 가린 실패 (예측구간 포함률)',
            hard:
              '관측소 제외 교차검증(484개 관측소)에서 PM2.5 80% 예측구간은 전체 관측의 93%를 담았습니다. 그런데 PM2.5가 150 µg/m³ 이상인 구간만 보면 14%만 담았습니다. 평균은 좋아 보였지만, 가장 알고 싶은 나쁜 날에는 구간을 믿을 수 없었습니다.',
            solution:
              '구간별 포함률을 파일에 남겨 집계가 가리는 구간을 드러냈습니다(2026-08-02). 이어서 배포 모델의 구간을 재학습 없이 다시 보정했고(2026-08-10), 보정 뒤에도 남은 고농도 구간의 부족분은 계속 보고합니다.',
            tech: ['Leave-station-out 교차검증', 'Conformal 구간', 'Mondrian CQR'],
            lesson:
              '집계 지표 하나로 판단하지 않고 구간별로 쪼갭니다. 집계는 가장 중요한 구간의 실패를 숨길 수 있습니다.',
          },
          {
            id: 'stale',
            title: '일주일 이상 된 값을 현재값으로 내보내던 관측소',
            hard:
              '581개 관측소 중 88개가 최소 7일(길게는 2.5년) 지난 읽기값을 현재값으로 내보내고 있었습니다.',
            solution:
              '기록 나이 필터가 오래된 값을 걸러 내고 제외한 관측소의 목록을 남깁니다(2026-09-04). 신선도 점검(freshness probe)은 경고 이슈를 열고 닫으며, 제품 상태 파일은 3시간마다 갱신됩니다.',
            tech: ['기록 나이 필터', '신선도 점검', '경고 이슈 자동 개폐'],
            lesson:
              '값이 있다고 지금의 값은 아닙니다. 데이터의 나이를 입력의 일부로 다루고, 걸러 낸 것은 목록으로 남겨야 합니다.',
          },
          {
            id: 'causal',
            title: '정책 효과 추정의 데이터 함정 (SDID 인과 패널)',
            hard:
              '국가별 대기질 정책의 효과를 합성 이중차분(SDID)으로 추정하는 패널에서, 한 나라의 시계열 중간에 출처가 바뀌며 생긴 인공적인 점프를 정책 효과로 읽을 위험이 있었습니다. 점검해 보니 출처가 섞여 있었고, 한 출처에는 경도 버그(서반구 시계열)까지 있었습니다.',
            solution:
              '출처를 단일 소스로 통일해 패널을 다시 만들었고(2026-06), 한 출처의 경도 버그를 찾아 고친 뒤, 지상 관측으로 보정한 패널에서 정책 효과를 119개국에 대해 다시 추정했습니다(2026-08-26까지, 추정 가능 88개국). 결과는 배치로 계산해 둔 값이고, 갱신 워크플로는 지금 꺼 둔 상태입니다.',
            tech: ['합성 이중차분(SDID)', '단일 출처 패널', '지상 보정'],
            lesson:
              '모델이 그럴듯한 답을 내도 그것이 신호인지 데이터 아티팩트인지 먼저 의심해야 합니다. 119개국을 다시 추정했을 때 추정 가능한 나라는 88개국이었고, 나머지는 정책 효과로 읽지 않습니다.',
          },
        ],
        modernTech: [
          { name: 'XGBoost · LightGBM · GTWR', why: '관측소 관측값에 맞춰 PM2.5 nowcast 격자를 추정합니다. 분위수 모델 둘을 블렌드하고 중앙값에 지리·시간 가중 회귀(GTWR)를 얹었습니다.' },
          { name: 'Mondrian CQR', why: '구간을 conformalized quantile regression(Mondrian)으로 재학습 없이 다시 맞춥니다.' },
          { name: 'TimesFM + conformal 구간', why: '도시 예보를 1 · 6 · 24시간 지평선으로 내고 예보마다 conformal 구간을 붙입니다.' },
          { name: 'DQSS · 신뢰 등급', why: 'PM2.5 추정마다 p10 · p50 · p90 구간과 A~F 신뢰 등급이 붙고, 입력 데이터의 품질은 규칙 기반 점수(DQSS, 5개 구성요소)로 따로 매깁니다.' },
          { name: 'Workers AI · Vectorize 도우미', why: '임베딩과 Vectorize 검색으로 공개 데이터에서 인용을 붙여 답하고, 정규식 가드레일 · 익명 세션(Turnstile) · 호출자별 한도를 거칩니다. 일일 예산이 바닥나면 검색 전용 응답으로 내려갑니다.' },
          { name: 'MCP 서버 · 키 없는 공개 API', why: 'api.airlens.cloud/v1은 키 없이 읽기 전용으로 쓸 수 있고, 같은 데이터를 MCP 서버로도 제공합니다.' },
          { name: 'Hugging Face 데이터셋 · GitHub Actions', why: '공개 Hugging Face 데이터셋이 데이터 버스이고, 수집·추론 잡은 GitHub Actions 호스티드 러너에서 돕니다.' },
          { name: 'React 19 · Vite · Three.js', why: '프런트엔드는 React 19 · Vite · TypeScript, 3D 시각화는 Three.js(R3F), 상태 관리는 Zustand입니다.' },
        ],
        decisions: [
          {
            choice: '관측소 관측값에 맞춰 추정한 nowcast로 소개',
            over: '위성 추정 서비스처럼 소개하기',
            why: '위성 AOD는 지금 라이브 격자에서 가중치를 갖지 않고 기후값으로 대체됩니다. 쓰지 않는 입력을 쓴다고 광고하지 않기로 했고, 제품 설명도 관측소 관측에 맞춘 nowcast로 고쳤습니다.',
          },
          {
            choice: 'SDID 패널을 단일 출처로 재구축하고 지상 관측으로 보정',
            over: '여러 소스를 섞어 표본을 늘리기',
            why: '출처가 섞이면 출처별 편향이 차분에서 상쇄되지 않고 정책 효과처럼 읽힙니다. 단일 출처 패널로 다시 만든 뒤 한 출처의 경도 버그까지 고쳤고, 지상 보정 패널에서 119개국을 다시 추정했습니다(추정 가능 88개국).',
          },
          {
            choice: '계정과 결제 없는 무료 웹 + 키 없는 읽기 전용 API',
            over: '로그인과 구독 티어',
            why: '공기는 누구나 숨 쉬는 공익 문제라 접근에 장벽을 두지 않았습니다. 계정과 결제를 두지 않으면 1인 운영이 지는 권한 관리 부담도 줄어듭니다.',
          },
          {
            choice: '레포 3분리 + 관계형 DB 은퇴 → 공개 Hugging Face 데이터셋을 데이터 버스로',
            over: '단일 모노레포 + 관계형 DB 유지',
            why: '데이터·ML·웹의 경계가 흐려지며 배포 위험이 한 레포에 뒤섞였습니다. 사이트·API·도우미 Workers(airlens-web, 공개), 수집기·계약·발행·추론 잡(airlens-data, 2026-10-10 공개), 학습·평가·SDID(airlens-ml, 비공개)로 나누고, 관계형 DB는 2026-09-05에 은퇴시켰습니다(코드는 2026-10-15 삭제). 서비스 경로에는 관계형 DB가 없습니다.',
          },
        ],
        meta: {
          title: 'AirLens 케이스스터디 · 조용민',
          description: 'AirLens에서 찾은 순환 R² 0.99, 집계가 가린 구간 포함률(93% → 14%), 오래된 값을 내보내던 관측소 88곳, 정책 효과 재추정, 그리고 지금의 구조.',
        },
        links: [
          { label: 'airlens.cloud', url: AIRLENS },
          { label: 'GitHub (web)', url: AIRLENS_WEB_REPO },
          { label: 'GitHub (data)', url: AIRLENS_DATA_REPO },
        ],
      },
      agent: {
        name: 'Agent',
        tagline: '멀티런타임 에이전트 거버넌스 하네스 · Claude Code · Codex · Antigravity',
        status: 'MIT 오픈소스 · 개인 하네스를 참고용으로 공개 · 공개 저장소 2026-10-22 기준 · 다른 환경에서는 검증하지 않았고 강제력은 Claude Code에서 가장 강합니다',
        overview:
          'Agent는 Claude Code · Codex · Antigravity 세 AI 코딩 런타임을 하나의 정책 코어와 27개 hook으로 다루는 거버넌스 하네스입니다. 제가 매일 쓰는 설정을 MIT 라이선스로 참고용으로 공개한 것이고, 다른 환경에서 시험한 적은 없습니다. 읽기 전용 리뷰어 에이전트, 위험 경로 커밋에 걸리는 다른 회사 AI의 검토 게이트, 계획서 검사를 한곳에서 관리합니다. 가장 까다로웠던 네 가지 문제입니다.',
        frame: {
          problem: 'AirLens를 AI 에이전트와 만들면서 같은 일이 반복됐습니다. 계획 없이 바로 수정하고, 검증 없이 완료라고 말하고, 시크릿 파일에 접근하려 했습니다. 같은 보안 규칙을 런타임 세 곳에 복제해야 했고, 사람이 매번 잡는 방식은 확장되지 않았습니다.',
          role: '하나의 정책 코어와 런타임별 어댑터, 27개 hook의 설계와 릴리스 결정을 맡았고, 가드가 실제로 맞게 동작하는지 기록으로 재서 고치는 일도 제가 했습니다. 구현은 이 통제 안에서 AI 에이전트와 함께 했습니다.',
          process: '런타임마다 규칙을 복제하는 대신 하나의 정책 코어에 런타임별 어댑터를 붙였습니다. 위험 경로 커밋에는 다른 회사 AI의 검토를 같은 내용에 묶었고, 계획서는 형식 검사와 읽기 전용 계획 점검 에이전트를 거치게 했습니다. 계획 건너뛰기를 막는 게이트는 기본이 관찰 모드이고, 환경 변수 하나로 차단으로 바꿉니다.',
          result: '세션 기록을 감사해 시크릿 가드 차단 27건 중 25건이 오탐이었음을 찾았고, 명령에 시크릿 경로가 언급되기만 해도 막던 방식을 실제 읽기만 막도록 다시 만들었습니다. 시험 실행은 실제 발동 기록에 쓰지 않게 했고, CI는 전체 시험을 4개 샤드로 나눠 병렬로 돌립니다. MIT로 공개했고, 제가 매일 쓰는 설정을 참고용으로 올린 것이라 다른 환경에서의 검증은 없습니다.',
          whyAI: 'AI에게 코드를 맡길수록 필요한 건 더 좋은 프롬프트가 아니라 실수를 기계적으로 걸러 내는 장치였습니다. 그래서 프롬프트 대신 hook과 정책, 게이트를 만들었습니다. README도 이 게이트를 "에이전트에 대한 과속방지턱이지 경계가 아니다"라고 적습니다.',
        },
        attribution: [
          {
            label: '내가 한 일',
            body: '정책 코어와 hook 설계 · 런타임별 어댑터 구성 · 위험 경로 검토 게이트와 계획 점검 설계 · 가드 오탐 감사와 재설계.',
          },
          {
            label: 'AI 에이전트가 한 일',
            body: 'hook · 어댑터 · 테스트 구현 코드를 AI 에이전트와 함께 작성했습니다. 이 구현을 믿을 수 있게 만든 통제는 읽기 전용 리뷰어 에이전트, 다른 회사 AI의 검토 게이트, 그리고 가드 오탐 감사(27건 중 25건)입니다.',
          },
          {
            label: '내가 책임진 것',
            body: '릴리스와 정책의 최종 결정. 이 하네스 자체가 "AI와 함께 일하는 방식"을 시스템으로 만든 결과물입니다.',
          },
        ],
        metrics: [
          { value: '27', label: 'hooks' },
          { value: '3', label: '런타임 (Claude Code · Codex · Antigravity)' },
          { value: '25 / 27', label: '시크릿 가드 오탐 (감사 뒤 재설계)' },
          { value: '4', label: 'CI 병렬 샤드' },
          { value: 'MIT', label: '라이선스 · 참고용 공개' },
        ],
        sections: [
          {
            id: 'adapters',
            title: '런타임마다 다른 hook을 하나의 정책 코어로',
            hard:
              'Claude Code · Codex · Antigravity는 도구 호출을 가로채는 방식이 서로 다릅니다. 추상화가 없으면 같은 보안 규칙을 런타임마다 복제해야 하고, 한 곳을 고칠 때 다른 곳에서 회귀가 납니다.',
            solution:
              '하나의 정책 코어(27개 hook)를 두고, Codex와 Antigravity에는 셸 명령과 파일 쓰기를 가로채는 네이티브 어댑터를 붙였습니다. 강제력은 Claude Code에서 가장 강하고, 다른 런타임에서는 그보다 약하다는 점을 README에 그대로 적었습니다.',
            tech: ['정책 코어', '런타임 어댑터', 'hooks'],
            lesson:
              '이질적인 도구를 다룰 때는 규칙을 한 곳에 두고 가장자리에서만 변환해야 중복이 사라집니다. 어디서 얼마나 강제되는지도 있는 그대로 밝혀야 합니다.',
          },
          {
            id: 'review-gate',
            title: '위험 경로 커밋은 다른 회사 AI의 검토를 거쳐야',
            hard:
              '시크릿 · 인증 · 결제 · 마이그레이션 파일이 든 커밋은 실수의 비용이 큽니다. 작성한 AI와 같은 계열의 모델이 검토하면 맹점이 겹칠 수 있다고 보고, 검토를 다른 회사의 모델에 맡기는 쪽을 택했습니다.',
            solution:
              '위험 경로 파일을 stage한 커밋은, Anthropic 이외 회사의 모델이 정확히 그 stage된 내용을 검토했다는 기록이 묶여 있어야만 저장됩니다. 검토 뒤에 내용을 고치면 검토는 무효가 됩니다. 사용자만 쓸 수 있는 우회가 있고 기록이 남습니다. README는 이 게이트를 "에이전트에 대한 과속방지턱이지 경계가 아니다"라고 부릅니다.',
            tech: ['교차 벤더 검토', '검토와 내용의 묶음', '우회 기록'],
            lesson:
              '검토는 누가 했는지만이 아니라 어느 내용에 대한 것인지에 묶여야 합니다. 가드의 한계는 가드 스스로 문서에 적어 두어야 합니다.',
          },
          {
            id: 'plan-gate',
            title: '계획 없이 바로 수정하는 문제 (계획 점검과 읽기 전용 리뷰어)',
            hard:
              'AI 에이전트는 계획 없이 바로 코드를 고치고, 계획이 있어도 스펙과 어긋난 채 승인되기 쉽습니다. 리뷰어가 코드를 직접 고칠 수 있으면 검토와 수정의 경계도 무너집니다.',
            solution:
              '계획서는 형식 검사(plan-lint)를 먼저 통과하고, 읽기 전용 plan-checker 에이전트가 승인 전에 스펙과 계획을 대조합니다. 리뷰어 에이전트(code-reviewer · security-reviewer · plan-checker)는 Read · Grep · Glob 권한만 갖습니다. 계획 건너뛰기를 막는 spec gate는 기본이 관찰 모드이고, 환경 변수 하나로 차단 모드가 됩니다.',
            tech: ['plan-lint', '읽기 전용 리뷰어', 'spec gate 관찰 모드'],
            lesson:
              '리뷰어에게는 고칠 권한을 주지 않습니다. 새 게이트는 기본을 관찰로 두고, 막을지는 환경 변수 하나로 정하게 합니다.',
          },
          {
            id: 'false-positives',
            title: '가드를 직접 감사했더니 27건 중 25건이 오탐',
            hard:
              '로컬 세션 기록에서 시크릿 가드가 막은 27건을 열어 보니 25건이 오탐이었습니다. 명령에 시크릿 경로가 언급되기만 해도 막는 방식이었습니다.',
            solution:
              '셸 렉서로 명령을 해석해 시크릿 경로를 실제로 읽는 명령만 막도록 다시 만들었습니다. 시험 실행은 실제 발동 기록에 쓰지 않게 해 감사 기록이 시험으로 오염되지 않게 했고, CI는 전체 시험(verify-all)을 4개 샤드로 나눠 병렬로 돌립니다.',
            tech: ['셸 렉서', '오탐 감사', '샤드 CI'],
            lesson:
              '가드는 만든 것으로 끝나지 않고 막은 기록으로 다시 재야 합니다. 시험이 운영 기록을 오염시키면 그 측정도 믿을 수 없습니다.',
          },
        ],
        modernTech: [
          { name: '교차 벤더 검토 게이트', why: '위험 경로 커밋은 다른 회사 모델의 검토가 같은 stage 내용에 묶여 있어야 저장됩니다.' },
          { name: '읽기 전용 리뷰어 · 계획 점검 에이전트', why: 'code-reviewer · security-reviewer · plan-checker는 Read · Grep · Glob만 가집니다. 계획서는 plan-lint와 plan-checker를 거칩니다.' },
          { name: 'Policy-as-Code', why: '규칙을 hook으로 코드화해 어느 런타임에서든 같은 정책 코어가 판단하게 합니다.' },
          { name: '샤드 CI', why: 'GitHub Actions가 전체 시험(verify-all)을 4개로 나눠 병렬 실행합니다.' },
        ],
        decisions: [
          {
            choice: '하나의 정책 코어 + 런타임별 네이티브 어댑터',
            over: '런타임마다 보안 규칙 복제',
            why: '같은 규칙을 세 곳에 복제하면 한 곳을 고칠 때 다른 곳에서 회귀가 납니다. 코어를 하나로 두고 가장자리에서만 런타임에 맞췄습니다.',
          },
          {
            choice: '위험 경로 커밋은 다른 회사 모델의 검토가 같은 내용에 묶여야 저장',
            over: '같은 계열 AI의 자기 검토',
            why: '작성자와 같은 계열이면 맹점이 겹칠 수 있다고 봤습니다. 검토 뒤에 고치면 무효가 되고, 사용자만 쓰는 우회는 기록에 남깁니다. README도 이 게이트가 경계가 아니라 에이전트를 늦추는 장치라고 적습니다.',
          },
          {
            choice: '리뷰어 에이전트는 읽기 전용 (Read · Grep · Glob만)',
            over: '리뷰어가 직접 고치게 하기',
            why: '검토하는 쪽이 고칠 수 있으면 검토와 수정의 경계가 흐려집니다. 권한 자체를 주지 않는 쪽이 지키기 쉽습니다.',
          },
          {
            choice: '계획 건너뛰기 게이트는 기본 관찰 모드',
            over: '처음부터 차단',
            why: '새 게이트의 오탐 비용을 알기 전에 막으면 작업이 멈춥니다. 기본은 기록만 하고, 환경 변수 하나로 차단으로 바꿉니다.',
          },
          {
            choice: '시크릿 가드를 "언급"이 아니라 "실제 읽기" 기준으로 재설계',
            over: '시크릿 경로가 언급된 명령 전부 차단',
            why: '세션 기록 감사에서 차단 27건 중 25건이 오탐이었습니다. 셸 렉서로 명령을 해석해 시크릿 경로를 실제로 읽을 때만 막게 했습니다.',
          },
          {
            choice: '공개 저장소에서 확인되는 수치만 게시',
            over: '공개되지 않은 내부 기록의 수치',
            why: '이 페이지의 수치는 2026-10-22 공개 저장소 기준입니다. 외부가 검증할 수 없는 숫자 하나가 나머지 실측 전부의 신뢰를 깎습니다.',
          },
        ],
        meta: {
          title: 'Agent 케이스스터디 · 조용민',
          description: '하나의 정책 코어와 27개 hook으로 세 AI 코딩 런타임을 다루는 거버넌스 하네스 · 다른 회사 AI의 검토 게이트, 읽기 전용 리뷰어, 시크릿 가드 오탐 감사(27건 중 25건).',
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
          process: '일반 백링크 대신 10종 typed edge를, Notion 대신 마크다운·git·결정적 스크립트를 골랐습니다. 프로젝트 문서 668개를 통째로 넣어 봤다가 위키가 오염되는 것을 겪고 "복사가 아니라 증류" 규칙을 세웠고, 설정 파일만 있고 훅이 없어 시크릿이 새는 사고를 겪은 뒤 스캐너가 없으면 커밋을 막는 게이트로 바꿨습니다.',
          result: '원자 노트 268개, typed edge 890개, orphan 0, 린트 0을 유지하고 있습니다. 세션 기록이 재사용 가능한 규칙으로 바뀌었고, 이 포트폴리오의 케이스와 결정 기록 대부분이 여기서 나왔습니다.',
          whyAI: '캡처는 모델 호출 없이 기계가 하고, 증류는 LLM이 합니다. 요약하며 저장하면 원본이 사라지기 때문에 LLM은 나중에, 게이트를 통과한 것만 승격하는 자리에만 둡니다.',
        },
        attribution: [
          { label: '내가 한 일', body: '스키마(노드·엣지 타입) 설계 · 2-tier 캡처/증류 워크플로우와 5게이트 규칙 제정 · 린트·통계·시각화 파이프라인 요구 정의 · 매일의 증류 판단 자체.' },
          { label: 'AI 에이전트가 한 일', body: '스크립트(extract_graph · wiki_lint · stats · build_viz · query · brain_sync)와 neuron-cosmos 3D 뷰어의 구현 대부분, 노트 초안.' },
          { label: '내가 책임진 것', body: '무엇을 위키에 올리고 무엇을 raw에 남길지의 최종 판단, 정직 집계 규칙, 시크릿 게이트 사고 이후 정한 "스캐너가 없으면 커밋을 막는" 정책.' },
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
          { date: '2026-07-13', label: '시크릿 사고 발견 → 스캐너가 없으면 막는 pre-commit 게이트' },
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
              '키를 전부 폐기·교체하고, pre-commit 훅이 스캐너가 없으면 막도록 바꿨습니다 · gitleaks가 없으면 커밋 자체를 막습니다. core.hooksPath는 로컬 설정이라 클론마다 setup 스크립트를 밟아야 한다는 사실을 README에 명시했고, 이후 모든 디렉터리 임포트 전에 .env·pem·id_* 스캔을 절차로 넣었습니다.',
            tech: ['gitleaks', '커밋 차단 pre-commit', 'core.hooksPath'],
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
          { name: 'gitleaks 커밋 차단 훅', why: '스캐너 부재 시 커밋 차단 · "설정은 규칙, 훅이 게이트".' },
        ],
        meta: {
          title: 'Second Brain 케이스스터디 · 조용민',
          description: '타입드 지식 그래프 268노드·890엣지, bulk import 오염과 시크릿 사고에서 배운 게이트 설계, 4,985노드 3D 시각화 · 개인 지식 인프라를 만든 기록.',
        },
        links: [],
      },
      'canine-wgs': {
        name: '반려견 전장유전체 분석 파이프라인 · 반려동물 바이오 기업 협력 프로젝트',
        tagline: '희귀질환 사례 1건의 반려견 전장유전체 분석 파이프라인 · 계산 단계와 추론 단계 분리 · 사전등록 측정',
        status: '산업 연계 프로젝트 · AI 에이전트와 협업, 실무는 혼자 수행 · 2026-07 ~ 08 · 방법만 공개, 결과 수치는 싣지 않음',
        overview:
          '반려동물 바이오 기업과 함께한 산업 연계 프로젝트입니다. 희귀질환 사례 1건의 전장유전체를 정렬 → 변이 검출 → 주석 → 집단 빈도 필터 → 후보 우선순위화 → 근거 등급 보고서까지 연결하는 로컬 파이프라인을 만들었습니다. 검증된 생물정보학 도구가 계산을 맡고, 로컬 LLM은 결과 표를 문장으로 옮기는 일만 합니다. 개에는 병원성 정답셋이 없어 정확도를 주장하지 않고 도구 간 불일치를 측정하며, 모든 지표는 결과를 보기 전에 계약 파일에 고정했습니다. 이 페이지는 방법만 다루고 결과 수치는 싣지 않습니다.',
        frame: {
          problem: '반려동물 바이오 기업이 희귀질환 사례 1건의 시퀀싱 데이터를 제공했지만, 개에는 사람 같은 병원성 정답셋이 없어 정확도를 직접 잴 수 없었고, 원시 데이터는 받은 환경 밖으로 내보내지 않는다는 서약 아래 있었습니다.',
          role: '문제 재정의, 파이프라인 아키텍처, 참조 유전체와 변이 탐지·주석 도구 선택, 측정 계약 사전 등록, 결과 해석과 보고서, 데이터 서약을 지키는 작업 방식 설계를 혼자 맡았습니다. 스크립트 대부분은 이 규칙 아래에서 AI 코딩 에이전트가 썼고, 도구 선택과 측정 계약, 해석은 제가 했습니다.',
          process: '계산 단계(BWA-MEM · samtools · bcftools · freebayes)와 추론 단계(로컬 llama.cpp)를 분리했습니다. 정확도를 잴 수 없으니 변이 탐지 도구 2개와 주석 도구 3개를 돌려 불일치의 크기를 쟀고, 지표 · 합격선 · 검증 방법을 결과를 보기 전에 계약 파일에 고정했습니다. 클라우드 LLM 대신 CPU 로컬 모델을 택해 속도를 감수했습니다.',
          result: '결과 수치는 싣지 않고 방법만 공개합니다. 제가 정리한 희귀질환 전장유전체 분석 단계는 모두 실제 데이터로 실측까지 마쳤고, 원시 데이터는 환경 밖으로 나가지 않았으며, 병원성은 단정하지 않았습니다.',
          whyAI: 'LLM은 결과 표를 사람이 읽을 문장으로 옮기는 서술 단계에만 뒀고, 병원성 판단의 근거로는 쓰지 않았습니다. 그 단계가 하지 말아야 할 일(표 밖 유전자 언급, 병원성 단정, 가명 뒤 정보 누출)을 검사 항목으로 두고 쟀습니다. 계산을 LLM에 맡기지 않은 이유는 재현성과 보안 둘 다였습니다.',
        },
        attribution: [
          { label: '내가 한 일', body: '문제 재정의 · 계산/추론 분리 아키텍처 · 참조 유전체와 변이 탐지·주석 도구 선택 근거 · 측정 계약(지표·합격선·검증 방법·중단 게이트) 사전 등록 · 결과 해석과 보고서 · 데이터 서약을 지키는 작업 방식 설계.' },
          { label: 'AI 에이전트가 한 일', body: '파이프라인 스크립트 · 평가 코드 · 문서 렌더의 구현 대부분. 이 구현 위에 제가 얹은 통제는 사전등록한 측정 계약과 원시 데이터를 내보내지 않는다는 원칙입니다.' },
          { label: '내가 책임진 것', body: '원시 데이터가 기기를 떠나지 않는다는 0순위 원칙, 반출 게이트, 그리고 모든 지표를 합격선과 함께 나온 대로 보고하는 결정.' },
        ],
        sections: [
          {
            id: 'planes',
            title: 'LLM이 계산을 대체하지 않게 · 두 단계의 경계',
            hard:
              '생성 모델이 파이프라인 중간에 끼면 재현성이 깨지고, 기업 데이터가 모델 프롬프트로 새어 나갈 위험도 있었습니다.',
            solution:
              '계산 단계(BWA-MEM · samtools · bcftools · freebayes, 결정론)와 로컬 AI 추론 단계(llama.cpp, CPU, 루프백 접속만 허용)를 분리했습니다. LLM은 가명화된 후보·집계·근거만 읽고, 원시 read·서열·경로는 프롬프트에도 로그에도 남기지 않습니다. 참조 유전체는 집단 변이 자료와 좌표가 맞아야 필터가 성립하므로, 파일 하나가 아니라 데이터 계약으로 보고 골랐습니다.',
            tech: ['BWA-MEM · samtools · bcftools · freebayes', 'llama.cpp (CPU, 로컬)', '참조 유전체 좌표 계약'],
            lesson: '참조 유전체는 파일 하나가 아니라 데이터 계약입니다. 집단 변이 자료 · 주석 · contig 이름 · 회사의 기존 산출물까지 좌표가 맞아야 선택이 끝납니다.',
          },
          {
            id: 'contract',
            title: '결과를 보기 전에 지표를 고정하다',
            hard:
              '단일 검체에 유전자 수도 적은 작은 표본에서 지도학습을 돌리면 어떤 지표든 골라서 "잘 됐다"고 말할 수 있습니다. 게다가 개에는 정답셋이 없어 정확도 자체가 정의되지 않습니다.',
            solution:
              '지표 · 합격선 · 교차검증 방식(leave-one-gene-out) · 중단 게이트를 계약 파일에 고정한 뒤에만 결과를 봤습니다. 불확실성은 유전자 단위 부트스트랩과 그룹을 보존한 순열 검정으로 쟀고, 합의가 곧 진실이 되지 않도록 순환성 감사를 두었으며, 모든 보고서 머리에 "합의는 진실이 아니다"를 기계적으로 넣었습니다. 모든 지표는 합격선과 함께 나온 대로 보고하게 했습니다.',
            tech: ['사전등록 측정 계약', 'leave-one-gene-out CV', '유전자 단위 부트스트랩', '그룹 보존 순열 검정', '순환성 감사'],
            lesson: '합격한 지표만 읽으면 표를 잘못 읽은 것입니다. 사전등록은 결과를 좋게 만들지 않지만, 결과를 믿을 수 있게 만듭니다.',
          },
          {
            id: 'disagreement',
            title: '정확도 대신 불일치를 잰다',
            hard:
              '"어느 변이 탐지 도구가 더 정확한가"는 개에서 답할 수 없는 질문입니다. 그런데 단일 도구의 결과를 단정적으로 읽으면 보고서가 잘못된 확신을 전달합니다.',
            solution:
              'bcftools와 freebayes를 둘 다 돌려 교집합과 차집합의 크기를 쟀습니다(Jaccard 일치도). 공유 변이가 각 도구 고유분보다 Ts/Tv 비율과 집단 중복률 면에서 나은지 보는 검사로 공유분의 신뢰도를 가늠했습니다. 주석 도구 3종(VEP · snpEff · bcftools csq)은 같은 유전자 모델 파일 위에서 서로의 일치도와 재실행 결정론을 쟀고, 집단 대립빈도 필터가 후보를 얼마나 줄이는지도 단계별로 쟀습니다.',
            tech: ['다중 caller 합의', 'Ts/Tv · 집단 중복률 검정', 'VEP · snpEff · bcftools csq'],
            lesson: '"안 봤다"와 "봤는데 없다"는 보고서에서 전혀 다른 문장입니다. 구조변이나 ROH처럼 SNV caller가 못 보는 것도 봤다는 사실 자체를 남겨야 합니다.',
          },
          {
            id: 'narrator',
            title: '로컬 LLM 서술 단계에 가드레일을 재다',
            hard:
              '후보표를 사람이 읽을 문장으로 옮기는 서술 단계는 가장 유용하면서 가장 위험합니다. 표 밖 유전자를 지어내거나, 병원성을 단정하거나, 가명 뒤의 정보를 흘릴 수 있습니다.',
            solution:
              '서술 모델을 출력 스키마로 제한한 채 돌리고, 하지 말아야 할 일을 지표로 정해 쟀습니다. 표 밖 유전자 서술, 병원성 단정, 빈 후보표에서의 명명, 자유 서술에서의 유전자 누출, 수치 오귀속이 그 지표입니다. 누출에는 필터를 붙였고, 기준에 못 미친 항목은 미달로 적도록 했습니다. 근거 등급 보고서는 AVCG 기준 체크리스트로 채점했습니다.',
            tech: ['스키마 제약 생성', '누출 필터', 'AVCG 채점 체크리스트'],
            lesson: 'LLM을 민감 도메인에 넣을 때 질문은 "얼마나 잘 쓰나"가 아니라 "무엇을 절대 하지 않나"이고, 그것은 측정해야 합니다.',
          },
        ],
        decisions: [
          { choice: '참조 유전체를 집단 변이 자료와의 좌표 호환성으로 선택', over: '익숙한 이전 빌드를 그대로 사용', why: '집단 빈도 필터는 좌표가 맞아야 성립합니다. 다만 회사의 기존 산출물 빌드를 확인하기 전에는 확정하지 않고 후보로 두었습니다.' },
          { choice: 'DeepVariant는 작은 구간 비교 실험으로 제한', over: '단독 정답 caller로 채택', why: '내장 모델이 사람 데이터로 학습된 점을 반영했습니다. 개 전장유전체에서 그 결과를 정답처럼 쓰면 근거 없는 확신이 됩니다.' },
          { choice: '지표를 계약 파일에 사전 등록', over: '결과를 보고 지표 선택', why: '표본이 작을수록 사후 지표 선택은 원하는 결론을 만들어 냅니다. 양성 비율만 보고 교차검증 분할을 정한 뒤 성능은 고정 뒤에만 봤고, "완전한 블라인드는 아니다"라는 사실도 문서 맨 위에 적었습니다.' },
          { choice: '로컬 CPU llama.cpp', over: '클라우드 LLM API', why: '데이터 서약상 원시 파생물은 어떤 외부 위치에도 두지 않습니다. 정렬·변이 검출과 CPU를 나눠 쓰는 대신 추론 속도를 감수했습니다.' },
          { choice: '합의 예측 점수는 근거 표기로만 쓰고 순위에는 개입시키지 않음', over: 'ML 점수로 후보 순위 결정', why: '순위는 명시한 규칙으로만 정합니다. 합의를 예측하는 모델은 합의를 예측할 뿐 진실을 예측하지 않기 때문입니다.' },
        ],
        modernTech: [
          { name: 'llama.cpp 로컬 추론', why: 'CPU 로컬 모델이 결과 표를 서술하고, 외부로 나가는 요청은 없습니다.' },
          { name: '다중 caller · 다중 annotator', why: '도구 하나의 결과를 정답으로 읽지 않고 도구 간 불일치를 측정합니다.' },
          { name: '사전등록 측정 계약', why: '지표 · 합격선 · 검증 방법을 결과를 보기 전에 고정합니다.' },
          { name: '반출 게이트', why: '환경 밖으로 나가는 산출물은 좌표 · 유전형 · 서열을 뺀 비식별 집계만 허용하고, 경계 테스트로 강제합니다.' },
        ],
        meta: {
          title: '반려견 전장유전체 분석 파이프라인 · 반려동물 바이오 기업 협력 프로젝트 · 조용민',
          description: '반려동물 바이오 기업 협력 프로젝트로 만든 반려견 전장유전체 분석 파이프라인의 방법 · 계산 단계와 추론 단계 분리, 사전등록 측정 계약, 정답셋 없는 도메인에서 불일치를 재는 법, 로컬 LLM 서술 단계의 가드레일.',
        },
        links: [],
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
            tech: ['Django 4.2.7 · jQuery', 'Chart.js', 'django-allauth (소셜 로그인)'],
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
            tech: ['Next.js 16 · React 19 · Tailwind v4', 'Vercel'],
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
      decisions: 'Decision log, why this, not that',
      decisionsLead: 'Every fork in the road, with what was given up. Each row traces back to a change record, a pull request or a retrospective.',
      over: 'over',
      status: 'Status',
      frame: { heading: 'In one paragraph · problem → role → process → result', problem: 'Problem', role: 'Role', process: 'Process', result: 'Result', whyAI: 'Why AI' },
    },
    items: {
      airlens: {
        name: 'AirLens',
        tagline: 'Air-quality web service · Keyless public API · Built with AI agents · One owner · Live',
        status: 'LIVE · airlens.cloud · 2026.03 ~ present (capstone 2023 ~ 24 → product 2026)',
        overview:
          'AirLens is a free air-quality web service at airlens.cloud. It shows a PM2.5 nowcast grid estimated from station observations, city forecasts at 1, 6 and 24 hours, policy-effect estimates, and an assistant that answers with citations from public data, and it also offers a keyless, read-only public API and an MCP server. There are no accounts and no payments. I own problem definition, evaluation design, release decisions and every merge approval, and I operate it alone, with AI agents writing most of the implementation inside those controls. Below are four cases where it was wrong and I fixed it, and the architecture as it stands now.',
        frame: {
          problem: 'While analysing air-quality policy effects for my thesis I saw that station, weather and satellite data were scattered, and that most air-quality services do not show how far an estimate can be trusted.',
          role: 'I owned problem definition, data-source selection, evaluation design, architecture, release decisions, monitoring and incident response alone. I approved every merge, and AI agents wrote most of the implementation inside those controls.',
          process: 'The PM2.5 nowcast grid is estimated from station observations (an XGBoost and LightGBM quantile blend, GTWR on the median, intervals recalibrated with Mondrian CQR). Every estimate carries p10, p50 and p90 and an A to F confidence grade, and the TimesFM city forecasts carry conformal bands. For policy effects I rebuilt a mixed-source panel from a single source, calibrated it to ground observations and re-estimated with SDID.',
          result: 'The site, API and assistant run on Cloudflare over a public Hugging Face dataset, and collection and inference jobs run on GitHub Actions. Along the way I found that a 0.99 R² was circular and fixed it (2026-07-11), stopped 88 of 581 stations from serving readings a week or more old as current with a record-age filter (2026-09-04), and confirmed with cross-validation that 80% prediction intervals covered 93% of observations overall but only 14% at 150 µg/m³ or more (2026-08-02).',
          whyAI: 'Pre-built charts cannot answer a question like "why was Seoul bad this week", so I added an assistant. It searches public data, answers with citations, and works inside guardrails and per-caller limits. The estimate and forecast numbers come from statistical and ML models.',
        },
        attribution: [
          {
            label: 'What I did',
            body: 'Problem definition · data-source selection · evaluation design · architecture · release decisions · monitoring · incident response.',
          },
          {
            label: 'What AI agents did',
            body: 'AI agents wrote most of the implementation code. The evaluation design that checks that implementation is mine, and finding the circular 0.99 R² and filtering out the stale readings of 88 of 581 stations came out of those checks.',
          },
          {
            label: 'What I own',
            body: 'Every merge approval, every release decision, and final accountability for what happens in production.',
          },
        ],
        metrics: [
          { value: '119', label: 'countries re-estimated, 88 estimable' },
          { value: '88 / 581', label: 'stations served stale readings' },
          { value: '93% → 14%', label: '80% interval coverage · overall → 150 µg/m³ or more' },
          { value: '1 · 6 · 24 h', label: 'TimesFM city forecasts' },
          { value: 'A to F', label: 'confidence grade' },
        ],
        timeline: [
          { date: '2026-03', label: 'Development starts' },
          { date: '2026-06-20', label: 'Causal panel rebuild begins · mixed sources removed' },
          { date: '2026-07-11', label: 'Found the registry R² of 0.99 was circular · merge fixed' },
          { date: '2026-08-02', label: 'Interval coverage audited with leave-station-out cross-validation · split by band and committed' },
          { date: '2026-08-10', label: 'Deployed intervals recalibrated without retraining · remaining shortfall still reported' },
          { date: '2026-08-26', label: 'By this date: longitude bug fixed · 119 countries re-estimated on a ground-calibrated panel (88 estimable)' },
          { date: '2026-09-04', label: '88 of 581 stations found serving stale readings · record-age filter' },
          { date: '2026-09-05', label: 'Relational database retired (code deleted 2026-10-15)' },
          { date: '2026-10-10', label: 'airlens-data repository made public' },
          { date: '2026-10-19', label: 'Own-operated runners removed · collection and inference on GitHub Actions hosted runners' },
        ],
        sections: [
          {
            id: 'r2',
            title: 'A 0.99 R² that was circular (target leakage)',
            hard:
              'The R² of 0.99 recorded in the model registry was too good. Tracing it, a satellite-feature merge had failed silently because of a column-name mismatch, so every training row’s AOD feature was filled with a value computed from the target. The model was predicting the answer from the answer, and 0.99 was circular.',
            solution:
              'I fixed the silently failing merge so that no value computed from the target enters the features (2026-07-11).',
            tech: ['Leakage and circularity audit', 'Model registry', 'Satellite feature (AOD) merge fix'],
            lesson:
              'Distrust a good number first. 0.99 came from a broken measurement, not a good model. Check whether a feature is computed from the target and whether a merge failed silently before anything else.',
          },
          {
            id: 'coverage',
            title: 'The failure an aggregate hid (interval coverage)',
            hard:
              'In leave-station-out cross-validation over 484 stations, the 80% prediction intervals covered 93% of observations overall. But at PM2.5 of 150 µg/m³ or more they covered only 14%. The average looked fine, yet on the bad days people most want to know about, the interval could not be trusted.',
            solution:
              'I split coverage by band and committed it to a file so the band the aggregate hides is visible (2026-08-02). Then I recalibrated the deployed model’s intervals without retraining (2026-08-10), and the shortfall that remains at high concentrations is still reported.',
            tech: ['Leave-station-out cross-validation', 'Conformal intervals', 'Mondrian CQR'],
            lesson:
              'Never judge from one aggregate; split by band. An aggregate can hide the failure in the band that matters most.',
          },
          {
            id: 'stale',
            title: 'Stations serving week-old readings as current',
            hard:
              '88 of 581 stations were serving readings at least 7 days old (up to 2.5 years) as current.',
            solution:
              'A record-age filter now drops stale readings and lists the excluded stations (2026-09-04). Freshness probes open and close alert issues, and a product-health file refreshes every 3 hours.',
            tech: ['Record-age filter', 'Freshness probes', 'Alert issues opened and closed automatically'],
            lesson:
              'Having a value does not mean it is current. Treat the age of data as part of the input, and keep a list of what was filtered out.',
          },
          {
            id: 'causal',
            title: 'A data trap in policy-effect estimation (SDID causal panel)',
            hard:
              'In the panel used to estimate national air-quality policy effects with synthetic difference-in-differences (SDID), a country’s series changing source midway can produce an artificial jump that gets read as a policy effect. On inspection the panel mixed sources, and one source also had a longitude bug (a western-hemisphere series).',
            solution:
              'I rebuilt the panel from a single source (2026-06), found and fixed the longitude bug in one source, and re-estimated policy effects for 119 countries on a panel calibrated to ground observations (through 2026-08-26; 88 estimable). The results are batch-computed, and the refresh workflows are currently switched off.',
            tech: ['Synthetic difference-in-differences (SDID)', 'Single-source panel', 'Ground calibration'],
            lesson:
              'Even when a model gives a plausible answer, first ask whether it is signal or a data artefact. Re-estimating 119 countries left 88 estimable, and I do not read the rest as policy effects.',
          },
        ],
        modernTech: [
          { name: 'XGBoost · LightGBM · GTWR', why: 'Estimates the PM2.5 nowcast grid from station observations: a blend of two quantile models, with geographically and temporally weighted regression (GTWR) on the median.' },
          { name: 'Mondrian CQR', why: 'Intervals are recalibrated with conformalized quantile regression (Mondrian) without retraining.' },
          { name: 'TimesFM + conformal bands', why: 'City forecasts at 1, 6 and 24 hour horizons, each with a conformal band.' },
          { name: 'DQSS · confidence grade', why: 'Every PM2.5 estimate carries a p10 · p50 · p90 interval and an A to F confidence grade, and input data quality is scored separately by a rule-based score (DQSS, 5 components).' },
          { name: 'Workers AI · Vectorize assistant', why: 'Embeddings and Vectorize retrieval answer with citations from public data, behind regex guardrails, anonymous sessions (Turnstile) and per-caller rate limits. When the daily budget is spent it falls back to retrieval-only answers.' },
          { name: 'MCP server · keyless public API', why: 'api.airlens.cloud/v1 is read-only and needs no key, and the same data is offered through an MCP server.' },
          { name: 'Hugging Face dataset · GitHub Actions', why: 'A public Hugging Face dataset is the data bus, and collection and inference jobs run on GitHub Actions hosted runners.' },
          { name: 'React 19 · Vite · Three.js', why: 'The frontend is React 19, Vite and TypeScript, 3D visuals use Three.js (R3F), and state lives in Zustand.' },
        ],
        decisions: [
          {
            choice: 'Describe it as a nowcast built from station observations',
            over: 'Presenting it as a satellite-estimate service',
            why: 'Satellite AOD currently carries no weight in the live grid (climatology stands in). I chose not to advertise an input I do not use, and the product description now says a nowcast conditioned on station observations.',
          },
          {
            choice: 'Rebuild the SDID panel from a single source and calibrate it to ground observations',
            over: 'Mixing sources to enlarge the sample',
            why: 'When sources are mixed, per-source bias does not cancel in the difference and reads as a policy effect. After rebuilding from a single source I also fixed a longitude bug in one source, and re-estimated 119 countries on a ground-calibrated panel (88 estimable).',
          },
          {
            choice: 'A free web app with no accounts or payments, plus a keyless read-only API',
            over: 'Logins and subscription tiers',
            why: 'Air is a public-interest problem, so I put no barrier in front of it. With no accounts or payments there is also less permission management for one person to carry.',
          },
          {
            choice: 'Three repos, retire the relational database, use a public Hugging Face dataset as the data bus',
            over: 'One monorepo and keeping the relational database',
            why: 'The boundaries between data, ML and web blurred and deployment risk mixed in one repo. I split it into airlens-web (public: site, API and assistant Workers), airlens-data (public since 2026-10-10: collectors, contracts, publishing and inference jobs) and airlens-ml (private: training, evaluation and SDID), and retired the relational database on 2026-09-05 (code deleted 2026-10-15). There is no relational database in the live path.',
          },
        ],
        meta: {
          title: 'AirLens case study · Yongmin Cho',
          description: 'A circular 0.99 R² in AirLens, the coverage an aggregate hid (93% to 14%), 88 stations serving stale readings, policy effects re-estimated, and the architecture today.',
        },
        links: [
          { label: 'airlens.cloud', url: AIRLENS },
          { label: 'GitHub (web)', url: AIRLENS_WEB_REPO },
          { label: 'GitHub (data)', url: AIRLENS_DATA_REPO },
        ],
      },
      agent: {
        name: 'Agent',
        tagline: 'Multi-runtime governance harness for AI coding agents · Claude Code · Codex · Antigravity',
        status: 'MIT open source · personal harness published as a reference · public repository as of 2026-10-22 · not tested on other setups, and enforcement is strongest on Claude Code',
        overview:
          'Agent is a governance harness that runs three AI coding runtimes, Claude Code, Codex and Antigravity, under one policy core with 27 hooks. It is the setup I run every day, published under the MIT license as a reference, and I have not tested it on other setups. Read-only reviewer agents, a review gate from another vendor’s AI on risk-area commits, and plan checks are managed in one place. Here are the four hardest problems.',
        frame: {
          problem: 'Building AirLens with AI agents, the same things kept happening. They edited without a plan, claimed completion without verification, and reached for secret files. The same security rules had to be duplicated across three runtimes, and catching it by hand every time did not scale.',
          role: 'I owned the design and release decisions for one policy core, the per-runtime adapters and the 27 hooks, and I also measured from logs whether the guards actually behave and fixed them. The implementation was done with AI agents inside those controls.',
          process: 'Instead of duplicating rules per runtime, I attached per-runtime adapters to one policy core. For risk-area commits I bound a review by another vendor’s AI to the exact content, and plans pass a format check and a read-only plan-checker agent. The gate against skipping the plan runs in observation mode by default, and one environment variable turns it into a block.',
          result: 'Auditing my session logs, I found that 25 of 27 secret-guard denials were false positives, and rebuilt a check that blocked any command merely mentioning a secrets path so that it blocks only real reads. Test runs no longer write to the live firing logs, and CI splits the full suite into 4 parallel shards. It is MIT licensed, and because it is the setup I run daily, published as a reference, it has not been verified on other setups.',
          whyAI: 'The more code you hand to AI, the more you need mechanical checks that catch mistakes, not a better prompt. So I built hooks, policy and gates instead of prompts. The README itself calls the gate "a speed bump against an agent, not a boundary".',
        },
        attribution: [
          {
            label: 'What I did',
            body: 'Policy core and hook design · per-runtime adapters · the risk-area review gate and plan checks · auditing and redesigning the guard after the false-positive finding.',
          },
          {
            label: 'What AI agents did',
            body: 'I wrote the hook, adapter and test code together with AI agents. The controls that make that implementation trustworthy are the read-only reviewer agents, the cross-vendor review gate, and my audit of the guard (25 of 27 denials were false positives).',
          },
          {
            label: 'What I own',
            body: 'Final decisions on releases and policy. The harness itself is "how I work with AI" turned into a system.',
          },
        ],
        metrics: [
          { value: '27', label: 'hooks' },
          { value: '3', label: 'runtimes (Claude Code · Codex · Antigravity)' },
          { value: '25 / 27', label: 'secret-guard denials that were false positives (guard rebuilt)' },
          { value: '4', label: 'parallel CI shards' },
          { value: 'MIT', label: 'license · published as a reference' },
        ],
        sections: [
          {
            id: 'adapters',
            title: 'One policy core under runtimes that hook differently',
            hard:
              'Claude Code, Codex and Antigravity intercept tool calls in different ways. Without an abstraction the same security rule has to be duplicated per runtime, and fixing one copy causes regressions in another.',
            solution:
              'I put one policy core (27 hooks) in place and attached native adapters for Codex and Antigravity that intercept shell commands and file writes. Enforcement is strongest on Claude Code and weaker on the others, and I wrote that into the README as it is.',
            tech: ['Policy core', 'Runtime adapters', 'Hooks'],
            lesson:
              'With heterogeneous tools, keep the rules in one place and translate only at the edges, and the duplication disappears. Say plainly where enforcement is strong and where it is not.',
          },
          {
            id: 'review-gate',
            title: 'Risk-area commits must pass another vendor’s AI',
            hard:
              'A commit that touches secrets, authentication, billing or migration files costs a lot when it is wrong. I judged that a reviewer from the same family as the writing AI could share its blind spots, so I handed the review to a model from another vendor.',
            solution:
              'A commit that stages risk-area files is blocked unless a review by a model from a vendor other than Anthropic is bound to the exact staged content. Editing after the review invalidates it. A user-only override exists and is logged. The README calls the gate "a speed bump against an agent, not a boundary".',
            tech: ['Cross-vendor review', 'Review bound to content', 'Logged override'],
            lesson:
              'A review has to be tied to which content it covered, not only to who did it. A guard should state its own limits in its documentation.',
          },
          {
            id: 'plan-gate',
            title: 'Editing without a plan (plan checks and read-only reviewers)',
            hard:
              'AI agents edit code without a plan, and even with one it is easy for it to be approved while drifting from the spec. If a reviewer can edit code directly, the line between reviewing and changing disappears.',
            solution:
              'Plans pass a format check (plan-lint) first, and a read-only plan-checker agent compares each plan with its spec before approval. The reviewer agents (code-reviewer, security-reviewer, plan-checker) hold Read, Grep and Glob only. The spec gate against skipping the plan runs in observation mode by default, and one environment variable makes it block.',
            tech: ['plan-lint', 'Read-only reviewers', 'Spec gate observation mode'],
            lesson:
              'Reviewers get no permission to edit. A new gate defaults to observing, and whether it blocks is one environment variable.',
          },
          {
            id: 'false-positives',
            title: 'Auditing the guard: 25 of 27 denials were false positives',
            hard:
              'Opening the 27 denials the secret guard produced in my local session logs, 25 were false positives. The guard blocked any command that merely mentioned a secrets path.',
            solution:
              'I rebuilt it to parse commands with a shell lexer and block only commands that actually read the secrets path. Test runs no longer write to the live firing logs, so the audit record is not polluted by tests, and CI splits the full suite (verify-all) into 4 parallel shards.',
            tech: ['Shell lexer', 'False-positive audit', 'Sharded CI'],
            lesson:
              'A guard is not finished when it is built; measure it again from the record of what it blocked. If tests pollute the operational log, that measurement cannot be trusted either.',
          },
        ],
        modernTech: [
          { name: 'Cross-vendor review gate', why: 'A risk-area commit is saved only when a review by another vendor’s model is bound to the same staged content.' },
          { name: 'Read-only reviewer and plan-check agents', why: 'code-reviewer, security-reviewer and plan-checker hold Read, Grep and Glob only. Plans pass plan-lint and plan-checker.' },
          { name: 'Policy as code', why: 'Rules are coded as hooks, so one policy core decides the same way under any runtime.' },
          { name: 'Sharded CI', why: 'GitHub Actions splits the full suite (verify-all) into 4 parallel shards.' },
        ],
        decisions: [
          {
            choice: 'One policy core with native per-runtime adapters',
            over: 'Duplicating security rules per runtime',
            why: 'Duplicating the same rule in three places means fixing one causes regressions in another. I kept one core and adapted to each runtime only at the edge.',
          },
          {
            choice: 'Risk-area commits are saved only with another vendor’s review bound to the same content',
            over: 'Self-review by the same family of AI',
            why: 'I judged that a reviewer from the same family as the writer could share its blind spots. An edit after review invalidates it, and the user-only override is logged. The README itself says the gate slows an agent down rather than forming a boundary.',
          },
          {
            choice: 'Reviewer agents are read-only (Read, Grep, Glob)',
            over: 'Letting reviewers fix things themselves',
            why: 'If the reviewer can edit, the line between review and change blurs. It is easier to keep by not granting the permission at all.',
          },
          {
            choice: 'The plan-skipping gate defaults to observation mode',
            over: 'Blocking from day one',
            why: 'Blocking before you know the false-positive cost stops work. The default only records, and one environment variable switches it to blocking.',
          },
          {
            choice: 'Rebuild the secret guard around real reads, not mentions',
            over: 'Blocking every command that mentions a secrets path',
            why: 'My session-log audit showed 25 of 27 denials were false positives. A shell lexer now interprets each command and blocks only when it actually reads the secrets path.',
          },
          {
            choice: 'Publish only figures that the public repository supports',
            over: 'Figures that exist only in private records',
            why: 'Figures on this page are as of the public repository on 2026-10-22. One number outsiders cannot verify costs the trust in every measured one.',
          },
        ],
        meta: {
          title: 'Agent case study · Yongmin Cho',
          description: 'A governance harness that runs three AI coding runtimes under one policy core with 27 hooks: a cross-vendor review gate, read-only reviewers, and an audit of the secret guard (25 of 27 denials were false positives).',
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
          process: 'Ten typed edge types instead of plain backlinks; Markdown, git and deterministic scripts instead of Notion. After dumping 668 project documents polluted the wiki I wrote the "distil, don’t copy" rule, and after a secret leaked because a config existed without a hook, I switched to gates that block the commit when the scanner is missing.',
          result: '268 atomic notes, 890 typed edges, 0 orphans, 0 lint findings, maintained. Session records became reusable rules, and most of the cases and decision logs on this portfolio came out of it.',
          whyAI: 'Capture is done by a script with no model call; distillation is done by the LLM. Summarising at capture time destroys the original, so the LLM sits only where it promotes what has passed the gates.',
        },
        attribution: [
          { label: 'What I did', body: 'Designed the schema (node and edge types) · wrote the 2-tier capture/distil workflow and the five-gate rule · specified the lint, stats and visualisation pipeline · and make the daily distillation calls myself.' },
          { label: 'What AI agents did', body: 'Most of the implementation of the scripts (extract_graph · wiki_lint · stats · build_viz · query · brain_sync) and the neuron-cosmos 3D viewer, plus note drafts.' },
          { label: 'What I own', body: 'The final call on what enters the wiki versus stays raw, the honest-count rule, and the block-when-the-scanner-is-missing policy adopted after the secret-leak incident.' },
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
          { date: '2026-07-13', label: 'Secret leak discovered → pre-commit gate that blocks when the scanner is missing' },
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
              'Revoked and rotated every key, then made the pre-commit hook block commits when the scanner is missing · no gitleaks, no commit. Because core.hooksPath is local git config, the README now says every clone must run the setup script once, and every directory import is preceded by a scan for .env, .pem and id_* files.',
            tech: ['gitleaks', 'Commit-blocking pre-commit', 'core.hooksPath'],
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
          { name: 'gitleaks commit-blocking hook', why: 'Blocks commits when the scanner is absent · “config is a rule, the hook is the gate”.' },
        ],
        meta: {
          title: 'Second Brain Case Study · Yongmin Cho',
          description: 'A typed knowledge graph of 268 nodes and 890 edges, the gate design learned from a bulk-import pollution and a secret leak, and a 4,985-node 3D view · building personal knowledge infrastructure.',
        },
        links: [],
      },
      'canine-wgs': {
        name: 'Canine Whole-Genome Analysis Pipeline · Industry Project with a Pet-Bio Company',
        tagline: 'Whole-genome analysis pipeline for a single rare-disease case in a dog · compute and reasoning stages kept apart · pre-registered measurement',
        status: 'Industry project · built with AI agents, hands-on work done alone · 2026-07 ~ 08 · method only, no result numbers',
        overview:
          'An industry project with a pet-bio company. I built a local pipeline for one rare-disease case that runs alignment → variant calling → effect prediction → population-frequency filtering → candidate prioritisation → an evidence-graded report. Validated bioinformatics tools do the computation, and a local LLM only turns result tables into sentences. Dogs have no pathogenicity truth set, so I do not claim accuracy; I measure the size of the disagreement between tools, and every metric was frozen in a contract file before any result was seen. This page covers the method only and carries no result numbers.',
        frame: {
          problem: 'A pet-bio company supplied sequencing data for one rare-disease case, but dogs have no pathogenicity truth set like the human one, so accuracy could not be measured directly, and the raw data was under a pledge never to leave the environment it arrived in.',
          role: 'I alone handled the problem reframing, pipeline architecture, choice of reference genome, variant callers and annotators, pre-registration of the measurement contract, interpretation and the report, and a way of working that kept the data pledge. AI coding agents wrote most of the scripts under these rules; the tool choices, measurement contract and interpretation were mine.',
          process: 'I kept the compute stage (BWA-MEM · samtools · bcftools · freebayes) and the reasoning stage (a local llama.cpp model) apart. Since accuracy could not be measured, I ran two variant callers and three annotators and measured how far they disagree, and froze metrics, pass lines and the validation method in a contract file before any result was seen. I chose a CPU-only local model over a cloud LLM and accepted the slower speed.',
          result: 'Result numbers are not published; the method is. Every stage of the rare-disease WGS workflow I mapped was measured on real data, raw data never left the environment, and no pathogenicity was asserted.',
          whyAI: 'The LLM sits only in the narration stage that turns a candidate table into sentences, and it is never the basis for a pathogenicity call. What that stage must never do (mention genes outside the table, assert pathogenicity, leak information behind the pseudonyms) was set up as checks and measured. I kept computation away from the LLM for both reproducibility and security.',
        },
        attribution: [
          { label: 'What I did', body: 'Problem reframing · compute/reasoning-stage architecture · rationale for the reference genome, callers and annotators · pre-registering the measurement contract (metrics, pass lines, validation method, stop gates) · interpretation and the report · a way of working that kept the data pledge.' },
          { label: 'What AI agents did', body: 'Most of the implementation of the pipeline scripts, evaluation code and document rendering. The controls I put on top of that implementation were the pre-registered measurement contract and the rule that raw data never leaves.' },
          { label: 'What I own', body: 'The first-priority rule that raw data never leaves the machine, the export gate, and the decision to report every metric against its pass line exactly as it came out.' },
        ],
        sections: [
          {
            id: 'planes',
            title: 'Keeping the LLM from replacing the computation · the boundary between two stages',
            hard:
              'If a generative model sits in the middle of the pipeline, reproducibility breaks, and there is a risk that company data leaks into a model prompt.',
            solution:
              'I separated the compute stage (BWA-MEM · samtools · bcftools · freebayes, deterministic) from a local AI reasoning stage (llama.cpp on CPU, loopback access only). The LLM reads only pseudonymised candidates, aggregates and evidence, and raw reads, sequences and paths appear in neither the prompt nor the logs. Because the frequency filter only works when coordinates match a population variant resource, I chose the reference genome as a data contract rather than as a single file.',
            tech: ['BWA-MEM · samtools · bcftools · freebayes', 'llama.cpp (CPU, local)', 'Reference-genome coordinate contract'],
            lesson: 'A reference genome is a data contract, not a file. The choice is not finished until the population variant resource, the gene models, the contig names and the company’s existing outputs all agree on coordinates.',
          },
          {
            id: 'contract',
            title: 'Freezing the metrics before seeing any result',
            hard:
              'With a single sample and few genes, supervised learning lets you pick whichever metric says "it worked". And in dogs there is no truth set, so accuracy itself is undefined.',
            solution:
              'I looked at results only after freezing the metrics, pass lines, cross-validation scheme (leave-one-gene-out) and stop gates in a contract file. Uncertainty was measured with a gene-level bootstrap and a group-preserving permutation test, a circularity audit guards against agreement being mistaken for truth, and every report header carries the line "agreement is not truth", inserted mechanically. Every metric was to be reported against its pass line as it came out.',
            tech: ['Pre-registered measurement contract', 'Leave-one-gene-out CV', 'Gene-level bootstrap', 'Group-preserving permutation test', 'Circularity audit'],
            lesson: 'If you read only the metrics that passed, you misread the table. Pre-registration does not make results better; it makes them believable.',
          },
          {
            id: 'disagreement',
            title: 'Measuring disagreement instead of accuracy',
            hard:
              '"Which variant caller is more accurate" cannot be answered in dogs. Yet reading one tool’s output as final makes the report convey false confidence.',
            solution:
              'I ran both bcftools and freebayes and measured the size of the intersection and the differences (Jaccard agreement). A check on whether shared variants look better than each tool’s private ones in Ts/Tv ratio and population-overlap rate served as a gauge of how trustworthy the shared part is. For three annotators (VEP · snpEff · bcftools csq) I measured pairwise agreement and rerun determinism on the same gene-model file, and measured step by step how much the population-frequency filter narrows the candidates.',
            tech: ['Multi-caller agreement', 'Ts/Tv · population-overlap checks', 'VEP · snpEff · bcftools csq'],
            lesson: '"Did not look" and "looked and found nothing" are different sentences in a report. Even what an SNV caller cannot see, such as structural variants or ROH, deserves a note that it was looked at.',
          },
          {
            id: 'narrator',
            title: 'Measuring the guardrails of the local-LLM narration stage',
            hard:
              'The narration stage that turns a candidate table into readable sentences is the most useful and the most dangerous. It can invent genes outside the table, assert pathogenicity, or leak what sits behind the pseudonyms.',
            solution:
              'I ran the narration model with its output constrained by a schema and defined what it must never do as metrics, then measured them: genes narrated outside the table, pathogenicity assertions, naming from an empty candidate table, gene leakage in free text, and misattributed numbers. I added a filter for leakage, and items that missed the bar were to be recorded as misses. The evidence-graded report was scored against an AVCG-based checklist.',
            tech: ['Schema-constrained generation', 'Leakage filter', 'AVCG scoring checklist'],
            lesson: 'When you put an LLM in a sensitive domain, the question is not "how well does it write" but "what does it never do", and that has to be measured.',
          },
        ],
        decisions: [
          { choice: 'Choose the reference genome by coordinate compatibility with the population variant resource', over: 'Keeping the familiar older build', why: 'The population-frequency filter only works when coordinates match. Until the build of the company’s existing outputs was confirmed, I kept it as a candidate rather than fixing it.' },
          { choice: 'Limit DeepVariant to a small-region comparison experiment', over: 'Adopting it as the single ground-truth caller', why: 'Its built-in model was trained on human data. Using its output as truth in a dog whole genome would be confidence without grounds.' },
          { choice: 'Pre-register the metrics in a contract file', over: 'Choosing metrics after seeing results', why: 'The smaller the sample, the more post-hoc metric choice manufactures the wanted conclusion. I set the cross-validation split by positive rate alone and looked at performance only after freezing, and I wrote "this is not fully blind" at the top of the document.' },
          { choice: 'Local CPU llama.cpp', over: 'A cloud LLM API', why: 'Under the data pledge, no raw derivative may be placed in any outside location. I share the CPU with alignment and variant calling and accepted the slower inference.' },
          { choice: 'Use the consensus-prediction score only as supporting notes, never to rank', over: 'Ranking candidates by an ML score', why: 'Ranking follows explicit rules only. A model that predicts consensus predicts consensus, not truth.' },
        ],
        modernTech: [
          { name: 'Local llama.cpp inference', why: 'A CPU-only local model narrates the result tables, and nothing goes out over the network.' },
          { name: 'Multi-caller · multi-annotator', why: 'No single tool’s output is read as truth; disagreement between tools is measured.' },
          { name: 'Pre-registered measurement contract', why: 'Metrics, pass lines and the validation method are frozen before any result is seen.' },
          { name: 'Export gate', why: 'Anything leaving the environment is limited to de-identified aggregates without coordinates, genotypes or sequences, enforced by boundary tests.' },
        ],
        meta: {
          title: 'Canine Whole-Genome Analysis Pipeline · Industry Project with a Pet-Bio Company · Yongmin Cho',
          description: 'The method behind a canine whole-genome analysis pipeline built in an industry project with a pet-bio company: compute and reasoning stages kept apart, a pre-registered measurement contract, measuring disagreement where there is no truth set, and guardrails for a local LLM narration stage.',
        },
        links: [],
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
            tech: ['Django 4.2.7 · jQuery', 'Chart.js', 'django-allauth (social login)'],
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
            tech: ['Next.js 16 · React 19 · Tailwind v4', 'Vercel'],
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
    lead: '산업경영공학과 헬스케어 데이터사이언스(융합전공)에서 출발해, 졸업논문의 대기질 정책 분석을 라이브 서비스 AirLens의 정책 효과 추정으로 이어 갔고, 같은 태도로 반려견 전장유전체 파이프라인을 만들었습니다. 이 페이지는 같은 증거를 연구자의 질문으로 다시 정리한 것입니다. 무엇을 물었고, 어떻게 쟀고, 무엇이 틀렸는지.',
    background: [
      { label: '학부', body: '강릉원주대학교, 산업경영공학(주전공) · 헬스케어 데이터사이언스(융합전공). 졸업논문은 미세먼지 저감 정책의 한·중 비교 효과 분석.' },
      { label: '실무 훈련', body: 'KT AIVLE School AI 개발자 트랙 840h · 반려동물 바이오 기업과 함께한 산업 연계 프로젝트(반려견 전장유전체 분석, 실무는 혼자 수행하고 스크립트 대부분은 AI 에이전트가 작성).' },
      { label: '지금', body: '대기질 웹 서비스 AirLens를 혼자 책임지고 운영합니다. 문제 정의, 평가 설계, 릴리스 판단과 모든 머지 승인은 제가 하고, 구현은 이 통제 안에서 AI 에이전트가 대부분 씁니다. PM2.5 추정마다 p10~p90 구간과 A~F 신뢰 등급이 함께 나갑니다. 미국 데이터사이언스 석사 진학을 준비 중입니다.' },
    ],
    interestsHeading: '연구 관심',
    interestsLead: '우선순위 순서입니다. 각 항목에 이미 한 일과 다음에 배우고 싶은 것을 나눠 적었습니다.',
    interests: [
      {
        rank: '01',
        title: '환경·보건 데이터의 인과추론 · 정책은 효과가 있었나',
        question: '관측 데이터만으로 대기질 정책의 효과를 얼마나 정직하게 추정할 수 있는가? 어디까지가 신호이고 어디부터가 데이터 아티팩트인가?',
        done: '졸업논문에서 한·중 정책 전후 농도를 공공 관측 데이터로 비교(시각화 + t-test·회귀)한 뒤, AirLens에서 합성 이중차분(SDID)으로 국가 단위 정책 효과를 추정했습니다. 출처가 섞인 패널을 단일 출처로 다시 만들었고, 한 출처에서 경도 버그(서반구 시계열)를 찾아 고친 뒤, 지상 관측으로 보정한 패널에서 119개국의 정책 효과를 다시 추정했습니다(추정 가능 88개국). 결과는 배치로 계산한 값입니다.',
        next: '시공간 교락(confounding)과 오염 전이(spillover)를 다루는 인과 방법, 위성 프록시(AOD)의 측정 오차가 추정치에 미치는 영향, 그리고 정책 효과의 이질성(heterogeneity)을 지역·계절별로 분해하는 방법을 체계적으로 배우고 싶습니다.',
        evidence: [
          { label: '인과추론 케이스', url: '/projects/airlens#causal' },
          { label: '졸업논문', url: '#thesis' },
        ],
      },
      {
        rank: '02',
        title: 'ML 시스템의 신뢰성과 평가 · 지표가 숨기는 실패',
        question: '통과한 지표는 무엇을 보증하고 무엇을 보증하지 못하는가? 집계는 어떤 구간의 실패를 가리는가?',
        done: '관측소 단위 leave-station-out 교차검증(484개 관측소)에서 PM2.5 80% 예측구간은 전체 관측의 93%를 담았지만 150 µg/m³ 이상 구간에서는 14%만 담았고, 이 구간별 결과를 파일에 남겼습니다. 그에 앞서 모델 레지스트리의 R² 0.99가 순환이었다는 것도 직접 찾아 고쳤습니다. 위성 특성 병합이 조용히 실패해 정답에서 계산한 값이 모든 학습 행에 들어가 있었습니다. 과거에 돌린 LLM 조언 생성 시험에서는 표면 지표 3개가 모두 통과했는데 LLM-judge 충실도 지표를 추가하자 69.2%로 전체 판정이 FAIL로 뒤집혔고, 프롬프트 보강과 재학습 뒤에도 기준 80%를 넘지 못했습니다.',
        next: '분포 이동 하의 보정(calibration)과 conformal prediction, 평가 지표 자체의 검증(meta-evaluation), LLM-as-judge의 신뢰도 측정을 깊이 공부하고 싶습니다.',
        evidence: [
          { label: '실측 노트', url: '/#timeline' },
          { label: '커버리지 점검', url: '/projects/airlens#coverage' },
        ],
      },
      {
        rank: '03',
        title: '민감 도메인에서의 로컬 LLM 해석 · 유전체·의료',
        question: '원시 데이터가 기기를 떠나지 않으면서, 생성 모델이 결정론적 파이프라인의 결과를 "설명"만 하도록 경계를 어떻게 설계하고 측정하는가?',
        done: '반려견 전장유전체 파이프라인에서 계산 단계(BWA-MEM · bcftools · freebayes)와 추론 단계(로컬 llama.cpp, 루프백 접속만 허용)를 분리했습니다. 개에는 병원성 정답셋이 없어 정확도 대신 도구 간 불일치를 쟀고, 지표와 합격선을 결과를 보기 전에 계약 파일로 고정하고, 모든 지표를 합격선과 함께 나온 대로 보고하게 했습니다. 서술 단계는 결과 표 밖의 유전자 언급과 병원성 단정을 검사 항목으로 두었습니다. 결과 수치는 싣지 않습니다.',
        next: '변이 해석의 표준(ACMG/AMP · AVCG)을 계산 가능한 근거 체계로 옮기는 방법, 종 간 ortholog 매핑의 불확실성, 소표본 유전체 연구의 통계적 검정력을 배우고 싶습니다.',
        evidence: [
          { label: '반려견 전장유전체 케이스', url: '/projects/canine-wgs' },
        ],
      },
      {
        rank: '04',
        title: 'AI 에이전트 거버넌스 · 정책을 코드로',
        question: '여러 AI 런타임이 코드를 쓰는 환경에서, 무엇을 사람이 결정하고 무엇을 기계 게이트가 강제해야 하는가?',
        done: 'Claude Code · Codex · Antigravity 세 런타임을 하나의 정책 코어와 27개 hook으로 다루는 하네스 Agent를 만들어 매일 쓰고 있습니다(MIT, 참고용 공개). 시크릿·인증·결제·마이그레이션 파일이 든 커밋은 다른 회사 AI의 검토가 같은 내용에 묶여 있어야 저장됩니다. 세션 기록을 직접 감사해 시크릿 가드 차단 27건 중 25건이 오탐임을 찾았고, 실제 읽기만 막도록 다시 만들었습니다.',
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
      { method: '합성 이중차분 (SDID)', where: 'AirLens · 국가 정책 효과', detail: '출처 혼합 제거(단일 출처 패널) · 경도 버그 수정 · 지상 보정 패널에서 119개국 재추정(추정 가능 88개국)', evidence: { label: 'CASE', url: '/projects/airlens#causal' } },
      { method: 'Leave-station-out 공간 교차검증', where: 'AirLens · PM2.5 예측구간', detail: '484개 관측소 · 80% 구간 포함률 전체 93% → 150 µg/m³ 이상 14%', evidence: { label: 'CASE', url: '/projects/airlens#coverage' } },
      { method: '분위수 앙상블 + 지리가중 회귀', where: 'AirLens · PM2.5 nowcast', detail: 'XGBoost · LightGBM 분위수 블렌드 · 중앙값에 GTWR · Mondrian CQR로 구간 재보정(재학습 없음)', evidence: { label: 'CASE', url: '/projects/airlens' } },
      { method: '시계열 파운데이션 모델 + conformal 구간', where: 'AirLens · 도시 예보', detail: 'TimesFM 1 · 6 · 24시간 예보 · conformal 구간', evidence: { label: 'CASE', url: '/projects/airlens' } },
      { method: '데이터 유출·순환 점검', where: 'AirLens · 모델 레지스트리', detail: 'R² 0.99가 정답에서 계산된 위성 특성 때문에 순환이었음을 찾아 병합 수정', evidence: { label: 'CASE', url: '/projects/airlens#r2' } },
      { method: '기록 나이 필터', where: 'AirLens · 데이터 품질', detail: '581개 관측소 중 88개가 7일 이상 지난 값을 현재값으로 제공 → 필터와 제외 목록', evidence: { label: 'CASE', url: '/projects/airlens#stale' } },
      { method: '사전등록 측정 계약', where: '반려견 전장유전체 프로젝트', detail: '지표 · 합격선 · 검증 방법을 결과를 보기 전에 고정 · 유전자 단위 부트스트랩 · 그룹 보존 순열 검정', evidence: { label: 'CASE', url: '/projects/canine-wgs#contract' } },
      { method: '다중 caller · 다중 annotator 불일치 측정', where: '반려견 전장유전체 프로젝트', detail: '변이 탐지 2종 · 주석 3종의 불일치를 정확도 대신 측정 · Ts/Tv 검정 · 집단 빈도 필터', evidence: { label: 'CASE', url: '/projects/canine-wgs#disagreement' } },
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
      { title: '설명할 수 없는 숫자는 쓰지 않는다', body: '이 사이트의 모든 수치는 커밋·리포트·수료증으로 역추적됩니다. 커밋 수처럼 오해를 부르는 숫자는 싣지 않았습니다.' },
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
    lead: 'Starting from Industrial Engineering and an interdisciplinary major in Healthcare Data Science, I carried an undergraduate thesis on air-quality policy into the policy-effect estimates of AirLens, a live service, and brought the same discipline to a dog whole-genome pipeline. This page reorganises the same evidence as a researcher’s questions: what I asked, how I measured, and what turned out wrong.',
    background: [
      { label: 'Undergraduate', body: 'Gangneung-Wonju National University, Industrial Engineering (major) · Healthcare Data Science (interdisciplinary major). Thesis: a Korea–China comparative analysis of fine-dust reduction policies.' },
      { label: 'Applied training', body: 'KT AIVLE School AI Developer Track, 840h · Industry project with a pet-bio company (a canine whole-genome pipeline; hands-on work done alone, most scripts written by AI agents).' },
      { label: 'Now', body: 'Operating AirLens, a live air-quality web service, as its only engineer. I own problem definition, evaluation design, release decisions and every merge approval; AI agents write most of the implementation inside those controls. Every PM2.5 estimate ships with a p10 to p90 interval and an A to F confidence grade. Preparing MS applications in Data Science in the United States.' },
    ],
    interestsHeading: 'Research interests',
    interestsLead: 'In priority order. For each: what I have already done, and what I want to learn next.',
    interests: [
      {
        rank: '01',
        title: 'Causal inference on environmental and health data · did the policy work?',
        question: 'How honestly can observational data estimate the effect of an air-quality policy? Where does signal end and data artefact begin?',
        done: 'My thesis compared pre/post-policy concentrations in Korea and China from public monitoring data (visualisation plus t-tests and regression). In AirLens I estimate country-level policy effects with synthetic difference-in-differences (SDID). I rebuilt the panel from a single source after finding mixed sources, found and fixed a longitude bug in one source (a western-hemisphere series), then re-estimated policy effects for 119 countries on a ground-calibrated panel (88 estimable). The results are batch-computed.',
        next: 'I want to study spatiotemporal confounding and spillover in causal designs, how measurement error in satellite proxies (AOD) propagates into estimates, and how to decompose effect heterogeneity by region and season.',
        evidence: [
          { label: 'Causal-inference case', url: '/en/projects/airlens#causal' },
          { label: 'Thesis', url: '#thesis' },
        ],
      },
      {
        rank: '02',
        title: 'Reliability and evaluation of ML systems · the failures metrics hide',
        question: 'What does a passing metric guarantee, and what does it not? Which bands of failure does an aggregate conceal?',
        done: 'With leave-station-out cross-validation over 484 stations, 80% prediction intervals covered 93% of observations overall but only 14% at PM2.5 of 150 µg/m³ or more, and I committed that split to a file. Before that, I found that the model registry’s R² of 0.99 was circular: a silent satellite-feature merge failure had filled every training row with a value computed from the target, and I fixed the merge. In an earlier experiment with an LLM advice-generation gate, three surface metrics all passed until an LLM-judge fidelity metric returned 69.2% and flipped the verdict to FAIL; a prompt revision and retraining still fell short of the 80% gate.',
        next: 'I want to go deeper into calibration under distribution shift and conformal prediction, meta-evaluation of the metrics themselves, and measuring the reliability of LLM-as-judge.',
        evidence: [
          { label: 'Field notes', url: '/en/#timeline' },
          { label: 'Coverage audit', url: '/en/projects/airlens#coverage' },
        ],
      },
      {
        rank: '03',
        title: 'Local-LLM interpretation in sensitive domains · genomics and health',
        question: 'How do you design and measure a boundary where raw data never leaves the machine and a generative model only explains the outputs of a deterministic pipeline?',
        done: 'In a canine whole-genome pipeline I separated a compute stage (BWA-MEM · bcftools · freebayes) from a reasoning stage (a local llama.cpp model reachable only over loopback). With no pathogenicity truth set in dogs I measured tool disagreement instead of accuracy, and froze the metrics and pass lines in a contract file before any result was seen, and every metric was to be reported against its pass line as it came out. The narration stage was checked for genes mentioned outside the result table and for pathogenicity assertions. Result numbers are not published.',
        next: 'I want to learn how variant-interpretation standards (ACMG/AMP · AVCG) can be turned into computable evidence systems, the uncertainty of cross-species ortholog mapping, and statistical power in small-sample genomics.',
        evidence: [
          { label: 'Canine whole-genome case', url: '/en/projects/canine-wgs' },
        ],
      },
      {
        rank: '04',
        title: 'AI agent governance · policy as code',
        question: 'When several AI runtimes write code, what must a human decide and what should a machine gate enforce?',
        done: 'I built Agent, a harness that runs Claude Code, Codex and Antigravity under one policy core with 27 hooks, and I use it every day (MIT, published as a reference). A commit that stages secrets, authentication, billing or migration files is blocked until a review from another vendor is bound to the exact staged content. When my session logs showed that 25 of 27 secret-guard denials were false positives, I rebuilt the check to block only real reads.',
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
      { method: 'Synthetic difference-in-differences (SDID)', where: 'AirLens · national policy effects', detail: 'Mixed sources removed (single-source panel) · longitude bug fixed · 119 countries re-estimated on a ground-calibrated panel (88 estimable)', evidence: { label: 'CASE', url: '/en/projects/airlens#causal' } },
      { method: 'Leave-station-out spatial cross-validation', where: 'AirLens · PM2.5 intervals', detail: '484 stations · 80% interval coverage 93% overall → 14% at 150 µg/m³ or more', evidence: { label: 'CASE', url: '/en/projects/airlens#coverage' } },
      { method: 'Quantile ensemble + geographically weighted regression', where: 'AirLens · PM2.5 nowcast', detail: 'XGBoost · LightGBM quantile blend · GTWR on the median · intervals recalibrated with Mondrian CQR (no retraining)', evidence: { label: 'CASE', url: '/en/projects/airlens' } },
      { method: 'Time-series foundation model + conformal bands', where: 'AirLens · city forecasts', detail: 'TimesFM at 1 · 6 · 24 h · conformal bands', evidence: { label: 'CASE', url: '/en/projects/airlens' } },
      { method: 'Leakage and circularity audit', where: 'AirLens · model registry', detail: 'Found that an R² of 0.99 was circular, because a satellite feature was computed from the target; fixed the merge', evidence: { label: 'CASE', url: '/en/projects/airlens#r2' } },
      { method: 'Record-age filter', where: 'AirLens · data quality', detail: '88 of 581 stations served readings 7 days or older as current → filter plus an exclusion list', evidence: { label: 'CASE', url: '/en/projects/airlens#stale' } },
      { method: 'Pre-registered measurement contract', where: 'Canine whole-genome project', detail: 'Metrics, pass lines and validation method frozen before any result · gene-stratified bootstrap · group-preserving permutation', evidence: { label: 'CASE', url: '/en/projects/canine-wgs#contract' } },
      { method: 'Multi-caller · multi-annotator disagreement', where: 'Canine whole-genome project', detail: 'Disagreement among two callers and three annotators measured instead of accuracy · Ts/Tv checks · population-frequency filter', evidence: { label: 'CASE', url: '/en/projects/canine-wgs#disagreement' } },
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
      { title: 'Don’t publish a number you can’t explain', body: 'Every figure on this site traces to a commit, a report or a certificate. Misleading ones, such as commit counts, are left out.' },
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
