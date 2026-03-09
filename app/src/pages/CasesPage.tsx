import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Search, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { references } from '@/sections/UseCases';

import kepcoMcsLogo from '@/assets/partners/kepco-mcs.png';
import donggukLogo from '@/assets/partners/dongguk.png';
import bodymapLogo from '@/assets/partners/bodymap.png';
import seoulAiLogo from '@/assets/partners/seoul-ai.jpg';
import yangcheonLogo from '@/assets/partners/yangcheon.jpg';

// ── Case Study 메타 데이터 ────────────────────────────────────────────

export const caseStudyMeta = [
  {
    id: 'kepco-mcs',
    ref: 0,
    tagKo: '돌봄 · 음성 AI', tagEn: 'Care · Voice AI',
    category: 'care',
    brandColor: '#1a8f9b',
    heroTitleKo: 'AI 기반 돌봄 상담 기록 자동화',
    heroTitleEn: 'AI-Powered Care Consultation Recording Automation',
    heroDescKo: '현장 상담 내용을 음성으로 인식하고 자동으로 기록 · 요약 · 보고서를 생성하는 돌봄 행정 자동화 AI',
    heroDescEn: 'Care administration AI that recognizes consultation speech and automatically generates records, summaries, and reports',
    metrics: [
      { valueKo: '70%', valueEn: '70%', labelKo: '기록 시간 단축', labelEn: 'Record Time Reduced' },
      { valueKo: '3배', valueEn: '3x', labelKo: '상담 집중 시간', labelEn: 'Consultation Focus' },
    ],
    challengeKo: [
      '현장 상담 후 수기 기록, 보고서 작성 등 반복 행정 업무 과중',
      '상담 이후 일정 정리, 복지 서비스 검토까지 다단계 수작업',
      '행정 업무로 인해 대상자와의 상담 시간 부족',
    ],
    challengeEn: [
      'Excessive repetitive administrative work including manual recording and report writing after consultations',
      'Multi-step manual process from schedule organization to welfare service review',
      'Insufficient consultation time with clients due to administrative burden',
    ],
    solutionKo: [
      '노인 특화 음성 인식 기반 상담 내용 자동 기록',
      '행정 보고 형식에 맞춘 기록 요약 및 문서 자동 생성',
      '상담 내용 기반 복지 서비스 자동 추천',
      '현장 업무 흐름에 맞춘 모바일 중심 UX',
    ],
    solutionEn: [
      'Elderly-specialized voice recognition for automatic consultation recording',
      'Auto-summarization and document generation in administrative report format',
      'Automatic welfare service recommendations based on consultation content',
      'Mobile-first UX designed for field workflows',
    ],
    resultsKo: [
      '상담 이후 반복 행정 시간 대폭 단축',
      '돌봄 기록의 일관성과 정확도 향상',
      '현장 종사자의 업무 부담 경감',
      '상담 품질 향상 및 서비스 연계 효율 증대',
    ],
    resultsEn: [
      'Significantly reduced repetitive administrative time after consultations',
      'Improved consistency and accuracy of care records',
      'Reduced workload burden for field workers',
      'Enhanced consultation quality and service linkage efficiency',
    ],
    quoteKo: '"AI 도입 이후 상담 기록 시간이 크게 줄었고,\n현장 상담에 더 집중할 수 있게 되었습니다."',
    quoteEn: '"Since adopting AI, documentation time has significantly decreased,\nand we can now focus more on field consultations."',
    quoteAuthorKo: '한전MCS 관계자',
    quoteAuthorEn: 'KEPCO MCS Representative',
  },
  {
    id: 'yangcheon-welfare',
    ref: 1,
    tagKo: '복지 · RAG', tagEn: 'Welfare · RAG',
    category: 'public',
    brandColor: '#f36f21',
    heroTitleKo: 'RAG 기반 복지 행정 AI 상담 시스템',
    heroTitleEn: 'RAG-Based Welfare Administration AI Consultation System',
    heroDescKo: '내부 지침과 정책 문서를 기반으로 근거와 출처를 함께 제시하는 복지 행정 AI 상담 시스템',
    heroDescEn: 'Welfare AI consultation system providing evidence-based answers with sources from internal guidelines',
    metrics: [
      { valueKo: '80%', valueEn: '80%', labelKo: '문서 탐색 시간 절감', labelEn: 'Search Time Reduced' },
      { valueKo: '95%+', valueEn: '95%+', labelKo: '응답 정확도', labelEn: 'Response Accuracy' },
    ],
    challengeKo: [
      '담당자가 복수의 문서를 직접 찾아보며 제도 해석 수행',
      '담당자별 응답 편차로 민원 대응 품질 불균일',
      '반복 복지 질의에 대한 비효율적 대응',
    ],
    challengeEn: [
      'Staff manually searching through multiple documents for policy interpretation',
      'Inconsistent response quality due to individual staff variation',
      'Inefficient handling of repetitive welfare queries',
    ],
    solutionKo: [
      '복지 행정 질의에 대한 실시간 AI 응답',
      '내부 문서 및 지침 기반 RAG 검색',
      '답변과 함께 근거 · 출처 자동 제공',
      '상담 데이터 축적을 통한 행정 지식 자산화',
    ],
    solutionEn: [
      'Real-time AI responses to welfare administration queries',
      'RAG-based search across internal documents and guidelines',
      'Automatic evidence and source provision with answers',
      'Administrative knowledge management through accumulated data',
    ],
    resultsKo: ['담당자별 응답 편차 감소', '문서 탐색 시간 대폭 절감', '근거 중심 응대로 행정 신뢰성 향상', '반복 질의 대응 효율화'],
    resultsEn: ['Reduced response variation between staff', 'Significantly reduced document search time', 'Improved reliability through evidence-based responses', 'Streamlined handling of repetitive queries'],
    quoteKo: '"AI가 근거와 출처를 함께 제시해 주어\n업무 처리 속도와 정확성이 크게 개선되었습니다."',
    quoteEn: '"With AI presenting evidence and sources together,\nour processing speed and accuracy have greatly improved."',
    quoteAuthorKo: '양천구청 복지정책과 담당자',
    quoteAuthorEn: 'Yangcheon District Welfare Policy Staff',
  },
  {
    id: 'yangcheon-civil',
    ref: 2,
    tagKo: '민원 · 음성 AI', tagEn: 'Civil · Voice AI',
    category: 'stt',
    brandColor: '#a93746',
    heroTitleKo: 'AI 대화형 민원 접수 자동화',
    heroTitleEn: 'AI Conversational Civil Petition Automation',
    heroDescKo: '민원인의 발화를 음성으로 인식하고 서식 작성부터 제출까지 연결하는 대화형 민원 접수 AI',
    heroDescEn: 'Conversational AI that recognizes petitioner speech and connects form filling through to submission',
    metrics: [
      { valueKo: '60%', valueEn: '60%', labelKo: '민원 처리 시간 단축', labelEn: 'Processing Time Reduced' },
      { valueKo: '90%', valueEn: '90%', labelKo: '서식 오류 감소', labelEn: 'Form Error Reduction' },
    ],
    challengeKo: ['민원 처리 과정의 반복 입력, 서식 작성 등 수작업 과다', '서식 오류 및 누락으로 재처리 발생', '시민의 행정 서비스 접근성 제한'],
    challengeEn: ['Excessive manual work including repetitive input and form filling', 'Reprocessing due to form errors and omissions', 'Limited citizen accessibility to administrative services'],
    solutionKo: ['민원 발화 자동 인식 및 내용 요약', '서식 자동 작성 및 입력 보조', '전자서명 및 제출 흐름 지원', '비정형 발화를 행정 문서로 구조화'],
    solutionEn: ['Automatic recognition and summarization of petition speech', 'Auto form generation and input assistance', 'Electronic signature and submission flow support', 'Structuring unstructured speech into administrative documents'],
    resultsKo: ['민원 처리 시간 대폭 단축', '서식 오류 및 누락 감소', '공무원의 반복 업무 부담 경감', '시민 접근성과 행정 편의성 향상'],
    resultsEn: ['Significantly reduced petition processing time', 'Fewer form errors and omissions', 'Reduced repetitive workload for public servants', 'Improved citizen accessibility and convenience'],
    quoteKo: '"민원인이 말씀하시면 AI가 자동으로 정리해 주니\n접수 시간이 크게 줄고 정확도도 높아졌습니다."',
    quoteEn: '"When petitioners speak, AI automatically organizes everything,\ngreatly reducing filing time and improving accuracy."',
    quoteAuthorKo: '양천구청 민원봉사과 담당자',
    quoteAuthorEn: 'Yangcheon District Civil Service Staff',
  },
];

