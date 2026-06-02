import { useNavigate, useSearchParams } from 'react-router';

import { getUserRole } from '@/features/auth/model/auth-state';
import { CoffeeChatActivityCard } from '@/features/coffee-chat/components/coffee-chat-activity-card';
import { useMyCoffeeChatsQuery } from '@/features/coffee-chat/hooks';
import type { CoffeeChatActivityItem } from '@/features/coffee-chat/types';
import { useMyPageQuery } from '@/features/mypage';
import { API_TO_UI_CATEGORY } from '@/features/qna/model/question.constants';
import { useMyQuestionsQuery } from '@/features/qna/hooks';
import { QnaPostCard } from '@/features/qna/components/qna-post-card';
import { RoadmapResultCard } from '@/features/roadmap/components/roadmap-result-card';
import { useRoadmapsQuery } from '@/features/roadmap/hooks';
import ChevronRightIcon from '@/shared/assets/icons/chevron-right.svg?react';
import UserIcon from '@/shared/assets/icons/user.svg?react';
import { Chip } from '@/shared/ui/chip';
import { HeroSection } from '@/shared/ui/hero-section';
import { formatDateKo } from '@/shared/utils/format-date';

import * as styles from './my-activity-page.styles';

// ---------------------------------------------------------------------------
// Demo fallback: 기말 발표 시연 안정성을 위해 유지
// ---------------------------------------------------------------------------
const USE_MOCK_FALLBACK = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_FALLBACK === 'true';

const MOCK_COFFEE_CHATS: CoffeeChatActivityItem[] = [
  {
    coffeeChatId: 1,
    status: 'ACCEPTED',
    partnerId: 101,
    partnerNickname: '이선배',
    partnerDepartment: "컴퓨터공학과 '18",
    partnerJobs: ['백엔드 개발자'],
    partnerTechStacks: ['React', 'TypeScript'],
  },
  {
    coffeeChatId: 2,
    status: 'PENDING',
    partnerId: 102,
    partnerNickname: '박선배',
    partnerDepartment: "소프트웨어학과 '19",
    partnerJobs: ['프론트엔드 개발자'],
    partnerTechStacks: ['Vue', 'Node.js'],
  },
];

const MOCK_ROADMAPS = [
  { id: 1, title: '백엔드 개발자 로드맵', createdAt: '2026-04-09T10:00:00.000Z' },
  { id: 2, title: '디자이너 로드맵', createdAt: '2026-04-08T10:00:00.000Z' },
  { id: 3, title: '프론트엔드 개발자 로드맵', createdAt: '2026-04-07T10:00:00.000Z' },
];

const MOCK_QNAS = [
  {
    id: 1,
    category: 'STUDY' as const,
    memberId: 1,
    title: '백엔드 개발자 포트폴리오에 꼭 필요한 프로젝트는?',
    content:
      '백엔드 개발자로 취업 준비 중인 3학년 학생입니다. 포트폴리오는 어떤 프로젝트를 포함시켜야 할지 고민 중...',
    viewCount: 156,
    likeCount: 24,
    answerCount: 12,
    likedByMe: false,
  },
  {
    id: 2,
    category: 'TECHNICAL' as const,
    memberId: 1,
    title: 'Spring Boot와 Node.js 중 어떤 걸 먼저 공부해야 할까요?',
    content:
      '프론트엔드는 React를 공부하고 있는데, 백엔드도 배우고 싶습니다. 어느 것부터 시작하는 게 좋을까요?',
    viewCount: 156,
    likeCount: 24,
    answerCount: 12,
    likedByMe: false,
  },
];
// ---------------------------------------------------------------------------

type Category = '전체' | '커피챗' | '로드맵' | 'Q&A';
const ALL_CATEGORIES: Category[] = ['전체', '커피챗', '로드맵', 'Q&A'];
const GRADUATE_CATEGORIES: Category[] = ['전체', '커피챗', 'Q&A'];

function EmptyState({ message }: { message: string }) {
  return <p className="py-4 text-center text-sm text-text-secondary">{message}</p>;
}

function ErrorState({ message }: { message: string }) {
  return <p className="py-4 text-center text-sm text-red-400">{message}</p>;
}

