import { useEffect, useState } from 'react';
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface Notice {
  id: number;
  date: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
}

const notices: Notice[] = [
  {
    id: 1,
    date: '26.03.01',
    title: '등기 주소지 변경 안내',
    titleEn: 'Notice of Registered Address Change',
    content: `**등기 주소지 변경 안내**

안녕하세요, ㈜이노하이입니다.

당사의 등기 주소지가 아래와 같이 변경되었음을 안내드립니다.

**기존 주소**
서울특별시 강남구 영동대로 602, 6층 티288

**변경 주소**
서울특별시 중구 퇴계로36길 2, 신관동 지하2층 비257호

**적용일자**
2026년 3월 1일

변경된 주소로 우편 및 방문 업무를 진행해주시기 바랍니다.

감사합니다.
㈜이노하이 드림`,
    contentEn: `**Notice of Registered Address Change**

Hello, this is INNO-HI Inc.

We would like to inform you that our registered address has been changed as follows.

**Previous Address**
6F T288, 602 Yeongdong-daero, Gangnam-gu, Seoul

**New Address**
B2F B245, Singwan-dong, 2 Toegye-ro 36-gil, Jung-gu, Seoul

**Effective Date**
March 1, 2026

Please direct all mail and visits to the new address.

Thank you.
INNO-HI Inc.`,
  },
  {
    id: 2,
    date: '26.01.09',
    title: '법인 설립 및 사업 승계 안내',
    titleEn: 'Notice of Incorporation and Business Succession',
    content: `**법인 설립 및 사업 승계 안내**

안녕하세요, 주식회사 이노하이입니다.

당사는 2026년 1월 8일 개인사업자 「안심하이」의 사업 일체를 포괄양수도 방식으로 승계하였으며,
**2026년 1월 9일 주식회사 이노하이로 법인 설립** 등기를 완료하였습니다.

이에 따라 기존 안심하이의 모든 사업은 동일하게 유지되며, 관련 권리 및 의무는 주식회사 이노하이로 승계되었음을 안내드립니다.

앞으로도 더욱 체계적이고 책임 있는 기업으로 성장해 나가겠습니다.

감사합니다.

주식회사 이노하이`,
    contentEn: `**Notice of Incorporation and Business Succession**

Hello, this is INNO-HI Inc.

On January 8, 2026, our company succeeded all business operations of the sole proprietorship "Ansim-HI" through a comprehensive transfer, and **on January 9, 2026, completed the corporate registration as INNO-HI Inc.**

Accordingly, all existing business operations of Ansim-HI will continue as before, and all related rights and obligations have been succeeded by INNO-HI Inc.

We will continue to grow as a more systematic and responsible company.

Thank you.

INNO-HI Inc.`,
  },
];

// ── 상세 ─────────────────────────────────────────────────────────────

