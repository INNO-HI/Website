import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Search, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { references } from '@/sections/UseCases';

import kepcoMcsLogo from '@/assets/partners/kepco-mcs.png';
import donggukLogo from '@/assets/partners/dongguk.png';
import bodymapLogo from '@/assets/partners/bodymap.png';
import seoulAiLogo from '@/assets/partners/seoul-ai.jpg';
import yangcheonLogo from '@/assets/partners/yangcheon.jpg';
import ssisLogo from '@/assets/partners/ssis.svg';

// ── Case Study 메타 데이터 ────────────────────────────────────────────

export const caseStudyMeta = [
  {
    id: 'kepco-mcs',
    ref: 0,
    tagKo: '돌봄 · 음성 AI', tagEn: 'Care · Voice AI',
    category: 'care',
    brandColor: '#1a8f9b',
    clientKo: '한전MCS', clientEn: 'KEPCO MCS',
    industryKo: '돌봄 / 공공', industryEn: 'Care / Public',
    heroTitleKo: 'AI 기반 돌봄 상담 기록 자동화',
    heroTitleEn: 'AI-Powered Care Consultation Recording Automation',
    heroDescKo: '현장 상담 내용을 음성으로 인식하고 자동으로 기록 · 요약 · 보고서를 생성하는 돌봄 행정 자동화 AI',
    heroDescEn: 'Care administration AI that recognizes consultation speech and automatically generates records, summaries, and reports',
    metrics: [
      { valueKo: '70%', valueEn: '70%', labelKo: '기록 시간 단축', labelEn: 'Record Time Reduced' },
      { valueKo: '3배', valueEn: '3x', labelKo: '상담 집중 시간', labelEn: 'Consultation Focus' },
    ],
    challengeKo: [
      '현장 상담 후 수기 기록, 보고서 작성 등 반복 행정 업무 과중',
      '상담 이후 일정 정리, 복지 서비스 검토까지 다단계 수작업',
      '행정 업무로 인해 대상자와의 상담 시간 부족',
    ],
    challengeEn: [
      'Excessive repetitive administrative work including manual recording and report writing after consultations',
      'Multi-step manual process from schedule organization to welfare service review',
      'Insufficient consultation time with clients due to administrative burden',
    ],
    solutionKo: [
      '노인 특화 음성 인식 기반 상담 내용 자동 기록',
      '행정 보고 형식에 맞춘 기록 요약 및 문서 자동 생성',
      '상담 내용 기반 복지 서비스 자동 추천',
      '현장 업무 흐름에 맞춘 모바일 중심 UX',
    ],
    solutionEn: [
      'Elderly-specialized voice recognition for automatic consultation recording',
      'Auto-summarization and document generation in administrative report format',
      'Automatic welfare service recommendations based on consultation content',
      'Mobile-first UX designed for field workflows',
    ],
    resultsKo: [
      '상담 이후 반복 행정 시간 대폭 단축',
      '돌봄 기록의 일관성과 정확도 향상',
      '현장 종사자의 업무 부담 경감',
      '상담 품질 향상 및 서비스 연계 효율 증대',
    ],
    resultsEn: [
      'Significantly reduced repetitive administrative time after consultations',
      'Improved consistency and accuracy of care records',
      'Reduced workload burden for field workers',
      'Enhanced consultation quality and service linkage efficiency',
    ],
    quoteKo: '"AI 도입 이후 상담 기록 시간이 크게 줄었고,\n현장 상담에 더 집중할 수 있게 되었습니다."',
    quoteEn: '"Since adopting AI, documentation time has significantly decreased,\nand we can now focus more on field consultations."',
    quoteAuthorKo: '한전MCS 관계자',
    quoteAuthorEn: 'KEPCO MCS Representative',
    // ── 스토리 섹션 ──
    storyProblemTitleKo: '현장에서 발견된 문제',
    storyProblemTitleEn: 'Problems Discovered in the Field',
    storyProblemKo: '현장 종사자들은 상담 이후에도 상당한 시간을 행정 업무에 사용해야 했습니다.\n\n상담 내용 기록, 일정 정리, 보고서 작성, 복지 서비스 검토 등 여러 단계의 업무가 반복되면서 실제 상담 시간보다 행정 업무 비중이 점점 커지는 문제가 발생했습니다.\n\n특히 돌봄 현장에서는 상담 대상자와의 대화 내용이 중요한데, 상담 이후 기록 업무가 길어질수록 현장 종사자들의 업무 부담도 함께 증가하게 됩니다.\n\n이러한 문제는 단순히 업무 효율의 문제가 아니라 현장 돌봄 서비스의 품질과도 연결되는 중요한 과제였습니다.',
    storyProblemEn: 'Field workers had to spend significant time on administrative tasks even after consultations.\n\nWith consultation recording, schedule management, report writing, and welfare service review repeating across multiple steps, administrative work began to outweigh actual consultation time.\n\nIn care settings, conversations with clients are particularly important, but as post-consultation documentation grows longer, the burden on field workers increases proportionally.\n\nThis was not simply an efficiency issue—it was a critical challenge directly connected to the quality of on-site care services.',
    storyHighlightKo: '상담보다 기록이 더 오래 걸리는 구조가\n돌봄 현장의 가장 큰 문제였습니다.',
    storyHighlightEn: 'A structure where documentation takes longer than consultation\nwas the biggest problem in the care field.',
    storyApproachTitleKo: 'AI로 상담 기록을 자동화하다',
    storyApproachTitleEn: 'Automating Consultation Records with AI',
    storyApproachKo: '이노하이는 상담 내용을 음성 기반으로 자동 기록하는 방식을 도입했습니다.\n\n현장 상담 내용을 AI가 실시간으로 인식하고 이를 행정 기록 형식에 맞게 자동 정리합니다.\n\n상담 이후에는 상담 기록 요약, 행정 보고 문서 생성, 상담 내용 기반 복지 서비스 검토까지 이어지는 행정 흐름이 자동으로 연결됩니다.\n\n이를 통해 현장 종사자는 상담 이후 별도의 기록 정리 업무에 시간을 쓰지 않아도 됩니다.',
    storyApproachEn: 'INNOHI introduced a voice-based automatic recording system for consultation content.\n\nAI recognizes field consultation content in real-time and automatically organizes it into administrative record formats.\n\nAfter consultations, the administrative workflow—from record summarization to report generation to welfare service review—is automatically connected.\n\nThis allows field workers to skip separate documentation tasks after consultations entirely.',
    storySystemTitleKo: '현장 중심으로 설계된 시스템',
    storySystemTitleEn: 'A System Designed Around the Field',
    storySystemKo: '이 시스템은 기술 중심이 아니라 현장 업무 흐름을 기준으로 설계되었습니다.\n\n특히 다음 요소들이 중요하게 고려되었습니다.',
    storySystemEn: 'This system was designed around field workflows, not technology.\n\nThe following elements were given special consideration.',
    storySystemPointsKo: ['노인 상담 환경에 맞춘 음성 인식', '행정 보고 형식에 맞춘 기록 구조', '모바일 중심 상담 기록 UX', '상담 내용 기반 복지 서비스 연계'],
    storySystemPointsEn: ['Voice recognition tailored for elderly consultation environments', 'Record structure aligned with administrative report formats', 'Mobile-first consultation recording UX', 'Welfare service linkage based on consultation content'],
    storySystemOutroKo: '이를 통해 현장에서 자연스럽게 사용할 수 있는 돌봄 행정 자동화 시스템을 구현했습니다.',
    storySystemOutroEn: 'This resulted in a care administration automation system that can be naturally adopted in the field.',
    storyChangeTitleKo: '실제 현장 변화',
    storyChangeTitleEn: 'Real Changes in the Field',
    storyChangeKo: 'AI 도입 이후 가장 크게 변화한 부분은 상담 기록에 소요되는 시간이었습니다.\n\n기존에는 상담 이후 기록 정리와 보고서 작성에 상당한 시간이 필요했지만, AI 도입 이후 기록 작업이 자동화되면서 현장 종사자들이 상담 자체에 더 집중할 수 있게 되었습니다.',
    storyChangeEn: 'The most significant change after AI adoption was the time spent on consultation documentation.\n\nPreviously, considerable time was needed for post-consultation record organization and report writing. After AI adoption, documentation was automated, allowing field workers to focus more on consultations themselves.',
    storyMetricsOutroKo: '또한 상담 기록의 형식이 표준화되면서 기록의 일관성과 정확도도 함께 향상되었습니다.',
    storyMetricsOutroEn: 'Additionally, standardization of record formats improved both consistency and accuracy of documentation.',
    storyClosingTitleKo: '돌봄 행정 자동화의 가능성',
    storyClosingTitleEn: 'The Potential of Care Administration Automation',
    storyClosingKo: '돌봄 서비스는 사람과의 관계가 가장 중요한 영역입니다.\n\n하지만 현실에서는 상담 이후 행정 업무가 늘어나면서 현장 종사자의 부담이 계속 증가하고 있습니다.\n\nAI 기반 상담 기록 자동화는 이러한 문제를 해결하고 현장 종사자가 사람에게 더 집중할 수 있도록 돕는 새로운 돌봄 행정 인프라가 될 수 있습니다.',
    storyClosingEn: 'Care services are a field where human relationships matter most.\n\nYet in reality, growing post-consultation administrative work continues to increase the burden on field workers.\n\nAI-powered consultation record automation can become a new care administration infrastructure that solves these problems and helps field workers focus more on people.',
  },
  {
    id: 'ssis-classification',
    ref: 1,
    tagKo: '복지 · AI 분류', tagEn: 'Welfare · AI Classification',
    category: 'public',
    brandColor: '#2563EB',
    clientKo: '한국사회보장정보원', clientEn: 'SSIS',
    industryKo: '복지 / 공공', industryEn: 'Welfare / Public',
    heroTitleKo: 'AI 기반 고독사 판별 이진 분류 모델',
    heroTitleEn: 'AI-Based Solitary Death Binary Classification Model',
    heroDescKo: '변사 사건 데이터를 분석해 고독사 여부를 판별하고, 담당자의 검수 부담을 줄이는 AI 이진 분류 모델',
    heroDescEn: 'AI binary classification model that analyzes unnatural death case data to determine solitary death and reduce reviewer workload',
    metrics: [
      { valueKo: '96.77%', valueEn: '96.77%', labelKo: 'Test Recall', labelEn: 'Test Recall' },
      { valueKo: '13.8%', valueEn: '13.8%', labelKo: '필요 검수 비율', labelEn: 'Review Rate Required' },
      { valueKo: '84%', valueEn: '84%', labelKo: '검수 부담 절감', labelEn: 'Review Burden Reduced' },
    ],
    challengeKo: [
      '사건개요 텍스트와 여러 정보를 담당자가 직접 읽고 고독사 여부를 판정',
      '검토자에 따라 동일 사건에 다른 결론이 나오는 판정 편차',
      '고독사를 놓치지 않기 위해 전수 검수에 가까운 비효율 반복',
    ],
    challengeEn: [
      'Reviewers manually reading case summaries and multiple data points to determine solitary death',
      'Judgment variance where different reviewers reach different conclusions on the same case',
      'Near-complete manual review required to avoid missing solitary death cases',
    ],
    solutionKo: [
      '57,145건 변사 데이터 기반 이진 분류 AI 모델 개발',
      '사건개요 텍스트와 원시변수·파생변수를 결합한 판별 구조',
      'Recall 중심의 실무형 평가 체계 설계',
      '판별 결과와 함께 근거를 제시하는 설명 가능한 AI 구조',
    ],
    solutionEn: [
      'Binary classification AI model developed from 57,145 unnatural death cases',
      'Classification structure combining case summaries with raw and derived variables',
      'Recall-focused practical evaluation framework',
      'Explainable AI structure presenting evidence alongside classification results',
    ],
    resultsKo: ['목표 Recall 95% 기준 Test Recall 96.77% 달성', '전체 사건의 13.8%만 검수하는 구조 검증', '기존 대비 84% 수준 검수 부담 절감', '판별 근거 제시를 통한 검토 일관성 확보'],
    resultsEn: ['Achieved Test Recall 96.77% against 95% target', 'Verified structure requiring review of only 13.8% of all cases', '84% reduction in review burden compared to existing process', 'Improved review consistency through evidence-based classification'],
    quoteKo: '"AI가 사건별 위험도를 먼저 제시해 주기 때문에\n담당자가 꼭 봐야 할 사례에 더 집중할 수 있습니다."',
    quoteEn: '"Because AI presents risk levels for each case first,\nreviewers can focus more on the cases that truly need attention."',
    quoteAuthorKo: '프로젝트 관계자',
    quoteAuthorEn: 'Project Representative',
    // ── 스토리 섹션 ──
    storyProblemTitleKo: '현장에서 발견된 문제',
    storyProblemTitleEn: 'Problems Discovered in the Field',
    storyProblemKo: '고독사 판정은 단순한 행정 절차가 아니라, 통계의 신뢰도와 정책의 방향을 결정하는 중요한 과정입니다.\n\n하지만 기존 현장에서는 사건개요 텍스트와 여러 정보를 담당자가 직접 읽고, 경험과 판단에 따라 고독사 여부를 검토해야 했습니다. 이 과정은 많은 시간과 인력이 필요할 뿐 아니라, 동일한 사건도 검토자에 따라 다른 결론이 나올 수 있다는 한계를 안고 있었습니다.\n\n특히 전체 변사 데이터 중 고독사는 일부에 불과하지만, 놓치지 않기 위해서는 대부분의 사건을 직접 확인해야 했습니다. 결국 현장에서는 전수 검수에 가까운 비효율과 판정 편차가 반복되고 있었습니다.',
    storyProblemEn: 'Solitary death determination is not a simple administrative procedure—it is a critical process that shapes statistical reliability and policy direction.\n\nHowever, in the existing workflow, reviewers had to manually read case summaries and multiple data points, making judgments based on experience. This required significant time and personnel, and the same case could yield different conclusions depending on the reviewer.\n\nWhile solitary deaths represent only a fraction of all unnatural death cases, nearly all cases had to be manually reviewed to avoid missing any. The result was a cycle of near-complete manual review and inconsistent judgments.',
    storyHighlightKo: '고독사를 놓치지 않으면서\n검수 부담을 줄이는 것이 현장의 가장 큰 과제였습니다.',
    storyHighlightEn: 'Reducing review burden without missing solitary deaths\nwas the field\'s biggest challenge.',
    storyApproachTitleKo: 'AI로 고독사 여부를 판별하다',
    storyApproachTitleEn: 'Determining Solitary Death with AI',
    storyApproachKo: '이노하이는 변사 사건 데이터를 기반으로 고독사 여부를 판별하는 AI 이진 분류 모델을 개발했습니다.\n\n사건개요 텍스트와 원시변수, 그리고 현장 판단 기준을 반영해 설계한 파생변수를 함께 활용하여 각 사건에 대한 고독사 확률을 산출합니다. 이를 통해 담당자는 전체 사건을 일일이 확인하는 대신, AI가 제시한 고위험 사건을 중심으로 검수할 수 있습니다.\n\n이 모델의 목적은 단순한 자동 판정이 아니라, 고독사를 놓치지 않으면서도 사람이 꼭 봐야 할 사건에 검수 역량을 집중하도록 돕는 것입니다.',
    storyApproachEn: 'INNOHI developed an AI binary classification model that determines solitary death from unnatural death case data.\n\nIt calculates solitary death probability for each case by combining case summary text, raw variables, and derived variables designed to reflect field judgment criteria. This allows reviewers to focus on high-risk cases flagged by AI rather than manually checking every case.\n\nThe model\'s purpose is not simple automated judgment, but helping concentrate review capacity on cases that truly need human attention—without missing any solitary deaths.',
    storySystemTitleKo: '데이터 기반 판별 체계',
    storySystemTitleEn: 'Data-Driven Classification System',
    storySystemKo: '이 모델은 단순 키워드 탐지나 규칙 기반 분류가 아니라, 실제 현장 데이터와 도메인 지식을 반영한 판별 체계입니다.\n\n특히 다음 요소들이 중요하게 반영되었습니다.',
    storySystemEn: 'This model is not simple keyword detection or rule-based classification, but a classification system reflecting actual field data and domain knowledge.\n\nThe following elements were given special consideration.',
    storySystemPointsKo: ['사건개요 텍스트를 구조화한 파생변수 설계', '원시변수 22개와 파생변수 45개를 결합한 판별 구조', 'Recall 중심의 실무형 평가 체계', '판별 결과와 함께 근거를 제시하는 설명 가능한 AI 구조'],
    storySystemPointsEn: ['Derived variable design structuring case summary text', 'Classification structure combining 22 raw variables and 45 derived variables', 'Recall-focused practical evaluation framework', 'Explainable AI structure presenting evidence alongside results'],
    storySystemOutroKo: '이를 통해 담당자의 경험과 직관에만 의존하던 판정 과정을, 데이터 기반의 일관된 판단 체계로 전환할 수 있었습니다.',
    storySystemOutroEn: 'This transformed the judgment process—previously dependent solely on reviewer experience and intuition—into a consistent, data-driven classification system.',
    storyChangeTitleKo: '실제 현장 변화',
    storyChangeTitleEn: 'Real Changes in the Field',
    storyChangeKo: 'AI 모델 도입 이후 가장 크게 달라진 것은 검수 방식이었습니다.\n\n기존에는 대부분의 사건을 사람이 직접 읽고 검토해야 했지만, AI가 사건별 확률값을 먼저 제시하면서 담당자는 필요한 사건에 집중해 검수할 수 있게 되었습니다. 목표 Recall 95% 기준으로 실제 Test Recall 96.77%를 달성했고, 전체 57,145건 중 13.8%만 검수해도 되는 구조를 검증했습니다.\n\n또한 판별 결과와 함께 판단 근거를 제시할 수 있어, 검토 과정의 일관성과 설명 가능성도 함께 높일 수 있었습니다.',
    storyChangeEn: 'The most significant change after AI model adoption was the review process itself.\n\nPreviously, most cases required manual reading and review. With AI presenting probability scores for each case first, reviewers can now focus on the cases that need attention. Against a target Recall of 95%, the model achieved a Test Recall of 96.77%, verifying a structure where only 13.8% of 57,145 total cases require review.\n\nAdditionally, by presenting classification evidence alongside results, the consistency and explainability of the review process were also improved.',
    storyMetricsOutroKo: '데이터 기반 판별이 적용되면서, 담당자의 반복 검수 부담은 줄이고 고독사 누락 위험은 최소화하는 실무형 운영 구조를 만들 수 있었습니다.',
    storyMetricsOutroEn: 'With data-driven classification in place, a practical operating structure was established that reduces repetitive review burden while minimizing the risk of missing solitary deaths.',
    storyClosingTitleKo: '공공 복지 AI의 다음 가능성',
    storyClosingTitleEn: 'The Next Possibility for Public Welfare AI',
    storyClosingKo: '이번 PoC는 고독사 여부를 판별하는 사후 분류 모델이지만, 그 의미는 단순한 자동 판정을 넘어섭니다.\n\n판별 과정에서 확인된 핵심 변수와 운영 방식은 향후 복지 데이터와 연계될 경우, 사후 판별을 넘어 사전 예방 인프라로 확장될 수 있습니다.\n\n즉, 이번 모델은 현장의 검수 효율을 높이는 동시에, 앞으로의 예방 정책을 위한 데이터 기반 구조의 출발점이 될 수 있습니다.',
    storyClosingEn: 'This PoC is a post-mortem classification model for determining solitary death, but its significance goes beyond simple automated judgment.\n\nThe key variables and operational methods identified through the classification process can, when linked with welfare data in the future, expand beyond post-mortem classification into preventive infrastructure.\n\nIn other words, this model improves field review efficiency while serving as a starting point for data-driven structures that support future prevention policies.',
  },
  {
    id: 'yangcheon-civil',
    ref: 2,
    tagKo: '민원 · 음성 AI', tagEn: 'Civil · Voice AI',
    category: 'stt',
    brandColor: '#a93746',
    clientKo: '양천구청', clientEn: 'Yangcheon District',
    industryKo: '민원 행정', industryEn: 'Civil Admin',
    heroTitleKo: 'AI 대화형 민원 접수 자동화',
    heroTitleEn: 'AI Conversational Civil Petition Automation',
    heroDescKo: '민원인의 발화를 음성으로 인식하고 서식 작성부터 제출까지 연결하는 대화형 민원 접수 AI',
    heroDescEn: 'Conversational AI that recognizes petitioner speech and connects form filling through to submission',
    metrics: [
      { valueKo: '60%', valueEn: '60%', labelKo: '민원 처리 시간 단축', labelEn: 'Processing Time Reduced' },
      { valueKo: '90%', valueEn: '90%', labelKo: '서식 오류 감소', labelEn: 'Form Error Reduction' },
    ],
    challengeKo: ['민원 처리 과정의 반복 입력, 서식 작성 등 수작업 과다', '서식 오류 및 누락으로 재처리 발생', '시민의 행정 서비스 접근성 제한'],
    challengeEn: ['Excessive manual work including repetitive input and form filling', 'Reprocessing due to form errors and omissions', 'Limited citizen accessibility to administrative services'],
    solutionKo: ['민원 발화 자동 인식 및 내용 요약', '서식 자동 작성 및 입력 보조', '전자서명 및 제출 흐름 지원', '비정형 발화를 행정 문서로 구조화'],
    solutionEn: ['Automatic recognition and summarization of petition speech', 'Auto form generation and input assistance', 'Electronic signature and submission flow support', 'Structuring unstructured speech into administrative documents'],
    resultsKo: ['민원 처리 시간 대폭 단축', '서식 오류 및 누락 감소', '공무원의 반복 업무 부담 경감', '시민 접근성과 행정 편의성 향상'],
    resultsEn: ['Significantly reduced petition processing time', 'Fewer form errors and omissions', 'Reduced repetitive workload for public servants', 'Improved citizen accessibility and convenience'],
    quoteKo: '"민원인이 말씀하시면 AI가 자동으로 정리해 주니\n접수 시간이 크게 줄고 정확도도 높아졌습니다."',
    quoteEn: '"When petitioners speak, AI automatically organizes everything,\ngreatly reducing filing time and improving accuracy."',
    quoteAuthorKo: '양천구청 민원봉사과 담당자',
    quoteAuthorEn: 'Yangcheon District Civil Service Staff',
    // ── 스토리 섹션 ──
    storyProblemTitleKo: '현장에서 발견된 문제',
    storyProblemTitleEn: 'Problems Discovered in the Field',
    storyProblemKo: '민원 접수 현장에서는 시민이 구두로 설명한 내용을 담당자가 직접 정리하고 서식에 입력하는 과정이 반복되었습니다.\n\n이 과정에서 내용 누락, 서식 오류, 재입력 등의 문제가 빈번하게 발생했습니다.\n\n특히 행정 서식에 익숙하지 않은 시민의 경우 접수 자체에 어려움을 겪는 경우도 많았습니다.\n\n이러한 문제는 민원 처리 시간을 늘리고, 담당자의 반복 업무 부담을 가중시키는 주요 원인이었습니다.',
    storyProblemEn: 'At civil petition counters, staff repeatedly had to manually organize verbal explanations from citizens and enter them into forms.\n\nThis process frequently led to content omissions, form errors, and re-entry issues.\n\nCitizens unfamiliar with administrative forms often struggled with the filing process itself.\n\nThese problems were a major cause of increased processing time and growing repetitive workload burden for staff.',
    storyHighlightKo: '말로 설명하면 끝나야 할 민원이\n서식과 절차 때문에 복잡해지고 있었습니다.',
    storyHighlightEn: 'Petitions that should end with a verbal explanation\nwere being complicated by forms and procedures.',
    storyApproachTitleKo: 'AI로 민원 접수를 자동화하다',
    storyApproachTitleEn: 'Automating Civil Petition Filing with AI',
    storyApproachKo: '이노하이는 민원인의 발화를 AI가 실시간으로 인식하고, 이를 행정 서식에 맞게 자동으로 정리·작성하는 대화형 민원 접수 시스템을 구축했습니다.\n\n시민이 말로 설명하면 AI가 내용을 구조화하고, 필요한 서식을 자동으로 작성하며, 전자서명과 제출까지 이어지는 흐름을 지원합니다.\n\n이를 통해 민원 접수 과정에서 발생하던 반복 입력과 서식 오류를 크게 줄일 수 있었습니다.',
    storyApproachEn: 'INNOHI built a conversational petition filing system where AI recognizes petitioner speech in real-time and automatically organizes and fills administrative forms.\n\nWhen citizens explain verbally, AI structures the content, automatically fills required forms, and supports the flow through electronic signatures to submission.\n\nThis significantly reduced repetitive input and form errors that occurred during the petition filing process.',
    storySystemTitleKo: '시민 중심으로 설계된 접수 시스템',
    storySystemTitleEn: 'A Filing System Designed Around Citizens',
    storySystemKo: '이 시스템은 행정 편의가 아니라 시민의 접근성을 기준으로 설계되었습니다.\n\n특히 다음 요소들이 중요하게 고려되었습니다.',
    storySystemEn: 'This system was designed around citizen accessibility, not administrative convenience.\n\nThe following elements were given special consideration.',
    storySystemPointsKo: ['민원 발화 자동 인식 및 내용 요약', '서식 자동 작성 및 입력 보조', '전자서명 및 제출 흐름 지원', '비정형 발화를 행정 문서 형태로 구조화'],
    storySystemPointsEn: ['Automatic recognition and summarization of petition speech', 'Auto form generation and input assistance', 'Electronic signature and submission flow support', 'Structuring unstructured speech into administrative document format'],
    storySystemOutroKo: '이를 통해 시민이 말로 설명하는 것만으로 민원 접수가 완료되는, 보다 쉬운 행정 서비스를 구현했습니다.',
    storySystemOutroEn: 'This created an easier administrative service where citizens can complete petition filing simply by speaking.',
    storyChangeTitleKo: '실제 현장 변화',
    storyChangeTitleEn: 'Real Changes in the Field',
    storyChangeKo: 'AI 도입 이후 가장 크게 변화한 부분은 민원 접수에 소요되는 시간이었습니다.\n\n기존에는 내용 정리, 서식 작성, 검토와 수정까지 여러 단계를 거쳐야 했지만, AI 도입 이후 대부분의 과정이 자동화되면서 접수 시간이 크게 단축되었습니다.\n\n서식 오류와 누락도 감소하면서 재처리율이 낮아지고, 담당자의 반복 업무 부담도 경감되었습니다.',
    storyChangeEn: 'The most significant change after AI adoption was the time required for petition filing.\n\nPreviously, multiple steps were needed from content organization to form filling to review and revision. After AI adoption, most processes were automated, dramatically reducing filing time.\n\nForm errors and omissions also decreased, lowering reprocessing rates and reducing repetitive workload burden for staff.',
    storyMetricsOutroKo: '시민의 행정 서비스 접근성이 향상되면서 민원 만족도도 함께 높아졌습니다.',
    storyMetricsOutroEn: 'As citizen accessibility to administrative services improved, petition satisfaction also increased.',
    storyClosingTitleKo: '시민 중심 행정의 새로운 가능성',
    storyClosingTitleEn: 'New Possibilities for Citizen-Centered Administration',
    storyClosingKo: '민원 접수는 시민과 행정이 만나는 가장 중요한 접점입니다.\n\n하지만 복잡한 서식과 절차는 시민에게 부담이 되고, 담당자에게는 반복 업무를 만들어 왔습니다.\n\nAI 대화형 민원 접수 시스템은 이러한 문제를 해결하고, 시민이 더 쉽게 행정 서비스를 이용할 수 있도록 만드는 새로운 시민 중심 행정 인프라가 될 수 있습니다.',
    storyClosingEn: 'Petition filing is the most important point of contact between citizens and administration.\n\nComplex forms and procedures burden citizens while creating repetitive work for staff.\n\nAI conversational petition filing systems can solve these problems and become new citizen-centered administrative infrastructure, making it easier for citizens to access administrative services.',
  },
];

