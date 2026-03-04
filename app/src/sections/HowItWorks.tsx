import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageSquare,
  Mic,
  Filter,
  FileText,
  Link2,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const steps = [
  {
    icon: MessageSquare,
    titleKo: '상담 접수',
    titleEn: 'Intake',
    descKo: '음성·채팅·문자 등 다양한 채널로 들어오는 상담을 실시간으로 캡처합니다.',
    descEn: 'Captures consultations in real time from voice, chat, and text channels.',
    tagKo: '멀티채널 입력 · 실시간 스트리밍',
    tagEn: 'Multi-channel input · Real-time streaming',
    color: '#448CFF',
  },
  {
    icon: Mic,
    titleKo: '음성 인식',
    titleEn: 'Speech Recognition',
    descKo: '업종 특화 어휘를 학습한 AI가 대화를 정확하게 텍스트로 변환합니다.',
    descEn: 'AI trained on industry-specific vocabulary accurately converts speech to text.',
    tagKo: '98.5% 인식률 · 화자 분리',
    tagEn: '98.5% accuracy · Speaker diarization',
    color: '#6366F1',
  },
  {
    icon: Filter,
    titleKo: '데이터 정제',
    titleEn: 'Data Refinement',
    descKo: '핵심 정보를 자동으로 추출하고 구조화된 데이터로 변환합니다.',
    descEn: 'Automatically extracts key information and converts it into structured data.',
    tagKo: '자동 분류 · 개체 인식',
    tagEn: 'Auto-classification · Entity recognition',
    color: '#10B981',
  },
  {
    icon: FileText,
    titleKo: '보고서 생성',
    titleEn: 'Report Generation',
    descKo: '상담 내용을 즉시 요약하고 규정에 맞는 보고서를 자동 작성합니다.',
    descEn: 'Instantly summarizes consultations and auto-generates compliant reports.',
    tagKo: '맞춤형 템플릿 · 규정 준수',
    tagEn: 'Custom templates · Compliance',
    color: '#F59E0B',
  },
  {
    icon: Link2,
    titleKo: '시스템 연동',
    titleEn: 'Integration',
    descKo: '기존 업무 시스템과 원활하게 연결되어 데이터가 실시간 동기화됩니다.',
    descEn: 'Seamlessly connects to existing systems with real-time data sync.',
    tagKo: 'API 연동 · 엔터프라이즈 보안',
    tagEn: 'API integration · Enterprise security',
    color: '#EC4899',
  },
];

