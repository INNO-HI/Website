import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mic, BookOpen, Workflow, Search, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

/* ── 목업: Voice AI — 음성 → 텍스트 변환 화면 ────────────────────── */

function MockVoice() {
  return (
    <div className="h-full flex items-end justify-center -mb-16">
      <div className="w-[260px]">
        <div className="bg-[#1A1A1A] rounded-[30px] p-[7px] shadow-2xl">
          {/* 다이나믹 아일랜드 */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[16px] bg-[#1A1A1A] rounded-b-xl z-10 flex items-center justify-center">
              <div className="w-10 h-[5px] bg-[#333] rounded-full" />
            </div>
          </div>
          {/* 스크린 */}
          <div className="bg-white rounded-[24px] overflow-hidden">
            {/* 상태 바 */}
            <div className="h-8 bg-white flex items-end justify-between px-5 pb-0.5">
              <span className="text-[9px] font-semibold text-[#1A1A1A]">9:41</span>
              <div className="flex items-center gap-1">
                <svg width="14" height="9" viewBox="0 0 12 8" fill="#1A1A1A"><rect x="0" y="5" width="2" height="3" rx="0.5"/><rect x="3" y="3" width="2" height="5" rx="0.5"/><rect x="6" y="1" width="2" height="7" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5" opacity="0.3"/></svg>
                <svg width="18" height="9" viewBox="0 0 16 8" fill="none"><rect x="0.5" y="0.5" width="14" height="7" rx="1.5" stroke="#1A1A1A" strokeWidth="0.8"/><rect x="15" y="2.5" width="1" height="3" rx="0.5" fill="#1A1A1A"/><rect x="1.5" y="1.5" width="10" height="5" rx="1" fill="#1A1A1A"/></svg>
              </div>
            </div>
            {/* 앱 헤더 */}
            <div className="px-4 py-2.5 border-b border-[#F1F3F5] flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#448CFF] to-[#5B9FFF] flex items-center justify-center">
                <Mic className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-semibold text-[#191F28]">INNOHI Voice</span>
            </div>
            {/* 녹음 상태 */}
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#448CFF] flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#448CFF]">녹음 중</span>
                    <div className="flex gap-[3px]">
                      {[10, 18, 8, 16, 10, 14, 8].map((h, j) => (
                        <div key={j} className="w-[3px] rounded-full bg-[#448CFF]" style={{ height: h, opacity: 0.35 + j * 0.09 }} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] text-[#8B95A1]">00:03:24</span>
                </div>
              </div>
              {/* 변환된 텍스트 */}
              <div className="rounded-xl bg-[#F8F9FA] p-3.5 space-y-2.5">
                <div className="flex gap-2">
                  <span className="text-[9px] font-semibold text-[#448CFF] shrink-0 mt-0.5">상담사</span>
                  <p className="text-[10px] text-[#4E5968] leading-[1.6]">안녕하세요, 오늘 어떤 부분이 불편하셨나요?</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-[9px] font-semibold text-[#6B7280] shrink-0 mt-0.5">대상자</span>
                  <p className="text-[10px] text-[#4E5968] leading-[1.6]">최근에 수면이 어려워서 상담 받으러 왔습니다.</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-[9px] font-semibold text-[#448CFF] shrink-0 mt-0.5">상담사</span>
                  <p className="text-[10px] text-[#4E5968] leading-[1.6]">언제부터 그런 증상이 있으셨나요?</p>
                </div>
              </div>
              {/* 태그 */}
              <div className="flex gap-1.5 flex-wrap mt-3">
                {['수면 장애', '상담 요청', '초기 면담'].map((tag) => (
                  <span key={tag} className="text-[8px] px-2.5 py-1 rounded-full bg-[#448CFF]/10 text-[#448CFF] font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          {/* 홈 인디케이터 */}
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-12 h-[4px] bg-[#555] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 목업: Knowledge AI — 문서 검색 화면 ──────────────────────────── */

function MockKnowledge() {
  return (
    <div className="bg-white rounded-xl border border-[#E5E8EB] overflow-hidden shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#F8F9FA] border-b border-[#E5E8EB]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[10px] text-[#8B95A1] font-medium">INNOHI Knowledge</span>
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* 검색창 */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E5E8EB] bg-[#F8F9FA]">
          <Search className="w-3.5 h-3.5 text-[#8B95A1]" />
          <span className="text-[11px] text-[#4E5968]">긴급복지지원 신청 자격 기준이 뭔가요?</span>
        </div>
        {/* AI 답변 */}
        <div className="flex-1 rounded-lg bg-[#EFF6FF] p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span className="text-[10px] font-semibold text-[#3B82F6]">AI 답변</span>
          </div>
          <p className="text-[11px] text-[#4E5968] leading-[1.7] mb-2">
            긴급복지지원법 제5조에 따르면, 생계곤란 등의 위기 상황에 처한 자로서 소득·재산 기준을 충족하는 경우 신청 가능합니다.
          </p>
          <div className="flex items-center gap-1.5 pt-2 border-t border-[#3B82F6]/10">
            <FileText className="w-3 h-3 text-[#3B82F6]" />
            <span className="text-[9px] text-[#3B82F6]">출처: 긴급복지지원법 제5조, 시행령 제2조</span>
          </div>
        </div>
        {/* 관련 문서 */}
        <div className="flex gap-1.5">
          {['긴급복지지원법', '시행령', '업무매뉴얼'].map((doc) => (
            <span key={doc} className="text-[9px] px-2 py-0.5 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] font-medium">{doc}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 목업: Decision AI — 풀 대시보드 화면 ─────────────────────── */

function MockDecision() {
  const bars = [28, 42, 35, 55, 48, 62, 72, 58, 80, 65];
  return (
    <div className="h-full flex items-end justify-center -mb-12">
      <div className="w-[320px] transform scale-110 origin-bottom">
        <div className="bg-white rounded-2xl shadow-2xl border border-[#38BDF8]/15 overflow-hidden">
          {/* 대시보드 헤더 */}
          <div className="px-5 py-3 bg-gradient-to-r from-[#0F172A] to-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md bg-[#38BDF8] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="0" y="0" width="4" height="4" rx="1" fill="white"/><rect x="6" y="0" width="4" height="4" rx="1" fill="white" opacity="0.6"/><rect x="0" y="6" width="4" height="4" rx="1" fill="white" opacity="0.6"/><rect x="6" y="6" width="4" height="4" rx="1" fill="white"/></svg>
              </div>
              <span className="text-[12px] font-bold text-white">INNOHI Decision</span>
            </div>
            <span className="text-[9px] text-[#94A3B8]">실시간</span>
          </div>
          {/* KPI 카드 */}
          <div className="grid grid-cols-3 gap-2 px-4 pt-4 pb-2">
            {[
              { label: '위험 감지', value: '24', unit: '건', color: '#EF4444', bg: '#FEF2F2' },
              { label: '분석 완료', value: '1,284', unit: '건', color: '#38BDF8', bg: '#F0F9FF' },
              { label: '정확도', value: '94.2', unit: '%', color: '#22C55E', bg: '#F0FDF4' },
            ].map((m) => (
              <div key={m.label} className="rounded-xl p-2.5 text-center" style={{ background: m.bg }}>
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="text-[18px] font-extrabold" style={{ color: m.color }}>{m.value}</span>
                  <span className="text-[10px] font-semibold" style={{ color: m.color }}>{m.unit}</span>
                </div>
                <div className="text-[9px] text-[#8B95A1] mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
          {/* 차트 영역 */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-[#334155]">주간 분석 추이</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <span className="text-[8px] text-[#8B95A1]">처리량</span>
              </div>
            </div>
            <div className="h-[80px] flex items-end gap-[5px] px-1 bg-[#F8FAFC] rounded-lg p-2">
              {bars.map((h, j) => (
                <div key={j} className="flex-1 rounded-t-sm transition-all" style={{
                  height: `${h}%`,
                  background: j >= bars.length - 2
                    ? 'linear-gradient(180deg, #38BDF8, #0EA5E9)'
                    : 'linear-gradient(180deg, #38BDF8' + '50, #38BDF8' + '20)',
                }} />
              ))}
            </div>
          </div>
          {/* 경고 알림 */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA]">
              <div className="w-5 h-5 rounded-full bg-[#EF4444] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
              <div>
                <span className="text-[10px] text-[#DC2626] font-bold block">위기 가구 3건 신규 감지</span>
                <span className="text-[8px] text-[#EF4444]/70">즉시 확인이 필요합니다</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 목업: Workflow AI — 노트북/컴퓨터 스타일 ─────────────────────── */

function MockWorkflow() {
  const steps = [
    { label: '상담 기록 수신', done: true },
    { label: '서식 자동 작성', done: true },
    { label: '보고서 생성', done: true },
    { label: '후속 일정 등록', done: false },
  ];
  return (
    <div className="h-full flex items-end justify-center -mb-14">
      <div className="w-[330px] transform scale-105 origin-bottom">
        {/* 노트북 스크린 */}
        <div className="bg-[#1A1A1A] rounded-t-xl p-[6px]">
          {/* 카메라 */}
          <div className="flex justify-center mb-[3px]">
            <div className="w-[5px] h-[5px] rounded-full bg-[#333]" />
          </div>
          {/* 스크린 내용 */}
          <div className="bg-white rounded-lg overflow-hidden">
            {/* 브라우저 바 */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F8F9FA] border-b border-[#E5E8EB]">
              <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
              <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
              <div className="w-2 h-2 rounded-full bg-[#28C840]" />
              <div className="flex-1 mx-2 px-2.5 py-1 rounded-md bg-white border border-[#E5E8EB] text-[8px] text-[#8B95A1]">app.innohi.ai/workflow</div>
            </div>
            {/* 앱 헤더 */}
            <div className="px-4 py-2.5 flex items-center justify-between border-b border-[#F1F3F5]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                  <Workflow className="w-3 h-3 text-white" />
                </div>
                <span className="text-[11px] font-bold text-[#191F28]">INNOHI Workflow</span>
              </div>
              <span className="text-[9px] text-[#6366F1] font-semibold">자동 처리 중</span>
            </div>
            {/* 진행률 */}
            <div className="px-4 pt-3 pb-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold text-[#334155]">전체 진행률</span>
                <span className="text-[12px] font-bold text-[#6366F1]">75%</span>
              </div>
              <div className="h-2 rounded-full bg-[#F1F3F5] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" style={{ width: '75%' }} />
              </div>
            </div>
            {/* 스텝 리스트 */}
            <div className="px-4 py-2 space-y-2">
              {steps.map((s, j) => (
                <div key={j} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: s.done ? '#F5F3FF' : '#F8F9FA' }}>
                  {s.done ? (
                    <CheckCircle2 className="w-4 h-4 text-[#6366F1] shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-[#D1D5DB] shrink-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse" />
                    </div>
                  )}
                  <span className={`text-[11px] font-medium ${s.done ? 'text-[#191F28]' : 'text-[#8B95A1]'}`}>{s.label}</span>
                  {s.done && <span className="text-[9px] text-[#22C55E] ml-auto font-semibold">완료</span>}
                  {!s.done && <span className="text-[9px] text-[#6366F1] ml-auto font-semibold animate-pulse">처리 중...</span>}
                </div>
              ))}
            </div>
            {/* 생성된 문서 */}
            <div className="px-4 pb-3 flex gap-2">
              {['상담기록.pdf', '보고서.xlsx'].map((f) => (
                <span key={f} className="text-[9px] px-2.5 py-1 rounded-lg bg-[#6366F1]/8 text-[#6366F1] font-medium flex items-center gap-1 border border-[#6366F1]/10">
                  <FileText className="w-3 h-3" />{f}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* 노트북 바닥/힌지 */}
        <div className="relative">
          <div className="h-[10px] bg-gradient-to-b from-[#C0C0C0] to-[#D4D4D4] rounded-b-[4px] mx-[-8px]" />
          <div className="h-[4px] bg-[#E5E5E5] rounded-b-lg mx-[-14px]" />
        </div>
      </div>
    </div>
  );
}

const mockups = [MockVoice, MockKnowledge, MockDecision, MockWorkflow];

/* ── 제품 데이터 ─────────────────────────────────────────────────── */

const products = [
  {
    name: 'INNOHI Voice',
    descKo: '현장의 대화를 자동으로 기록하는 음성 인식 AI 제품입니다.\n상담, 인터뷰, 민원 응대 등 다양한 현장 상황에서\n음성을 실시간으로 텍스트로 변환합니다.',
    descEn: 'A voice recognition AI product that automatically records field conversations.\nConverts speech to text in real-time across consultations,\ninterviews, and civil service interactions.',
    color: '#448CFF',
  },
  {
    name: 'INNOHI Knowledge',
    descKo: '문서를 이해하고 답을 찾는 AI 지식 검색 제품입니다.\n내부 법령, 매뉴얼, 정책 문서를 기반으로\n질문 의도를 이해하고 근거와 함께 답변을 제공합니다.',
    descEn: 'An AI knowledge search product that understands documents and finds answers.\nBased on internal regulations, manuals, and policy documents,\nit understands question intent and provides evidence-based answers.',
    color: '#3B82F6',
  },
  {
    name: 'INNOHI Decision',
    descKo: '데이터 분석을 통해 판단을 지원하는 AI 분석 제품입니다.\n대규모 데이터를 실시간으로 분석하여\n위험 신호와 중요한 패턴을 빠르게 탐지합니다.',
    descEn: 'An AI analytics product that supports decision-making through data analysis.\nAnalyzes large-scale data in real-time\nto quickly detect risk signals and critical patterns.',
    color: '#38BDF8',
  },
  {
    name: 'INNOHI Workflow',
    descKo: '기록, 보고, 문서 작성 등 반복 업무를 자동화하는 AI 제품입니다.\n상담 이후 이루어지는 행정 업무를 자동으로 정리하여\n업무 처리 시간을 크게 줄입니다.',
    descEn: 'An AI product that automates repetitive tasks like recording, reporting, and document creation.\nAutomatically organizes administrative work after consultations,\nsignificantly reducing processing time.',
    color: '#6366F1',
  },
];

/* ── 메인 컴포넌트 ─────────────────────────────────────────────────── */

export function Solution() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="solution" ref={sectionRef}>

      {/* ── 다크 히어로 ────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0F1D35 50%, #0A1628 100%)' }}>
        {/* 도트 그리드 패턴 */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        {/* 글로우 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.08] blur-[100px]" style={{ background: 'linear-gradient(135deg, #448CFF, #7C5CFC)' }} />

        <div className="relative max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-14 py-20 sm:py-28 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2
              className="font-bold text-white tracking-tight whitespace-pre-line"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', lineHeight: 1.35 }}
            >
              {lang === 'ko' ? '현장의 데이터를 분석하고\n업무 효율을 높이는 AI' : 'AI that analyzes field data\nand boosts work efficiency'}
            </h2>
          </motion.div>

          {/* 수치 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-6 sm:gap-12 lg:gap-20 mt-12 sm:mt-16"
          >
            {[
              { value: '150,000+', label: lang === 'ko' ? '데이터 분석' : 'Data analyzed' },
              { value: '90%+', label: lang === 'ko' ? 'AI 정확도' : 'AI accuracy' },
              { value: '3x', label: lang === 'ko' ? '업무속도' : 'Work speed' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-extrabold bg-clip-text text-transparent"
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    backgroundImage: 'linear-gradient(135deg, #448CFF, #7C5CFC)',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-[13px] sm:text-[15px] text-[#8B95A1] mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 제품 섹션 (흰 배경) ──────────────────────────────── */}
      <div className="bg-white py-20 sm:py-28 lg:py-36">
        <div className="max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-14">

          {/* 헤딩 + 더 알아보기 — 같은 줄 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 sm:mb-18 lg:mb-22"
          >
            <div>
              <h3
                className="font-bold text-[#191F28] tracking-tight"
                style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', lineHeight: 1.3 }}
              >
                {lang === 'ko' ? '이노하이 제품' : 'INNOHI Products'}
              </h3>
              <p
                className="text-[#8B95A1] mt-3 leading-relaxed whitespace-pre-line"
                style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)', wordBreak: 'keep-all' }}
              >
                {lang === 'ko'
                  ? '이노하이는 반복적인 현장 업무를 줄이기 위해\nAI 기술을 활용한 다양한 제품을 제공합니다.'
                  : 'INNOHI offers a range of AI products\ndesigned to reduce repetitive field work.'}
              </p>
            </div>
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center px-7 py-3 rounded-full text-[15px] font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer shrink-0 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #448CFF 0%, #7C5CFC 100%)' }}
            >
              {lang === 'ko' ? '더 알아보기' : 'Learn more'}
            </button>
          </motion.div>

          {/* ── 제품 리스트 ────────────────────────────────────────── */}
        <div className="space-y-16 lg:space-y-20">
          {products.map((product, i) => {
            const Mockup = mockups[i];
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.12 }}
                className={`group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-14`}
              >
                {/* 목업 */}
                <div className="w-full lg:w-[480px] shrink-0">
                  <div className="relative h-[320px] sm:h-[360px] rounded-2xl p-5 overflow-hidden" style={{
                    background: 'linear-gradient(135deg, #448CFF12 0%, #7C5CFC08 40%, #448CFF18 100%)',
                  }}>
                    {/* 배경 글로우 효과 */}
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full opacity-20 blur-3xl" style={{ background: 'linear-gradient(135deg, #448CFF, #7C5CFC)' }} />
                    <div className="absolute bottom-0 left-0 w-[150px] h-[150px] rounded-full opacity-10 blur-3xl" style={{ background: 'linear-gradient(135deg, #7C5CFC, #448CFF)' }} />
                    <div className="relative h-full">
                      <Mockup />
                    </div>
                  </div>
                </div>

                {/* 텍스트 */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-[22px] sm:text-[26px] font-bold text-[#191F28] tracking-tight mb-3"
                    style={{ wordBreak: 'keep-all' }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-[15px] sm:text-[16px] text-[#6B7280] leading-[1.8] whitespace-pre-line"
                    style={{ wordBreak: 'keep-all' }}
                  >
                    {lang === 'ko' ? product.descKo : product.descEn}
                  </p>
                </div>
              </motion.div>
            );
          })}
          </div>

        </div>
      </div>
    </section>
  );
}
