import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import logoSrc from '@/assets/logo.png';

const siteLinks = [
  { labelKo: '회사 소개', labelEn: 'About', href: '/about' },
  { labelKo: '서비스 소개', labelEn: 'Services', href: '/services' },
  { labelKo: '도입 사례', labelEn: 'Case Studies', href: '/cases' },
  { labelKo: '공고사항', labelEn: 'Announcements', href: '/notice' },
];

export function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-white border-t border-[#E5E8EB]">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-14">

        {/* Upper: Logo · Nav · Contact */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-12 lg:pt-14 pb-10 lg:pb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <img src={logoSrc} alt="INNO-HI" className="h-5 w-auto" />
            <nav className="flex flex-wrap items-center gap-x-8 gap-y-2">
              {siteLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.href}
                  className="text-[15px] text-[#4E5968] hover:text-[#448CFF] transition-colors duration-200"
                >
                  {lang === 'ko' ? link.labelKo : link.labelEn}
                </Link>
              ))}
            </nav>
          </div>
          <a
            href="mailto:contact@innohi.ai.kr"
            className="inline-flex items-center gap-2 text-[15px] text-[#4E5968] hover:text-[#448CFF] font-medium transition-colors duration-200"
          >
            contact@innohi.ai.kr
            <span className="text-[#D1D6DB]">&rarr;</span>
          </a>
        </div>

        {/* Lower: Legal · Tagline · Copyright */}
        <div className="border-t border-[#F2F4F6] py-8 lg:py-10">
          <div className="space-y-1.5 text-[14px] text-[#8B95A1] leading-relaxed">
            <p>
              {lang === 'ko'
                ? '주식회사 이노하이 · 대표자: 김민수, 한민우 · 사업자등록번호: 758-86-03814'
                : 'INNO-HI Inc. · CEO: Minsu Kim, Minwoo Han · BRN: 758-86-03814'}
            </p>
            <p>
              {lang === 'ko'
                ? '서울특별시 중구 퇴계로36길 2 충무로영상센터 신관 B257호 · 010-8225-4024'
                : '2, Toegye-ro 36-gil, Jung-gu, Seoul, Chungmuro Image Center B257 · 010-8225-4024'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-5">
            <p className="text-[13px] text-[#B0B8C1]">&copy; {new Date().getFullYear()} INNO-HI. All rights reserved.</p>
            <p className="text-[14px] text-[#D1D6DB] font-light tracking-wide">
              {lang === 'ko' ? '가장 깊은 지능, 가장 높은 존중.' : 'Deepest Intelligence, Highest Respect.'}
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
