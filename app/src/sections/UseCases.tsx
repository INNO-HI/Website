import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

import kepcoLogoSrc from '@/assets/partners/kepco-mcs.png';
import yangcheonLogoSrc from '@/assets/partners/yangcheon.jpg';
import ssisLogoSrc from '@/assets/partners/ssis.svg';

const references = [
  {
    titleKo: '현장 돌봄 자동화 AI',
    titleEn: 'Field Care Automation AI',
    clientKo: '한전MCS',
    clientEn: 'KEPCO MCS',
    logo: kepcoLogoSrc,
    logoHeight: 'h-12 sm:h-14',
    summaryKo: '현장 상담부터 기록, 요약, 보고까지 자동화한 돌봄 행정 AI',
    summaryEn: 'Care administration AI automating field consultations from recording to reporting',
    detailKo: '현장 상담은 기록보다 사람에게 집중해야 합니다.\n안심하이는 현장에서 발생하는 상담 내용을 음성으로 인식하고, 이를 자동으로 정리하여 기록·보고·복지 서비스 연계까지 이어지는 돌봄 행정 흐름을 하나의 AI 기반 프로세스로 통합했습니다.\n\n기존에는 상담 이후 수기 기록, 일정 정리, 보고서 작성, 복지 서비스 검토까지 여러 단계의 반복 행정이 필요했습니다. 안심하이는 이 과정을 자동화하여 현장 종사자가 행정보다 대상자와의 상담에 더 많은 시간을 쓸 수 있도록 설계되었습니다.\n\n주요 기능\n• 노인 특화 음성인식 기반 상담 내용 자동 기록\n• 행정 보고 형식에 맞춘 기록 요약 및 문서화\n• 상담 내용 기반 복지 서비스 추천\n• 현장 업무 흐름에 맞춘 모바일 중심 사용 환경\n\n기대 효과\n• 상담 이후 반복 행정 시간 단축\n• 돌봄 기록의 일관성과 정확도 향상\n• 현장 종사자의 업무 부담 경감\n• 상담 품질 향상 및 서비스 연계 효율 증대',
    detailEn: 'Field consultations should focus on people, not paperwork.\nAnsimHI recognizes consultation content through voice at the field and automatically organizes it, integrating the entire care administration flow—from documentation to reporting and welfare service linkage—into a single AI-based process.\n\nPreviously, multiple stages of repetitive administration were needed after consultations: manual recording, schedule organization, report writing, and welfare service review. AnsimHI automates this process so field workers can spend more time on consultations with clients rather than administration.\n\nKey Features\n• Elderly-specialized voice recognition for automatic consultation recording\n• Record summarization and documentation in administrative report format\n• Welfare service recommendations based on consultation content\n• Mobile-first UX designed for field workflows\n\nExpected Impact\n• Reduced repetitive administrative time after consultations\n• Improved consistency and accuracy of care records\n• Reduced workload burden for field workers\n• Enhanced consultation quality and service linkage efficiency',
  },
  {
    titleKo: '통합복지상담AI',
    titleEn: 'Integrated Welfare Consultation AI',
    clientKo: '양천구청',
    clientEn: 'Yangcheon District Office',
    logo: yangcheonLogoSrc,
    logoHeight: 'h-16 sm:h-20',
    summaryKo: '복지 업무에 필요한 답을 내부 문서 기반으로 즉시 제공하는 상담 AI',
    summaryEn: 'Consultation AI providing instant answers based on internal documents for welfare tasks',
    detailKo: '복지 행정에서는 빠른 답변만큼이나 근거 있는 답변이 중요합니다.\n안심하이는 내부 지침, 매뉴얼, 제도 문서를 기반으로 필요한 정보를 즉시 탐색하고, 출처와 함께 답변을 제공하는 RAG 기반 복지 상담 AI를 구현했습니다.\n\n기존에는 담당자가 복수의 문서를 직접 찾아보며 제도 해석과 민원 응대를 수행해야 했습니다. 통합복지상담AI는 질문 의도를 분석하고 관련 문서를 검색해, 행정 판단에 참고할 수 있는 형태로 답변을 정리합니다.\n\n주요 기능\n• 복지 행정 질의에 대한 실시간 AI 응답\n• 내부 문서 및 지침 기반 검색\n• 답변과 함께 근거·출처 제공\n• 상담 데이터 축적을 통한 행정 지식 자산화\n\n기대 효과\n• 담당자별 응답 편차 감소\n• 문서 탐색 시간 절감\n• 근거 중심 응대로 행정 신뢰성 향상\n• 반복되는 복지 질의 대응 효율화',
    detailEn: 'In welfare administration, evidence-based answers are just as important as fast ones.\nAnsimHI implements a RAG-based welfare consultation AI that instantly searches internal guidelines, manuals, and policy documents to provide answers with sources.\n\nPreviously, staff had to manually search through multiple documents for policy interpretation and citizen response. The Integrated Welfare Consultation AI analyzes question intent, searches relevant documents, and organizes answers in a format useful for administrative judgment.\n\nKey Features\n• Real-time AI responses to welfare administration queries\n• Search based on internal documents and guidelines\n• Answers provided with evidence and sources\n• Administrative knowledge management through accumulated consultation data\n\nExpected Impact\n• Reduced response variation between staff members\n• Reduced document search time\n• Improved administrative reliability through evidence-based responses\n• Streamlined handling of repetitive welfare queries',
  },
  {
    titleKo: 'AI 민원 창구 서비스',
    titleEn: 'AI Civil Service Counter',
    clientKo: '양천구청',
    clientEn: 'Yangcheon District Office',
    logo: yangcheonLogoSrc,
    logoHeight: 'h-16 sm:h-20',
    summaryKo: '민원 발화를 문서로 전환해 접수까지 연결하는 대화형 행정 AI',
    summaryEn: 'Conversational AI converting civil petition speech into documents through to filing',
    detailKo: '민원은 복잡해야 하는 일이 아니라, 더 쉽게 처리되어야 하는 일입니다.\n안심하이는 음성 및 대화형 인터페이스를 통해 민원 내용을 자동으로 정리하고, 필요한 서식을 작성하며, 제출 단계까지 연결되는 AI 민원 창구 서비스를 구현했습니다.\n\n기존 민원 처리 과정은 내용 정리, 반복 입력, 서식 작성, 검토와 재작성까지 많은 수작업이 필요했습니다. 이 서비스는 민원인의 발화를 중심으로 내용을 구조화하고 행정 문서로 전환하여, 보다 빠르고 정확한 접수를 지원합니다.\n\n주요 기능\n• 민원 발화 자동 인식 및 내용 요약\n• 서식 자동 작성 및 입력 보조\n• 전자서명 및 제출 흐름 지원\n• 비정형 발화를 행정 문서 형태로 구조화\n\n기대 효과\n• 민원 처리 시간 단축\n• 서식 오류 및 누락 감소\n• 공무원의 반복 업무 감소\n• 시민 접근성과 행정 편의성 향상',
    detailEn: 'Civil petitions shouldn\'t be complicated—they should be easier to process.\nAnsimHI implements an AI civil service counter that automatically organizes petition content through voice and conversational interfaces, fills in required forms, and connects to the submission stage.\n\nThe traditional petition process required extensive manual work: content organization, repetitive input, form filling, review and revision. This service structures content around the petitioner\'s speech and converts it into administrative documents for faster, more accurate filing.\n\nKey Features\n• Automatic recognition and summarization of petition speech\n• Auto form generation and input assistance\n• Electronic signature and submission flow support\n• Structuring unstructured speech into administrative document format\n\nExpected Impact\n• Reduced petition processing time\n• Fewer form errors and omissions\n• Reduced repetitive work for public servants\n• Improved citizen accessibility and administrative convenience',
  },
  {
    titleKo: '고독사 이진 분류 모델 개발 PoC',
    titleEn: 'Lonely Death Classification Model PoC',
    clientKo: '한국사회보장정보원',
    clientEn: 'Korea Social Security Information Service',
    logo: ssisLogoSrc,
    logoHeight: 'h-6 sm:h-7',
    summaryKo: '대규모 데이터를 기반으로 고독사 위험을 분류하는 예측 AI',
    summaryEn: 'Predictive AI classifying lonely death risk based on large-scale data',
    detailKo: '반복적인 행정 분류 업무는 AI를 통해 더 빠르고 체계적으로 수행할 수 있습니다.\n안심하이는 대규모 공공 데이터를 기반으로 고독사 여부를 분류하는 머신러닝·딥러닝 기반 모델을 개발하여, 공공 데이터 분석과 행정 의사결정을 지원하는 PoC를 수행했습니다.\n\n이 프로젝트는 고독사 관련 통계 생성과 데이터 표준화 과정에서 발생하는 대규모 수작업을 줄이고, 위험 신호를 더 빠르게 식별할 수 있는 데이터 기반 분류 체계를 만드는 데 목적이 있습니다.\n\n주요 기능\n• 공공 데이터 기반 고독사 여부 이진 분류\n• 정형·비정형 데이터 통합 분석\n• 위험 신호 탐지 및 분류 확률 제공\n• 향후 정책 판단과 후속 검토를 위한 근거 생성 구조\n\n기대 효과\n• 대규모 행정 분류 업무 자동화\n• 처리 시간 획기적 절감\n• 위험군 선별 정확도 향상\n• 공공 데이터 기반 예측 행정 레퍼런스 확보',
    detailEn: 'Repetitive administrative classification tasks can be performed faster and more systematically through AI.\nAnsimHI developed a machine learning and deep learning-based model to classify lonely deaths from large-scale public data, conducting a PoC supporting public data analysis and administrative decision-making.\n\nThis project aims to reduce the large-scale manual work involved in generating lonely death statistics and data standardization, and to create a data-driven classification system that can identify risk signals more quickly.\n\nKey Features\n• Binary classification of lonely death based on public data\n• Integrated analysis of structured and unstructured data\n• Risk signal detection and classification probability\n• Evidence generation structure for future policy decisions and follow-up review\n\nExpected Impact\n• Automation of large-scale administrative classification\n• Dramatically reduced processing time\n• Improved accuracy in high-risk group identification\n• Secured predictive administration reference based on public data',
  },
];

