import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import govLogoSrc from '@/assets/gov-logo.svg';
import heroBgSrc from '@/assets/hero-bg.jpg';

// ── 섹션 래퍼 ─────────────────────────────────────────────────────────

function Section({ children, className = '', bg = 'bg-white' }: { children: React.ReactNode; className?: string; bg?: string }) {
  return (
    <section className={`py-16 sm:py-24 lg:py-[140px] min-h-screen ${bg} ${className}`}>
      <div className="max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14">
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
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
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

      <div className="relative z-10 text-center px-5 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold text-white leading-[1.5] tracking-tight"
          style={{ fontSize: 'clamp(1.25rem, 4.5vw, 3rem)' }}
        >
          {lang === 'ko' ? (
            <>말 속에서 마음을 읽는 기술로<br />모두의 온전함을 지킵니다.</>
          ) : (
            <>With technology that reads hearts in words,<br />we protect everyone's wholeness.</>
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

// ── A-2. Mission (스크롤 시 배경 전환 + 텍스트 전환) ─────────────

/* 네트워크 노드 + 연결선 SVG 배경 */
function DataStackBg() {
  const nodes = [
    { x: 120, y: 180 }, { x: 280, y: 260 }, { x: 400, y: 150 },
    { x: 540, y: 320 }, { x: 660, y: 200 }, { x: 720, y: 450 },
    { x: 840, y: 280 }, { x: 960, y: 160 }, { x: 1040, y: 380 },
    { x: 1160, y: 240 }, { x: 1300, y: 340 }, { x: 200, y: 500 },
    { x: 480, y: 550 }, { x: 780, y: 600 }, { x: 1000, y: 560 },
    { x: 1250, y: 520 }, { x: 360, y: 700 }, { x: 620, y: 740 },
    { x: 900, y: 720 }, { x: 1120, y: 680 },
  ];
  const edges: [number, number][] = [
    [0,1],[1,3],[2,4],[3,5],[4,6],[6,7],[5,8],[7,9],[8,10],[9,10],
    [0,2],[2,7],[1,4],[3,6],[5,12],[11,12],[12,13],[13,14],[14,15],
    [11,16],[16,17],[17,18],[18,19],[15,19],[13,18],[12,17],
  ];

  return (
    <svg viewBox="0 0 1440 900" fill="none" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="ng" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#448CFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#448CFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 연결선 */}
      {edges.map(([a, b], i) => (
        <line
          key={`e${i}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="#448CFF"
          strokeWidth="0.8"
          opacity="0.08"
        />
      ))}

      {/* 노드 */}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r="3" fill="#448CFF" opacity={0.12 + (i % 3) * 0.06} />
          {i % 4 === 0 && (
            <circle cx={n.x} cy={n.y} r="14" fill="url(#ng)" opacity="0.5" />
          )}
        </g>
      ))}

      {/* 부유 파티클 */}
      <circle cx="200" cy="350" r="1.5" fill="#6DA6FF" opacity="0.15">
        <animate attributeName="cy" values="350;300;350" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="560" cy="420" r="1.5" fill="#448CFF" opacity="0.12">
        <animate attributeName="cy" values="420;370;420" dur="4.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="1000" cy="450" r="2" fill="#6DA6FF" opacity="0.12">
        <animate attributeName="cy" values="450;390;450" dur="4.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function Mission({ lang }: { lang: 'ko' | 'en' }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 연한 블루 배경 (0~0.42 유지, 0.42~0.55 사라짐)
  const darkOpacity = useTransform(scrollYProgress, [0, 0.42, 0.55], [1, 1, 0]);
  // 밝은 배경 등장 (아래 섹션과 자연스럽게 이어짐)
  const brightOpacity = useTransform(scrollYProgress, [0.42, 0.55], [0, 1]);
  // 텍스트 1 (연한 블루 배경 위 진한 글씨)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.38, 0.48], [0, 1, 1, 0]);
  // 텍스트 2 (밝은 배경 위 진한 글씨)
  const text2Opacity = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* 연한 메인색 배경 + SVG 데이터 일러스트 */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: darkOpacity,
            background: 'linear-gradient(180deg, #E8F1FF 0%, #DEEAFF 40%, #E4EDFF 70%, #EDF2FF 100%)',
          }}
        >
          <DataStackBg />
        </motion.div>

        {/* 밝은 배경 — 아래 섹션과 자연스럽게 이어짐 */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: brightOpacity,
            background: 'linear-gradient(180deg, #F7F8FA 0%, #F0F4FF 40%, #F5F8FF 60%, #F7F8FA 100%)',
          }}
        />

        {/* 텍스트 1 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-5 sm:px-6 z-10"
          style={{ opacity: text1Opacity }}
        >
          <p
            className="text-[#1B3A6B] font-bold text-center leading-[1.5] tracking-tight whitespace-pre-line"
            style={{ fontSize: 'clamp(1.25rem, 4.5vw, 3rem)' }}
          >
            {lang === 'ko'
              ? '초고령사회와 1인 가구 시대\n온전한 하루를 지켜줄 구조가 부족합니다.'
              : 'In the era of super-aging and single-person households,\nstructures to protect a complete day are insufficient.'}
          </p>
        </motion.div>

        {/* 텍스트 2 */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-5 sm:px-6 z-10"
          style={{ opacity: text2Opacity }}
        >
          <p
            className="text-[#595959] font-bold text-center leading-[1.5] tracking-tight"
            style={{ fontSize: 'clamp(1.25rem, 4.5vw, 3rem)' }}
          >
            {lang === 'ko'
              ? '깊은 지능으로 존중을 구현하여'
              : 'By realizing respect through deep intelligence,'}
          </p>
          <p
            className="text-[#595959] font-bold text-center leading-[1.5] tracking-tight mt-2"
            style={{ fontSize: 'clamp(1.25rem, 4.5vw, 3rem)' }}
          >
            {lang === 'ko'
              ? '사람을 지키는 기술의 표준을 만들어갑니다.'
              : 'we set the standard for technology that protects people.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── B. Problem ───────────────────────────────────────────────────────

/* 카드별 일러스트 — 우측 배경 장식 */
const problemIllusts = [
  /* 0: 데이터 활성화 — 3D 데이터베이스 실린더 + 발광 노드 */
  <svg key="pi0" viewBox="0 0 140 140" fill="none">
    <defs>
      <linearGradient id="p0-side" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#448CFF" /><stop offset="100%" stopColor="#1D4ED8" /></linearGradient>
      <linearGradient id="p0-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#A0C4FF" /><stop offset="100%" stopColor="#6DA6FF" /></linearGradient>
      <filter id="p0-g"><feGaussianBlur stdDeviation="4" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    {/* 실린더 몸체 */}
    <rect x="44" y="50" width="52" height="40" fill="url(#p0-side)" opacity="0.55" />
    <ellipse cx="70" cy="50" rx="26" ry="10" fill="url(#p0-top)" opacity="0.8" />
    <ellipse cx="70" cy="90" rx="26" ry="10" fill="url(#p0-side)" opacity="0.65" />
    <ellipse cx="70" cy="70" rx="26" ry="10" fill="none" stroke="#A0C4FF" strokeWidth="0.8" opacity="0.4" />
    {/* 글로우 코어 */}
    <circle cx="70" cy="65" r="8" fill="#448CFF" opacity="0.2" filter="url(#p0-g)" />
    <circle cx="70" cy="65" r="3" fill="white" opacity="0.8" />
    {/* 데이터 파티클 상승 */}
    <circle cx="60" cy="40" r="2" fill="#A0C4FF" opacity="0.6" />
    <circle cx="78" cy="35" r="1.5" fill="#6DA6FF" opacity="0.5" />
    <circle cx="68" cy="30" r="2" fill="#448CFF" opacity="0.4" />
    <line x1="60" y1="48" x2="60" y2="42" stroke="#A0C4FF" strokeWidth="0.8" opacity="0.3" />
    <line x1="78" y1="48" x2="78" y2="37" stroke="#6DA6FF" strokeWidth="0.8" opacity="0.3" />
    {/* 궤도 */}
    <ellipse cx="70" cy="65" rx="40" ry="14" fill="none" stroke="#448CFF" strokeWidth="0.6" opacity="0.15" strokeDasharray="3 3" />
  </svg>,

  /* 1: 보고서→통찰 — 3D 문서→그래프 큐브 */
  <svg key="pi1" viewBox="0 0 140 140" fill="none">
    <defs>
      <linearGradient id="p1-face" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6DA6FF" /><stop offset="100%" stopColor="#2563EB" /></linearGradient>
      <linearGradient id="p1-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#B8D4FF" /><stop offset="100%" stopColor="#6DA6FF" /></linearGradient>
    </defs>
    {/* 3D 문서 (아이소메트릭) */}
    <polygon points="20,55 45,42 45,85 20,98" fill="url(#p1-face)" opacity="0.5" />
    <polygon points="20,55 45,42 55,48 30,61" fill="url(#p1-top)" opacity="0.55" />
    <polygon points="30,61 55,48 55,91 30,104" fill="#448CFF" opacity="0.35" />
    {/* 문서 라인 */}
    <line x1="25" y1="65" x2="40" y2="57" stroke="white" strokeWidth="0.8" opacity="0.35" />
    <line x1="25" y1="72" x2="38" y2="65" stroke="white" strokeWidth="0.8" opacity="0.25" />
    <line x1="25" y1="79" x2="36" y2="73" stroke="white" strokeWidth="0.8" opacity="0.2" />
    {/* 변환 화살표 */}
    <path d="M60 70 L75 70" stroke="#448CFF" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    <path d="M72 67 L76 70 L72 73" stroke="#448CFF" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
    {/* 3D 바 차트 */}
    <polygon points="88,90 98,85 98,75 88,80" fill="#448CFF" opacity="0.55" />
    <polygon points="98,85 108,90 108,80 98,75" fill="#6DA6FF" opacity="0.4" />
    <polygon points="88,80 98,75 108,80 98,85" fill="url(#p1-top)" opacity="0.7" />
    <polygon points="100,80 110,75 110,60 100,65" fill="#448CFF" opacity="0.65" />
    <polygon points="110,75 120,80 120,65 110,60" fill="#6DA6FF" opacity="0.5" />
    <polygon points="100,65 110,60 120,65 110,70" fill="url(#p1-top)" opacity="0.8" />
    {/* 스파크 */}
    <circle cx="115" cy="52" r="3" fill="#448CFF" opacity="0.3" />
    <circle cx="115" cy="52" r="1.5" fill="white" opacity="0.7" />
  </svg>,

  /* 2: 핵심 집중 — 3D 타겟+수렴 화살표 */
  <svg key="pi2" viewBox="0 0 140 140" fill="none">
    <defs>
      <linearGradient id="p2-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#A0C4FF" /><stop offset="100%" stopColor="#448CFF" /></linearGradient>
      <filter id="p2-g"><feGaussianBlur stdDeviation="5" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    {/* 3D 타겟 디스크 (아이소메트릭 원반) */}
    <ellipse cx="80" cy="75" rx="35" ry="14" fill="#448CFF" opacity="0.08" />
    <ellipse cx="80" cy="75" rx="35" ry="14" fill="none" stroke="#448CFF" strokeWidth="1" opacity="0.2" />
    <ellipse cx="80" cy="75" rx="22" ry="9" fill="#448CFF" opacity="0.1" />
    <ellipse cx="80" cy="75" rx="22" ry="9" fill="none" stroke="#6DA6FF" strokeWidth="0.8" opacity="0.25" />
    <ellipse cx="80" cy="75" rx="10" ry="4" fill="url(#p2-ring)" opacity="0.35" />
    {/* 중심 발광 */}
    <circle cx="80" cy="75" r="5" fill="#448CFF" opacity="0.25" filter="url(#p2-g)" />
    <circle cx="80" cy="75" r="2.5" fill="white" opacity="0.85" />
    {/* 3D 수렴 화살표 */}
    <path d="M18 35 L60 65" stroke="#448CFF" strokeWidth="1.2" opacity="0.3" />
    <polygon points="60,65 54,60 56,66" fill="#448CFF" opacity="0.4" />
    <path d="M15 80 L55 77" stroke="#448CFF" strokeWidth="1" opacity="0.25" />
    <polygon points="55,77 49,74 50,79" fill="#448CFF" opacity="0.35" />
    <path d="M25 115 L60 85" stroke="#448CFF" strokeWidth="1.2" opacity="0.3" />
    <polygon points="60,85 54,84 56,89" fill="#448CFF" opacity="0.4" />
    {/* 산만 노드 */}
    <circle cx="18" cy="35" r="3.5" fill="#A0C4FF" opacity="0.45" />
    <circle cx="15" cy="80" r="3" fill="#6DA6FF" opacity="0.35" />
    <circle cx="25" cy="115" r="3.5" fill="#A0C4FF" opacity="0.45" />
  </svg>,

  /* 3: 즉시 전환 — 3D 토글/전원 큐브 */
  <svg key="pi3" viewBox="0 0 140 140" fill="none">
    <defs>
      <linearGradient id="p3-left" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#448CFF" /><stop offset="100%" stopColor="#1D4ED8" /></linearGradient>
      <linearGradient id="p3-right" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6DA6FF" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient>
      <linearGradient id="p3-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#B8D4FF" /><stop offset="100%" stopColor="#448CFF" /></linearGradient>
      <filter id="p3-g"><feGaussianBlur stdDeviation="4" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    {/* 3D 큐브 베이스 */}
    <polygon points="70,50 110,70 70,90 30,70" fill="url(#p3-top)" opacity="0.6" />
    <polygon points="30,70 70,90 70,115 30,95" fill="url(#p3-left)" opacity="0.6" />
    <polygon points="70,90 110,70 110,95 70,115" fill="url(#p3-right)" opacity="0.5" />
    {/* 전원 심볼 */}
    <line x1="70" y1="62" x2="70" y2="72" stroke="white" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
    <path d="M60 67 A12 12 0 1 0 80 67" stroke="white" strokeWidth="1.5" opacity="0.5" fill="none" />
    {/* 발광 */}
    <circle cx="70" cy="75" r="10" fill="#448CFF" opacity="0.15" filter="url(#p3-g)" />
    {/* 에너지 방사 */}
    <line x1="115" y1="60" x2="122" y2="55" stroke="#448CFF" strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />
    <line x1="117" y1="72" x2="125" y2="72" stroke="#6DA6FF" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
    <line x1="115" y1="84" x2="122" y2="89" stroke="#448CFF" strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />
    {/* 번개 */}
    <path d="M50 28 L44 42 L50 42 L45 52" stroke="#A0C4FF" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="47" cy="25" r="2" fill="#6DA6FF" opacity="0.35" />
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-auto sm:aspect-[2/1] rounded-2xl cursor-pointer overflow-hidden hover:-translate-y-1 transition-transform duration-300"
      style={{
        background: '#ffffff',
        border: '1px solid #E5E8EB',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      }}
      onClick={() => setActive(!active)}
    >
      {/* 우측 일러스트 배경 */}
      <div className="absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 w-[38%] aspect-square pointer-events-none opacity-70">
        {problemIllusts[i]}
      </div>

      {/* 기본 상태: from → to */}
      <motion.div
        className="relative sm:absolute sm:inset-0 flex flex-col justify-between p-5 sm:p-6 lg:p-7"
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <p className="text-[14px] lg:text-[15px] text-[#595959] leading-relaxed mb-1">
            {lang === 'ko' ? p.fromKo : p.fromEn}
          </p>
          <h3 className="text-[20px] lg:text-[22px] font-bold text-[#595959] leading-snug whitespace-pre-line">
            {lang === 'ko' ? p.toKo : p.toEn}
          </h3>
        </div>
        {/* 플러스 버튼 */}
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

      {/* 클릭 시: 유리 질감 + 설명 */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center p-6 lg:p-7 rounded-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.65) 0%, rgba(245,248,255,0.5) 50%, rgba(235,240,250,0.55) 100%)',
          backdropFilter: 'blur(28px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
          border: '1px solid rgba(255,255,255,0.45)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 1px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.06)',
        }}
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
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
      fromKo: '',
      fromEn: '',
      toKo: '직접 말하지 않아도,\n일상의 말에서 마음을 읽는 AI로',
      toEn: 'AI that reads hearts\nfrom everyday words, even unspoken',
      descKo: '"도와주세요"라고 직접 말할 수 있는 사람은 많지 않습니다.\n우리는 일상적인 발화 속 목소리 톤, 감정 변화, 말의 빈도와\n패턴에서 마음의 상태를 읽어냅니다.',
      descEn: 'Not many people can say "help me" directly.\nWe read emotional states from voice tone, sentiment shifts,\nand speech frequency patterns in everyday conversation.',
      closingKo: '도움을 요청하는 것이 아니라\n대화가 이미 신호가 되어야 합니다.',
      closingEn: 'Rather than asking for help,\nconversation itself should become the signal.',
    },
    {
      fromKo: '',
      fromEn: '',
      toKo: '단순한 데이터 수집을 넘어,\n사람을 이해하는 깊은 통찰로',
      toEn: 'Beyond simple data collection,\ndeep insight that understands people',
      descKo: '데이터는 쌓일수록 가치가 커집니다.\n그 위에 이해의 깊이가 더해질 때, 진짜 통찰이 됩니다.\n지능은 사람의 맥락을 읽고, 변화를 감지하고, 필요한 순간에 연결합니다.',
      descEn: 'Data grows in value as it accumulates.\nWhen depth of understanding is added, it becomes real insight.\nIntelligence reads context, detects change, and connects at the right moment.',
      closingKo: '지능의 깊이가 곧 존중의 깊이입니다.',
      closingEn: 'The depth of intelligence is the depth of respect.',
    },
    {
      fromKo: '',
      fromEn: '',
      toKo: '멀리서 지켜보는 것이 아니라,\n일상에 함께하는 기술로',
      toEn: 'Not watching from afar,\nbut technology that walks alongside daily life',
      descKo: '사람의 목소리에는 가장 민감한 정보가 담겨 있습니다.\n우리는 음성 데이터의 비식별화, 온디바이스 처리, 암호화 전송 등\n다층 보안 구조를 통해 개인정보를 기술로 보호합니다.',
      descEn: 'The most sensitive information is contained in a person\'s voice.\nWe protect personal data through multi-layered security including\nde-identification, on-device processing, and encrypted transmission.',
      closingKo: '기술로 지키는 것에는 정보도 포함됩니다.',
      closingEn: 'What technology protects includes information too.',
    },
    {
      fromKo: '',
      fromEn: '',
      toKo: '의식하지 않는 사이에도,\n이미 시작된 돌봄으로',
      toEn: 'Care that has already begun,\neven before you notice',
      descKo: '어르신의 하루는 달라지지 않습니다.\n평소처럼 대화하고, 평소처럼 살아갑니다.\n우리는 그 일상 안에서 돌봄이 시작되는 구조를 설계합니다.',
      descEn: 'The elderly\'s daily life doesn\'t change.\nThey talk as usual, live as usual.\nWe design structures where care begins within that routine.',
      closingKo: '돌봄은 부담이 아니라\n이미 일어나고 있는 것이어야 합니다.',
      closingEn: 'Care should not be a burden,\nbut something already happening.',
    },
  ];

  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section className="bg-white min-h-screen flex flex-col justify-center py-12 lg:py-16">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-14 w-full">
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
            ? '깊은 지능은 이렇게 작동합니다.'
            : (<>Deep intelligence<br />works like this.</>)}
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

// ── Intelligent Future (장면 전환) ───────────────────────────────────

function IntelligentFuture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: '100vh',
        background: 'linear-gradient(180deg, #448CFF 0%, #5A9BFF 20%, #7AB4FF 45%, #A8CFFF 65%, #D6E6FF 82%, #EDF3FF 100%)',
      }}
    >
      {/* 배경 오브 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full top-[10%] left-[15%] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)' }} />
        <div className="absolute w-[600px] h-[600px] rounded-full bottom-[5%] right-[10%] opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)' }} />
      </div>

      {/* 글라스모피즘 텍스트 */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 font-black text-center select-none uppercase"
        style={{
          fontSize: 'clamp(1.8rem, 8vw, 7.5rem)',
          letterSpacing: '0.05em',
          lineHeight: 1.35,
          color: 'transparent',
          background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.35) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextStroke: '1.5px rgba(255,255,255,0.4)',
          filter: 'drop-shadow(0 4px 60px rgba(255,255,255,0.4))',
        }}
      >
        INNOVATION FOR<br />HUMAN INTEGRITY
      </motion.h2>
    </section>
  );
}

// ── D. Next Move ─────────────────────────────────────────────────────

function NextMove({ lang }: { lang: 'ko' | 'en' }) {
  const futureValues = [
    {
      titleKo: '지능 엔진', titleEn: 'Intelligence Engine',
      descKo: '사람의 마음을 읽으려면\n표면이 아닌 깊이를\n이해해야 합니다.\n\n음성, 감정, 맥락을\n실시간으로 분석하는\n핵심 AI 엔진을 구축합니다.',
      descEn: 'To read a person\'s heart,\nyou must understand depth,\nnot the surface.\n\nWe build a core AI engine\nthat analyzes voice, emotion, and context\nin real time.',
    },
    {
      titleKo: '데이터 네트워크', titleEn: 'Data Network',
      descKo: '한 사람을 온전히 이해하려면\n흩어진 신호가 하나로\n연결되어야 합니다.\n\n현장에서 생성되는 데이터를\n연결하고 학습하여\n이해의 깊이를 높여갑니다.',
      descEn: 'To fully understand a person,\nscattered signals must be\nconnected as one.\n\nWe connect and learn from\nfield-generated data to deepen\nthe level of understanding.',
    },
    {
      titleKo: '보안 아키텍처', titleEn: 'Security Architecture',
      descKo: '깊이 이해할수록\n더 단단히 지켜야 합니다.\n\n비식별화, 온디바이스 처리,\n암호화 전송 등 다층 보안 구조로\n개인정보를 보호합니다.',
      descEn: 'The deeper you understand,\nthe stronger you must protect.\n\nWe safeguard personal data through\nmulti-layered security including de-identification,\non-device processing, and encrypted transmission.',
    },
    {
      titleKo: 'Physical AI 확장', titleEn: 'Physical AI Extension',
      descKo: '진짜 돌봄은 화면 안에서\n끝나지 않습니다.\n\n소프트웨어를 넘어\n현장 기기, 공간, 디바이스에\n지능을 탑재하여 현실에서\n작동하는 AI로 확장합니다.',
      descEn: 'Real care doesn\'t end\non a screen.\n\nBeyond software, we embed intelligence\nin field devices, spaces, and hardware\nto extend AI that operates\nin the real world.',
    },
  ];

  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const futureIllusts = [
    /* 01 지능 엔진 — 아이소메트릭 3D 큐브 브레인 */
    <svg key="il1" viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="eng-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#A0C4FF" /><stop offset="100%" stopColor="#448CFF" /></linearGradient>
        <linearGradient id="eng-left" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#448CFF" /><stop offset="100%" stopColor="#2563EB" /></linearGradient>
        <linearGradient id="eng-right" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6DA6FF" /><stop offset="100%" stopColor="#3B82F6" /></linearGradient>
        <filter id="eng-glow"><feGaussianBlur stdDeviation="8" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* 중앙 큐브 */}
      <polygon points="200,90 260,120 200,150 140,120" fill="url(#eng-top)" opacity="0.9" />
      <polygon points="140,120 200,150 200,210 140,180" fill="url(#eng-left)" opacity="0.85" />
      <polygon points="200,150 260,120 260,180 200,210" fill="url(#eng-right)" opacity="0.75" />
      {/* 글로우 코어 */}
      <circle cx="200" cy="150" r="18" fill="#448CFF" opacity="0.25" filter="url(#eng-glow)" />
      <circle cx="200" cy="150" r="6" fill="#FFFFFF" opacity="0.9" />
      {/* 궤도 링 */}
      <ellipse cx="200" cy="148" rx="55" ry="18" fill="none" stroke="#A0C4FF" strokeWidth="1.2" opacity="0.5" strokeDasharray="4 3" />
      <ellipse cx="200" cy="148" rx="80" ry="28" fill="none" stroke="#448CFF" strokeWidth="0.8" opacity="0.3" strokeDasharray="5 4" />
      {/* 노드 */}
      <circle cx="145" cy="145" r="4" fill="#A0C4FF" opacity="0.8" />
      <circle cx="255" cy="145" r="4" fill="#A0C4FF" opacity="0.8" />
      <circle cx="200" cy="120" r="3" fill="#6DA6FF" opacity="0.7" />
      {/* 연결선 */}
      <line x1="145" y1="145" x2="190" y2="150" stroke="#A0C4FF" strokeWidth="1" opacity="0.4" />
      <line x1="255" y1="145" x2="210" y2="150" stroke="#A0C4FF" strokeWidth="1" opacity="0.4" />
      <line x1="200" y1="120" x2="200" y2="144" stroke="#6DA6FF" strokeWidth="1" opacity="0.4" />
      {/* 작은 파티클 */}
      <circle cx="165" cy="105" r="2" fill="#448CFF" opacity="0.5" />
      <circle cx="240" cy="100" r="2.5" fill="#6DA6FF" opacity="0.4" />
      <circle cx="155" cy="185" r="2" fill="#A0C4FF" opacity="0.45" />
      <circle cx="250" cy="190" r="1.5" fill="#448CFF" opacity="0.4" />
    </svg>,
    /* 02 데이터 네트워크 — 아이소메트릭 3D 노드 메시 */
    <svg key="il2" viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="net-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#B8D4FF" /><stop offset="100%" stopColor="#448CFF" /></linearGradient>
        <linearGradient id="net-side" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#448CFF" /><stop offset="100%" stopColor="#1D4ED8" /></linearGradient>
        <filter id="net-glow"><feGaussianBlur stdDeviation="6" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* 베이스 플랫폼 (아이소메트릭) */}
      <polygon points="200,200 310,145 200,90 90,145" fill="url(#net-top)" opacity="0.12" stroke="#448CFF" strokeWidth="1" strokeOpacity="0.3" />
      {/* 3D 연결선 (파이프) */}
      <line x1="140" y1="168" x2="200" y2="130" stroke="#448CFF" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
      <line x1="260" y1="168" x2="200" y2="130" stroke="#448CFF" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
      <line x1="140" y1="168" x2="260" y2="168" stroke="#448CFF" strokeWidth="2" opacity="0.25" strokeLinecap="round" />
      <line x1="200" y1="130" x2="200" y2="82" stroke="#6DA6FF" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <line x1="140" y1="168" x2="95" y2="205" stroke="#A0C4FF" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      <line x1="260" y1="168" x2="305" y2="205" stroke="#A0C4FF" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      {/* 3D 구체 노드 */}
      <circle cx="200" cy="130" r="16" fill="#448CFF" opacity="0.2" filter="url(#net-glow)" />
      <circle cx="200" cy="130" r="10" fill="url(#net-side)" opacity="0.85" />
      <ellipse cx="198" cy="127" rx="4" ry="3" fill="white" opacity="0.4" />
      <circle cx="140" cy="168" r="12" fill="#448CFF" opacity="0.15" filter="url(#net-glow)" />
      <circle cx="140" cy="168" r="8" fill="url(#net-side)" opacity="0.75" />
      <ellipse cx="138" cy="166" rx="3" ry="2.5" fill="white" opacity="0.35" />
      <circle cx="260" cy="168" r="12" fill="#448CFF" opacity="0.15" filter="url(#net-glow)" />
      <circle cx="260" cy="168" r="8" fill="url(#net-side)" opacity="0.75" />
      <ellipse cx="258" cy="166" rx="3" ry="2.5" fill="white" opacity="0.35" />
      {/* 상단 노드 */}
      <circle cx="200" cy="82" r="7" fill="#6DA6FF" opacity="0.8" />
      <ellipse cx="199" cy="80" rx="2.5" ry="2" fill="white" opacity="0.45" />
      {/* 하단 리프 노드 */}
      <circle cx="95" cy="205" r="5" fill="#A0C4FF" opacity="0.65" />
      <circle cx="305" cy="205" r="5" fill="#A0C4FF" opacity="0.65" />
      {/* 데이터 플로우 점 */}
      <circle cx="170" cy="149" r="2" fill="#A0C4FF" opacity="0.7" />
      <circle cx="230" cy="149" r="2" fill="#A0C4FF" opacity="0.7" />
      <circle cx="200" cy="106" r="2" fill="#6DA6FF" opacity="0.6" />
    </svg>,
    /* 03 보안 아키텍처 — 방패+잠금 */
    <svg key="il3" viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="sec-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A0C4FF" /><stop offset="100%" stopColor="#448CFF" /></linearGradient>
        <filter id="sec-glow"><feGaussianBlur stdDeviation="6" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* 방패 */}
      <path d="M200 50 L270 80 L270 170 C270 210,200 240,200 240 C200 240,130 210,130 170 L130 80 Z" stroke="#448CFF" strokeWidth="1.5" opacity="0.3" fill="#448CFF" fillOpacity="0.04" />
      <path d="M200 75 L250 97 L250 160 C250 190,200 212,200 212 C200 212,150 190,150 160 L150 97 Z" stroke="#6DA6FF" strokeWidth="1" opacity="0.2" fill="#448CFF" fillOpacity="0.03" />
      {/* 잠금 아이콘 */}
      <rect x="184" y="135" width="32" height="28" rx="4" stroke="#448CFF" strokeWidth="1.5" opacity="0.5" fill="#448CFF" fillOpacity="0.06" />
      <path d="M190 135 L190 125 C190 115,200 108,200 108 C200 108,210 115,210 125 L210 135" stroke="#448CFF" strokeWidth="1.5" fill="none" opacity="0.45" />
      <circle cx="200" cy="147" r="3" fill="#448CFF" opacity="0.5" />
      <line x1="200" y1="150" x2="200" y2="156" stroke="#448CFF" strokeWidth="1.5" opacity="0.4" />
      {/* 보안 레이어 링 */}
      <ellipse cx="200" cy="155" rx="100" ry="35" stroke="#448CFF" strokeWidth="0.6" opacity="0.1" strokeDasharray="4 6" />
      <ellipse cx="200" cy="155" rx="130" ry="48" stroke="#448CFF" strokeWidth="0.4" opacity="0.06" strokeDasharray="3 8" />
      {/* 노드 */}
      <circle cx="100" cy="100" r="3" fill="#A0C4FF" opacity="0.4" />
      <circle cx="300" cy="100" r="3" fill="#A0C4FF" opacity="0.4" />
      <circle cx="100" cy="210" r="3" fill="#6DA6FF" opacity="0.35" />
      <circle cx="300" cy="210" r="3" fill="#6DA6FF" opacity="0.35" />
      <line x1="100" y1="100" x2="200" y2="147" stroke="#448CFF" strokeWidth="0.5" opacity="0.1" />
      <line x1="300" y1="100" x2="200" y2="147" stroke="#448CFF" strokeWidth="0.5" opacity="0.1" />
      <line x1="100" y1="210" x2="200" y2="147" stroke="#448CFF" strokeWidth="0.5" opacity="0.1" />
      <line x1="300" y1="210" x2="200" y2="147" stroke="#448CFF" strokeWidth="0.5" opacity="0.1" />
    </svg>,
    /* 04 Physical AI — 아이소메트릭 3D 빌딩+디바이스 */
    <svg key="il4" viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="phy-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#B8D4FF" /><stop offset="100%" stopColor="#6DA6FF" /></linearGradient>
        <linearGradient id="phy-left" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#448CFF" /><stop offset="100%" stopColor="#1E40AF" /></linearGradient>
        <linearGradient id="phy-right" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6DA6FF" /><stop offset="100%" stopColor="#2563EB" /></linearGradient>
        <filter id="phy-glow"><feGaussianBlur stdDeviation="6" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* 빌딩 — 아이소메트릭 큐브 타워 */}
      <polygon points="140,80 185,58 185,170 140,192" fill="url(#phy-left)" opacity="0.8" />
      <polygon points="185,58 230,80 230,192 185,170" fill="url(#phy-right)" opacity="0.7" />
      <polygon points="140,80 185,58 230,80 185,102" fill="url(#phy-top)" opacity="0.85" />
      {/* 빌딩 창문 */}
      <rect x="152" y="100" width="12" height="10" rx="1" fill="white" opacity="0.25" transform="skewY(-12)" />
      <rect x="152" y="122" width="12" height="10" rx="1" fill="white" opacity="0.2" transform="skewY(-12)" />
      <rect x="152" y="144" width="12" height="10" rx="1" fill="#A0C4FF" opacity="0.35" transform="skewY(-12)" />
      <rect x="198" y="95" width="12" height="10" rx="1" fill="white" opacity="0.2" transform="skewY(12)" />
      <rect x="198" y="117" width="12" height="10" rx="1" fill="white" opacity="0.18" transform="skewY(12)" />
      <rect x="198" y="139" width="12" height="10" rx="1" fill="#A0C4FF" opacity="0.3" transform="skewY(12)" />
      {/* 디바이스 — 작은 큐브 */}
      <polygon points="290,140 320,125 320,170 290,185" fill="url(#phy-left)" opacity="0.65" />
      <polygon points="320,125 350,140 350,185 320,170" fill="url(#phy-right)" opacity="0.55" />
      <polygon points="290,140 320,125 350,140 320,155" fill="url(#phy-top)" opacity="0.7" />
      {/* 디바이스 화면 */}
      <polygon points="295,150 315,140 315,165 295,175" fill="#A0C4FF" opacity="0.4" />
      {/* 센서 — 캡슐 */}
      <ellipse cx="80" cy="170" rx="20" ry="12" fill="url(#phy-top)" opacity="0.6" />
      <ellipse cx="80" cy="170" rx="20" ry="12" fill="none" stroke="#448CFF" strokeWidth="1.5" opacity="0.5" />
      <rect x="60" y="170" width="40" height="30" rx="0" fill="url(#phy-left)" opacity="0.5" />
      <ellipse cx="80" cy="200" rx="20" ry="12" fill="url(#phy-left)" opacity="0.6" />
      <circle cx="80" cy="178" r="4" fill="#448CFF" opacity="0.6" />
      <circle cx="80" cy="178" r="2" fill="white" opacity="0.7" />
      {/* AI 코어 — 중앙 발광 */}
      <circle cx="200" cy="220" r="10" fill="#448CFF" opacity="0.2" filter="url(#phy-glow)" />
      <circle cx="200" cy="220" r="5" fill="#448CFF" opacity="0.7" />
      <circle cx="200" cy="220" r="2.5" fill="white" opacity="0.8" />
      {/* 연결선 — 점선 */}
      <line x1="140" y1="192" x2="195" y2="220" stroke="#448CFF" strokeWidth="1.2" opacity="0.4" strokeDasharray="4 3" />
      <line x1="290" y1="185" x2="210" y2="220" stroke="#448CFF" strokeWidth="1.2" opacity="0.4" strokeDasharray="4 3" />
      <line x1="80" y1="200" x2="190" y2="220" stroke="#448CFF" strokeWidth="1.2" opacity="0.4" strokeDasharray="4 3" />
      {/* 신호 웨이브 */}
      <circle cx="200" cy="220" r="22" fill="none" stroke="#A0C4FF" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="200" cy="220" r="35" fill="none" stroke="#A0C4FF" strokeWidth="0.6" opacity="0.2" strokeDasharray="4 4" />
    </svg>,
  ];

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center py-16 sm:py-24 lg:py-[140px]" style={{ background: 'linear-gradient(180deg, #EDF3FF 0%, #F5F8FF 40%, #FAFBFF 100%)' }}>
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-14 w-full">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-bold text-[#191F28] leading-[1.3] tracking-tight text-center"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            {lang === 'ko' ? '깊은 지능을 만드는 기술' : 'Technology that creates deep intelligence'}
          </h2>
          <div className="mx-auto mt-6 w-px h-10 bg-gradient-to-b from-[#448CFF]/40 to-transparent" />
        </motion.div>

        {/* 카드 4개 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {futureValues.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start text-left rounded-3xl bg-white border border-[#E5E8EB] p-6 lg:p-8"
              style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}
            >
              <div className="w-full h-[200px] flex items-center justify-center mb-6">
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
      descKo: '고정밀 STT 모델과 발화 구간 탐지(VAD)를 결합해\n1초 단위로 음성을 처리하며,\n문맥 기반 확률 교정 알고리즘을 통해 인식 오류를 최소화합니다.\n공공 상담 환경에서도 안정적으로 작동하는\n음성 인식 체계를 구축합니다.',
      descEn: 'Combining a high-precision STT model with Voice Activity Detection (VAD), we process speech at one-second intervals and minimize recognition errors through context-based probabilistic correction algorithms. We build a speech recognition system that operates reliably even in public consultation environments.',
    },
    {
      en: 'Context-aware Intelligent Correction',
      ko: '문맥 기반 지능 교정 시스템',
      subKo: '단순 인식을 넘어, 의미를 이해하는 교정 기술을 구현합니다.',
      subEn: 'Beyond simple recognition — we implement correction technology that understands meaning.',
      descKo: '상담 도메인 특화 단어 사전과 문맥 확률 모델을 적용해\n오인식 단어를 자동 수정하며,\n문장 단위 맥락 분석을 통해 정보 정확도를 높입니다.\n실무에 바로 활용 가능한 수준의\n텍스트 정합성을 제공합니다.',
      descEn: 'Applying consultation-domain dictionaries and contextual probability models, we auto-correct misrecognized words and improve accuracy through sentence-level context analysis. We deliver text consistency ready for immediate practical use.',
    },
    {
      en: 'AI Report Automation',
      ko: 'AI 상담 리포트 자동화 시스템',
      subKo: '상담 기록을 구조화하고 요약하는 자동화 플랫폼을 구축합니다.',
      subEn: 'We build an automation platform that structures and summarizes consultation records.',
      descKo: '음성 인식 결과를 기반으로\n핵심 내용, 주요 키워드, 민원 유형을 자동 추출하며,\n행정 서식에 맞춘 리포트를 자동 생성합니다.\n반복적인 문서 작성 업무를 줄이고,\n업무 효율성을 향상시킵니다.',
      descEn: 'Based on speech recognition results, we auto-extract key content, keywords, and complaint types, then auto-generate reports formatted for administrative forms. We reduce repetitive document writing and improve operational efficiency.',
    },
    {
      en: 'Data-driven Risk Prediction',
      ko: '데이터 기반 위험 예측 모델',
      subKo: '대규모 데이터를 분석해 위험 신호를 탐지하는 예측 모델을 개발합니다.',
      subEn: 'We develop prediction models that analyze large-scale data to detect risk signals.',
      descKo: '57,000건 이상의 사례 데이터를 학습해\n고독사 여부를 분류하고,\n설명 가능한 AI(XAI)를 통해 판단 근거를 제공합니다.\n정책적 의사결정에 활용 가능한\n분석 기반을 마련합니다.',
      descEn: 'Training on over 57,000 case records to classify solitary death risk, we provide decision rationale through explainable AI (XAI). We establish an analytical foundation applicable to policy decision-making.',
    },
    {
      en: 'Security-first AI Architecture',
      ko: '보안 중심 AI 아키텍처',
      subKo: '공공 환경에 적합한 보안 처리 구조를 설계합니다.',
      subEn: 'We design security processing structures suited for public sector environments.',
      descKo: '내부 서버 기반 처리, 개인정보 비식별화 기술,\n접근 통제 시스템을 적용해\n민감 정보를 안전하게 관리합니다.\n안정성과 신뢰성을 동시에 확보합니다.',
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
        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14 w-full">
          <div className="max-w-[1360px] mx-auto">
            <div className="w-full flex flex-col gap-6 sm:gap-8 lg:flex-row lg:gap-16 items-center">

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
              <div className="w-full lg:w-[40%] relative overflow-hidden" style={{ minHeight: 280 }}>
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
                    <p className="text-[20px] sm:text-[26px] lg:text-[34px] font-bold text-white leading-tight mb-4 sm:mb-5">
                      {lang === 'ko' ? m.ko : m.en}
                    </p>
                    <p className="text-[15px] lg:text-[16px] text-white/70 font-medium leading-relaxed mb-4">
                      {lang === 'ko' ? m.subKo : m.subEn}
                    </p>
                    <p className="text-[13px] lg:text-[14px] text-[#9CA3AF] leading-[1.8] whitespace-pre-line break-keep">
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
            { date: '2025.06', text: '이노하이 사업자 등록' },
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
      {/* 헤딩 */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-20 lg:mb-28"
      >
        <h2
          className="font-bold text-[#191F28] leading-[1.25] tracking-tight"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          {lang === 'ko'
            ? '지금, 깊은 지능이 만들어지고 있습니다'
            : 'Right now, deep intelligence is being built'}
        </h2>
      </motion.div>

      {/* 카드 */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={cardInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1100px] mx-auto rounded-3xl bg-white px-14 py-16 lg:px-24 lg:py-20"
      >
        <div className="relative">
          <div className="space-y-14">
            {timeline.map((t, i) => {
              const isActive = active === t.year;
              const isCurrent = !!t.current;
              const activeYearColor = isCurrent ? 'text-[#448CFF]' : 'text-[#6B7684]';
              const activeDotColor = isCurrent ? 'bg-[#448CFF]' : 'bg-[#8B95A1]';
              const activeDateColor = isCurrent ? 'text-[#448CFF]' : 'text-[#6B7684]';

              return (
                <div key={t.year} className="relative flex items-start">
                  {/* 연결선 */}
                  {i < timeline.length - 1 && (
                    <div
                      className="absolute left-[96px] lg:left-[116px]"
                      style={{
                        top: '20px',
                        bottom: '-61px',
                        ...(isCurrent
                          ? { width: '1px', background: '#448CFF' }
                          : { width: '0', borderLeft: '1px dashed #D1D6DB' }),
                      }}
                    />
                  )}

                  {/* 좌: 연도 */}
                  <button
                    onClick={() => setActive(t.year)}
                    className="w-[80px] lg:w-[100px] flex-shrink-0 text-left cursor-pointer"
                  >
                    <span
                      className={`text-[18px] lg:text-[20px] font-bold tabular-nums tracking-tight block transition-colors duration-300 ${
                        isActive ? activeYearColor : (isCurrent ? 'text-[#A3C4FF] hover:text-[#7AB0FF]' : 'text-[#D1D6DB] hover:text-[#B0B8C1]')
                      }`}
                    >{t.year}</span>
                  </button>

                  {/* 중앙: 점 */}
                  <button
                    onClick={() => setActive(t.year)}
                    className="flex-shrink-0 w-8 flex justify-center relative z-10 pt-[4px] cursor-pointer"
                  >
                    <div className={`w-4 h-4 rounded-full ring-4 ring-white transition-colors duration-300 ${
                      isActive ? activeDotColor : (isCurrent ? 'bg-[#A3C4FF]' : 'bg-[#D1D6DB]')
                    }`} />
                  </button>

                  {/* 우: 날짜 + 내용 */}
                  <div
                    className={`flex-1 pl-8 lg:pl-12 space-y-4 transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-35'}`}
                  >
                    {t.items.map((item, j) => (
                      <div key={j}>
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
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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

  // 텍스트: 스크롤 시작 시 페이드인, 이후 유지
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.1, 0.3], [30, 0]);

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
            <motion.h2
              style={{ opacity: opacity2, y: y2 }}
              className="font-extrabold text-[#FFFFFF] leading-[1.45] tracking-tight drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            >
              <span style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', color: '#FFFFFF' }}>
                {lang === 'ko' ? (
                  <>깊은 지능의 끝에는<br />항상 사람이 있습니다.</>
                ) : (
                  <>At the end of deep intelligence,<br />there are always people.</>
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
      <IntelligentFuture />
      <NextMove lang={lang} />
      <Vision lang={lang} />
      <Technology lang={lang} />
      <History lang={lang} />
    </main>
  );
}
