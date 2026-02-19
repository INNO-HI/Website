import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const navItems = [
  { label: '솔루션', href: '#solution' },
  { label: '프로세스', href: '#how-it-works' },
  { label: '기술', href: '#infrastructure' },
  { label: '적용분야', href: '#use-cases' },
  { label: '문의', href: '#contact' },
];

export function Navigation({ isDark, toggleTheme }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        본문으로 바로가기
      </a>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-[#D3D8DF]/50 dark:border-slate-800'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              aria-label="INNO-HI 홈으로 이동"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#448CFF] rounded-lg opacity-10" />
                <span className="relative text-lg font-bold text-[#383838]">I</span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#448CFF] rounded-full" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold text-[#383838] tracking-tight">INNO-HI</span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="메인 메뉴">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 text-[15px] font-medium text-[#777A86] hover:text-[#383838] transition-colors relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#448CFF] group-hover:w-4 transition-all duration-200" />
                </motion.button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg text-[#777A86] hover:bg-[#F8F9FD] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Sun className="w-5 h-5" aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Moon className="w-5 h-5" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="hidden lg:block">
                <Button
                  onClick={() => scrollToSection('#contact')}
                  className="bg-[#383838] hover:bg-[#444B52] text-white rounded-full px-5 py-2 text-sm font-semibold transition-all min-h-[40px]"
                >
                  도입 문의
                </Button>
              </motion.div>

              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg text-[#4B4E56] hover:bg-[#F8F9FD] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 lg:hidden"
            role="dialog"
            aria-label="모바일 메뉴"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} aria-hidden="true" />
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
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left px-4 py-3.5 text-base font-medium text-[#4B4E56] hover:text-[#383838] hover:bg-[#F8F9FD] rounded-lg transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
                <motion.div className="mt-6 pt-6 border-t border-[#D3D8DF]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <Button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full bg-[#448CFF] hover:bg-[#68A1FF] text-white rounded-xl py-3.5 text-base font-semibold min-h-[52px]"
                  >
                    도입 문의하기
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
