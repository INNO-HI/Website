import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Building2,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const useCases = [
  {

    titleKo: '공공 부문',
    titleEn: 'Public Sector',
    subtitleKo: '정부 및 지자체',
    subtitleEn: 'Government & Local Authorities',
    descriptionKo: '시민 서비스를 지능형 자동화로\n간소화합니다.',
    descriptionEn: 'Streamline citizen services with intelligent automation.',
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

    titleKo: '의료 기관',
    titleEn: 'Healthcare',
    subtitleKo: '병원 및 클리닉',
    subtitleEn: 'Hospitals & Clinics',
    descriptionKo: '환자 접수·문서화·진료 조정을\n변화시킵니다.',
    descriptionEn: 'Transform patient intake, documentation, and care coordination.',
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

    titleKo: '사회복지 기관',
    titleEn: 'Social Welfare',
    subtitleKo: '사회 및 지역사회 돌봄',
    subtitleEn: 'Community & Social Care',
    descriptionKo: '취약 계층을 존엄성과\n효율성으로 지원합니다.',
    descriptionEn: 'Support vulnerable populations with dignity and efficiency.',
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

    titleKo: '스마트 요양 시설',
    titleEn: 'Smart Care Facilities',
    subtitleKo: '노인·장애인 돌봄',
    subtitleEn: 'Elderly & Disability Care',
    descriptionKo: '요양보호사의 기록 부담을\nAI가 대신합니다.',
    descriptionEn: 'AI handles documentation for care workers.',
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

type UseCase = typeof useCases[number];

function FlipCard({ useCase, lang, index }: { useCase: UseCase; lang: 'ko' | 'en'; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="relative w-full transition-transform duration-600"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transitionDuration: '600ms',
          aspectRatio: '3 / 4',
        }}
      >
        {/* 앞면 — 글라스모피즘 */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/30 flex flex-col items-center justify-center p-6 sm:p-8 shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: `${useCase.color}18`, color: useCase.color }}
          >
            {lang === 'ko' ? useCase.subtitleKo : useCase.subtitleEn}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0F1117] text-center mb-3">
            {lang === 'ko' ? useCase.titleKo : useCase.titleEn}
          </h3>
          <p className="text-[#6B7280] text-sm text-center whitespace-pre-line leading-relaxed">
            {lang === 'ko' ? useCase.descriptionKo : useCase.descriptionEn}
          </p>
          <div className="mt-6 text-xs text-[#B0B8C1] font-medium">
            {lang === 'ko' ? '탭하여 자세히 보기' : 'Tap to see more'}
          </div>
        </div>

        {/* 뒷면 — 글라스모피즘 */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/30 flex flex-col p-6 sm:p-8 shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <h4 className="text-lg font-bold text-[#0F1117] mb-5">
            {lang === 'ko' ? useCase.titleKo : useCase.titleEn}
          </h4>

          {/* 메트릭 */}
          <div className="space-y-3 mb-6">
            {useCase.metrics.map((metric, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">
                  {lang === 'ko' ? metric.labelKo : metric.labelEn}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-[#0F1117]">{metric.value}</span>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 기능 태그 */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {(lang === 'ko' ? useCase.featuresKo : useCase.featuresEn).map((feature, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-white/80"
                style={{ color: useCase.color }}
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-4 text-xs text-[#B0B8C1] font-medium text-center">
            {lang === 'ko' ? '탭하여 돌아가기' : 'Tap to go back'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function UseCases() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const { lang } = useLanguage();

  return (
    <section
      id="use-cases"
      className="relative py-14 sm:py-20 lg:py-32 bg-[#F8F9FD]"
      aria-labelledby="usecase-heading"
    >
      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* 헤더 */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-12 sm:mb-16"
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

        {/* 4단 카드 그리드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {useCases.map((useCase, i) => (
            <FlipCard key={i} useCase={useCase} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
