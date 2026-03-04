import { useLanguage } from '@/hooks/useLanguage';

import kepcoMcsLogo from '@/assets/partners/kepco-mcs.png';
import donggukLogo from '@/assets/partners/dongguk.png';
import bodymapLogo from '@/assets/partners/bodymap.png';
import seoulAiLogo from '@/assets/partners/seoul-ai.jpg';
import yangcheonLogo from '@/assets/partners/yangcheon.jpg';
import ssisLogo from '@/assets/partners/ssis.svg';

const partnerLogos = [
  { src: kepcoMcsLogo, alt: '한전MCS', altEn: 'KEPCO MCS', height: 'h-10' },
  { src: ssisLogo, alt: '한국사회보장정보원', altEn: 'SSIS', height: 'h-10' },
  { src: seoulAiLogo, alt: '서울AI재단', altEn: 'Seoul AI Foundation', height: 'h-10' },
  { src: yangcheonLogo, alt: '양천구청', altEn: 'Yangcheon District', height: 'h-16' },
  { src: donggukLogo, alt: '동국대학교', altEn: 'Dongguk University', height: 'h-10' },
  { src: bodymapLogo, alt: '바디맵', altEn: 'Bodymap', height: 'h-10' },
];

function PartnerChip({ logo, lang }: { logo: typeof partnerLogos[number]; lang: 'ko' | 'en' }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 mx-2 sm:mx-3" style={{ minWidth: 140, height: 56 }}>
      <img
        src={logo.src}
        alt={lang === 'ko' ? logo.alt : logo.altEn}
        className={`${logo.height} w-auto max-w-[100px] sm:max-w-[150px] object-contain grayscale opacity-60`}
      />
    </div>
  );
}

/* 로고 마키 — Hero 바로 아래 */
export function PartnerLogos() {
  const { lang } = useLanguage();
  const quadrupled = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <div className="bg-white py-10 sm:py-16 lg:py-20">
      <div className="max-w-[1720px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, white, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, white, transparent)' }} />
          <div className="flex animate-marquee">
            {quadrupled.map((logo, i) => (
              <PartnerChip key={i} logo={logo} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
