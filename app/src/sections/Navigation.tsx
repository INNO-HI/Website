import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
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
  // { labelKo: '도입 사례', labelEn: 'Cases', path: '/cases' },
  { labelKo: '공고사항', labelEn: 'Announcements', path: '/notice' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const { lang, setLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsHidden(currentScrollY > 20 && currentScrollY > lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      // 다크 섹션 감지 (네비 영역과 겹치는지 확인)
      const darkSections = document.querySelectorAll('[data-nav-dark]');
      let dark = false;
      darkSections.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < 84 && rect.bottom > 0) dark = true;
      });
      setIsDarkSection(dark);
    };
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
    if (item.path) return location.pathname.startsWith(item.path);
    return location.pathname === '/';
  };

  const label = (item: NavItem) => lang === 'ko' ? item.labelKo : item.labelEn;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isDarkSection
            ? isScrolled
              ? 'bg-[#0B0E14]/90 backdrop-blur-md border-b border-white/5'
              : 'bg-transparent'
            : isScrolled
              ? 'bg-white/95 backdrop-blur-md border-b border-[#D3D8DF]/50'
              : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-14">
          <div className="flex items-center justify-between h-16 lg:h-[84px]">
            {/* 로고 */}
            <Link
              to="/"
              className="flex items-center"
              aria-label={lang === 'ko' ? 'INNO-HI 홈으로 이동' : 'Go to INNO-HI home'}
            >
              <img
                src={logoSrc}
                alt="INNO-HI"
                className="h-5 lg:h-6 w-auto transition-all duration-300"
                style={isDarkSection ? { filter: 'brightness(0) invert(1)' } : undefined}
              />
            </Link>

            {/* 데스크탑 네비게이션 */}
            <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label={lang === 'ko' ? '메인 메뉴' : 'Main menu'}>
              {navItems.map((item) => (
                <button
                  key={item.labelKo}
                  onClick={() => handleNavClick(item)}
                  className={`px-5 py-2.5 text-[15px] font-medium transition-colors relative group ${
                    isDarkSection
                      ? isActive(item) ? 'text-white' : 'text-white/60 hover:text-white'
                      : isActive(item) ? 'text-[#383838]' : 'text-[#777A86] hover:text-[#383838]'
                  }`}
                >
                  {label(item)}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#448CFF] transition-all duration-200 ${
                    isActive(item) ? 'w-4' : 'w-0 group-hover:w-4'
                  }`} />
                </button>
              ))}
            </nav>

            {/* 우측: KO/EN 토글 + 모바일 버튼 */}
            <div className="flex items-center gap-4">
              {/* 언어 토글 */}
              <div className="hidden lg:flex items-center gap-1">
                <button
                  onClick={() => setLang('ko')}
                  className={`px-2 py-1 text-[13px] font-medium transition-all duration-200 ${
                    isDarkSection
                      ? lang === 'ko' ? 'text-white/90' : 'text-white/30 hover:text-white/50'
                      : lang === 'ko' ? 'text-[#4E5968]' : 'text-[#D1D6DB] hover:text-[#B0B8C1]'
                  }`}
                >
                  KO
                </button>
                <span className={`text-[11px] transition-colors duration-300 ${isDarkSection ? 'text-white/20' : 'text-[#E5E8EB]'}`}>|</span>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 text-[13px] font-medium transition-all duration-200 ${
                    isDarkSection
                      ? lang === 'en' ? 'text-white/90' : 'text-white/30 hover:text-white/50'
                      : lang === 'en' ? 'text-[#4E5968]' : 'text-[#D1D6DB] hover:text-[#B0B8C1]'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* 모바일 메뉴 버튼 */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-lg transition-colors ${
                  isDarkSection ? 'text-white/80 hover:bg-white/10' : 'text-[#4B4E56] hover:bg-[#F8F9FD]'
                }`}
                aria-label={isMobileMenuOpen ? (lang === 'ko' ? '메뉴 닫기' : 'Close menu') : (lang === 'ko' ? '메뉴 열기' : 'Open menu')}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen
                  ? <X className="w-5 h-5" aria-hidden="true" />
                  : <Menu className="w-5 h-5" aria-hidden="true" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-label={lang === 'ko' ? '모바일 메뉴' : 'Mobile menu'}
        >
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <div className="pt-24 px-6">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.labelKo}
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left px-4 py-3.5 text-base font-medium rounded-lg transition-colors ${
                      isActive(item)
                        ? 'text-[#383838] bg-[#F8F9FD]'
                        : 'text-[#4B4E56] hover:text-[#383838] hover:bg-[#F8F9FD]'
                    }`}
                  >
                    {label(item)}
                  </button>
                ))}
              </div>

              {/* 모바일 언어 토글 */}
              <div className="mt-6 pt-6 border-t border-[#D3D8DF]">
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
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
