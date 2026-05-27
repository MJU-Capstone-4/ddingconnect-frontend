import { useState } from 'react';

import { SeniorProfileCard } from '@/features/coffee-chat/components/senior-profile-card';
import type { SeniorProfileCardProps } from '@/features/coffee-chat/components/senior-profile-card';
import { QnaPostCard } from '@/features/qna/components/qna-post-card';
import type { QnaPostCardProps } from '@/features/qna/components/qna-post-card';
import { RoadmapResultCard } from '@/features/roadmap/components/roadmap-result-card';
import type { RoadmapResultCardProps } from '@/features/roadmap/components/roadmap-result-card';
import ChevronRightIcon from '@/shared/assets/icons/chevron-right.svg?react';
import UserIcon from '@/shared/assets/icons/user.svg?react';
import { Chip } from '@/shared/ui/chip';
import { HeroSection } from '@/shared/ui/hero-section';

import * as styles from './my-activity-page.styles';

type CoffeeChatMock = Omit<SeniorProfileCardProps, 'onClick' | 'className'>;
type RoadmapMock = Omit<RoadmapResultCardProps, 'onDownload' | 'className'>;
type QnaMock = Omit<QnaPostCardProps, 'onClick' | 'onLikeClick' | 'onCommentClick' | 'className'>;

const MOCK_COFFEE_CHATS: CoffeeChatMock[] = [
  {
    name: '이선배',
    department: "컴퓨터공학과 '18",
    company: '네이버',
    job: '백엔드 개발자',
    career: '경력 3년',
    techStacks: ['React', 'TypeScript'],
  },
  {
    name: '이선배',
    department: "컴퓨터공학과 '18",
    company: '네이버',
    job: '백엔드 개발자',
    career: '경력 3년',
    techStacks: ['React', 'TypeScript'],
  },
];

const MOCK_ROADMAPS: RoadmapMock[] = [
  { title: '백엔드 개발자 로드맵', createdAt: '2026. 04. 09 • 오전 10:00' },
  { title: '디자이너 로드맵', createdAt: '2026. 04. 08 • 오전 10:00' },
  { title: '프론트엔드 개발자 로드맵', createdAt: '2026. 04. 07 • 오전 10:00' },
];

const MOCK_QNAS: QnaMock[] = [
  {
    category: '취업 준비',
    author: '익명',
    createdAt: '2시간 전',
    title: '백엔드 개발자 포트폴리오에 꼭 필요한 프로젝트는?',
    preview:
      '백엔드 개발자로 취업 준비 중인 3학년 학생입니다. 포트폴리오는 어떤 프로젝트를 포함시켜야 할지 고민 중...',
    likeCount: 24,
    commentCount: 12,
    viewCount: 156,
  },
  {
    category: '기술 질문',
    author: '익명',
    createdAt: '2시간 전',
    title: 'Spring Boot와 Node.js 중 어떤 걸 먼저 공부해야 할까요?',
    preview:
      '프론트엔드는 React를 공부하고 있는데, 백엔도도 배우고 싶습니다. 어느 것부터 시작하는 게 좋을까요?',
    likeCount: 24,
    commentCount: 12,
    viewCount: 156,
  },
  {
    category: '진로 고민',
    author: '익명',
    createdAt: '2시간 전',
    title: '취업 후 바로 대기업 vs 스타트업 어디가 좋을까요?',
    preview: '졸업 후 바로 취업할 예정인데 어떤 회사 규모가 성장에 더 도움이 될지 고민됩니다.',
    likeCount: 18,
    commentCount: 8,
    viewCount: 203,
  },
];

const COFFEE_CHAT_TOTAL = 12;
const ROADMAP_TOTAL = 3;
const QNA_TOTAL = 5;

const CATEGORIES = ['전체', '커피챗', '로드맵', 'Q&A'] as const;
type Category = (typeof CATEGORIES)[number];

export function MyActivityPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');

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
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            role="tab"
            aria-selected={selectedCategory === cat}
            active={selectedCategory === cat}
            size="md"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Chip>
        ))}
      </div>

      <div className={styles.sections}>
        <section className={styles.section} aria-label="커피챗 활동">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionTitle}>커피챗</span>
              <span className={styles.sectionCount}>{COFFEE_CHAT_TOTAL}</span>
            </div>
            <button
              type="button"
              className={styles.viewAllBtn}
              onClick={() => {
                // TODO: 커피챗 전체보기 연결
              }}
              aria-label="커피챗 전체보기"
            >
              전체보기
              <ChevronRightIcon className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
          <div className={styles.cardList}>
            {MOCK_COFFEE_CHATS.map((chat, i) => (
              <SeniorProfileCard
                key={i}
                {...chat}
                onClick={() => {
                  // TODO: 선배 상세 페이지 연결
                }}
                className="w-full"
              />
            ))}
          </div>
        </section>

        <section className={styles.section} aria-label="로드맵 활동">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionTitle}>로드맵</span>
              <span className={styles.sectionCount}>{ROADMAP_TOTAL}</span>
            </div>
            <button
              type="button"
              className={styles.viewAllBtn}
              onClick={() => {
                // TODO: 로드맵 전체보기 연결
              }}
              aria-label="로드맵 전체보기"
            >
              전체보기
              <ChevronRightIcon className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
          <div className={styles.cardList}>
            {MOCK_ROADMAPS.map((roadmap) => (
              <RoadmapResultCard
                key={roadmap.title}
                {...roadmap}
                onDownload={() => {
                  // TODO: 로드맵 다운로드
                }}
                className="w-full"
              />
            ))}
          </div>
        </section>

        <section className={styles.section} aria-label="Q&A 활동">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <span className={styles.sectionTitle}>Q&A</span>
              <span className={styles.sectionCount}>{QNA_TOTAL}</span>
            </div>
            <button
              type="button"
              className={styles.viewAllBtn}
              onClick={() => {
                // TODO: Q&A 전체보기 연결
              }}
              aria-label="Q&A 전체보기"
            >
              전체보기
              <ChevronRightIcon className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
          <div className={styles.cardList}>
            {MOCK_QNAS.map((qna) => (
              <QnaPostCard
                key={qna.title}
                {...qna}
                onClick={() => {
                  // TODO: Q&A 상세 페이지 연결
                }}
                className="w-full"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
