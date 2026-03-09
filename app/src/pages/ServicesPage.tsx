import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mic, ArrowRight, Search, BarChart3, FileText, CheckCircle2, AlertTriangle, Zap, Languages, Tag, BookOpen, Link2, Brain, Activity, ShieldAlert, TrendingUp, FileSignature, Settings, CalendarCheck } from 'lucide-react';
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
              <span className="text-[11px] font-bold text-[#383838]">INNOHI Voice Platform</span>
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
                <span className="text-[9px] font-semibold text-[#383838]">실시간 음성 파형</span>
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
              <span className="text-[9px] font-semibold text-[#383838] block mb-2">음성 변환 결과</span>
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

/* ── Voice 목업 (애니메이션) ───────────────────────────────────────── */

function MockVoice() {
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleMsgs(1), 800),
      setTimeout(() => setVisibleMsgs(2), 2400),
      setTimeout(() => setVisibleMsgs(3), 4000),
      setTimeout(() => setVisibleMsgs(4), 5600),
      setTimeout(() => setShowTags(true), 6800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const messages = [
    { speaker: '상담사', color: '#448CFF', text: '안녕하세요, 오늘 어떤 부분이 불편하셨나요?' },
    { speaker: '대상자', color: '#6B7280', text: '최근에 수면이 어려워서 상담 받으러 왔습니다.' },
    { speaker: '상담사', color: '#448CFF', text: '언제부터 그런 증상이 있으셨나요?' },
    { speaker: '대상자', color: '#6B7280', text: '한 달 전부터 잠들기가 어렵고 자주 깨요.' },
  ];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] p-5 sm:p-6">
      <style>{`@keyframes mockWave{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}`}</style>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
        <div className="px-4 py-3 border-b border-[#F1F3F5] flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#448CFF] to-[#6366F1] flex items-center justify-center">
            <Mic className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[12px] font-bold text-[#383838]">INNOHI Voice</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
            <span className="text-[9px] text-[#EF4444] font-semibold">REC</span>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-[#F1F3F5]">
          <div className="flex items-center gap-[2px] h-[28px]">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-full bg-[#448CFF]"
                style={{
                  height: '100%',
                  opacity: 0.3 + (i % 5) * 0.12,
                  animation: `mockWave ${0.6 + (i % 7) * 0.12}s ease-in-out infinite`,
                  animationDelay: `${i * 0.07}s`,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[8px] text-[#8B95A1]">00:03:24</span>
            <span className="text-[8px] text-[#8B95A1]">00:05:00</span>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          {messages.slice(0, visibleMsgs).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex gap-2"
            >
              <span className="text-[9px] font-semibold shrink-0 mt-0.5" style={{ color: msg.color }}>{msg.speaker}</span>
              <p className="text-[10px] text-[#4E5968] leading-[1.6]">{msg.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="px-4 pb-3 flex gap-1.5 flex-wrap min-h-[24px]">
          {showTags && ['수면 장애', '상담 요청', '초기 면담'].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="text-[8px] px-2 py-0.5 rounded-full bg-[#448CFF]/10 text-[#448CFF] font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Knowledge 목업 (애니메이션) ──────────────────────────────────── */

function MockKnowledge() {
  const fullQuery = '긴급복지지원 신청 자격 기준이 뭔가요?';
  const [typed, setTyped] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSources, setShowSources] = useState(false);

  useEffect(() => {
    let charIdx = 0;
    const typeTimer = setInterval(() => {
      charIdx++;
      if (charIdx <= fullQuery.length) {
        setTyped(fullQuery.slice(0, charIdx));
      } else {
        clearInterval(typeTimer);
        setIsThinking(true);
        setTimeout(() => {
          setIsThinking(false);
          setShowAnswer(true);
          setTimeout(() => setShowSources(true), 600);
        }, 1500);
      }
    }, 80);
    return () => clearInterval(typeTimer);
  }, []);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] p-5 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
        <div className="px-4 py-3 border-b border-[#F1F3F5] flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center">
            <Search className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[12px] font-bold text-[#383838]">INNOHI Knowledge</span>
        </div>

        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E8EB]">
            <Search className="w-3.5 h-3.5 text-[#8B95A1]" />
            <span className="text-[10px] text-[#383838] flex-1">
              {typed}
              {typed.length < fullQuery.length && (
                <span className="inline-block w-[1px] h-[12px] bg-[#191F28] ml-[1px] animate-pulse align-middle" />
              )}
            </span>
          </div>
        </div>

        <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
          {isThinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                <span className="text-[7px] text-white font-bold">AI</span>
              </div>
              <span className="text-[10px] text-[#6366F1] font-semibold">답변 생성 중</span>
              <span className="flex gap-0.5 ml-1">
                {[0, 1, 2].map(d => (
                  <span key={d} className="w-1 h-1 rounded-full bg-[#6366F1] animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </span>
            </motion.div>
          )}

          {showAnswer && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                  <span className="text-[7px] text-white font-bold">AI</span>
                </div>
                <span className="text-[10px] font-semibold text-[#6366F1]">AI 답변</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[9px] text-[#4E5968] leading-[1.7]"
              >
                긴급복지지원법 제5조에 따르면, 생계곤란 등의 위기 상황에 처한 자로서 소득·재산 기준을 충족하는 경우 신청 가능합니다.
              </motion.p>
            </>
          )}

          {showSources && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <span className="text-[8px] text-[#8B95A1] block mb-1.5">출처: 긴급복지지원법 제5조, 시행령 제2조</span>
              <div className="flex gap-1.5 flex-wrap">
                {['긴급복지지원법', '시행령', '업무매뉴얼'].map((src, i) => (
                  <motion.span
                    key={src}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="text-[8px] px-2.5 py-1 rounded-lg bg-[#6366F1]/8 text-[#6366F1] font-medium border border-[#6366F1]/10"
                  >
                    {src}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Decision 목업 (애니메이션) ───────────────────────────────────── */

function MockDecision() {
  const targetBars = [35, 52, 45, 68, 58, 72, 82, 65, 90, 78];
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += 0.02;
      if (p >= 1) {
        p = 1;
        clearInterval(interval);
        setTimeout(() => setShowAlert(true), 500);
      }
      setProgress(p);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-5 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
        <div className="px-4 py-3 border-b border-[#F1F3F5] flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
            <BarChart3 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[12px] font-bold text-[#383838]">INNOHI Decision</span>
        </div>

        <div className="grid grid-cols-3 gap-2 px-4 pt-3 pb-2">
          {[
            { label: '실시간', value: Math.round(ease * 24).toString(), unit: '건', color: '#3B82F6', bg: '#EFF6FF' },
            { label: '위험 감지', value: Math.round(ease * 1284).toLocaleString(), unit: '건', sub: '분석 완료', color: '#6366F1', bg: '#EEF2FF' },
            { label: '정확도', value: (ease * 94.2).toFixed(1), unit: '%', color: '#818CF8', bg: '#F5F3FF' },
          ].map((m) => (
            <div key={m.label} className="rounded-lg p-2 text-center" style={{ background: m.bg }}>
              <div className="text-[8px] text-[#8B95A1] mb-0.5">{m.label}</div>
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-[14px] font-bold" style={{ color: m.color }}>{m.value}</span>
                <span className="text-[8px] text-[#8B95A1]">{m.unit}</span>
              </div>
              {'sub' in m && m.sub && <div className="text-[7px] text-[#8B95A1] mt-0.5">{m.sub}</div>}
            </div>
          ))}
        </div>

        <div className="flex-1 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-[#383838]">주간 분석 추이</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              <span className="text-[8px] text-[#8B95A1]">처리량</span>
            </div>
          </div>
          <div className="h-[80px] flex items-end gap-[4px] bg-[#EFF6FF] rounded-lg p-2">
            {targetBars.map((h, j) => (
              <div key={j} className="flex-1 rounded-t-sm transition-[height] duration-100" style={{
                height: `${h * ease}%`,
                background: j >= targetBars.length - 2
                  ? 'linear-gradient(180deg, #3B82F6, #2563EB)'
                  : 'linear-gradient(180deg, #93C5FD80, #3B82F630)',
              }} />
            ))}
          </div>
        </div>

        <div className="px-4 pb-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={showAlert ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FEF2F2] border border-[#FECACA]"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />
            <div>
              <span className="text-[9px] text-[#991B1B] font-semibold block">위기 가구 3건 신규 감지</span>
              <span className="text-[8px] text-[#B91C1C]">즉시 확인이 필요합니다</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── Workflow 목업 (애니메이션) ────────────────────────────────────── */

function MockWorkflow() {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [percent, setPercent] = useState(0);
  const [showFiles, setShowFiles] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => { setCompletedSteps(1); setPercent(25); }, 1000),
      setTimeout(() => { setCompletedSteps(2); setPercent(50); }, 2200),
      setTimeout(() => { setCompletedSteps(3); setPercent(75); }, 3400),
      setTimeout(() => setShowFiles(true), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const stepLabels = ['상담 기록 수신', '서식 자동 작성', '보고서 생성', '후속 일정 등록'];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] p-5 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F8F9FA] border-b border-[#E5E8EB]">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
          <div className="flex-1 mx-2 px-2.5 py-1 rounded-md bg-white border border-[#E5E8EB] text-[8px] text-[#8B95A1]">
            app.innohi.ai/workflow
          </div>
        </div>

        <div className="px-4 py-3 border-b border-[#F1F3F5] flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[12px] font-bold text-[#383838]">INNOHI Workflow</span>
          <span className="ml-auto text-[9px] text-[#8B5CF6] font-semibold">자동 처리 중</span>
        </div>

        <div className="px-4 pt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-semibold text-[#383838]">전체 진행률</span>
            <span className="text-[10px] font-bold text-[#8B5CF6]">{percent}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#F3F4F6] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] transition-all duration-700 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="flex-1 px-4 py-3 space-y-2 overflow-hidden">
          {stepLabels.map((label, i) => {
            const done = i < completedSteps;
            const processing = i === completedSteps;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: done || processing ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                style={{ background: done ? '#F5F3FF' : processing ? '#FFFBEB' : '#F8F9FA' }}
              >
                {done ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" />
                  </motion.div>
                ) : processing ? (
                  <div className="w-4 h-4 rounded-full border-2 border-[#F59E0B] border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-[#E5E8EB] shrink-0" />
                )}
                <span className="text-[10px] text-[#383838] flex-1">{label}</span>
                <span className={`text-[8px] font-semibold ${done ? 'text-[#8B5CF6]' : processing ? 'text-[#F59E0B]' : 'text-[#D1D6DB]'}`}>
                  {done ? '완료' : processing ? '처리 중...' : '대기'}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="px-4 pb-3 flex gap-2 min-h-[28px]">
          {showFiles && ['상담기록.pdf', '보고서.xlsx'].map((f, i) => (
            <motion.span
              key={f}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.15 }}
              className="text-[8px] px-2 py-1 rounded-lg bg-[#8B5CF6]/8 text-[#8B5CF6] font-medium flex items-center gap-1 border border-[#8B5CF6]/10"
            >
              <FileText className="w-3 h-3" />{f}
            </motion.span>
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
    key: 'voice',
    label: 'Voice',
    titleKo: 'INNOHI Voice',
    titleEn: 'INNOHI Voice',
    descKo:
      '현장의 대화를 자동으로 기록하는 음성 인식 AI 제품입니다.\n상담, 인터뷰, 민원 응대 등 다양한 현장 상황에서\n음성을 실시간으로 텍스트로 변환합니다.',
    descEn:
      'An AI voice recognition product that automatically records on-site conversations.\nConverts speech to text in real-time across\nconsultation, interview, and civil service scenarios.',
    Mockup: MockVoice,
    color: '#448CFF',
    features: [
      { icon: Zap, ko: '실시간 음성 변환', en: 'Real-time Transcription', descKo: '상담이 진행되는 동시에 음성을 텍스트로 변환합니다. 1초 단위 처리로 기록 누락 없이 현장 대화를 실시간으로 저장하고 검토할 수 있습니다.', descEn: 'Converts speech to text as consultations happen. Sub-second processing ensures no conversation is missed, with real-time storage and review.' },
      { icon: Languages, ko: '한국어 특화 모델', en: 'Korean-Specialized Model', descKo: '한국어 고유의 문맥, 존칭, 복합 발화 패턴을 정밀하게 처리하는 AI 모델을 적용합니다. 공공 상담 도메인에 최적화된 어휘 사전을 활용합니다.', descEn: 'AI model precisely handles Korean-specific context, honorifics, and complex speech patterns. Utilizes vocabularies optimized for public consultation domains.' },
      { icon: Tag, ko: '자동 키워드 태깅', en: 'Auto Keyword Tagging', descKo: '대화 내용에서 민원 유형, 핵심 주제, 감정 키워드를 자동으로 추출하고 분류합니다. 상담 이력 검색과 통계 분석에 바로 활용할 수 있습니다.', descEn: 'Automatically extracts and classifies complaint types, key topics, and sentiment from conversations. Ready for consultation history search and statistical analysis.' },
    ],
  },
  {
    key: 'knowledge',
    label: 'Knowledge',
    titleKo: 'INNOHI Knowledge',
    titleEn: 'INNOHI Knowledge',
    descKo:
      '문서를 이해하고 답을 찾는 AI 지식 검색 제품입니다.\n내부 법령, 매뉴얼, 정책 문서를 기반으로\n질문 의도를 이해하고 근거와 함께 답변을 제공합니다.',
    descEn:
      'An AI knowledge search product that understands documents and finds answers.\nBased on internal regulations, manuals, and policy documents,\nit understands intent and provides evidence-based answers.',
    Mockup: MockKnowledge,
    color: '#6366F1',
    features: [
      { icon: BookOpen, ko: '문서 기반 답변', en: 'Document-Based Answers', descKo: '내부 법령, 매뉴얼, 업무 지침 등에서 질문과 관련된 근거를 찾아 정확한 답변을 생성합니다. 추측이 아닌 문서 기반의 신뢰할 수 있는 정보를 제공합니다.', descEn: 'Finds evidence from internal regulations, manuals, and guidelines to generate accurate answers. Provides reliable, document-based information — not guesswork.' },
      { icon: Link2, ko: '출처 자동 표시', en: 'Auto Source Citation', descKo: '답변과 함께 관련 법률 조항, 매뉴얼 페이지, 정책 문서의 출처를 자동으로 표시합니다. 담당자가 원문을 즉시 확인하고 검증할 수 있습니다.', descEn: 'Automatically displays source references including law articles, manual pages, and policy documents alongside answers. Enables instant verification by staff.' },
      { icon: Brain, ko: '질문 의도 분석', en: 'Intent Analysis', descKo: '단순 키워드 매칭이 아닌, 질문의 맥락과 의도를 AI가 분석하여 가장 적절한 답변을 제공합니다. 비슷한 질문도 상황에 맞게 다르게 응답합니다.', descEn: 'Beyond keyword matching — AI analyzes question context and intent for optimal answers. Even similar questions receive context-appropriate responses.' },
    ],
  },
  {
    key: 'decision',
    label: 'Decision',
    titleKo: 'INNOHI Decision',
    titleEn: 'INNOHI Decision',
    descKo:
      '데이터 분석을 통해 판단을 지원하는 AI 분석 제품입니다.\n대규모 데이터를 실시간으로 분석하여\n위험 신호와 중요한 패턴을 빠르게 탐지합니다.',
    descEn:
      'An AI analytics product that supports decision-making through data analysis.\nAnalyzes large-scale data in real-time\nto quickly detect risk signals and important patterns.',
    Mockup: MockDecision,
    color: '#3B82F6',
    features: [
      { icon: Activity, ko: '실시간 데이터 분석', en: 'Real-time Data Analysis', descKo: '수만 건의 데이터를 실시간으로 수집·처리하고 대시보드로 시각화합니다. 현장 상황을 즉시 파악하고 데이터에 기반한 빠른 의사결정을 지원합니다.', descEn: 'Collects and processes tens of thousands of data points in real-time, visualized through dashboards. Enables instant situational awareness and data-driven decisions.' },
      { icon: ShieldAlert, ko: '위험 신호 탐지', en: 'Risk Signal Detection', descKo: '과거 사례 데이터를 학습한 AI가 이상 패턴을 조기에 감지하여 위험 상황을 사전에 알립니다. 설명 가능한 AI(XAI)로 판단 근거를 함께 제공합니다.', descEn: 'AI trained on historical cases detects anomalous patterns early to warn of risks. Provides decision rationale through explainable AI (XAI).' },
      { icon: TrendingUp, ko: '패턴 자동 감지', en: 'Auto Pattern Detection', descKo: '대규모 데이터에서 의미 있는 패턴, 추세, 상관관계를 자동으로 발견합니다. 사람이 놓칠 수 있는 숨겨진 인사이트를 AI가 도출합니다.', descEn: 'Automatically discovers meaningful patterns, trends, and correlations in large datasets. AI uncovers hidden insights humans might miss.' },
    ],
  },
  {
    key: 'workflow',
    label: 'Workflow',
    titleKo: 'INNOHI Workflow',
    titleEn: 'INNOHI Workflow',
    descKo:
      '기록, 보고, 문서 작성 등 반복 업무를 자동화하는 AI 제품입니다.\n상담 이후 이루어지는 행정 업무를 자동으로 정리하여\n업무 처리 시간을 크게 줄입니다.',
    descEn:
      'An AI product that automates repetitive tasks like recording, reporting, and documentation.\nAutomatically organizes post-consultation administrative work\nto significantly reduce processing time.',
    Mockup: MockWorkflow,
    color: '#8B5CF6',
    features: [
      { icon: FileSignature, ko: '자동 문서 작성', en: 'Auto Document Generation', descKo: '상담 내용을 분석하여 행정 서식에 맞는 보고서와 문서를 자동으로 생성합니다. 수작업 문서 작성 시간을 대폭 줄이고 양식 오류를 방지합니다.', descEn: 'Analyzes consultation content to auto-generate reports and documents in administrative formats. Dramatically reduces manual writing time and prevents formatting errors.' },
      { icon: Settings, ko: '업무 프로세스 자동화', en: 'Process Automation', descKo: '기록 수신부터 서식 작성, 보고서 생성까지 반복되는 행정 업무 절차를 AI가 자동으로 처리합니다. 담당자는 핵심 업무에만 집중할 수 있습니다.', descEn: 'AI automatically handles repetitive administrative procedures from record intake to form filling and report generation. Staff can focus on core responsibilities.' },
      { icon: CalendarCheck, ko: '후속 조치 관리', en: 'Follow-up Management', descKo: '상담 결과에 따라 필요한 후속 업무를 자동으로 생성하고, 일정과 담당자를 배정합니다. 누락 없는 체계적인 업무 관리가 가능합니다.', descEn: 'Auto-creates follow-up tasks based on consultation results, assigning schedules and staff. Enables systematic task management with zero oversights.' },
    ],
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
    titleKo: '한국어 특화된 AI 기술',
    titleEn: 'AI Optimized for Korean Environment',
    descKo: '한국어 음성 환경, 공공 행정 환경,\n국내 서비스 환경에 맞는\nAI 기술 설계 및 개발',
    descEn: 'AI technology designed for Korean\nlanguage, public administration,\nand domestic service environments',
  },
  {
    color: '#3B82F6',
    titleKo: '정확도 높은 음성 인식 기술',
    titleEn: 'High-Accuracy Voice Recognition',
    descKo: '실시간 음성 인식, 한국어 특화 모델,\n정확도 중심의 STT 시스템 구축',
    descEn: 'Real-time voice recognition with\nKorean-specialized models and\naccuracy-focused STT systems',
  },
  {
    color: '#818CF8',
    titleKo: '대규모 음성 데이터 활용',
    titleEn: 'Large-Scale Voice Data Utilization',
    descKo: '실제 현장 음성 데이터를 기반으로\nAI 모델 성능을 지속적으로 개선',
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
                className="font-bold text-[#383838] leading-[1.25] tracking-tight mb-6"
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
                  ? '이노하이는 반복적인 현장 업무를 줄이기 위해 AI 기술을 활용한 다양한 제품을 제공합니다.'
                  : 'INNOHI offers a range of AI-powered products to reduce repetitive field work.'}
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
                  className="font-bold text-[#383838] leading-[1.3] tracking-tight mb-5"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', wordBreak: 'keep-all' }}
                >
                  {lang === 'ko' ? activeProduct.titleKo : activeProduct.titleEn}
                </h2>
                <p
                  className="text-[#6B7280] leading-[1.8] whitespace-pre-line mb-6"
                  style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1rem)', wordBreak: 'keep-all' }}
                >
                  {lang === 'ko' ? activeProduct.descKo : activeProduct.descEn}
                </p>
              </div>

              {/* 특징 박스 3개 — 목업 아래 */}
              <div className="order-3 lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                {activeProduct.features.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={feat.ko}
                      className="rounded-2xl border px-5 py-6"
                      style={{
                        background: `${activeProduct.color}06`,
                        borderColor: `${activeProduct.color}15`,
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: `${activeProduct.color}12` }}
                      >
                        <Icon className="w-[18px] h-[18px]" style={{ color: activeProduct.color }} />
                      </div>
                      <p
                        className="text-[15px] font-semibold mb-2"
                        style={{ color: activeProduct.color }}
                      >
                        {lang === 'ko' ? feat.ko : feat.en}
                      </p>
                      <p className="text-[13px] text-[#6B7280] leading-[1.7]" style={{ wordBreak: 'keep-all' }}>
                        {lang === 'ko' ? feat.descKo : feat.descEn}
                      </p>
                    </div>
                  );
                })}
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
              className="font-bold text-[#383838] leading-[1.3] tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', wordBreak: 'keep-all' }}
            >
              {lang === 'ko' ? (
                <>왜 이노하이인가요?</>
              ) : (
                <>Why 이노하이?</>
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
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#383838] mb-3" style={{ wordBreak: 'keep-all' }}>
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
