import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, BookOpen, BarChart3, Workflow, CheckCircle2, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

/* ── 솔루션 데이터 ─────────────────────────────────────────────────── */

const solutions = [
  {
    key: 'Voice AI',
    icon: Mic,
    color: '#448CFF',
    bgColor: '#EEF4FF',
    titleKo: '현장의 대화를 기록으로 바꾸는 AI',
    titleEn: 'AI that turns field conversations into records',
    descKo: '상담과 인터뷰 등 현장에서 이루어지는 대화를 실시간으로 인식하고, 기록과 문서로 자동 정리합니다.',
    descEn: 'Recognizes field conversations from consultations and interviews in real-time, automatically organizing them into records and documents.',
    howKo: '현장 종사자가 대상자와 대화를 시작하면, AI가 음성을 실시간으로 텍스트로 변환합니다. 변환된 텍스트에서 핵심 정보(이름, 상태, 요청사항 등)를 자동 추출하고, 상담 기록 양식에 맞게 정리합니다. 현장에서 별도 메모 없이도 상담이 끝나는 순간 기록이 완성됩니다.',
    howEn: 'When a field worker starts a conversation with a client, AI converts speech to text in real-time. It auto-extracts key information (name, status, requests) and organizes it into consultation record formats. Records are complete the moment a consultation ends, without separate note-taking.',
    featuresKo: [
      { title: '현장 특화 음성 인식', desc: '노이즈 환경에서도 높은 정확도의 음성 인식' },
      { title: '상담 기록 자동 생성', desc: '대화 내용을 상담 양식에 맞게 자동 정리' },
      { title: '보고서 형태 변환', desc: '기록된 내용을 행정 보고서 형식으로 변환' },
      { title: '모바일 기반 사용', desc: '현장에서 스마트폰으로 바로 사용 가능' },
    ],
    featuresEn: [
      { title: 'Field-specialized voice recognition', desc: 'High accuracy even in noisy environments' },
      { title: 'Auto consultation record generation', desc: 'Auto-organizes conversations into consultation formats' },
      { title: 'Report format conversion', desc: 'Converts records into administrative report formats' },
      { title: 'Mobile-first usage', desc: 'Use directly on smartphones in the field' },
    ],
    useCasesKo: ['사회복지 현장 상담 기록', '방문간호 인터뷰 기록', '민원 상담 자동 정리'],
    useCasesEn: ['Social welfare field consultation records', 'Home nursing interview records', 'Civil complaint auto-organization'],
    metricsKo: [
      { label: '기록 시간 단축', value: '80%' },
      { label: '음성 인식률', value: '95%+' },
      { label: '문서 자동화율', value: '90%' },
    ],
    metricsEn: [
      { label: 'Record time reduction', value: '80%' },
      { label: 'Voice recognition rate', value: '95%+' },
      { label: 'Document automation rate', value: '90%' },
    ],
  },
  {
    key: 'Knowledge AI',
    icon: BookOpen,
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    titleKo: '문서를 이해하고 답을 찾는 AI',
    titleEn: 'AI that understands documents and finds answers',
    descKo: '내부 매뉴얼과 정책 문서를 기반으로 질문 의도를 이해하고, 필요한 정보를 빠르게 제공합니다.',
    descEn: 'Understands question intent based on internal manuals and policy documents, quickly providing the information needed.',
    howKo: '담당자가 업무 중 궁금한 점을 자연어로 질문하면, AI가 내부 문서(매뉴얼, 지침, 규정 등)를 검색하여 관련 내용을 찾습니다. 단순 키워드 매칭이 아닌 질문의 맥락과 의도를 이해하여, 출처와 근거를 함께 제시하는 답변을 생성합니다.',
    howEn: 'When staff ask questions in natural language during work, AI searches internal documents (manuals, guidelines, regulations) for relevant content. Beyond simple keyword matching, it understands the context and intent of questions, generating answers with sources and evidence.',
    featuresKo: [
      { title: 'RAG 기반 문서 검색', desc: '대규모 문서에서 관련 정보를 정확하게 검색' },
      { title: '근거 기반 답변 생성', desc: '출처와 함께 신뢰할 수 있는 답변 제공' },
      { title: '상담 지식 축적', desc: '반복 질문 패턴을 학습하여 답변 품질 향상' },
      { title: '정책 문서 탐색', desc: '복잡한 규정과 제도를 쉽게 찾고 이해' },
    ],
    featuresEn: [
      { title: 'RAG-based document search', desc: 'Accurately finds relevant info from large documents' },
      { title: 'Evidence-based answer generation', desc: 'Provides reliable answers with sources' },
      { title: 'Consultation knowledge accumulation', desc: 'Improves answer quality by learning question patterns' },
      { title: 'Policy document navigation', desc: 'Easily find and understand complex regulations' },
    ],
    useCasesKo: ['정책·규정 즉시 검색', '신규 직원 업무 가이드', '민원 응대 매뉴얼 검색'],
    useCasesEn: ['Instant policy & regulation search', 'New employee work guide', 'Citizen service manual search'],
    metricsKo: [
      { label: '검색 응답 시간', value: '<3초' },
      { label: '답변 정확도', value: '92%' },
      { label: '문서 처리량', value: '10만+건' },
    ],
    metricsEn: [
      { label: 'Search response time', value: '<3s' },
      { label: 'Answer accuracy', value: '92%' },
      { label: 'Documents processed', value: '100K+' },
    ],
  },
  {
    key: 'Decision AI',
    icon: BarChart3,
    color: '#38BDF8',
    bgColor: '#F0F9FF',
    titleKo: '데이터에서 위험 신호를 찾는 AI',
    titleEn: 'AI that finds risk signals in data',
    descKo: '대규모 데이터를 분석하여 패턴과 위험 신호를 탐지하고, 의사결정을 지원합니다.',
    descEn: 'Analyzes large-scale data to detect patterns and risk signals, supporting decision-making.',
    howKo: '축적된 행정 데이터와 상담 기록을 AI가 분석합니다. 머신러닝 모델이 데이터 속 패턴을 학습하고, 위험 수준을 분류하며, 선제적 조치가 필요한 케이스를 자동으로 식별합니다. 분석 결과는 시각화된 대시보드로 제공되어 빠른 의사결정이 가능합니다.',
    howEn: 'AI analyzes accumulated administrative data and consultation records. Machine learning models learn patterns in data, classify risk levels, and automatically identify cases requiring preemptive action. Results are delivered through visualized dashboards for quick decision-making.',
    featuresKo: [
      { title: '데이터 기반 분류 모델', desc: '대규모 데이터에서 패턴을 학습하여 자동 분류' },
      { title: '위험도 예측', desc: '위험 신호를 사전에 탐지하여 선제 대응' },
      { title: '데이터 분석 및 시각화', desc: '복잡한 데이터를 이해하기 쉬운 대시보드로 제공' },
      { title: '정책 판단 지원', desc: '데이터 근거 기반의 의사결정 지원' },
    ],
    featuresEn: [
      { title: 'Data-driven classification models', desc: 'Auto-classifies by learning patterns from large data' },
      { title: 'Risk prediction', desc: 'Detects risk signals in advance for preemptive response' },
      { title: 'Data analysis & visualization', desc: 'Presents complex data in easy-to-understand dashboards' },
      { title: 'Policy decision support', desc: 'Supports evidence-based decision-making' },
    ],
    useCasesKo: ['위기 가구 조기 발견', '복지 사각지대 탐지', '정책 효과 분석'],
    useCasesEn: ['Early detection of at-risk households', 'Welfare blind spot detection', 'Policy effectiveness analysis'],
    metricsKo: [
      { label: '위험 탐지율', value: '94%' },
      { label: '분석 처리량', value: '100만+건' },
      { label: '예측 정확도', value: '91%' },
    ],
    metricsEn: [
      { label: 'Risk detection rate', value: '94%' },
      { label: 'Analysis throughput', value: '1M+' },
      { label: 'Prediction accuracy', value: '91%' },
    ],
  },
  {
    key: 'Workflow AI',
    icon: Workflow,
    color: '#6366F1',
    bgColor: '#EEF2FF',
    titleKo: '현장의 업무 흐름을 자동화하는 AI',
    titleEn: 'AI that automates field workflows',
    descKo: '상담 이후 이루어지는 기록, 정리, 보고, 서식 작성 등의 반복 업무를 자동화합니다.',
    descEn: 'Automates repetitive tasks after consultations including recording, organizing, reporting, and form filling.',
    howKo: '상담이 종료되면 AI가 후속 행정 업무를 자동으로 처리합니다. 상담 내용을 기반으로 필요한 서식을 자동 작성하고, 보고서를 생성하며, 다음 일정과 후속 조치를 정리합니다. 담당자는 행정 업무 대신 대상자에게 집중할 수 있습니다.',
    howEn: 'After consultations end, AI automatically handles follow-up administrative tasks. Based on consultation content, it auto-fills required forms, generates reports, and organizes next schedules and follow-up actions. Staff can focus on clients instead of paperwork.',
    featuresKo: [
      { title: '문서 자동 작성', desc: '상담 내용 기반 문서 자동 생성' },
      { title: '서식 자동 입력', desc: '행정 서식에 필요한 정보 자동 입력' },
      { title: '보고서 자동 생성', desc: '행정 보고 양식에 맞는 보고서 생성' },
      { title: '업무 프로세스 자동화', desc: '반복 업무 흐름 전체를 자동화' },
    ],
    featuresEn: [
      { title: 'Auto document creation', desc: 'Auto-generates documents from consultation content' },
      { title: 'Auto form filling', desc: 'Auto-fills required info into admin forms' },
      { title: 'Auto report generation', desc: 'Generates reports matching admin report formats' },
      { title: 'Business process automation', desc: 'Automates entire repetitive workflow processes' },
    ],
    useCasesKo: ['상담 후 행정 서류 자동 작성', '월간 업무 보고서 생성', '후속 조치 일정 관리'],
    useCasesEn: ['Auto admin paperwork after consultations', 'Monthly work report generation', 'Follow-up action scheduling'],
    metricsKo: [
      { label: '행정 업무 절감', value: '70%' },
      { label: '서식 작성 시간', value: '1/5' },
      { label: '보고서 정확도', value: '97%' },
    ],
    metricsEn: [
      { label: 'Admin work reduction', value: '70%' },
      { label: 'Form fill time', value: '1/5' },
      { label: 'Report accuracy', value: '97%' },
    ],
  },
];

