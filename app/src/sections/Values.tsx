import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, MapPin, BarChart2, Globe, Eye, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const values = [
  {
    Icon: Heart,
    accent: '#FF6B8A',
    bgLight: '#FFF0F4',
    titleKo: '사람이 먼저입니다',
    titleEn: 'People First',
    descKo: '기술은 수단이고, 사람이 목적입니다. 모든 설계의 중심은 이용자와 현장 종사자입니다.',
    descEn: 'Technology is a means, people are the purpose. Every design centers on users and care workers.',
  },
  {
    Icon: MapPin,
    accent: '#448CFF',
    bgLight: '#EEF4FF',
    titleKo: '현장에서 출발합니다',
    titleEn: 'Born in the Field',
    descKo: '복지관, 병원, 지자체 — 현장의 목소리가 제품의 첫 문장입니다. 책상이 아닌 현장에서 답을 찾습니다.',
    descEn: "Welfare centers, hospitals, local governments — the field's voice is the first sentence of every product.",
  },
  {
    Icon: BarChart2,
    accent: '#6366F1',
    bgLight: '#EEEEFF',
    titleKo: '데이터로 증명합니다',
    titleEn: 'Proven by Data',
    descKo: '선의만으로는 부족합니다. 측정 가능한 변화와 성과로 말합니다.',
    descEn: "Good intentions aren't enough. We speak through measurable impact and outcomes.",
  },
  {
    Icon: Globe,
    accent: '#22C55E',
    bgLight: '#ECFDF5',
    titleKo: '모두를 위한 기술',
    titleEn: 'Tech for Everyone',
    descKo: '가장 소외된 곳에 먼저 닿는 기술을 지향합니다. 디지털 격차가 돌봄의 격차가 되지 않도록.',
    descEn: "We build technology that reaches the most underserved first — so digital gaps don't become care gaps.",
  },
  {
    Icon: Eye,
    accent: '#F59E0B',
    bgLight: '#FFFBEB',
    titleKo: '투명하게 작동합니다',
    titleEn: 'Transparent by Design',
    descKo: 'AI의 모든 판단은 사람이 이해하고 검증할 수 있어야 합니다. 블랙박스를 거부합니다.',
    descEn: 'Every AI decision must be understandable and verifiable by humans. We reject black boxes.',
  },
  {
    Icon: Users,
    accent: '#14B8A6',
    bgLight: '#F0FDFA',
    titleKo: '함께 성장합니다',
    titleEn: 'Growing Together',
    descKo: '파트너 기관과 함께, 돌봄 생태계 전체를 발전시킵니다. 경쟁이 아닌 협력으로.',
    descEn: 'We grow the entire care ecosystem together with partner organizations — through collaboration, not competition.',
  },
];

export function Values() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { lang } = useLanguage();

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 lg:mb-18"
        >
          <p className="text-sm font-semibold text-[#448CFF] mb-3">
            {lang === 'ko' ? '우리가 지향하는 것' : 'What We Stand For'}
          </p>
          <h2
            className="font-black text-[#0F1117] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
          >
            {lang === 'ko' ? (
              <>기술이 아니라<br />가치로 만든 회사</>
            ) : (
              <>A company built on values,<br />not just technology</>
            )}
          </h2>
        </motion.div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {values.map((v, i) => {
            const Icon = v.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                whileHover={{ y: -3 }}
                className="group flex items-start gap-5 p-6 rounded-2xl border border-[#EAEDF2] hover:border-transparent hover:shadow-lg transition-all duration-300 cursor-default"
                style={{ background: 'white' }}
              >
                {/* 아이콘 박스 */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{ background: v.bgLight }}
                >
                  <Icon className="w-5 h-5" style={{ color: v.accent }} />
                </div>

                {/* 텍스트 */}
                <div>
                  <h3 className="text-base font-bold text-[#0F1117] mb-1.5">
                    {lang === 'ko' ? v.titleKo : v.titleEn}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {lang === 'ko' ? v.descKo : v.descEn}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
