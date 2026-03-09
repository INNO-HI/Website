import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

import kepcoLogoSrc from '@/assets/partners/kepco-mcs.png';
import ssisLogoSrc from '@/assets/partners/ssis.svg';
import yangcheonLogoSrc from '@/assets/partners/yangcheon.jpg';
import cardKepcoSrc from '@/assets/partners/card-kepco.png';
import cardWelfareSrc from '@/assets/partners/card-welfare.png';
import cardCivilSrc from '@/assets/partners/card-civil.png';
import slideKepcoSrc from '@/assets/partners/slide-kepco.png';
import slideWelfareSrc from '@/assets/partners/slide-welfare.png';
import slideCivilSrc from '@/assets/partners/slide-civil.png';

export const references = [
  {
    titleKo: '현장 돌봄 자동화 AI',
    titleEn: 'Field Care Automation AI',
    clientKo: '한전MCS',
    clientEn: 'KEPCO MCS',
    logo: kepcoLogoSrc,
    logoHeight: 'h-12 sm:h-14',
    image: slideKepcoSrc,
    cardImage: cardKepcoSrc,
    summaryKo: '현장 상담부터 기록, 요약, 보고까지 자동화한 돌봄 행정 AI',
    summaryEn: 'Care administration AI automating field consultations from recording to reporting',
    detailKo: '현장 상담은 기록보다 사람에게 집중해야 합니다.\n이노하이는 현장에서 발생하는 상담 내용을 음성으로 인식하고, 이를 자동으로 정리하여 기록·보고·복지 서비스 연계까지 이어지는 돌봄 행정 흐름을 하나의 AI 기반 프로세스로 통합했습니다.\n\n기존에는 상담 이후 수기 기록, 일정 정리, 보고서 작성, 복지 서비스 검토까지 여러 단계의 반복 행정이 필요했습니다. 이노하이는 이 과정을 자동화하여 현장 종사자가 행정보다 대상자와의 상담에 더 많은 시간을 쓸 수 있도록 설계되었습니다.\n\n주요 기능\n• 노인 특화 음성인식 기반 상담 내용 자동 기록\n• 행정 보고 형식에 맞춘 기록 요약 및 문서화\n• 상담 내용 기반 복지 서비스 추천\n• 현장 업무 흐름에 맞춘 모바일 중심 사용 환경\n\n기대 효과\n• 상담 이후 반복 행정 시간 단축\n• 돌봄 기록의 일관성과 정확도 향상\n• 현장 종사자의 업무 부담 경감\n• 상담 품질 향상 및 서비스 연계 효율 증대',
    detailEn: 'Field consultations should focus on people, not paperwork.\nAnsimHI recognizes consultation content through voice at the field and automatically organizes it, integrating the entire care administration flow—from documentation to reporting and welfare service linkage—into a single AI-based process.\n\nPreviously, multiple stages of repetitive administration were needed after consultations: manual recording, schedule organization, report writing, and welfare service review. AnsimHI automates this process so field workers can spend more time on consultations with clients rather than administration.\n\nKey Features\n• Elderly-specialized voice recognition for automatic consultation recording\n• Record summarization and documentation in administrative report format\n• Welfare service recommendations based on consultation content\n• Mobile-first UX designed for field workflows\n\nExpected Impact\n• Reduced repetitive administrative time after consultations\n• Improved consistency and accuracy of care records\n• Reduced workload burden for field workers\n• Enhanced consultation quality and service linkage efficiency',
  },
  {
    titleKo: 'AI 기반 고독사 판별 분류',
    titleEn: 'AI Solitary Death Classification',
    clientKo: '한국사회보장정보원',
    clientEn: 'SSIS',
    logo: ssisLogoSrc,
    logoHeight: 'h-12 sm:h-14',
    image: slideWelfareSrc,
    cardImage: cardWelfareSrc,
    summaryKo: '변사 사건 데이터를 분석해 고독사 여부를 판별하고 검수 부담을 줄이는 AI 이진 분류 모델',
    summaryEn: 'AI binary classification model analyzing unnatural death data to determine solitary death and reduce review burden',
    detailKo: '고독사 판정은 통계의 신뢰도와 정책 방향을 결정하는 중요한 과정입니다.\n이노하이는 57,145건의 변사 데이터를 기반으로 사건개요 텍스트, 원시변수 22개, 파생변수 45개를 결합해 고독사 여부를 판별하는 AI 이진 분류 모델을 개발했습니다.\n\n기존에는 담당자가 사건을 직접 읽고 판정해야 했으며, 전수 검수에 가까운 비효율이 반복되었습니다. AI 모델 도입 이후 사건별 확률값을 먼저 제시해 필요한 사건에 검수 역량을 집중할 수 있게 되었습니다.\n\n주요 기능\n• 사건개요 텍스트를 구조화한 파생변수 설계\n• 원시변수 22개와 파생변수 45개를 결합한 판별 구조\n• Recall 중심의 실무형 평가 체계\n• 판별 결과와 함께 근거를 제시하는 설명 가능한 AI 구조\n\n기대 효과\n• 목표 Recall 95% 기준 Test Recall 96.77% 달성\n• 전체 사건의 13.8%만 검수하는 구조 검증\n• 기존 대비 84% 수준 검수 부담 절감\n• 판별 근거 제시를 통한 검토 일관성 확보',
    detailEn: 'Solitary death determination is a critical process shaping statistical reliability and policy direction.\nINNOHI developed an AI binary classification model that combines case summary text, 22 raw variables, and 45 derived variables from 57,145 unnatural death cases to determine solitary death.\n\nPreviously, reviewers had to manually read and judge each case, resulting in near-complete manual review. After AI model adoption, probability scores are presented first for each case, allowing review capacity to focus on necessary cases.\n\nKey Features\n• Derived variable design structuring case summary text\n• Classification structure combining 22 raw and 45 derived variables\n• Recall-focused practical evaluation framework\n• Explainable AI presenting evidence alongside results\n\nExpected Impact\n• Achieved Test Recall 96.77% against 95% target\n• Verified structure requiring review of only 13.8% of cases\n• 84% reduction in review burden\n• Improved review consistency through evidence-based classification',
  },
  {
    titleKo: 'AI 민원 창구 서비스',
    titleEn: 'AI Civil Service Counter',
    clientKo: '양천구청',
    clientEn: 'Yangcheon District Office',
    logo: yangcheonLogoSrc,
    logoHeight: 'h-16 sm:h-20',
    image: slideCivilSrc,
    cardImage: cardCivilSrc,
    summaryKo: '민원 발화를 문서로 전환해 접수까지 연결하는 대화형 행정 AI',
    summaryEn: 'Conversational AI converting civil petition speech into documents through to filing',
    detailKo: '민원은 복잡해야 하는 일이 아니라, 더 쉽게 처리되어야 하는 일입니다.\n이노하이는 음성 및 대화형 인터페이스를 통해 민원 내용을 자동으로 정리하고, 필요한 서식을 작성하며, 제출 단계까지 연결되는 AI 민원 창구 서비스를 구현했습니다.\n\n기존 민원 처리 과정은 내용 정리, 반복 입력, 서식 작성, 검토와 재작성까지 많은 수작업이 필요했습니다. 이 서비스는 민원인의 발화를 중심으로 내용을 구조화하고 행정 문서로 전환하여, 보다 빠르고 정확한 접수를 지원합니다.\n\n주요 기능\n• 민원 발화 자동 인식 및 내용 요약\n• 서식 자동 작성 및 입력 보조\n• 전자서명 및 제출 흐름 지원\n• 비정형 발화를 행정 문서 형태로 구조화\n\n기대 효과\n• 민원 처리 시간 단축\n• 서식 오류 및 누락 감소\n• 공무원의 반복 업무 감소\n• 시민 접근성과 행정 편의성 향상',
    detailEn: 'Civil petitions shouldn\'t be complicated—they should be easier to process.\nAnsimHI implements an AI civil service counter that automatically organizes petition content through voice and conversational interfaces, fills in required forms, and connects to the submission stage.\n\nThe traditional petition process required extensive manual work: content organization, repetitive input, form filling, review and revision. This service structures content around the petitioner\'s speech and converts it into administrative documents for faster, more accurate filing.\n\nKey Features\n• Automatic recognition and summarization of petition speech\n• Auto form generation and input assistance\n• Electronic signature and submission flow support\n• Structuring unstructured speech into administrative document format\n\nExpected Impact\n• Reduced petition processing time\n• Fewer form errors and omissions\n• Reduced repetitive work for public servants\n• Improved citizen accessibility and administrative convenience',
  },
];