/* ── 개별 솔루션 블록 ─────────────────────────────────────────────── */

function SolutionBlock({ item, index, lang }: { item: typeof solutions[number]; index: number; lang: 'ko' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const features = lang === 'ko' ? item.featuresKo : item.featuresEn;
  const useCases = lang === 'ko' ? item.useCasesKo : item.useCasesEn;
  const metrics = lang === 'ko' ? item.metricsKo : item.metricsEn;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`py-16 sm:py-20 lg:py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FD]'}`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: item.color }}
          >
            <item.icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-[17px] font-bold" style={{ color: item.color }}>
            {item.key}
          </span>
        </div>

        <h2
          className="font-bold text-[#191F28] leading-[1.25] mb-4 tracking-tight"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', wordBreak: 'keep-all' }}
        >
          {lang === 'ko' ? item.titleKo : item.titleEn}
        </h2>

        <p className="text-[16px] text-[#4E5968] leading-relaxed mb-10 max-w-3xl" style={{ wordBreak: 'keep-all' }}>
          {lang === 'ko' ? item.descKo : item.descEn}
        </p>

        {/* 2단 레이아웃: 작동방식 + 기대효과 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
          {/* 작동 방식 (3/5) */}
          <div className="lg:col-span-3 rounded-2xl p-6 sm:p-8" style={{ background: item.bgColor }}>
            <p className="text-[13px] font-semibold mb-3" style={{ color: item.color }}>
              {lang === 'ko' ? '작동 방식' : 'How it works'}
            </p>
            <p className="text-[15px] text-[#4E5968] leading-[1.85]" style={{ wordBreak: 'keep-all' }}>
              {lang === 'ko' ? item.howKo : item.howEn}
            </p>
          </div>

          {/* 기대 효과 (2/5) */}
          <div className="lg:col-span-2 rounded-2xl border border-[#E5E8EB] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4" style={{ color: item.color }} />
                <p className="text-[13px] font-semibold" style={{ color: item.color }}>
                  {lang === 'ko' ? '기대 효과' : 'Expected Impact'}
                </p>
              </div>
              <div className="space-y-4">
                {metrics.map((m, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[13px] text-[#8B95A1]">{m.label}</span>
                      <span className="text-[20px] font-bold" style={{ color: item.color }}>{m.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#F1F3F5] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: '100%' } : {}}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                        className="h-full rounded-full"
                        style={{ background: item.color, maxWidth: i === 0 ? '80%' : i === 1 ? '95%' : '90%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 주요 기능 2x2 그리드 */}
        <p className="text-[13px] font-semibold text-[#191F28] mb-4">
          {lang === 'ko' ? '주요 기능' : 'Key Features'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="p-5 rounded-xl border border-[#E5E8EB] bg-white"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                <h4 className="text-[14px] font-bold text-[#191F28]">{f.title}</h4>
              </div>
              <p className="text-[13px] text-[#8B95A1] leading-relaxed" style={{ wordBreak: 'keep-all' }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 활용 사례 */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[13px] font-semibold text-[#191F28]">
            {lang === 'ko' ? '활용 사례' : 'Use Cases'}
          </span>
          {useCases.map((uc, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-full"
              style={{ background: item.bgColor, color: item.color }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {uc}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

/* ── 메인 컴포넌트 ─────────────────────────────────────────────────── */

export function HowItWorks() {
  const { lang } = useLanguage();

  return (
    <section id="how-it-works" aria-labelledby="hiw-heading">
      {/* 4개 솔루션 상세 */}
      {solutions.map((item, i) => (
        <SolutionBlock key={item.key} item={item} index={i} lang={lang} />
      ))}
    </section>
  );
}
