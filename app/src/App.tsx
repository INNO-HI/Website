import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/hooks/useTheme';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { Problem } from '@/sections/Problem';
import { Solution } from '@/sections/Solution';
import { HowItWorks } from '@/sections/HowItWorks';
import { Infrastructure } from '@/sections/Infrastructure';
import { UseCases } from '@/sections/UseCases';
import { EffectSimulator } from '@/sections/EffectSimulator';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const { toggleTheme, isDark, mounted } = useTheme();

  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Skip to Content Link */}
      <a href="#main-content" className="skip-to-content">
        본문으로 바로가기
      </a>

      {/* Navigation */}
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Content */}
      <main id="main-content">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Infrastructure />
        <UseCases />
        <EffectSimulator />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />
    </div>
  );
}

// Scroll Progress Component
function ScrollProgress() {
  useEffect(() => {
    const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-[60]"
      role="progressbar"
      aria-label="페이지 스크롤 진행률"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="scroll-progress h-full bg-sky-500 w-0 transition-all duration-100" />
    </div>
  );
}

export default App;
