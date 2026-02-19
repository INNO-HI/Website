import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#F8F9FD] overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#ECF1FD] rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/3 w-[250px] h-[250px] bg-[#ECF1FD] rounded-full blur-3xl -translate-y-1/2" />
        
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `linear-gradient(to right, #D3D8DF 1px, transparent 1px),
            linear-gradient(to bottom, #D3D8DF 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-content text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D3D8DF] mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#448CFF]" aria-hidden="true" />
            <span className="text-sm font-medium text-[#4B4E56]">변화를 시작하세요</span>
          </motion.div>

          <h2 id="cta-heading" className="text-kr-display mb-5" style={{ lineHeight: 1.3 }}>
            지능형 인프라를
            <br />
            <span className="gradient-text">경험핳보세요</span>
          </h2>

          <p className="text-kr-subtitle text-[#777A86] max-w-lg mx-auto mb-10 leading-relaxed">
            AI 기반 자동화로 운영을 변화시키는 조직들에 함께하세요.
            <br className="hidden sm:block" />
            INNO-HI가 귀하의 목표 달성을 어떻게 도울 수 있는지 알아보세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-[#383838] hover:bg-[#444B52] text-white rounded-full px-8 py-6 text-base font-bold transition-all min-h-[56px]"
                aria-label="데모 일정 예약"
              >
                데모 일정 예약
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full px-8 py-6 text-base font-medium text-[#777A86] hover:text-[#383838] hover:bg-white transition-all min-h-[56px]"
                onClick={() => window.open('#', '_blank')}
                aria-label="IR 자료 다운로드"
              >
                IR 자료 다운로드
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 pt-8 border-t border-[#D3D8DF]/50"
          >
            <p className="text-sm text-[#777A86] mb-5">선도적인 기관들이 신뢰합니다</p>
            <div className="flex flex-wrap items-center justify-center gap-6 opacity-40">
              {['공공 부문', '의료', '사회 서비스', '엔터프라이즈'].map((name, index) => (
                <div key={index} className="text-base font-bold text-[#777A86]">{name}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
