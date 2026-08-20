import type { UpdateMyPageRequest } from '@/shared/api/generated/api';

export type TechStackName = NonNullable<UpdateMyPageRequest['techStacks']>[number];
export type TargetJobCategory = NonNullable<UpdateMyPageRequest['targetJobs']>[number];

export const TECH_STACK_LABEL: Record<TechStackName, string> = {
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

export const TARGET_JOB_LABEL: Record<TargetJobCategory, string> = {
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

export const TECH_STACK_OPTIONS: readonly string[] = Object.values(TECH_STACK_LABEL);
export const TARGET_JOB_OPTIONS: readonly string[] = Object.values(TARGET_JOB_LABEL);

export function labelsToTechStacks(labels: string[]): TechStackName[] {
  return labels.map((l) => TECH_STACK_ENUM[l]).filter(Boolean);
}

export function labelsToTargetJobs(labels: string[]): TargetJobCategory[] {
  return labels.map((l) => TARGET_JOB_ENUM[l]).filter(Boolean);
}
