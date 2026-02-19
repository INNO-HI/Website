import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  Users,
  DollarSign,
  Zap,
  BarChart3
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';

gsap.registerPlugin(ScrollTrigger);

interface SimulationResult {
  timeSaved: number;
  costSaved: number;
  efficiencyGain: number;
  casesProcessed: number;
}

export function EffectSimulator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [monthlyCases, setMonthlyCases] = useState(1000);
  const [avgHandleTime, setAvgHandleTime] = useState(45);
  const [staffCount, setStaffCount] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(25000);
  
  const [result, setResult] = useState<SimulationResult>({
    timeSaved: 0,
    costSaved: 0,
    efficiencyGain: 0,
    casesProcessed: 0,
  });

  useEffect(() => {
    const currentMonthlyHours = (monthlyCases * avgHandleTime) / 60;
    const currentCost = currentMonthlyHours * (hourlyRate / 1000);
    
    const timeReduction = 0.70;
    const newHandleTime = avgHandleTime * (1 - timeReduction);
    const newMonthlyHours = (monthlyCases * newHandleTime) / 60;
    const newCost = newMonthlyHours * (hourlyRate / 1000);
    
    const timeSaved = currentMonthlyHours - newMonthlyHours;
    const costSaved = currentCost - newCost;
    const efficiencyGain = (currentMonthlyHours / newMonthlyHours - 1) * 100;
    const casesProcessed = Math.round(monthlyCases * 1.5);
    
    setResult({
      timeSaved: Math.round(timeSaved),
      costSaved: Math.round(costSaved),
      efficiencyGain: Math.round(efficiencyGain),
      casesProcessed,
    });
  }, [monthlyCases, avgHandleTime, staffCount, hourlyRate]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.simulator-title',
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
        '.simulator-content',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.simulator-content',
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
      className="relative py-24 lg:py-32 bg-[#F8F9FD]"
      aria-labelledby="simulator-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#ECF1FD] rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="simulator-title text-center max-w-xl mx-auto mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#448CFF] mb-4">
            <Calculator className="w-4 h-4" aria-hidden="true" />
            영향 계산기
          </span>
          <h2 id="simulator-heading" className="text-kr-title mb-5">
            잠재적 절감을
            <br />
            <span className="gradient-text">계산핳보세요</span>
          </h2>
          <p className="text-kr-body text-[#4B4E56] leading-relaxed">
            INNO-HI가 귀하의 운영을 어떻게 변화시킬 수 있는지 확인하세요.
            <br className="hidden sm:block" />
            매개변수를 조정하여 귀하의 조직에 맞춰보세요.
          </p>
        </div>

        {/* Simulator Content */}
        <div className="simulator-content grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Input Panel */}
          <div className="p-5 rounded-xl bg-white border border-[#D3D8DF]">
            <h3 className="text-base font-bold text-[#383838] mb-6">현재 운영 상황</h3>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#4B4E56]">
                    <BarChart3 className="w-4 h-4 text-[#448CFF]" aria-hidden="true" />
                    월간 케이스
                  </label>
                  <span className="text-sm font-bold text-[#448CFF]">{monthlyCases.toLocaleString()}</span>
                </div>
                <Slider value={[monthlyCases]} onValueChange={(value) => setMonthlyCases(value[0])} min={100} max={10000} step={100} className="w-full" aria-label="월간 케이스 수" />
                <div className="flex justify-between mt-1 text-xs text-[#777A86]">
                  <span>100</span>
                  <span>10,000</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#4B4E56]">
                    <Clock className="w-4 h-4 text-[#448CFF]" aria-hidden="true" />
                    평균 처리 시간 (분)
                  </label>
                  <span className="text-sm font-bold text-[#448CFF]">{avgHandleTime}분</span>
                </div>
                <Slider value={[avgHandleTime]} onValueChange={(value) => setAvgHandleTime(value[0])} min={5} max={120} step={5} className="w-full" aria-label="평균 처리 시간" />
                <div className="flex justify-between mt-1 text-xs text-[#777A86]">
                  <span>5분</span>
                  <span>120분</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#4B4E56]">
                    <Users className="w-4 h-4 text-[#448CFF]" aria-hidden="true" />
                    직원 수
                  </label>
                  <span className="text-sm font-bold text-[#448CFF]">{staffCount}명</span>
                </div>
                <Slider value={[staffCount]} onValueChange={(value) => setStaffCount(value[0])} min={1} max={100} step={1} className="w-full" aria-label="직원 수" />
                <div className="flex justify-between mt-1 text-xs text-[#777A86]">
                  <span>1명</span>
                  <span>100명</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#4B4E56]">
                    <DollarSign className="w-4 h-4 text-[#448CFF]" aria-hidden="true" />
                    시간당 비용 (원)
                  </label>
                  <span className="text-sm font-bold text-[#448CFF]">{hourlyRate.toLocaleString()}원</span>
                </div>
                <Slider value={[hourlyRate]} onValueChange={(value) => setHourlyRate(value[0])} min={15000} max={100000} step={5000} className="w-full" aria-label="시간당 비용" />
                <div className="flex justify-between mt-1 text-xs text-[#777A86]">
                  <span>1.5만원</span>
                  <span>10만원</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#448CFF] to-[#68A1FF] text-white">
            <h3 className="text-base font-bold mb-5 flex items-center gap-2">
              <Zap className="w-5 h-5" aria-hidden="true" />
              INNO-HI 적용 시
            </h3>

            <div className="space-y-4">
              <motion.div key={result.timeSaved} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-3.5 rounded-lg bg-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/70" aria-hidden="true" />
                    <span className="text-sm text-white/90">월간 절약 시간</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{result.timeSaved}시간</div>
                    <div className="text-xs text-white/70">1인당 ~{Math.round(result.timeSaved / staffCount)}시간</div>
                  </div>
                </div>
              </motion.div>

              <motion.div key={result.costSaved} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-3.5 rounded-lg bg-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-white/70" aria-hidden="true" />
                    <span className="text-sm text-white/90">월간 비용 절감</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{(result.costSaved * 1000).toLocaleString()}원</div>
                    <div className="text-xs text-white/70">연간 {(result.costSaved * 12000).toLocaleString()}원</div>
                  </div>
                </div>
              </motion.div>

              <motion.div key={result.efficiencyGain} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-3.5 rounded-lg bg-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-white/70" aria-hidden="true" />
                    <span className="text-sm text-white/90">효율성 향상</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">+{result.efficiencyGain}%</div>
                    <div className="text-xs text-white/70">프로세스 처리량</div>
                  </div>
                </div>
              </motion.div>

              <motion.div key={result.casesProcessed} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-3.5 rounded-lg bg-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-white/70" aria-hidden="true" />
                    <span className="text-sm text-white/90">잠재적 월간 처리량</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{result.casesProcessed.toLocaleString()}</div>
                    <div className="text-xs text-white/70">+50% 용량</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-5 pt-5 border-t border-white/20">
              <p className="text-sm text-white/90 mb-3">귀하의 조직에 대한 상세 분석이 필요하신가요?</p>
              <motion.button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-lg bg-white text-[#448CFF] font-bold hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                맞춤 분석 받기
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
