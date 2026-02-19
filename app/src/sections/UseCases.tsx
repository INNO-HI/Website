import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building2, 
  HeartPulse, 
  Users, 
  Cpu,
  TrendingUp,
  TrendingDown,
  Clock,
  Shield
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: Building2,
    title: '공공 부문',
    subtitle: '정부 및 지자체',
    description: '시민 서비스를 지능형 자동화로 간소화합니다.\n허가 처리부터 사회 서비스까지 품질을 향상시킵니다.',
    metrics: [
      { label: '처리 시간', value: '-65%', trend: 'down' as const },
      { label: '시민 만족도', value: '+42%', trend: 'up' as const },
      { label: '비용 절감', value: '40%', trend: 'up' as const },
    ],
    features: ['자동 케이스 라우팅', '다국어 지원', '규정 준수 추적', '실시간 대시보드'],
  },
  {
    icon: HeartPulse,
    title: '의료 기관',
    subtitle: '병원 및 클리닉',
    description: '환자 접수·문서화·진료 조정을 변화시킵니다.\n의료진이 환자 진료에 집중할 수 있게 합니다.',
    metrics: [
      { label: '문서화 시간', value: '-70%', trend: 'down' as const },
      { label: '데이터 정확도', value: '99.2%', trend: 'up' as const },
      { label: '환자 처리량', value: '+35%', trend: 'up' as const },
    ],
    features: ['임상 문서화', '환자 분류 지원', '진료 조정', '규정 준수'],
  },
  {
    icon: Users,
    title: '인간 서비스',
    subtitle: '사회 및 지역사회 돌봄',
    description: '취약 계층을 존엄성과 효율성으로 지원합니다.\n인간적 연결을 유지하며 업무를 자동화합니다.',
    metrics: [
      { label: '케이스 해결', value: '+58%', trend: 'up' as const },
      { label: '응답 시간', value: '-80%', trend: 'down' as const },
      { label: '자원 활용', value: '+45%', trend: 'up' as const },
    ],
    features: ['요구사항 평가 자동화', '자원 매칭', '결과 추적', '개입 알림'],
  },
  {
    icon: Cpu,
    title: '물리적 AI 통합',
    subtitle: '스마트 환경',
    description: '디지털 인텔리전스와 물리적 공간을 연결합니다.\n인간의 필요를 이해하고 반응하는 환경을 만듭니다.',
    metrics: [
      { label: '에너지 효율', value: '+30%', trend: 'up' as const },
      { label: '공간 활용', value: '+55%', trend: 'up' as const },
      { label: '운영 비용', value: '-25%', trend: 'down' as const },
    ],
    features: ['센서 퓨전', '예측 분석', '자동 제어', '안전 모니터링'],
  },
];

export function UseCases() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.usecase-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.usecase-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.usecase-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="use-cases"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#F8F9FD]"
      aria-labelledby="usecase-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ECF1FD] rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="usecase-title text-center max-w-xl mx-auto mb-14 lg:mb-18">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#448CFF] mb-4">
            <Building2 className="w-4 h-4" aria-hidden="true" />
            적용 분야
          </span>
          <h2 id="usecase-heading" className="text-kr-title mb-5">
            사람 중심
            <br />
            <span className="gradient-text">환경</span>
          </h2>
          <p className="text-kr-body text-[#4B4E56] leading-relaxed">
            인프라는 인간의 웰빙이 궁극적인 성공 지표인
            <br className="hidden sm:block" />
            조직들을 위해 서비스를 제공합니다.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="usecase-grid grid grid-cols-1 lg:grid-cols-2 gap-5" role="list">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="usecase-item"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              role="listitem"
            >
              <div className="h-full p-5 rounded-xl bg-white border border-[#D3D8DF] hover:border-[#8AB8FB] transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#F8F9FD] flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="w-4 h-4 text-[#448CFF]" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-[#383838]">{useCase.title}</h3>
                    <p className="text-xs text-[#777A86]">{useCase.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-[#4B4E56] whitespace-pre-line leading-relaxed mb-4">{useCase.description}</p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {useCase.metrics.map((metric, mIndex) => (
                    <div key={mIndex} className="text-center p-2 rounded-lg bg-[#F8F9FD]">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-base font-bold text-[#383838]">{metric.value}</span>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3 text-emerald-500" aria-hidden="true" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-emerald-500" aria-hidden="true" />
                        )}
                      </div>
                      <span className="text-[10px] text-[#777A86]">{metric.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {useCase.features.map((feature, fIndex) => (
                    <span key={fIndex} className="inline-flex items-center px-2 py-1 rounded-md bg-[#F8F9FD] text-[11px] text-[#4B4E56]">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-white border border-[#D3D8DF]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F8F9FD] flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#448CFF]" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#383838]">운영을 변화시킬 준비가 되셨나요?</p>
                <p className="text-xs text-[#777A86]">평균 배포 시간: 2-4주</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#4B4E56]">
              <Shield className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              엔터프라이즈급 보안
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
