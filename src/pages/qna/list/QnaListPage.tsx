import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { QnaPostCard } from '@/features/qna/components';
import type { QnaPostCategory } from '@/features/qna/components';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg?react';
import CommentIcon from '@/shared/assets/icons/comment.svg?react';
import FilterIcon from '@/shared/assets/icons/filter.svg?react';
import PlusIcon from '@/shared/assets/icons/plus.svg?react';
import { Chip, HeroSection, Search } from '@/shared/ui';

import * as styles from './qna-list-page.styles';

type SortType = '기본' | '조회순' | '추천순';
type CategoryFilter = '전체' | '진로고민' | '취업준비' | '포트폴리오' | '기술질문';

type QnaPost = {
  id: number;
  category: QnaPostCategory;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
};

const CATEGORIES: CategoryFilter[] = ['전체', '진로고민', '취업준비', '포트폴리오', '기술질문'];

const CATEGORY_MAP: Record<Exclude<CategoryFilter, '전체'>, QnaPostCategory> = {
  진로고민: '진로 고민',
  취업준비: '취업 준비',
  포트폴리오: '포트폴리오',
  기술질문: '기술 질문',
};

const MOCK_POSTS: QnaPost[] = [
  {
    id: 1,
    category: '취업 준비',
    title: '백엔드 개발자 포트폴리오에 꼭 필요한 프로젝트는?',
    content:
      '백엔드 개발자로 취업 준비 중인 3학년 학생입니다. 포트폴리오에 어떤 프로젝트를 포함시켜야 할지 고민 ...',
    likeCount: 24,
    commentCount: 12,
    viewCount: 156,
    createdAt: '2시간 전',
  },
  {
    id: 2,
    category: '기술 질문',
    title: 'Spring Boot와 Node.js 중 어떤 걸 먼저 공부해야 할까요?',
    content:
      '프론트엔드는 React를 공부하고 있는데, 백엔드도 배우고 싶습니다. 어느 것부터 시작하는 게 좋을까요?',
    likeCount: 24,
    commentCount: 12,
    viewCount: 156,
    createdAt: '2시간 전',
  },
  {
    id: 3,
    category: '진로 고민',
    title: '졸업 후 바로 취업 vs 대학원 진학 고민됩니다',
    content:
      '컴퓨터공학과 4학년인데 진로를 결정하기가 어렵습니다. 선배님들의 경험담을 듣고 싶어요.',
    likeCount: 24,
    commentCount: 12,
    viewCount: 156,
    createdAt: '2시간 전',
  },
  {
    id: 4,
    category: '포트폴리오',
    title: 'GitHub 프로필 꾸미는 법 알려주세요!',
    content: 'README 파일을 작성하고 싶은데 어떻게 시작해야 할지 막막합니다.',
    likeCount: 24,
    commentCount: 12,
    viewCount: 156,
    createdAt: '2시간 전',
  },
  {
    id: 5,
    category: '취업 준비',
    title: '백엔드 개발자 포트폴리오에 꼭 필요한 프로젝트는?',
    content:
      '백엔드 개발자로 취업 준비 중인 3학년 학생입니다. 포트폴리오에 어떤 프로젝트를 포함시켜야 할지 고민 ...',
    likeCount: 24,
    commentCount: 12,
    viewCount: 156,
    createdAt: '2시간 전',
  },
  {
    id: 6,
    category: '기술 질문',
    title: '코딩테스트 준비 어떻게 하셨나요?',
    content:
      '알고리즘 공부를 시작하려는데 어떤 플랫폼을 이용했는지, 어떤 순서로 공부했는지 알고 싶어요.',
    likeCount: 45,
    commentCount: 20,
    viewCount: 412,
    createdAt: '4시간 전',
  },
  {
    id: 7,
    category: '진로 고민',
    title: '스타트업 vs 대기업 첫 취업 고민 중입니다',
    content:
      '개발자로서 첫 직장을 어디로 선택해야 성장에 도움이 될까요? 두 곳의 장단점이 궁금합니다.',
    likeCount: 67,
    commentCount: 28,
    viewCount: 534,
    createdAt: '5시간 전',
  },
];

export function QnaListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('전체');
  const [sortType, setSortType] = useState<SortType>('기본');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  const isFilterActive = sortType !== '기본';

  const filteredPosts = useMemo(() => {
    let result = MOCK_POSTS;

    if (selectedCategory !== '전체') {
      const mappedCategory = CATEGORY_MAP[selectedCategory];
      result = result.filter((post) => post.category === mappedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query),
      );
    }

    if (sortType === '조회순') {
      result = [...result].sort((a, b) => b.viewCount - a.viewCount);
    } else if (sortType === '추천순') {
      result = [...result].sort((a, b) => b.likeCount - a.likeCount);
    }

    return result;
  }, [searchQuery, selectedCategory, sortType]);

  function handleSortSelect(sort: '조회순' | '추천순') {
    setSortType(sort);
    setIsDropdownOpen(false);
  }

  function handleLikeClick(id: number) {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={styles.page}>
      <HeroSection
        variant="qna"
        title="Q&A 게시판"
        description="익명으로 질문하고 졸업생의 답변을 받아보세요"
        icon={<CommentIcon className="w-7 h-7 text-white" aria-hidden="true" />}
        className={styles.heroBreakout}
      />

      <div className={styles.searchSection}>
        <Search
          width="full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="검색어를 입력해주세요"
          aria-label="Q&A 게시글 검색"
        />
      </div>

      <div className={styles.chipsSection}>
        <div className={styles.chipsList}>
          {CATEGORIES.map((category) => (
            <Chip
              key={category}
              size="md"
              variant="filled"
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Chip>
          ))}
        </div>
      </div>

      <div className={styles.filterRow}>
        <h2 className={styles.sectionTitle}>Q&A 게시판</h2>

        <div className={styles.dropdownWrapper}>
          <button
            type="button"
            className={isFilterActive ? styles.filterButtonActive : styles.filterButton}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="menu"
          >
            <FilterIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>필터</span>
            <ArrowDownIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </button>

          {isDropdownOpen && (
            <div role="menu" className={styles.dropdown}>
              {(['조회순', '추천순'] as const).map((sort) => (
                <button
                  key={sort}
                  type="button"
                  role="menuitem"
                  className={styles.dropdownItem}
                  onClick={() => handleSortSelect(sort)}
                >
                  {sort}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.postList}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <QnaPostCard
              key={post.id}
              category={post.category}
              author="익명"
              createdAt={post.createdAt}
              title={post.title}
              preview={post.content}
              likeCount={post.likeCount + (likedIds.has(post.id) ? 1 : 0)}
              commentCount={post.commentCount}
              viewCount={post.viewCount}
              isLiked={likedIds.has(post.id)}
              onLikeClick={() => handleLikeClick(post.id)}
              className="w-full"
            />
          ))
        ) : (
          <p className={styles.emptyState}>검색 결과가 없습니다.</p>
        )}
      </div>

      <button
        type="button"
        className={styles.fab}
        aria-label="글쓰기"
        onClick={() => navigate('/qna/create')}
      >
        <PlusIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}
