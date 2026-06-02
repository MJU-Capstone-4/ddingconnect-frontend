import { useEffect, useMemo, useRef, useState } from 'react';

import {
  filterJobPosts,
  toGraduateJobPostCardViewModel,
  toJobPostCardViewModel,
} from '@/features/job/model/job-post.mapper';
import { useGraduateJobPostsQuery, useCrawledJobPostsQuery } from '@/features/job/hooks';
import { JobPostCard } from '@/features/job/components/job-post-card';
import { CAREER_OPTIONS, POSITION_OPTIONS, REGION_OPTIONS } from '@/features/job-info/model';
import type { CareerType, PositionType, RegionType } from '@/features/job-info/types';
import BagIcon from '@/shared/assets/icons/bag.svg?react';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import FilterIcon from '@/shared/assets/icons/filter.svg?react';
import { Button } from '@/shared/ui/button';
import { Chip } from '@/shared/ui/chip';
import { HeroSection } from '@/shared/ui/hero-section';
import { Search } from '@/shared/ui/search';

import * as styles from './job-info-page.styles';

export function JobInfoPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<PositionType | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<CareerType | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionType | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempPosition, setTempPosition] = useState<PositionType | null>(null);
  const [tempCareer, setTempCareer] = useState<CareerType | null>(null);
  const [tempRegion, setTempRegion] = useState<RegionType | null>(null);

  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const {
    data: graduateJobPosts = [],
    isLoading: isGraduateLoading,
    isError: isGraduateError,
    refetch: refetchGraduate,
  } = useGraduateJobPostsQuery();

  const {
    data: crawledJobPosts = [],
    isLoading: isCrawledLoading,
    isError: isCrawledError,
    refetch: refetchCrawled,
  } = useCrawledJobPostsQuery();

  const graduateViewModels = useMemo(
    () => graduateJobPosts.map(toGraduateJobPostCardViewModel),
    [graduateJobPosts],
  );

  const filteredCrawledViewModels = useMemo(() => {
    const filtered = filterJobPosts(crawledJobPosts, {
      searchKeyword,
      position: selectedPosition,
      career: selectedCareer,
      region: selectedRegion,
    });
    return filtered.map(toJobPostCardViewModel);
  }, [crawledJobPosts, searchKeyword, selectedPosition, selectedCareer, selectedRegion]);

  useEffect(() => {
    if (isFilterOpen) {
      closeBtnRef.current?.focus();
    } else {
      filterTriggerRef.current?.focus();
    }
  }, [isFilterOpen]);

  function handleDialogKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      setIsFilterOpen(false);
      return;
    }
    if (e.key === 'Tab') {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }

  function openFilter() {
    setTempPosition(selectedPosition);
    setTempCareer(selectedCareer);
    setTempRegion(selectedRegion);
    setIsFilterOpen(true);
  }

  function applyFilter() {
    setSelectedPosition(tempPosition);
    setSelectedCareer(tempCareer);
    setSelectedRegion(tempRegion);
    setIsFilterOpen(false);
  }

  return (
    <div className={styles.page}>
      <HeroSection
        variant="jobInfo"
        title="구직 정보"
        description="최신 채용 공고를 확인하고 지원하세요"
        icon={<BagIcon className="w-7 h-7 text-white" aria-hidden="true" />}
        className={styles.heroBreakout}
      />

      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <Search
            width="full"
            iconPosition="right"
            placeholder="검색어를 입력해주세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            aria-label="공고 검색"
          />
        </div>
        <button
          ref={filterTriggerRef}
          type="button"
          className={styles.filterBtn}
          aria-label="필터 열기"
          onClick={openFilter}
        >
          <FilterIcon className={styles.filterBtnIcon} aria-hidden="true" />
        </button>
      </div>

      <section className={styles.section} aria-label="선배가 올린 공고">
        <h2 className={styles.sectionTitle}>선배가 올린 공고</h2>
        {isGraduateLoading && <p className={styles.emptyText}>공고를 불러오는 중...</p>}
        {isGraduateError && !isGraduateLoading && (
          <div className="py-6 text-center">
            <p className="text-sm text-text-muted mb-2">공고를 불러오지 못했습니다.</p>
            <button
              type="button"
              className="text-sm text-primary underline"
              onClick={() => refetchGraduate()}
            >
              다시 시도
            </button>
          </div>
        )}
        {!isGraduateLoading && !isGraduateError && graduateViewModels.length === 0 && (
          <p className={styles.emptyText}>등록된 선배 공고가 없습니다.</p>
        )}
        {!isGraduateLoading && !isGraduateError && graduateViewModels.length > 0 && (
          <div className={styles.jobList}>
            {graduateViewModels.map((vm) => (
              <JobPostCard
                key={vm.id}
                companyName={vm.companyName}
                companyImage={vm.companyImage}
                position={vm.position}
                location={vm.location}
                careerType={vm.careerType}
                deadlineDisplay={vm.deadlineDisplay}
                dDay={vm.dDay}
                isExpired={vm.isExpired}
                isNew={vm.isNew}
                techStacks={vm.techStacks}
                detailUrl={vm.detailUrl}
                graduate={vm.graduate}
                buttonTone="blue"
                className={styles.cardFullWidth}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section} aria-label="공고 목록">
        <h2 className={styles.sectionTitle}>공고 목록</h2>
        {isCrawledLoading && <p className={styles.emptyText}>공고를 불러오는 중...</p>}
        {isCrawledError && !isCrawledLoading && (
          <div className="py-6 text-center">
            <p className="text-sm text-text-muted mb-2">공고를 불러오지 못했습니다.</p>
            <button
              type="button"
              className="text-sm text-primary underline"
              onClick={() => refetchCrawled()}
            >
              다시 시도
            </button>
          </div>
        )}
        {!isCrawledLoading && !isCrawledError && (
          <div className={styles.jobList}>
            {filteredCrawledViewModels.map((vm) => (
              <JobPostCard
                key={vm.id}
                companyName={vm.companyName}
                companyImage={vm.companyImage}
                position={vm.position}
                location={vm.location}
                careerType={vm.careerType}
                deadlineDisplay={vm.deadlineDisplay}
                dDay={vm.dDay}
                isExpired={vm.isExpired}
                isNew={vm.isNew}
                techStacks={vm.techStacks}
                detailUrl={vm.detailUrl}
                className={styles.cardFullWidth}
              />
            ))}
            {filteredCrawledViewModels.length === 0 && (
              <p className={styles.emptyText}>조건에 맞는 공고가 없습니다.</p>
            )}
          </div>
        )}
      </section>

      {isFilterOpen && (
        <>
          <div
            className={styles.filterOverlay}
            aria-hidden="true"
            onClick={() => setIsFilterOpen(false)}
          />
          <div
            ref={dialogRef}
            className={styles.filterSheet}
            role="dialog"
            aria-modal="true"
            aria-label="필터 패널"
            onKeyDown={handleDialogKeyDown}
          >
            <div className={styles.filterHeader}>
              <span className={styles.filterTitle}>필터</span>
              <button
                ref={closeBtnRef}
                type="button"
                className={styles.filterCloseBtn}
                aria-label="필터 닫기"
                onClick={() => setIsFilterOpen(false)}
              >
                <CloseIcon className={styles.filterCloseBtnIcon} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.filterSectionBlock}>
              <p className={styles.filterSectionLabel}>직무</p>
              <div className={styles.filterChipRow}>
                {POSITION_OPTIONS.map((opt) => (
                  <Chip
                    key={opt}
                    variant="outlined"
                    size="md"
                    active={tempPosition === opt}
                    onClick={() => setTempPosition(tempPosition === opt ? null : opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
            </div>

            <div className={styles.filterSectionBlock}>
              <p className={styles.filterSectionLabel}>경력</p>
              <div className={styles.filterChipRow}>
                {CAREER_OPTIONS.map((opt) => (
                  <Chip
                    key={opt}
                    variant="outlined"
                    size="md"
                    active={tempCareer === opt}
                    onClick={() => setTempCareer(tempCareer === opt ? null : opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
            </div>

            <div className={styles.filterSectionBlock}>
              <p className={styles.filterSectionLabel}>지역</p>
              <div className={styles.filterChipRow}>
                {REGION_OPTIONS.map((opt) => (
                  <Chip
                    key={opt}
                    variant="outlined"
                    size="md"
                    active={tempRegion === opt}
                    onClick={() => setTempRegion(tempRegion === opt ? null : opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
            </div>

            <div className={styles.filterApplyRow}>
              <Button
                variant="solid"
                tone="blue"
                size="filter"
                className="w-auto px-6"
                aria-label="필터 적용하기"
                onClick={applyFilter}
              >
                필터 적용하기
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
