import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { useLanguage } from '@/context/LanguageContext';

// ── Count-up ─────────────────────────────────────────────────────────

function CountUp({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration, ease: 'easeOut' });
    return controls.stop;
  }, [inView, count, to, duration]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { labelKo: '시스템 가동률', labelEn: 'System Uptime', numeric: 99, suffix: '.9%', trend: '+0.1%' },
  { labelKo: '처리된 데이터', labelEn: 'Data Processed', numeric: 5000, suffix: '만+', trend: '+1,200만' },
  { labelKo: '업무 효율 향상', labelEn: 'Efficiency Gain', numeric: 3, suffix: '배', trend: '↑ 매분기' },
  { labelKo: '평균 도입 소요', labelEn: 'Avg. Time to Deploy', numeric: 24, suffix: 'h', trend: '↓ 계속 단축' },
];

// ── 미션 섹션 자유 상승곡선 배경 ─────────────────────────────────────

function FreeCurve() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="curveGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#448CFF" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#6366F1" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="curveAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#448CFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#448CFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 자유 상승 곡선 — 유기적인 베지에 */}
        <motion.path
          d="M -80 580 C 0 520 60 540 180 460 C 280 390 320 430 440 340 C 560 250 580 300 700 210 C 820 120 860 170 980 80 C 1080 10 1140 50 1280 -30"
          stroke="url(#curveGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, ease: 'easeInOut', delay: 0.2 }}
        />
        {/* 면적 채우기 */}
        <motion.path
          d="M -80 580 C 0 520 60 540 180 460 C 280 390 320 430 440 340 C 560 250 580 300 700 210 C 820 120 860 170 980 80 C 1080 10 1140 50 1280 -30 L 1280 600 L -80 600 Z"
          fill="url(#curveAreaGrad)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.5 }}
        />

        {/* 두 번째 보조 곡선 (더 부드럽게) */}
        <motion.path
          d="M -80 620 C 100 570 200 590 350 510 C 500 430 550 470 680 390 C 810 310 850 350 980 270 C 1110 190 1180 220 1300 150"
          stroke="#448CFF" strokeWidth="1.5" strokeOpacity="0.06"
          strokeLinecap="round" fill="none" strokeDasharray="8 6"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1, ease: 'easeInOut' }}
        />

        {/* 데이터 점들 */}
        {[
          [130, 485], [300, 395], [520, 285], [730, 175], [960, 90]
        ].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="5.5"
            fill="#448CFF" fillOpacity="0.18"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.8 + i * 0.22, duration: 0.4 }}
          />
        ))}
      </svg>
    </div>
  );
}

// ── 미션 글라스모피즘 ─────────────────────────────────────────────────

