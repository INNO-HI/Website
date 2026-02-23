import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Building2, HeartPulse, Users, Cpu, TrendingUp, TrendingDown, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// ── 영향력 지표 ───────────────────────────────────────────────────────

const impactMetrics = [
  { value: '17개+', labelKo: '도입 기관', labelEn: 'Institutions' },
  { value: '70%', labelKo: '기록 시간 단축', labelEn: 'Doc. Time Reduced' },
  { value: '99.2%', labelKo: 'AI 정확도', labelEn: 'AI Accuracy' },
  { value: '<24h', labelKo: '평균 도입 기간', labelEn: 'Avg. Deployment' },
];

// ── 인용문 (현장 목소리) ──────────────────────────────────────────────

const testimonials = [
  {
    tagKo: '공공 부문', tagEn: 'Public Sector',
    tagColor: '#448CFF', tagBg: '#EEF4FF',
    quoteKo: '"말하면 바로 기록이 됩니다. 이제 어르신들과 더 많은 시간을 보낼 수 있어요."',
    quoteEn: '"I just speak and it records. Now I can spend more time with the elderly."',
    authorKo: '김○○ 팀장 · 서울시 종합사회복지관',
    authorEn: 'Director Kim · Seoul Community Welfare Center',
    metrics: [
      { labelKo: '기록 시간', labelEn: 'Doc. time', value: '-70%', trend: 'down' as const },
      { labelKo: '시민 만족도', labelEn: 'Satisfaction', value: '+42%', trend: 'up' as const },
    ],
  },
  {
    tagKo: '의료 기관', tagEn: 'Healthcare',
    tagColor: '#38BDF8', tagBg: '#F0F9FF',
    quoteKo: '"기존 시스템과 완벽하게 연동됐고, 기술 장벽이 없어서 현장에서도 쉽게 적응했어요."',
    quoteEn: '"Seamlessly integrated with our existing system. Field staff adapted with ease."',
    authorKo: '이○○ 원장 · 경기도 노인요양병원',
    authorEn: 'Director Lee · Gyeonggi Senior Care Hospital',
    metrics: [
      { labelKo: '도입 기간', labelEn: 'Setup time', value: '<24h', trend: 'up' as const },
      { labelKo: '문서 정확도', labelEn: 'Accuracy', value: '99.2%', trend: 'up' as const },
    ],
  },
  {
    tagKo: '사회복지 기관', tagEn: 'Social Welfare',
    tagColor: '#818CF8', tagBg: '#EEF2FF',
    quoteKo: '"응답 속도가 80% 빨라졌고, 종사자들의 번아웃도 눈에 띄게 줄었습니다."',
    quoteEn: '"Response time improved by 80%, and caregiver burnout has noticeably decreased."',
    authorKo: '박○○ 관장 · 지역 사회복지관',
    authorEn: 'Director Park · Community Welfare Center',
    metrics: [
      { labelKo: '응답 시간', labelEn: 'Response time', value: '-80%', trend: 'down' as const },
      { labelKo: '케이스 해결', labelEn: 'Case resolution', value: '+58%', trend: 'up' as const },
    ],
  },
];

// ── 케이스 카드 데이터 ────────────────────────────────────────────────

