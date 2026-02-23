import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  solutions: [
    { label: '음성 인식', href: '/#solution' },
    { label: '데이터 구조화', href: '/#solution' },
    { label: '업무 자동화', href: '/#solution' },
  ],
  company: [
    { label: '회사 소개', href: '/about' },
    { label: '도입 문의', href: 'mailto:contact@innohi.ai.kr' },
  ],
  resources: [
    { label: '문서', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer id="contact" className="relative bg-white border-t border-[#D3D8DF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Company Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#448CFF] rounded-lg opacity-10" />
                <span className="relative text-lg font-bold text-[#383838]">I</span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#448CFF] rounded-full" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold text-[#383838] tracking-tight">INNO-HI</span>
            </div>

            <p className="text-sm text-[#4B4E56] mb-6 max-w-xs leading-relaxed">
              현실의 업무를 지능화하는 인프라.<br />
              기술로 사람의 가치를 증명합니다.
            </p>

            <div className="space-y-2.5">
              <a
                href="mailto:contact@innohi.ai.kr"
                className="flex items-center gap-2.5 text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>contact@innohi.ai.kr</span>
              </a>
              <a
                href="tel:010-8225-4024"
                className="flex items-center gap-2.5 text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>010-8225-4024</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-[#4B4E56]">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>서울특별시 중구 퇴계로36길</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-5">
              <motion.a
                href="#"
                className="w-9 h-9 rounded-full bg-[#F8F9FD] border border-[#D3D8DF] flex items-center justify-center text-[#777A86] hover:text-[#448CFF] hover:border-[#8AB8FB] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold text-[#383838] uppercase tracking-wider mb-4">솔루션</h4>
              <ul className="space-y-2.5">
                {footerLinks.solutions.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#383838] uppercase tracking-wider mb-4">회사</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} className="text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#383838] uppercase tracking-wider mb-4">리소스</h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D3D8DF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#9CA3AF]">
              <span>주식회사 이노하이</span>
              <span>대표자: 김민수, 한민우</span>
              <span>사업자등록번호: 758-86-03814</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#9CA3AF]">
              <span>주소: 서울특별시 중구 퇴계로36길</span>
              <span>전화: 010-8225-4024</span>
              <span>이메일: contact@innohi.ai.kr</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2">
              <p className="text-[11px] text-[#B0BAC8]">© {new Date().getFullYear()} INNO-HI. All rights reserved.</p>
              <p className="text-[11px] text-[#B0BAC8] font-medium">가장 깊은 지능, 가장 높은 존중.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