export type CaseStudyMeta = typeof caseStudyMeta[number];

// ── Trusted Clients ────────────────────────────────────────────────

const clientLogos = [
  { src: kepcoMcsLogo, alt: '한전MCS', altEn: 'KEPCO MCS', h: 'h-8 sm:h-10' },
{ src: seoulAiLogo, alt: '서울AI재단', altEn: 'Seoul AI', h: 'h-8 sm:h-10' },
  { src: yangcheonLogo, alt: '양천구청', altEn: 'Yangcheon', h: 'h-12 sm:h-16' },
  { src: donggukLogo, alt: '동국대학교', altEn: 'Dongguk Univ.', h: 'h-8 sm:h-10' },
  { src: bodymapLogo, alt: '바디맵', altEn: 'Bodymap', h: 'h-8 sm:h-10' },
];

// ── Filter Categories ──────────────────────────────────────────────

const categories = [
  { key: 'all', labelKo: '전체', labelEn: 'All' },
  { key: 'public', labelKo: '공공 행정', labelEn: 'Public Sector' },
  { key: 'care', labelKo: '돌봄 서비스', labelEn: 'Care Services' },
  { key: 'automation', labelKo: 'AI 자동화', labelEn: 'AI Automation' },
  { key: 'stt', labelKo: 'STT 솔루션', labelEn: 'STT Solutions' },
];

