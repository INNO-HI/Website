import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title-line',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.6,
        }
      );

      gsap.fromTo(
        '.hero-cta',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.8,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950"
      aria-label="메인 히어로"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#ECF1FD] rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#ECF1FD] rounded-full blur-3xl opacity-60" />
        
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #D3D8DF 1px, transparent 1px),
              linear-gradient(to bottom, #D3D8DF 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8F9FD] border border-[#D3D8DF] mb-10"
          >
            <Sparkles className="w-4 h-4 text-[#448CFF]" aria-hidden="true" />
            <span className="text-sm font-medium text-[#4B4E56]">
              사람 중심 환경을 위한 AX 인프라
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-kr-display mb-8" style={{ lineHeight: 1.3 }}>
            <span className="hero-title-line block overflow-hidden">
              <span className="inline-block">현실의 업무를</span>
            </span>
            <span className="hero-title-line block overflow-hidden">
              <span className="inline-block">
                <span className="gradient-text">지능화</span>하는 인프라
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-kr-subtitle text-[#777A86] max-w-xl mx-auto mb-12 leading-relaxed">
            이노하이는 오프라인 업무를 AI로 전환합니다.
            <br className="hidden sm:block" />
            <span className="text-[#777A86]/70">
              기술로 사람의 가치를 증명합니다.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => scrollToSection('#contact')}
                size="lg"
                className="bg-[#383838] hover:bg-[#444B52] text-white rounded-full px-8 py-6 text-base font-bold transition-all min-h-[56px]"
                aria-label="도입 문의하기"
              >
                도입 문의하기
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </motion.div>
            
            {/* Secondary */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => scrollToSection('#solution')}
                variant="ghost"
                size="lg"
                className="rounded-full px-8 py-6 text-base font-medium text-[#777A86] hover:text-[#383838] hover:bg-[#F8F9FD] transition-all min-h-[56px]"
                aria-label="솔루션 둘러보기"
              >
                솔루션 둘러보기
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-20 pt-10 border-t border-[#D3D8DF]/50"
            role="region"
            aria-label="주요 지표"
          >
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { value: '99.9%', label: '가동률' },
                { value: '5,000만+', label: '처리 데이터' },
                { value: '3배', label: '효율 향상' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#383838] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#777A86] mt-1.5 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
    </section>
  );
}