const caseCards = [
  {
    icon: Building2,
    titleKo: '공공 부문', titleEn: 'Public Sector',
    subtitleKo: '정부 및 지자체', subtitleEn: 'Government & Local Authorities',
    descKo: '시민 서비스를 지능형 자동화로 간소화합니다.\n허가 처리부터 사회 서비스까지 품질을 향상시킵니다.',
    descEn: 'Streamline citizen services with intelligent automation.\nFrom permits to social services.',
    metrics: [
      { labelKo: '처리 시간', labelEn: 'Processing time', value: '-65%', trend: 'down' as const },
      { labelKo: '시민 만족도', labelEn: 'Satisfaction', value: '+42%', trend: 'up' as const },
      { labelKo: '비용 절감', labelEn: 'Cost savings', value: '40%', trend: 'up' as const },
    ],
    color: '#448CFF', bg: '#EEF4FF',
    imgGradient: 'linear-gradient(135deg, #EEF4FF 0%, #C7DEFF 100%)',
  },
  {
    icon: HeartPulse,
    titleKo: '의료 기관', titleEn: 'Healthcare',
    subtitleKo: '병원 및 클리닉', subtitleEn: 'Hospitals & Clinics',
    descKo: '환자 접수·문서화·진료 조정을 변화시킵니다.\n의료진이 환자 진료에 집중할 수 있게 합니다.',
    descEn: 'Transform patient intake, documentation, and care coordination.\nLet clinicians focus on care.',
    metrics: [
      { labelKo: '문서화 시간', labelEn: 'Documentation', value: '-70%', trend: 'down' as const },
      { labelKo: '데이터 정확도', labelEn: 'Data accuracy', value: '99.2%', trend: 'up' as const },
      { labelKo: '환자 처리량', labelEn: 'Patient throughput', value: '+35%', trend: 'up' as const },
    ],
    color: '#3B82F6', bg: '#EFF6FF',
    imgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
  },
  {
    icon: Users,
    titleKo: '사회복지 기관', titleEn: 'Social Welfare',
    subtitleKo: '사회 및 지역사회 돌봄', subtitleEn: 'Community & Social Care',
    descKo: '취약 계층을 존엄성과 효율성으로 지원합니다.\n인간적 연결을 유지하며 업무를 자동화합니다.',
    descEn: 'Support vulnerable populations with dignity and efficiency.\nAutomate work while preserving human connection.',
    metrics: [
      { labelKo: '케이스 해결', labelEn: 'Case resolution', value: '+58%', trend: 'up' as const },
      { labelKo: '응답 시간', labelEn: 'Response time', value: '-80%', trend: 'down' as const },
      { labelKo: '자원 활용', labelEn: 'Resource util.', value: '+45%', trend: 'up' as const },
    ],
    color: '#38BDF8', bg: '#F0F9FF',
    imgGradient: 'linear-gradient(135deg, #F0F9FF 0%, #BAE6FD 100%)',
  },
  {
    icon: Cpu,
    titleKo: '스마트 요양 시설', titleEn: 'Smart Care Facilities',
    subtitleKo: '노인·장애인 돌봄', subtitleEn: 'Elderly & Disability Care',
    descKo: '요양보호사의 기록 부담을 AI가 대신합니다.\n더 많은 시간을 이용자와 함께할 수 있습니다.',
    descEn: 'AI handles documentation for care workers.\nMore time for the people who matter.',
    metrics: [
      { labelKo: '기록 시간', labelEn: 'Documentation', value: '-72%', trend: 'down' as const },
      { labelKo: '케어 시간', labelEn: 'Care time', value: '+3배', trend: 'up' as const },
      { labelKo: '도입 기간', labelEn: 'Setup time', value: '<24h', trend: 'up' as const },
    ],
    color: '#818CF8', bg: '#EEF2FF',
    imgGradient: 'linear-gradient(135deg, #EEF2FF 0%, #C7D2FE 100%)',
  },
];

// ── 현장 목소리 슬라이더 ─────────────────────────────────────────────

