import { useState } from 'react';

import { JobPostCard } from '@/features/job/components/job-post-card';
import BagIcon from '@/shared/assets/icons/bag.svg?react';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import FilterIcon from '@/shared/assets/icons/filter.svg?react';
import { Button } from '@/shared/ui/button';
import { Chip } from '@/shared/ui/chip';
import { HeroSection } from '@/shared/ui/hero-section';
import { Search } from '@/shared/ui/search';

import * as styles from './job-info-page.styles';

type PositionType = '백엔드' | '프론트엔드' | '데이터';
type CareerType = '신입' | '1-3년' | '3-5년' | '경력무관';
type RegionType = '서울' | '경기' | '인천' | '부산';

type JobData = {
  id: number;
  companyName: string;
  position: string;
  positionType: PositionType;
  location: string;
  region: RegionType;
  experience: CareerType;
  salary: string;
  dDay: string;
  techStacks?: string[];
  isNew?: boolean;
};

const POSITION_OPTIONS: PositionType[] = ['백엔드', '프론트엔드', '데이터'];
const CAREER_OPTIONS: CareerType[] = ['신입', '1-3년', '3-5년', '경력무관'];
const REGION_OPTIONS: RegionType[] = ['서울', '경기', '인천', '부산'];

const MOCK_SENIOR_JOB = {
  companyName: '들어가고 싶은 회사',
  position: '백엔드 개발자',
  location: '경기 성남시',
  experience: '신입',
  salary: '회사내규',
  dDay: 'D-7',
  isNew: true,
} as const;

const MOCK_JOBS: JobData[] = [
  {
    id: 1,
    companyName: '들어가고 싶은 회사',
    position: '백엔드 개발자',
    positionType: '백엔드',
    location: '경기 성남시',
    region: '경기',
    experience: '신입',
    salary: '회사내규',
    dDay: 'D-7',
    techStacks: ['JavaScript', 'React', 'Node.js'],
    isNew: true,
  },
  {
    id: 2,
    companyName: '들어가고 싶은 회사',
    position: '백엔드 개발자',
    positionType: '백엔드',
    location: '경기 성남시',
    region: '경기',
    experience: '신입',
    salary: '회사내규',
    dDay: 'D-7',
    techStacks: ['JavaScript', 'React', 'Node.js'],
    isNew: true,
  },
  {
    id: 3,
    companyName: '네카라쿠배',
    position: '프론트엔드 개발자',
    positionType: '프론트엔드',
    location: '서울 강남구',
    region: '서울',
    experience: '1-3년',
    salary: '4,000만원',
    dDay: 'D-14',
    techStacks: ['TypeScript', 'React', 'Next.js'],
    isNew: false,
  },
  {
    id: 4,
    companyName: '데이터 분석 기업',
    position: '데이터 분석가',
    positionType: '데이터',
    location: '인천 연수구',
    region: '인천',
    experience: '3-5년',
    salary: '협의',
    dDay: 'D-3',
    techStacks: ['Python', 'SQL', 'Tableau'],
    isNew: false,
  },
  {
    id: 5,
    companyName: '좋은 스타트업',
    position: '백엔드 개발자',
    positionType: '백엔드',
    location: '부산 해운대구',
    region: '부산',
    experience: '경력무관',
    salary: '5,000만원',
    dDay: 'D-21',
    techStacks: ['Java', 'Spring', 'MySQL'],
    isNew: true,
  },
];

export function JobInfoPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<PositionType | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<CareerType | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionType | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempPosition, setTempPosition] = useState<PositionType | null>(null);
  const [tempCareer, setTempCareer] = useState<CareerType | null>(null);
  const [tempRegion, setTempRegion] = useState<RegionType | null>(null);

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

  const filteredJobs = MOCK_JOBS.filter((job) => {
    const kw = searchKeyword.trim().toLowerCase();
    const matchSearch =
      !kw ||
      job.companyName.toLowerCase().includes(kw) ||
      job.position.toLowerCase().includes(kw) ||
      job.techStacks?.some((t) => t.toLowerCase().includes(kw));
    const matchPosition = !selectedPosition || job.positionType === selectedPosition;
    const matchCareer = !selectedCareer || job.experience === selectedCareer;
    const matchRegion = !selectedRegion || job.region === selectedRegion;
    return matchSearch && matchPosition && matchCareer && matchRegion;
  });

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
        <JobPostCard
          {...MOCK_SENIOR_JOB}
          buttonTone="blue"
          className={styles.cardFullWidth}
          onApply={() => console.log('선배 공고 지원하기')}
        />
      </section>

      <section className={styles.section} aria-label="공고 목록">
        <h2 className={styles.sectionTitle}>공고 목록</h2>
        <div className={styles.jobList}>
          {filteredJobs.map((job) => (
            <JobPostCard
              key={job.id}
              companyName={job.companyName}
              position={job.position}
              location={job.location}
              experience={job.experience}
              salary={job.salary}
              dDay={job.dDay}
              techStacks={job.techStacks}
              isNew={job.isNew}
              className={styles.cardFullWidth}
              onApply={() => console.log(`공고 지원하기: ${job.companyName}`)}
            />
          ))}
          {filteredJobs.length === 0 && (
            <p className={styles.emptyText}>조건에 맞는 공고가 없습니다.</p>
          )}
        </div>
      </section>

      {isFilterOpen && (
        <>
          <div className={styles.filterOverlay} aria-hidden="true" />
          <div
            className={styles.filterSheet}
            role="dialog"
            aria-modal="true"
            aria-label="필터 패널"
          >
            <div className={styles.filterHeader}>
              <span className={styles.filterTitle}>필터</span>
              <button
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
