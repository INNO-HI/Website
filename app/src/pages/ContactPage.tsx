import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useLanguage } from '@/hooks/useLanguage';

import kepcoMcsLogo from '@/assets/partners/kepco-mcs.png';
import donggukLogo from '@/assets/partners/dongguk.png';
import bodymapLogo from '@/assets/partners/bodymap.png';
import seoulAiLogo from '@/assets/partners/seoul-ai.jpg';
import yangcheonLogo from '@/assets/partners/yangcheon.jpg';
import ssisLogo from '@/assets/partners/ssis.svg';

const partnerLogos = [
  { src: kepcoMcsLogo, alt: '한전MCS', height: 'h-7' },
  { src: ssisLogo, alt: '사회보장정보원', height: 'h-7' },
  { src: seoulAiLogo, alt: '서울AI재단', height: 'h-7' },
  { src: yangcheonLogo, alt: '양천구청', height: 'h-10' },
  { src: donggukLogo, alt: '동국대학교', height: 'h-7' },
  { src: bodymapLogo, alt: '바디맵', height: 'h-7' },
];

type FormData = {
  lastName: string;
  firstName: string;
  company: string;
  department: string;
  jobTitle: string;
  email: string;
  phone: string;
  message: string;
};

const initialForm: FormData = {
  lastName: '',
  firstName: '',
  company: '',
  department: '',
  jobTitle: '',
  email: '',
  phone: '',
  message: '',
};

