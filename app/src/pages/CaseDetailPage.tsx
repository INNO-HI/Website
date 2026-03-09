import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { references } from '@/sections/UseCases';
import { caseStudyMeta } from '@/pages/CasesPage';

// ── 스토리 섹션 컴포넌트 ──

function StorySection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-bold text-[#0F172A] mb-6"
      style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.35, wordBreak: 'keep-all' }}
    >
      {children}
    </h2>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  if (typeof children !== 'string') {
    return <p className="text-[15px] sm:text-[16px] text-[#4E5968] leading-[1.9]" style={{ wordBreak: 'keep-all' }}>{children}</p>;
  }
  const paragraphs = children.split('\n\n');
  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-[15px] sm:text-[16px] text-[#4E5968] leading-[1.9]" style={{ wordBreak: 'keep-all' }}>
          {p}
        </p>
      ))}
    </div>
  );
}

// ── Detail Page ──────────────────────────────────────────────────────

export function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [id]);

  const cs = caseStudyMeta.find((c) => c.id === id);
  if (!cs) {
    return (
      <main className="pt-40 pb-20 text-center">
        <p className="text-[#6B7280]">{lang === 'ko' ? '사례를 찾을 수 없습니다.' : 'Case study not found.'}</p>
        <button onClick={() => navigate('/cases')} className="mt-4 text-[#448CFF] font-semibold text-sm">
          {lang === 'ko' ? '← 목록으로' : '← Back to list'}
        </button>
      </main>
    );
  }

  const ref_ = references[cs.ref];
  const t = (ko: string, en: string) => lang === 'ko' ? ko : en;

  return (
    <main id="main-content" className="bg-white">

      {/* ─── 1. Hero ─── */}
      <section className="bg-white">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-8 sm:pb-10">

          {/* 뒤로가기 */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/cases')}
            className="inline-flex items-center gap-1.5 text-[13px] text-[#9CA3AF] font-medium mb-10 hover:text-[#6B7280] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t('도입 사례 목록', 'Case Studies')}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 로고 */}
            <img src={ref_.logo} alt="" className="h-10 sm:h-12 w-auto object-contain mb-6" />

            {/* 제목 */}
            <h1
              className="font-bold text-[#0F172A] mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1.3, wordBreak: 'keep-all' }}
            >
              {t(cs.heroTitleKo, cs.heroTitleEn)}
            </h1>

            {/* 부제목 */}
            <p className="text-[16px] sm:text-[18px] text-[#6B7280] leading-relaxed max-w-2xl" style={{ wordBreak: 'keep-all' }}>
              {t(cs.heroDescKo, cs.heroDescEn)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 사진 ─── */}
      <section className="bg-white">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 lg:px-8 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src={ref_.image}
                alt={t(cs.heroTitleKo, cs.heroTitleEn)}
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '16/9' }}
              />
            </div>
            {/* 페이지네이션 */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {caseStudyMeta.map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/cases/${c.id}`)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: c.id === cs.id ? '#448CFF' : '#D1D5DB',
                    transform: c.id === cs.id ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 구분선 ─── */}
      <div className="max-w-[760px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="border-b border-[#F0F1F3]" />
      </div>

      {/* ─── 2. 현장에서 발견된 문제 ─── */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 lg:px-8">
          <StorySection>
            <SectionTitle>{t(cs.storyProblemTitleKo, cs.storyProblemTitleEn)}</SectionTitle>
            <BodyText>{t(cs.storyProblemKo, cs.storyProblemEn)}</BodyText>
          </StorySection>
        </div>
      </section>

      {/* ─── 핵심 강조 문장 ─── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 lg:px-8">
          <StorySection>
            <div className="border-l-4 border-[#448CFF] pl-6 sm:pl-8">
              <p
                className="text-[20px] sm:text-[26px] font-semibold text-[#0F172A] leading-[1.6] whitespace-pre-line"
                style={{ wordBreak: 'keep-all' }}
              >
                {t(cs.storyHighlightKo, cs.storyHighlightEn)}
              </p>
            </div>
          </StorySection>
        </div>
      </section>

      {/* ─── 3. AI 접근 ─── */}
      <section className="bg-[#F9FAFB] py-14 sm:py-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 lg:px-8">
          <StorySection>
            <SectionTitle>{t(cs.storyApproachTitleKo, cs.storyApproachTitleEn)}</SectionTitle>
            <BodyText>{t(cs.storyApproachKo, cs.storyApproachEn)}</BodyText>
          </StorySection>
        </div>
      </section>

      {/* ─── 4. 현장 중심 설계 ─── */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 lg:px-8">
          <StorySection>
            <SectionTitle>{t(cs.storySystemTitleKo, cs.storySystemTitleEn)}</SectionTitle>
            <BodyText>{t(cs.storySystemKo, cs.storySystemEn)}</BodyText>

            <ul className="mt-6 space-y-3">
              {(lang === 'ko' ? cs.storySystemPointsKo : cs.storySystemPointsEn).map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-[10px] shrink-0 bg-[#448CFF]" />
                  <span className="text-[15px] sm:text-[16px] text-[#4E5968] leading-[1.8]" style={{ wordBreak: 'keep-all' }}>{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-[15px] sm:text-[16px] text-[#4E5968] leading-[1.9] mt-6" style={{ wordBreak: 'keep-all' }}>
              {t(cs.storySystemOutroKo, cs.storySystemOutroEn)}
            </p>
          </StorySection>
        </div>
      </section>

      {/* ─── 5. 실제 현장 변화 + 성과 지표 ─── */}
      <section className="bg-[#F9FAFB] py-14 sm:py-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 lg:px-8">
          <StorySection>
            <SectionTitle>{t(cs.storyChangeTitleKo, cs.storyChangeTitleEn)}</SectionTitle>
            <BodyText>{t(cs.storyChangeKo, cs.storyChangeEn)}</BodyText>
          </StorySection>

          {/* 성과 숫자 카드 */}
          <StorySection className="mt-12">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
              {cs.metrics.map((m, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#E5E8EB] p-6 sm:p-8 text-center">
                  <span className="text-[36px] sm:text-[48px] font-bold text-[#448CFF]" style={{ lineHeight: 1.1 }}>
                    {t(m.valueKo, m.valueEn)}
                  </span>
                  <p className="text-[13px] sm:text-[14px] text-[#6B7280] font-medium mt-2">
                    {t(m.labelKo, m.labelEn)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[15px] sm:text-[16px] text-[#4E5968] leading-[1.9]" style={{ wordBreak: 'keep-all' }}>
              {t(cs.storyMetricsOutroKo, cs.storyMetricsOutroEn)}
            </p>
          </StorySection>
        </div>
      </section>

      {/* ─── 관계자 의견 ─── */}
      <section className="bg-[#F9FAFB] py-14 sm:py-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 lg:px-8">
          <StorySection>
            <Quote className="w-8 h-8 text-[#448CFF] opacity-20 mb-6" />
            <p
              className="text-[18px] sm:text-[22px] text-[#383838] leading-[1.8] font-medium whitespace-pre-line mb-6"
              style={{ fontStyle: 'italic', wordBreak: 'keep-all' }}
            >
              {t(cs.quoteKo, cs.quoteEn)}
            </p>
            <p className="text-[14px] text-[#9CA3AF] font-medium">
              — {t(cs.quoteAuthorKo, cs.quoteAuthorEn)}
            </p>
          </StorySection>
        </div>
      </section>

      {/* ─── 마무리 ─── */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 lg:px-8">
          <StorySection>
            <SectionTitle>{t(cs.storyClosingTitleKo, cs.storyClosingTitleEn)}</SectionTitle>
            <BodyText>{t(cs.storyClosingKo, cs.storyClosingEn)}</BodyText>
          </StorySection>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-[#F0F1F3] py-14 sm:py-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-6 lg:px-8">
          <StorySection className="text-center">
            <p className="text-[15px] text-[#6B7280] mb-4">
              {t('더 많은 도입 사례를 확인하세요', 'Explore more case studies')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate('/cases')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #448CFF 0%, #7C5CFC 100%)' }}
              >
                {t('전체 사례 보기', 'View All Cases')}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold text-[#383838] border border-[#E5E8EB] hover:border-[#D1D5DB] transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                {t('도입 문의하기', 'Contact Us')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </StorySection>
        </div>
      </section>

    </main>
  );
}
