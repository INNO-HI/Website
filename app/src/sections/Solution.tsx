import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, Database, LineChart, Workflow } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// ── 휴대폰 목업 콘텐츠 ────────────────────────────────────────────────

function MockVoice() {
  const { lang } = useLanguage();
  return (
    <div className="h-full bg-white flex flex-col px-4 pt-4 pb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#444B52]">
          {lang === 'ko' ? '음성 인식 중' : 'Voice Recognition'}
        </span>
        <div className="flex gap-1">
          {[1,2,3].map(i => (
            <motion.div key={i} className="w-1 rounded-full bg-[#448CFF]"
              animate={{ height: [8, 18, 8] }}
              transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity }} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-0.5 h-14 mb-4">
        {Array.from({ length: 32 }).map((_, i) => (
          <motion.div key={i}
            className="w-1 rounded-full bg-[#448CFF]"
            style={{ opacity: 0.3 + (i % 5) * 0.15 }}
            animate={{ height: [4, Math.random() * 36 + 8, 4] }}
            transition={{ duration: 0.5 + (i % 3) * 0.2, delay: i * 0.03, repeat: Infinity }} />
        ))}
      </div>
      <div className="bg-[#F8F9FD] rounded-xl p-3 mb-3">
        <p className="text-[11px] text-[#444B52] leading-relaxed">
          {lang === 'ko'
            ? '"오늘 오전 홍길동 어르신 방문 상담 완료. 혈압 정상, 식사 보조 필요 확인됨."'
            : '"Morning visit with Mr. Hong completed. BP normal, meal assistance needed."'}
        </p>
        <div className="flex items-center gap-1 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[9px] text-emerald-500 font-medium">
            {lang === 'ko' ? '98.5% 정확도' : '98.5% Accuracy'}
          </span>
        </div>
      </div>
      <div className="space-y-1.5">
        {(lang === 'ko'
          ? [['이름', '홍길동'], ['상태', '정상'], ['조치', '식사 보조']]
          : [['Name', 'Hong G.D.'], ['Status', 'Normal'], ['Action', 'Meal Assist']]
        ).map(([k, v]) => (
          <div key={k} className="flex items-center gap-2">
            <span className="text-[9px] font-medium text-[#777A86] w-10">{k}</span>
            <span className="text-[10px] font-semibold text-[#444B52] bg-[#ECF1FD] px-2 py-0.5 rounded-md">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockWorkflow() {
  const { lang } = useLanguage();
  const steps = lang === 'ko'
    ? ['접수', '분류', '배정', '처리', '완료']
    : ['Intake', 'Sort', 'Assign', 'Process', 'Done'];
  const cases = lang === 'ko'
    ? [
        { id: '#2841', name: '이○○ 어르신', type: '긴급 방문', status: '처리중', color: 'sky' },
        { id: '#2842', name: '김○○ 어르신', type: '서비스 신청', status: '배정완료', color: 'blue' },
        { id: '#2843', name: '박○○ 어르신', type: '정기 상담', status: '완료', color: 'green' },
      ]
    : [
        { id: '#2841', name: 'Lee ○○', type: 'Urgent Visit', status: 'Active', color: 'sky' },
        { id: '#2842', name: 'Kim ○○', type: 'Service Req.', status: 'Assigned', color: 'blue' },
        { id: '#2843', name: 'Park ○○', type: 'Consultation', status: 'Done', color: 'green' },
      ];
  return (
    <div className="h-full bg-white flex flex-col px-4 pt-4 pb-4">
      <p className="text-xs font-semibold text-[#444B52] mb-3">
        {lang === 'ko' ? '자동화 워크플로우' : 'Automation Workflow'}
      </p>
      <div className="relative mb-4">
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <motion.div
                className="flex flex-col items-center flex-shrink-0"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-semibold ${i < 3 ? 'bg-[#448CFF] text-white' : i === 3 ? 'bg-[#60A5FA] text-white' : 'bg-[#F8F9FD] text-[#777A86] border border-[#D3D8DF]'}`}>
                  {i < 3 ? '✓' : i + 1}
                </div>
                <span className="text-[8px] text-[#777A86] mt-1">{s}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div className="flex-1 h-0.5 bg-[#448CFF] mx-0.5"
                  style={{ opacity: i < 3 ? 1 : 0.2 }}
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.1 }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2 flex-1">
        {cases.map(({ id, name, type, status, color }) => (
          <div key={id} className="flex items-center gap-2 p-2 bg-[#F8F9FD] rounded-lg">
            <div className={`w-1.5 h-6 rounded-full flex-shrink-0 ${color === 'sky' ? 'bg-[#60A5FA]' : color === 'blue' ? 'bg-[#448CFF]' : 'bg-emerald-400'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-semibold text-[#444B52] truncate">{name}</p>
              <p className="text-[8px] text-[#777A86]">{type}</p>
            </div>
            <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-md ${color === 'sky' ? 'bg-sky-50 text-[#60A5FA]' : color === 'blue' ? 'bg-blue-50 text-[#448CFF]' : 'bg-emerald-50 text-emerald-600'}`}>
              {status}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-center">
        <span className="text-[9px] font-semibold text-[#448CFF] bg-[#ECF1FD] px-2 py-0.5 rounded-full">
          {lang === 'ko' ? '90% 자동화율' : '90% Automated'}
        </span>
      </div>
    </div>
  );
}

// ── 브라우저 창 목업 (Sol 02 — 데이터 구조화) ─────────────────────────

function MockDataBrowser() {
  const { lang } = useLanguage();
  const rows = lang === 'ko'
    ? [
        { field: '성명', value: '박○○', tag: '완료', tagColor: '#448CFF' },
        { field: '나이', value: '65세', tag: '완료', tagColor: '#448CFF' },
        { field: '가구', value: '독거', tag: '분류됨', tagColor: '#3B82F6' },
        { field: '수급', value: '기초수급자', tag: '분류됨', tagColor: '#3B82F6' },
        { field: '서비스', value: '이동지원·정기방문', tag: '생성됨', tagColor: '#38BDF8' },
        { field: '위험도', value: '보통', tag: '산출됨', tagColor: '#93C5FD' },
      ]
    : [
        { field: 'Name', value: 'Park ○○', tag: 'Done', tagColor: '#448CFF' },
        { field: 'Age', value: '65', tag: 'Done', tagColor: '#448CFF' },
        { field: 'Household', value: 'Alone', tag: 'Sorted', tagColor: '#3B82F6' },
        { field: 'Benefits', value: 'Basic', tag: 'Sorted', tagColor: '#3B82F6' },
        { field: 'Service', value: 'Transport · Visit', tag: 'Created', tagColor: '#38BDF8' },
        { field: 'Risk', value: 'Moderate', tag: 'Scored', tagColor: '#93C5FD' },
      ];
  return (
    <div className="h-full bg-white flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-[#444B52]">
          {lang === 'ko' ? 'AI 자동 구조화 결과' : 'AI Auto-Structuring'}
        </span>
        <span className="text-[9px] font-medium text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
          {lang === 'ko' ? '처리 완료' : 'Done'}
        </span>
      </div>
      <div className="bg-[#F8F9FD] rounded-lg p-2.5 text-[10px] text-[#777A86] leading-relaxed mb-3">
        <span className="text-[#9CA3AF] text-[9px]">{lang === 'ko' ? '[원문]' : '[Source]'}</span>{' '}
        {lang === 'ko'
          ? '이용자 박○○, 65세 여, 독거, 기초수급, 이동불편, 정기방문 필요'
          : 'User Park ○○, 65F, alone, basic benefits, mobility issues, visits needed'}
      </div>
      <div className="flex-1 overflow-hidden">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-[#EAEDF2]">
              <th className="text-left text-[#777A86] font-medium pb-1.5 w-16">
                {lang === 'ko' ? '필드' : 'Field'}
              </th>
              <th className="text-left text-[#777A86] font-medium pb-1.5">
                {lang === 'ko' ? '추출값' : 'Value'}
              </th>
              <th className="text-right text-[#777A86] font-medium pb-1.5">
                {lang === 'ko' ? '상태' : 'Status'}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr key={r.field}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="border-b border-[#F4F5F7]"
              >
                <td className="py-1.5 text-[#777A86] font-medium">{r.field}</td>
                <td className="py-1.5 font-semibold text-[#444B52]">{r.value}</td>
                <td className="py-1.5 text-right">
                  <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ color: r.tagColor, background: r.tagColor + '15' }}>
                    {r.tag}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[9px] text-[#9CA3AF]">
          {lang === 'ko' ? '처리 시간: 0.8초' : 'Time: 0.8s'}
        </span>
        <span className="text-[9px] font-semibold text-emerald-500">
          {lang === 'ko' ? '85% 시간 절감' : '85% Time Saved'}
        </span>
      </div>
    </div>
  );
}

// ── 대시보드 플로팅 카드 (Sol 03 — 예측 분석) ─────────────────────────

function DashboardCards() {
  const { lang } = useLanguage();
  const bars = [42, 58, 45, 73, 61, 88, 76, 95];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 메인 차트 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-0 top-4 w-56 bg-white rounded-2xl border border-[#EAEDF2] shadow-lg p-4"
        style={{ boxShadow: '0 12px 40px rgba(68,140,255,0.12)' }}
      >
        <p className="text-[11px] font-semibold text-[#444B52] mb-2">
          {lang === 'ko' ? '실시간 위험 모니터링' : 'Real-time Risk Monitor'}
        </p>
        <div className="flex items-end gap-1 h-20 mb-2">
          {bars.map((h, i) => (
            <motion.div key={i} className="flex-1 rounded-t-sm"
              style={{ background: h > 80 ? '#1D4ED8' : h > 60 ? '#60A5FA' : '#93C5FD' }}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: i * 0.06 }} />
          ))}
        </div>
        <div className="flex gap-2">
          {(lang === 'ko'
            ? [['높음', '#1D4ED8'], ['주의', '#60A5FA'], ['정상', '#93C5FD']]
            : [['High', '#1D4ED8'], ['Mid', '#60A5FA'], ['Normal', '#93C5FD']]
          ).map(([l, c]) => (
            <div key={l} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ background: c }} />
              <span className="text-[8px] text-[#777A86]">{l}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 위험 케이스 카드 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute right-0 top-0 w-44 bg-white rounded-2xl border border-[#EAEDF2] p-3"
        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      >
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
          <span className="text-[10px] font-semibold text-[#1D4ED8]">
            {lang === 'ko' ? '주의 케이스 3건' : '3 Alert Cases'}
          </span>
        </div>
        {(lang === 'ko'
          ? ['이○○ (87세)', '박○○ (74세)', '최○○ (81세)']
          : ['Lee ○○ (87)', 'Park ○○ (74)', 'Choi ○○ (81)']
        ).map((name, i) => (
          <div key={i} className="flex items-center gap-2 py-1 border-b border-[#F4F5F7] last:border-0">
            <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-[7px] font-semibold text-[#60A5FA]">{i + 1}</span>
            </div>
            <span className="text-[9px] text-[#444B52] font-medium">{name}</span>
          </div>
        ))}
      </motion.div>

      {/* 효율 지표 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute right-4 bottom-4 w-40 bg-[#EEF4FF] rounded-2xl p-3"
      >
        <p className="text-[9px] text-[#448CFF] font-semibold mb-1.5">
          {lang === 'ko' ? '전월 대비' : 'vs Last Month'}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold text-[#448CFF]">+32%</span>
          <span className="text-[10px] text-[#448CFF]">
            {lang === 'ko' ? '효율' : 'Efficiency'}
          </span>
        </div>
        <p className="text-[8px] text-[#777A86] mt-1">
          {lang === 'ko' ? '예측 정확도 94.2%' : 'Accuracy 94.2%'}
        </p>
      </motion.div>

      {/* AI 처리 카드 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute left-4 bottom-6 w-36 bg-white rounded-xl border border-[#EAEDF2] p-3"
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[9px] font-semibold text-emerald-500">
            {lang === 'ko' ? 'AI 분석 중' : 'AI Analyzing'}
          </span>
        </div>
        <span className="text-[8px] text-[#777A86]">
          {lang === 'ko' ? '127건 실시간 처리' : '127 records real-time'}
        </span>
      </motion.div>
    </div>
  );
}

// ── 휴대폰 프레임 ─────────────────────────────────────────────────────

function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative select-none" style={{ width: 240, height: 480 }}>
      <div
        className="absolute inset-0 rounded-[40px]"
        style={{
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 60%, #111 100%)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      />
      <div className="absolute left-0 top-[28%] w-[3px] h-10 bg-[#333] rounded-r-sm -translate-x-[3px]" />
      <div className="absolute left-0 top-[40%] w-[3px] h-7 bg-[#333] rounded-r-sm -translate-x-[3px]" />
      <div className="absolute right-0 top-[35%] w-[3px] h-12 bg-[#333] rounded-l-sm translate-x-[3px]" />
      <div
        className="absolute overflow-hidden bg-white"
        style={{ inset: 8, borderRadius: 34 }}
      >
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-black rounded-[12px] z-10" />
        <div className="absolute inset-0 pt-10 overflow-hidden">
          {children}
        </div>
      </div>
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/40 rounded-full" />
    </div>
  );
}

// ── 브라우저 프레임 ────────────────────────────────────────────────────

function BrowserMockup({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative select-none rounded-2xl overflow-hidden"
      style={{
        width: 380,
        maxWidth: '100%',
        boxShadow: '0 32px 80px rgba(0,0,0,0.20), 0 8px 24px rgba(0,0,0,0.10)',
      }}
    >
      {/* 브라우저 타이틀바 */}
      <div className="bg-[#EBEBEB] px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-[10px] text-[#9CA3AF] text-center">
          app.innohi.ai.kr / case-manager
        </div>
      </div>
      {/* 콘텐츠 */}
      <div className="bg-white" style={{ height: 340 }}>
        {children}
      </div>
    </div>
  );
}

// ── 솔루션 데이터 ─────────────────────────────────────────────────────

type MockupType = 'phone' | 'browser' | 'dashboard';

const solutions = [
  {
    num: '01',
    icon: Mic,
    subtitleKo: 'STT & NLP',
    subtitleEn: 'STT & NLP',
    titleKo: '말하는 순간,\n데이터가 됩니다',
    titleEn: 'The moment you speak,\nit becomes data',
    descKo: '현장의 목소리를 실시간으로 인식하여 구조화된 기록으로 변환합니다.\n수기 작성 없이 대화만으로 모든 상담 내용이 시스템에 자동 입력됩니다.',
    descEn: 'Real-time voice recognition converts field conversations into structured records.\nAll consultation content is automatically entered through conversation alone.',
    featuresKo: ['실시간 전사 — 0.1초 지연', '12개 언어 동시 지원', '노이즈 환경 98.5% 정확도'],
    featuresEn: ['Real-time transcription — 0.1s delay', '12 languages simultaneously', '98.5% accuracy in noisy environments'],
    metric: '98.5%',
    metricLabelKo: '인식 정확도',
    metricLabelEn: 'Recognition Accuracy',
    accent: '#448CFF',
    bg: 'bg-[#F4F8FF]',
    mockupType: 'phone' as MockupType,
    mockupEl: <MockVoice />,
    flip: false,
  },
  {
    num: '02',
    icon: Database,
    subtitleKo: '지능형 추출',
    subtitleEn: 'Intelligent Extraction',
    titleKo: '비정형 정보를\n즉시 정돈합니다',
    titleEn: 'Unstructured data,\ninstantly organized',
    descKo: '메모, 음성, 서류 등 어떤 형태로 들어와도\nAI가 자동으로 분류하고 필요한 필드를 추출합니다.\n업무 시간의 85%를 단순 입력에서 해방시킵니다.',
    descEn: 'No matter the format — notes, voice, documents —\nAI automatically classifies and extracts the necessary fields.\nFrees 85% of work time from manual data entry.',
    featuresKo: ['자동 분류 & 개체 추출', '검증 규칙 적용', '기존 시스템 연동'],
    featuresEn: ['Auto classification & entity extraction', 'Validation rule enforcement', 'Legacy system integration'],
    metric: '85%',
    metricLabelKo: '시간 절감',
    metricLabelEn: 'Time Saved',
    accent: '#3B82F6',
    bg: 'bg-white',
    mockupType: 'browser' as MockupType,
    mockupEl: <MockDataBrowser />,
    flip: true,
  },
  {
    num: '03',
    icon: LineChart,
    subtitleKo: '인사이트 생성',
    subtitleEn: 'Insight Generation',
    titleKo: '데이터가\n미래를 예측합니다',
    titleEn: 'Data predicts\nthe future',
    descKo: '축적된 데이터에서 패턴을 학습하여\n위험 케이스를 사전에 식별합니다.\n담당자가 놓칠 수 있는 신호를 AI가 먼저 포착합니다.',
    descEn: 'Learns patterns from accumulated data\nto identify risk cases in advance.\nAI detects signals that managers might miss.',
    featuresKo: ['추세 분석 & 위험 점수화', '예측 모델 자동 업데이트', '실시간 대시보드'],
    featuresEn: ['Trend analysis & risk scoring', 'Auto-updating predictive models', 'Real-time dashboard'],
    metric: '3배',
    metricLabelKo: '더 빠른 인사이트',
    metricLabelEn: 'Faster Insights',
    accent: '#38BDF8',
    bg: 'bg-[#F4F8FF]',
    mockupType: 'dashboard' as MockupType,
    mockupEl: <DashboardCards />,
    flip: false,
  },
  {
    num: '04',
    icon: Workflow,
    subtitleKo: '정책 통합',
    subtitleEn: 'Policy Integration',
    titleKo: '인사이트가\n바로 실행됩니다',
    titleEn: 'Insights become\nimmediate action',
    descKo: '분석 결과가 담당자 배정, 알림 발송,\n문서 생성까지 자동으로 이어집니다.\n판단에서 실행까지 걸리는 시간을 90% 단축합니다.',
    descEn: 'Analysis results automatically flow to staff assignment,\nnotifications, and document generation.\nReduces time from decision to execution by 90%.',
    featuresKo: ['스마트 케이스 라우팅', '자동 에스컬레이션', '완전한 감사 추적'],
    featuresEn: ['Smart case routing', 'Auto-escalation', 'Full audit trail'],
    metric: '90%',
    metricLabelKo: '자동화율',
    metricLabelEn: 'Automation Rate',
    accent: '#93C5FD',
    bg: 'bg-white',
    mockupType: 'phone' as MockupType,
    mockupEl: <MockWorkflow />,
    flip: true,
  },
];

// ── 솔루션 블록 ──────────────────────────────────────────────────────

function SolutionBlock({ sol, index }: { sol: typeof solutions[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { lang } = useLanguage();

  const Icon = sol.icon;

  const textCol = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: sol.flip ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center py-4"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl font-semibold tracking-tighter" style={{ color: sol.accent, opacity: 0.18 }}>
          {sol.num}
        </span>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: sol.accent + '18' }}>
          <Icon className="w-4.5 h-4.5" style={{ color: sol.accent }} />
        </div>
        <span className="text-sm font-semibold" style={{ color: sol.accent }}>
          {lang === 'ko' ? sol.subtitleKo : sol.subtitleEn}
        </span>
      </div>

      <h2
        className="font-semibold text-[#444B52] leading-[1.2] mb-3 whitespace-pre-line tracking-tight"
        style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}
      >
        {lang === 'ko' ? sol.titleKo : sol.titleEn}
      </h2>

      <p className="text-[15px] text-[#4B4E56] leading-relaxed mb-5 max-w-md whitespace-pre-line font-medium">
        {lang === 'ko' ? sol.descKo : sol.descEn}
      </p>

      <ul className="space-y-2.5 mb-5">
        {(lang === 'ko' ? sol.featuresKo : sol.featuresEn).map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: sol.accent + '18' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: sol.accent }} />
            </div>
            <span className="text-sm text-[#4B4E56] font-medium">{f}</span>
          </li>
        ))}
      </ul>

      <div className="inline-flex items-baseline gap-2">
        <span className="text-5xl font-semibold tracking-tighter" style={{ color: sol.accent }}>
          {sol.metric}
        </span>
        <span className="text-sm font-medium text-[#777A86]">
          {lang === 'ko' ? sol.metricLabelKo : sol.metricLabelEn}
        </span>
      </div>
    </motion.div>
  );

  const mockupCol = (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-center py-8"
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-20 scale-110"
          style={{ background: sol.accent }}
        />
        {sol.mockupType === 'phone' && (
          <PhoneMockup>{sol.mockupEl}</PhoneMockup>
        )}
        {sol.mockupType === 'browser' && (
          <BrowserMockup>{sol.mockupEl}</BrowserMockup>
        )}
        {sol.mockupType === 'dashboard' && (
          <div className="relative" style={{ width: 380, height: 300 }}>
            {sol.mockupEl}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <section key={index} className={`${sol.bg} py-24 lg:py-36`} id={index === 0 ? 'solution' : undefined}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${sol.flip ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
          {textCol}
          {mockupCol}
        </div>
      </div>
    </section>
  );
}

// ── 중간 CTA ──────────────────────────────────────────────────────────

function MidCTA({ lang }: { lang: 'ko' | 'en' }) {
  return (
    <div className="bg-white py-12 border-y border-[#EAEDF2]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <p className="text-sm font-semibold text-[#448CFF] mb-3">
          {lang === 'ko' ? '실제 사례가 궁금하신가요?' : 'Curious about real results?'}
        </p>
        <h3 className="text-lg sm:text-xl font-semibold text-[#444B52] mb-5">
          {lang === 'ko'
            ? '공공·의료·복지 기관의 실제 도입 사례를 확인하세요'
            : 'Explore real deployment cases from public, healthcare & welfare organizations'}
        </h3>
        <motion.a
          href="/cases"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#448CFF] text-[#448CFF] font-semibold text-sm hover:bg-[#448CFF] hover:text-white transition-all duration-200"
        >
          {lang === 'ko' ? '도입 사례 보기' : 'View Case Studies'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
}

// ── 솔루션 앞 브리지 (글라스모피즘) ────────────────────────────────────

function SolutionBridge({ lang }: { lang: 'ko' | 'en' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative bg-gradient-to-b from-white via-[#F4F8FF] to-white py-24 lg:py-32 overflow-hidden">
      {/* 배경 블러 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: '#C7DEFF', filter: 'blur(100px)', opacity: 0.15 }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold text-[#448CFF] tracking-widest uppercase mb-10"
        >
          {lang === 'ko' ? '이노하이 솔루션' : 'INNO-HI Solution'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-3xl px-10 py-12 lg:px-16 lg:py-16 mx-auto"
          style={{
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(28px)',
            border: '1.5px solid rgba(255,255,255,0.95)',
            boxShadow: '0 24px 80px rgba(68,140,255,0.12), 0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-semibold text-[#444B52] leading-[1.18] tracking-tight mb-7"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}
          >
            {lang === 'ko' ? (
              <>
                흩어진 업무를<br />
                <span className="gradient-text">하나의 AX 인프라</span>로 연결하세요.
              </>
            ) : (
              <>
                Connect scattered work into<br />
                <span className="gradient-text">one AX infrastructure</span>.
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[17px] text-[#4B4E56] max-w-2xl mx-auto leading-relaxed font-medium mb-10"
          >
            {lang === 'ko' ? (
              <>
                말과 기록으로 남아 있던 현장의 데이터,<br />
                이노하이가 자동으로 구조화하고 실행까지 이어드립니다.<br />
                이제 사람은 더 중요한 일에 집중할 수 있습니다.
              </>
            ) : (
              <>
                Field data trapped in speech and notes —<br />
                INNO-HI automatically structures it and drives action.<br />
                Now people can focus on what truly matters.
              </>
            )}
          </motion.p>

          {/* 핵심 지표 3개 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 lg:gap-8"
          >
            {[
              { value: '98.5%', labelKo: '인식 정확도', labelEn: 'Recognition Accuracy' },
              { value: '85%', labelKo: '시간 절감', labelEn: 'Time Saved' },
              { value: '90%', labelKo: '자동화율', labelEn: 'Automation Rate' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-semibold text-[#448CFF] tracking-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
                  {stat.value}
                </p>
                <p className="text-sm text-[#777A86] font-medium mt-1">
                  {lang === 'ko' ? stat.labelKo : stat.labelEn}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────

export function Solution() {
  const { lang } = useLanguage();

  return (
    <div id="solution">
      <SolutionBridge lang={lang} />
      {solutions.map((sol, i) => (
        <span key={sol.num}>
          <SolutionBlock sol={sol} index={i} />
          {i === 2 && <MidCTA lang={lang} />}
        </span>
      ))}
    </div>
  );
}