export type CaseStudyMeta = typeof caseStudyMeta[number];

// ── Trusted Clients ────────────────────────────────────────────────

const clientLogos = [
  { src: kepcoMcsLogo, alt: '한전MCS', altEn: 'KEPCO MCS', h: 'h-8 sm:h-10' },
  { src: ssisLogo, alt: '한국사회보장정보원', altEn: 'SSIS', h: 'h-8 sm:h-10' },
  { src: seoulAiLogo, alt: '서울AI재단', altEn: 'Seoul AI', h: 'h-8 sm:h-10' },
  { src: yangcheonLogo, alt: '양천구청', altEn: 'Yangcheon', h: 'h-12 sm:h-16' },
  { src: donggukLogo, alt: '동국대학교', altEn: 'Dongguk Univ.', h: 'h-8 sm:h-10' },
  { src: bodymapLogo, alt: '바디맵', altEn: 'Bodymap', h: 'h-8 sm:h-10' },
];

// ── Filter Categories ──────────────────────────────────────────────

const categories = [
  { key: 'all', labelKo: '전체', labelEn: 'All' },
  { key: 'public', labelKo: '공공 행정', labelEn: 'Public Sector' },
  { key: 'care', labelKo: '돌봄 서비스', labelEn: 'Care Services' },
  { key: 'automation', labelKo: 'AI 자동화', labelEn: 'AI Automation' },
  { key: 'stt', labelKo: 'STT 솔루션', labelEn: 'STT Solutions' },
];

