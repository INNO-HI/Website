import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

import kepcoMcsLogo from '@/assets/partners/kepco-mcs.png';
import donggukLogo from '@/assets/partners/dongguk.png';
import bodymapLogo from '@/assets/partners/bodymap.png';
import seoulAiLogo from '@/assets/partners/seoul-ai.jpg';
import yangcheonLogo from '@/assets/partners/yangcheon.jpg';
import ssisLogo from '@/assets/partners/ssis.svg';

const partnerLogos = [
  { src: kepcoMcsLogo, alt: '한전MCS', altEn: 'KEPCO MCS', height: 'h-8' },
  { src: ssisLogo, alt: '한국사회보장정보원', altEn: 'SSIS', height: 'h-8' },
  { src: seoulAiLogo, alt: '서울AI재단', altEn: 'Seoul AI Foundation', height: 'h-8' },
  { src: yangcheonLogo, alt: '양천구청', altEn: 'Yangcheon District', height: 'h-12' },
  { src: donggukLogo, alt: '동국대학교', altEn: 'Dongguk University', height: 'h-8' },
  { src: bodymapLogo, alt: '바디맵', altEn: 'Bodymap', height: 'h-8' },
];

const testimonials = [
  {
    quoteKo: "INNO-HI 도입 후 상담 기록 시간이 70% 줄었습니다. 종사자들이 이용자와 더 많은 시간을 보낼 수 있게 됐어요.",
    quoteEn: "After adopting INNO-HI, documentation time dropped by 70%. Our staff can now spend much more time with the people they serve.",
    authorKo: "김○○ 팀장",
    authorEn: "Director Kim",
    orgKo: "서울시 종합사회복지관",
    orgEn: "Seoul Community Welfare Center",
  },
  {
    quoteKo: "24시간 내 도입이 가능하고, 기존 시스템과 완벽하게 연동됩니다. 기술 장벽이 없어서 현장에서도 쉽게 적응했어요.",
    quoteEn: "Deployed within 24 hours with seamless integration into our existing system. Field staff adapted with ease.",
    authorKo: "이○○ 원장",
    authorEn: "Director Lee",
    orgKo: "경기도 노인요양병원",
    orgEn: "Gyeonggi Senior Care Hospital",
  },
];

function PartnerChip({ logo, lang }: { logo: typeof partnerLogos[number]; lang: 'ko' | 'en' }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center px-6 py-3 rounded-xl bg-white border border-[#EAEDF2] mx-2" style={{ minWidth: 160, height: 56 }}>
      <img
        src={logo.src}
        alt={lang === 'ko' ? logo.alt : logo.altEn}
        className={`${logo.height} w-auto max-w-[120px] object-contain`}
      />
    </div>
  );
}

export function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { lang } = useLanguage();

  // 무한루프를 위해 복사 (6개 → 12개 → 24개로 넉넉하게)
  const quadrupled = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section ref={ref} className="bg-[#F8F9FD] py-24 lg:py-36 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p
            className="font-semibold text-[#1A1D2E] mb-2"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}
          >
            {lang === 'ko' ? '함께하는 기관' : 'Trusted Partners'}
          </p>
          <p className="text-sm font-medium text-[#9CA3AF]">
            {lang === 'ko'
              ? '공공·의료·복지 현장에서 이노하이를 선택했습니다'
              : 'Public, healthcare, and welfare organizations trust INNO-HI'}
          </p>
        </motion.div>

        {/* 무한 스크롤 마키 — 1열 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-14"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #F8F9FD, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #F8F9FD, transparent)' }} />
          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              {quadrupled.map((logo, i) => (
                <PartnerChip key={i} logo={logo} lang={lang} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* 구분선 */}
        <div className="h-px bg-[#EAEDF2] mb-14" />

        {/* 인용문 마키 슬라이드 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #F8F9FD, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #F8F9FD, transparent)' }} />
          <div className="overflow-hidden">
            <div className="flex animate-marquee-reverse" style={{ animationDuration: '45s' }}>
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bg-white rounded-2xl p-7 border border-[#EAEDF2] shadow-sm mx-2.5"
                  style={{ width: 360 }}
                >
                  <div className="text-3xl font-semibold text-[#448CFF] leading-none mb-4 select-none">"</div>
                  <p className="text-[14px] text-[#4B4E56] leading-relaxed mb-6 font-medium line-clamp-4">
                    {lang === 'ko' ? t.quoteKo : t.quoteEn}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#EEF4FF] flex items-center justify-center text-sm font-semibold text-[#448CFF]">
                      {(lang === 'ko' ? t.authorKo : t.authorEn).charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#383838]">
                        {lang === 'ko' ? t.authorKo : t.authorEn}
                      </p>
                      <p className="text-xs text-[#9CA3AF]">
                        {lang === 'ko' ? t.orgKo : t.orgEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
