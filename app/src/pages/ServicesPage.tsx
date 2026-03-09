import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mic, ArrowRight, Bot, BarChart3, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

/* ══════════════════════════════════════════════════════════════════════
   목업 컴포넌트
   ══════════════════════════════════════════════════════════════════════ */

/* ── Hero 노트북 목업 ─────────────────────────────────────────────── */

function HeroLaptopMockup() {
  return (
    <div className="w-full max-w-[420px] mx-auto">
      {/* 노트북 스크린 */}
      <div className="bg-[#1A1A1A] rounded-t-xl p-[6px]">
        <div className="flex justify-center mb-[3px]">
          <div className="w-[5px] h-[5px] rounded-full bg-[#333]" />
        </div>
        <div className="bg-white rounded-lg overflow-hidden">
          {/* 브라우저 바 */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F8F9FA] border-b border-[#E5E8EB]">
            <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <div className="w-2 h-2 rounded-full bg-[#28C840]" />
            <div className="flex-1 mx-2 px-2.5 py-1 rounded-md bg-white border border-[#E5E8EB] text-[8px] text-[#8B95A1]">
              app.innohi.ai/dashboard
            </div>
          </div>

          {/* 대시보드 헤더 */}
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-[#F1F3F5]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#448CFF] to-[#6366F1] flex items-center justify-center">
                <Mic className="w-3 h-3 text-white" />
              </div>
              <span className="text-[11px] font-bold text-[#191F28]">INNOHI Voice Platform</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[9px] text-[#22C55E] font-semibold">Live</span>
            </div>
          </div>

          {/* 대시보드 콘텐츠 */}
          <div className="p-3">
            {/* KPI 행 */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: '인식률', value: '97.2%', color: '#448CFF' },
                { label: '처리 건수', value: '1,284', color: '#6366F1' },
                { label: '응답 시간', value: '85ms', color: '#22C55E' },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-lg bg-[#F8F9FA] p-2 text-center">
                  <div className="text-[14px] font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
                  <div className="text-[8px] text-[#8B95A1] mt-0.5">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* 파형 시각화 */}
            <div className="rounded-lg bg-[#F8F9FA] p-2.5 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold text-[#334155]">실시간 음성 파형</span>
                <span className="text-[8px] text-[#448CFF] font-semibold">녹음 중</span>
              </div>
              <div className="flex items-center gap-[2px] h-[32px]">
                {Array.from({ length: 32 }).map((_, i) => {
                  const h = 8 + Math.sin(i * 0.6) * 12 + Math.random() * 8;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-full bg-gradient-to-t from-[#448CFF] to-[#6366F1]"
                      style={{ height: `${Math.max(4, h)}px`, opacity: 0.4 + Math.random() * 0.6 }}
                    />
                  );
                })}
              </div>
            </div>

            {/* 트랜스크립트 */}
            <div className="rounded-lg bg-[#F8F9FA] p-2.5">
              <span className="text-[9px] font-semibold text-[#334155] block mb-2">음성 변환 결과</span>
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <span className="text-[8px] font-semibold text-[#448CFF] shrink-0">상담사</span>
                  <p className="text-[9px] text-[#4E5968] leading-[1.5]">안녕하세요, 오늘 어떤 부분이 불편하셨나요?</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-[8px] font-semibold text-[#6B7280] shrink-0">고 객</span>
                  <p className="text-[9px] text-[#4E5968] leading-[1.5]">최근에 수면이 어려워서 상담 받으러 왔습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 노트북 바닥 */}
      <div className="relative">
        <div className="h-[10px] bg-gradient-to-b from-[#C0C0C0] to-[#D4D4D4] rounded-b-[4px] mx-[-8px]" />
        <div className="h-[4px] bg-[#E5E5E5] rounded-b-lg mx-[-14px]" />
      </div>
    </div>
  );
}

/* ── STT 목업 ──────────────────────────────────────────────────────── */

function MockSTT() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] p-5 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
        {/* 헤더 */}
        <div className="px-4 py-3 border-b border-[#F1F3F5] flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#448CFF] to-[#6366F1] flex items-center justify-center">
            <Mic className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[12px] font-bold text-[#191F28]">INNOHI STT</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
            <span className="text-[9px] text-[#EF4444] font-semibold">REC</span>
          </div>
        </div>

        {/* 파형 */}
        <div className="px-4 py-3 border-b border-[#F1F3F5]">
          <div className="flex items-center gap-[2px] h-[28px]">
            {Array.from({ length: 40 }).map((_, i) => {
              const h = 6 + Math.sin(i * 0.5) * 10 + Math.cos(i * 0.3) * 6;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-full"
                  style={{
                    height: `${Math.max(3, h)}px`,
                    background: i < 28 ? '#448CFF' : '#E5E8EB',
                    opacity: i < 28 ? 0.5 + (i / 40) * 0.5 : 0.4,
                  }}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[8px] text-[#8B95A1]">00:03:24</span>
            <span className="text-[8px] text-[#8B95A1]">00:05:00</span>
          </div>
        </div>

        {/* 트랜스크립트 */}
        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          {[
            { speaker: '상담사', color: '#448CFF', text: '안녕하세요, 오늘 어떤 부분이 불편하셨나요?' },
            { speaker: '대상자', color: '#6B7280', text: '최근에 수면이 어려워서 상담 받으러 왔습니다.' },
            { speaker: '상담사', color: '#448CFF', text: '언제부터 그런 증상이 있으셨나요?' },
            { speaker: '대상자', color: '#6B7280', text: '한 달 전부터 잠들기가 어렵고 자주 깨요.' },
          ].map((msg, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-[9px] font-semibold shrink-0 mt-0.5" style={{ color: msg.color }}>{msg.speaker}</span>
              <p className="text-[10px] text-[#4E5968] leading-[1.6]">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* 태그 */}
        <div className="px-4 pb-3 flex gap-1.5 flex-wrap">
          {['수면 장애', '상담 요청', '초기 면담'].map((tag) => (
            <span key={tag} className="text-[8px] px-2 py-0.5 rounded-full bg-[#448CFF]/10 text-[#448CFF] font-medium">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Voice Bot 목업 ────────────────────────────────────────────────── */

function MockVoiceBot() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] p-5 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
        {/* 헤더 */}
        <div className="px-4 py-3 border-b border-[#F1F3F5] flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[12px] font-bold text-[#191F28]">INNOHI Voice Bot</span>
          <span className="ml-auto text-[9px] text-[#22C55E] font-semibold">응대 중</span>
        </div>

        {/* 대화 */}
        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-[#F0FDF4] px-3 py-2">
              <p className="text-[10px] text-[#166534] leading-[1.6]">안녕하세요! 이노하이 AI 상담 봇입니다. 무엇을 도와드릴까요?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-[#191F28] px-3 py-2">
              <p className="text-[10px] text-white leading-[1.6]">복지 신청 방법을 알려주세요.</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-[#F0FDF4] px-3 py-2">
              <p className="text-[10px] text-[#166534] leading-[1.6]">복지 신청은 주민센터 방문 또는 온라인 신청이 가능합니다. 자세한 절차를 안내해 드릴까요?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-[#191F28] px-3 py-2">
              <p className="text-[10px] text-white leading-[1.6]">네, 알려주세요.</p>
            </div>
          </div>
        </div>

        {/* 입력 */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8F9FA] border border-[#E5E8EB]">
            <Mic className="w-3.5 h-3.5 text-[#22C55E]" />
            <span className="text-[10px] text-[#8B95A1] flex-1">음성으로 질문하기...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Analytics 목업 ────────────────────────────────────────────────── */

function MockAnalytics() {
  const bars = [35, 52, 45, 68, 58, 72, 82, 65, 90, 78];
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] p-5 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
        {/* 헤더 */}
        <div className="px-4 py-3 border-b border-[#F1F3F5] flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
            <BarChart3 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[12px] font-bold text-[#191F28]">INNOHI Analytics</span>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-3 gap-2 px-4 pt-3 pb-2">
          {[
            { label: '총 통화', value: '2,847', color: '#F59E0B', bg: '#FFFBEB' },
            { label: '평균 시간', value: '4:32', color: '#3B82F6', bg: '#EFF6FF' },
            { label: '만족도', value: '94%', color: '#22C55E', bg: '#F0FDF4' },
          ].map((m) => (
            <div key={m.label} className="rounded-lg p-2 text-center" style={{ background: m.bg }}>
              <div className="text-[14px] font-bold" style={{ color: m.color }}>{m.value}</div>
              <div className="text-[8px] text-[#8B95A1] mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* 차트 */}
        <div className="flex-1 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-[#334155]">주간 통화 분석</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <span className="text-[8px] text-[#8B95A1]">통화량</span>
            </div>
          </div>
          <div className="h-[80px] flex items-end gap-[4px] bg-[#FFFBEB] rounded-lg p-2">
            {bars.map((h, j) => (
              <div key={j} className="flex-1 rounded-t-sm" style={{
                height: `${h}%`,
                background: j >= bars.length - 2
                  ? 'linear-gradient(180deg, #F59E0B, #D97706)'
                  : 'linear-gradient(180deg, #FCD34D80, #F59E0B30)',
              }} />
            ))}
          </div>
        </div>

        {/* 인사이트 */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FFFBEB]">
            <span className="text-[9px] text-[#92400E] font-semibold">📊 이번 주 통화량이 전주 대비 12% 증가했습니다</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Report 목업 ───────────────────────────────────────────────────── */

function MockReport() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] p-5 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
        {/* 헤더 */}
        <div className="px-4 py-3 border-b border-[#F1F3F5] flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[12px] font-bold text-[#191F28]">INNOHI Report</span>
          <span className="ml-auto text-[9px] text-[#8B5CF6] font-semibold">자동 생성</span>
        </div>

        {/* 리포트 콘텐츠 */}
        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          <div>
            <span className="text-[10px] font-bold text-[#191F28]">상담 요약 보고서</span>
            <span className="ml-2 text-[8px] text-[#8B95A1]">2024.03.08</span>
          </div>

          <div className="rounded-lg bg-[#F5F3FF] p-3">
            <span className="text-[9px] font-semibold text-[#6D28D9] block mb-1">주요 키워드</span>
            <div className="flex gap-1 flex-wrap">
              {['수면 장애', '스트레스', '상담 요청', '초기 면담', '약물 치료'].map((tag) => (
                <span key={tag} className="text-[8px] px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] font-medium">{tag}</span>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-[#F8F9FA] p-3">
            <span className="text-[9px] font-semibold text-[#334155] block mb-1">상담 요약</span>
            <p className="text-[9px] text-[#4E5968] leading-[1.6]">
              내담자는 약 1개월 전부터 수면 장애 증상을 호소하고 있으며, 직장 내 스트레스가 주요 원인으로 파악됨. 초기 면담 결과 전문 상담 연계 필요.
            </p>
          </div>

          <div className="rounded-lg bg-[#F8F9FA] p-3">
            <span className="text-[9px] font-semibold text-[#334155] block mb-1">후속 조치</span>
            <div className="space-y-1">
              {['전문 상담사 연계 예약', '수면 패턴 기록지 배부', '2주 후 경과 확인'].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#8B5CF6]" />
                  <span className="text-[9px] text-[#4E5968]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 생성된 파일 */}
        <div className="px-4 pb-3 flex gap-2">
          {['상담보고서.pdf', '분석결과.xlsx'].map((f) => (
            <span key={f} className="text-[8px] px-2 py-1 rounded-lg bg-[#8B5CF6]/8 text-[#8B5CF6] font-medium flex items-center gap-1 border border-[#8B5CF6]/10">
              <FileText className="w-3 h-3" />{f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   데이터
   ══════════════════════════════════════════════════════════════════════ */

const tabs = [
  {
    key: 'stt',
    label: 'STT',
    titleKo: '편하고 간편하게, AI STT',
    titleEn: 'Easy & Simple, AI STT',
    descKo:
      'Inno-Hi의 AI 음성 인식 엔진은\n실시간 음성을 텍스트로 변환하고\n대화 내용을 분석하여\n업무 기록을 자동으로 생성하는\nAI 기반 음성 처리 플랫폼입니다.',
    descEn:
      "Inno-Hi's AI speech recognition engine\nconverts real-time voice to text,\nanalyzes conversations,\nand automatically generates\nwork records.",
    Mockup: MockSTT,
    color: '#448CFF',
  },
  {
    key: 'voicebot',
    label: 'Voice Bot',
    titleKo: '24시간 응대하는, AI Voice Bot',
    titleEn: '24/7 Response, AI Voice Bot',
    descKo:
      'AI 음성 봇이 고객 문의를 자동으로 응대합니다.\n자연스러운 대화 흐름으로\n상담 업무를 효율화하고\n고객 만족도를 높입니다.',
    descEn:
      'AI voice bot automatically handles customer inquiries.\nWith natural conversation flow,\nit streamlines consulting\nand improves customer satisfaction.',
    Mockup: MockVoiceBot,
    color: '#22C55E',
  },
  {
    key: 'analytics',
    label: 'Voice Analytics',
    titleKo: '데이터로 보는, Voice Analytics',
    titleEn: 'Data-Driven, Voice Analytics',
    descKo:
      '음성 데이터를 분석하여\n통화 패턴, 고객 감정, 상담 품질을\n실시간으로 모니터링하고\n인사이트를 제공합니다.',
    descEn:
      'Analyzes voice data to monitor\ncall patterns, customer sentiment,\nand consultation quality\nin real-time with actionable insights.',
    Mockup: MockAnalytics,
    color: '#F59E0B',
  },
  {
    key: 'report',
    label: 'AI Report',
    titleKo: '자동으로 생성되는, AI Report',
    titleEn: 'Auto-Generated, AI Report',
    descKo:
      '상담 내용을 AI가 자동으로 분석하여\n요약 보고서, 키워드 추출,\n후속 조치 제안까지\n리포트를 자동 생성합니다.',
    descEn:
      'AI automatically analyzes consultations\nto generate summary reports,\nextract keywords,\nand suggest follow-up actions.',
    Mockup: MockReport,
    color: '#8B5CF6',
  },
];

/* ── 애니메이션 SVG 아이콘 ──────────────────────────────────────────── */

function IconTeam({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3">
        <animate attributeName="r" values="3;3.4;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
      <circle cx="5" cy="9" r="2" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <path d="M1 21v-1a3 3 0 0 1 3-3" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
      </path>
      <circle cx="19" cy="9" r="2" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      <path d="M23 21v-1a3 3 0 0 0-3-3" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" begin="0.3s" />
      </path>
    </svg>
  );
}

function IconGear({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="8s" repeatCount="indefinite" />
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </g>
    </svg>
  );
}

function IconWaveform({ color }: { color: string }) {
  const waveBars = [4, 7, 3, 9, 5, 8, 4, 6];
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {waveBars.map((h, i) => (
        <rect key={i} x={1.5 + i * 2.7} y={12 - h / 2} width="1.8" rx="0.9" fill={color} height={h}>
          <animate attributeName="height" values={`${h};${12 - Math.abs(i - 3.5)};${h}`} dur={`${1 + i * 0.15}s`} repeatCount="indefinite" />
          <animate attributeName="y" values={`${12 - h / 2};${12 - (12 - Math.abs(i - 3.5)) / 2};${12 - h / 2}`} dur={`${1 + i * 0.15}s`} repeatCount="indefinite" />
        </rect>
      ))}
    </svg>
  );
}

function IconDatabase({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3">
        <animate attributeName="ry" values="3;3.5;3" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" opacity="0.7">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
      </path>
      <circle cx="17" cy="8" r="1" fill={color} opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="8;5;8" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function IconShield({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" strokeDasharray="10" strokeDashoffset="10">
        <animate attributeName="stroke-dashoffset" values="10;0;0;10" dur="3s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function IconNetwork({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="2">
        <animate attributeName="r" values="2;2.4;2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="6" cy="18" r="2">
        <animate attributeName="r" values="2;2.4;2" dur="2s" repeatCount="indefinite" begin="0.4s" />
      </circle>
      <circle cx="18" cy="18" r="2">
        <animate attributeName="r" values="2;2.4;2" dur="2s" repeatCount="indefinite" begin="0.8s" />
      </circle>
      <line x1="12" y1="8" x2="6" y2="16" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.2s" />
      </line>
      <line x1="12" y1="8" x2="18" y2="16" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.6s" />
      </line>
      <line x1="6" y1="18" x2="18" y2="18" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
      </line>
    </svg>
  );
}

const animatedIcons = [IconTeam, IconGear, IconWaveform, IconDatabase, IconShield, IconNetwork];

const strengths = [
  {
    color: '#448CFF',
    titleKo: 'AI 기술 전문 인력 보유',
    titleEn: 'Expert AI Engineering Team',
    descKo: '음성 AI, 데이터 분석,\nAI 시스템 구축 경험을 보유한\n전문 개발 인력으로 구성',
    descEn: 'Composed of expert developers with\nexperience in voice AI, data analysis,\nand AI system development',
  },
  {
    color: '#6366F1',
    titleKo: '한국 환경에 최적화된 AI 기술',
    titleEn: 'AI Optimized for Korean Environment',
    descKo: '한국어 음성 환경, 공공 행정 환경,\n국내 서비스 환경에 맞는\nAI 기술 설계 및 개발',
    descEn: 'AI technology designed for Korean\nlanguage, public administration,\nand domestic service environments',
  },
  {
    color: '#3B82F6',
    titleKo: '고정확도 음성 인식 기술',
    titleEn: 'High-Accuracy Voice Recognition',
    descKo: '실시간 음성 인식, 한국어 특화 모델,\n정확도 중심의 STT 시스템 구축',
    descEn: 'Real-time voice recognition with\nKorean-specialized models and\naccuracy-focused STT systems',
  },
  {
    color: '#818CF8',
    titleKo: '대규모 음성 데이터 활용',
    titleEn: 'Large-Scale Voice Data Utilization',
    descKo: '실제 음성 데이터를 기반으로\nAI 모델 성능을 지속적으로 개선',
    descEn: 'Continuously improving AI model\nperformance based on real voice data',
  },
  {
    color: '#7C5CFC',
    titleKo: '실제 서비스 적용 경험',
    titleEn: 'Proven Service Deployment',
    descKo: '공공 및 산업 현장에서\nAI 시스템 구축 및 운영 경험',
    descEn: 'Experience building and operating\nAI systems in public and industrial fields',
  },
  {
    color: '#8B5CF6',
    titleKo: '다양한 산업 분야 적용',
    titleEn: 'Applied Across Industries',
    descKo: '공공, 상담센터, 돌봄 서비스 등\n다양한 산업 분야에서 AI 기술 적용',
    descEn: 'AI technology applied across public\nservices, call centers, care services,\nand more',
  },
];

/* ══════════════════════════════════════════════════════════════════════
   메인 페이지
   ══════════════════════════════════════════════════════════════════════ */

export function ServicesPage() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const tabSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });

  const featureRef = useRef(null);
  const featureInView = useInView(featureRef, { once: true, margin: '-60px' });

  const scrollToProducts = () => {
    tabSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeProduct = tabs[activeTab];
  const ActiveMockup = activeProduct.Mockup;

  return (
    <main id="main-content">

      {/* ── Section 1: Product Hero ──────────────────────────────── */}
      <section className="bg-white min-h-[80vh] flex items-center">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* 텍스트 */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#6366F1] bg-[#6366F1]/8 border border-[#6366F1]/15 mb-6">
                AI Speech Platform
              </span>
              <h1
                className="font-bold text-[#191F28] leading-[1.25] tracking-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', wordBreak: 'keep-all' }}
              >
                {lang === 'ko' ? (
                  <>AI 음성 인식으로<br />업무를 자동화합니다</>
                ) : (
                  <>Automate Your Workflow<br />with AI Voice Recognition</>
                )}
              </h1>
              <p
                className="text-[#6B7280] leading-[1.8] mb-8 whitespace-pre-line"
                style={{ fontSize: 'clamp(0.938rem, 1.5vw, 1.063rem)', wordBreak: 'keep-all' }}
              >
                {lang === 'ko'
                  ? 'Inno-Hi의 AI 음성 기술은\n실시간 음성을 텍스트로 변환하고\n대화 내용을 분석하여\n업무 기록과 리포트를 자동으로 생성합니다.'
                  : "Inno-Hi's AI voice technology\nconverts real-time speech to text,\nanalyzes conversations,\nand automatically generates work records and reports."}
              </p>
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#448CFF]/25 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #448CFF, #6366F1)' }}
              >
                {lang === 'ko' ? '제품 소개 보기' : 'View Products'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* 목업 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="drop-shadow-2xl"
              >
                <HeroLaptopMockup />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Product Tabs + Detail ─────────────────────── */}
      <section ref={tabSectionRef} className="bg-[#FAFBFC] py-20 sm:py-28 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">

          {/* 탭 바 */}
          <div className="flex justify-center mb-14 sm:mb-16">
            <div className="inline-flex gap-2 p-1.5 rounded-2xl bg-[#F3F4F6]">
              {tabs.map((tab, i) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(i)}
                  className="relative px-5 sm:px-6 py-2.5 rounded-xl text-[13px] sm:text-[14px] font-semibold transition-all duration-300"
                  style={
                    activeTab === i
                      ? { background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: 'white' }
                      : { color: '#6B7280' }
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 디테일 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
            >
              {/* 목업 (왼쪽) */}
              <div className="h-[340px] sm:h-[400px] lg:h-[440px] order-1">
                <ActiveMockup />
              </div>

              {/* 텍스트 (오른쪽) */}
              <div className="order-2">
                <h2
                  className="font-bold text-[#191F28] leading-[1.3] tracking-tight mb-5"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', wordBreak: 'keep-all' }}
                >
                  {lang === 'ko' ? activeProduct.titleKo : activeProduct.titleEn}
                </h2>
                <p
                  className="text-[#6B7280] leading-[1.8] whitespace-pre-line"
                  style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1rem)', wordBreak: 'keep-all' }}
                >
                  {lang === 'ko' ? activeProduct.descKo : activeProduct.descEn}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Section 3: Feature Cards ─────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">

          <motion.div
            ref={featureRef}
            initial={{ opacity: 0, y: 24 }}
            animate={featureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
          >
            <h2
              className="font-bold text-[#191F28] leading-[1.3] tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', wordBreak: 'keep-all' }}
            >
              {lang === 'ko' ? (
                <>왜 Inno-Hi인가요?</>
              ) : (
                <>Why Inno-Hi?</>
              )}
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-[1.7]" style={{ wordBreak: 'keep-all' }}>
              {lang === 'ko'
                ? '현장에서 검증된 AI 음성 기술로 업무 효율을 높입니다.'
                : 'Field-proven AI voice technology that boosts work efficiency.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {strengths.map((item, i) => {
              const AnimIcon = animatedIcons[i];
              return (
                <motion.div
                  key={item.titleKo}
                  initial={{ opacity: 0, y: 24 }}
                  animate={featureInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                  className="p-6 sm:p-7 rounded-2xl border border-[#E5E8EB] bg-white hover:shadow-lg hover:border-transparent transition-all duration-300"
                >
                  <div className="w-11 h-11 flex items-center justify-center mb-5">
                    <AnimIcon color={item.color} />
                  </div>
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#191F28] mb-3" style={{ wordBreak: 'keep-all' }}>
                    {lang === 'ko' ? item.titleKo : item.titleEn}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#8B95A1] leading-[1.7] whitespace-pre-line">
                    {lang === 'ko' ? item.descKo : item.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
