import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// 파트너 기관 목록 — 로고 이미지로 교체 시 PartnerLogo 내 <span>을 <img>로 교체
// <img src="/logos/seoul.png" alt="서울특별시" className="h-7 object-contain" />
const partners = [
  { nameKo: '서울특별시', nameEn: 'Seoul City' },
  { nameKo: '국민건강보험공단', nameEn: 'NHIS' },
  { nameKo: '사회보장정보원', nameEn: 'SSIS' },
  { nameKo: '한국사회복지관협회', nameEn: 'KASW' },
  { nameKo: '경기도의료원', nameEn: 'Gyeonggi Medical' },
  { nameKo: '보건복지부', nameEn: 'MOHW' },
  { nameKo: '서울복지재단', nameEn: 'Seoul Welfare' },
  { nameKo: '경기사회서비스원', nameEn: 'Gyeonggi SSA' },
  { nameKo: '인천광역시', nameEn: 'Incheon City' },
  { nameKo: '부산광역시', nameEn: 'Busan City' },
  { nameKo: '국립중앙의료원', nameEn: 'NMC' },
  { nameKo: '건강보험심사평가원', nameEn: 'HIRA' },
  { nameKo: '한국장애인복지관협회', nameEn: 'KAWRD' },
  { nameKo: '정신건강복지센터', nameEn: 'Mental Health Center' },
  { nameKo: '지역아동센터협의회', nameEn: 'CCAP' },
  { nameKo: '한국사회복지사협회', nameEn: 'KASW Assoc.' },
  { nameKo: '사회복지공동모금회', nameEn: 'Community Chest' },
  { nameKo: '대구광역시', nameEn: 'Daegu City' },
  { nameKo: '광주광역시', nameEn: 'Gwangju City' },
  { nameKo: '노인장기요양보험', nameEn: 'Long-term Care Ins.' },
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

function PartnerChip({ nameKo, nameEn, lang }: { nameKo: string; nameEn: string; lang: 'ko' | 'en' }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center px-5 py-3 rounded-xl bg-white border border-[#EAEDF2] mx-2" style={{ minWidth: 140 }}>
      {/* 로고 이미지 넣을 자리 — 아래 span을 <img> 태그로 교체하세요 */}
      <span className="text-sm font-bold text-[#B0BAC8] whitespace-nowrap select-none">
        {lang === 'ko' ? nameKo : nameEn}
      </span>
    </div>
  );
}

export function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { lang } = useLanguage();

  // 무한루프를 위해 두 번 복사
  const doubled = [...partners, ...partners];

  return (
    <section ref={ref} className="bg-[#F8F9FD] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p
            className="font-black text-[#1A1D2E] mb-2"
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

        {/* 무한 스크롤 마키 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-3"
        >
          {/* 좌측 페이드 */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #F8F9FD, transparent)' }} />
          {/* 우측 페이드 */}
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #F8F9FD, transparent)' }} />
          {/* 마키 */}
          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              {doubled.map((p, i) => (
                <PartnerChip key={i} nameKo={p.nameKo} nameEn={p.nameEn} lang={lang} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* 두 번째 역방향 마키 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="relative mb-10"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #F8F9FD, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #F8F9FD, transparent)' }} />
          <div className="overflow-hidden">
            <div className="flex animate-marquee-reverse">
              {doubled.map((p, i) => (
                <PartnerChip key={i} nameKo={p.nameKo} nameEn={p.nameEn} lang={lang} />
              ))}
            </div>
          </div>
        </motion.div>

        <p className="text-center text-xs text-[#D3D8DF] mb-14">
          {lang === 'ko' ? '* 로고 이미지는 추후 업데이트 예정입니다' : '* Partner logos will be updated soon'}
        </p>

        {/* 구분선 */}
        <div className="h-px bg-[#EAEDF2] mb-14" />

        {/* 인용문 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
              className="bg-white rounded-2xl p-8 border border-[#EAEDF2] shadow-sm"
            >
              <div className="text-4xl font-black text-[#448CFF] leading-none mb-5 select-none">"</div>
              <p className="text-[15px] text-[#4B4E56] leading-relaxed mb-7 font-medium">
                {lang === 'ko' ? t.quoteKo : t.quoteEn}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EEF4FF] flex items-center justify-center text-sm font-bold text-[#448CFF]">
                  {(lang === 'ko' ? t.authorKo : t.authorEn).charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#383838]">
                    {lang === 'ko' ? t.authorKo : t.authorEn}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    {lang === 'ko' ? t.orgKo : t.orgEn}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
