import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

/* ── 목업 프레임 ─────────────────────────────────────────────────────── */

function MockupFrame({ children, gradient }: { children: React.ReactNode; gradient: string }) {
  return (
    <div className="relative mx-auto max-w-[380px]">
      <div className="absolute -inset-3 sm:-inset-4 rounded-3xl opacity-40 sm:opacity-60 blur-lg sm:blur-xl" style={{ background: gradient }} aria-hidden="true" />
      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#E5E8EB] bg-white" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
        {/* 브라우저 크롬 */}
        <div className="bg-[#EBEBEB] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 bg-white rounded-md py-0.5 sm:py-1 px-2 sm:px-3 text-[9px] sm:text-[10px] text-[#9CA3AF] text-center">
            app.innohi.ai.kr
          </div>
        </div>
        <div className="bg-white h-[280px] sm:h-[320px]">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── 01 음성 인식 목업 ─────────────────────────────────────────────── */

function MockVoice() {
  return (
    <div className="p-3 sm:p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#448CFF] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/></svg>
        </div>
        <span className="text-[11px] font-semibold text-[#191F28]">실시간 음성 인식</span>
        <span className="ml-auto text-[10px] font-bold text-[#448CFF] bg-[#448CFF]/10 px-2 py-0.5 rounded-full">98.5%</span>
      </div>
      {/* 파형 */}
      <div className="flex items-end gap-[3px] h-12 mb-4">
        {Array.from({ length: 32 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-full bg-[#448CFF]"
            style={{ opacity: 0.3 + Math.random() * 0.7 }}
            initial={{ height: 4 }}
            animate={{ height: [4, 8 + Math.random() * 36, 4] }}
            transition={{ duration: 0.6 + Math.random() * 0.8, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </div>
      {/* 전사 텍스트 */}
      <div className="bg-[#F8F9FD] rounded-lg p-3 mb-3 flex-1">
        <p className="text-[11px] text-[#4E5968] leading-relaxed">
          "오늘 오전 홍길동 어르신 방문 상담 완료했습니다. 건강 상태 양호하며 식사 보조 서비스 요청하셨습니다..."
        </p>
      </div>
      {/* 추출 필드 */}
      <div className="flex gap-2">
        {[{ l: '이름', v: '홍길동' }, { l: '상태', v: '양호' }, { l: '조치', v: '식사 보조' }].map((f) => (
          <div key={f.l} className="flex-1 bg-[#448CFF]/5 rounded-md px-2 py-1.5 text-center">
            <p className="text-[9px] text-[#8B95A1]">{f.l}</p>
            <p className="text-[11px] font-semibold text-[#191F28]">{f.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 02 데이터 구조화 목업 ─────────────────────────────────────────── */

function MockDataBrowser() {
  const rows = [
    { field: '성명', value: '박OO', tag: '완료', tagColor: '#448CFF' },
    { field: '나이', value: '65세', tag: '분류됨', tagColor: '#3B82F6' },
    { field: '가구', value: '독거', tag: '생성됨', tagColor: '#60A5FA' },
    { field: '등급', value: '3등급', tag: '산출됨', tagColor: '#93C5FD' },
  ];
  return (
    <div className="p-3 sm:p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        </div>
        <span className="text-[11px] font-semibold text-[#191F28]">지능형 데이터 추출</span>
      </div>
      {/* 원문 */}
      <div className="bg-[#F8F9FD] rounded-lg p-3 mb-3">
        <p className="text-[9px] font-semibold text-[#8B95A1] mb-1">[원문]</p>
        <p className="text-[11px] text-[#4E5968] leading-relaxed">
          박OO, 65세, 독거 가구, 장기요양 3등급 판정...
        </p>
      </div>
      {/* 추출 테이블 */}
      <div className="flex-1 space-y-1.5">
        {rows.map((r) => (
          <div key={r.field} className="flex items-center justify-between bg-white border border-[#F2F4F6] rounded-lg px-3 py-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#8B95A1] w-8">{r.field}</span>
              <span className="text-[12px] font-semibold text-[#191F28]">{r.value}</span>
            </div>
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ color: r.tagColor, background: r.tagColor + '18' }}>{r.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 03 예측 대시보드 목업 ─────────────────────────────────────────── */

function MockDashboard() {
  const bars = [42, 58, 45, 73, 61, 88, 76, 95];
  const alerts = [
    { name: '이OO', age: '87세', level: '높음', color: '#EF4444' },
    { name: '박OO', age: '74세', level: '주의', color: '#F59E0B' },
    { name: '최OO', age: '81세', level: '정상', color: '#22C55E' },
  ];
  return (
    <div className="p-3 sm:p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#38BDF8] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </div>
        <span className="text-[11px] font-semibold text-[#191F28]">예측 분석 대시보드</span>
      </div>
      {/* 차트 */}
      <div className="flex items-end gap-1.5 h-24 mb-2 px-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ background: h > 80 ? '#1D4ED8' : h > 60 ? '#60A5FA' : '#93C5FD' }}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          />
        ))}
      </div>
      <div className="flex gap-3 mb-4 px-1">
        {[{ l: '높음', c: '#1D4ED8' }, { l: '주의', c: '#60A5FA' }, { l: '정상', c: '#93C5FD' }].map((x) => (
          <div key={x.l} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: x.c }} />
            <span className="text-[9px] text-[#8B95A1]">{x.l}</span>
          </div>
        ))}
      </div>
      {/* 알림 케이스 */}
      <div className="space-y-1.5 flex-1">
        {alerts.map((a) => (
          <div key={a.name} className="flex items-center justify-between bg-[#F8F9FD] rounded-lg px-3 py-2">
            <span className="text-[11px] font-semibold text-[#191F28]">{a.name} ({a.age})</span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: a.color, background: a.color + '18' }}>{a.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 04 워크플로우 자동화 목업 ─────────────────────────────────────── */

function MockWorkflow() {
  const steps = ['접수', '분류', '배정', '처리', '완료'];
  const cases = [
    { id: '#2841', name: '이OO 어르신', desc: '긴급 방문', urgent: true },
    { id: '#2842', name: '김OO', desc: '서비스 신청', urgent: false },
    { id: '#2843', name: '박OO', desc: '정기 상담', urgent: false },
  ];
  return (
    <div className="p-3 sm:p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <span className="text-[11px] font-semibold text-[#191F28]">자동 워크플로우</span>
      </div>
      {/* 진행 단계 */}
      <div className="flex items-center gap-1 mb-5">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-1 flex-1">
            <motion.div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
              style={{ background: i < 3 ? '#6366F1' : '#E5E8EB' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.12 }}
            >
              {i < 3 ? '✓' : i + 1}
            </motion.div>
            <span className="text-[9px] text-[#8B95A1] hidden sm:inline">{s}</span>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-[#E5E8EB]" />}
          </div>
        ))}
      </div>
      {/* 케이스 카드 */}
      <div className="space-y-2 flex-1">
        {cases.map((c) => (
          <div key={c.id} className="flex items-center gap-3 bg-[#F8F9FD] rounded-lg px-3 py-2.5">
            <span className="text-[10px] font-mono text-[#8B95A1]">{c.id}</span>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-[#191F28]">{c.name}</p>
              <p className="text-[9px] text-[#8B95A1]">{c.desc}</p>
            </div>
            {c.urgent && <span className="text-[9px] font-bold text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 rounded-full">긴급</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 그라데이션 배경 ─────────────────────────────────────────────── */

const gradients = [
  'linear-gradient(135deg, #C7DEFF 0%, #448CFF 50%, #8AB8FB 100%)',
  'linear-gradient(135deg, #93C5FD 0%, #3B82F6 50%, #6366F1 100%)',
  'linear-gradient(135deg, #BAE6FD 0%, #38BDF8 50%, #448CFF 100%)',
  'linear-gradient(135deg, #C7DEFF 0%, #93C5FD 50%, #A78BFA 100%)',
];

const mockups = [<MockVoice />, <MockDataBrowser />, <MockDashboard />, <MockWorkflow />];

/* ── 파이프라인 데이터 ─────────────────────────────────────────────── */

const pipeline = [
  {
    step: '01',
    key: 'Capture',
    labelKo: '음성 → 데이터',
    labelEn: 'Voice → Data',
    titleKo: '말하는 순간, 데이터가 됩니다',
    titleEn: 'The moment you speak, it becomes data',
    descKo: '현장의 목소리를 실시간으로 인식하여 구조화된 기록으로 자동 변환합니다.',
    descEn: 'Real-time voice recognition converts field conversations into structured records.',
    detailKo: '수기 작성 없이 대화만으로 모든 상담 내용이 자동 입력됩니다. 12개 언어를 동시에 지원하며, 노이즈 환경에서도 98.5%의 정확도를 유지합니다.',
    detailEn: 'All consultation content is automatically entered through conversation alone. Supports 12 languages simultaneously with 98.5% accuracy even in noisy environments.',
    featuresKo: ['실시간 전사 — 0.1초 지연', '12개 언어 동시 지원', '노이즈 환경 98.5% 정확도'],
    featuresEn: ['Real-time transcription — 0.1s delay', '12 languages simultaneously', '98.5% accuracy in noisy environments'],
    color: '#448CFF',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
        <path d="M19 10v2a7 7 0 01-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
  },
  {
    step: '02',
    key: 'Structure',
    labelKo: '비정형 → 구조화',
    labelEn: 'Unstructured → Structured',
    titleKo: '비정형 정보를 즉시 정리합니다',
    titleEn: 'Unstructured data, instantly organized',
    descKo: '메모, 음성, 서류 등 어떤 형태로 들어와도 AI가 자동으로 분류·추출합니다.',
    descEn: 'No matter the format, AI automatically classifies and extracts fields.',
    detailKo: '업무 시간의 85%를 단순 입력에서 해방시킵니다. 검증 규칙을 자동 적용하고, 기존 시스템과 완벽히 연동됩니다.',
    detailEn: 'Frees 85% of work time from manual data entry. Applies validation rules automatically and integrates seamlessly with existing systems.',
    featuresKo: ['자동 분류 & 개체 추출', '검증 규칙 적용', '기존 시스템 연동'],
    featuresEn: ['Auto classification & entity extraction', 'Validation rule enforcement', 'Legacy system integration'],
    color: '#3B82F6',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    step: '03',
    key: 'Predict',
    labelKo: '데이터 → 예측',
    labelEn: 'Data → Prediction',
    titleKo: '데이터가 미래를 예측합니다',
    titleEn: 'Data predicts the future',
    descKo: '축적된 데이터에서 패턴을 학습하여 위험 케이스를 사전에 식별합니다.',
    descEn: 'Learns patterns from data to identify risk cases before they escalate.',
    detailKo: '담당자가 놓칠 수 있는 신호를 AI가 먼저 포착합니다. 예측 모델이 자동으로 업데이트되어 실시간 대시보드에서 즉시 확인 가능합니다.',
    detailEn: 'AI detects signals that staff might miss. Predictive models auto-update and results are instantly available on the real-time dashboard.',
    featuresKo: ['추세 분석 & 위험 점수화', '예측 모델 자동 업데이트', '실시간 대시보드'],
    featuresEn: ['Trend analysis & risk scoring', 'Auto-updating predictive models', 'Real-time dashboard'],
    color: '#38BDF8',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    step: '04',
    key: 'Act',
    labelKo: '인사이트 → 실행',
    labelEn: 'Insight → Action',
    titleKo: '인사이트가 바로 실행됩니다',
    titleEn: 'Insights become immediate action',
    descKo: '분석 결과가 담당자 배정, 알림 발송, 문서 생성까지 자동으로 이어집니다.',
    descEn: 'Analysis flows to staff assignment, notifications, and document generation.',
    detailKo: '판단에서 실행까지 걸리는 시간을 90% 단축합니다. 스마트 케이스 라우팅과 자동 에스컬레이션으로 모든 과정이 투명하게 추적됩니다.',
    detailEn: 'Reduces time from decision to execution by 90%. Smart case routing and auto-escalation ensure full audit trail.',
    featuresKo: ['스마트 케이스 라우팅', '자동 에스컬레이션', '완전한 감사 추적'],
    featuresEn: ['Smart case routing', 'Auto-escalation', 'Full audit trail'],
    color: '#6366F1',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
];

/* ── 개별 솔루션 섹션 ─────────────────────────────────────────────── */

function SolutionSection({ item, index }: { item: typeof pipeline[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="py-14 sm:py-20 lg:py-32 bg-white">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

          {/* 텍스트 */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 min-w-0"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl font-semibold tracking-tighter" style={{ color: item.color, opacity: 0.18 }}>
                {item.step}
              </span>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: item.color + '18' }}>
                <div className="scale-75" style={{ color: item.color }}>{item.icon}</div>
              </div>
              <span className="text-sm font-semibold" style={{ color: item.color }}>
                {item.key}
              </span>
            </div>

            <h2
              className="font-bold text-[#191F28] leading-[1.2] mb-3 sm:mb-4 tracking-tight"
              style={{ fontSize: 'clamp(1.25rem, 3vw, 2.25rem)' }}
            >
              {lang === 'ko' ? item.titleKo : item.titleEn}
            </h2>

            <p className="text-[16px] text-[#4E5968] leading-relaxed mb-3">
              {lang === 'ko' ? item.descKo : item.descEn}
            </p>
            <p className="text-[15px] text-[#8B95A1] leading-relaxed mb-6">
              {lang === 'ko' ? item.detailKo : item.detailEn}
            </p>

            <ul className="space-y-2.5 mb-8">
              {(lang === 'ko' ? item.featuresKo : item.featuresEn).map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: item.color + '18' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  </div>
                  <span className="text-sm text-[#4E5968] font-medium">{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 text-[14px] font-semibold transition-all hover:gap-3"
              style={{ color: item.color }}
            >
              {lang === 'ko' ? '자세히 보기' : 'Learn more'}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>

          {/* 목업 */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 w-full sm:w-[340px] lg:w-[380px]"
          >
            <MockupFrame gradient={gradients[index]}>
              {mockups[index]}
            </MockupFrame>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

/* ── 메인 컴포넌트 ─────────────────────────────────────────────────── */

export function Solution() {
  const { lang } = useLanguage();
  const pipelineRef = useRef<HTMLDivElement>(null);
  const pipelineInView = useInView(pipelineRef, { once: true, margin: '-80px' });

  return (
    <div id="solution">

      {/* ── Pipeline Overview ────────────────────────────────────── */}
      <div ref={pipelineRef} className="bg-white py-14 sm:py-20 lg:py-32 snap-start">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* 솔루션 헤딩 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <p className="text-sm font-semibold text-[#448CFF] tracking-wide uppercase mb-3">
              Solution
            </p>
            <h2
              className="text-[#191F28] tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', lineHeight: 1.3 }}
            >
              {lang === 'ko' ? (
                <>
                  <span className="font-bold">From Voice to Action</span>
                  <br />
                  <span className="text-[#4E5968]" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                    하나의 AX 인프라로 연결합니다
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold">From Voice to Action</span>
                  <br />
                  <span className="text-[#4E5968]" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                    Connected through one AX infrastructure
                  </span>
                </>
              )}
            </h2>
          </motion.div>

          {/* 파이프라인 플로우 — 데스크탑 */}
          <div className="hidden lg:flex items-start justify-between max-w-[1100px] mx-auto relative">
            <div className="absolute top-8 left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] h-px border-t-2 border-dashed border-[#D1D5DB]" />
            {pipeline.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="flex flex-col items-center text-center w-1/4 relative z-10"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white mb-4"
                  style={{ background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}aa 100%)` }}>
                  {item.icon}
                </div>
                <span className="text-[18px] font-bold text-[#191F28] mb-1">{item.key}</span>
                <span className="text-[13px] text-[#8B95A1]">
                  {lang === 'ko' ? item.labelKo : item.labelEn}
                </span>
              </motion.div>
            ))}
          </div>

          {/* 파이프라인 — 모바일 */}
          <div className="lg:hidden flex flex-col items-center gap-0 max-w-sm mx-auto">
            {pipeline.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={pipelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}aa 100%)` }}>
                    <div className="scale-75">{item.icon}</div>
                  </div>
                  <div>
                    <span className="text-[15px] font-bold text-[#191F28]">{item.key}</span>
                    <p className="text-[12px] text-[#8B95A1]">
                      {lang === 'ko' ? item.labelKo : item.labelEn}
                    </p>
                  </div>
                </div>
                {i < pipeline.length - 1 && (
                  <div className="w-px h-6 border-l-2 border-dashed border-[#D1D5DB] ml-6" />
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* ── 4개 개별 솔루션 섹션 ─────────────────────────────────── */}
      {pipeline.map((item, i) => (
        <SolutionSection key={item.key} item={item} index={i} />
      ))}

    </div>
  );
}
