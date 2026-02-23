import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const stats = [
  { value: '99.9%', ko: '시스템 가동률', en: 'System Uptime' },
  { value: '5,000만+', ko: '처리된 데이터', en: 'Data Processed' },
  { value: '24h', ko: '평균 도입 소요', en: 'Avg. Time to Deploy' },
];

export function Mission() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { lang } = useLanguage();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 lg:py-40"
      style={{ background: '#0F1117' }}
    >
      {/* 배경 glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse, #448CFF 0%, transparent 70%)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#448CFF]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#448CFF]/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* 레이블 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-widest uppercase mb-8"
          style={{ color: '#448CFF' }}
        >
          {lang === 'ko' ? '우리의 미션' : 'Our Mission'}
        </motion.p>

        {/* 대형 헤드라인 */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-black text-white leading-[1.15] tracking-tight mb-8"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
        >
          {lang === 'ko' ? (
            <>
              돌봄이 필요한 모든 사람에게<br />
              <span style={{ color: '#448CFF' }}>더 좋은 내일</span>을
            </>
          ) : (
            <>
              A better tomorrow<br />
              for <span style={{ color: '#448CFF' }}>everyone who needs care</span>
            </>
          )}
        </motion.h2>

        {/* 서브카피 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-base lg:text-lg leading-relaxed max-w-2xl mb-16"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {lang === 'ko'
            ? 'INNO-HI는 복잡한 복지·의료 현장의 업무를 지능화하여, 종사자는 덜 소진되고 이용자는 더 나은 서비스를 받는 세상을 만듭니다.'
            : 'INNO-HI intelligentizes complex welfare and medical workflows, so care workers burn out less and service recipients receive better care.'}
        </motion.p>

        {/* 구분선 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="h-px mb-16 origin-left"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />

        {/* 임팩트 숫자 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.1 }}
            >
              <div
                className="text-5xl lg:text-6xl font-black tracking-tighter mb-2"
                style={{ color: '#fff' }}
              >
                {s.value}
              </div>
              <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.38)' }}>
                {lang === 'ko' ? s.ko : s.en}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
