import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mic, 
  Database, 
  LineChart, 
  Workflow,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    icon: Mic,
    title: '음성 인식',
    subtitle: 'STT & NLP',
    description: '자연스러운 대화를\n구조화된 데이터로 변환합니다.',
    features: ['실시간 전사', '다국어 지원', '노이즈 필터링'],
    metric: '98.5%',
    metricLabel: '정확도',
  },
  {
    icon: Database,
    title: '데이터 구조화',
    subtitle: '지능형 추출',
    description: '비정형 정보를 자동으로 정리하여\n활용 가능한 형식으로 만듭니다.',
    features: ['자동 분류', '개체 추출', '검증 규칙'],
    metric: '85%',
    metricLabel: '시간 절감',
  },
  {
    icon: LineChart,
    title: '예측 분석',
    subtitle: '인사이트 생성',
    description: '원시 데이터를 전략적 인텔리전스로\n변환하여 의사결정을 지원합니다.',
    features: ['추세 분석', '위험 점수', '예측 모델'],
    metric: '3배',
    metricLabel: '더 빠른 인사이트',
  },
  {
    icon: Workflow,
    title: '업무 자동화',
    subtitle: '정책 통합',
    description: '인사이트와 실행을 연결하여\n워크플로우를 실시간으로 자동화합니다.',
    features: ['스마트 라우팅', '자동 에스컬레이션', '감사 추적'],
    metric: '90%',
    metricLabel: '자동화율',
  },
];

export function Solution() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.solution-title',
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
        '.solution-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.solution-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#F8F9FD]"
      aria-labelledby="solution-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#ECF1FD] rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="solution-title text-center max-w-xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#448CFF] mb-4">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            우리의 솔루션
          </span>
          <h2 id="solution-heading" className="text-kr-title mb-5">
            종단간 AI
            <br />
            <span className="gradient-text">자동화 파이프라인</span>
          </h2>
          <p className="text-kr-body text-[#4B4E56] leading-relaxed">
            음성 입력부터 실행 가능한 인사이트까지—
            <br className="hidden sm:block" />
            통합 플랫폼이 정보를 처리·분석·실행합니다.
          </p>
        </div>

        {/* Solution Cards Grid */}
        <div className="solution-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" role="list">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="solution-card group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              role="listitem"
            >
              <div className="h-full p-5 rounded-xl bg-white border border-[#D3D8DF] hover:border-[#8AB8FB] transition-all duration-300">
                <div className="w-6 h-6 rounded-full bg-[#ECF1FD] text-[#448CFF] flex items-center justify-center text-xs font-bold mb-4">
                  {index + 1}
                </div>

                <div className="w-11 h-11 rounded-lg bg-[#F8F9FD] border border-[#D3D8DF] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <solution.icon className="w-5 h-5 text-[#448CFF]" aria-hidden="true" />
                </div>

                <div className="mb-3">
                  <span className="text-xs font-medium text-[#448CFF] uppercase tracking-wide">{solution.subtitle}</span>
                  <h3 className="text-base font-bold text-[#383838] mt-1">{solution.title}</h3>
                </div>

                <p className="text-sm text-[#4B4E56] whitespace-pre-line leading-relaxed mb-4">{solution.description}</p>

                <ul className="space-y-1.5 mb-4">
                  {solution.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-xs text-[#777A86]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#448CFF] flex-shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-[#D3D8DF]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#383838]">{solution.metric}</span>
                    <span className="text-xs text-[#777A86]">{solution.metricLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="relative p-5 rounded-xl bg-white border border-[#D3D8DF] overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-center text-xs font-bold text-[#777A86] uppercase tracking-wider mb-5">
                데이터 흐름 아키텍처
              </h4>
              
              <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3">
                {[
                  { label: '입력', sub: '음성·텍스트' },
                  { label: '처리', sub: 'AI 엔진' },
                  { label: '구조화', sub: '데이터 모델' },
                  { label: '분석', sub: '인사이트' },
                  { label: '실행', sub: '자동화' },
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-2 lg:gap-3">
                    <div className="text-center px-3 py-2 rounded-lg bg-[#F8F9FD]">
                      <div className="text-sm font-semibold text-[#383838]">{step.label}</div>
                      <span className="text-[10px] text-[#777A86]">{step.sub}</span>
                    </div>
                    {index < 4 && (
                      <ArrowRight className="w-4 h-4 text-[#D3D8DF] hidden sm:block" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