export function MyActivityPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: mypageData } = useMyPageQuery();

  const isGraduate = getUserRole() === 'GRADUATE';
  const categories = isGraduate ? GRADUATE_CATEGORIES : ALL_CATEGORIES;

  const tabParam = searchParams.get('tab') as Category | null;
  const selectedCategory: Category = tabParam && categories.includes(tabParam) ? tabParam : '전체';

  const handleCategoryChange = (cat: Category) => {
    setSearchParams(cat === '전체' ? {} : { tab: cat }, { replace: true });
  };

  const coffeeChatTotal = mypageData?.activity?.coffeeChatCount ?? 0;
  const roadmapTotal = mypageData?.activity?.roadmapCount ?? 0;
  const qnaTotal = mypageData?.activity?.questionCount ?? 0;

  const {
    data: apiCoffeeChats,
    isLoading: isCoffeeChatsLoading,
    isError: isCoffeeChatsError,
  } = useMyCoffeeChatsQuery();

  const {
    data: apiRoadmaps,
    isLoading: isRoadmapsLoading,
    isError: isRoadmapsError,
  } = useRoadmapsQuery();

  const {
    data: apiQuestions,
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
  } = useMyQuestionsQuery();

  // Demo fallback: 기말 발표 시연 안정성을 위해 유지
  const coffeeChats =
    isCoffeeChatsError && USE_MOCK_FALLBACK ? MOCK_COFFEE_CHATS : (apiCoffeeChats ?? []);

  const roadmaps = isRoadmapsError && USE_MOCK_FALLBACK ? MOCK_ROADMAPS : (apiRoadmaps ?? []);

  const questions = isQuestionsError && USE_MOCK_FALLBACK ? MOCK_QNAS : (apiQuestions ?? []);

  const showCoffeeChat = selectedCategory === '전체' || selectedCategory === '커피챗';
  const showRoadmap = !isGraduate && (selectedCategory === '전체' || selectedCategory === '로드맵');
  const showQna = selectedCategory === '전체' || selectedCategory === 'Q&A';

  const allEmpty =
    selectedCategory === '전체' &&
    !isCoffeeChatsLoading &&
    (isGraduate || !isRoadmapsLoading) &&
    !isQuestionsLoading &&
    coffeeChats.length === 0 &&
    (isGraduate || roadmaps.length === 0) &&
    questions.length === 0;

  return (
    <div className={styles.page}>
      <HeroSection
        variant="activity"
        title="나의 활동"
        description="띵커넥트에서의 활동을 확인해보세요"
        icon={<UserIcon className="w-7 h-7 text-white" aria-hidden="true" />}
        className={styles.heroBreakout}
      />

      <div className={styles.chipRow} role="tablist" aria-label="활동 카테고리">
        {categories.map((cat) => (
          <Chip
            key={cat}
            role="tab"
            aria-selected={selectedCategory === cat}
            active={selectedCategory === cat}
            size="md"
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </Chip>
        ))}
      </div>

      <div className={styles.sections}>
        {allEmpty && <EmptyState message="아직 활동 내역이 없습니다." />}

        {showCoffeeChat && (
          <section className={styles.section} aria-label="커피챗 활동">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitle}>커피챗</span>
                <span className={styles.sectionCount}>{coffeeChatTotal}</span>
              </div>
              <button
                type="button"
                className={styles.viewAllBtn}
                onClick={() =>
                  navigate(isGraduate ? '/coffee-chat/received' : '/coffee-chat/matching-result')
                }
                aria-label="커피챗 전체보기"
              >
                전체보기
                <ChevronRightIcon className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
            <div className={styles.cardList}>
              {isCoffeeChatsLoading ? (
                <p className="py-4 text-center text-sm text-text-secondary">불러오는 중...</p>
              ) : isCoffeeChatsError && !USE_MOCK_FALLBACK ? (
                <ErrorState message="커피챗 활동을 불러오지 못했습니다." />
              ) : coffeeChats.length === 0 ? (
                <EmptyState message="커피챗 활동이 없습니다." />
              ) : (
                coffeeChats.map((chat) => (
                  <CoffeeChatActivityCard
                    key={chat.coffeeChatId}
                    {...chat}
                    className="w-full"
                    // TODO: 커피챗 활동 상세 페이지 확정 후 연결
                  />
                ))
              )}
            </div>
          </section>
        )}

        {showRoadmap && (
          <section className={styles.section} aria-label="로드맵 활동">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitle}>로드맵</span>
                <span className={styles.sectionCount}>{roadmapTotal}</span>
              </div>
              <button
                type="button"
                className={styles.viewAllBtn}
                onClick={() => navigate('/roadmap/result')}
                aria-label="로드맵 전체보기"
              >
                전체보기
                <ChevronRightIcon className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
            <div className={styles.cardList}>
              {isRoadmapsLoading ? (
                <p className="py-4 text-center text-sm text-text-secondary">불러오는 중...</p>
              ) : isRoadmapsError && !USE_MOCK_FALLBACK ? (
                <ErrorState message="로드맵을 불러오지 못했습니다." />
              ) : roadmaps.length === 0 ? (
                <EmptyState message="로드맵이 없습니다." />
              ) : (
                roadmaps.map((roadmap) => (
                  <RoadmapResultCard
                    key={roadmap.id}
                    title={roadmap.title || '로드맵'}
                    createdAt={formatDateKo(roadmap.createdAt)}
                    onCardClick={() => navigate(`/roadmap/${roadmap.id}`)}
                    onDownload={() => navigate(`/roadmap/result`)}
                    className="w-full"
                  />
                ))
              )}
            </div>
          </section>
        )}

        {showQna && (
          <section className={styles.section} aria-label="Q&A 활동">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionTitle}>Q&A</span>
                <span className={styles.sectionCount}>{qnaTotal}</span>
              </div>
              <button
                type="button"
                className={styles.viewAllBtn}
                onClick={() => navigate('/qna')}
                aria-label="Q&A 전체보기"
              >
                전체보기
                <ChevronRightIcon className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
            <div className={styles.cardList}>
              {isQuestionsLoading ? (
                <p className="py-4 text-center text-sm text-text-secondary">불러오는 중...</p>
              ) : isQuestionsError && !USE_MOCK_FALLBACK ? (
                <ErrorState message="질문을 불러오지 못했습니다." />
              ) : questions.length === 0 ? (
                <EmptyState message="작성한 질문이 없습니다." />
              ) : (
                questions.map((qna) => (
                  <QnaPostCard
                    key={qna.id}
                    category={API_TO_UI_CATEGORY[qna.category ?? 'ETC']}
                    author="나"
                    createdAt=""
                    title={qna.title ?? ''}
                    preview={qna.content ?? ''}
                    likeCount={Number(qna.likeCount ?? 0)}
                    commentCount={Number(qna.answerCount ?? 0)}
                    viewCount={qna.viewCount ?? 0}
                    isLiked={qna.likedByMe ?? false}
                    onClick={() => navigate(`/qna/${qna.id}`)}
                    className="w-full"
                  />
                ))
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