type Reference = typeof references[number];

/* ── 디테일 모달 ── */
function DetailModal({ ref_, lang, onClose }: { ref_: Reference; lang: 'ko' | 'en'; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        className="relative bg-white rounded-2xl max-w-[680px] w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F2F4F6] flex items-center justify-center text-[#6B7280] hover:bg-[#E5E8EB] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h3
          className="font-bold text-[#0F1117] mb-2"
          style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
        >
          {lang === 'ko' ? ref_.titleKo : ref_.titleEn}
        </h3>
        <p className="text-sm text-[#6B7280] font-medium mb-6">
          {lang === 'ko' ? ref_.clientKo : ref_.clientEn}
        </p>

        <p className="text-[15px] text-[#333D4B] leading-[1.85] whitespace-pre-line mb-8">
          {lang === 'ko' ? ref_.detailKo : ref_.detailEn}
        </p>

      </motion.div>
    </motion.div>
  );
}

/* ── 카드 — 로고 위, 제목, 내용, 자세히 보기 ── */
function RefCard({ ref_, lang, onClick }: { ref_: Reference; lang: 'ko' | 'en'; onClick: () => void }) {
  return (
    <div
      className="cursor-pointer group"
      onClick={onClick}
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
            className="mb-14 sm:mb-20"
          >
            <h2
              id="usecase-heading"
              className="font-semibold text-[#0F1117] text-center"
              style={{ fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.3 }}
            >
              {lang === 'ko' ? (
                <>기술로 <span className="font-bold">변화시킨 현장들</span></>
              ) : (
                <><span className="font-bold">Fields transformed</span> by technology</>
              )}
            </h2>
          </motion.div>

          {/* 캐러셀 영역 */}
          <div
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
                  <RefCard ref_={ref_} lang={lang} onClick={() => setSelected(ref_)} />
                </div>
              ))}
            </div>

            {/* 오른쪽 페이드 */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 lg:w-56 bg-gradient-to-l from-[#F8F9FD] via-[#F8F9FD]/60 to-transparent" />
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center gap-2 mt-10">
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
