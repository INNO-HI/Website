import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Cpu,
  Shield,
  Server,
  Cloud,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const techCategories = [
  {
    id: 'ai',
    icon: Cpu,
    titleKo: '자체 AI',
    titleEn: 'Proprietary AI',
    subtitleKo: '맞춤형 모델',
    subtitleEn: 'Custom Models',
    descriptionKo: '도메인 특화 데이터셋으로 훈련된 신경망이\n전문 워크플로우에서 최고 수준의 정확도를 제공합니다.',
    descriptionEn: 'Neural networks trained on domain-specific datasets deliver superior accuracy for specialized workflows.',
    featuresKo: ['Transformer 아키텍처', '도메인 미세조정', '지속적 학습', '엣지 배포'],
    featuresEn: ['Transformer architecture', 'Domain fine-tuning', 'Continuous learning', 'Edge deployment'],
    specs: [
      { labelKo: '파라미터', labelEn: 'Parameters', value: '70억+' },
      { labelKo: '언어', labelEn: 'Languages', value: '12+' },
      { labelKo: '지연시간', labelEn: 'Latency', value: '<100ms' },
    ],
    color: '#448CFF',
    bgColor: '#EEF4FF',
  },
  {
    id: 'security',
    icon: Shield,
    titleKo: '엔터프라이즈 보안',
    titleEn: 'Enterprise Security',
    subtitleKo: '심층 방어',
    subtitleEn: 'Defense in Depth',
    descriptionKo: '휴식·전송·처리 중인 데이터를 보호하는\n다층 보안 아키텍처를 갖추고 있습니다.',
    descriptionEn: 'Multi-layered security architecture protects data at rest, in transit, and in process.',
    featuresKo: ['종단간 암호화', '제로 트러스트', '접근 감사 로그', '역할 기반 권한'],
    featuresEn: ['End-to-end encryption', 'Zero trust', 'Access audit logs', 'Role-based access'],
    specs: [
      { labelKo: '암호화', labelEn: 'Encryption', value: 'AES-256' },
      { labelKo: '가동률', labelEn: 'Uptime', value: '99.99%' },
      { labelKo: '인증', labelEn: 'Certified', value: '진행 중' },
    ],
    color: '#22C55E',
    bgColor: '#ECFDF5',
  },
  {
    id: 'infrastructure',
    icon: Server,
    titleKo: '확장 가능한 인프라',
    titleEn: 'Scalable Infrastructure',
    subtitleKo: '클라우드 네이티브',
    subtitleEn: 'Cloud Native',
    descriptionKo: '일관된 성능으로 스타트업부터\n엔터프라이즈까지 탄력적으로 확장됩니다.',
    descriptionEn: 'Scales elastically from startups to enterprises with consistent performance.',
    featuresKo: ['자동 확장', '다중 리전', '99.99% SLA', '재해 복구'],
    featuresEn: ['Auto scaling', 'Multi-region', '99.99% SLA', 'Disaster recovery'],
    specs: [
      { labelKo: '리전', labelEn: 'Regions', value: '15+' },
      { labelKo: '처리량', labelEn: 'Throughput', value: '100만+ RPS' },
      { labelKo: '스토리지', labelEn: 'Storage', value: 'PB 규모' },
    ],
    color: '#F59E0B',
    bgColor: '#FFFBEB',
  },
  {
    id: 'deployment',
    icon: Cloud,
    titleKo: '유연한 배포',
    titleEn: 'Flexible Deployment',
    subtitleKo: '선택의 자유',
    subtitleEn: 'Your Rules',
    descriptionKo: '온프레미스·클라우드·하이브리드—\n귀하의 데이터, 귀하의 규칙입니다.',
    descriptionEn: 'On-premises, cloud, or hybrid — your data, your rules.',
    featuresKo: ['온프레미스', '프라이빗 클라우드', '하이브리드', '에어갭'],
    featuresEn: ['On-premises', 'Private cloud', 'Hybrid', 'Air-gapped'],
    specs: [
      { labelKo: '옵션', labelEn: 'Options', value: '3+' },
      { labelKo: '설치', labelEn: 'Setup', value: '<24시간' },
      { labelKo: '마이그레이션', labelEn: 'Migration', value: '무중단' },
    ],
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
  },
];

type TechCategory = typeof techCategories[0];

function InfraBlock({ cat, index, lang }: { cat: TechCategory; index: number; lang: 'ko' | 'en' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  const title = lang === 'ko' ? cat.titleKo : cat.titleEn;
  const subtitle = lang === 'ko' ? cat.subtitleKo : cat.subtitleEn;
  const description = lang === 'ko' ? cat.descriptionKo : cat.descriptionEn;
  const features = lang === 'ko' ? cat.featuresKo : cat.featuresEn;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-20 py-16 lg:py-20 border-b border-[#EAEDF2] last:border-0`}
    >
      {/* 아이콘 패널 */}
      <div className="w-full lg:w-[340px] flex-shrink-0">
        <div
          className="rounded-2xl p-8 flex flex-col items-center justify-center gap-6"
          style={{ background: cat.bgColor }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: cat.color }}
          >
            <cat.icon className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-3 gap-3 w-full">
            {cat.specs.map((spec, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-white/80">
                <div className="text-lg font-black text-[#0F1117]">{spec.value}</div>
                <div className="text-[11px] text-[#777A86] mt-0.5">
                  {lang === 'ko' ? spec.labelKo : spec.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-4">
          <span
            className="inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: cat.color }}
          >
            {subtitle}
          </span>
        </div>
        <h3
          className="font-black text-[#0F1117] mb-4 leading-tight"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.03em' }}
        >
          {title}
        </h3>
        <p className="text-[#4B4E56] leading-relaxed whitespace-pre-line mb-7 text-[17px] font-medium">
          {description}
        </p>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-[15px] text-[#383838] font-medium">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: cat.color }} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Infrastructure() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const { lang } = useLanguage();

  return (
    <section
      id="infrastructure"
      className="relative py-24 lg:py-32 bg-white"
      aria-labelledby="infra-heading"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-6"
        >
          <span className="inline-flex items-center gap-2 text-sm font-bold text-[#448CFF] mb-4">
            <Zap className="w-4 h-4" aria-hidden="true" />
            {lang === 'ko' ? '기술' : 'Technology'}
          </span>
          <h2
            id="infra-heading"
            className="font-black text-[#0F1117] mb-4"
            style={{ fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.3 }}
          >
            {lang === 'ko' ? (
              <>확장 가능하게 설계,<br /><span className="gradient-text">신뢰할 수 있게 구축</span></>
            ) : (
              <>Designed to scale,<br /><span className="gradient-text">built to trust</span></>
            )}
          </h2>
          <p className="text-[#4B4E56] leading-relaxed text-[17px] font-medium">
            {lang === 'ko'
              ? '최첨단 AI와 엔터프라이즈급 보안, 유연한 배포 방식을 결합합니다.'
              : 'Combining cutting-edge AI, enterprise-grade security, and flexible deployment.'}
          </p>
        </motion.div>

        {/* 블록 목록 */}
        <div>
          {techCategories.map((cat, index) => (
            <InfraBlock key={cat.id} cat={cat} index={index} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