type Reference = typeof references[number];

/* ── 디테일 모달 ── */
export function parseDetail(text: string, lang: 'ko' | 'en') {
  const featureLabel = lang === 'ko' ? '주요 기능' : 'Key Features';
  const impactLabel = lang === 'ko' ? '기대 효과' : 'Expected Impact';
  const featureIdx = text.indexOf(featureLabel);
  const impactIdx = text.indexOf(impactLabel);

  const intro = featureIdx > -1 ? text.slice(0, featureIdx).trim() : text.trim();
  const featureBlock = featureIdx > -1 && impactIdx > -1 ? text.slice(featureIdx + featureLabel.length, impactIdx).trim() : '';
  const impactBlock = impactIdx > -1 ? text.slice(impactIdx + impactLabel.length).trim() : '';

  const parseBullets = (block: string) =>
    block.split('\n').map(l => l.replace(/^[•\-]\s*/, '').trim()).filter(Boolean);

  return { intro, features: parseBullets(featureBlock), impacts: parseBullets(impactBlock) };
}

function DetailModal({ ref_, lang, onClose }: { ref_: Reference; lang: 'ko' | 'en'; onClose: () => void }) {
  const detail = lang === 'ko' ? ref_.detailKo : ref_.detailEn;
  const { intro, features, impacts } = parseDetail(detail, lang);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        className="relative bg-white rounded-2xl max-w-[960px] w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#6B7280] hover:bg-[#E5E8EB] transition-colors shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 이미지 영역 */}
        {ref_.image && (
          <div className="w-full h-[240px] sm:h-[340px] bg-[#F8F9FA] rounded-t-2xl overflow-hidden">
            <img
              src={ref_.image}
              alt={lang === 'ko' ? ref_.titleKo : ref_.titleEn}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 콘텐츠 */}
        <div className="p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-4">
            <img src={ref_.logo} alt="" className={`${ref_.logoHeight} w-auto object-contain`} />
          </div>
          <h3
            className="font-bold text-[#383838] mb-2"
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
          >
            {lang === 'ko' ? ref_.titleKo : ref_.titleEn}
          </h3>
          <p className="text-sm text-[#6B7280] font-medium mb-6">
            {lang === 'ko' ? ref_.clientKo : ref_.clientEn}
          </p>

          {/* 소개 */}
          <p className="text-[15px] text-[#4E5968] leading-[1.85] whitespace-pre-line mb-8" style={{ wordBreak: 'keep-all' }}>
            {intro}
          </p>

          {/* 주요 기능 + 기대 효과 */}
          {features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* 주요 기능 */}
              <div className="rounded-2xl bg-[#F0F4FF] border border-[#448CFF]/10 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-[#448CFF] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-[15px] font-bold text-[#383838]">
                    {lang === 'ko' ? '주요 기능' : 'Key Features'}
                  </h4>
                </div>
                <ul className="space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#448CFF] mt-[7px] shrink-0" />
                      <span className="text-[14px] text-[#4E5968] leading-[1.7]" style={{ wordBreak: 'keep-all' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 기대 효과 */}
              <div className="rounded-2xl bg-[#F5F3FF] border border-[#7C5CFC]/10 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-[#7C5CFC] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-[15px] font-bold text-[#383838]">
                    {lang === 'ko' ? '기대 효과' : 'Expected Impact'}
                  </h4>
                </div>
                <ul className="space-y-3">
                  {impacts.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC] mt-[7px] shrink-0" />
                      <span className="text-[14px] text-[#4E5968] leading-[1.7]" style={{ wordBreak: 'keep-all' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── 카드 — 로고 위, 제목, 내용, 자세히 보기 ── */
function RefCard({ ref_, lang }: { ref_: Reference; lang: 'ko' | 'en' }) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer group"
      onClick={() => navigate('/cases')}
    >
      <div className="flex flex-col bg-white rounded-2xl p-7 sm:p-10 h-[300px] sm:h-[320px]" style={{ wordBreak: 'keep-all' }}>
        <div className="h-14 flex items-center mb-5">
          <img
            src={ref_.logo}
            alt=""
            className={`${ref_.logoHeight} w-auto object-contain`}
          />
        </div>
        <h3 className="text-[16px] sm:text-[18px] font-bold text-[#595959] leading-snug mb-3 line-clamp-2">
          {lang === 'ko' ? ref_.titleKo : ref_.titleEn}
        </h3>
        <p className="text-[13px] sm:text-[14px] text-[#595959] leading-relaxed line-clamp-2 mb-auto">
          {lang === 'ko' ? ref_.summaryKo : ref_.summaryEn}
        </p>
        <span className="text-[13px] text-[#595959] font-semibold group-hover:underline transition-all mt-5">
          {lang === 'ko' ? '자세히 보기 →' : 'Learn more →'}
        </span>
      </div>
    </div>
  );
}

/* ── 슬라이드 캐러셀 ── */
export function UseCases() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Reference | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);
  const isPaused = useRef(false);
  const total = references.length;

  // 3배 복제 배열
  const tripled = [...references, ...references, ...references];

  useEffect(() => {
    const gap = 24; // gap-6 = 24px
    const getCardWidth = () => {
      if (!trackRef.current) return 340;
      const firstCard = trackRef.current.children[0] as HTMLElement;
      return firstCard ? firstCard.offsetWidth + gap : 340;
    };

    // 초기 위치를 원본 세트 시작점으로
    const initPos = () => {
      const cw = getCardWidth();
      scrollPos.current = cw * total;
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        trackRef.current.style.transform = `translateX(-${scrollPos.current}px)`;
      }
    };
    initPos();

    const interval = setInterval(() => {
      if (isPaused.current) return;
      const cw = getCardWidth();
      scrollPos.current += cw;

      // 원본 세트 끝에 도달하면 리셋
      const totalOriginal = cw * total;
      if (scrollPos.current >= totalOriginal * 2) {
        scrollPos.current = totalOriginal;
        if (trackRef.current) {
          trackRef.current.style.transition = 'none';
          trackRef.current.style.transform = `translateX(-${scrollPos.current}px)`;
        }
        // 강제 리플로우 후 다시 이동
        void trackRef.current?.offsetHeight;
        scrollPos.current += cw;
      }

      if (trackRef.current) {
        trackRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        trackRef.current.style.transform = `translateX(-${scrollPos.current}px)`;
      }

      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [total]);

  const goTo = (idx: number) => {
    if (!trackRef.current) return;
    const gap = 24;
    const firstCard = trackRef.current.children[0] as HTMLElement;
    const cw = firstCard ? firstCard.offsetWidth + gap : 340;
    scrollPos.current = cw * (total + idx);
    trackRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
    trackRef.current.style.transform = `translateX(-${scrollPos.current}px)`;
    setActiveIndex(idx);
  };

  return (
    <>
      <section
        id="use-cases"
        className="relative py-14 sm:py-20 lg:py-32 bg-[#F8F9FD]"
        aria-labelledby="usecase-heading"
      >
        <div className="max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-14 sm:mb-20"
          >
            <h2
              id="usecase-heading"
              className="font-bold text-[#383838]"
              style={{ fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.3 }}
            >
              {lang === 'ko' ? '기술로 변화시킨 현장들' : 'Fields Transformed by Technology'}
            </h2>
            <button
              onClick={() => navigate('/cases')}
              className="group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold text-[#383838] border border-[#D1D5DB] hover:border-[#383838] transition-colors shrink-0"
            >
              {lang === 'ko' ? '사례 더보기' : 'View All Cases'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* 캐러셀 영역 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden"
            onMouseEnter={() => (isPaused.current = true)}
            onMouseLeave={() => (isPaused.current = false)}
          >
            <div
              ref={trackRef}
              className="flex gap-6"
              style={{ willChange: 'transform' }}
            >
              {tripled.map((ref_, i) => (
                <div key={i} className="flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px]">
                  <RefCard ref_={ref_} lang={lang} />
                </div>
              ))}
            </div>

            {/* 오른쪽 페이드 */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 lg:w-56 bg-gradient-to-l from-[#F8F9FD] via-[#F8F9FD]/60 to-transparent" />
          </motion.div>

          {/* 인디케이터 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-6 mt-10"
          >
            <div className="flex gap-2">
              {references.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-6 bg-[#0F1117]' : 'w-2 bg-[#D1D5DB]'
                  }`}
                />
              ))}
            </div>
            {/* 모바일 전용 사례 더보기 */}
            <button
              onClick={() => navigate('/cases')}
              className="sm:hidden group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold text-[#383838] border border-[#D1D5DB] hover:border-[#383838] transition-colors"
            >
              {lang === 'ko' ? '사례 더보기' : 'View All Cases'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <DetailModal ref_={selected} lang={lang} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
