import { useEffect } from 'react';
import { Hero } from '@/sections/Hero';
import { Solution } from '@/sections/Solution';
import { UseCases } from '@/sections/UseCases';
import { PartnerLogos } from '@/sections/SocialProof';

import { CTA } from '@/sections/CTA';
import { FloatingCTA } from '@/components/FloatingCTA';

export function MainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('snap-scroll');
    return () => document.documentElement.classList.remove('snap-scroll');
  }, []);

  return (
    <>
      <main id="main-content">
        <Hero />
        <PartnerLogos />
        <Solution />
        <UseCases />
        <CTA />
      </main>
      <FloatingCTA />
      <ScrollProgress />
    </>
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
