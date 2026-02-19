import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageSquare, 
  Mic, 
  Filter, 
  FileText, 
  Link2,
  Play,
  Pause,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: MessageSquare,
    title: '상담 접수',
    description: '음성·채팅·문자 등 다양한 채널로 들어오는 상담을\n실시간으로 캡처합니다.',
    details: '멀티채널 입력 · 실시간 스트리밍',
  },
  {
    icon: Mic,
    title: '음성 인식',
    description: '업종 특화 어휘를 학습한 AI가\n대화를 정확하게 텍스트로 변환합니다.',
    details: '98.5% 인식률 · 화자 분리 · 노이즈 필터링',
  },
  {
    icon: Filter,
    title: '데이터 정제',
    description: '핵심 정보를 자동으로 추출하고\n구조화된 데이터로 변환합니다.',
    details: '자동 분류 · 개체 인식 · 유효성 검증',
  },
  {
    icon: FileText,
    title: '보고서 생성',
    description: '상담 내용을 즉시 요약하고\n규정에 맞는 보고서를 자동 작성합니다.',
    details: '맞춤형 템플릿 · 규정 준수 포맷',
  },
  {
    icon: Link2,
    title: '시스템 연동',
    description: '기존 업무 시스템과 원활하게 연결되어\n데이터가 실시간 동기화됩니다.',
    details: 'API 연동 · 엔터프라이즈 보안',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hiw-title',
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
        '.hiw-step',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.hiw-flow',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.hiw-connector',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.hiw-flow',
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-play demo
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white dark:bg-slate-950"
      aria-labelledby="hiw-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="hiw-title text-center max-w-xl mx-auto mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#448CFF] mb-4">
            <Play className="w-4 h-4" aria-hidden="true" />
            작동 방식
          </span>
          <h2 id="hiw-heading" className="text-kr-title mb-5">
            상담이 들어오면
            <br />
            <span className="gradient-text">보고서가 나옵니다</span>
          </h2>
          <p className="text-kr-body text-[#777A86] leading-relaxed">
            복잡한 과정은 AI가 처리합니다.
            <br />
            업무의 흐름은 더 빠르고 정확해집니다.
          </p>
        </div>

        {/* Demo Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F8F9FD] hover:bg-[#ECF1FD] transition-colors text-sm font-medium text-[#4B4E56]"
            aria-label={isPlaying ? '데모 일시정지' : '데모 재생'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Play className="w-4 h-4" aria-hidden="true" />
            )}
            {isPlaying ? '일시정지' : '데모 재생'}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(0);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F8F9FD] hover:bg-[#ECF1FD] transition-colors text-sm font-medium text-[#4B4E56]"
            aria-label="데모 초기화"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            초기화
          </button>
        </motion.div>

        {/* Flow Visualization */}
        <div className="hiw-flow relative">
          {/* Vertical Connector Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="hiw-connector absolute inset-0 bg-[#D3D8DF] origin-top" />
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#448CFF] to-[#68A1FF]"
              style={{ height: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-6 lg:space-y-8" role="list">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`hiw-step relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
                role="listitem"
              >
                {/* Content Side */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <motion.div
                    className={`relative p-6 rounded-xl border transition-all duration-300 ${
                      currentStep === index
                        ? 'bg-[#ECF1FD] border-[#8AB8FB]'
                        : 'bg-[#F8F9FD] border-[#D3D8DF]'
                    }`}
                    animate={{ scale: currentStep === index ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Step Number Badge */}
                    <div className={`absolute -top-3 left-5 px-3 py-1 rounded-full text-xs font-bold ${
                      currentStep === index
                        ? 'bg-[#448CFF] text-white'
                        : 'bg-white text-[#777A86] border border-[#D3D8DF]'
                    }`}>
                      STEP {index + 1}
                    </div>

                    <div className="flex items-start gap-4 mt-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        currentStep === index
                          ? 'bg-[#448CFF]'
                          : 'bg-white border border-[#D3D8DF]'
                      }`}>
                        <step.icon className={`w-5 h-5 ${
                          currentStep === index ? 'text-white' : 'text-[#777A86]'
                        }`} aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#383838] mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-[#4B4E56] whitespace-pre-line leading-relaxed mb-2">
                          {step.description}
                        </p>
                        <p className="text-xs text-[#777A86]">
                          {step.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Visual Side */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} hidden lg:block`}>
                  <motion.div
                    className={`relative aspect-[4/3] rounded-xl border flex items-center justify-center transition-all duration-300 ${
                      currentStep === index
                        ? 'bg-[#ECF1FD] border-[#8AB8FB]'
                        : 'bg-[#F8F9FD] border-[#D3D8DF]'
                    }`}
                  >
                    {/* Abstract Visual */}
                    <div className="relative">
                      <motion.div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                          currentStep === index
                            ? 'bg-[#448CFF]'
                            : 'bg-white border border-[#D3D8DF]'
                        }`}
                        animate={{
                          scale: currentStep === index ? [1, 1.05, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: currentStep === index ? Infinity : 0,
                        }}
                      >
                        <step.icon className={`w-8 h-8 ${
                          currentStep === index ? 'text-white' : 'text-[#777A86]'
                        }`} aria-hidden="true" />
                      </motion.div>

                      {/* Orbiting dots */}
                      {currentStep === index && (
                        <>
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full bg-[#68A1FF]"
                              animate={{
                                rotate: 360,
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: 'linear',
                              }}
                              style={{
                                top: '50%',
                                left: '50%',
                                marginLeft: -4,
                                marginTop: -4,
                                transformOrigin: `${50 + (i + 1) * 25}px 0`,
                              }}
                            />
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Center Node */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#448CFF] z-10 items-center justify-center">
                  <div className={`w-2 h-2 rounded-full transition-colors ${
                    currentStep === index ? 'bg-[#448CFF]' : 'bg-transparent'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-xl bg-[#F8F9FD] border border-[#D3D8DF]">
            <div className="flex -space-x-2">
              {steps.slice(0, 3).map((step, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-[#ECF1FD] flex items-center justify-center border-2 border-white"
                >
                  <step.icon className="w-4 h-4 text-[#448CFF]" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#4B4E56]">
              <span>전체 프로세스</span>
              <ArrowRight className="w-4 h-4 text-[#777A86]" aria-hidden="true" />
              <span className="font-bold text-[#448CFF]">3초 이내</span>
              <span>완료</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
