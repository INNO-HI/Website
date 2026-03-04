import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const contact = document.getElementById('contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'mailto:contact@inno-hi.com';
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#448CFF] text-white font-semibold text-sm shadow-[0_8px_30px_rgba(68,140,255,0.40)] hover:bg-[#2E7FFA] transition-colors"
          aria-label={lang === 'ko' ? '문의하기' : 'Contact us'}
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          {lang === 'ko' ? '문의하기' : 'Contact'}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
