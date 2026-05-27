import type { CareerType, JobData, PositionType, RegionType } from '../types';

export const POSITION_OPTIONS: PositionType[] = ['백엔드', '프론트엔드', '데이터'];
export const CAREER_OPTIONS: CareerType[] = ['신입', '1-3년', '3-5년', '경력무관'];
export const REGION_OPTIONS: RegionType[] = ['서울', '경기', '인천', '부산'];

export const MOCK_SENIOR_JOB = {
  companyName: '들어가고 싶은 회사',
  position: '백엔드 개발자',
  location: '경기 성남시',
  experience: '신입',
  salary: '회사내규',
  dDay: 'D-7',
  isNew: true,
} as const;

export const MOCK_JOBS: JobData[] = [
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

type JobFilters = {
  searchKeyword: string;
  position: PositionType | null;
  career: CareerType | null;
  region: RegionType | null;
};

export function getFilteredJobs(jobs: JobData[], filters: JobFilters): JobData[] {
  const kw = filters.searchKeyword.trim().toLowerCase();
  return jobs.filter((job) => {
    const matchSearch =
      !kw ||
      job.companyName.toLowerCase().includes(kw) ||
      job.position.toLowerCase().includes(kw) ||
      job.techStacks?.some((t) => t.toLowerCase().includes(kw));
    const matchPosition = !filters.position || job.positionType === filters.position;
    const matchCareer = !filters.career || job.experience === filters.career;
    const matchRegion = !filters.region || job.region === filters.region;
    return matchSearch && matchPosition && matchCareer && matchRegion;
  });
}
