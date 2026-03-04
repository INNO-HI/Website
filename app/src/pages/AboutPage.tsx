import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import govLogoSrc from '@/assets/gov-logo.svg';
import heroBgSrc from '@/assets/hero-bg.jpg';

// ── 섹션 래퍼 ─────────────────────────────────────────────────────────

function Section({ children, className = '', bg = 'bg-white' }: { children: React.ReactNode; className?: string; bg?: string }) {
  return (
    <section className={`py-28 lg:py-[140px] ${bg} ${className}`}>
      <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-14">
        <div className="max-w-[1360px] mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
}



// ── A. Hero ──────────────────────────────────────────────────────────

function Hero({ lang }: { lang: 'ko' | 'en' }) {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-start justify-center pt-[28vh]">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroBgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* 블루 톤 오버레이 (붉은끼 제거) */}
      <div className="absolute inset-0 bg-[#0A1A3A]/30" />

      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold text-white leading-[1.35] tracking-tight"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
        >
          {lang === 'ko' ? (
            <>사람을 더 깊이 이해하는 기술로<br />세상을 더 지능적으로 만듭니다.</>
          ) : (
            <>With technology that understands people deeper,<br />we make the world more intelligent.</>
          )}
        </motion.h1>

      </div>

      {/* 스크롤 유도 화살표 — 화면 하단 고정 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M3 8l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── A-2. Mission (이미지 줌 → 배경 밝아지며 텍스트 플립) ─────────────

/* 떠다니는 데이터 대시보드 SVG 배경 */
function DataPanelsBg() {
  return (
    <svg viewBox="0 0 1440 900" fill="none" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mBg" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E4EDFC" />
          <stop offset="40%" stopColor="#EBF1FF" />
          <stop offset="100%" stopColor="#F5F8FF" />
        </linearGradient>
        <linearGradient id="panelFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#448CFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#448CFF" stopOpacity="0.03" />
        </linearGradient>
        {/* 글로우 */}
        <filter id="glow"><feGaussianBlur stdDeviation="18" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <rect width="1440" height="900" fill="url(#mBg)" />

      {/* 그리드 라인 (원근감) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`vl${i}`} x1={120 * i} y1="0" x2={120 * i} y2="900" stroke="#448CFF" strokeWidth="0.4" strokeOpacity="0.06" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`hl${i}`} x1="0" y1={112.5 * i} x2="1440" y2={112.5 * i} stroke="#448CFF" strokeWidth="0.4" strokeOpacity="0.06" />
      ))}

      {/* 패널 1: 메인 대시보드 (중앙 크게) */}
      <g transform="translate(440, 220) rotate(-3)" opacity="0.85">
        <rect width="360" height="240" rx="12" fill="url(#panelFill)" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.25" />
        <rect x="16" y="16" width="200" height="10" rx="5" fill="#448CFF" fillOpacity="0.2" />
        <rect x="16" y="36" width="120" height="6" rx="3" fill="#448CFF" fillOpacity="0.1" />
        {/* 바 차트 */}
        <rect x="24" y="160" width="28" height="55" rx="3" fill="#448CFF" fillOpacity="0.18" />
        <rect x="62" y="130" width="28" height="85" rx="3" fill="#448CFF" fillOpacity="0.25" />
        <rect x="100" y="100" width="28" height="115" rx="3" fill="#448CFF" fillOpacity="0.32" />
        <rect x="138" y="120" width="28" height="95" rx="3" fill="#448CFF" fillOpacity="0.22" />
        <rect x="176" y="80" width="28" height="135" rx="3" fill="#448CFF" fillOpacity="0.35" />
        {/* 라인 차트 */}
        <polyline points="230,180 260,140 290,155 320,110 340,125" stroke="#448CFF" strokeWidth="2" strokeOpacity="0.4" fill="none" strokeLinejoin="round" />
        <circle cx="320" cy="110" r="4" fill="#448CFF" fillOpacity="0.5" />
        {/* 도넛 */}
        <circle cx="300" cy="68" r="22" stroke="#448CFF" strokeWidth="5" strokeOpacity="0.15" fill="none" />
        <circle cx="300" cy="68" r="22" stroke="#448CFF" strokeWidth="5" strokeOpacity="0.4" fill="none" strokeDasharray="50 88" strokeLinecap="round" />
      </g>

      {/* 패널 2: 우상단 작은 차트 */}
      <g transform="translate(920, 100) rotate(5)" opacity="0.7">
        <rect width="200" height="140" rx="10" fill="url(#panelFill)" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.2" />
        <rect x="12" y="12" width="80" height="8" rx="4" fill="#448CFF" fillOpacity="0.18" />
        <rect x="12" y="28" width="50" height="5" rx="2.5" fill="#448CFF" fillOpacity="0.08" />
        {/* 에어리어 차트 */}
        <path d="M12,120 L50,90 L90,100 L130,65 L170,80 L188,60 L188,120 Z" fill="#448CFF" fillOpacity="0.1" />
        <polyline points="12,120 50,90 90,100 130,65 170,80 188,60" stroke="#448CFF" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
      </g>

      {/* 패널 3: 좌상단 캘린더 */}
      <g transform="translate(80, 120) rotate(-6)" opacity="0.6">
        <rect width="180" height="150" rx="10" fill="url(#panelFill)" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.2" />
        <rect x="12" y="12" width="60" height="8" rx="4" fill="#448CFF" fillOpacity="0.2" />
        <text x="140" y="22" fill="#448CFF" fillOpacity="0.3" fontSize="14" fontWeight="bold">21</text>
        {/* 그리드 셀 */}
        {Array.from({ length: 20 }).map((_, i) => (
          <rect key={`cal${i}`} x={12 + (i % 5) * 32} y={38 + Math.floor(i / 5) * 26} width="26" height="20" rx="3" fill="#448CFF" fillOpacity={i === 7 ? 0.25 : 0.05} stroke="#448CFF" strokeWidth="0.4" strokeOpacity="0.08" />
        ))}
      </g>

      {/* 패널 4: 좌하단 파이 */}
      <g transform="translate(120, 550) rotate(4)" opacity="0.55">
        <rect width="190" height="160" rx="10" fill="url(#panelFill)" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.18" />
        <circle cx="95" cy="90" r="40" stroke="#448CFF" strokeWidth="6" strokeOpacity="0.12" fill="none" />
        <circle cx="95" cy="90" r="40" stroke="#448CFF" strokeWidth="6" strokeOpacity="0.35" fill="none" strokeDasharray="75 176" strokeLinecap="round" />
        <circle cx="95" cy="90" r="40" stroke="#6AA8FF" strokeWidth="6" strokeOpacity="0.25" fill="none" strokeDasharray="45 206" strokeDashoffset="-75" strokeLinecap="round" />
        <rect x="14" y="14" width="70" height="7" rx="3.5" fill="#448CFF" fillOpacity="0.15" />
      </g>

      {/* 패널 5: 우하단 테이블 */}
      <g transform="translate(1000, 520) rotate(-4)" opacity="0.6">
        <rect width="220" height="170" rx="10" fill="url(#panelFill)" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.2" />
        <rect x="12" y="12" width="90" height="8" rx="4" fill="#448CFF" fillOpacity="0.18" />
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={`row${i}`}>
            <rect x="12" y={38 + i * 24} width="196" height="18" rx="3" fill="#448CFF" fillOpacity={i === 0 ? 0.08 : 0.03} />
            <rect x="16" y={42 + i * 24} width={60 + Math.sin(i) * 20} height="6" rx="3" fill="#448CFF" fillOpacity="0.12" />
            <rect x="140" y={42 + i * 24} width={40 + Math.cos(i) * 10} height="6" rx="3" fill="#448CFF" fillOpacity="0.08" />
          </g>
        ))}
      </g>

      {/* 패널 6: 우측 중간 KPI */}
      <g transform="translate(1160, 300) rotate(3)" opacity="0.5">
        <rect width="160" height="120" rx="10" fill="url(#panelFill)" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.18" />
        <rect x="12" y="12" width="50" height="6" rx="3" fill="#448CFF" fillOpacity="0.12" />
        <text x="14" y="56" fill="#448CFF" fillOpacity="0.35" fontSize="28" fontWeight="bold">87%</text>
        <rect x="12" y="78" width="136" height="8" rx="4" fill="#448CFF" fillOpacity="0.06" />
        <rect x="12" y="78" width="118" height="8" rx="4" fill="#448CFF" fillOpacity="0.2" />
        <rect x="12" y="96" width="136" height="8" rx="4" fill="#448CFF" fillOpacity="0.06" />
        <rect x="12" y="96" width="82" height="8" rx="4" fill="#448CFF" fillOpacity="0.15" />
      </g>

      {/* 연결선 + 노드 */}
      <line x1="620" y1="460" x2="720" y2="550" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.12" />
      <line x1="800" y1="460" x2="900" y2="540" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.1" />
      <line x1="260" y1="270" x2="440" y2="280" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.08" />
      <line x1="800" y1="240" x2="920" y2="180" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.08" />

      {/* 빛나는 점들 */}
      <circle cx="100" cy="800" r="3" fill="#448CFF" fillOpacity="0.3" filter="url(#glow)" />
      <circle cx="1350" cy="100" r="4" fill="#6AA8FF" fillOpacity="0.25" filter="url(#glow)" />
      <circle cx="720" cy="750" r="2.5" fill="#448CFF" fillOpacity="0.2" />
      <circle cx="1300" cy="650" r="2" fill="#448CFF" fillOpacity="0.15" />
      <circle cx="50" cy="450" r="2" fill="#6AA8FF" fillOpacity="0.2" />

      {/* 좌상단 광선 */}
      <ellipse cx="0" cy="0" rx="400" ry="300" fill="#ffffff" fillOpacity="0.03" />
    </svg>
  );
}

