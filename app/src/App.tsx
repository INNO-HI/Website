import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from '@/context/LanguageProvider';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { NoticePage } from '@/pages/NoticePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ContactPage } from '@/pages/ContactPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { CasesPage } from '@/pages/CasesPage';
import { CaseDetailPage } from '@/pages/CaseDetailPage';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();
  const [displayLoc, setDisplayLoc] = useState(location);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (location.pathname === displayLoc.pathname) {
      setDisplayLoc(location);
      return;
    }

    // fade out
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => setDisplayLoc(location),
      });
    }
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isFirst.current && wrapperRef.current) {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' },
      );
    }
  }, [displayLoc]);

  return (
    <div ref={wrapperRef}>
      <Routes location={displayLoc}>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/notice/:id?" element={<NoticePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/cases/:id" element={<CaseDetailPage />} />
      </Routes>
    </div>
  );
}

function App() {
  useEffect(() => {
    ScrollTrigger.defaults({ toggleActions: 'play none none reverse' });
    ScrollTrigger.refresh();
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-white">
        <ScrollToTop />
        <Navigation />
        <AppRoutes />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
