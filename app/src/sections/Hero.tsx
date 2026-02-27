import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

// ── 플로팅 글래스 카드 ─────────────────────────────────────────────────

interface FloatingCardProps {
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

function FloatingCard({ style, delay = 0, duration = 5, children, className = '' }: FloatingCardProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration, delay: delay * 0.3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ── 서비스 미니 카드 컴포넌트들 ──────────────────────────────────────────

function VoiceCard({ lang }: { lang: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl px-5 py-4 shadow-[0_8px_40px_rgba(68,140,255,0.1)]"
      style={{ width: 180 }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#448CFF]/10 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#448CFF" strokeWidth="2" strokeLinecap="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-[#383838]">
          {lang === 'ko' ? '음성 AI' : 'Voice AI'}
        </span>
      </div>
      <div className="flex items-end gap-[3px] h-6">
        {[40, 65, 50, 80, 55, 70, 45, 75, 60, 85, 50, 65, 40, 70, 55].map((h, i) => (
          <motion.div
            key={i}
            className="w-[4px] rounded-full bg-[#448CFF]"
            style={{ opacity: 0.3 + (h / 120) }}
            animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.5}%`] }}
            transition={{ duration: 1.2, delay: i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <p className="text-[10px] text-[#448CFF] font-medium mt-2">
        {lang === 'ko' ? '실시간 음성인식 중...' : 'Listening...'}
      </p>
    </div>
  );
}

function DataCard({ lang }: { lang: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl px-5 py-4 shadow-[0_8px_40px_rgba(68,140,255,0.1)]"
      style={{ width: 190 }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-[#383838]">
          {lang === 'ko' ? '자동 기록' : 'Auto Record'}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-[#10B981] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          </div>
          <div className="h-[6px] rounded-full bg-[#10B981]/20 flex-1">
            <motion.div className="h-full rounded-full bg-[#10B981]/60" animate={{ width: ['0%', '85%'] }} transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-[#448CFF] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#448CFF]" />
          </div>
          <div className="h-[6px] rounded-full bg-[#448CFF]/20 flex-1">
            <motion.div className="h-full rounded-full bg-[#448CFF]/60" animate={{ width: ['0%', '70%'] }} transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-[#F59E0B] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          </div>
          <div className="h-[6px] rounded-full bg-[#F59E0B]/20 flex-1">
            <motion.div className="h-full rounded-full bg-[#F59E0B]/60" animate={{ width: ['0%', '92%'] }} transition={{ duration: 2, delay: 1.1, ease: 'easeOut' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CareCard({ lang }: { lang: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl px-5 py-4 shadow-[0_8px_40px_rgba(68,140,255,0.1)]"
      style={{ width: 170 }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#EC4899]/10 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#EC4899" fillOpacity="0.8" stroke="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-[#383838]">
          {lang === 'ko' ? '돌봄 현장' : 'Care Field'}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-center">
          <motion.p
            className="text-lg font-bold text-[#EC4899]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            +42%
          </motion.p>
          <p className="text-[9px] text-[#777A86] mt-0.5">
            {lang === 'ko' ? '돌봄 시간' : 'Care Time'}
          </p>
        </div>
        <div className="w-px h-8 bg-[#E5E7EB]" />
        <div className="text-center">
          <p className="text-lg font-bold text-[#448CFF]">-67%</p>
          <p className="text-[9px] text-[#777A86] mt-0.5">
            {lang === 'ko' ? '서류 업무' : 'Paperwork'}
          </p>
        </div>
      </div>
    </div>
  );
}

function WorkflowCard({ lang }: { lang: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl px-5 py-4 shadow-[0_8px_40px_rgba(68,140,255,0.1)]"
      style={{ width: 200 }}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-[#383838]">
          {lang === 'ko' ? '업무 자동화' : 'Automation'}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {[
          { label: lang === 'ko' ? '음성' : 'Voice', color: '#448CFF' },
          { label: lang === 'ko' ? '분석' : 'Parse', color: '#10B981' },
          { label: lang === 'ko' ? '기록' : 'Record', color: '#8B5CF6' },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <motion.div
              className="px-2 py-1 rounded-md text-[9px] font-semibold text-white"
              style={{ background: step.color }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.3, duration: 0.4 }}
            >
              {step.label}
            </motion.div>
            {i < 2 && (
              <motion.svg
                width="10" height="8" viewBox="0 0 10 8" fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.4 + i * 0.3 }}
              >
                <path d="M1 4h6M6 1l3 3-3 3" stroke="#777A86" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AccuracyCard({ lang }: { lang: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl px-4 py-3 shadow-[0_8px_40px_rgba(68,140,255,0.1)]"
      style={{ width: 140 }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-md bg-[#448CFF]/10 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#448CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <span className="text-[10px] font-semibold text-[#383838]">
          {lang === 'ko' ? '인식 정확도' : 'Accuracy'}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <motion.span
          className="text-2xl font-bold text-[#448CFF]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          98.5
        </motion.span>
        <span className="text-sm font-semibold text-[#448CFF]">%</span>
      </div>
    </div>
  );
}

// ── 소프트 도트 ──────────────────────────────────────────────────────

function SoftDot({ style, delay = 0, size = 6, opacity = 0.25 }: {
  style?: React.CSSProperties; delay?: number; size?: number; opacity?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: '#448CFF', opacity, ...style }}
      animate={{ y: [0, -6, 0], opacity: [opacity * 0.6, opacity, opacity * 0.6] }}
      transition={{ duration: 3.5, delay, repeat: Infinity, ease: 'easeInOut' }}
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
      aria-label={lang === 'ko' ? '메인 히어로' : 'Main hero'}
    >
      {/* 배경 블러 오브 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-40 w-[500px] h-[500px] bg-[#C7DEFF] rounded-full blur-[100px] opacity-25" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-[#D4EEFF] rounded-full blur-[100px] opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E8F2FF] rounded-full blur-[80px] opacity-20" />
      </div>

      {/* 플로팅 서비스 카드 - 데스크톱 전용 */}
      <div className="absolute inset-0 overflow-hidden hidden lg:block" aria-hidden="true">
        {/* 좌측 상단 - 음성 AI */}
        <FloatingCard style={{ top: '12%', left: '2%' }} delay={0.4} duration={5.5}>
          <VoiceCard lang={lang} />
        </FloatingCard>

        {/* 우측 상단 - 업무 자동화 */}
        <FloatingCard style={{ top: '8%', right: '2%' }} delay={0.7} duration={4.8}>
          <WorkflowCard lang={lang} />
        </FloatingCard>

        {/* 좌측 하단 - 자동 기록 */}
        <FloatingCard style={{ bottom: '22%', left: '2%' }} delay={1.0} duration={5.2}>
          <DataCard lang={lang} />
        </FloatingCard>

        {/* 우측 중앙 - 돌봄 현장 */}
        <FloatingCard style={{ top: '42%', right: '2%' }} delay={0.6} duration={4.6}>
          <CareCard lang={lang} />
        </FloatingCard>

        {/* 우측 하단 - 정확도 */}
        <FloatingCard style={{ bottom: '18%', right: '6%' }} delay={1.2} duration={5.0}>
          <AccuracyCard lang={lang} />
        </FloatingCard>

        {/* 소프트 도트 장식 */}
        <SoftDot style={{ top: '22%', left: '18%' }} delay={0.4} size={8} opacity={0.2} />
        <SoftDot style={{ top: '56%', left: '12%' }} delay={1.0} size={10} opacity={0.18} />
        <SoftDot style={{ top: '36%', right: '16%' }} delay={0.7} size={6} opacity={0.22} />
        <SoftDot style={{ bottom: '32%', right: '14%' }} delay={1.3} size={12} opacity={0.15} />
      </div>

      {/* 콘텐츠 — 배지 + 타이틀 + 서브타이틀 + CTA */}
      <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center w-full">
          {/* 배지 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#D3D8DF] mb-10 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-[#448CFF]" aria-hidden="true" />
            <span className="text-xs font-semibold text-[#448CFF] tracking-wide">Care AX Company</span>
          </motion.div>

          {/* 타이틀 */}
          <h1
            className="font-semibold text-[#444B52] mb-14 lg:mb-16 leading-[1.08] tracking-tighter"
            style={{ fontSize: 'clamp(3.25rem, 7.5vw, 5rem)' }}
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

          {/* CTA 버튼 */}
          <div className="hero-cta flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => scrollTo('contact')}
                  size="lg"
                  className="bg-[#448CFF] hover:bg-[#2E7FFA] text-white rounded-full px-9 py-5 text-[15px] font-semibold transition-all min-h-[52px] shadow-[0_4px_24px_rgba(68,140,255,0.35)]"
                >
                  {lang === 'ko' ? '도입 문의하기' : 'Contact Us'}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-full px-9 py-5 text-[15px] font-medium bg-white/70 backdrop-blur-sm border border-[#D3D8DF] text-[#4B4E56] hover:text-[#383838] hover:bg-white hover:border-[#B0BAC8] transition-all min-h-[52px]"
                  onClick={() => window.open('#', '_blank')}
                >
                  {lang === 'ko' ? '서비스 소개' : 'Learn More'}
                </Button>
              </motion.div>
            </div>

          </div>

          {/* 슬로건 + 앱 출시 예정 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <p className="text-base font-medium tracking-wide text-[#777A86]">
              <span className="font-semibold text-[#448CFF]">INNO</span>vation for{' '}
              <span className="font-semibold text-[#448CFF]">H</span>uman{' '}
              <span className="font-semibold text-[#448CFF]">I</span>ntegrity
            </p>
            <div className="hidden sm:block w-px h-4 bg-[#D3D8DF]" />
            <div className="flex items-center gap-2 opacity-40">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#777A86" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#777A86" aria-hidden="true">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 0 1 0 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
              </svg>
              <span className="text-[11px] text-[#9CA3AF] font-medium">
                {lang === 'ko' ? '앱 출시 예정' : 'App Coming Soon'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
    </section>
  );
}
