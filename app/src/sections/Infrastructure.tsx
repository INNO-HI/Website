import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Cpu, 
  Shield, 
  Server, 
  Cloud,
  Lock,
  Database,
  CheckCircle2,
  ChevronRight,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    id: 'ai',
    icon: Cpu,
    title: '자체 AI',
    subtitle: '맞춤형 모델',
    description: '도메인 특화 데이터셋으로 훈련된 신경망이\n전문 워크플로우에 대해 우수한 정확도를 제공합니다.',
    features: ['Transformer 아키텍처', '도메인 미세조정', '지속적 학습', '엣지 배포'],
    specs: [
      { label: '파라미터', value: '70억+' },
      { label: '언어', value: '12+' },
      { label: '지연시간', value: '<100ms' },
    ],
  },
  {
    id: 'security',
    icon: Shield,
    title: '엔터프라이즈 보안',
    subtitle: '심층 방어',
    description: '휴식·전송·처리 중인 데이터를 보호하는\n다층 보안 아키텍처를 갖추고 있습니다.',
    features: ['종단간 암호화', '제로 트러스트', 'SOC 2 Type II', 'GDPR 준수'],
    specs: [
      { label: '암호화', value: 'AES-256' },
      { label: '가동률', value: '99.99%' },
      { label: '규정', value: 'ISO 27001' },
    ],
  },
  {
    id: 'infrastructure',
    icon: Server,
    title: '확장 가능한 인프라',
    subtitle: '클우드 네이티브',
    description: '일관된 성능으로 스타트업부터\n엔터프라이즈까지 탄력적으로 확장됩니다.',
    features: ['자동 확장', '다중 리전', '99.99% SLA', '재해 복구'],
    specs: [
      { label: '리전', value: '15+' },
      { label: '처리량', value: '100만+ RPS' },
      { label: '스토리지', value: 'PB 규모' },
    ],
  },
  {
    id: 'deployment',
    icon: Cloud,
    title: '유연한 배포',
    subtitle: '선택의 자유',
    description: '온프레미스·클우드·하이브리드—\n귀하의 데이터, 귀하의 규칙입니다.',
    features: ['온프레미스', '프라이빗 클라우드', '하이브리드', '에어갭'],
    specs: [
      { label: '옵션', value: '3+' },
      { label: '설치', value: '<24시간' },
      { label: '마이그레이션', value: '무중단' },
    ],
  },
];

export function Infrastructure() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('ai');
  const activeCategory = techCategories.find((c) => c.id === activeTab) || techCategories[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.infra-title',
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
        '.infra-content',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.infra-content',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="infrastructure"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white"
      aria-labelledby="infra-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#ECF1FD] rounded-full blur-3xl -translate-y-1/2 opacity-50" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-[#ECF1FD] rounded-full blur-3xl -translate-y-1/2 opacity-50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="infra-title text-center max-w-xl mx-auto mb-14 lg:mb-18">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#448CFF] mb-4">
            <Zap className="w-4 h-4" aria-hidden="true" />
            기술
          </span>
          <h2 id="infra-heading" className="text-kr-title mb-5">
            확장 가능하게 설계,
            <br />
            <span className="gradient-text">신뢰할 수 있게 구축</span>
          </h2>
          <p className="text-kr-body text-[#4B4E56] leading-relaxed">
            인프라는 최첨단 AI와 엔터프라이즈급 보안,
            <br className="hidden sm:block" />
            배포 유연성을 결합합니다.
          </p>
        </div>

        {/* Content */}
        <div className="infra-content grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Tabs */}
          <div className="lg:col-span-4 space-y-2" role="tablist" aria-label="기술 카테고리">
            {techCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  activeTab === category.id
                    ? 'bg-white border border-[#8AB8FB] shadow-sm'
                    : 'bg-transparent hover:bg-white/50 border border-transparent'
                }`}
                whileHover={{ x: 2 }}
                role="tab"
                aria-selected={activeTab === category.id}
                aria-controls={`tabpanel-${category.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    activeTab === category.id ? 'bg-[#448CFF] text-white' : 'bg-[#F8F9FD] text-[#777A86]'
                  }`}>
                    <category.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-sm transition-colors ${
                      activeTab === category.id ? 'text-[#383838]' : 'text-[#4B4E56]'
                    }`}>{category.title}</h4>
                    <p className="text-xs text-[#777A86]">{category.subtitle}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-all ${
                    activeTab === category.id ? 'text-[#448CFF] translate-x-0 opacity-100' : 'text-[#D3D8DF] -translate-x-1 opacity-0'
                  }`} aria-hidden="true" />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Content Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
              >
                <div className="h-full p-5 lg:p-6 rounded-xl bg-white border border-[#D3D8DF]">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-lg bg-[#448CFF] flex items-center justify-center">
                      <activeCategory.icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#383838]">{activeCategory.title}</h3>
                      <p className="text-[#448CFF] text-sm">{activeCategory.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#4B4E56] whitespace-pre-line leading-relaxed mb-6">{activeCategory.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-[#383838] uppercase tracking-wider mb-3">주요 기능</h4>
                      <ul className="space-y-2">
                        {activeCategory.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-[#4B4E56]">
                            <CheckCircle2 className="w-4 h-4 text-[#448CFF] flex-shrink-0" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#383838] uppercase tracking-wider mb-3">사양</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {activeCategory.specs.map((spec, index) => (
                          <div key={index} className="text-center p-2.5 rounded-lg bg-[#F8F9FD]">
                            <div className="text-lg font-bold text-[#383838]">{spec.value}</div>
                            <div className="text-[10px] text-[#777A86]">{spec.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#D3D8DF]">
                    <h4 className="text-xs font-bold text-[#383838] uppercase tracking-wider mb-4">아키텍처 개요</h4>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {[
                        { icon: Database, label: '데이터 레이어' },
                        { icon: Cpu, label: 'AI 엔진' },
                        { icon: Lock, label: '보안' },
                        { icon: Server, label: '컴퓨트' },
                        { icon: Cloud, label: '전달' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-lg bg-[#F8F9FD] flex items-center justify-center mb-1">
                              <item.icon className="w-4 h-4 text-[#777A86]" aria-hidden="true" />
                            </div>
                            <span className="text-[10px] text-[#777A86]">{item.label}</span>
                          </div>
                          {index < 4 && (
                            <ChevronRight className="w-4 h-4 text-[#D3D8DF]" aria-hidden="true" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {['SOC 2 Type II', 'ISO 27001', 'GDPR 준수', 'HIPAA 준비'].map((badge, index) => (
            <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D3D8DF]">
              <Shield className="w-4 h-4 text-[#448CFF]" aria-hidden="true" />
              <span className="text-sm font-medium text-[#4B4E56]">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
