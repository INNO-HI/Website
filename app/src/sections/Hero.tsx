import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

// ── SVG 아이콘 ────────────────────────────────────────────────────────

function IconHeart() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF8FAB" /><stop offset="1" stopColor="#FF4D80" />
        </linearGradient>
      </defs>
      <path d="M20 34S6 24.67 6 16a8 8 0 0114-5.29A8 8 0 0134 16c0 8.67-14 18-14 18z" fill="url(#hg)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="hmg" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#74B3FF" /><stop offset="1" stopColor="#448CFF" />
        </linearGradient>
      </defs>
      <path d="M6 18L20 6l14 12v16H6V18z" fill="url(#hmg)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x="14" y="24" width="12" height="10" rx="1.5" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="pg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A8EDEA" /><stop offset="1" stopColor="#52C8C4" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="12" r="5" fill="url(#pg)" />
      <circle cx="26" cy="12" r="5" fill="url(#pg)" />
      <path d="M4 34c0-7 4.5-10 10-10s10 3 10 10" fill="url(#pg)" fillOpacity="0.7" />
      <path d="M16 34c0-7 4.5-10 10-10s10 3 10 10" fill="url(#pg)" fillOpacity="0.7" />
    </svg>
  );
}

function IconMedical() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="mg" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67E8F9" /><stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="32" height="32" rx="8" fill="url(#mg)" />
      <rect x="17" y="10" width="6" height="20" rx="3" fill="white" fillOpacity="0.9" />
      <rect x="10" y="17" width="20" height="6" rx="3" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

function IconReport() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="rg" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818CF8" /><stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <rect x="6" y="4" width="28" height="32" rx="4" fill="url(#rg)" />
      <rect x="11" y="11" width="18" height="2" rx="1" fill="white" fillOpacity="0.8" />
      <rect x="11" y="16" width="14" height="2" rx="1" fill="white" fillOpacity="0.6" />
      <rect x="11" y="24" width="5" height="6" rx="1" fill="white" fillOpacity="0.75" />
      <rect x="18" y="21" width="5" height="9" rx="1" fill="white" fillOpacity="0.75" />
      <rect x="25" y="18" width="5" height="12" rx="1" fill="white" fillOpacity="0.75" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="sg" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#86EFAC" /><stop offset="1" stopColor="#22C55E" />
        </linearGradient>
      </defs>
      <path d="M20 4L6 10v12c0 8 6 14 14 16 8-2 14-8 14-16V10L20 4z" fill="url(#sg)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M13 20l5 5 9-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconAI() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="ag" x1="8" y1="10" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93C5FD" /><stop offset="1" stopColor="#448CFF" />
        </linearGradient>
      </defs>
      <rect x="8" y="10" width="24" height="22" rx="6" fill="url(#ag)" />
      <rect x="14" y="4" width="12" height="8" rx="3" fill="#BAD9FF" />
      <circle cx="16" cy="20" r="2.5" fill="white" fillOpacity="0.9" />
      <circle cx="24" cy="20" r="2.5" fill="white" fillOpacity="0.9" />
      <path d="M15 26c1.5 2 8.5 2 10 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="4" y="16" width="4" height="8" rx="2" fill="url(#ag)" />
      <rect x="32" y="16" width="4" height="8" rx="2" fill="url(#ag)" />
    </svg>
  );
}

function IconLeaf() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="lg" x1="8" y1="12" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#86EFAC" /><stop offset="1" stopColor="#16A34A" />
        </linearGradient>
      </defs>
      <path d="M8 32c4-8 12-14 24-20C32 24 26 34 8 32z" fill="url(#lg)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M8 32C14 24 22 20 32 12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── 3D 플로팅 박스 ────────────────────────────────────────────────────

interface BoxProps {
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  size?: number;
  topColor: string;
  sideColor: string;
  icon: React.ReactNode;
  rotate?: number;
  opacity?: number;
}

function Float3DBox({ style, delay = 0, duration = 4, size = 80, topColor, sideColor, icon, rotate = -18, opacity = 1 }: BoxProps) {
  const d = Math.round(size * 0.18);
  const sw = Math.round(size * 0.13);
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ ...style, opacity }}
      initial={{ opacity: 0, y: 24, scale: 0.85 }}
      animate={{ opacity, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration, delay: delay * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          width: size, height: size, position: 'relative',
          transform: `perspective(500px) rotateY(${rotate}deg) rotateX(8deg)`,
          filter: 'drop-shadow(0 20px 40px rgba(68,140,255,0.15)) drop-shadow(0 4px 8px rgba(0,0,0,0.08))',
        }}>
          {/* 앞면 */}
          <div style={{
            width: size, height: size,
            borderRadius: size * 0.22,
            background: topColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: size * 0.18,
            border: '1.5px solid rgba(255,255,255,0.75)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ width: size * 0.52, height: size * 0.52 }}>{icon}</div>
            {/* 광택 레이어 */}
            <div style={{
              position: 'absolute', top: '6%', left: '8%',
              width: '42%', height: '32%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.60) 0%, transparent 100%)',
              borderRadius: size * 0.1,
            }} />
          </div>
          {/* 우측면 */}
          <div style={{
            position: 'absolute', right: -sw, top: d * 0.6,
            width: sw, height: size - d * 0.6,
            background: sideColor,
            borderRadius: `0 ${size * 0.1}px ${size * 0.1}px 0`,
          }} />
          {/* 하단면 */}
          <div style={{
            position: 'absolute', bottom: -d, left: d * 0.4,
            width: size - d * 0.4, height: d,
            background: sideColor,
            borderRadius: `0 0 ${size * 0.1}px ${size * 0.1}px`,
            opacity: 0.8,
          }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function FloatDot({ style, delay = 0, color, size = 8 }: { style?: React.CSSProperties; delay?: number; color: string; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: color, ...style }}
      animate={{ y: [0, -7, 0], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 3.2, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ── Hero 메인 ─────────────────────────────────────────────────────────

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title-line', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.6 });
      gsap.fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(155deg, #EEF4FF 0%, #F4F8FF 40%, #FAFCFF 75%, #FFFFFF 100%)' }}
      aria-label="메인 히어로"
    >
      {/* 배경 블러 오브 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-40 w-[500px] h-[500px] bg-[#C7DEFF] rounded-full blur-[100px] opacity-25" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-[#D4EEFF] rounded-full blur-[100px] opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E8F2FF] rounded-full blur-[80px] opacity-20" />
      </div>

      {/* 3D 플로팅 오브젝트 */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Float3DBox style={{ top: '13%', left: '4%' }} delay={0.3} duration={4.2} size={90}
          topColor="linear-gradient(145deg,#FFF0F4 0%,#FFD6E3 100%)"
          sideColor="rgba(255,130,160,0.35)" icon={<IconHeart />} rotate={-20} />
        <Float3DBox style={{ top: '9%', right: '5%' }} delay={0.6} duration={3.8} size={98}
          topColor="linear-gradient(145deg,#EBF4FF 0%,#D6EAFF 100%)"
          sideColor="rgba(68,140,255,0.30)" icon={<IconHome />} rotate={20} />
        <Float3DBox style={{ top: '43%', left: '1%' }} delay={0.9} duration={5.0} size={82}
          topColor="linear-gradient(145deg,#E6FAF9 0%,#CCEFED 100%)"
          sideColor="rgba(60,190,186,0.28)" icon={<IconPeople />} rotate={-22} />
        <Float3DBox style={{ top: '30%', right: '3%' }} delay={0.4} duration={4.5} size={84}
          topColor="linear-gradient(145deg,#E0F9FF 0%,#C8F0FF 100%)"
          sideColor="rgba(34,211,238,0.28)" icon={<IconMedical />} rotate={22} />
        <Float3DBox style={{ bottom: '17%', left: '4%' }} delay={1.1} duration={4.0} size={78}
          topColor="linear-gradient(145deg,#EEEEFF 0%,#E0E0FF 100%)"
          sideColor="rgba(99,102,241,0.25)" icon={<IconReport />} rotate={-17} />
        <Float3DBox style={{ bottom: '13%', right: '5%' }} delay={0.7} duration={4.7} size={86}
          topColor="linear-gradient(145deg,#ECFDF5 0%,#D0FAEB 100%)"
          sideColor="rgba(34,197,94,0.24)" icon={<IconShield />} rotate={22} />
        <Float3DBox style={{ top: '20%', right: '17%' }} delay={1.3} duration={3.6} size={72}
          topColor="linear-gradient(145deg,#EFF6FF 0%,#DBEAFE 100%)"
          sideColor="rgba(68,140,255,0.26)" icon={<IconAI />} rotate={14} opacity={0.85} />
        <Float3DBox style={{ top: '25%', left: '15%' }} delay={1.5} duration={5.2} size={68}
          topColor="linear-gradient(145deg,#F0FDF4 0%,#DCFCE7 100%)"
          sideColor="rgba(22,163,74,0.22)" icon={<IconLeaf />} rotate={-14} opacity={0.80} />
        <FloatDot style={{ top: '54%', left: '13%' }} delay={0.5} color="rgba(68,140,255,0.45)" size={11} />
        <FloatDot style={{ top: '34%', right: '21%' }} delay={1.2} color="rgba(255,100,140,0.40)" size={7} />
        <FloatDot style={{ bottom: '30%', right: '15%' }} delay={0.8} color="rgba(60,190,186,0.38)" size={13} />
        <FloatDot style={{ bottom: '42%', left: '20%' }} delay={1.6} color="rgba(99,102,241,0.35)" size={9} />
        <FloatDot style={{ top: '64%', right: '28%' }} delay={2.0} color="rgba(34,197,94,0.32)" size={6} />
      </div>

      {/* 콘텐츠 — 배지 + 타이틀 + 서브타이틀 + CTA */}
      <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center w-full">
          {/* 배지 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#D3D8DF] mb-10 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-[#448CFF]" aria-hidden="true" />
            <span className="text-xs font-black text-[#448CFF] tracking-wide">Care AX Company</span>
          </motion.div>

          {/* 타이틀 */}
          <h1
            className="font-black text-[#444B52] mb-10 leading-[1.15] tracking-tighter"
            style={{ fontSize: 'clamp(3.5rem, 7.5vw, 6rem)' }}
          >
            {lang === 'ko' ? (
              <>
                <span className="hero-title-line block overflow-hidden">
                  <span className="inline-block">더 깊은 <span className="gradient-text">지능</span>으로</span>
                </span>
                <span className="hero-title-line block overflow-hidden mt-1">
                  <span className="inline-block">가장 높은 <span className="gradient-text">존중</span>을</span>
                </span>
              </>
            ) : (
              <>
                <span className="hero-title-line block overflow-hidden">
                  <span className="inline-block">Deeper <span className="gradient-text">Intelligence</span></span>
                </span>
                <span className="hero-title-line block overflow-hidden mt-1">
                  <span className="inline-block">Highest <span className="gradient-text">Respect</span></span>
                </span>
              </>
            )}
          </h1>

          {/* 서브타이틀 */}
          <p className="hero-subtitle text-base lg:text-lg text-[#4B4E56] max-w-lg mx-auto leading-relaxed font-medium mb-10">
            {lang === 'ko' ? (
              <>돌봄 현장의 복잡한 업무를 AI로 자동화하여,<br />사람이 사람을 돌보는 시간을 늘립니다.</>
            ) : (
              <>We automate complex care workflows with AI,<br />giving people more time to care for people.</>
            )}
          </p>

          {/* CTA — 서브타이틀 바로 아래 */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => scrollTo('contact')}
                size="lg"
                className="bg-[#448CFF] hover:bg-[#2E7FFA] text-white rounded-full px-9 py-5 text-[15px] font-bold transition-all min-h-[52px] shadow-[0_4px_24px_rgba(68,140,255,0.35)]"
              >
                {lang === 'ko' ? '도입 문의하기' : 'Contact Us'}
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full px-9 py-5 text-[15px] font-medium bg-white/70 backdrop-blur-sm border border-[#D3D8DF] text-[#4B4E56] hover:text-[#383838] hover:bg-white hover:border-[#B0BAC8] transition-all min-h-[52px]"
                onClick={() => window.open('#', '_blank')}
              >
                {lang === 'ko' ? '서비스 소개서' : 'Download Brochure'}
              </Button>
            </motion.div>
          </div>

          {/* 슬로건 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-10"
          >
            <p className="text-base font-medium tracking-wide text-[#777A86]">
              <span className="font-black text-[#448CFF]">INNO</span>vation for{' '}
              <span className="font-black text-[#448CFF]">H</span>uman{' '}
              <span className="font-black text-[#448CFF]">I</span>ntegrity
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
    </section>
  );
}
