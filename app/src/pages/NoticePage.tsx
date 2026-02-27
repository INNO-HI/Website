import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, ArrowLeft } from 'lucide-react';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Link, useParams, useNavigate } from 'react-router-dom';

const notices = [
  {
    id: 1,
    category: '공지',
    categoryEn: 'Notice',
    title: 'INNO-HI 공식 홈페이지 개설 안내',
    titleEn: 'INNO-HI Official Website Launch',
    date: '2026.02.20',
    content: '안녕하세요, 이노하이입니다.\n\nINNO-HI 공식 홈페이지가 개설되었습니다.\n앞으로 회사 소개, 서비스 안내, 공지사항 등 다양한 정보를 이 곳에서 확인하실 수 있습니다.\n\n도입 문의 및 기타 문의사항은 contact@innohi.ai.kr 으로 연락해 주세요.\n감사합니다.',
    contentEn: 'Hello, this is INNO-HI.\n\nThe official INNO-HI website has launched.\nYou can now find information about our company, services, and announcements here.\n\nFor inquiries, please contact us at contact@innohi.ai.kr.\nThank you.',
  },
  {
    id: 2,
    category: '안내',
    categoryEn: 'Guide',
    title: '서비스 도입 문의 채널 안내',
    titleEn: 'Service Inquiry Channel Guide',
    date: '2026.02.20',
    content: '안녕하세요, 이노하이입니다.\n\n도입 문의는 아래 채널을 통해 진행해 주세요.\n\n- 이메일: contact@innohi.ai.kr\n- 전화: 010-8225-4024\n\n담당자가 빠르게 회신 드리겠습니다.\n감사합니다.',
    contentEn: 'Hello, this is INNO-HI.\n\nFor service inquiries, please use the following channels.\n\n- Email: contact@innohi.ai.kr\n- Phone: 010-8225-4024\n\nOur team will respond promptly.\nThank you.',
  },
  {
    id: 3,
    category: '업데이트',
    categoryEn: 'Update',
    title: '이노하이 베타 서비스 출시 예정 안내',
    titleEn: 'INNO-HI Beta Service Launch Notice',
    date: '2026.02.20',
    content: '안녕하세요, 이노하이입니다.\n\n이노하이 AX 플랫폼 베타 서비스 출시를 앞두고 있습니다.\n사전 등록 기관에는 우선적으로 도입 혜택을 제공해 드릴 예정입니다.\n\n자세한 내용은 추후 공지드리겠습니다.\n감사합니다.',
    contentEn: 'Hello, this is INNO-HI.\n\nWe are preparing to launch the INNO-HI AX Platform beta service.\nPre-registered organizations will receive priority access and special benefits.\n\nMore details will be announced soon.\nThank you.',
  },
];

const categoryStyle: Record<string, string> = {
  '공지': 'bg-blue-50 text-blue-600',
  '안내': 'bg-purple-50 text-purple-600',
  '업데이트': 'bg-emerald-50 text-emerald-600',
};

