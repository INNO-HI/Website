import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { lang } = useLanguage();
  const navigate = useNavigate();

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-40 bg-[#F0F2F8] overflow-hidden snap-start border-t border-[#E5E8EB]"
    >
      {/* 배경 글로우 */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#448CFF]/8 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-[#7C5CFC]/6 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[#191F28] leading-[1.5] tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
          >
            {lang === 'ko' ? (
              <>
                더 깊은 지능으로 가장 높은 존중,<br />
                <span className="font-bold bg-gradient-to-r from-[#448CFF] to-[#7C5CFC] bg-clip-text text-transparent">이노하이와 함께 하세요.</span>
              </>
            ) : (
              <>
                The deepest intelligence, the highest respect —<br />
                <span className="font-bold bg-gradient-to-r from-[#448CFF] to-[#7C5CFC] bg-clip-text text-transparent">with INNO-HI.</span>
              </>
            )}
          </p>

          <motion.button
            onClick={() => navigate('/contact')}
            className="mt-8 sm:mt-10 inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white text-[15px] sm:text-[16px] font-semibold transition-all cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #448CFF 0%, #7C5CFC 100%)' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
