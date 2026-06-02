import type { GraduateJobPost, JobPost, JobPostCardViewModel } from '../types';

export const CAREER_TYPE_LABEL: Record<string, string> = {
  NEW_GRADUATE: '신입',
  JUNIOR: '주니어',
  SENIOR: '시니어',
  LEAD: '리드',
  ANY: '경력무관',
};

export const JOB_TYPE_LABEL: Record<string, string> = {
  BACKEND: '백엔드',
  FRONTEND: '프론트엔드',
  FULLSTACK: '풀스택',
  MOBILE: '모바일',
  AI_ML: 'AI/ML',
  DATA: '데이터',
  DEVOPS: 'DevOps',
  SECURITY: '보안',
  GAME: '게임',
  EMBEDDED: '임베디드',
  ETC: '기타',
};

const LANG_LABEL: Record<string, string> = {
  JAVA: 'Java',
  SPRING: 'Spring',
  PYTHON: 'Python',
  JAVASCRIPT: 'JavaScript',
  TYPESCRIPT: 'TypeScript',
  REACT: 'React',
  NODEJS: 'Node.js',
  KOTLIN: 'Kotlin',
  SWIFT: 'Swift',
  GO: 'Go',
  RUST: 'Rust',
  CPP: 'C++',
  CSHARP: 'C#',
  PHP: 'PHP',
  RUBY: 'Ruby',
  MYSQL: 'MySQL',
  POSTGRESQL: 'PostgreSQL',
  MONGODB: 'MongoDB',
  REDIS: 'Redis',
  DOCKER: 'Docker',
  KUBERNETES: 'Kubernetes',
  AWS: 'AWS',
  GCP: 'GCP',
  AZURE: 'Azure',
  NEXT_JS: 'Next.js',
  VUE: 'Vue.js',
  ANGULAR: 'Angular',
  FLUTTER: 'Flutter',
};

// reverse lookup: display value → API enum
const POSITION_FILTER_TO_API: Record<string, string> = {
  백엔드: 'BACKEND',
  프론트엔드: 'FRONTEND',
  데이터: 'DATA',
};

const CAREER_FILTER_TO_API: Record<string, string[]> = {
  신입: ['NEW_GRADUATE'],
  '1-3년': ['JUNIOR'],
  '3-5년': ['SENIOR'],
  경력무관: ['ANY'],
};

function mapLang(lang: string): string {
  return LANG_LABEL[lang.toUpperCase()] ?? lang;
}

function computeDDay(deadline?: string): { display: string; dDay: string; isExpired: boolean } {
  if (!deadline) return { display: '-', dDay: '-', isExpired: false };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(deadline);
  end.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const display = deadline.replace(/-/g, '.');
  if (diffDays < 0) return { display, dDay: '마감', isExpired: true };
  if (diffDays === 0) return { display, dDay: 'D-Day', isExpired: false };
  return { display, dDay: `D-${diffDays}`, isExpired: false };
}

export function toJobPostCardViewModel(job: JobPost): JobPostCardViewModel {
  const { display, dDay, isExpired } = computeDDay(job.deadline);
  return {
    id: job.id,
    companyName: job.companyName,
    companyImage: job.companyImage,
    position: JOB_TYPE_LABEL[job.jobType ?? ''] ?? job.jobType ?? '-',
    location: job.fullLocation ?? job.region ?? '-',
    careerType: CAREER_TYPE_LABEL[job.careerType ?? ''] ?? job.careerType ?? '-',
    deadlineDisplay: display,
    dDay,
    isExpired,
    techStacks: (job.preferredLanguages ?? []).map(mapLang),
    detailUrl: job.detailUrl,
    isNew: job.isNew ?? false,
  };
}

export function toGraduateJobPostCardViewModel(job: GraduateJobPost): JobPostCardViewModel {
  return {
    ...toJobPostCardViewModel(job),
    graduate: {
      nickname: job.graduateNickname,
      department: job.graduateDepartment,
      jobType: JOB_TYPE_LABEL[job.graduateJobType] ?? job.graduateJobType,
      careerYear: job.graduateCareerYear,
    },
  };
}

export function filterJobPosts(
  jobs: JobPost[],
  filters: {
    searchKeyword: string;
    position: string | null;
    career: string | null;
    region: string | null;
  },
): JobPost[] {
  const kw = filters.searchKeyword.trim().toLowerCase();
  return jobs.filter((job) => {
    const matchSearch =
      !kw ||
      job.companyName.toLowerCase().includes(kw) ||
      (job.jobType ? (JOB_TYPE_LABEL[job.jobType] ?? '').toLowerCase().includes(kw) : false) ||
      (job.preferredLanguages ?? []).some((l) => mapLang(l).toLowerCase().includes(kw));
    const matchPosition =
      !filters.position || POSITION_FILTER_TO_API[filters.position] === job.jobType;
    const matchCareer =
      !filters.career ||
      (CAREER_FILTER_TO_API[filters.career] ?? []).includes(job.careerType ?? '');
    const matchRegion = !filters.region || job.region === filters.region;
    return matchSearch && matchPosition && matchCareer && matchRegion;
  });
}
