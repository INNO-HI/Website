import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
// import { CasesPage } from '@/pages/CasesPage';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    ScrollTrigger.defaults({ toggleActions: 'play none none reverse' });
    ScrollTrigger.refresh();
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/notice/:id?" element={<NoticePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/cases" element={<CasesPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