// ── Case Study Card ────────────────────────────────────────────────

function CaseCard({ cs, index, lang }: { cs: CaseStudyMeta; index: number; lang: 'ko' | 'en' }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-40px' });
  const ref_ = references[cs.ref];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group cursor-pointer transition-all duration-300"
      onClick={() => navigate(`/cases/${cs.id}`)}
    >
      {/* 사진 */}
      <div className="relative rounded-2xl overflow-hidden aspect-square hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
        <img
          src={ref_.cardImage || ref_.image}
          alt={lang === 'ko' ? cs.heroTitleKo : cs.heroTitleEn}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* 하단 그라데이션 + 제목 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <h3 className="absolute bottom-4 left-4 right-4 text-[14px] sm:text-[15px] font-bold text-white leading-snug z-10 drop-shadow-md" style={{ wordBreak: 'keep-all' }}>
          {lang === 'ko' ? cs.heroTitleKo : cs.heroTitleEn}
        </h3>

        {/* 호버 시 오버레이 */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-start p-6 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <h4 className="text-[16px] font-bold text-white leading-snug mb-2" style={{ wordBreak: 'keep-all' }}>
            {lang === 'ko' ? cs.heroTitleKo : cs.heroTitleEn}
          </h4>
          <p className="text-[12px] text-white/70 leading-relaxed mb-4 line-clamp-2" style={{ wordBreak: 'keep-all' }}>
            {lang === 'ko' ? cs.heroDescKo : cs.heroDescEn}
          </p>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#448CFF]">
            {lang === 'ko' ? '자세히 보기' : 'Read Case Study'}
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

    </motion.div>
  );
}

