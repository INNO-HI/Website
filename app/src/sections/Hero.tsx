import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useLanguage } from '@/hooks/useLanguage';
import mainHeroBgSrc from '@/assets/main-hero-bg.jpg';
import heroSlide2Src from '@/assets/hero-slide2.jpg';

/* ── 슬라이드 데이터 ─────────────────────────────────────────────── */

const slides = [
  { src: mainHeroBgSrc, position: '70% center' },
  { src: heroSlide2Src, position: 'center center' },
  { gradient: 'linear-gradient(135deg, #0A1628 0%, #163060 40%, #448CFF 100%)' },
  { gradient: 'linear-gradient(135deg, #0E1A30 0%, #1B3D6E 45%, #6AA8FF 100%)' },
];

/* ── Hero ─────────────────────────────────────────────────────────── */

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goTo = (i: number) => {
    setCurrent(i);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.hero-subtitle', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-nav-dark
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label={lang === 'ko' ? '메인 히어로' : 'Main hero'}
    >
      {/* 슬라이드 배경 */}
      <AnimatePresence mode="popLayout">
        {slides.map((slide, i) =>
          i === current ? (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={
                slide.src
                  ? {
                      backgroundImage: `url(${slide.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: slide.position || 'center',
                    }
                  : { background: slide.gradient }
              }
            />
          ) : null
        )}
      </AnimatePresence>

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* 텍스트 — 왼쪽으로 */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-14">
        <div className="max-w-[700px]">
          <h1
            className="hero-title font-semibold text-white leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            <span className="font-bold bg-gradient-to-r from-[#6AA8FF] to-[#A8CEFF] bg-clip-text text-transparent">INNO</span>vation for <span className="font-bold bg-gradient-to-r from-[#6AA8FF] to-[#A8CEFF] bg-clip-text text-transparent">H</span>uman <span className="font-bold bg-gradient-to-r from-[#6AA8FF] to-[#A8CEFF] bg-clip-text text-transparent">I</span>ntegrity
          </h1>
          <p
            className="hero-subtitle font-semibold text-white/80 mt-6 lg:mt-8 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          >
            {lang === 'ko'
              ? '더 깊은 지능으로 가장 높은 존중을 만듭니다.'
              : 'Creating the highest respect with the deepest intelligence.'}
          </p>
        </div>
      </div>

      {/* 하단 인디케이터 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              i === current ? 'w-8 bg-white' : 'w-4 bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
