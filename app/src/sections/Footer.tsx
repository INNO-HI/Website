import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin,
  Download,
  FileText
} from 'lucide-react';

const footerLinks = {
  solutions: [
    { label: '음성 인식', href: '#solution' },
    { label: '데이터 구조화', href: '#solution' },
    { label: '예측 분석', href: '#solution' },
    { label: '업무 자동화', href: '#solution' },
  ],
  company: [
    { label: '회사 소개', href: '#' },
    { label: '채용', href: '#' },
    { label: '볏보 자료', href: '#' },
    { label: '문의', href: '#contact' },
  ],
  resources: [
    { label: '문서', href: '#' },
    { label: 'API 참조', href: '#' },
    { label: '사례 연구', href: '#use-cases' },
    { label: '블로그', href: '#' },
  ],
  legal: [
    { label: '개인정보처리방침', href: '#' },
    { label: '이용약관', href: '#' },
    { label: '보안', href: '#infrastructure' },
    { label: '규정 준수', href: '#infrastructure' },
  ],
};

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="contact" className="relative bg-white border-t border-[#D3D8DF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#448CFF] rounded-lg opacity-10" />
                <span className="relative text-lg font-bold text-[#383838]">I</span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#448CFF] rounded-full" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold text-[#383838] tracking-tight">INNO-HI</span>
            </div>

            <p className="text-sm text-[#4B4E56] mb-5 max-w-xs leading-relaxed">
              현실의 업무를 지능화하는 인프라.
              <br />
              기술로 사람의 가치를 증명합니다.
            </p>

            <div className="space-y-2.5">
              <a href="mailto:contact@inno-hi.com" className="flex items-center gap-2.5 text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>contact@inno-hi.com</span>
              </a>
              <a href="tel:+82-2-1234-5678" className="flex items-center gap-2.5 text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>02-1234-5678</span>
              </a>
              <div className="flex items-center gap-2.5 text-sm text-[#4B4E56]">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>서울특별시</span>
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
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <h4 className="text-xs font-bold text-[#383838] uppercase tracking-wider mb-3">솔루션</h4>
              <ul className="space-y-2">
                {footerLinks.solutions.map((link, index) => (
                  <li key={index}>
                    <button onClick={() => scrollToSection(link.href)} className="text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#383838] uppercase tracking-wider mb-3">회사</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <button onClick={() => scrollToSection(link.href)} className="text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#383838] uppercase tracking-wider mb-3">리소스</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <button onClick={() => scrollToSection(link.href)} className="text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#383838] uppercase tracking-wider mb-3">법적 고지</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <button onClick={() => scrollToSection(link.href)} className="text-sm text-[#4B4E56] hover:text-[#448CFF] transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* IR Download */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-[#383838] uppercase tracking-wider mb-3">투자자</h4>
            <div className="space-y-2">
              <motion.a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-[#F8F9FD] border border-[#D3D8DF] hover:border-[#8AB8FB] transition-colors group" whileHover={{ y: -2 }}>
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#448CFF]" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#383838] group-hover:text-[#448CFF] transition-colors truncate">IR 프레젠테이션</p>
                  <p className="text-xs text-[#777A86]">PDF, 4.2 MB</p>
                </div>
                <Download className="w-4 h-4 text-[#777A86] group-hover:text-[#448CFF] transition-colors flex-shrink-0" aria-hidden="true" />
              </motion.a>

              <motion.a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-[#F8F9FD] border border-[#D3D8DF] hover:border-[#8AB8FB] transition-colors group" whileHover={{ y: -2 }}>
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#448CFF]" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#383838] group-hover:text-[#448CFF] transition-colors truncate">원페이저</p>
                  <p className="text-xs text-[#777A86]">PDF, 1.8 MB</p>
                </div>
                <Download className="w-4 h-4 text-[#777A86] group-hover:text-[#448CFF] transition-colors flex-shrink-0" aria-hidden="true" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D3D8DF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#777A86]">© {new Date().getFullYear()} INNO-HI. 모든 권리 보유.</p>
            <p className="text-xs text-[#777A86] font-medium">가장 깊은 지능, 가장 높은 존중.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