// ── 메인 Cases 페이지 ──────────────────────────────────────────────

export function CasesPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-40px' });
  const clientRef = useRef(null);
  const clientInView = useInView(clientRef, { once: true, margin: '-40px' });
  const explorerRef = useRef(null);
  const explorerInView = useInView(explorerRef, { once: true, margin: '-40px' });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-40px' });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const scrollCarousel = useCallback((dir: number) => {
    setCarouselIdx((prev) => (prev + dir + caseStudyMeta.length) % caseStudyMeta.length);
  }, []);

  const filtered = caseStudyMeta.filter((cs) => {
    const matchCategory = activeCategory === 'all' || cs.category === activeCategory;
    if (!query.trim()) return matchCategory;
    const q = query.toLowerCase();
    const ref_ = references[cs.ref];
    const matchQuery = [
      cs.heroTitleKo, cs.heroTitleEn, cs.heroDescKo, cs.heroDescEn,
      cs.tagKo, cs.tagEn, ref_.clientKo, ref_.clientEn,
    ].some((s) => s.toLowerCase().includes(q));
    return matchCategory && matchQuery;
  });

  return (
    <main id="main-content">

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-4 sm:pt-40 sm:pb-6 lg:pt-44 lg:pb-8 bg-[#FAFBFC] overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #448CFF 0%, transparent 70%)', transform: 'translate(30%, -40%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.02] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7C5CFC 0%, transparent 70%)', transform: 'translate(-30%, 40%)' }} />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-8 lg:mb-10"
          >
            <h1
              className="font-bold text-[#0F172A] tracking-tight mb-4 whitespace-nowrap"
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)', lineHeight: 1.25, wordBreak: 'keep-all' }}
            >
              {lang === 'ko'
                ? 'AI 기술이 만든 실제 변화를 현장에서 확인하세요'
                : 'See Real Impact of AI Deployed in the Field'}
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#64748B] leading-relaxed mx-auto whitespace-nowrap" style={{ wordBreak: 'keep-all' }}>
              {lang === 'ko'
                ? '이노하이의 AI 인프라가 현장의 문제를 어떻게 해결할 수 있는지 직접 확인해 보세요.'
                : 'Discover how INNOHI\'s AI infrastructure solves real-world challenges firsthand.'}
            </p>
          </motion.div>
        </div>

        {/* ─── Featured Carousel ─── */}
        <div className="relative mx-auto pb-10 sm:pb-14 lg:pb-16">
          <div ref={carouselRef} className="relative max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-14 overflow-hidden">
            <div className="overflow-visible">
              <motion.div
                className="flex gap-5"
                animate={{ x: `calc(-${carouselIdx * 100}% - ${carouselIdx * 20}px)` }}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              >
                {caseStudyMeta.map((cs) => {
                  const ref_ = references[cs.ref];
                  return (
                    <div
                      key={cs.id}
                      className="w-full flex-shrink-0 cursor-pointer"
                      onClick={() => navigate(`/cases/${cs.id}`)}
                    >
                      <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        <img
                          src={ref_.image}
                          alt={lang === 'ko' ? cs.heroTitleKo : cs.heroTitleEn}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* 자세히 보기 버튼 — 왼쪽 중앙 */}
                        <div className="absolute left-14 sm:left-20 top-[34%] -translate-y-1/2 z-10">
                          <button
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-[13px] sm:text-[14px] font-medium hover:bg-white/25 transition-colors"
                          >
                            {lang === 'ko' ? '자세히 보기' : 'View Details'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* 페이지네이션 */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm z-20">
              {caseStudyMeta.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCarouselIdx(i); }}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === carouselIdx ? '#fff' : 'rgba(255,255,255,0.4)',
                    transform: i === carouselIdx ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>

            {/* 좌우 화살표 */}
            <button
              onClick={(e) => { e.stopPropagation(); scrollCarousel(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center transition-colors hover:bg-white/35 z-30"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); scrollCarousel(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center transition-colors hover:bg-white/35 z-30"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Trusted Clients ─── */}
      <section ref={clientRef} className="bg-white border-y border-[#F0F1F3] py-10 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={clientInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[12px] font-semibold text-[#9CA3AF] tracking-widest uppercase text-center mb-6">
              {lang === 'ko' ? 'Trusted By' : 'Trusted By'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
              {clientLogos.map((logo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={clientInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <img
                    src={logo.src}
                    alt={lang === 'ko' ? logo.alt : logo.altEn}
                    className={`${logo.h} w-auto max-w-[100px] sm:max-w-[120px] object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Case Study Explorer ─── */}
      <section ref={explorerRef} className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={explorerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#0F172A] tracking-tight">
                {lang === 'ko' ? '도입 사례 탐색' : 'Explore Case Studies'}
              </h2>

              {/* 검색 */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={lang === 'ko' ? '사례 검색...' : 'Search...'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E8EB] bg-[#F9FAFB] text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#448CFF] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200"
                  style={
                    activeCategory === cat.key
                      ? { background: '#0F172A', color: '#FFFFFF' }
                      : { background: '#F3F4F6', color: '#6B7280' }
                  }
                >
                  {lang === 'ko' ? cat.labelKo : cat.labelEn}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Case Study Grid ─── */}
      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {filtered.map((cs, i) => (
                <CaseCard key={cs.id} cs={cs} index={i} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#9CA3AF] text-[15px]">
                {lang === 'ko' ? '검색 결과가 없습니다.' : 'No results found.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
      >
        {/* 장식 */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #448CFF 0%, transparent 70%)', transform: 'translate(30%, -40%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7C5CFC 0%, transparent 70%)', transform: 'translate(-30%, 40%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h2
                  className="font-bold text-white mb-3"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', lineHeight: 1.3, wordBreak: 'keep-all' }}
                >
                  {lang === 'ko'
                    ? 'AI 도입, 지금 시작하세요'
                    : 'Start Your AI Journey Today'}
                </h2>
                <p className="text-[14px] sm:text-[15px] text-white/60 leading-relaxed whitespace-nowrap" style={{ wordBreak: 'keep-all' }}>
                  {lang === 'ko'
                    ? '이노하이의 AI 인프라가 현장의 문제를 어떻게 해결할 수 있는지 직접 확인해 보세요.'
                    : 'Discover how INNOHI\'s AI infrastructure can solve your organization\'s challenges.'}
                </p>
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-semibold text-[#0F172A] bg-white hover:bg-gray-100 transition-colors"
              >
                {lang === 'ko' ? '도입 문의하기' : 'Contact Us'}
                <ArrowUpRight className="w-4 h-4" />
              </button>
        </motion.div>
      </section>

    </main>
  );
}
