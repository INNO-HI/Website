import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/sections/Navigation';
import { HowItWorks } from '@/sections/HowItWorks';
import { Infrastructure } from '@/sections/Infrastructure';
import { Footer } from '@/sections/Footer';
import { useLanguage } from '@/context/LanguageContext';

export function ServicesPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        본문으로 바로가기
      </a>
      <Navigation />
      <main id="main-content">

        {/* 페이지 헤더 — 전체 뷰포트 */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#EEF4FF] via-[#F4F8FF] to-white">
          {/* 배경 블러 오브 */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -left-40 w-[500px] h-[500px] bg-[#C7DEFF] rounded-full blur-[120px] opacity-20" />
            <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-[#D4EEFF] rounded-full blur-[120px] opacity-20" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-bold text-[#448CFF] mb-5 tracking-widest uppercase">
                INNO-HI
              </span>
              <h1
                className="font-black text-[#444B52] leading-tight tracking-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}
              >
                {lang === 'ko' ? (
                  <>AI가 일하는 방식,<br /><span className="gradient-text">서비스 소개</span></>
                ) : (
                  <>How AI Works,<br /><span className="gradient-text">Our Services</span></>
                )}
              </h1>
              <p
                className="text-[#4B4E56] max-w-xl mx-auto leading-relaxed font-medium"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
              >
                {lang === 'ko'
                  ? 'AI가 작동하는 방식, 그리고 이를 뒷받침하는 기술 인프라를 소개합니다.'
                  : 'Discover how our AI works and the infrastructure that powers it.'}
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
                  className="w-5 h-8 rounded-full border-2 border-[#D3D8DF] flex items-start justify-center pt-1.5"
                >
                  <div className="w-1 h-2 rounded-full bg-[#9CA3AF]" />
                </motion.div>
                <span className="text-xs text-[#B0BAC8] font-medium">
                  {lang === 'ko' ? '스크롤하여 더 보기' : 'Scroll to explore'}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <HowItWorks />
        <Infrastructure />
      </main>
      <Footer />
    </div>
  );
}
