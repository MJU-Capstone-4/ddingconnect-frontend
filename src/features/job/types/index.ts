export type JobPost = {
  id: number;
  companyName: string;
  companyImage?: string;
  region?: string;
  careerType?: 'NEW_GRADUATE' | 'JUNIOR' | 'SENIOR' | 'LEAD' | 'ANY';
  jobType?:
    | 'BACKEND'
    | 'FRONTEND'
    | 'FULLSTACK'
    | 'MOBILE'
    | 'AI_ML'
    | 'DATA'
    | 'DEVOPS'
    | 'SECURITY'
    | 'GAME'
    | 'EMBEDDED'
    | 'ETC';
  fullLocation?: string;
  deadline?: string;
  detailUrl?: string;
  preferredLanguages?: string[];
  isNew?: boolean;
};

export type GraduateJobPost = JobPost & {
  graduateMemberId: number;
  graduateNickname: string;
  graduateDepartment: string;
  graduateJobType: string;
  graduateCareerYear: number;
};

export type JobPostCardViewModel = {
  id: number;
  companyName: string;
  companyImage?: string;
  position: string;
  location: string;
  careerType: string;
  deadlineDisplay: string;
  dDay: string;
  isExpired: boolean;
  isNew: boolean;
  techStacks: string[];
  detailUrl?: string;
  graduate?: {
    nickname: string;
    department: string;
    jobType: string;
    careerYear: number;
  };
};