// 상세 페이지
function NoticeDetail({ noticeId, lang }: { noticeId: number; lang: 'ko' | 'en' }) {
  const notice = notices.find(n => n.id === noticeId);
  const navigate = useNavigate();

  if (!notice) {
    return (
      <section className="py-32 text-center">
        <p className="text-[#777A86]">{lang === 'ko' ? '존재하지 않는 공지사항입니다.' : 'Notice not found.'}</p>
        <Link to="/notice" className="text-sm text-[#448CFF] font-medium mt-4 inline-block">
          {lang === 'ko' ? '← 목록으로 돌아가기' : '← Back to list'}
        </Link>
      </section>
    );
  }

  const catStyle = categoryStyle[notice.category] || 'bg-gray-50 text-gray-500';
  const currentIndex = notices.findIndex(n => n.id === noticeId);
  const prevNotice = currentIndex > 0 ? notices[currentIndex - 1] : null;
  const nextNotice = currentIndex < notices.length - 1 ? notices[currentIndex + 1] : null;

  return (
    <>
      <section className="pt-32 pb-10 lg:pt-40 lg:pb-14 bg-gradient-to-b from-[#EEF4FF] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate('/notice')}
            className="flex items-center gap-1.5 text-sm text-[#777A86] hover:text-[#448CFF] font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'ko' ? '목록으로' : 'Back to list'}
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${catStyle}`}>
                {lang === 'ko' ? notice.category : notice.categoryEn}
              </span>
              <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                <Calendar className="w-3.5 h-3.5" />
                {notice.date}
              </span>
            </div>
            <h1 className="font-semibold text-[#1A1D2E] tracking-tight" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
              {lang === 'ko' ? notice.title : notice.titleEn}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-[#EAEDF2] bg-white p-6 sm:p-8 shadow-sm"
          >
            <p className="text-[15px] text-[#4B4E56] leading-relaxed whitespace-pre-line font-medium">
              {lang === 'ko' ? notice.content : notice.contentEn}
            </p>
          </motion.div>

          {/* 이전/다음 네비게이션 */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {prevNotice ? (
              <Link
                to={`/notice/${prevNotice.id}`}
                className="p-4 rounded-xl border border-[#EAEDF2] hover:border-[#448CFF]/30 hover:bg-[#FAFBFF] transition-all"
              >
                <p className="text-[10px] text-[#9CA3AF] font-semibold mb-1">{lang === 'ko' ? '이전 글' : 'Previous'}</p>
                <p className="text-sm text-[#383838] font-medium truncate">{lang === 'ko' ? prevNotice.title : prevNotice.titleEn}</p>
              </Link>
            ) : <div />}
            {nextNotice ? (
              <Link
                to={`/notice/${nextNotice.id}`}
                className="p-4 rounded-xl border border-[#EAEDF2] hover:border-[#448CFF]/30 hover:bg-[#FAFBFF] transition-all text-right"
              >
                <p className="text-[10px] text-[#9CA3AF] font-semibold mb-1">{lang === 'ko' ? '다음 글' : 'Next'}</p>
                <p className="text-sm text-[#383838] font-medium truncate">{lang === 'ko' ? nextNotice.title : nextNotice.titleEn}</p>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </>
  );
}

// 목록 페이지
function NoticeList({ lang }: { lang: 'ko' | 'en' }) {
  return (
    <>
      <section className="pt-32 pb-10 lg:pt-40 lg:pb-14 bg-gradient-to-b from-[#EEF4FF] to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#D3D8DF] mb-5"
          >
            <Bell className="w-3.5 h-3.5 text-[#448CFF]" />
            <span className="text-xs font-semibold text-[#448CFF]">
              {lang === 'ko' ? '공지사항' : 'Notice'}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-semibold text-[#1A1D2E] tracking-tight mb-3"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}
          >
            {lang === 'ko' ? '공지사항' : 'Notices'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#777A86] text-[15px] font-medium"
          >
            {lang === 'ko'
              ? 'INNO-HI의 최신 소식과 업데이트를 확인하세요.'
              : 'Check the latest news and updates from INNO-HI.'}
          </motion.p>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden sm:grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 mb-2 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
            <span className="w-16">{lang === 'ko' ? '분류' : 'Category'}</span>
            <span>{lang === 'ko' ? '제목' : 'Title'}</span>
            <span className="text-right">{lang === 'ko' ? '날짜' : 'Date'}</span>
          </div>

          <div className="rounded-2xl border border-[#EAEDF2] overflow-hidden bg-white shadow-sm">
            {notices.map((notice, index) => {
              const catStyle = categoryStyle[notice.category] || 'bg-gray-50 text-gray-500';

              return (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="border-b border-[#EAEDF2] last:border-0"
                >
                  <Link
                    to={`/notice/${notice.id}`}
                    className="block w-full text-left px-5 py-4 sm:px-6 sm:py-5 hover:bg-[#FAFBFF] transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ${catStyle}`}>
                        {lang === 'ko' ? notice.category : notice.categoryEn}
                      </span>

                      <p className="flex-1 text-sm sm:text-[15px] font-semibold text-[#1A1D2E] truncate hover:text-[#448CFF] transition-colors">
                        {lang === 'ko' ? notice.title : notice.titleEn}
                      </p>

                      <span className="hidden sm:flex items-center gap-1 text-xs text-[#9CA3AF] flex-shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        {notice.date}
                      </span>
                    </div>

                    <div className="sm:hidden flex items-center gap-1 text-[11px] text-[#9CA3AF] mt-1.5">
                      <Calendar className="w-3 h-3" />
                      {notice.date}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-xs text-[#B0BAC8] mt-6">
            {lang === 'ko'
              ? '총 ' + notices.length + '건의 공지사항이 있습니다.'
              : notices.length + ' notice(s) total.'}
          </p>
        </div>
      </section>
    </>
  );
}

export function NoticePage() {
  const { lang } = useLanguage();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="relative min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        {lang === 'ko' ? '본문으로 바로가기' : 'Skip to main content'}
      </a>
      <Navigation />
      <main id="main-content">
        {id ? <NoticeDetail noticeId={Number(id)} lang={lang} /> : <NoticeList lang={lang} />}
      </main>
      <Footer />
    </div>
  );
}