function AboutMission({ lang }: { lang: 'ko' | 'en' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-[#F0F6FF] to-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#C7DEFF] blur-[100px] opacity-20 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#D4EEFF] blur-[100px] opacity-15 translate-y-1/3 -translate-x-1/3" />
      </div>

      {/* 자유 상승 곡선 배경 */}
      <FreeCurve />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm font-black text-[#448CFF] tracking-widest uppercase mb-8"
        >
          {lang === 'ko' ? '우리의 미션' : 'Our Mission'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-3xl p-10 lg:p-14 mx-auto max-w-3xl"
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(28px)',
            border: '1.5px solid rgba(255,255,255,0.95)',
            boxShadow: '0 24px 64px rgba(68,140,255,0.12), 0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <h2
            className="font-black text-[#444B52] leading-[1.15] tracking-tight mb-6"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}
          >
            {lang === 'ko' ? (
              <>돌봄이 필요한 모든 사람에게<br /><span className="gradient-text">더 좋은 내일</span>을</>
            ) : (
              <>A better tomorrow<br />for <span className="gradient-text">everyone who needs care</span></>
            )}
          </h2>

          <p className="text-base lg:text-lg text-[#4B4E56] leading-relaxed font-medium max-w-xl mx-auto mb-10">
            {lang === 'ko'
              ? 'INNO-HI는 복잡한 복지·의료 현장의 업무를 지능화하여,\n종사자는 덜 소진되고 이용자는 더 나은 서비스를 받는 세상을 만듭니다.'
              : 'INNO-HI intelligentizes complex welfare and medical workflows,\nso care workers burn out less and service recipients receive better care.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="text-center p-3 rounded-2xl"
                style={{ background: 'rgba(68,140,255,0.06)' }}
              >
                <div className="text-xl sm:text-2xl font-black text-[#444B52] tracking-tight mb-0.5">
                  <CountUp to={s.numeric} suffix={s.suffix} duration={1.8} />
                </div>
                <div className="text-[10px] font-semibold text-[#9CA3AF] mb-1">
                  {lang === 'ko' ? s.labelKo : s.labelEn}
                </div>
                <div className="text-[10px] font-bold text-emerald-500">{s.trend}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 수직 타임라인 (좌우 교차형) ──────────────────────────────────────

const timeline = [
  { year: '2022', eventKo: '이노하이 창업\n복지 현장 AI 인프라 비전 수립', eventEn: 'INNO-HI founded\nVision for care sector AI infrastructure' },
  { year: '2023', eventKo: '서울시 복지관 파일럿 도입\n음성 인식 엔진 v1 출시', eventEn: 'Pilot in Seoul welfare centers\nVoice recognition engine v1 released' },
  { year: '2024', eventKo: '전국 17개 기관 확산\n예측 분석 모듈 출시', eventEn: 'Expanded to 17 institutions nationwide\nPredictive analytics module launched' },
  { year: '2025', eventKo: '의료·공공 부문 진출\n5,000만건 데이터 처리 달성', eventEn: 'Entered healthcare & public sector\n50M data records processed' },
];

function TimelineItem({ item, index, lang, isLast }: {
  item: typeof timeline[0]; index: number; lang: 'ko' | 'en'; isLast: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="relative grid grid-cols-[1fr_60px_1fr] items-start"
    >
      <div className={`py-8 pr-8 ${isLeft ? '' : 'invisible'}`}>
        {isLeft && (
          <div className="text-right">
            <p className="text-xs font-black text-[#448CFF] mb-2">{item.year}</p>
            <p className="text-[15px] text-[#4B4E56] leading-relaxed font-medium whitespace-pre-line">
              {lang === 'ko' ? item.eventKo : item.eventEn}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="w-11 h-11 rounded-2xl bg-[#EEF4FF] border-2 border-[#C7DEFF] flex items-center justify-center flex-shrink-0 z-10 mt-8">
          <span className="text-xs font-black text-[#448CFF]">{item.year}</span>
        </div>
        {!isLast && (
          <motion.div
            className="w-0.5 bg-[#D3D8DF] mt-1"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
            style={{ minHeight: 56 }}
          />
        )}
      </div>
      <div className={`py-8 pl-8 ${!isLeft ? '' : 'invisible'}`}>
        {!isLeft && (
          <div>
            <p className="text-xs font-black text-[#448CFF] mb-2">{item.year}</p>
            <p className="text-[15px] text-[#4B4E56] leading-relaxed font-medium whitespace-pre-line">
              {lang === 'ko' ? item.eventKo : item.eventEn}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Timeline({ lang }: { lang: 'ko' | 'en' }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-black text-[#448CFF] tracking-widest uppercase mb-4">
            {lang === 'ko' ? '이노하이의 여정' : "INNO-HI's Journey"}
          </p>
          <h2
            className="font-black text-[#444B52] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}
          >
            {lang === 'ko' ? (<>작은 시작,<br />큰 변화</>) : (<>Small Start,<br />Big Change</>)}
          </h2>
        </motion.div>

        <div>
          {timeline.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} lang={lang} isLast={i === timeline.length - 1} />
          ))}
          <motion.div
            className="relative grid grid-cols-[1fr_60px_1fr] items-start"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: timeline.length * 0.12 }}
          >
            <div />
            <div className="flex flex-col items-center pt-8">
              <div className="w-11 h-11 rounded-2xl border-2 border-dashed border-[#448CFF] flex items-center justify-center flex-shrink-0">
                <motion.div
                  className="w-3 h-3 rounded-full bg-[#448CFF]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </div>
            <div className="pt-10 pl-8">
              <p className="text-xs font-black text-[#9CA3AF] mb-1.5">2026</p>
              <span className="inline-block text-xs font-black text-[#448CFF] bg-[#EEF4FF] px-3 py-1 rounded-full">
                {lang === 'ko' ? '현재 진행 중' : 'In Progress'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 가치관 SVG 아이콘 ─────────────────────────────────────────────────

function SvgPeople() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <circle cx="30" cy="28" r="10" fill="#FF6B8A" fillOpacity="0.85" />
      <ellipse cx="30" cy="54" rx="16" ry="10" fill="#FF6B8A" fillOpacity="0.5" />
      <circle cx="54" cy="32" r="8" fill="#FF6B8A" fillOpacity="0.6" />
      <ellipse cx="54" cy="54" rx="13" ry="8" fill="#FF6B8A" fillOpacity="0.3" />
      <path d="M30 38C30 38 38 42 46 38" stroke="#FF6B8A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function SvgData() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <rect x="10" y="50" width="12" height="20" rx="3" fill="#448CFF" fillOpacity="0.7" />
      <rect x="28" y="38" width="12" height="32" rx="3" fill="#448CFF" fillOpacity="0.85" />
      <rect x="46" y="26" width="12" height="44" rx="3" fill="#448CFF" />
      <rect x="64" y="14" width="8" height="56" rx="3" fill="#448CFF" fillOpacity="0.6" />
      <path d="M10 55 L34 42 L52 30 L68 18" stroke="#448CFF" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
    </svg>
  );
}
function SvgShield() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <path d="M40 8L12 20v22c0 18 12 30 28 34 16-4 28-16 28-34V20L40 8z" fill="#22C55E" fillOpacity="0.15" stroke="#22C55E" strokeWidth="2" />
      <path d="M26 40l10 10 18-18" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="40" cy="40" r="24" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.4" />
    </svg>
  );
}

const coreValues = [
  {
    color: '#FF6B8A', bg: '#FFF0F4',
    accentKo: '사람이 먼저', accentEn: 'People First',
    titleKo: '기술은 수단,\n사람이 목적입니다', titleEn: 'Technology is a tool.\nPeople are the purpose.',
    descKo: '모든 설계의 중심은 이용자와 현장 종사자입니다. 화려한 기술보다 사람에게 실제로 도움이 되는 것을 먼저 생각합니다.',
    descEn: 'Every design centers on users and care workers. We prioritize what genuinely helps people over impressive technology.',
    Svg: SvgPeople,
  },
  {
    color: '#448CFF', bg: '#EEF4FF',
    accentKo: '데이터로 증명', accentEn: 'Proven by Data',
    titleKo: '측정 가능한 변화만이\n진짜 변화입니다', titleEn: 'Only measurable change\nis real change.',
    descKo: '선의만으로는 부족합니다. 도입 전후를 수치로 비교하고, 지속적으로 개선합니다.',
    descEn: 'Good intentions are not enough. We compare before and after numerically, and continuously improve.',
    Svg: SvgData,
  },
  {
    color: '#22C55E', bg: '#ECFDF5',
    accentKo: '모두를 위한 기술', accentEn: 'Tech for Everyone',
    titleKo: '디지털 격차가\n돌봄의 격차가 되지 않도록', titleEn: "Digital gaps must not\nbecome care gaps.",
    descKo: '가장 소외된 곳에 먼저 닿는 기술을 지향합니다. 기술의 혜택은 모든 사람에게 공평해야 합니다.',
    descEn: "We build technology that reaches the most underserved first. The benefits of technology must be equitable.",
    Svg: SvgShield,
  },
];

function ValueCard({ v, lang }: { v: typeof coreValues[0]; lang: 'ko' | 'en' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative rounded-3xl overflow-hidden bg-white border border-[#EAEDF2] hover:shadow-xl transition-all duration-300"
    >
      <div className="relative flex items-center justify-center pt-10 pb-6" style={{ background: v.bg }}>
        <div className="w-20 h-20"><v.Svg /></div>
        <div
          className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: v.color + '20', color: v.color }}
        >
          {lang === 'ko' ? v.accentKo : v.accentEn}
        </div>
      </div>
      <div className="p-7 lg:p-8">
        <h3 className="font-black text-[#444B52] leading-tight tracking-tight mb-4 whitespace-pre-line"
          style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}>
          {lang === 'ko' ? v.titleKo : v.titleEn}
        </h3>
        <p className="text-[14px] text-[#4B4E56] leading-relaxed font-medium">
          {lang === 'ko' ? v.descKo : v.descEn}
        </p>
      </div>
      <div className="h-1 w-full" style={{ background: v.color }} />
    </motion.div>
  );
}

function ValuesSection({ lang }: { lang: 'ko' | 'en' }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  return (
    <section className="bg-[#F8F9FD] py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-black text-[#448CFF] tracking-widest uppercase mb-4">
            {lang === 'ko' ? '우리가 지향하는 것' : 'What We Stand For'}
          </p>
          <h2 className="font-black text-[#444B52] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}>
            {lang === 'ko' ? (
              <>기술이 아니라<br /><span className="gradient-text">가치로 만든 회사</span></>
            ) : (
              <>A company built on values,<br /><span className="gradient-text">not just technology</span></>
            )}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((v, i) => <ValueCard key={i} v={v} lang={lang} />)}
        </div>
      </div>
    </section>
  );
}

// ── 메인 About 페이지 ─────────────────────────────────────────────────

export function AboutPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">본문으로 바로가기</a>
      <Navigation />
      <main id="main-content">

        {/* 히어로 — 전체 뷰포트, 중앙정렬 */}
        <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#EEF4FF] via-[#F4F8FF] to-white">
          {/* 배경 블러 오브 */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -left-40 w-[500px] h-[500px] bg-[#C7DEFF] rounded-full blur-[120px] opacity-20" />
            <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-[#D4EEFF] rounded-full blur-[120px] opacity-20" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24 text-center w-full">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-sm font-black mb-5 tracking-widest uppercase text-[#448CFF]"
            >
              INNO-HI
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black text-[#444B52] leading-[1.15] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}
            >
              {lang === 'ko' ? (
                <>INNO-HI는<br /><span className="gradient-text">돌봄 산업의 AI 인프라</span>입니다</>
              ) : (
                <>INNO-HI is the<br /><span className="gradient-text">AI Infrastructure for Care</span></>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base lg:text-lg leading-relaxed text-[#4B4E56] font-medium max-w-xl mx-auto mb-10"
            >
              {lang === 'ko' ? (
                <>복지, 의료, 공공 현장의 복잡한 업무를 지능화하여<br />종사자의 번아웃을 줄이고,<br />더 많은 사람이 더 나은 돌봄을 받을 수 있게 합니다.</>
              ) : (
                <>We intelligentize complex workflows in welfare,<br />healthcare, and public sectors —<br />reducing caregiver burnout and expanding better care.</>
              )}
            </motion.p>

            {/* 스크롤 힌트 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-2 justify-center"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-5 h-8 rounded-full border-2 border-[#D3D8DF] flex items-start justify-center pt-1.5"
              >
                <div className="w-1 h-2 rounded-full bg-[#9CA3AF]" />
              </motion.div>
              <span className="text-xs text-[#B0BAC8] font-medium">
                {lang === 'ko' ? '스크롤하여 더 보기' : 'Scroll to explore'}
              </span>
            </motion.div>
          </div>
        </section>

        {/* 미션 → 연혁 → 가치관 */}
        <AboutMission lang={lang} />
        <Timeline lang={lang} />
        <ValuesSection lang={lang} />

      </main>
      <Footer />
    </div>
  );
}