// ── Case Study Card ────────────────────────────────────────────────

function CaseCard({ cs, index, lang }: { cs: CaseStudyMeta; index: number; lang: 'ko' | 'en' }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-40px' });
  const ref_ = references[cs.ref];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group cursor-pointer transition-all duration-300"
      onClick={() => navigate(`/cases/${cs.id}`)}
    >
      {/* 사진 */}
      <div className="relative rounded-2xl overflow-hidden aspect-square hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
        <img
          src={ref_.cardImage || ref_.image}
          alt={lang === 'ko' ? cs.heroTitleKo : cs.heroTitleEn}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* 하단 그라데이션 + 제목 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <h3 className="absolute bottom-4 left-4 right-4 text-[14px] sm:text-[15px] font-bold text-white leading-snug z-10 drop-shadow-md" style={{ wordBreak: 'keep-all' }}>
          {lang === 'ko' ? cs.heroTitleKo : cs.heroTitleEn}
        </h3>

        {/* 호버 시 오버레이 */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-start p-6 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <h4 className="text-[16px] font-bold text-white leading-snug mb-2" style={{ wordBreak: 'keep-all' }}>
            {lang === 'ko' ? cs.heroTitleKo : cs.heroTitleEn}
          </h4>
          <p className="text-[12px] text-white/70 leading-relaxed mb-4 line-clamp-2" style={{ wordBreak: 'keep-all' }}>
            {lang === 'ko' ? cs.heroDescKo : cs.heroDescEn}
          </p>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#448CFF]">
            {lang === 'ko' ? '자세히 보기' : 'Read Case Study'}
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

    </motion.div>
  );
}

// ── 메인 Cases 페이지 ──────────────────────────────────────────────

