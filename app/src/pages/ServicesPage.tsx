import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HowItWorks } from '@/sections/HowItWorks';
import { Infrastructure } from '@/sections/Infrastructure';
import { useLanguage } from '@/hooks/useLanguage';

export function ServicesPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main id="main-content">

        {/* 페이지 헤더 */}
        <section
          className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0F1D35 60%, #141E33 100%)' }}
        >
          {/* 도트 그리드 */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle, #448CFF 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-semibold text-[#448CFF] mb-5 tracking-widest uppercase">
                Services
              </span>
              <h1
                className="font-bold text-white leading-tight tracking-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
              >
                {lang === 'ko' ? (
                  <>현장을 바꾸는<br />네 가지 AI</>
                ) : (
                  <>Four AI Solutions<br />Transforming the Field</>
                )}
              </h1>
              <p
                className="text-white/50 max-w-xl mx-auto leading-relaxed font-medium"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', wordBreak: 'keep-all' as const }}
              >
                {lang === 'ko'
                  ? '음성 인식부터 문서 검색, 데이터 분석, 업무 자동화까지.\n각 AI가 현장의 문제를 해결합니다.'
                  : 'From voice recognition to document search, data analysis, and workflow automation.\nEach AI solves real field problems.'}
              </p>

              {/* 스크롤 힌트 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-12 flex items-center gap-2 justify-center"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5"
                >
                  <div className="w-1 h-2 rounded-full bg-white/30" />
                </motion.div>
                <span className="text-xs text-white/30 font-medium">
                  {lang === 'ko' ? '스크롤하여 더 보기' : 'Scroll to explore'}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <HowItWorks />
        <Infrastructure />
      </main>
    </>
  );
}
