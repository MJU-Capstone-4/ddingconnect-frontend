import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import { QnaPostCard } from '@/features/qna/components';
import type { QnaPostCategory } from '@/features/qna/components';
import { useQuestionsQuery, useToggleQuestionLikeMutation } from '@/features/qna/hooks';
import { API_TO_UI_CATEGORY } from '@/features/qna/model/question.constants';
import type { QuestionResponse } from '@/shared/api/generated/api';
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
  likedByMe: boolean;
};

const CATEGORIES: CategoryFilter[] = ['전체', '진로고민', '취업준비', '포트폴리오', '기술질문'];

const CATEGORY_MAP: Record<Exclude<CategoryFilter, '전체'>, QnaPostCategory> = {
  진로고민: '진로 고민',
  취업준비: '취업 준비',
  포트폴리오: '포트폴리오',
  기술질문: '기술 질문',
};

// 기말 발표 시연용 mock fallback — API 실패 또는 빈 데이터 시 사용
// const MOCK_POSTS: QnaPost[] = [
//   { id: 1, category: '취업 준비', title: '백엔드 개발자 포트폴리오에 꼭 필요한 프로젝트는?', content: '...', likeCount: 24, commentCount: 12, viewCount: 156, createdAt: '2시간 전', likedByMe: false },
//   { id: 2, category: '기술 질문', title: 'Spring Boot와 Node.js 중 어떤 걸 먼저 공부해야 할까요?', content: '...', likeCount: 24, commentCount: 12, viewCount: 156, createdAt: '2시간 전', likedByMe: false },
//   { id: 3, category: '진로 고민', title: '졸업 후 바로 취업 vs 대학원 진학 고민됩니다', content: '...', likeCount: 24, commentCount: 12, viewCount: 156, createdAt: '2시간 전', likedByMe: false },
//   { id: 4, category: '포트폴리오', title: 'GitHub 프로필 꾸미는 법 알려주세요!', content: '...', likeCount: 24, commentCount: 12, viewCount: 156, createdAt: '2시간 전', likedByMe: false },
//   { id: 5, category: '취업 준비', title: '백엔드 개발자 포트폴리오에 꼭 필요한 프로젝트는?', content: '...', likeCount: 24, commentCount: 12, viewCount: 156, createdAt: '2시간 전', likedByMe: false },
//   { id: 6, category: '기술 질문', title: '코딩테스트 준비 어떻게 하셨나요?', content: '...', likeCount: 45, commentCount: 20, viewCount: 412, createdAt: '4시간 전', likedByMe: false },
//   { id: 7, category: '진로 고민', title: '스타트업 vs 대기업 첫 취업 고민 중입니다', content: '...', likeCount: 67, commentCount: 28, viewCount: 534, createdAt: '5시간 전', likedByMe: false },
// ];
//
// const USE_MOCK_FALLBACK = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_FALLBACK === 'true';

function toUiPost(q: QuestionResponse): QnaPost {
  return {
    id: q.id ?? 0,
    category: API_TO_UI_CATEGORY[q.category ?? 'ETC'],
    title: q.title ?? '',
    content: q.content ?? '',
    likeCount: q.likeCount ?? 0,
    commentCount: q.answerCount ?? 0,
    viewCount: q.viewCount ?? 0,
    createdAt: '',
    likedByMe: q.likedByMe ?? false,
  };
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? '질문 목록을 불러오지 못했습니다.';
  }
  return '질문 목록을 불러오지 못했습니다.';
}

export function QnaListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('전체');
  const [sortType, setSortType] = useState<SortType>('기본');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: apiQuestions, isLoading, isError, error } = useQuestionsQuery();
  const toggleLikeMutation = useToggleQuestionLikeMutation();

  const isFilterActive = sortType !== '기본';

  const rawPosts: QnaPost[] = useMemo(() => {
    if (apiQuestions !== undefined) {
      return apiQuestions.map(toUiPost);
    }
    return [];
  }, [apiQuestions]);

  const filteredPosts = useMemo(() => {
    let result = rawPosts;

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
  }, [rawPosts, searchQuery, selectedCategory, sortType]);

  function handleSortSelect(sort: '조회순' | '추천순') {
    setSortType(sort);
    setIsDropdownOpen(false);
  }

  function handleLikeClick(id: number) {
    toggleLikeMutation.mutate(id);
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
        {isLoading ? (
          <p className={styles.emptyState}>질문 목록을 불러오는 중입니다...</p>
        ) : isError ? (
          <p className={styles.emptyState}>{getErrorMessage(error)}</p>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <QnaPostCard
              key={post.id}
              category={post.category}
              author="익명"
              createdAt={post.createdAt}
              title={post.title}
              preview={post.content}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              viewCount={post.viewCount}
              isLiked={post.likedByMe}
              onClick={() => navigate(`/qna/${post.id}`)}
              onLikeClick={() => handleLikeClick(post.id)}
              className="w-full"
            />
          ))
        ) : (
          <p className={styles.emptyState}>등록된 질문이 없습니다.</p>
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
