import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '@/hooks/useLanguage';
import mainHeroBgSrc from '@/assets/main-hero-bg.jpg';

/* ── Hero ─────────────────────────────────────────────────────────── */

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

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
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${mainHeroBgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: '70% center',
        }}
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* 텍스트 — 왼쪽 */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="max-w-[700px]">
          <h1
            className="hero-title font-semibold text-white leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            <span className="font-bold bg-gradient-to-r from-[#6AA8FF] to-[#A8CEFF] bg-clip-text text-transparent">INNO</span>vation for <span className="font-bold bg-gradient-to-r from-[#6AA8FF] to-[#A8CEFF] bg-clip-text text-transparent">H</span>uman <span className="font-bold bg-gradient-to-r from-[#6AA8FF] to-[#A8CEFF] bg-clip-text text-transparent">I</span>ntegrity
          </h1>
          <p
            className="hero-subtitle font-semibold text-white/80 mt-6 lg:mt-8 leading-relaxed"
            style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)' }}
          >
            {lang === 'ko'
              ? '더 깊은 지능으로 가장 높은 존중을 만듭니다.'
              : 'Creating the highest respect with the deepest intelligence.'}
          </p>
        </div>
      </div>
    </section>
  );
}
