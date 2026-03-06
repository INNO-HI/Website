import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, User, Search, FileText, CheckCircle2, Mic } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

/* ── 채팅 목업 (메신저 스타일) ────────────────────────────────────── */

function ChatMockup() {
  const messages = [
    { role: 'user', text: '오늘 방문한 대상자 상담 기록 정리해줘' },
    { role: 'ai', text: '네, 오늘 14시에 진행된 김OO님 상담 기록을 정리했습니다. 주요 내용은 수면 장애 호소, 복지 서비스 연계 요청입니다.' },
    { role: 'user', text: '보고서 양식으로 변환해줘' },
    { role: 'ai', text: '상담 보고서를 생성했습니다. 확인 후 제출하시겠습니까?' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E5E8EB] overflow-hidden shadow-sm h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 bg-[#F8F9FA] border-b border-[#E5E8EB]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#448CFF] to-[#7C5CFC] flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-[12px] font-semibold text-[#191F28] block leading-tight">INNOHI AI</span>
          <span className="text-[10px] text-[#22C55E] font-medium">온라인</span>
        </div>
      </div>
      {/* 메시지 */}
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
            {msg.role === 'ai' && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#448CFF] to-[#7C5CFC] flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[11px] leading-[1.6] ${
                msg.role === 'user'
                  ? 'bg-[#448CFF] text-white rounded-br-md'
                  : 'bg-[#F1F3F5] text-[#4E5968] rounded-bl-md'
              }`}
              style={{ wordBreak: 'keep-all' }}
            >
              {msg.text}
            </div>
            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-[#E5E8EB] flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3 h-3 text-[#8B95A1]" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* 입력창 */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#E5E8EB] bg-[#F8F9FA]">
          <Mic className="w-4 h-4 text-[#8B95A1]" />
          <span className="text-[11px] text-[#8B95A1] flex-1">메시지를 입력하세요...</span>
          <div className="w-6 h-6 rounded-full bg-[#448CFF] flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 모바일 채팅 목업 (하단 카드용) ───────────────────────────────── */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[240px] mx-auto">
      {/* 폰 프레임 */}
      <div className="bg-[#1A1A1A] rounded-[30px] p-[7px] shadow-xl">
        {/* 노치 */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[14px] bg-[#1A1A1A] rounded-b-xl z-10 flex items-center justify-center">
            <div className="w-8 h-[4px] bg-[#333] rounded-full" />
          </div>
        </div>
        {/* 스크린 */}
        <div className="bg-white rounded-[22px] overflow-hidden">
          {/* 상태 바 */}
          <div className="h-7 bg-white flex items-end justify-between px-4 pb-0.5">
            <span className="text-[8px] font-semibold text-[#1A1A1A]">9:41</span>
            <div className="flex items-center gap-1">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="#1A1A1A"><rect x="0" y="5" width="2" height="3" rx="0.5"/><rect x="3" y="3" width="2" height="5" rx="0.5"/><rect x="6" y="1" width="2" height="7" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5" opacity="0.3"/></svg>
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><rect x="0.5" y="0.5" width="14" height="7" rx="1.5" stroke="#1A1A1A" strokeWidth="0.8"/><rect x="15" y="2.5" width="1" height="3" rx="0.5" fill="#1A1A1A"/><rect x="1.5" y="1.5" width="10" height="5" rx="1" fill="#1A1A1A"/></svg>
            </div>
          </div>
          {children}
        </div>
        {/* 홈 인디케이터 */}
        <div className="flex justify-center pt-1.5 pb-0.5">
          <div className="w-10 h-[3px] bg-[#555] rounded-full" />
        </div>
      </div>
    </div>
  );
}

function MobileChatMockup() {
  return (
    <PhoneFrame>
      {/* 앱 헤더 */}
      <div className="px-3 py-2 border-b border-[#F1F3F5] flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#448CFF] to-[#7C5CFC] flex items-center justify-center">
          <Search className="w-2.5 h-2.5 text-white" />
        </div>
        <span className="text-[9px] font-semibold text-[#191F28]">INNOHI Knowledge</span>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E5E8EB] bg-[#F8F9FA]">
          <Search className="w-3 h-3 text-[#8B95A1]" />
          <span className="text-[9px] text-[#4E5968]">긴급복지 신청 자격은?</span>
        </div>
        <div className="rounded-lg bg-[#EFF6FF] p-2.5">
          <p className="text-[9px] text-[#4E5968] leading-[1.6]">긴급복지지원법 제5조에 따라 위기 상황 시 신청 가능합니다.</p>
          <div className="flex items-center gap-1 mt-1.5">
            <CheckCircle2 className="w-2.5 h-2.5 text-[#3B82F6]" />
            <span className="text-[8px] text-[#3B82F6]">출처 확인됨</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function MobileWorkflowMockup() {
  return (
    <PhoneFrame>
      {/* 앱 헤더 */}
      <div className="px-3 py-2 border-b border-[#F1F3F5] flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
          <FileText className="w-2.5 h-2.5 text-white" />
        </div>
        <span className="text-[9px] font-semibold text-[#191F28]">INNOHI Workflow</span>
      </div>
      <div className="p-3 space-y-2">
        {['상담 기록 완료', '보고서 생성', '서식 자동 작성'].map((s, j) => (
          <div key={j} className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
            <span className="text-[9px] text-[#191F28] font-medium">{s}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#D1D5DB] shrink-0" />
          <span className="text-[9px] text-[#8B95A1]">후속 일정 등록</span>
        </div>
        <div className="flex gap-1.5 mt-1">
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#6366F1]/10 text-[#6366F1] font-medium flex items-center gap-0.5">
            <FileText className="w-2 h-2" />보고서.pdf
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ── 메인 컴포넌트 ─────────────────────────────────────────────────── */

export function AIConsulting() {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-36 overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-[1300px] mx-auto px-5 sm:px-8 lg:px-14">

        {/* 라벨 + 헤드라인 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className="font-bold text-[#191F28] tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', lineHeight: 1.3 }}
          >
            {lang === 'ko' ? 'AI로 현장 업무를 효율적으로' : 'Streamline field work with AI'}
          </h2>
          <p
            className="text-[#8B95A1] mt-4 max-w-lg mx-auto leading-relaxed"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', wordBreak: 'keep-all' }}
          >
            {lang === 'ko'
              ? '상담, 기록, 분석, 보고까지 현장에서 반복되는 업무를 자동화합니다.'
              : 'Automate repetitive field tasks from consulting, recording, analysis, to reporting.'}
          </p>
        </motion.div>

        {/* ── 메인 카드 (채팅 + 설명) ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl border border-[#448CFF]/15 shadow-lg p-5 sm:p-8 mb-6 sm:mb-8"
          style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F0F4FF 50%, #F5F3FF 100%)' }}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* 채팅 목업 */}
            <div className="w-full lg:w-[480px] shrink-0 h-[340px] sm:h-[380px]">
              <ChatMockup />
            </div>
            {/* 설명 */}
            <div className="flex-1 min-w-0">
              <h3
                className="text-[22px] sm:text-[28px] font-bold text-[#191F28] tracking-tight mb-5"
                style={{ wordBreak: 'keep-all' }}
              >
                {lang === 'ko' ? '사람과 대화하듯이 편하게' : 'As easy as talking to a person'}
              </h3>
              <p
                className="text-[15px] sm:text-[17px] text-[#6B7280] leading-[1.8] whitespace-pre-line"
                style={{ wordBreak: 'keep-all' }}
              >
                {lang === 'ko'
                  ? '자연스러운 음성 대화를 통해\n현장에서 필요한 정보를 빠르게 확인하고\n업무 내용을 자동으로 기록합니다.'
                  : 'Through natural voice conversation,\nquickly access the information you need\nand automatically record your work.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 하단 2열 카드 — 가로 레이아웃 ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* 카드 1 — Knowledge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl border border-[#3B82F6]/15 shadow-sm overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F0F4FF 100%)' }}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch sm:min-h-[340px]">
              <div className="flex-1 p-6 sm:p-8 sm:py-12 flex flex-col justify-center">
                <h3
                  className="text-[18px] sm:text-[22px] font-bold text-[#191F28] tracking-tight mb-3"
                  style={{ wordBreak: 'keep-all' }}
                >
                  {lang === 'ko' ? '무엇을 물어봐도 정확하게' : 'Accurate answers to any question'}
                </h3>
                <p
                  className="text-[14px] sm:text-[15px] text-[#6B7280] leading-[1.8] whitespace-pre-line"
                  style={{ wordBreak: 'keep-all' }}
                >
                  {lang === 'ko'
                    ? '이노하이 AI 시스템은\n내부 문서와 데이터를 기반으로\n질문 의도를 이해하고\n필요한 정보를 제공합니다.'
                    : 'INNOHI AI system understands\nquestion intent based on internal\ndocuments and data, providing\nthe information you need.'}
                </p>
              </div>
              <div className="w-full sm:w-[280px] shrink-0 flex items-end justify-center pt-4 sm:pt-6 -mb-10">
                <MobileChatMockup />
              </div>
            </div>
          </motion.div>

          {/* 카드 2 — Workflow */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-3xl border border-[#6366F1]/15 shadow-sm overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #EEF2FF 100%)' }}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch sm:min-h-[340px]">
              <div className="flex-1 p-6 sm:p-8 sm:py-12 flex flex-col justify-center">
                <h3
                  className="text-[18px] sm:text-[22px] font-bold text-[#191F28] tracking-tight mb-3"
                  style={{ wordBreak: 'keep-all' }}
                >
                  {lang === 'ko' ? '현장 업무를 자동으로 정리' : 'Auto-organize field work'}
                </h3>
                <p
                  className="text-[14px] sm:text-[15px] text-[#6B7280] leading-[1.8] whitespace-pre-line"
                  style={{ wordBreak: 'keep-all' }}
                >
                  {lang === 'ko'
                    ? '대화 내용과 업무 기록을\n자동으로 정리하여 보고서와\n문서 작성까지 지원합니다.'
                    : 'Automatically organizes conversations\nand work records, supporting\nreport and document creation.'}
                </p>
              </div>
              <div className="w-full sm:w-[280px] shrink-0 flex items-end justify-center pt-4 sm:pt-6 -mb-10">
                <MobileWorkflowMockup />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
