import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft, AlertTriangle, Lightbulb, TrendingUp, Quote } from 'lucide-react';
import { references, parseDetail } from '@/sections/UseCases';
import { caseStudyMeta } from '@/pages/CasesPage';

// ── Detail Page ──────────────────────────────────────────────────────

export function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const csrRef = useRef(null);
  const csrInView = useInView(csrRef, { once: true, margin: '-40px' });
  const resultRef = useRef(null);
  const resultInView = useInView(resultRef, { once: true, margin: '-40px' });

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
  const detail = lang === 'ko' ? ref_.detailKo : ref_.detailEn;
  const { intro } = parseDetail(detail, lang);

  return (
    <main id="main-content" className="bg-[#FAFBFC]">

      {/* ─── 상단 헤더 ─── */}
      <section className="bg-white border-b border-[#F0F1F3]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-10 sm:pb-14">

          {/* 뒤로가기 */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/cases')}
            className="inline-flex items-center gap-1.5 text-[13px] text-[#9CA3AF] font-medium mb-8 hover:text-[#6B7280] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {lang === 'ko' ? '도입 사례 목록' : 'Case Studies'}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 로고 */}
            <div className="bg-[#F3F4F6] rounded-xl w-fit px-4 py-2.5 mb-6">
              <img src={ref_.logo} alt="" className="h-6 sm:h-7 w-auto object-contain" />
            </div>

            {/* 제목 */}
            <h1
              className="font-bold text-[#0F172A] mb-3"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', letterSpacing: '-0.02em', lineHeight: 1.3, wordBreak: 'keep-all' }}
            >
              {lang === 'ko' ? cs.heroTitleKo : cs.heroTitleEn}
            </h1>

            {/* 부제목 */}
            <p className="text-[15px] sm:text-[16px] text-[#6B7280] leading-relaxed max-w-2xl" style={{ wordBreak: 'keep-all' }}>
              {lang === 'ko' ? cs.heroDescKo : cs.heroDescEn}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 사진 ─── */}
      <section className="bg-white">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl overflow-hidden relative"
          >
            <img
              src={ref_.image}
              alt={lang === 'ko' ? cs.heroTitleKo : cs.heroTitleEn}
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '16/9' }}
            />
            {/* 페이지네이션 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm">
              {caseStudyMeta.map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/cases/${c.id}`)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: c.id === cs.id ? '#fff' : 'rgba(255,255,255,0.4)',
                    transform: c.id === cs.id ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 내용 ─── */}
      <section className="bg-white border-b border-[#F0F1F3]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[15px] sm:text-[16px] text-[#4E5968] leading-[1.85] whitespace-pre-line" style={{ wordBreak: 'keep-all' }}>
              {intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 관계자 한마디 ─── */}
      <section className="bg-[#F9FAFB] border-b border-[#F0F1F3] py-12 sm:py-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative"
          >
            <Quote className="w-8 h-8 text-[#448CFF] opacity-20 mb-5" />
            <p
              className="text-[17px] sm:text-[20px] text-[#383838] leading-[1.8] font-medium whitespace-pre-line mb-5"
              style={{ fontStyle: 'italic', wordBreak: 'keep-all' }}
            >
              {lang === 'ko' ? cs.quoteKo : cs.quoteEn}
            </p>
            <p className="text-[14px] text-[#9CA3AF] font-medium">
              — {lang === 'ko' ? cs.quoteAuthorKo : cs.quoteAuthorEn}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 문제 & 솔루션 ─── */}
      <section ref={csrRef} className="bg-white py-12 sm:py-16 border-b border-[#F0F1F3]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={csrInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Challenge */}
            <div className="rounded-2xl border border-[#E5E8EB] p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#FEF2F2]">
                  <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                </div>
                <h4 className="text-[15px] font-bold text-[#383838] tracking-wide uppercase">Challenge</h4>
              </div>
              <ul className="space-y-3">
                {(lang === 'ko' ? cs.challengeKo : cs.challengeEn).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-[8px] shrink-0 bg-[#EF4444]" />
                    <span className="text-[14px] text-[#4E5968] leading-[1.75]" style={{ wordBreak: 'keep-all' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="rounded-2xl border border-[#E5E8EB] p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#EFF6FF]">
                  <Lightbulb className="w-4 h-4 text-[#448CFF]" />
                </div>
                <h4 className="text-[15px] font-bold text-[#383838] tracking-wide uppercase">Solution</h4>
              </div>
              <ul className="space-y-3">
                {(lang === 'ko' ? cs.solutionKo : cs.solutionEn).map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-[8px] shrink-0 bg-[#448CFF]" />
                    <span className="text-[14px] text-[#4E5968] leading-[1.75]" style={{ wordBreak: 'keep-all' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 결과 효과 ─── */}
      <section ref={resultRef} className="bg-[#F9FAFB] py-12 sm:py-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={resultInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#ECFDF5]">
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
              </div>
              <h4 className="text-[15px] font-bold text-[#383838] tracking-wide uppercase">Results</h4>
            </div>

            {/* 성과 지표 */}
            <div className="flex flex-wrap gap-8 mb-8">
              {cs.metrics.map((m, i) => (
                <div key={i}>
                  <span className="text-[32px] sm:text-[40px] font-bold text-[#448CFF]">
                    {lang === 'ko' ? m.valueKo : m.valueEn}
                  </span>
                  <p className="text-[13px] text-[#6B7280] font-medium mt-1">
                    {lang === 'ko' ? m.labelKo : m.labelEn}
                  </p>
                </div>
              ))}
            </div>

            {/* 결과 항목 */}
            <ul className="space-y-3">
              {(lang === 'ko' ? cs.resultsKo : cs.resultsEn).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-[8px] shrink-0 bg-[#10B981]" />
                  <span className="text-[14px] text-[#4E5968] leading-[1.75]" style={{ wordBreak: 'keep-all' }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ─── 다른 사례 보기 ─── */}
      <section className="bg-white border-t border-[#F0F1F3] py-12 lg:py-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[15px] text-[#6B7280] mb-5">
            {lang === 'ko' ? '더 많은 도입 사례를 확인하세요' : 'Explore more case studies'}
          </p>
          <button
            onClick={() => navigate('/cases')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: 'linear-gradient(135deg, #448CFF 0%, #7C5CFC 100%)' }}
          >
            {lang === 'ko' ? '전체 사례 보기' : 'View All Cases'}
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </section>

    </main>
  );
}
