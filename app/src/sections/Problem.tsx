import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileX, 
  Unlink, 
  Clock, 
  AlertTriangle,
  TrendingDown,
  Database
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: FileX,
    title: '데이터 단절',
    description: '오프라인 업무는 정보가 고립되어\n전체적인 통찰과 의사결정이 어렵습니다.',
    stat: '73%',
    statLabel: '비정형 데이터',
  },
  {
    icon: Unlink,
    title: '연결되지 않은 프로세스',
    description: '수동 전달은 오류와 지연을 야기하며\n조직 전체에 영향을 미칩니다.',
    stat: '4.2시간',
    statLabel: '평균 지연 시간',
  },
  {
    icon: Clock,
    title: '느린 정책 대응',
    description: '기존 보고 주기는 빠르게 변화하는\n운영 요구사항을 따라가지 못합니다.',
    stat: '30일+',
    statLabel: '정책 업데이트 소요',
  },
  {
    icon: AlertTriangle,
    title: '구조적 사각지대',
    description: '실시간 가시성 부족은 서비스 제공과\n자원 배분의 공백을 만듭니다.',
    stat: '28%',
    statLabel: '누락 사례',
  },
];

export function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.problem-title',
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
        '.problem-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white"
      aria-labelledby="problem-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#F8F9FD] rounded-full blur-3xl opacity-70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="problem-title text-center max-w-xl mx-auto mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#448CFF] mb-4"
          >
            <TrendingDown className="w-4 h-4" aria-hidden="true" />
            현재의 과제
          </motion.span>
          <h2 id="problem-heading" className="text-kr-title mb-5">
            오프라인 업무는
            <br />
            <span className="text-[#777A86]">뒤처지고 있습니다</span>
          </h2>
          <p className="text-kr-body text-[#4B4E56] leading-relaxed">
            전통적인 업무 방식은 데이터 단절과 수동 프로세스,
            <br className="hidden sm:block" />
            느린 대응으로 인해 시간이 지날수록 비효율이 누적됩니다.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5" role="list" aria-label="주요 문제점">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              className="problem-card group relative p-6 rounded-xl bg-[#F8F9FD] border border-[#D3D8DF] hover:border-[#8AB8FB] transition-all duration-300"
              whileHover={{ y: -3 }}
              role="listitem"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-lg bg-white border border-[#D3D8DF] flex items-center justify-center group-hover:border-[#8AB8FB] transition-colors">
                  <problem.icon className="w-5 h-5 text-[#777A86] group-hover:text-[#448CFF] transition-colors" aria-hidden="true" />
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#383838]">{problem.stat}</div>
                  <div className="text-xs text-[#777A86] mt-0.5">{problem.statLabel}</div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#383838] mb-2.5">{problem.title}</h3>
              <p className="text-sm text-[#4B4E56] whitespace-pre-line leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#F8F9FD] border border-[#D3D8DF]">
            <Database className="w-5 h-5 text-[#448CFF]" aria-hidden="true" />
            <span className="text-sm text-[#4B4E56]">
              조직들은 데이터 비효율로 매년 <span className="font-bold text-[#383838]">3.1조 달러</span>를 잃고 있습니다
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
