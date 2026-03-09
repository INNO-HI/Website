import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

/* ── 애니메이션 SVG 아이콘 ──────────────────────────────────────────── */

function IconTeam({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3">
        <animate attributeName="r" values="3;3.4;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
      <circle cx="5" cy="9" r="2" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <path d="M1 21v-1a3 3 0 0 1 3-3" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
      </path>
      <circle cx="19" cy="9" r="2" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      <path d="M23 21v-1a3 3 0 0 0-3-3" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" begin="0.3s" />
      </path>
    </svg>
  );
}

function IconGear({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="8s" repeatCount="indefinite" />
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </g>
    </svg>
  );
}

function IconWaveform({ color }: { color: string }) {
  const bars = [4, 7, 3, 9, 5, 8, 4, 6];
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={1.5 + i * 2.7}
          y={12 - h / 2}
          width="1.8"
          rx="0.9"
          fill={color}
          height={h}
        >
          <animate
            attributeName="height"
            values={`${h};${12 - Math.abs(i - 3.5)};${h}`}
            dur={`${1 + i * 0.15}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values={`${12 - h / 2};${12 - (12 - Math.abs(i - 3.5)) / 2};${12 - h / 2}`}
            dur={`${1 + i * 0.15}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
    </svg>
  );
}

function IconDatabase({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3">
        <animate attributeName="ry" values="3;3.5;3" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" opacity="0.7">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
      </path>
      <circle cx="17" cy="8" r="1" fill={color} opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="8;5;8" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function IconShield({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" strokeDasharray="10" strokeDashoffset="10">
        <animate attributeName="stroke-dashoffset" values="10;0;0;10" dur="3s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function IconNetwork({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="2">
        <animate attributeName="r" values="2;2.4;2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="6" cy="18" r="2">
        <animate attributeName="r" values="2;2.4;2" dur="2s" repeatCount="indefinite" begin="0.4s" />
      </circle>
      <circle cx="18" cy="18" r="2">
        <animate attributeName="r" values="2;2.4;2" dur="2s" repeatCount="indefinite" begin="0.8s" />
      </circle>
      <line x1="12" y1="8" x2="6" y2="16" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.2s" />
      </line>
      <line x1="12" y1="8" x2="18" y2="16" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.6s" />
      </line>
      <line x1="6" y1="18" x2="18" y2="18" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
      </line>
    </svg>
  );
}

const animatedIcons = [IconTeam, IconGear, IconWaveform, IconDatabase, IconShield, IconNetwork];

/* ── 데이터 ──────────────────────────────────────────────────────────── */

const strengths = [
  {
    color: '#448CFF',
    titleKo: 'AI 기술 전문 인력 보유',
    titleEn: 'Expert AI Engineering Team',
    descKo: '음성 AI, 데이터 분석,\nAI 시스템 구축 경험을 보유한\n전문 개발 인력으로 구성',
    descEn: 'Composed of expert developers with\nexperience in voice AI, data analysis,\nand AI system development',
  },
  {
    color: '#6366F1',
    titleKo: '한국 환경에 최적화된 AI 기술',
    titleEn: 'AI Optimized for Korean Environment',
    descKo: '한국어 음성 환경, 공공 행정 환경,\n국내 서비스 환경에 맞는\nAI 기술 설계 및 개발',
    descEn: 'AI technology designed for Korean\nlanguage, public administration,\nand domestic service environments',
  },
  {
    color: '#3B82F6',
    titleKo: '고정확도 음성 인식 기술',
    titleEn: 'High-Accuracy Voice Recognition',
    descKo: '실시간 음성 인식, 한국어 특화 모델,\n정확도 중심의 STT 시스템 구축',
    descEn: 'Real-time voice recognition with\nKorean-specialized models and\naccuracy-focused STT systems',
  },
  {
    color: '#38BDF8',
    titleKo: '대규모 음성 데이터 활용',
    titleEn: 'Large-Scale Voice Data Utilization',
    descKo: '실제 음성 데이터를 기반으로\nAI 모델 성능을 지속적으로 개선',
    descEn: 'Continuously improving AI model\nperformance based on real voice data',
  },
  {
    color: '#22C55E',
    titleKo: '실제 서비스 적용 경험',
    titleEn: 'Proven Service Deployment',
    descKo: '공공 및 산업 현장에서\nAI 시스템 구축 및 운영 경험',
    descEn: 'Experience building and operating\nAI systems in public and industrial fields',
  },
  {
    color: '#8B5CF6',
    titleKo: '다양한 산업 분야 적용',
    titleEn: 'Applied Across Industries',
    descKo: '공공, 상담센터, 돌봄 서비스 등\n다양한 산업 분야에서 AI 기술 적용',
    descEn: 'AI technology applied across public\nservices, call centers, care services,\nand more',
  },
];

/* ── 메인 컴포넌트 ───────────────────────────────────────────────────── */

export function Strength() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* 헤더 */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <h2
            className="font-bold text-[#191F28] leading-[1.3] tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', wordBreak: 'keep-all' }}
          >
            {lang === 'ko' ? (
              <>AI 기술과 데이터로<br />현장의 문제를 해결합니다</>
            ) : (
              <>Solving Real Problems<br />with AI and Data</>
            )}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#6B7280] leading-[1.7] whitespace-nowrap" style={{ wordBreak: 'keep-all' }}>
            {lang === 'ko'
              ? '이노하이는 음성 AI, 데이터 분석, 자동화 기술을 기반으로 공공과 산업 현장의 문제를 해결하는 AI 기업입니다.'
              : 'INNOHI is an AI company solving problems in public and industrial fields with voice AI, data analysis, and automation technology.'}
          </p>
        </motion.div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {strengths.map((item, i) => {
            const AnimIcon = animatedIcons[i];
            return (
              <motion.div
                key={item.titleKo}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className="p-6 sm:p-7 rounded-2xl border border-[#E5E8EB] bg-white hover:shadow-lg hover:border-transparent transition-all duration-300"
              >
                <div className="w-11 h-11 flex items-center justify-center mb-5">
                  <AnimIcon color={item.color} />
                </div>
                <h3 className="text-[16px] sm:text-[17px] font-bold text-[#191F28] mb-3" style={{ wordBreak: 'keep-all' }}>
                  {lang === 'ko' ? item.titleKo : item.titleEn}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#8B95A1] leading-[1.7] whitespace-pre-line">
                  {lang === 'ko' ? item.descKo : item.descEn}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
