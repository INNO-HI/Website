import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import logoSrc from '@/assets/logo.png';

type NavItem = {
  labelKo: string;
  labelEn: string;
  anchor?: string;
  path?: string;
};

const navItems: NavItem[] = [
  { labelKo: '회사 소개', labelEn: 'About', path: '/about' },
  { labelKo: '서비스 소개', labelEn: 'Services', path: '/services' },
  { labelKo: '도입 사례', labelEn: 'Cases', path: '/cases' },
  { labelKo: '공지사항', labelEn: 'Notice', path: '/notice' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (item: NavItem) => {
    setIsMobileMenuOpen(false);
    if (item.path) {
      navigate(item.path);
      return;
    }
    if (item.anchor) {
      if (location.pathname === '/') {
        document.getElementById(item.anchor)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `/#${item.anchor}`;
      }
    }
  };

  const isActive = (item: NavItem) => {
    if (item.path) return location.pathname === item.path;
    return location.pathname === '/';
  };

  const label = (item: NavItem) => lang === 'ko' ? item.labelKo : item.labelEn;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#D3D8DF]/50'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* 로고 */}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Link
                to="/"
                className="flex items-center group"
                aria-label={lang === 'ko' ? 'INNO-HI 홈으로 이동' : 'Go to INNO-HI home'}
              >
                <img src={logoSrc} alt="INNO-HI" className="h-5 lg:h-6 w-auto" />
              </Link>
            </motion.div>

            {/* 데스크탑 네비게이션 */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label={lang === 'ko' ? '메인 메뉴' : 'Main menu'}>
              {navItems.map((item, index) => (
                <motion.button
                  key={item.labelKo}
                  onClick={() => handleNavClick(item)}
                  className={`px-4 py-2 text-[15px] font-medium transition-colors relative group ${
                    isActive(item) ? 'text-[#383838]' : 'text-[#777A86] hover:text-[#383838]'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  {label(item)}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#448CFF] transition-all duration-200 ${
                    isActive(item) ? 'w-4' : 'w-0 group-hover:w-4'
                  }`} />
                </motion.button>
              ))}
            </nav>

            {/* 우측: 도입 문의 CTA + KO/EN 토글 + 모바일 버튼 */}
            <div className="flex items-center gap-3">
              {/* 도입 문의 버튼 */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="hidden lg:block"
              >
                <Link
                  to="/notice"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#448CFF] text-white text-sm font-semibold hover:bg-[#2E7FFA] transition-colors shadow-sm"
                >
                  {lang === 'ko' ? '도입 문의' : 'Contact'}
                </Link>
              </motion.div>

              {/* 언어 토글 */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="hidden lg:flex items-center rounded-full border border-[#D3D8DF] overflow-hidden bg-[#F8F9FD]"
              >
                <button
                  onClick={() => setLang('ko')}
                  className={`px-3.5 py-1.5 text-sm font-medium transition-all ${
                    lang === 'ko'
                      ? 'bg-[#383838] text-white'
                      : 'text-[#777A86] hover:text-[#383838]'
                  }`}
                >
                  KO
                </button>
                <div className="w-px h-4 bg-[#D3D8DF]" />
                <button
                  onClick={() => setLang('en')}
                  className={`px-3.5 py-1.5 text-sm font-medium transition-all ${
                    lang === 'en'
                      ? 'bg-[#383838] text-white'
                      : 'text-[#777A86] hover:text-[#383838]'
                  }`}
                >
                  EN
                </button>
              </motion.div>

              {/* 모바일 메뉴 버튼 */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg text-[#4B4E56] hover:bg-[#F8F9FD] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMobileMenuOpen ? (lang === 'ko' ? '메뉴 닫기' : 'Close menu') : (lang === 'ko' ? '메뉴 열기' : 'Open menu')}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen
                  ? <X className="w-5 h-5" aria-hidden="true" />
                  : <Menu className="w-5 h-5" aria-hidden="true" />
                }
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 lg:hidden"
            role="dialog"
            aria-label={lang === 'ko' ? '모바일 메뉴' : 'Mobile menu'}
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 35, stiffness: 350 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl"
            >
              <div className="pt-24 px-6">
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.labelKo}
                      onClick={() => handleNavClick(item)}
                      className={`block w-full text-left px-4 py-3.5 text-base font-medium rounded-lg transition-colors ${
                        isActive(item)
                          ? 'text-[#383838] bg-[#F8F9FD]'
                          : 'text-[#4B4E56] hover:text-[#383838] hover:bg-[#F8F9FD]'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      {label(item)}
                    </motion.button>
                  ))}
                </div>

                {/* 모바일 언어 토글 */}
                <motion.div
                  className="mt-6 pt-6 border-t border-[#D3D8DF]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-xs font-medium text-[#777A86] mb-3 uppercase tracking-wider">Language</p>
                  <div className="flex gap-2">
                    {(['ko', 'en'] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          lang === l
                            ? 'bg-[#383838] text-white'
                            : 'bg-[#F8F9FD] text-[#777A86]'
                        }`}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
