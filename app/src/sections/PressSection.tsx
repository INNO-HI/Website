import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

/* ── 언론보도 데이터 ─────────────────────────────────────────────── */

const pressItems = [
  {
    titleKo: '이노하이, AI 기반 사회복지 기록 자동화 솔루션 출시',
    titleEn: 'INNO-HI launches AI-powered social welfare documentation solution',
    sourceKo: '전자신문',
    sourceEn: 'ET News',
    date: '2025.02.15',
    category: 'Product',
    url: '#',
  },
  {
    titleKo: '한전MCS·이노하이, AI 업무자동화 협력 MOU 체결',
    titleEn: 'KEPCO MCS and INNO-HI sign MOU for AI workflow automation',
    sourceKo: '아이뉴스24',
    sourceEn: 'iNews24',
    date: '2025.01.20',
    category: 'Partnership',
    url: '#',
  },
  {
    titleKo: '서울 AI 재단, 이노하이와 공공 AI 인프라 구축 착수',
    titleEn: 'Seoul AI Foundation begins public AI infrastructure project with INNO-HI',
    sourceKo: '디지털타임스',
    sourceEn: 'Digital Times',
    date: '2024.12.08',
    category: 'Public',
    url: '#',
  },
  {
    titleKo: '이노하이, 양천구청 AI 행정혁신 시범사업 선정',
    titleEn: 'INNO-HI selected for Yangcheon District AI administrative innovation pilot',
    sourceKo: '뉴시스',
    sourceEn: 'Newsis',
    date: '2024.11.25',
    category: 'Public',
    url: '#',
  },
  {
    titleKo: '동국대학교·이노하이, AI 사회복지 연구 협약',
    titleEn: 'Dongguk University and INNO-HI sign AI social welfare research agreement',
    sourceKo: '한국대학신문',
    sourceEn: 'Korea University News',
    date: '2024.10.12',
    category: 'Research',
    url: '#',
  },
  {
    titleKo: '이노하이, 사회보장정보원과 데이터 연동 체계 구축',
    titleEn: 'INNO-HI builds data integration system with SSIS',
    sourceKo: '데일리안',
    sourceEn: 'Dailian',
    date: '2024.09.18',
    category: 'Partnership',
    url: '#',
  },
  {
    titleKo: '바디맵·이노하이, AI 헬스케어 데이터 분석 협업',
    titleEn: 'Bodymap and INNO-HI collaborate on AI healthcare data analysis',
    sourceKo: '메디게이트뉴스',
    sourceEn: 'Medigate News',
    date: '2024.08.30',
    category: 'Healthcare',
    url: '#',
  },
  {
    titleKo: '이노하이, 2024 대한민국 AI 대상 수상',
    titleEn: 'INNO-HI wins 2024 Korea AI Award',
    sourceKo: '매일경제',
    sourceEn: 'Maeil Business',
    date: '2024.07.22',
    category: 'Award',
    url: '#',
  },
];

const categoryBadgeColors: Record<string, string> = {
  Product: 'bg-[#448CFF] text-white',
  Partnership: 'bg-[#22C55E] text-white',
  Public: 'bg-[#F97316] text-white',
  Research: 'bg-[#A855F7] text-white',
  Healthcare: 'bg-[#EC4899] text-white',
  Award: 'bg-[#EAB308] text-white',
};

export function PressSection() {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32 snap-start">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-14">

        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-sm font-semibold text-[#448CFF] tracking-wide uppercase mb-2">Press</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
              {lang === 'ko' ? '이노하이의 이야기를 만나보세요' : 'Discover Our Stories'}
            </h2>
          </div>

          {/* 화살표 */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#E5E8EB] flex items-center justify-center text-[#9CA3AF] hover:border-[#448CFF] hover:text-[#448CFF] transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#E5E8EB] flex items-center justify-center text-[#9CA3AF] hover:border-[#448CFF] hover:text-[#448CFF] transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </motion.div>

        {/* 가로 스크롤 카드 — 4개씩 */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {pressItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.url}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex-shrink-0 w-[calc(25%-15px)] min-w-[260px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:z-20 border border-[#EAEDF2]"
            >
              {/* 썸네일 — 흰색 비어있는 영역 (나중에 이미지 추가) */}
              <div className="h-[200px] w-full bg-[#F4F6F8] relative">
                {/* 카테고리 뱃지 */}
                <span className={`absolute top-4 left-4 px-2.5 py-1 rounded text-[11px] font-bold ${categoryBadgeColors[item.category]}`}>
                  {item.category}
                </span>
              </div>

              {/* 제목 + 메타 */}
              <div className="p-5 bg-white">
                <h3 className="text-[15px] font-semibold text-[#1A1A1A] leading-snug line-clamp-2 group-hover:text-[#448CFF] transition-colors mb-4">
                  {lang === 'ko' ? item.titleKo : item.titleEn}
                </h3>
                <div className="flex items-center justify-between text-[12px] text-[#9CA3AF] pt-3 border-t border-[#F2F4F6]">
                  <span className="font-medium">{lang === 'ko' ? item.sourceKo : item.sourceEn}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