function TestimonialsSlider({ lang }: { lang: 'ko' | 'en' }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = testimonials.length;

  // 3초마다 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % total);
    }, 3000);
    return () => clearInterval(timer);
  }, [total]);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent(c => (c + dir + total) % total);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="border border-[#EAEDF2] bg-white p-10 lg:p-14 rounded-2xl"
          >
            {/* 인용 아이콘 */}
            <Quote className="w-10 h-10 mb-6" style={{ color: t.tagColor, opacity: 0.2 }} />

            {/* 분야 배지 */}
            <span
              className="inline-block px-3 py-1.5 rounded-full text-sm font-bold mb-6"
              style={{ background: t.tagBg, color: t.tagColor }}
            >
              {lang === 'ko' ? t.tagKo : t.tagEn}
            </span>

            {/* 인용문 */}
            <p className="text-[17px] text-[#444B52] leading-relaxed font-medium mb-6 max-w-2xl"
              style={{ fontStyle: 'italic' }}>
              {lang === 'ko' ? t.quoteKo : t.quoteEn}
            </p>

            {/* 저자 */}
            <p className="text-sm text-[#9CA3AF] font-semibold mb-8">
              — {lang === 'ko' ? t.authorKo : t.authorEn}
            </p>

            {/* 수치 */}
            <div className="flex flex-wrap gap-3">
              {t.metrics.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl"
                  style={{ background: t.tagBg }}
                >
                  <span className="text-base font-black" style={{ color: t.tagColor }}>{m.value}</span>
                  {m.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" style={{ color: t.tagColor }} />
                  ) : (
                    <TrendingDown className="w-4 h-4" style={{ color: t.tagColor }} />
                  )}
                  <span className="text-xs text-[#777A86] font-medium">{lang === 'ko' ? m.labelKo : m.labelEn}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 컨트롤: 화살표 + dots */}
      <div className="flex items-center justify-between mt-6">
        {/* 이전 버튼 */}
        <button
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full border border-[#EAEDF2] flex items-center justify-center text-[#777A86] hover:border-[#448CFF] hover:text-[#448CFF] transition-colors"
          aria-label="이전"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? '#448CFF' : '#D3D8DF',
              }}
              aria-label={`${i + 1}번`}
            />
          ))}
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full border border-[#EAEDF2] flex items-center justify-center text-[#777A86] hover:border-[#448CFF] hover:text-[#448CFF] transition-colors"
          aria-label="다음"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ── 케이스 카드 ───────────────────────────────────────────────────────

function CaseCard({ c, index, lang, compact = false }: { c: typeof caseCards[0]; index: number; lang: 'ko' | 'en'; compact?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  if (compact) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.1 }}
        className="group rounded-2xl border border-[#EAEDF2] bg-white overflow-hidden hover:shadow-lg hover:border-transparent transition-all duration-300 flex flex-col"
      >
        {/* 상단 아이콘 영역 */}
        <div
          className="flex-1 flex flex-col items-center justify-center gap-4 p-8"
          style={{ background: c.imgGradient, minHeight: 160 }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: c.color }}
          >
            <c.icon className="w-7 h-7 text-white" aria-hidden="true" />
          </div>
          <h3 className="font-black text-[#444B52] text-center" style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}>
            {lang === 'ko' ? c.titleKo : c.titleEn}
          </h3>
        </div>
        {/* 주요 지표 */}
        <div className="p-5">
          <div className="text-center p-4 rounded-xl" style={{ background: c.bg }}>
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-xl font-black" style={{ color: c.color }}>{c.metrics[0].value}</span>
              {c.metrics[0].trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-emerald-500" />
              )}
            </div>
            <span className="text-[11px] text-[#777A86] font-medium">
              {lang === 'ko' ? c.metrics[0].labelKo : c.metrics[0].labelEn}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="group rounded-2xl border border-[#EAEDF2] bg-white overflow-hidden hover:shadow-lg hover:border-transparent transition-all duration-300"
    >
      {/* 상단 이미지 영역 */}
      <div
        className="h-36 flex items-center justify-center relative"
        style={{ background: c.imgGradient }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: c.color }}
        >
          <c.icon className="w-8 h-8 text-white" aria-hidden="true" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-block px-2.5 py-1 rounded-full text-xs font-black"
            style={{ background: c.bg, color: c.color }}
          >
            {lang === 'ko' ? c.subtitleKo : c.subtitleEn}
          </span>
        </div>

        <h3 className="font-black text-[#444B52] mb-2" style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
          {lang === 'ko' ? c.titleKo : c.titleEn}
        </h3>

        <p className="text-[13px] text-[#4B4E56] leading-relaxed whitespace-pre-line mb-5 font-medium">
          {lang === 'ko' ? c.descKo : c.descEn}
        </p>

        <div className="grid grid-cols-3 gap-2">
          {c.metrics.map((m, i) => (
            <div key={i} className="text-center p-2.5 rounded-xl" style={{ background: c.bg }}>
              <div className="flex items-center justify-center gap-1">
                <span className="text-base font-black" style={{ color: c.color }}>{m.value}</span>
                {m.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-emerald-500" />
                )}
              </div>
              <span className="text-[10px] text-[#777A86]">{lang === 'ko' ? m.labelKo : m.labelEn}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── 영향력 지표 배너 ─────────────────────────────────────────────────

function ImpactBar({ lang }: { lang: 'ko' | 'en' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section ref={ref} className="bg-white border-y border-[#EAEDF2] py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {impactMetrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-black text-[#448CFF] mb-1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.03em' }}>
                {m.value}
              </p>
              <p className="text-sm font-semibold text-[#777A86]">
                {lang === 'ko' ? m.labelKo : m.labelEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 메인 페이지 ───────────────────────────────────────────────────────

export function CasesPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">본문으로 바로가기</a>
      <Navigation />
      <main id="main-content">

        {/* 헤더 */}
        <section className="pt-32 pb-10 lg:pt-40 lg:pb-14 bg-gradient-to-b from-[#EEF4FF] to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#D3D8DF] mb-5 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[#448CFF]" />
              <span className="text-xs font-black text-[#448CFF]">
                {lang === 'ko' ? '도입 사례' : 'Case Studies'}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-black text-[#444B52] tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}
            >
              {lang === 'ko' ? (
                <>현장에서<br /><span className="gradient-text">증명된 변화</span></>
              ) : (
                <>Change<br /><span className="gradient-text">Proven in the Field</span></>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[15px] text-[#777A86] font-medium max-w-xl mx-auto"
            >
              {lang === 'ko'
                ? '공공·의료·복지 현장에서 이미 사용되고 있습니다.\n수치로 증명된 실제 변화를 확인하세요.'
                : 'Already deployed across public, healthcare, and welfare sectors.\nSee the real, measurable impact.'}
            </motion.p>
          </div>
        </section>

        {/* 영향력 지표 */}
        <ImpactBar lang={lang} />

        {/* 현장 목소리 — 자동 슬라이더 */}
        <section className="py-16 lg:py-24 bg-[#F8F9FD]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-black text-[#448CFF] tracking-widest uppercase mb-3">
                {lang === 'ko' ? '현장의 목소리' : 'From the Field'}
              </p>
              <h2
                className="font-black text-[#444B52]"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '-0.03em' }}
              >
                {lang === 'ko' ? '사람들이 직접 경험한 변화' : 'Changes people experienced firsthand'}
              </h2>
            </div>

            <TestimonialsSlider lang={lang} />
          </div>
        </section>

        {/* 적용 분야 카드 */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-black text-[#448CFF] tracking-widest uppercase mb-3">
                {lang === 'ko' ? '적용 분야' : 'Application Areas'}
              </p>
              <h2
                className="font-black text-[#444B52] mb-4"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '-0.03em' }}
              >
                {lang === 'ko' ? (
                  <>사람 중심의 현장 어디서나<br /><span className="gradient-text">작동합니다</span></>
                ) : (
                  <>Works wherever<br /><span className="gradient-text">people-first care happens</span></>
                )}
              </h2>
              <p className="text-[15px] text-[#4B4E56] font-medium">
                {lang === 'ko'
                  ? '다양한 분야에서 도입 가능한 맞춤형 AI 솔루션'
                  : 'Customizable AI solutions deployable across diverse sectors'}
              </p>
            </div>

            <div className="space-y-5">
              {/* Row 1: 3:1 */}
              <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr] gap-5">
                <CaseCard c={caseCards[0]} index={0} lang={lang} />
                <CaseCard c={caseCards[1]} index={1} lang={lang} compact />
              </div>
              {/* Row 2: 1:3 */}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-5">
                <CaseCard c={caseCards[2]} index={2} lang={lang} compact />
                <CaseCard c={caseCards[3]} index={3} lang={lang} />
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