export function CasesPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-40px' });
  const clientRef = useRef(null);
  const clientInView = useInView(clientRef, { once: true, margin: '-40px' });
  const explorerRef = useRef(null);
  const explorerInView = useInView(explorerRef, { once: true, margin: '-40px' });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-40px' });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const scrollCarousel = useCallback((dir: number) => {
    setCarouselIdx((prev) => (prev + dir + caseStudyMeta.length) % caseStudyMeta.length);
  }, []);

  const filtered = caseStudyMeta.filter((cs) => {
    const matchCategory = activeCategory === 'all' || cs.category === activeCategory;
    if (!query.trim()) return matchCategory;
    const q = query.toLowerCase();
    const ref_ = references[cs.ref];
    const matchQuery = [
      cs.heroTitleKo, cs.heroTitleEn, cs.heroDescKo, cs.heroDescEn,
      cs.tagKo, cs.tagEn, ref_.clientKo, ref_.clientEn,
    ].some((s) => s.toLowerCase().includes(q));
    return matchCategory && matchQuery;
  });

  return (
    <main id="main-content">

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-4 sm:pt-40 sm:pb-6 lg:pt-44 lg:pb-8 bg-[#FAFBFC] overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #448CFF 0%, transparent 70%)', transform: 'translate(30%, -40%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.02] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7C5CFC 0%, transparent 70%)', transform: 'translate(-30%, 40%)' }} />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-8 lg:mb-10"
          >
            <h1
              className="font-bold text-[#0F172A] tracking-tight mb-4 whitespace-nowrap"
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)', lineHeight: 1.25, wordBreak: 'keep-all' }}
            >
              {lang === 'ko'
                ? 'AI 기술이 만든 실제 변화를 현장에서 확인하세요'
                : 'See Real Impact of AI Deployed in the Field'}
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#64748B] leading-relaxed mx-auto whitespace-nowrap" style={{ wordBreak: 'keep-all' }}>
              {lang === 'ko'
                ? '이노하이의 AI 인프라가 현장의 문제를 어떻게 해결할 수 있는지 직접 확인해 보세요.'
                : 'Discover how INNOHI\'s AI infrastructure solves real-world challenges firsthand.'}
            </p>
          </motion.div>
        </div>

        {/* ─── Featured Carousel ─── */}
        <div className="relative mx-auto pb-10 sm:pb-14 lg:pb-16">
          <div ref={carouselRef} className="relative max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-14 overflow-hidden">
            <div className="overflow-visible">
              <motion.div
                className="flex gap-5"
                animate={{ x: `calc(-${carouselIdx * 100}% - ${carouselIdx * 20}px)` }}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              >
                {caseStudyMeta.map((cs) => {
                  const ref_ = references[cs.ref];
                  return (
                    <div
                      key={cs.id}
                      className="w-full flex-shrink-0 cursor-pointer"
                      onClick={() => navigate(`/cases/${cs.id}`)}
                    >
                      <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        <img
                          src={ref_.image}
                          alt={lang === 'ko' ? cs.heroTitleKo : cs.heroTitleEn}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* 자세히 보기 버튼 — 왼쪽 중앙 */}
                        <div className="absolute left-14 sm:left-20 top-[34%] -translate-y-1/2 z-10">
                          <button
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-[13px] sm:text-[14px] font-medium hover:bg-white/25 transition-colors"
                          >
                            {lang === 'ko' ? '자세히 보기' : 'View Details'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* 페이지네이션 */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm z-20">
              {caseStudyMeta.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCarouselIdx(i); }}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === carouselIdx ? '#fff' : 'rgba(255,255,255,0.4)',
                    transform: i === carouselIdx ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>

            {/* 좌우 화살표 */}
            <button
              onClick={(e) => { e.stopPropagation(); scrollCarousel(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center transition-colors hover:bg-white/35 z-30"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); scrollCarousel(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center transition-colors hover:bg-white/35 z-30"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Trusted Clients ─── */}
      <section ref={clientRef} className="bg-white border-y border-[#F0F1F3] py-10 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={clientInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[12px] font-semibold text-[#9CA3AF] tracking-widest uppercase text-center mb-6">
              {lang === 'ko' ? 'Trusted By' : 'Trusted By'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
              {clientLogos.map((logo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={clientInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <img
                    src={logo.src}
                    alt={lang === 'ko' ? logo.alt : logo.altEn}
                    className={`${logo.h} w-auto max-w-[100px] sm:max-w-[120px] object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Case Study Explorer ─── */}
      <section ref={explorerRef} className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={explorerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0F172A] tracking-tight">
                {lang === 'ko' ? '도입 사례 탐색' : 'Explore Case Studies'}
              </h2>

              {/* 검색 */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={lang === 'ko' ? '사례 검색...' : 'Search...'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E8EB] bg-[#F9FAFB] text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#448CFF] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200"
                  style={
                    activeCategory === cat.key
                      ? { background: '#0F172A', color: '#FFFFFF' }
                      : { background: '#F3F4F6', color: '#6B7280' }
                  }
                >
                  {lang === 'ko' ? cat.labelKo : cat.labelEn}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Case Study Grid ─── */}
      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {filtered.map((cs, i) => (
                <CaseCard key={cs.id} cs={cs} index={i} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#9CA3AF] text-[15px]">
                {lang === 'ko' ? '검색 결과가 없습니다.' : 'No results found.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
      >
        {/* 장식 */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #448CFF 0%, transparent 70%)', transform: 'translate(30%, -40%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7C5CFC 0%, transparent 70%)', transform: 'translate(-30%, 40%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h2
                  className="font-bold text-white mb-3"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', lineHeight: 1.3, wordBreak: 'keep-all' }}
                >
                  {lang === 'ko'
                    ? 'AI 도입, 지금 시작하세요'
                    : 'Start Your AI Journey Today'}
                </h2>
                <p className="text-[14px] sm:text-[15px] text-white/60 leading-relaxed whitespace-nowrap" style={{ wordBreak: 'keep-all' }}>
                  {lang === 'ko'
                    ? '이노하이의 AI 인프라가 현장의 문제를 어떻게 해결할 수 있는지 직접 확인해 보세요.'
                    : 'Discover how INNOHI\'s AI infrastructure can solve your organization\'s challenges.'}
                </p>
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-semibold text-[#0F172A] bg-white hover:bg-gray-100 transition-colors"
              >
                {lang === 'ko' ? '도입 문의하기' : 'Contact Us'}
                <ArrowUpRight className="w-4 h-4" />
              </button>
        </motion.div>
      </section>

    </main>
  );
}
