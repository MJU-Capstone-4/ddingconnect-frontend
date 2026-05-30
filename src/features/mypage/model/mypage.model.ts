import type {
  MyPageResponse,
  UpdateMyPageRequest,
  UpdateMemberRequest,
} from '@/shared/api/generated/api';

type TechStackName = NonNullable<UpdateMyPageRequest['techStacks']>[number];
type TargetJobCategory = NonNullable<UpdateMyPageRequest['targetJobs']>[number];
type JobTypeEnum = NonNullable<UpdateMemberRequest['jobType']>;

const TECH_STACK_LABEL: Record<TechStackName, string> = {
  JAVA: 'Java',
  PYTHON: 'Python',
  JAVASCRIPT: 'JavaScript',
  TYPESCRIPT: 'TypeScript',
  KOTLIN: 'Kotlin',
  SWIFT: 'Swift',
  C: 'C',
  CPP: 'C++',
  GO: 'Go',
  RUST: 'Rust',
  RUBY: 'Ruby',
  PHP: 'PHP',
  SCALA: 'Scala',
  REACT: 'React',
  VUE: 'Vue',
  ANGULAR: 'Angular',
  SPRING: 'Spring',
  DJANGO: 'Django',
  NODE_JS: 'Node.js',
  DOCKER: 'Docker',
  KUBERNETES: 'Kubernetes',
  AWS: 'AWS',
  GCP: 'GCP',
  AZURE: 'Azure',
};

const TECH_STACK_ENUM = Object.fromEntries(
  Object.entries(TECH_STACK_LABEL).map(([k, v]) => [v, k]),
) as Record<string, TechStackName>;

const TARGET_JOB_LABEL: Record<TargetJobCategory, string> = {
  BACKEND: '백엔드 개발',
  FRONTEND: '프론트엔드 개발',
  FULLSTACK: '풀스택 개발',
  MOBILE: '모바일 개발',
  AI_ML: 'AI/ML',
  DATA: '데이터 엔지니어',
  DEVOPS: 'DevOps',
  SECURITY: '보안',
  GAME: '게임 개발',
  EMBEDDED: '임베디드',
  ETC: '기타',
};

const TARGET_JOB_ENUM = Object.fromEntries(
  Object.entries(TARGET_JOB_LABEL).map(([k, v]) => [v, k]),
) as Record<string, TargetJobCategory>;

const JOB_TYPE_LABEL: Record<JobTypeEnum, string> = {
  BACKEND: '백엔드 개발자',
  FRONTEND: '프론트엔드 개발자',
  FULLSTACK: '풀스택 개발자',
  MOBILE: '모바일 개발자',
  AI_ML: 'AI/ML 개발자',
  DATA: '데이터 엔지니어',
  DEVOPS: 'DevOps 엔지니어',
  SECURITY: '보안 엔지니어',
  GAME: '게임 개발자',
  EMBEDDED: '임베디드 개발자',
  ETC: '기타',
};

const JOB_TYPE_ENUM = Object.fromEntries(
  Object.entries(JOB_TYPE_LABEL).map(([k, v]) => [v, k]),
) as Record<string, JobTypeEnum>;

export function techStacksToLabels(techStacks: MyPageResponse['techStacks'] = []): string[] {
  return techStacks
    .map((t) => (t.name ? (TECH_STACK_LABEL[t.name as TechStackName] ?? t.name) : ''))
    .filter(Boolean);
}

export function targetJobsToLabels(targetJobs: MyPageResponse['targetJobs'] = []): string[] {
  return targetJobs
    .map((j) =>
      j.interestedJob
        ? (TARGET_JOB_LABEL[j.interestedJob as TargetJobCategory] ?? j.interestedJob)
        : '',
    )
    .filter(Boolean);
}

export function labelsToTechStacks(labels: string[]): TechStackName[] {
  return labels.map((l) => TECH_STACK_ENUM[l]).filter(Boolean);
}

export function labelsToTargetJobs(labels: string[]): TargetJobCategory[] {
  return labels.map((l) => TARGET_JOB_ENUM[l]).filter(Boolean);
}

export function jobTypeToLabel(jobType?: string): string {
  if (!jobType) return '';
  return JOB_TYPE_LABEL[jobType as JobTypeEnum] ?? jobType;
}

export function labelToJobType(label: string): JobTypeEnum | undefined {
  return JOB_TYPE_ENUM[label];
}

export function gradeToLabel(grade?: number): string {
  return grade ? `${grade}학년` : '';
}

export function labelToGrade(label: string): number | undefined {
  const m = label.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : undefined;
}

export function careerYearToLabel(year?: number): string {
  return year ? `${year}년차` : '';
}

export function labelToCareerYear(label: string): number | undefined {
  const m = label.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : undefined;
}
