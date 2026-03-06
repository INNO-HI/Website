import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Mic,
  BookOpen,
  BarChart3,
  Workflow,
  Shield,
  Brain,
  FileText,
  MessageSquare,
} from 'lucide-react';

/* ── 아이콘 줄 데이터 ──────────────────────────────────────────── */

const rowA = [Mic, Brain, BarChart3, FileText, Shield, Mic, Brain, BarChart3, FileText, Shield];
const rowB = [BookOpen, Shield, Workflow, MessageSquare, Brain, BookOpen, Shield, Workflow, MessageSquare, Brain];
const rowC = [FileText, Mic, MessageSquare, BarChart3, Workflow, FileText, Mic, MessageSquare, BarChart3, Workflow];

const iconColors = [
  '#448CFF', '#3B82F6', '#38BDF8', '#6366F1', '#8B5CF6',
  '#448CFF', '#3B82F6', '#38BDF8', '#6366F1', '#8B5CF6',
];

/* ── CTA 컴포넌트 ─────────────────────────────────────────────────── */

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { lang } = useLanguage();
  const navigate = useNavigate();

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-40 bg-[#F0F2F8] overflow-hidden snap-start border-t border-[#E5E8EB]"
    >
      {/* 배경 글로우 */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#448CFF]/8 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-[#7C5CFC]/6 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* 왼쪽 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex-1 min-w-0"
        >
          <p
            className="text-[#191F28] leading-[1.5] tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
          >
            {lang === 'ko' ? (
              <>
                더 깊은 지능으로 가장 높은 존중,<br />
                <span className="font-bold bg-gradient-to-r from-[#448CFF] to-[#7C5CFC] bg-clip-text text-transparent">이노하이와 함께 하세요.</span>
              </>
            ) : (
              <>
                The deepest intelligence, the highest respect —<br />
                <span className="font-bold bg-gradient-to-r from-[#448CFF] to-[#7C5CFC] bg-clip-text text-transparent">with INNO-HI.</span>
              </>
            )}
          </p>

          <motion.button
            onClick={() => navigate('/contact')}
            className="mt-8 sm:mt-10 inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white text-[15px] sm:text-[16px] font-semibold transition-all cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #448CFF 0%, #7C5CFC 100%)' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {lang === 'ko' ? '문의하기' : 'Contact Us'}
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>

        {/* 오른쪽 아이콘 3줄 — 좌우로 흐르는 애니메이션 + 페이드 마스크 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:flex flex-col gap-3 w-[380px] shrink-0 relative"
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        >
          {/* Row A — 왼쪽으로 */}
          <div className="relative h-[68px] overflow-hidden">
            <div className="absolute flex gap-3 animate-scroll-left">
              {rowA.concat(rowA).map((Icon, idx) => (
                <div
                  key={`a-${idx}`}
                  className="w-[64px] h-[64px] rounded-2xl flex items-center justify-center shrink-0 bg-white shadow-sm border border-[#E5E8EB]/60"
                >
                  <Icon className="w-6 h-6" style={{ color: iconColors[idx % iconColors.length] }} />
                </div>
              ))}
            </div>
          </div>

          {/* Row B — 오른쪽으로 */}
          <div className="relative h-[68px] overflow-hidden">
            <div className="absolute flex gap-3 animate-scroll-right">
              {rowB.concat(rowB).map((Icon, idx) => (
                <div
                  key={`b-${idx}`}
                  className="w-[64px] h-[64px] rounded-2xl flex items-center justify-center shrink-0 bg-white shadow-sm border border-[#E5E8EB]/60"
                >
                  <Icon className="w-6 h-6" style={{ color: iconColors[idx % iconColors.length] }} />
                </div>
              ))}
            </div>
          </div>

          {/* Row C — 왼쪽으로 (느리게) */}
          <div className="relative h-[68px] overflow-hidden">
            <div className="absolute flex gap-3 animate-scroll-left-slow">
              {rowC.concat(rowC).map((Icon, idx) => (
                <div
                  key={`c-${idx}`}
                  className="w-[64px] h-[64px] rounded-2xl flex items-center justify-center shrink-0 bg-white shadow-sm border border-[#E5E8EB]/60"
                >
                  <Icon className="w-6 h-6" style={{ color: iconColors[idx % iconColors.length] }} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