function Mission({ lang }: { lang: 'ko' | 'en' }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // SVG 배경 줌 (1 → 1.2)
  const bgScale = useTransform(scrollYProgress, [0, 0.45], [1, 1.2]);
  // 어두운 배경 (0~0.42 유지, 0.42~0.55 사라짐)
  const darkOpacity = useTransform(scrollYProgress, [0, 0.42, 0.55], [1, 1, 0]);
  // 밝은 배경 등장
  const brightOpacity = useTransform(scrollYProgress, [0.42, 0.55], [0, 1]);
  // 텍스트 1 (어두운 배경 위 흰 글씨)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.38, 0.48], [0, 1, 1, 0]);
  // 텍스트 2 (밝은 배경 위 진한 글씨, 플립)
  const text2Opacity = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);
  const text2RotateX = useTransform(scrollYProgress, [0.5, 0.62], [90, 0]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* SVG 배경 + 줌 */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: bgScale, opacity: darkOpacity }}
        >
          <DataPanelsBg />
        </motion.div>

        {/* 밝은 배경 */}
        <motion.div
          className="absolute inset-0 bg-[#F5F8FF]"
          style={{ opacity: brightOpacity }}
        />

        {/* 텍스트 1 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6 z-10"
          style={{ opacity: text1Opacity }}
        >
          <p
            className="text-[#595959] font-bold text-center leading-[1.5] tracking-tight whitespace-pre-line"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
          >
            {lang === 'ko'
              ? '데이터는 계속 쌓이고 있지만\n세상을 움직이는 방식은 크게 달라지지 않았습니다.'
              : 'Data keeps accumulating,\nbut the way the world operates has barely changed.'}
          </p>
        </motion.div>

        {/* 텍스트 2: 플립 등장 */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10"
          style={{
            opacity: text2Opacity,
            rotateX: text2RotateX,
            perspective: 800,
          }}
        >
          <p
            className="text-[#595959] font-bold text-center leading-[1.5] tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
          >
            {lang === 'ko'
              ? '기술과 데이터로 더 지능적인 세상을 만들고,'
              : 'We create a more intelligent world with technology and data,'}
          </p>
          <p
            className="text-[#595959] font-bold text-center leading-[1.5] tracking-tight mt-2"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}
          >
            {lang === 'ko'
              ? '더 나은 내일의 기준을 만들어가겠습니다.'
              : 'and set the standard for a better tomorrow.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── B. Problem ───────────────────────────────────────────────────────

/* 카드별 일러스트 — 우측 배경 장식 */
const problemIllusts = [
  /* 0: 데이터 활성화 — 허브 + 연결 노드 */
  <svg key="pi0" viewBox="0 0 140 140" fill="none">
    <circle cx="70" cy="70" r="14" stroke="#448CFF" strokeWidth="1.5" strokeOpacity="0.3" fill="#448CFF" fillOpacity="0.06" />
    <circle cx="70" cy="70" r="5" fill="#448CFF" fillOpacity="0.45" />
    <circle cx="70" cy="70" r="28" stroke="#448CFF" strokeWidth="0.7" strokeOpacity="0.1" />
    <circle cx="70" cy="70" r="44" stroke="#448CFF" strokeWidth="0.5" strokeOpacity="0.07" strokeDasharray="3 4" />
    {/* 노드 6개 */}
    <circle cx="70" cy="26" r="5" fill="#448CFF" fillOpacity="0.35" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.2" />
    <circle cx="108" cy="48" r="4" fill="#448CFF" fillOpacity="0.25" />
    <circle cx="108" cy="92" r="4.5" fill="#448CFF" fillOpacity="0.3" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.15" />
    <circle cx="70" cy="114" r="5" fill="#448CFF" fillOpacity="0.35" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.2" />
    <circle cx="32" cy="92" r="3.5" fill="#448CFF" fillOpacity="0.2" />
    <circle cx="32" cy="48" r="4" fill="#448CFF" fillOpacity="0.25" />
    {/* 연결선 */}
    <line x1="70" y1="56" x2="70" y2="31" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.18" />
    <line x1="82" y1="62" x2="104" y2="50" stroke="#448CFF" strokeWidth="0.7" strokeOpacity="0.14" />
    <line x1="82" y1="78" x2="104" y2="90" stroke="#448CFF" strokeWidth="0.7" strokeOpacity="0.14" />
    <line x1="70" y1="84" x2="70" y2="109" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.18" />
    <line x1="58" y1="78" x2="36" y2="90" stroke="#448CFF" strokeWidth="0.7" strokeOpacity="0.14" />
    <line x1="58" y1="62" x2="36" y2="50" stroke="#448CFF" strokeWidth="0.7" strokeOpacity="0.14" />
    {/* 활성 펄스 */}
    <circle cx="70" cy="26" r="9" fill="none" stroke="#448CFF" strokeWidth="0.5" strokeOpacity="0.1" />
    <circle cx="108" cy="92" r="8" fill="none" stroke="#448CFF" strokeWidth="0.5" strokeOpacity="0.08" />
  </svg>,

  /* 1: 보고서→통찰 — 문서 → 차트 변환 */
  <svg key="pi1" viewBox="0 0 140 140" fill="none">
    {/* 문서 스택 */}
    <rect x="14" y="38" width="36" height="48" rx="3" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.18" fill="#448CFF" fillOpacity="0.03" />
    <rect x="10" y="42" width="36" height="48" rx="3" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.12" fill="#448CFF" fillOpacity="0.02" />
    <line x1="20" y1="50" x2="44" y2="50" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.12" />
    <line x1="20" y1="57" x2="40" y2="57" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.1" />
    <line x1="20" y1="64" x2="42" y2="64" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.08" />
    <line x1="20" y1="71" x2="38" y2="71" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.06" />
    {/* 변환 화살표 */}
    <path d="M54 65 L72 65" stroke="#448CFF" strokeWidth="1.2" strokeOpacity="0.2" />
    <path d="M68 61 L73 65 L68 69" stroke="#448CFF" strokeWidth="1.2" strokeOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
    {/* 상승 바 차트 */}
    <rect x="82" y="78" width="10" height="18" rx="2" fill="#448CFF" fillOpacity="0.15" />
    <rect x="96" y="60" width="10" height="36" rx="2" fill="#448CFF" fillOpacity="0.22" />
    <rect x="110" y="42" width="10" height="54" rx="2" fill="#448CFF" fillOpacity="0.32" />
    {/* 인사이트 스파크 */}
    <circle cx="115" cy="34" r="2.5" fill="#448CFF" fillOpacity="0.4" />
    <line x1="115" y1="28" x2="115" y2="40" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.15" />
    <line x1="109" y1="34" x2="121" y2="34" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.15" />
  </svg>,

  /* 2: 핵심 집중 — 산만→타겟 수렴 */
  <svg key="pi2" viewBox="0 0 140 140" fill="none">
    {/* 타겟 */}
    <circle cx="90" cy="70" r="26" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.15" />
    <circle cx="90" cy="70" r="16" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.12" />
    <circle cx="90" cy="70" r="6" fill="#448CFF" fillOpacity="0.35" />
    {/* 산만한 점들 (좌측) */}
    <circle cx="20" cy="28" r="3.5" fill="#448CFF" fillOpacity="0.12" stroke="#448CFF" strokeWidth="0.5" strokeOpacity="0.1" />
    <circle cx="15" cy="65" r="3" fill="#448CFF" fillOpacity="0.1" />
    <circle cx="25" cy="105" r="3.5" fill="#448CFF" fillOpacity="0.12" stroke="#448CFF" strokeWidth="0.5" strokeOpacity="0.1" />
    <circle cx="42" cy="42" r="2.5" fill="#448CFF" fillOpacity="0.1" />
    <circle cx="38" cy="88" r="3" fill="#448CFF" fillOpacity="0.1" />
    {/* 수렴 경로 */}
    <path d="M23 30 L68 58" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.1" strokeDasharray="3 3" />
    <path d="M18 65 L64 68" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.08" strokeDasharray="3 3" />
    <path d="M28 103 L68 80" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.1" strokeDasharray="3 3" />
    <path d="M44 43 L70 60" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.08" strokeDasharray="3 3" />
    <path d="M41 87 L70 76" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.08" strokeDasharray="3 3" />
    {/* 수렴 화살표 헤드 */}
    <path d="M64 56 L68 58 L64 61" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.12" />
    <path d="M64 78 L68 80 L65 83" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.12" />
  </svg>,

  /* 3: 즉시 전환 — 토글 스위치 ON */
  <svg key="pi3" viewBox="0 0 140 140" fill="none">
    {/* 토글 트랙 */}
    <rect x="25" y="50" width="70" height="36" rx="18" stroke="#448CFF" strokeWidth="1.5" strokeOpacity="0.2" fill="#448CFF" fillOpacity="0.04" />
    {/* 토글 놉 (ON 위치) */}
    <circle cx="77" cy="68" r="13" fill="#448CFF" fillOpacity="0.2" stroke="#448CFF" strokeWidth="1.2" strokeOpacity="0.35" />
    <circle cx="77" cy="68" r="5" fill="#448CFF" fillOpacity="0.5" />
    {/* 전원 심볼 */}
    <line x1="77" y1="60" x2="77" y2="64" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
    <path d="M72 62.5 A6.5 6.5 0 1 0 82 62.5" stroke="white" strokeWidth="1" strokeOpacity="0.35" fill="none" />
    {/* 활성 방사선 */}
    <line x1="98" y1="56" x2="106" y2="50" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.18" strokeLinecap="round" />
    <line x1="100" y1="68" x2="110" y2="68" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.18" strokeLinecap="round" />
    <line x1="98" y1="80" x2="106" y2="86" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.18" strokeLinecap="round" />
    {/* 번개 */}
    <path d="M58 28 L52 44 L58 44 L53 56" stroke="#448CFF" strokeWidth="1.2" strokeOpacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
    {/* ON 텍스트 힌트 */}
    <circle cx="43" cy="68" r="2" fill="#448CFF" fillOpacity="0.08" />
  </svg>,
];

function ProblemCard({ p, i, lang }: {
  p: {
    fromKo: string; fromEn: string;
    toKo: string; toEn: string;
    descKo: string; descEn: string;
    closingKo: string; closingEn: string;
  };
  i: number;
  lang: 'ko' | 'en';
}) {
  const [active, setActive] = useState(false);
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-60px' });

  // 카드별 슬라이드 방향: 좌상, 우상, 좌하, 우하
  const directions = [
    { x: -60, y: 40 },
    { x: 60, y: 40 },
    { x: -60, y: 40 },
    { x: 60, y: 40 },
  ];
  const dir = directions[i] || { x: 0, y: 40 };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.95 }}
      animate={cardInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(68,140,255,0.12)' }}
      className="relative aspect-[2/1] rounded-2xl cursor-pointer overflow-hidden"
      style={{
        background: '#ffffff',
        border: '1px solid #E5E8EB',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      }}
      onClick={() => setActive(!active)}
    >
      {/* 우측 일러스트 배경 */}
      <motion.div
        className="absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 w-[38%] aspect-square pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={cardInView ? { opacity: 0.7, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: i * 0.12 + 0.3 }}
      >
        {problemIllusts[i]}
      </motion.div>

      {/* 기본 상태: from → to */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between p-6 lg:p-7"
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <motion.p
            className="text-[14px] lg:text-[15px] text-[#595959] leading-relaxed mb-1"
            initial={{ opacity: 0, y: 10 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 + 0.2 }}
          >
            {lang === 'ko' ? p.fromKo : p.fromEn}
          </motion.p>
          <motion.h3
            className="text-[20px] lg:text-[22px] font-bold text-[#595959] leading-snug"
            initial={{ opacity: 0, y: 10 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
          >
            {lang === 'ko' ? p.toKo : p.toEn}
          </motion.h3>
        </div>
        {/* 플러스 버튼: 클릭 시 45도 회전(X로 변환) */}
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-[#448CFF]/40 flex items-center justify-center"
          animate={{ rotate: active ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="2" x2="6" y2="10" stroke="#448CFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="2" y1="6" x2="10" y2="6" stroke="#448CFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>

      {/* 클릭 시: 불투명 유리 질감 + 설명 */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center p-6 lg:p-7 rounded-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.65) 0%, rgba(245,248,255,0.5) 50%, rgba(235,240,250,0.55) 100%)',
          backdropFilter: 'blur(28px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
          border: '1px solid rgba(255,255,255,0.45)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 1px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.06)',
        }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.35 }}
      >
        <p className="text-[14px] lg:text-[15px] text-[#595959] leading-[1.85] whitespace-pre-line">
          {lang === 'ko' ? p.descKo : p.descEn}
        </p>
        {p.closingKo && (
          <p className="text-[13px] lg:text-[14px] text-[#595959] font-semibold mt-4 whitespace-pre-line leading-relaxed">
            {lang === 'ko' ? p.closingKo : p.closingEn}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

function Problem({ lang }: { lang: 'ko' | 'en' }) {
  const problems = [
    {
      fromKo: '잠든 데이터가 아니라,',
      fromEn: 'Not dormant data,',
      toKo: '스스로 작동하는 데이터로',
      toEn: 'but self-operating data',
      descKo: '상담 기록과 운영 데이터는\n단순한 저장 자산이 아닙니다.\n\n우리는 데이터를 분석 가능한 구조로 전환하고,\n실시간 판단과 예측으로 연결합니다.',
      descEn: 'Consultation records and operational data\nare not just stored assets.\n\nWe transform data into analyzable structures\nand connect it to real-time decisions and predictions.',
      closingKo: '데이터는 쌓이는 것이 아니라\n의사결정을 돕는 힘이 되어야 합니다.',
      closingEn: 'Data should not just accumulate —\nit should become a force that drives decisions.',
    },
    {
      fromKo: '반복되는 보고서를 넘어',
      fromEn: 'Beyond repetitive reports,',
      toKo: '자동으로 생성되는 통찰로',
      toEn: 'to auto-generated insights',
      descKo: '같은 형식의 보고서가\n매일 수작업으로 작성되고 있습니다.\n\n우리는 기록을 이해하고,\n맥락을 읽고, 자동으로 정리합니다.',
      descEn: 'The same formatted reports\nare manually written every day.\n\nWe understand records,\nread context, and organize automatically.',
      closingKo: '보고서는 시간이 아니라\n지능으로 만들어져야 합니다.',
      closingEn: 'Reports should be created by intelligence,\nnot by time.',
    },
    {
      fromKo: '수작업 중심 현장을 넘어',
      fromEn: 'Beyond manual-driven operations,',
      toKo: '핵심 업무에 집중하는 구조로',
      toEn: 'to structures focused on core work',
      descKo: '행정은 보조 수단이어야 합니다.\n그러나 많은 조직은 행정에 시간을 소비합니다.\n\n우리는 자동화와 지능화를 통해\n사람이 더 중요한 일에 집중할 수 있는\n환경을 만듭니다.',
      descEn: 'Administration should be a supporting tool.\nBut many organizations spend time on admin.\n\nThrough automation and intelligence,\nwe create environments where people\ncan focus on what truly matters.',
      closingKo: '',
      closingEn: '',
    },
    {
      fromKo: '높은 도입 장벽이 아니라',
      fromEn: 'Not high adoption barriers,',
      toKo: '즉시 작동하는 전환',
      toEn: 'but instant transformation',
      descKo: '디지털 전환은\n복잡하고 느려서는 안 됩니다.\n\n우리는 기존 시스템과 연결되는\n경량화된 구조로 빠르게 적용 가능한\n지능 플랫폼을 제공합니다.',
      descEn: 'Digital transformation should not\nbe complex and slow.\n\nWe provide intelligence platforms\nthrough lightweight structures that connect\nwith existing systems for rapid deployment.',
      closingKo: '전환은 부담이 아니라\n경쟁력이 되어야 합니다.',
      closingEn: 'Transformation should be\na competitive advantage, not a burden.',
    },
  ];

  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section className="bg-white min-h-screen flex flex-col justify-center py-12 lg:py-16">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-14 w-full">
        {/* 헤더 */}
        <motion.h2
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold text-[#595959] text-center leading-[1.3] tracking-tight mb-16 lg:mb-20"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
        >
          {lang === 'ko'
            ? 'AI의 끝은 결국 사람입니다.'
            : 'The end of AI is ultimately people.'}
        </motion.h2>

        {/* 카드 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {problems.map((p, i) => (
            <ProblemCard key={i} p={p} i={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── D. Next Move ─────────────────────────────────────────────────────

function NextMove({ lang }: { lang: 'ko' | 'en' }) {
  const futureValues = [
    {
      titleKo: '지능 엔진', titleEn: 'Intelligence Engine',
      descKo: '음성, 기록, 환경 데이터를\n실시간으로 이해하는\n핵심 AI 엔진을 구축합니다.\n\n단일 기능이 아니라,\n다양한 서비스에 적용 가능한\n공통 지능 기반을 만듭니다.',
      descEn: 'We build a core AI engine\nthat understands voice, records,\nand environmental data in real time.\n\nNot a single function,\nbut a common intelligence foundation\napplicable to diverse services.',
    },
    {
      titleKo: '데이터 네트워크', titleEn: 'Data Network',
      descKo: '현장에서 생성되는 데이터를\n연결하고 학습하고,\n예측하고, 고도화합니다.\n\n데이터는 저장되는 것이 아니라\n지능을 진화시키는 구조가 됩니다.',
      descEn: 'We connect, learn from, predict,\nand enhance data generated in the field.\n\nData doesn\'t just get stored —\nit becomes the structure\nthat evolves intelligence.',
    },
    {
      titleKo: 'Physical AI 확장', titleEn: 'Physical AI Extension',
      descKo: '지능을 화면에 두지 않습니다.\n행정 시스템, 현장 기기,\n공간과 디바이스에 탑재합니다.\n\n소프트웨어를 넘어\n현실에서 작동하는 AI로 확장합니다.',
      descEn: 'We don\'t keep intelligence on screens.\nWe embed it in administrative systems,\nfield devices, spaces and hardware.\n\nBeyond software —\nAI that operates in the real world.',
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 페이즈: hero 0~0.25 | 카드 등장 0.25~0.4 | 카드 펼침 0.4~0.7 | 유지 0.7~1
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.15, 0.28], [1, 0.4, 0]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.12, 0.25], [1, 1, 0]);

  // 카드 등장 (겹친 상태)
  const cardsOpacity = useTransform(scrollYProgress, [0.22, 0.32], [0, 1]);
  // 카드 펼침 진행도 (0=겹침, 1=3단 완전 펼침)
  const spreadProgress = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  // 카드 스케일 (겹쳤을 때 살짝 작게 → 펼치면 1)
  const cardScale = useTransform(scrollYProgress, [0.35, 0.6], [0.92, 1]);

  // 카드별 X 오프셋 (겹침 → 펼침)
  const card0X = useTransform(spreadProgress, [0, 1], ['33.33%', '0%']);
  const card1X = useTransform(spreadProgress, [0, 1], ['0%', '0%']);
  const card2X = useTransform(spreadProgress, [0, 1], ['-33.33%', '0%']);
  const cardXValues = [card0X, card1X, card2X];

  const heroInRef = useRef(null);
  const heroInView = useInView(heroInRef, { once: true, margin: '-15%' });

  const futureIllusts = [
    /* 01 지능 엔진 — 뇌+회로 */
    <svg key="il1" viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <path d="M200 60c-50 0-90 35-90 80 0 30 18 56 45 70l-5 40h100l-5-40c27-14 45-40 45-70 0-45-40-80-90-80z" fill="rgba(68,140,255,0.06)" stroke="#448CFF" strokeWidth="1.5" strokeOpacity="0.3" />
      <line x1="160" y1="130" x2="200" y2="110" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="200" y1="110" x2="240" y2="130" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="200" y1="110" x2="200" y2="80" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="170" y1="150" x2="200" y2="140" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="200" y1="140" x2="230" y2="150" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="200" y1="140" x2="200" y2="170" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.25" />
      <circle cx="200" cy="110" r="4" fill="#448CFF" fillOpacity="0.5" />
      <circle cx="160" cy="130" r="3" fill="#448CFF" fillOpacity="0.35" />
      <circle cx="240" cy="130" r="3" fill="#448CFF" fillOpacity="0.35" />
      <circle cx="200" cy="140" r="3" fill="#448CFF" fillOpacity="0.4" />
      <circle cx="200" cy="80" r="2.5" fill="#448CFF" fillOpacity="0.3" />
      <circle cx="200" cy="110" r="12" fill="none" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.15" />
      <circle cx="200" cy="110" r="22" fill="none" stroke="#448CFF" strokeWidth="0.4" strokeOpacity="0.08" />
    </svg>,
    /* 02 데이터 네트워크 — 연결 그래프 */
    <svg key="il2" viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <line x1="200" y1="80" x2="120" y2="140" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.25" />
      <line x1="200" y1="80" x2="280" y2="140" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.25" />
      <line x1="120" y1="140" x2="200" y2="180" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="280" y1="140" x2="200" y2="180" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="200" y1="180" x2="140" y2="240" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.2" />
      <line x1="200" y1="180" x2="260" y2="240" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.2" />
      <circle cx="200" cy="80" r="8" fill="#448CFF" fillOpacity="0.12" stroke="#448CFF" strokeWidth="1.2" strokeOpacity="0.4" />
      <circle cx="200" cy="80" r="3" fill="#448CFF" fillOpacity="0.5" />
      <circle cx="120" cy="140" r="6" fill="#448CFF" fillOpacity="0.1" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="280" cy="140" r="6" fill="#448CFF" fillOpacity="0.1" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="200" cy="180" r="10" fill="#448CFF" fillOpacity="0.08" stroke="#448CFF" strokeWidth="1.5" strokeOpacity="0.35" />
      <circle cx="200" cy="180" r="4" fill="#448CFF" fillOpacity="0.5" />
      <circle cx="140" cy="240" r="3" fill="#448CFF" fillOpacity="0.07" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.2" />
      <circle cx="260" cy="240" r="3" fill="#448CFF" fillOpacity="0.07" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.2" />
      <line x1="200" y1="80" x2="200" y2="180" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.12" strokeDasharray="4 4" />
    </svg>,
    /* 03 Physical AI — 디바이스+공간 */
    <svg key="il3" viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <rect x="60" y="120" width="80" height="120" rx="4" fill="#448CFF" fillOpacity="0.04" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.2" />
      <rect x="75" y="140" width="20" height="20" rx="2" fill="#448CFF" fillOpacity="0.06" />
      <rect x="105" y="140" width="20" height="20" rx="2" fill="#448CFF" fillOpacity="0.06" />
      <rect x="75" y="170" width="20" height="20" rx="2" fill="#448CFF" fillOpacity="0.06" />
      <rect x="105" y="170" width="20" height="20" rx="2" fill="#448CFF" fillOpacity="0.06" />
      <rect x="260" y="100" width="80" height="55" rx="6" fill="#448CFF" fillOpacity="0.04" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.25" />
      <rect x="268" y="108" width="64" height="36" rx="3" fill="#448CFF" fillOpacity="0.06" />
      <rect x="270" y="190" width="60" height="45" rx="8" fill="#448CFF" fillOpacity="0.04" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="288" cy="208" r="5" fill="#448CFF" fillOpacity="0.12" />
      <circle cx="312" cy="208" r="5" fill="#448CFF" fillOpacity="0.12" />
      <circle cx="200" cy="150" r="6" fill="#448CFF" fillOpacity="0.15" />
      <circle cx="200" cy="150" r="3" fill="#448CFF" fillOpacity="0.4" />
      <circle cx="200" cy="150" r="20" fill="none" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.12" strokeDasharray="3 3" />
      <circle cx="200" cy="150" r="40" fill="none" stroke="#448CFF" strokeWidth="0.6" strokeOpacity="0.08" strokeDasharray="4 4" />
      <line x1="200" y1="150" x2="140" y2="160" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3 3" />
      <line x1="200" y1="150" x2="270" y2="130" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3 3" />
      <line x1="200" y1="150" x2="280" y2="210" stroke="#448CFF" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3 3" />
    </svg>,
  ];

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAFBFF]"
      style={{ height: '350vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* 그라데이션 — 서서히 페이드 */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] w-[200%] aspect-square pointer-events-none blur-[80px]"
          style={{
            background: 'radial-gradient(ellipse at center, #1A5CD8 0%, #2568E6 8%, #2E7BF6 16%, #448CFF 24%, #6AA8FF 34%, #A8CEFF 44%, #FAFBFF 60%, transparent 75%)',
            opacity: gradientOpacity,
          }}
        />

        {/* NEXT FUTURE 텍스트 — 스크롤 시 페이드아웃 */}
        <motion.div
          ref={heroInRef}
          style={{ opacity: heroTextOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 gap-12 lg:gap-20 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="select-none"
          >
            <span
              className="block font-black leading-none whitespace-nowrap text-center text-white/20"
              style={{ fontSize: 'clamp(44px, 10vw, 160px)', letterSpacing: '0.04em' }}
            >
              NEXT FUTURE
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-white leading-snug tracking-tight text-center whitespace-nowrap"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}
          >
            {lang === 'ko'
              ? '사람을 향하는 기술만이 미래를 만듭니다.'
              : 'Only technology that serves people creates the future.'}
          </motion.h2>
        </motion.div>

        {/* 카드 3개 — 겹쳐서 등장 → 3단으로 펼침 */}
        <motion.div
          className="relative z-20 w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-14"
          style={{ opacity: cardsOpacity }}
        >
          <motion.div className="text-center mb-14" style={{ opacity: cardsOpacity }}>
            <motion.h2
              className="font-bold text-[#191F28] leading-[1.3] tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
            >
              {lang === 'ko' ? '이노하이가 만들 세상' : 'The World INNO-HI Creates'}
            </motion.h2>
            {/* 카드와 연결하는 세로 라인 */}
            <div className="mx-auto mt-6 w-px h-10 bg-gradient-to-b from-[#448CFF]/40 to-transparent" />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {futureValues.map((v, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center rounded-3xl bg-white border border-[#E5E8EB] p-8 lg:p-10"
                  style={{
                    x: cardXValues[i],
                    scale: cardScale,
                    boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="w-full h-[180px] flex items-center justify-center opacity-50 mb-8">
                    {futureIllusts[i]}
                  </div>
                  <h3
                    className="font-bold text-[#191F28] leading-snug tracking-tight mb-4"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}
                  >
                    {lang === 'ko' ? v.titleKo : v.titleEn}
                  </h3>
                  <p className="text-[15px] text-[#4E5968] leading-[1.85] whitespace-pre-line">
                    {lang === 'ko' ? v.descKo : v.descEn}
                  </p>
                </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// ── F. Technology ────────────────────────────────────────────────────

/* 기술 모듈별 고유 SVG 일러스트 */

function SpeechSvg() {
  const bars = Array.from({ length: 40 }, (_, i) => {
    const h = Math.abs(Math.sin(i * 0.42 + 0.7)) * 32 + 4;
    return { x: 60 + i * 9, h, op: 0.12 + Math.abs(Math.sin(i * 0.42 + 0.7)) * 0.22 };
  });
  return (
    <svg viewBox="0 0 480 270" fill="none" className="w-[80%] h-[80%]">
      {/* 마이크 */}
      <rect x="195" y="30" width="42" height="85" rx="21" stroke="#448CFF" strokeWidth="1.5" opacity="0.45" />
      <ellipse cx="216" cy="55" rx="10" ry="10" fill="#448CFF" opacity="0.06" />
      <path d="M172 95 C172 135,216 152,216 152" stroke="#448CFF" strokeWidth="1.2" fill="none" opacity="0.3" />
      <path d="M260 95 C260 135,216 152,216 152" stroke="#448CFF" strokeWidth="1.2" fill="none" opacity="0.3" />
      <line x1="216" y1="152" x2="216" y2="175" stroke="#448CFF" strokeWidth="1.2" opacity="0.3" />
      <line x1="196" y1="175" x2="236" y2="175" stroke="#448CFF" strokeWidth="1.5" opacity="0.3" />
      {/* 음파 */}
      <path d="M272 50 Q298 80 272 110" stroke="#448CFF" strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M292 35 Q328 80 292 125" stroke="#448CFF" strokeWidth="1" fill="none" opacity="0.22" />
      <path d="M312 20 Q358 80 312 140" stroke="#448CFF" strokeWidth="0.8" fill="none" opacity="0.13" />
      {/* 파형 바 */}
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={240 - b.h / 2} width="4" rx="2" height={b.h} fill="#448CFF" opacity={b.op} />
      ))}
    </svg>
  );
}

function ContextSvg() {
  return (
    <svg viewBox="0 0 480 270" fill="none" className="w-[80%] h-[80%]">
      {/* 텍스트 라인들 */}
      <rect x="100" y="55" width="200" height="8" rx="4" fill="#448CFF" opacity="0.08" />
      <rect x="100" y="75" width="160" height="8" rx="4" fill="#448CFF" opacity="0.08" />
      <rect x="100" y="95" width="180" height="8" rx="4" fill="#448CFF" opacity="0.08" />
      {/* 오인식 단어 (취소선 + 교정) */}
      <rect x="150" y="55" width="50" height="8" rx="4" fill="#FF6B6B" opacity="0.15" />
      <line x1="150" y1="59" x2="200" y2="59" stroke="#FF6B6B" strokeWidth="1" opacity="0.35" />
      <rect x="150" y="40" width="60" height="8" rx="4" fill="#448CFF" opacity="0.25" />
      <path d="M175 48 L175 55" stroke="#448CFF" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2" />
      {/* 교정 화살표 */}
      <path d="M210 42 L220 42 L218 40 M220 42 L218 44" stroke="#448CFF" strokeWidth="1" opacity="0.3" />
      {/* 뉴럴 네트워크 노드 */}
      {[
        { x: 340, y: 50 }, { x: 380, y: 50 }, { x: 420, y: 50 },
        { x: 360, y: 100 }, { x: 400, y: 100 },
        { x: 340, y: 150 }, { x: 380, y: 150 }, { x: 420, y: 150 },
      ].map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="5" stroke="#448CFF" strokeWidth="1" fill="#448CFF" fillOpacity="0.06" opacity="0.35" />
      ))}
      {/* 뉴럴 연결선 */}
      {[
        [340,50,360,100],[380,50,360,100],[420,50,400,100],[380,50,400,100],
        [360,100,340,150],[360,100,380,150],[400,100,380,150],[400,100,420,150],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#448CFF" strokeWidth="0.7" opacity="0.15" />
      ))}
      {/* 컨텍스트 연결 (텍스트 → 뉴럴) */}
      <path d="M300 75 C320 75, 330 75, 340 75 L340 100" stroke="#448CFF" strokeWidth="0.8" fill="none" opacity="0.2" strokeDasharray="3 3" />
      {/* 하단 결과 텍스트 */}
      <rect x="100" y="200" width="220" height="8" rx="4" fill="#448CFF" opacity="0.12" />
      <rect x="100" y="220" width="170" height="8" rx="4" fill="#448CFF" opacity="0.08" />
      <rect x="100" y="240" width="200" height="8" rx="4" fill="#448CFF" opacity="0.08" />
      <rect x="150" y="200" width="60" height="8" rx="4" fill="#448CFF" opacity="0.3" />
    </svg>
  );
}

function ReportSvg() {
  return (
    <svg viewBox="0 0 480 270" fill="none" className="w-[80%] h-[80%]">
      {/* 문서 1 (뒤) */}
      <rect x="155" y="25" width="170" height="220" rx="8" stroke="#448CFF" strokeWidth="1" opacity="0.1" fill="#448CFF" fillOpacity="0.02" />
      {/* 문서 2 (앞) */}
      <rect x="130" y="15" width="170" height="220" rx="8" stroke="#448CFF" strokeWidth="1.2" opacity="0.3" fill="#0B0E14" />
      {/* 문서 헤더 */}
      <rect x="148" y="35" width="80" height="10" rx="3" fill="#448CFF" opacity="0.2" />
      <rect x="148" y="52" width="50" height="6" rx="3" fill="#448CFF" opacity="0.1" />
      {/* 구분선 */}
      <line x1="148" y1="68" x2="282" y2="68" stroke="#448CFF" strokeWidth="0.5" opacity="0.15" />
      {/* 텍스트 블록 */}
      <rect x="148" y="80" width="134" height="6" rx="3" fill="#448CFF" opacity="0.08" />
      <rect x="148" y="94" width="110" height="6" rx="3" fill="#448CFF" opacity="0.08" />
      <rect x="148" y="108" width="120" height="6" rx="3" fill="#448CFF" opacity="0.08" />
      {/* 데이터 필드 (자동 채움) */}
      <rect x="148" y="130" width="60" height="20" rx="4" stroke="#448CFF" strokeWidth="0.8" opacity="0.2" />
      <rect x="150" y="132" width="40" height="16" rx="3" fill="#448CFF" opacity="0.12" />
      <rect x="218" y="130" width="60" height="20" rx="4" stroke="#448CFF" strokeWidth="0.8" opacity="0.2" />
      <rect x="220" y="132" width="48" height="16" rx="3" fill="#448CFF" opacity="0.12" />
      {/* 진행 바 */}
      <rect x="148" y="165" width="134" height="6" rx="3" fill="#448CFF" opacity="0.06" />
      <rect x="148" y="165" width="100" height="6" rx="3" fill="#448CFF" opacity="0.2" />
      {/* 체크마크 */}
      <circle cx="270" y="195" r="10" stroke="#448CFF" strokeWidth="1" opacity="0.3" fill="#448CFF" fillOpacity="0.05" />
      <path d="M265 195 L268 198 L276 190" stroke="#448CFF" strokeWidth="1.5" opacity="0.4" />
      {/* 자동화 화살표 (우측) */}
      <path d="M330 100 C360 100, 370 80, 370 60 C370 40, 350 30, 330 40" stroke="#448CFF" strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M332 36 L330 40 L334 40" stroke="#448CFF" strokeWidth="1" opacity="0.2" />
      <circle cx="370" cy="100" r="16" stroke="#448CFF" strokeWidth="1" opacity="0.15" />
      <path d="M363 100 L370 93 L377 100 M370 93 L370 108" stroke="#448CFF" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

function PredictionSvg() {
  const dataPoints = [
    { x: 80, y: 200 }, { x: 120, y: 185 }, { x: 160, y: 190 }, { x: 200, y: 165 },
    { x: 240, y: 150 }, { x: 280, y: 130 }, { x: 320, y: 110 },
  ];
  const predPoints = [
    { x: 320, y: 110 }, { x: 360, y: 85 }, { x: 400, y: 65 },
  ];
  const path = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
  const predPath = predPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
  return (
    <svg viewBox="0 0 480 270" fill="none" className="w-[80%] h-[80%]">
      {/* 축 */}
      <line x1="60" y1="30" x2="60" y2="230" stroke="#448CFF" strokeWidth="0.8" opacity="0.2" />
      <line x1="60" y1="230" x2="430" y2="230" stroke="#448CFF" strokeWidth="0.8" opacity="0.2" />
      {/* 그리드 */}
      {[80, 130, 180].map(y => (
        <line key={y} x1="60" y1={y} x2="430" y2={y} stroke="#448CFF" strokeWidth="0.4" opacity="0.06" />
      ))}
      {/* 데이터 라인 */}
      <path d={path} stroke="#448CFF" strokeWidth="2" opacity="0.5" />
      {/* 데이터 포인트 */}
      {dataPoints.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#0B0E14" stroke="#448CFF" strokeWidth="1.5" opacity="0.5" />
          <circle cx={p.x} cy={p.y} r="1.5" fill="#448CFF" opacity="0.5" />
        </g>
      ))}
      {/* 예측 구간 (대시 + 컨피던스 영역) */}
      <path d={predPath} stroke="#448CFF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.35" />
      <path d="M320 110 L360 70 L400 45 L400 85 L360 100 Z" fill="#448CFF" opacity="0.04" />
      {/* 예측 포인트 */}
      {predPoints.slice(1).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" stroke="#448CFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" fill="none" />
      ))}
      {/* 경고 영역 */}
      <rect x="350" y="40" width="70" height="22" rx="4" fill="#FF6B6B" opacity="0.06" stroke="#FF6B6B" strokeWidth="0.5" />
      <text x="385" y="55" textAnchor="middle" fill="#FF6B6B" fontSize="9" fontWeight="600" opacity="0.4">ALERT</text>
      {/* Y축 레이블 */}
      <text x="50" y="85" textAnchor="end" fill="#448CFF" fontSize="8" opacity="0.2">HIGH</text>
      <text x="50" y="185" textAnchor="end" fill="#448CFF" fontSize="8" opacity="0.2">LOW</text>
    </svg>
  );
}

function SecuritySvg() {
  return (
    <svg viewBox="0 0 480 270" fill="none" className="w-[80%] h-[80%]">
      {/* 외부 방패 */}
      <path d="M240 25 L310 55 L310 145 C310 195,240 235,240 235 C240 235,170 195,170 145 L170 55 Z" stroke="#448CFF" strokeWidth="1.5" opacity="0.25" fill="#448CFF" fillOpacity="0.03" />
      {/* 내부 방패 */}
      <path d="M240 50 L290 72 L290 138 C290 175,240 205,240 205 C240 205,190 175,190 138 L190 72 Z" stroke="#448CFF" strokeWidth="1" opacity="0.15" fill="#448CFF" fillOpacity="0.02" />
      {/* 잠금 아이콘 */}
      <rect x="224" y="115" width="32" height="28" rx="4" stroke="#448CFF" strokeWidth="1.5" opacity="0.45" fill="#448CFF" fillOpacity="0.05" />
      <path d="M230 115 L230 105 C230 95,240 88,240 88 C240 88,250 95,250 105 L250 115" stroke="#448CFF" strokeWidth="1.5" fill="none" opacity="0.4" />
      <circle cx="240" cy="127" r="3" fill="#448CFF" opacity="0.4" />
      <line x1="240" y1="130" x2="240" y2="136" stroke="#448CFF" strokeWidth="1.5" opacity="0.35" />
      {/* 보안 레이어 링 */}
      <ellipse cx="240" cy="135" rx="120" ry="40" stroke="#448CFF" strokeWidth="0.6" opacity="0.08" strokeDasharray="4 6" />
      <ellipse cx="240" cy="135" rx="150" ry="55" stroke="#448CFF" strokeWidth="0.4" opacity="0.05" strokeDasharray="3 8" />
      {/* 네트워크 노드 (외곽) */}
      {[
        { x: 90, y: 60 }, { x: 390, y: 60 }, { x: 80, y: 200 }, { x: 400, y: 200 },
        { x: 120, y: 135 }, { x: 360, y: 135 }, { x: 240, y: 250 },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="4" stroke="#448CFF" strokeWidth="0.8" opacity="0.2" fill="#448CFF" fillOpacity="0.05" />
          <line x1={n.x} y1={n.y} x2="240" y2="130" stroke="#448CFF" strokeWidth="0.5" opacity="0.08" />
        </g>
      ))}
    </svg>
  );
}

const techIllusts = [SpeechSvg, ContextSvg, ReportSvg, PredictionSvg, SecuritySvg];

function Technology({ lang }: { lang: 'ko' | 'en' }) {
  const modules = [
    {
      en: 'Real-time Speech Recognition',
      ko: '실시간 음성 인식 시스템',
      subKo: '실시간으로 상담 음성을 텍스트로 변환하는 AI 시스템을 개발·운영합니다.',
      subEn: 'We develop and operate an AI system that converts consultation audio to text in real time.',
      descKo: '고정밀 STT 모델과 발화 구간 탐지(VAD)를 결합해 1초 단위로 음성을 처리하며, 문맥 기반 확률 교정 알고리즘을 통해 인식 오류를 최소화합니다. 공공 상담 환경에서도 안정적으로 작동하는 음성 인식 체계를 구축합니다.',
      descEn: 'Combining a high-precision STT model with Voice Activity Detection (VAD), we process speech at one-second intervals and minimize recognition errors through context-based probabilistic correction algorithms. We build a speech recognition system that operates reliably even in public consultation environments.',
    },
    {
      en: 'Context-aware Intelligent Correction',
      ko: '문맥 기반 지능 교정 시스템',
      subKo: '단순 인식을 넘어, 의미를 이해하는 교정 기술을 구현합니다.',
      subEn: 'Beyond simple recognition — we implement correction technology that understands meaning.',
      descKo: '상담 도메인 특화 단어 사전과 문맥 확률 모델을 적용해 오인식 단어를 자동 수정하며, 문장 단위 맥락 분석을 통해 정보 정확도를 높입니다. 실무에 바로 활용 가능한 수준의 텍스트 정합성을 제공합니다.',
      descEn: 'Applying consultation-domain dictionaries and contextual probability models, we auto-correct misrecognized words and improve accuracy through sentence-level context analysis. We deliver text consistency ready for immediate practical use.',
    },
    {
      en: 'AI Report Automation',
      ko: 'AI 상담 리포트 자동화 시스템',
      subKo: '상담 기록을 구조화하고 요약하는 자동화 플랫폼을 구축합니다.',
      subEn: 'We build an automation platform that structures and summarizes consultation records.',
      descKo: '음성 인식 결과를 기반으로 핵심 내용, 주요 키워드, 민원 유형을 자동 추출하며, 행정 서식에 맞춘 리포트를 자동 생성합니다. 반복적인 문서 작성 업무를 줄이고, 업무 효율성을 향상시킵니다.',
      descEn: 'Based on speech recognition results, we auto-extract key content, keywords, and complaint types, then auto-generate reports formatted for administrative forms. We reduce repetitive document writing and improve operational efficiency.',
    },
    {
      en: 'Data-driven Risk Prediction',
      ko: '데이터 기반 위험 예측 모델',
      subKo: '대규모 데이터를 분석해 위험 신호를 탐지하는 예측 모델을 개발합니다.',
      subEn: 'We develop prediction models that analyze large-scale data to detect risk signals.',
      descKo: '57,000건 이상의 사례 데이터를 학습해 고독사 여부를 분류하고, 설명 가능한 AI(XAI)를 통해 판단 근거를 제공합니다. 정책적 의사결정에 활용 가능한 분석 기반을 마련합니다.',
      descEn: 'Training on over 57,000 case records to classify solitary death risk, we provide decision rationale through explainable AI (XAI). We establish an analytical foundation applicable to policy decision-making.',
    },
    {
      en: 'Security-first AI Architecture',
      ko: '보안 중심 AI 아키텍처',
      subKo: '공공 환경에 적합한 보안 처리 구조를 설계합니다.',
      subEn: 'We design security processing structures suited for public sector environments.',
      descKo: '내부 서버 기반 처리, 개인정보 비식별화 기술, 접근 통제 시스템을 적용해 민감 정보를 안전하게 관리합니다. 안정성과 신뢰성을 동시에 확보합니다.',
      descEn: 'Applying on-premise processing, personal data de-identification, and access control systems, we securely manage sensitive information. We ensure both stability and reliability.',
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const count = modules.length;

  // 스크롤 진행도 → 활성 인덱스 (0~4)
  const activeRaw = useTransform(scrollYProgress, [0, 1], [0, count - 1]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const unsub = activeRaw.on('change', (v) => setActive(Math.round(v)));
    return unsub;
  }, [activeRaw]);

  return (
    <section
      ref={containerRef}
      data-nav-dark
      className="relative bg-[#0B0E14]"
      style={{ height: `${count * 100}vh` }}
    >
      {/* 고정 레이아웃 */}
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-14 w-full">
          <div className="max-w-[1360px] mx-auto">
            <div className="w-full flex flex-col gap-8 lg:flex-row lg:gap-16 items-center">

              {/* 좌: 이미지 영역 — 카드가 밀려 올라오는 전환 */}
              <div className="w-full lg:w-[60%] flex-shrink-0 relative overflow-hidden rounded-2xl border border-[#1F2937]" style={{ aspectRatio: '16 / 9' }}>
                {modules.map((_, i) => {
                  const Illust = techIllusts[i];
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: active === i ? 1 : 0,
                        y: active === i ? '0%' : active > i ? '-100%' : '100%',
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-gradient-to-br from-[#448CFF]/8 via-[#141820] to-[#0B0E14] flex items-center justify-center"
                    >
                      <Illust />
                    </motion.div>
                  );
                })}
              </div>

              {/* 우: 텍스트 영역 — 아래에서 밀려 올라오는 카드 전환 */}
              <div className="w-full lg:w-[40%] relative overflow-hidden" style={{ minHeight: '320px' }}>
                {modules.map((m, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: active === i ? 1 : 0,
                      y: active === i ? 0 : active > i ? -60 : 60,
                      scale: active === i ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{ pointerEvents: active === i ? 'auto' : 'none' }}
                  >
                    <p className="text-[12px] font-semibold text-[#448CFF] tracking-widest uppercase mb-3">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="text-[26px] lg:text-[34px] font-bold text-white leading-tight mb-5">
                      {lang === 'ko' ? m.ko : m.en}
                    </p>
                    <p className="text-[15px] lg:text-[16px] text-white/70 font-medium leading-relaxed mb-4">
                      {lang === 'ko' ? m.subKo : m.subEn}
                    </p>
                    <p className="text-[13px] lg:text-[14px] text-[#9CA3AF] leading-[1.8]">
                      {lang === 'ko' ? m.descKo : m.descEn}
                    </p>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── G. History ───────────────────────────────────────────────────────

function History({ lang }: { lang: 'ko' | 'en' }) {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-60px' });

  const [active, setActive] = useState('2026');

  const timeline = [
    {
      year: '2026',
      current: true,
      items: lang === 'ko'
        ? [{ date: '2026.01', text: '주식회사 이노하이 법인 설립' }]
        : [{ date: '2026.01', text: 'INNO-HI Inc. incorporated' }],
    },
    {
      year: '2025',
      items: lang === 'ko'
        ? [
            { date: '2025.12', text: '창업동아리 우수기업 선정' },
            { date: '2025.12', text: '한국사회보장정보원 고독사 판별 AI PoC 진행' },
            { date: '2025.11', text: '제주도-한전MCS 안부똑똑서비스 실증사업' },
            { date: '2025.07', text: '동국대–양천구청 AI 민원실 실증' },
            { date: '2025.06', text: '안심하이 사업자 등록' },
            { date: '2025.06', text: '예비창업패키지 선정' },
          ]
        : [
            { date: '2025.12', text: 'Selected as outstanding startup club enterprise' },
            { date: '2025.12', text: 'KOSIS lonely death detection AI PoC' },
            { date: '2025.11', text: 'Jeju–KEPCO MCS AnbuTokTok service pilot' },
            { date: '2025.07', text: 'Dongguk Univ.–Yangcheon-gu AI civil service pilot' },
            { date: '2025.06', text: 'AnshimHI business registration' },
            { date: '2025.06', text: 'Pre-startup Package selected' },
          ],
    },
    {
      year: '2024',
      items: lang === 'ko'
        ? [
            { date: '2024.11', text: 'DPG AI Challenge 최우수상 수상' },
            { date: '2024', text: '국민행복 서비스 실증 프로그램 참여' },
            { date: '2024', text: '공공·정부기관 수상 3관왕', icon: true },
            { date: '', text: '한국사회보장정보원장 표창' },
            { date: '', text: '디지털플랫폼정부위원장상 최우수상' },
            { date: '', text: '동국대학교 총장상 대상' },
          ]
        : [
            { date: '2024.11', text: 'DPG AI Challenge Grand Prize' },
            { date: '2024', text: 'National Happiness Service pilot program participation' },
            { date: '2024', text: 'Triple Crown in Public/Government Awards', icon: true },
            { date: '', text: 'Korea Social Security Information Service Director Award' },
            { date: '', text: 'Digital Platform Government Committee Grand Prize' },
            { date: '', text: 'Dongguk University President Grand Prize' },
          ],
    },
  ];

  return (
    <Section bg="bg-[#F8F9FD]" className="pt-36 lg:pt-[180px]">
      {/* 헤딩: blur → clear 페이드인 */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        animate={headingInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-20 lg:mb-28"
      >
        <h2
          className="font-bold text-[#191F28] leading-[1.25] tracking-tight"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          {lang === 'ko'
            ? '이노하이는 오늘도 한단계 더 깊은 지능을 만듭니다'
            : 'INNO-HI continues to build intelligence one level deeper'}
        </h2>
      </motion.div>

      {/* 카드: scale + 페이드인 */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1100px] mx-auto rounded-3xl bg-white px-14 py-16 lg:px-24 lg:py-20"
      >
        {(() => {
          // 개별 요소 캐스케이드 딜레이 계산
          let step = 0;
          const yearSteps = timeline.map(t => {
            const s = step;
            step += 2 + t.items.length + 1; // 연도 + 점 + 항목들 + 간격
            return s;
          });
          const d = (s: number) => 0.15 + s * 0.12; // step → delay(초)
          const ease = [0.16, 1, 0.3, 1] as const;

          return (
            <div className="relative">
              <div className="space-y-14">
                {timeline.map((t, i) => {
                  const isActive = active === t.year;
                  const isCurrent = !!t.current;
                  const activeYearColor = isCurrent ? 'text-[#448CFF]' : 'text-[#6B7684]';
                  const activeDotColor = isCurrent ? 'bg-[#448CFF]' : 'bg-[#8B95A1]';
                  const activeDateColor = isCurrent ? 'text-[#448CFF]' : 'text-[#6B7684]';
                  const base = yearSteps[i];

                  return (
                    <div key={t.year} className="relative flex items-start">
                      {/* 연결선 (항목 다 나온 뒤 드로우) */}
                      {i < timeline.length - 1 && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={cardInView ? { scaleY: 1 } : {}}
                          transition={{ duration: 0.8, delay: d(base + 2 + t.items.length), ease }}
                          className="absolute left-[96px] lg:left-[116px] origin-top"
                          style={{
                            top: '20px',
                            bottom: '-61px',
                            ...(isCurrent
                              ? { width: '1px', background: '#448CFF' }
                              : { width: '0', borderLeft: '1px dashed #D1D6DB' }),
                          }}
                        />
                      )}

                      {/* 좌: 연도 (좌→우 슬라이드) */}
                      <motion.button
                        onClick={() => setActive(t.year)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={cardInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: d(base), ease }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-[80px] lg:w-[100px] flex-shrink-0 text-left cursor-pointer"
                      >
                        <motion.span
                          animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className={`text-[18px] lg:text-[20px] font-bold tabular-nums tracking-tight block transition-colors duration-300 ${
                            isActive ? activeYearColor : (isCurrent ? 'text-[#A3C4FF] hover:text-[#7AB0FF]' : 'text-[#D1D6DB] hover:text-[#B0B8C1]')
                          }`}
                        >{t.year}</motion.span>
                      </motion.button>

                      {/* 중앙: 점 (팝인) */}
                      <button
                        onClick={() => setActive(t.year)}
                        className="flex-shrink-0 w-8 flex justify-center relative z-10 pt-[4px] cursor-pointer"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={cardInView ? { scale: 1 } : {}}
                          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: d(base + 1) }}
                          className="relative"
                        >
                          {/* 이중 글로우 링 */}
                          <motion.div
                            animate={isActive && isCurrent
                              ? { scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }
                              : { scale: 1, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-0 rounded-full bg-[#448CFF]"
                          />
                          <motion.div
                            animate={isActive && isCurrent
                              ? { scale: [1, 2.5, 1], opacity: [0.2, 0, 0.2] }
                              : { scale: 1, opacity: 0 }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                            className="absolute inset-0 rounded-full bg-[#448CFF]"
                          />
                          <motion.div
                            animate={isActive ? { scale: 1.15 } : { scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            className={`w-4 h-4 rounded-full ring-4 ring-white relative transition-colors duration-300 ${
                              isActive ? activeDotColor : (isCurrent ? 'bg-[#A3C4FF]' : 'bg-[#D1D6DB]')
                            }`}
                          />
                        </motion.div>
                      </button>

                      {/* 우: 날짜 + 내용 (개별 항목 캐스케이드) */}
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0.35 }}
                        transition={{ opacity: { duration: 0.4 } }}
                        className="flex-1 pl-8 lg:pl-12 space-y-4"
                      >
                        {t.items.map((item, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: 20 }}
                            animate={cardInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: d(base + 2 + j), ease }}
                          >
                            {item.date && (
                              <p className={`text-[15px] font-semibold tabular-nums mb-2 transition-colors duration-300 ${
                                isActive ? activeDateColor : 'text-[#D1D6DB]'
                              }`}>{item.date}</p>
                            )}
                            <p className={`leading-relaxed transition-colors duration-300 ${
                              item.date
                                ? `text-[19px] lg:text-[20px] ${isActive ? (isCurrent ? 'text-[#191F28] font-extrabold' : 'text-[#4E5968] font-extrabold') : 'text-[#D1D6DB] font-medium'}`
                                : `text-[16px] lg:text-[17px] ${isActive ? (isCurrent ? 'text-[#191F28]' : 'text-[#6B7684]') : 'text-[#D1D6DB]'}`
                            }`}>
                              {item.date ? (
                                <span className="inline-flex items-center gap-2">
                                  {item.text}
                                  {'icon' in item && item.icon && (
                                    <img src={govLogoSrc} alt="" className="inline-block w-5 h-5" />
                                  )}
                                </span>
                              ) : `· ${item.text}`}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </motion.div>
    </Section>
  );
}

// ── H. Vision (마무리) ───────────────────────────────────────────────

/* 데이터 네트워크 배경 — INNO-HI가 성운처럼 떠오르는 데이터 컨스텔레이션 */
function DataBackground() {
  // ── 글자 골격 노드 — 유기적 오프셋 ──
  const core = [
    // I₁ 0-3
    { x: 9, y: 28 }, { x: 8.6, y: 40 }, { x: 9.2, y: 56 }, { x: 9, y: 72 },
    // N₁ left 4-6 / diag 7-8 / right 9-11
    { x: 16.5, y: 28 }, { x: 17, y: 50 }, { x: 16.8, y: 72 },
    { x: 20, y: 38 }, { x: 24, y: 62 },
    { x: 27.2, y: 28 }, { x: 27, y: 50 }, { x: 26.8, y: 72 },
    // N₂ left 12-14 / diag 15-16 / right 17-19
    { x: 33, y: 28 }, { x: 33.4, y: 50 }, { x: 33, y: 72 },
    { x: 36, y: 38 }, { x: 40, y: 62 },
    { x: 43.2, y: 28 }, { x: 43, y: 50 }, { x: 42.8, y: 72 },
    // O 20-27
    { x: 49, y: 30 }, { x: 52, y: 27 }, { x: 55.5, y: 30 },
    { x: 48.5, y: 50 }, { x: 56, y: 50 },
    { x: 49, y: 70 }, { x: 52, y: 73 }, { x: 55.5, y: 70 },
    // — 28-30
    { x: 61, y: 50 }, { x: 63, y: 49 }, { x: 65.5, y: 50 },
    // H left 31-33 / cross 34 / right 35-37
    { x: 71, y: 28 }, { x: 70.5, y: 50 }, { x: 71, y: 72 },
    { x: 75, y: 50 },
    { x: 79.5, y: 28 }, { x: 79, y: 50 }, { x: 79.5, y: 72 },
    // I₂ 38-41
    { x: 87, y: 28 }, { x: 87.4, y: 40 }, { x: 86.8, y: 56 }, { x: 87, y: 72 },
  ]; // 42

  // ── 위성 헤일로 노드 ──
  const halo = [
    { x: 6, y: 34 }, { x: 12, y: 66 },
    { x: 14, y: 36 }, { x: 30, y: 64 },
    { x: 30, y: 36 }, { x: 46, y: 64 },
    { x: 47, y: 38 }, { x: 58, y: 62 },
    { x: 59, y: 44 }, { x: 67, y: 56 },
    { x: 68, y: 36 }, { x: 82, y: 64 },
    { x: 84, y: 34 }, { x: 90, y: 66 },
  ]; // 14 → 42-55

  // ── 원경 성운 노드 ──
  const nebula = [
    { x: 2, y: 12 }, { x: 18, y: 8 }, { x: 38, y: 6 }, { x: 58, y: 8 },
    { x: 78, y: 10 }, { x: 96, y: 15 },
    { x: 2, y: 88 }, { x: 22, y: 92 }, { x: 48, y: 94 }, { x: 68, y: 92 },
    { x: 88, y: 88 }, { x: 97, y: 85 },
    { x: 1, y: 50 }, { x: 99, y: 50 },
    { x: 30, y: 15 }, { x: 62, y: 15 }, { x: 30, y: 85 }, { x: 62, y: 85 },
  ]; // 18 → 56-73

  const nodes = [...core, ...halo, ...nebula];
  const CORE = core.length;
  const HALO = CORE + halo.length;

  const coreEdges: [number, number][] = [
    [0,1],[1,2],[2,3],
    [4,5],[5,6],[4,7],[7,8],[8,11],[9,10],[10,11],
    [12,13],[13,14],[12,15],[15,16],[16,19],[17,18],[18,19],
    [20,21],[21,22],[20,23],[22,24],[23,25],[25,26],[26,27],[27,24],
    [28,29],[29,30],
    [31,32],[32,33],[32,34],[34,36],[35,36],[36,37],
    [38,39],[39,40],[40,41],
  ];

  const netEdges: [number, number][] = [
    [3,4],[11,12],[19,20],[27,28],[30,31],[37,38],
    [1,42],[3,43],[5,44],[11,45],[13,46],[19,47],[21,48],[27,49],
    [28,50],[30,51],[31,52],[37,53],[38,54],[41,55],
    [42,56],[43,62],[44,57],[45,72],[46,70],[47,73],
    [48,58],[49,65],[52,60],[54,61],[55,69],
    [56,57],[58,59],[60,61],[62,63],[64,65],[66,67],
    [56,68],[61,69],[62,72],[70,58],[63,64],
  ];

  const allEdges = [...coreEdges, ...netEdges];
  const glowIdx = [0, 3, 4, 11, 12, 19, 20, 27, 31, 37, 38, 41];
  const particleIdx = [0, 4, 7, 10, 14, 18, 25, 28, 34];

  // 스타더스트 (정적, 비 애니메이션)
  const dust = Array.from({ length: 60 }, (_, i) => ({
    x: ((i * 17 + 7) % 100),
    y: ((i * 23 + 13) % 100),
    r: 0.3 + ((i * 7) % 10) * 0.08,
    o: 0.03 + ((i * 3) % 8) * 0.01,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* 글로우 필터 */}
      <svg className="absolute" width="0" height="0">
        <defs>
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* 도트 그리드 */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <defs>
          <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.8" fill="#448CFF" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGrid)" />
      </svg>

      {/* 메인 네트워크 */}
      <svg className="absolute inset-0 w-full h-full">
        {/* 스타더스트 */}
        {dust.map((d, i) => (
          <circle key={`d${i}`} cx={`${d.x}%`} cy={`${d.y}%`} r={d.r} fill="#448CFF" opacity={d.o} />
        ))}

        {/* 연결선 — 3단계 */}
        {allEdges.map(([a, b], i) => {
          const isCore = i < coreEdges.length;
          const isBridge = !isCore && i < coreEdges.length + 6;
          return (
            <motion.line
              key={`e${i}`}
              x1={`${nodes[a].x}%`} y1={`${nodes[a].y}%`}
              x2={`${nodes[b].x}%`} y2={`${nodes[b].y}%`}
              stroke="#448CFF"
              strokeWidth={isCore ? 1.2 : isBridge ? 0.8 : 0.4}
              strokeDasharray={!isCore && !isBridge ? '4 6' : 'none'}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: isCore ? 0.22 : isBridge ? 0.14 : 0.06, pathLength: 1 }}
              transition={{ duration: 2.5, delay: 0.3 + i * 0.03, ease: 'easeOut' }}
            />
          );
        })}

        {/* 노드 — 3단계 */}
        {nodes.map((n, i) => {
          const isC = i < CORE;
          const isH = i >= CORE && i < HALO;
          const r = isC ? (glowIdx.includes(i) ? 4.5 : 3) : isH ? 2.2 : 1.5;
          const op = isC ? 0.4 : isH ? 0.18 : 0.08;
          return (
            <motion.circle
              key={`n${i}`}
              cx={`${n.x}%`} cy={`${n.y}%`}
              r={r}
              fill="#448CFF"
              filter={glowIdx.includes(i) ? 'url(#nodeGlow)' : undefined}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: op, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.04 }}
            />
          );
        })}

        {/* 글로우 펄스 링 — 핵심 노드에서 숨쉬는 효과 */}
        {glowIdx.filter((_, i) => i % 3 === 0).map((ni, i) => (
          <motion.circle
            key={`g${i}`}
            cx={`${nodes[ni].x}%`} cy={`${nodes[ni].y}%`}
            r="8"
            fill="none"
            stroke="#448CFF"
            strokeWidth="0.5"
            animate={{ r: [8, 14, 8], opacity: [0.15, 0, 0.15] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          />
        ))}

        {/* 데이터 파티클 스트림 */}
        {particleIdx.map((edgeIdx) => {
          const [a, b] = coreEdges[edgeIdx];
          return (
            <motion.circle
              key={`p${edgeIdx}`}
              r="1.5"
              fill="#448CFF"
              animate={{
                cx: [`${nodes[a].x}%`, `${nodes[b].x}%`],
                cy: [`${nodes[a].y}%`, `${nodes[b].y}%`],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2 + edgeIdx * 0.12,
                repeat: Infinity,
                ease: 'linear',
                delay: edgeIdx * 0.3,
              }}
            />
          );
        })}
      </svg>

      {/* 떠다니는 데이터 수치 */}
      {[
        { x: '3%', y: '15%', text: '98.5%', delay: 0 },
        { x: '88%', y: '10%', text: '0.3s', delay: 1.5 },
        { x: '5%', y: '80%', text: '57K+', delay: 3 },
        { x: '85%', y: '82%', text: '99.9%', delay: 4.5 },
        { x: '92%', y: '45%', text: 'STT', delay: 2 },
        { x: '3%', y: '50%', text: 'RAG', delay: 3.5 },
      ].map((item, i) => (
        <motion.span
          key={i}
          className="absolute text-[12px] font-mono font-bold text-[#448CFF] select-none"
          style={{ left: item.x, top: item.y }}
          animate={{ opacity: [0, 0.25, 0.25, 0], y: [0, -10, -10, -20] }}
          transition={{ duration: 6, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}
        >
          {item.text}
        </motion.span>
      ))}

      {/* 비네팅 */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(11,14,20,0.95) 0%, rgba(11,14,20,0.7) 50%, transparent 100%)' }}
      />

      {/* 성운 글로우 */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#448CFF] rounded-full blur-[200px] opacity-[0.04]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#448CFF] rounded-full blur-[200px] opacity-[0.04]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#448CFF] rounded-full blur-[250px] opacity-[0.025]" />
    </div>
  );
}

function Vision({ lang }: { lang: 'ko' | 'en' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 첫 번째 텍스트: 0~0.4 동안 보이다가 0.4~0.6에서 페이드아웃
  const opacity1 = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.35, 0.5], [0, -30]);

  // 두 번째 텍스트: 0.5~0.65에서 페이드인, 이후 유지
  const opacity2 = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.45, 0.6], [30, 0]);

  return (
    <section ref={containerRef} data-nav-dark className="relative bg-[#0B0E14]" style={{ height: '250vh' }}>
      {/* 데이터 네트워크 배경 */}
      <div className="sticky top-0 h-screen z-0">
        <DataBackground />
      </div>

      {/* 고정된 중앙 텍스트 영역 */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden z-10" style={{ marginTop: '-100vh' }}>
        <div className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-14 w-full">
          <div className="max-w-[1360px] mx-auto text-center relative">
            {/* 첫 번째 텍스트 */}
            <motion.h2
              style={{ opacity: opacity1, y: y1 }}
              className="absolute inset-0 flex items-center justify-center font-extrabold text-[#FFFFFF] leading-[1.45] tracking-tight drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            >
              <span style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', color: '#FFFFFF' }}>
                {lang === 'ko' ? (
                  <>기술로 업무를 단순화하고,<br />데이터로 의사결정을 정교하게 만듭니다</>
                ) : (
                  <>We simplify work with technology<br />and refine decisions with data</>
                )}
              </span>
            </motion.h2>

            {/* 두 번째 텍스트 */}
            <motion.h2
              style={{ opacity: opacity2, y: y2 }}
              className="font-extrabold text-[#FFFFFF] leading-[1.45] tracking-tight drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            >
              <span style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', color: '#FFFFFF' }}>
                {lang === 'ko' ? (
                  <>AI는 사람을 대체하지 않습니다.<br />사람의 가치를 증명합니다.</>
                ) : (
                  <>AI doesn't replace people.<br />It proves people's value.</>
                )}
              </span>
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 메인 About 페이지 ────────────────────────────────────────────────

export function AboutPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content">
      <Hero lang={lang} />
      <Mission lang={lang} />
      <Problem lang={lang} />
      <NextMove lang={lang} />
      <Vision lang={lang} />
      <Technology lang={lang} />
      <History lang={lang} />
    </main>
  );
}