function StepCard({ step, index, isActive, onClick, lang }: {
  step: typeof steps[0]; index: number; isActive: boolean;
  onClick: () => void; lang: 'ko' | 'en';
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full text-left rounded-2xl p-5 border transition-all duration-300 ${
        isActive
          ? 'bg-white shadow-lg border-transparent'
          : 'bg-[#F8F9FD] border-[#EAEDF2] hover:bg-white hover:shadow-md'
      }`}
      whileTap={{ scale: 0.98 }}
    >
      {/* 좌측 악센트 */}
      <div
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-opacity duration-300"
        style={{ background: step.color, opacity: isActive ? 1 : 0 }}
      />

      <div className="flex items-start gap-3.5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
          style={{
            background: isActive ? step.color : step.color + '12',
            color: isActive ? 'white' : step.color,
          }}
        >
          <step.icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-[#9CA3AF]">STEP {index + 1}</span>
          </div>
          <h3 className="text-[15px] font-semibold text-[#383838] mb-1">
            {lang === 'ko' ? step.titleKo : step.titleEn}
          </h3>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[13px] text-[#4B4E56] leading-relaxed mb-2">
                {lang === 'ko' ? step.descKo : step.descEn}
              </p>
              <p className="text-[11px] font-medium" style={{ color: step.color }}>
                {lang === 'ko' ? step.tagKo : step.tagEn}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// 단계별 비주얼 목업
function StepVisual({ step, index, lang }: { step: typeof steps[0]; index: number; lang: 'ko' | 'en' }) {
  const visuals = [
    // Step 1: 상담 접수 - 채널 입력
    <div key={0} className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-[10px] text-[#9CA3AF] ml-2 font-mono">intake.dashboard</span>
      </div>
      {[
        { ch: lang === 'ko' ? '음성 통화' : 'Voice Call', status: 'live', color: '#10B981' },
        { ch: lang === 'ko' ? '카카오톡' : 'KakaoTalk', status: 'new', color: '#F59E0B' },
        { ch: lang === 'ko' ? '문자 메시지' : 'SMS', status: 'queue', color: '#9CA3AF' },
      ].map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#EAEDF2]"
        >
          <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
          <span className="text-xs font-medium text-[#383838] flex-1">{c.ch}</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: c.color + '15', color: c.color }}>
            {c.status}
          </span>
        </motion.div>
      ))}
    </div>,
    // Step 2: 음성 인식 - 파형 + 텍스트
    <div key={1} className="space-y-4">
      <div className="p-4 rounded-xl bg-white border border-[#EAEDF2]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-[#6366F1]/10 flex items-center justify-center">
            <Mic className="w-3 h-3 text-[#6366F1]" />
          </div>
          <span className="text-[10px] font-semibold text-[#6366F1]">{lang === 'ko' ? '인식 중...' : 'Processing...'}</span>
        </div>
        <div className="flex items-end gap-[2px] h-8 mb-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full bg-[#6366F1]"
              animate={{ height: [`${20 + Math.random() * 40}%`, `${50 + Math.random() * 50}%`, `${20 + Math.random() * 40}%`] }}
              transition={{ duration: 0.8, delay: i * 0.05, repeat: Infinity }}
              style={{ opacity: 0.4 + Math.random() * 0.6 }}
            />
          ))}
        </div>
        <p className="text-[11px] text-[#4B4E56] leading-relaxed font-mono">
          {lang === 'ko' ? '"네, 어르신 건강 상태 확인했습니다. 다음 방문 일정은..."' : '"Yes, I\'ve checked the elder\'s health status. The next visit is..."'}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold text-[#6366F1]">98.5%</span>
        <div className="flex-1 h-1.5 bg-[#6366F1]/10 rounded-full">
          <motion.div className="h-full bg-[#6366F1] rounded-full" animate={{ width: ['0%', '98.5%'] }} transition={{ duration: 1.5, ease: 'easeOut' }} />
        </div>
        <span className="text-[10px] text-[#9CA3AF]">{lang === 'ko' ? '정확도' : 'accuracy'}</span>
      </div>
    </div>,
    // Step 3: 데이터 정제
    <div key={2} className="space-y-3">
      <div className="p-4 rounded-xl bg-white border border-[#EAEDF2]">
        <p className="text-[10px] text-[#9CA3AF] mb-2 font-semibold">{lang === 'ko' ? '자동 추출 결과' : 'Auto-extracted'}</p>
        {[
          { k: lang === 'ko' ? '이름' : 'Name', v: lang === 'ko' ? '김○○' : 'Kim XX' },
          { k: lang === 'ko' ? '상담 유형' : 'Type', v: lang === 'ko' ? '건강관리' : 'Health' },
          { k: lang === 'ko' ? '긴급도' : 'Priority', v: lang === 'ko' ? '보통' : 'Normal' },
          { k: lang === 'ko' ? '다음 방문' : 'Next Visit', v: '2026-03-05' },
        ].map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center justify-between py-1.5 border-b border-[#F3F4F6] last:border-0"
          >
            <span className="text-[11px] text-[#9CA3AF] font-medium">{row.k}</span>
            <span className="text-[11px] text-[#383838] font-semibold">{row.v}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2">
        {[lang === 'ko' ? '건강' : 'Health', lang === 'ko' ? '방문' : 'Visit', lang === 'ko' ? '정기' : 'Regular'].map((tag, i) => (
          <span key={i} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[#10B981]/10 text-[#10B981]">{tag}</span>
        ))}
      </div>
    </div>,
    // Step 4: 보고서 생성
    <div key={3} className="space-y-3">
      <div className="p-4 rounded-xl bg-white border border-[#EAEDF2]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-[11px] font-semibold text-[#383838]">{lang === 'ko' ? '상담 보고서' : 'Report'}</span>
          </div>
          <span className="text-[9px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">{lang === 'ko' ? '자동 생성됨' : 'Auto-generated'}</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-[#F3F4F6] rounded-full w-full" />
          <div className="h-2 bg-[#F3F4F6] rounded-full w-4/5" />
          <div className="h-2 bg-[#F3F4F6] rounded-full w-11/12" />
          <div className="h-2 bg-[#F3F4F6] rounded-full w-3/5" />
        </div>
      </div>
      <motion.div
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F59E0B]/5 border border-[#F59E0B]/20"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
        <span className="text-[10px] font-medium text-[#F59E0B]">{lang === 'ko' ? '3초 만에 완성' : 'Done in 3 seconds'}</span>
      </motion.div>
    </div>,
    // Step 5: 시스템 연동
    <div key={4} className="space-y-3">
      <div className="flex items-center justify-center gap-4 py-4">
        {[
          { label: 'INNO-HI', color: '#448CFF' },
          { label: 'API', color: '#EC4899' },
          { label: lang === 'ko' ? '업무시스템' : 'System', color: '#6366F1' },
        ].map((node, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-[10px] font-bold" style={{ background: node.color }}>
              {node.label}
            </div>
            {i < 2 && (
              <motion.div className="flex items-center gap-0.5">
                {[0, 1, 2].map(d => (
                  <motion.div
                    key={d}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#D3D8DF' }}
                    animate={{ background: ['#D3D8DF', '#448CFF', '#D3D8DF'] }}
                    transition={{ duration: 1.2, delay: d * 0.2, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#EC4899]/5 border border-[#EC4899]/20">
        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
        <span className="text-[10px] font-medium text-[#4B4E56]">{lang === 'ko' ? '실시간 동기화 완료' : 'Real-time sync complete'}</span>
      </div>
    </div>,
  ];

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl p-6 border"
      style={{ background: step.color + '08', borderColor: step.color + '20' }}
    >
      {visuals[index]}
    </motion.div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [currentStep, setCurrentStep] = useState(0);
  const { lang } = useLanguage();

  // 자동 재생
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentStep]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white"
      aria-labelledby="hiw-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#448CFF] mb-4">
            {lang === 'ko' ? '작동 방식' : 'How It Works'}
          </span>
          <h2 id="hiw-heading" className="text-kr-title mb-4">
            {lang === 'ko' ? (
              <>상담이 들어오면<br /><span className="gradient-text">보고서가 나옵니다</span></>
            ) : (
              <>From consultation<br /><span className="gradient-text">to report, instantly</span></>
            )}
          </h2>
          <p className="text-sm text-[#777A86] leading-relaxed">
            {lang === 'ko'
              ? '복잡한 과정은 AI가 처리합니다. 5단계 파이프라인이 3초 안에 완료됩니다.'
              : 'AI handles the complexity. The 5-step pipeline completes in under 3 seconds.'}
          </p>
        </motion.div>

        {/* 스텝 진행 바 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-1 max-w-2xl mx-auto mb-12"
        >
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className="flex-1 h-1.5 rounded-full transition-all duration-500 cursor-pointer"
              style={{ background: i <= currentStep ? step.color : '#EAEDF2' }}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </motion.div>

        {/* 메인 레이아웃: 좌측 카드목록 + 우측 비주얼 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* 좌측 스텝 카드 */}
          <div className="space-y-2">
            {steps.map((step, i) => (
              <StepCard
                key={i}
                step={step}
                index={i}
                isActive={currentStep === i}
                onClick={() => setCurrentStep(i)}
                lang={lang}
              />
            ))}
          </div>

          {/* 우측 비주얼 */}
          <div className="hidden lg:block sticky top-24">
            <StepVisual step={steps[currentStep]} index={currentStep} lang={lang} />
          </div>
        </div>

        {/* 하단 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-xl bg-[#F8F9FD] border border-[#EAEDF2]">
            <div className="flex -space-x-1.5">
              {steps.slice(0, 5).map((step, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full flex items-center justify-center border-2 border-white text-white text-[10px] font-bold"
                  style={{ background: step.color }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#4B4E56]">
              <span>{lang === 'ko' ? '전체 프로세스' : 'Full process'}</span>
              <ArrowRight className="w-4 h-4 text-[#777A86]" />
              <span className="font-bold text-[#448CFF]">{lang === 'ko' ? '3초 이내' : 'Under 3s'}</span>
              <span>{lang === 'ko' ? '완료' : 'done'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
