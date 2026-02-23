import { useEffect } from 'react';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { Solution } from '@/sections/Solution';
import { SocialProof } from '@/sections/SocialProof';
import { CTA } from '@/sections/CTA';
import { Footer } from '@/sections/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';

export function MainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        본문으로 바로가기
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Solution />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
      <FloatingCTA />
      <ScrollProgress />
    </div>
  );
}

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
      <div className="scroll-progress h-full bg-[#448CFF] w-0 transition-all duration-100" />
    </div>
  );
}
