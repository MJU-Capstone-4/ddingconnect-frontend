export type MatchingRequest = {
  grade: number;
  gpa: string;
  major: string;
  interestedJob: string;
  capability: string;
  targetCompany: string;
};

export type JobPost = {
  id: number;
  companyName: string;
  companyImage: string;
  region: string;
  careerType: string;
  jobType: string;
  fullLocation: string;
  deadline: string;
  detailUrl: string;
  preferredLanguages: string[];
};

export type MatchingCandidate = {
  memberId: number;
  role: string;
  nickname: string;
  department: string;
  jobCategories: string[];
  techStacks: string[];
  enrollmentYear: string;
  grade: number;
  company: string;
  careerYear: number | null;
  region: string;
};

export type MatchingDetail = {
  memberId: number;
  role: string;
  nickname: string;
  department: string;
  jobCategories: string[];
  techStacks: string[];
  enrollmentYear: string;
  grade: number;
  company: string;
  careerYear: number | null;
  region: string;
  portfolio: string;
  githubLink: string;
  linkedinLink: string;
  businessCardImage: string;
  jobPosts: JobPost[];
};

export type MyActivityItem = MatchingDetail;

export type ReceivedCoffeeChatItem = {
  coffeeChatId: number;
  name: string;
  department: string;
  studentNumberPrefix: string;
  kakaoOpenChatLink: string;
  profileImage: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
};

export type CoffeeChatActivityItem = {
  coffeeChatId: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  partnerId: number;
  partnerNickname: string;
  partnerDepartment: string;
  partnerJobs: string[];
  partnerTechStacks: string[];
};