export function ContactPage() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [form, setForm] = useState<FormData>(initialForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const update = (key: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const isValid =
    form.lastName && form.firstName && form.company &&
    form.department && form.jobTitle && form.email &&
    form.phone && form.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || sending) return;

    setSending(true);
    setError(false);

    const templateParams = {
      from_name: `${form.lastName}${form.firstName}`,
      company: form.company,
      department: form.department,
      job_title: form.jobTitle,
      email: form.email,
      phone: `+82 ${form.phone}`,
      message: form.message,
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
      setForm(initialForm);
      setTimeout(() => setSent(false), 4000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-20 lg:pt-28">
      <div ref={ref} className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-14 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* 왼쪽: 헤더 + 파트너 + 이메일 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="font-bold text-[#191F28] tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}
            >
              {lang === 'ko' ? '문의하기' : 'Contact Us'}
            </h1>
            <p className="text-[17px] text-[#4E5968] leading-relaxed mb-12">
              {lang === 'ko'
                ? 'AI 지능화 시작, 지금 INNO-HI와 함께하세요.'
                : 'Start AI transformation with INNO-HI today.'}
            </p>

            {/* 파트너 — 마키 슬라이드 */}
            <div className="border-t border-[#F2F4F6] pt-10 mb-10">
              <p className="text-sm font-semibold text-[#191F28] mb-5">
                {lang === 'ko' ? 'INNO-HI와 함께하는 파트너' : 'Partners with INNO-HI'}
              </p>
              <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, white, transparent)' }} />
                <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to left, white, transparent)' }} />
                <div className="flex animate-marquee">
                  {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, i) => (
                    <div key={i} className="flex-shrink-0 flex items-center justify-center px-5" style={{ minWidth: 120, height: 48 }}>
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className={`${logo.height} w-auto max-w-[100px] object-contain opacity-40 grayscale`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-[#191F28] mb-2">Support</p>
              <a
                href="mailto:contact@innohi.ai"
                className="text-[15px] text-[#448CFF] hover:underline font-medium"
              >
                contact@innohi.ai
              </a>
            </div>

          </motion.div>

          {/* 오른쪽: 문의 양식 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="text-lg font-semibold text-[#191F28] mb-6">
              {lang === 'ko' ? '문의 양식' : 'Inquiry Form'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 성 + 이름 */}
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label={lang === 'ko' ? '성' : 'Last Name'}
                  value={form.lastName}
                  onChange={v => update('lastName', v)}
                  required
                />
                <Field
                  label={lang === 'ko' ? '이름' : 'First Name'}
                  value={form.firstName}
                  onChange={v => update('firstName', v)}
                  required
                />
              </div>

              <Field
                label={lang === 'ko' ? '회사 이름' : 'Company'}
                value={form.company}
                onChange={v => update('company', v)}
                required
              />

              {/* 부서 + 직함 */}
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label={lang === 'ko' ? '부서' : 'Department'}
                  value={form.department}
                  onChange={v => update('department', v)}
                  required
                />
                <Field
                  label={lang === 'ko' ? '직함' : 'Job Title'}
                  value={form.jobTitle}
                  onChange={v => update('jobTitle', v)}
                  required
                />
              </div>

              <Field
                label={lang === 'ko' ? '업무용 이메일' : 'Work Email'}
                type="email"
                value={form.email}
                onChange={v => update('email', v)}
                required
              />

              {/* 전화번호 */}
              <div>
                <label className="block text-[13px] font-medium text-[#4E5968] mb-1.5">
                  {lang === 'ko' ? '전화번호' : 'Phone'}<span className="text-[#448CFF]">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-[#E5E8EB] bg-[#F8F9FD] text-[14px] text-[#4E5968] shrink-0">
                    <span>🇰🇷</span>
                    <span>+82</span>
                  </div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    required
                    className="flex-1 px-4 py-2.5 rounded-lg border border-[#E5E8EB] text-[14px] text-[#191F28] placeholder:text-[#B0B8C1] focus:outline-none focus:border-[#448CFF] focus:ring-1 focus:ring-[#448CFF]/20 transition-colors"
                    placeholder="10-1234-5678"
                  />
                </div>
              </div>

              {/* 문의 내용 */}
              <div>
                <label className="block text-[13px] font-medium text-[#4E5968] mb-1.5">
                  {lang === 'ko' ? '문의 내용을 작성해 주세요.' : 'Your message'}<span className="text-[#448CFF]">*</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E8EB] text-[14px] text-[#191F28] placeholder:text-[#B0B8C1] focus:outline-none focus:border-[#448CFF] focus:ring-1 focus:ring-[#448CFF]/20 transition-colors resize-none"
                  placeholder={
                    lang === 'ko'
                      ? 'AI로 해결하고자 하는 과제나 협업 문의 내용을 작성해 주세요.'
                      : 'Describe your AI needs or collaboration inquiry.'
                  }
                />
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={!isValid || sending}
                className="w-full py-3.5 rounded-xl text-[15px] font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                style={{ background: isValid && !sending ? 'linear-gradient(135deg, #448CFF 0%, #7C5CFC 100%)' : '#B0B8C1' }}
              >
                {sending
                  ? (lang === 'ko' ? '전송 중...' : 'Sending...')
                  : sent
                    ? (lang === 'ko' ? '전송 완료!' : 'Sent!')
                    : error
                      ? (lang === 'ko' ? '전송 실패 — 다시 시도해주세요' : 'Failed — please try again')
                      : (lang === 'ko' ? '문의하기' : 'Submit Inquiry')}
              </button>

              {/* 개인정보 동의 */}
              <p className="text-[12px] text-[#9CA3AF] leading-relaxed">
                {lang === 'ko'
                  ? '폼 제출 시 INNO-HI의 개인정보처리방침에 따라 개인정보 수집 및 이용에 동의한 것으로 간주됩니다.'
                  : 'By submitting this form, you agree to the collection and use of personal information in accordance with INNO-HI\'s privacy policy.'}
              </p>
            </form>
          </motion.div>

        </div>


      </div>
    </div>
  );
}

/* ── 인풋 필드 컴포넌트 ─────────────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#4E5968] mb-1.5">
        {label}{required && <span className="text-[#448CFF]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-2.5 rounded-lg border border-[#E5E8EB] text-[14px] text-[#191F28] placeholder:text-[#B0B8C1] focus:outline-none focus:border-[#448CFF] focus:ring-1 focus:ring-[#448CFF]/20 transition-colors"
      />
    </div>
  );
}
