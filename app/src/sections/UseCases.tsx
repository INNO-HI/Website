import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import {
  Building2,
  HeartPulse,
  Users,
  Cpu,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const useCases = [
  {
    icon: Building2,
    titleKo: '공공 부문',
    titleEn: 'Public Sector',
    subtitleKo: '정부 및 지자체',
    subtitleEn: 'Government & Local Authorities',
    descriptionKo: '시민 서비스를 지능형 자동화로 간소화합니다.\n허가 처리부터 사회 서비스까지 품질을 향상시킵니다.',
    descriptionEn: 'Streamline citizen services with intelligent automation. From permits to social services.',
    metrics: [
      { labelKo: '처리 시간', labelEn: 'Processing time', value: '-65%', trend: 'down' as const },
      { labelKo: '시민 만족도', labelEn: 'Citizen satisfaction', value: '+42%', trend: 'up' as const },
      { labelKo: '비용 절감', labelEn: 'Cost savings', value: '40%', trend: 'up' as const },
    ],
    featuresKo: ['자동 케이스 라우팅', '다국어 지원', '규정 준수 추적', '실시간 대시보드'],
    featuresEn: ['Auto case routing', 'Multilingual support', 'Compliance tracking', 'Real-time dashboard'],
    color: '#448CFF',
    bgColor: '#EEF4FF',
  },
  {
    icon: HeartPulse,
    titleKo: '의료 기관',
    titleEn: 'Healthcare',
    subtitleKo: '병원 및 클리닉',
    subtitleEn: 'Hospitals & Clinics',
    descriptionKo: '환자 접수·문서화·진료 조정을 변화시킵니다.\n의료진이 환자 진료에 집중할 수 있게 합니다.',
    descriptionEn: 'Transform patient intake, documentation, and care coordination. Let clinicians focus on care.',
    metrics: [
      { labelKo: '문서화 시간', labelEn: 'Documentation time', value: '-70%', trend: 'down' as const },
      { labelKo: '데이터 정확도', labelEn: 'Data accuracy', value: '99.2%', trend: 'up' as const },
      { labelKo: '환자 처리량', labelEn: 'Patient throughput', value: '+35%', trend: 'up' as const },
    ],
    featuresKo: ['임상 문서화', '환자 분류 지원', '진료 조정', '규정 준수'],
    featuresEn: ['Clinical documentation', 'Triage support', 'Care coordination', 'Compliance'],
    color: '#EF4444',
    bgColor: '#FEF2F2',
  },
  {
    icon: Users,
    titleKo: '사회복지 기관',
    titleEn: 'Social Welfare',
    subtitleKo: '사회 및 지역사회 돌봄',
    subtitleEn: 'Community & Social Care',
    descriptionKo: '취약 계층을 존엄성과 효율성으로 지원합니다.\n인간적 연결을 유지하며 업무를 자동화합니다.',
    descriptionEn: 'Support vulnerable populations with dignity and efficiency. Automate work while preserving human connection.',
    metrics: [
      { labelKo: '케이스 해결', labelEn: 'Case resolution', value: '+58%', trend: 'up' as const },
      { labelKo: '응답 시간', labelEn: 'Response time', value: '-80%', trend: 'down' as const },
      { labelKo: '자원 활용', labelEn: 'Resource utilization', value: '+45%', trend: 'up' as const },
    ],
    featuresKo: ['요구사항 평가 자동화', '자원 매칭', '결과 추적', '개입 알림'],
    featuresEn: ['Needs assessment', 'Resource matching', 'Outcome tracking', 'Intervention alerts'],
    color: '#22C55E',
    bgColor: '#ECFDF5',
  },
  {
    icon: Cpu,
    titleKo: '스마트 요양 시설',
    titleEn: 'Smart Care Facilities',
    subtitleKo: '노인·장애인 돌봄',
    subtitleEn: 'Elderly & Disability Care',
    descriptionKo: '요양보호사의 기록 부담을 AI가 대신합니다.\n더 많은 시간을 이용자와 함께할 수 있습니다.',
    descriptionEn: 'AI handles documentation for care workers. More time for the people who matter.',
    metrics: [
      { labelKo: '기록 시간', labelEn: 'Documentation time', value: '-72%', trend: 'down' as const },
      { labelKo: '케어 시간', labelEn: 'Care time', value: '+3배', trend: 'up' as const },
      { labelKo: '도입 기간', labelEn: 'Setup time', value: '<24h', trend: 'up' as const },
    ],
    featuresKo: ['음성 기록 자동화', '케어 플랜 연동', '보호자 리포트', '즉시 도입'],
    featuresEn: ['Voice documentation', 'Care plan sync', 'Family reports', 'Instant setup'],
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export function UseCases() {
  const [[page, direction], setPage] = useState([0, 0]);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const { lang } = useLanguage();

  const total = useCases.length;

  function paginate(dir: number) {
    const next = page + dir;
    if (next < 0 || next >= total) return;
    setPage([next, dir]);
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const threshold = 60;
    if (info.offset.x < -threshold) paginate(1);
    else if (info.offset.x > threshold) paginate(-1);
  }

  const useCase = useCases[page];

  return (
    <section
      id="use-cases"
      className="relative py-24 lg:py-32 bg-[#F8F9FD]"
      aria-labelledby="usecase-heading"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* 헤더 */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#448CFF] mb-4">
            <Building2 className="w-4 h-4" aria-hidden="true" />
            {lang === 'ko' ? '적용 분야' : 'Use Cases'}
          </span>
          <h2
            id="usecase-heading"
            className="font-semibold text-[#0F1117] mb-4"
            style={{ fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.3 }}
          >
            {lang === 'ko' ? (
              <>사람 중심의<br /><span className="gradient-text">현장에서 증명됩니다</span></>
            ) : (
              <>Proven in<br /><span className="gradient-text">people-first environments</span></>
            )}
          </h2>
          <p className="text-[#4B4E56] leading-relaxed text-[17px] font-medium">
            {lang === 'ko'
              ? '공공·의료·복지 현장에서 이미 사용되고 있습니다.'
              : 'Already in use across public, health, and welfare sectors.'}
          </p>
        </motion.div>

        {/* 슬라이더 */}
        <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: 420 }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="bg-white rounded-2xl border border-[#EAEDF2] shadow-sm p-8 lg:p-12 cursor-grab active:cursor-grabbing select-none"
              style={{ touchAction: 'pan-y' }}
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* 왼쪽: 아이콘 + 메트릭 */}
                <div className="lg:w-[280px] flex-shrink-0">
                  <div
                    className="rounded-2xl p-6 mb-6 flex flex-col items-center justify-center gap-4"
                    style={{ background: useCase.bgColor }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: useCase.color }}
                    >
                      <useCase.icon className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                    {useCase.metrics.map((metric, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#F8F9FD] text-center lg:text-left lg:flex lg:items-center lg:gap-3">
                        <div className="flex items-center justify-center lg:justify-start gap-1 mb-0.5 lg:mb-0">
                          <span className="text-2xl font-semibold text-[#0F1117]">{metric.value}</span>
                          {metric.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                          )}
                        </div>
                        <span className="text-[11px] lg:text-xs text-[#777A86] leading-tight">
                          {lang === 'ko' ? metric.labelKo : metric.labelEn}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 오른쪽: 본문 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: useCase.color }}
                    >
                      {lang === 'ko' ? useCase.subtitleKo : useCase.subtitleEn}
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-[#0F1117] mb-3"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', letterSpacing: '-0.03em', lineHeight: 1.3 }}
                  >
                    {lang === 'ko' ? useCase.titleKo : useCase.titleEn}
                  </h3>
                  <p className="text-[#4B4E56] text-[17px] font-medium leading-relaxed whitespace-pre-line mb-5">
                    {lang === 'ko' ? useCase.descriptionKo : useCase.descriptionEn}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(lang === 'ko' ? useCase.featuresKo : useCase.featuresEn).map((feature, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{ background: useCase.bgColor, color: useCase.color }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 네비게이션 */}
        <div className="mt-8 flex items-center justify-between">
          {/* 화살표 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(-1)}
              disabled={page === 0}
              className="w-10 h-10 rounded-full border border-[#D3D8DF] bg-white flex items-center justify-center text-[#777A86] hover:text-[#448CFF] hover:border-[#8AB8FB] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={lang === 'ko' ? '이전' : 'Previous'}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              disabled={page === total - 1}
              className="w-10 h-10 rounded-full border border-[#D3D8DF] bg-white flex items-center justify-center text-[#777A86] hover:text-[#448CFF] hover:border-[#8AB8FB] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={lang === 'ko' ? '다음' : 'Next'}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label={lang === 'ko' ? '슬라이드 선택' : 'Select slide'}>
            {useCases.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > page ? 1 : -1])}
                className={`rounded-full transition-all duration-300 ${
                  i === page
                    ? 'w-6 h-2 bg-[#448CFF]'
                    : 'w-2 h-2 bg-[#D3D8DF] hover:bg-[#9CA3AF]'
                }`}
                role="tab"
                aria-selected={i === page}
                aria-label={lang === 'ko' ? `${i + 1}번째 슬라이드` : `Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* 카운터 */}
          <span className="text-sm font-semibold text-[#9CA3AF]">
            {page + 1} / {total}
          </span>
        </div>
      </div>
    </section>
  );
}