function NoticeDetail({ noticeId, lang }: { noticeId: number; lang: 'ko' | 'en' }) {
  const notice = notices.find(n => n.id === noticeId);
  const navigate = useNavigate();

  if (!notice) {
    return (
      <section className="pt-32 pb-20 text-center">
        <p className="text-[#B0B8C1]">{lang === 'ko' ? '존재하지 않는 공고사항입니다.' : 'Announcement not found.'}</p>
        <Link to="/notice" className="text-sm text-[#448CFF] font-medium mt-4 inline-block">
          {lang === 'ko' ? '← 목록으로' : '← Back'}
        </Link>
      </section>
    );
  }

  const idx = notices.findIndex(n => n.id === noticeId);
  const prev = idx > 0 ? notices[idx - 1] : null;
  const next = idx < notices.length - 1 ? notices[idx + 1] : null;

  return (
    <section className="pt-40 pb-20 lg:pt-[194px] lg:pb-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-14">
        <div className="mb-10">
          <p className="text-[16px] text-[#8B95A1] mb-5 tabular-nums">{notice.date}</p>
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-[1.5rem] sm:text-[1.75rem] font-bold text-[#191F28] leading-snug tracking-tight">
              {lang === 'ko' ? notice.title : notice.titleEn}
            </h1>
            <button
              onClick={() => navigate('/notice')}
              className="flex items-center gap-1.5 text-[14px] text-[#B0B8C1] hover:text-[#333D4B] font-medium flex-shrink-0 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === 'ko' ? '목록으로' : 'Back to list'}
            </button>
          </div>
        </div>

        <div className="border-t border-[#E5E8EB] pt-10 pb-14 sm:pt-12 sm:pb-16 min-h-[320px] text-[17px] text-[#4E5968] leading-[2] whitespace-pre-line max-w-4xl">
          {(lang === 'ko' ? notice.content : notice.contentEn).split(/(\*\*.*?\*\*)/).map((part, i) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={i} className="font-semibold text-[#333D4B]">{part.slice(2, -2)}</strong>
              : <span key={i}>{part}</span>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-6">
          {prev && (
            <Link
              to={`/notice/${prev.id}`}
              className="group flex items-center justify-between px-8 py-[26px] bg-white rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-200"
            >
              <div className="flex items-center gap-5">
                <span className="text-[13px] text-[#B0B8C1] font-medium">{lang === 'ko' ? '이전' : 'Prev'}</span>
                <span className="text-[16px] text-[#4E5968] font-medium group-hover:text-[#448CFF] truncate transition-colors duration-200">{lang === 'ko' ? prev.title : prev.titleEn}</span>
              </div>
              <ChevronLeft className="w-[18px] h-[18px] text-[#D1D6DB] group-hover:text-[#448CFF] transition-colors duration-200" />
            </Link>
          )}
          {next && (
            <Link
              to={`/notice/${next.id}`}
              className="group flex items-center justify-between px-8 py-[26px] bg-white rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-200"
            >
              <div className="flex items-center gap-5">
                <span className="text-[13px] text-[#B0B8C1] font-medium">{lang === 'ko' ? '다음' : 'Next'}</span>
                <span className="text-[16px] text-[#4E5968] font-medium group-hover:text-[#448CFF] truncate transition-colors duration-200">{lang === 'ko' ? next.title : next.titleEn}</span>
              </div>
              <ChevronRight className="w-[18px] h-[18px] text-[#D1D6DB] group-hover:text-[#448CFF] transition-colors duration-200" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

// ── 목록 ─────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 5;
const PAGE_GROUP_SIZE = 5;
const sortedNotices = [...notices].sort((a, b) => a.id - b.id);

function NoticeList({ lang }: { lang: 'ko' | 'en' }) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = sortedNotices.filter(n => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return n.title.toLowerCase().includes(q) || n.titleEn.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);
  const pageNumbers = Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i);

  useEffect(() => { setCurrentPage(1); }, [search]);

  const handlePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="pt-40 pb-16 lg:pt-[194px] lg:pb-24">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-14 w-full">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-[1.75rem] sm:text-[2rem] font-bold text-[#191F28] tracking-tight">
              {lang === 'ko' ? '공고사항' : 'Announcements'}
            </h1>
            <p className="text-[15px] text-[#777A86] mt-3 leading-relaxed">
              {lang === 'ko'
                ? '이노하이의 공식 발표 및 주요 변경 사항을 안내합니다.'
                : 'Official announcements and key updates from INNO-HI.'}
            </p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#B0B8C1]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'ko' ? '검색' : 'Search'}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-[#E5E8EB] text-[15px] text-[#333D4B] placeholder:text-[#B0B8C1] focus:outline-none focus:border-[#448CFF] transition-all duration-200"
            />
          </div>
        </div>

        {/* 카드 리스트 */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-[#B0B8C1]">
              {lang === 'ko' ? '검색 결과가 없습니다.' : 'No results found.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 min-h-[480px]">
            {paged.map((notice) => (
              <Link
                key={notice.id}
                to={`/notice/${notice.id}`}
                className="group flex items-center justify-between px-8 py-[26px] bg-white rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:-translate-y-[2px] transition-all duration-200"
              >
                <div className="flex items-center gap-6 min-w-0">
                  <span className="text-[14px] text-[#B0B8C1] tabular-nums flex-shrink-0">{notice.date}</span>
                  <span className="text-[16px] text-[#333D4B] font-medium group-hover:text-[#448CFF] transition-colors duration-200 truncate">
                    {lang === 'ko' ? notice.title : notice.titleEn}
                  </span>
                </div>
                <ChevronRight className="w-[18px] h-[18px] text-[#D1D6DB] group-hover:text-[#448CFF] flex-shrink-0 ml-4 transition-colors duration-200" />
              </Link>
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#B0B8C1] hover:text-[#3182F6] hover:bg-[#E8F3FF] disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePage(page)}
              className={`w-8 h-8 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                page === currentPage
                  ? 'bg-[#E8F3FF] text-[#3182F6]'
                  : 'text-[#B0B8C1] hover:bg-[#F2F4F6] hover:text-[#333D4B]'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#B0B8C1] hover:text-[#3182F6] hover:bg-[#E8F3FF] disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ── 메인 ─────────────────────────────────────────────────────────────

export function NoticePage() {
  const { lang } = useLanguage();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <main id="main-content">
      {id ? <NoticeDetail noticeId={Number(id)} lang={lang} /> : <NoticeList lang={lang} />}
    </main>
  );
}
