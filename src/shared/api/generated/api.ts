export interface CreateRoadmapRequest {
  content?: string;
}

export interface ApiResponseRoadmapResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: RoadmapResponse;
}

export interface RoadmapResponse {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  memberId?: number;
  content?: string;
}

/** 질문 등록 정보 (제목, 본문 등) */
export interface CreateQuestionRequest {
  category?: 'TECHNICAL' | 'CAREER' | 'STUDY' | 'PROJECT' | 'ETC';
  title?: string;
  content?: string;
}

export interface ApiResponseQuestionResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: QuestionResponse;
}

export interface QuestionResponse {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  memberId?: number;
  category?: 'TECHNICAL' | 'CAREER' | 'STUDY' | 'PROJECT' | 'ETC';
  title?: string;
  content?: string;
  /** @format int32 */
  viewCount?: number;
  /** @format int64 */
  likeCount?: number;
  /** @format int64 */
  answerCount?: number;
  likedByMe?: boolean;
}

export interface ApiResponseLikeToggleResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: LikeToggleResponse;
}

export interface LikeToggleResponse {
  liked?: boolean;
  /** @format int64 */
  likeCount?: number;
}

/** 답변 등록 정보 (본문 등) */
export interface CreateAnswerRequest {
  content?: string;
}

export interface AnswerResponse {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  questionId?: number;
  /** @format int64 */
  memberId?: number;
  content?: string;
  /** @format int64 */
  likeCount?: number;
  likedByMe?: boolean;
}

export interface ApiResponseAnswerResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: AnswerResponse;
}

export interface ApiResponseString {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: string;
}

/** 구직 공고 등록 정보 (회사명, 직무, 경력, 마감일, 위치, 선호 언어 목록 등). preferredLanguages 는 문자열 배열로 여러 개 입력 가능 */
export interface CreateJobPostRequest {
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
  country?: string;
  location?: string;
  fullLocation?: string;
  /** @format date */
  deadline?: string;
  detailUrl?: string;
  preferredLanguages?: string[];
  companyName?: string;
}

export interface ApiResponseJobPostResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: JobPostResponse;
}

export interface JobPostResponse {
  /** @format int64 */
  id?: number;
  companyName?: string;
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
  /** @format date */
  deadline?: string;
  detailUrl?: string;
  preferredLanguages?: string[];
}

/** 커피챗 요청 정보 (대상 회원 ID, 메시지 등) */
export interface CreateCoffeeChatRequest {
  /** @format int64 */
  receiverId?: number;
  kakaoOpenChatLink?: string;
}

export interface ApiResponseCoffeeChatResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: CoffeeChatResponse;
}

export interface CoffeeChatResponse {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  requesterId?: number;
  /** @format int64 */
  receiverId?: number;
  status?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  kakaoOpenChatLink?: string;
}

/** 매칭 정보 입력 폼 6필드 */
export interface MatchingRequest {
  /** @format int32 */
  grade?: number;
  gpa?: string;
  major?: string;
  interestedJob?: string;
  capability?: string;
  targetCompany?: string;
}

export interface ApiResponseListMatchedCandidateResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: MatchedCandidateResponse[];
}

export interface MatchedCandidateResponse {
  /** @format int64 */
  memberId?: number;
  role?: 'UNKNOWN' | 'STUDENT' | 'GRADUATE';
  nickname?: string;
  department?: string;
  jobCategories?: (
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
    | 'ETC'
  )[];
  techStacks?: (
    | 'JAVA'
    | 'PYTHON'
    | 'JAVASCRIPT'
    | 'TYPESCRIPT'
    | 'KOTLIN'
    | 'SWIFT'
    | 'C'
    | 'CPP'
    | 'GO'
    | 'RUST'
    | 'RUBY'
    | 'PHP'
    | 'SCALA'
    | 'REACT'
    | 'VUE'
    | 'ANGULAR'
    | 'SPRING'
    | 'DJANGO'
    | 'NODE_JS'
    | 'DOCKER'
    | 'KUBERNETES'
    | 'AWS'
    | 'GCP'
    | 'AZURE'
  )[];
  enrollmentYear?: string;
  /** @format int32 */
  grade?: number;
  company?: string;
  /** @format int32 */
  careerYear?: number;
  region?: string;
}

/** 이메일 및 코드 정보 */
export interface VerifyCodeRequest {
  /** @pattern ^[a-zA-Z0-9._%+\-]+@mju\.ac\.kr$ */
  email?: string;
  code: string;
}

export interface SignupMultipartSchema {
  /** 회원 가입 정보 (JSON) */
  request?: SignupRequest;
  /**
   * 재학/졸업 인증서 이미지
   * @format binary
   */
  certificate?: File;
}

/** 회원 가입 정보 (JSON) */
export interface SignupRequest {
  /** @pattern ^[a-zA-Z0-9._%+\-]+@mju\.ac\.kr$ */
  email?: string;
  password?: string;
  nickname?: string;
  role?: 'UNKNOWN' | 'STUDENT' | 'GRADUATE';
}

/** 이메일 정보 */
export interface CodeSendRequest {
  /** @pattern ^[a-zA-Z0-9._%+\-]+@mju\.ac\.kr$ */
  email?: string;
}

/** 로그인 정보 */
export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface ApiResponseTokenResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: TokenResponse;
}

export interface TokenResponse {
  accessToken?: string;
}

/** 교체할 기술 스택 전체 리스트 */
export interface ReplaceTechStackRequest {
  names?: (
    | 'JAVA'
    | 'PYTHON'
    | 'JAVASCRIPT'
    | 'TYPESCRIPT'
    | 'KOTLIN'
    | 'SWIFT'
    | 'C'
    | 'CPP'
    | 'GO'
    | 'RUST'
    | 'RUBY'
    | 'PHP'
    | 'SCALA'
    | 'REACT'
    | 'VUE'
    | 'ANGULAR'
    | 'SPRING'
    | 'DJANGO'
    | 'NODE_JS'
    | 'DOCKER'
    | 'KUBERNETES'
    | 'AWS'
    | 'GCP'
    | 'AZURE'
  )[];
}

export interface ApiResponseListTechStackResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: TechStackResponse[];
}

export interface TechStackResponse {
  /** @format int64 */
  id?: number;
  name?:
    | 'JAVA'
    | 'PYTHON'
    | 'JAVASCRIPT'
    | 'TYPESCRIPT'
    | 'KOTLIN'
    | 'SWIFT'
    | 'C'
    | 'CPP'
    | 'GO'
    | 'RUST'
    | 'RUBY'
    | 'PHP'
    | 'SCALA'
    | 'REACT'
    | 'VUE'
    | 'ANGULAR'
    | 'SPRING'
    | 'DJANGO'
    | 'NODE_JS'
    | 'DOCKER'
    | 'KUBERNETES'
    | 'AWS'
    | 'GCP'
    | 'AZURE';
}

/** 교체할 관심 직군 전체 리스트 */
export interface ReplaceTargetJobRequest {
  categories?: (
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
    | 'ETC'
  )[];
}

export interface ApiResponseListTargetJobResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: TargetJobResponse[];
}

export interface TargetJobResponse {
  /** @format int64 */
  id?: number;
  interestedJob?:
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
  key2?: string;
}

/** 질문 수정 정보 */
export interface UpdateQuestionRequest {
  category?: 'TECHNICAL' | 'CAREER' | 'STUDY' | 'PROJECT' | 'ETC';
  title?: string;
  content?: string;
}

/** 답변 수정 정보 */
export interface UpdateAnswerRequest {
  content?: string;
}

/** 수정할 회원 정보 */
export interface UpdateMemberRequest {
  name?: string;
  /** @pattern ^[a-zA-Z0-9._%+\-]+@mju\.ac\.kr$ */
  email?: string;
  nickname?: string;
  studentNumber?: string;
  department?: string;
  /** @pattern ^https?://(www\.)?github\.com/.+ */
  githubLink?: string;
  /** @pattern ^https?://(www\.)?linkedin\.com/.+ */
  linkedinLink?: string;
  portfolio?: string;
  profileImage?: string;
  /** @format int32 */
  grade?: number;
  businessCardImage?: string;
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
  company?: string;
  /** @format int32 */
  careerYear?: number;
}

/** 마이페이지 통합 수정 요청 */
export interface UpdateMyPageRequest {
  /** 수정할 회원 정보 */
  profile?: UpdateMemberRequest;
  techStacks?: (
    | 'JAVA'
    | 'PYTHON'
    | 'JAVASCRIPT'
    | 'TYPESCRIPT'
    | 'KOTLIN'
    | 'SWIFT'
    | 'C'
    | 'CPP'
    | 'GO'
    | 'RUST'
    | 'RUBY'
    | 'PHP'
    | 'SCALA'
    | 'REACT'
    | 'VUE'
    | 'ANGULAR'
    | 'SPRING'
    | 'DJANGO'
    | 'NODE_JS'
    | 'DOCKER'
    | 'KUBERNETES'
    | 'AWS'
    | 'GCP'
    | 'AZURE'
  )[];
  targetJobs?: (
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
    | 'ETC'
  )[];
  jobPostsToAdd?: CreateJobPostRequest[];
  jobPostIdsToDelete?: number[];
}

export interface ActivityStats {
  /** @format int64 */
  coffeeChatCount?: number;
  /** @format int64 */
  roadmapCount?: number;
  /** @format int64 */
  questionCount?: number;
}

export interface ApiResponseMyPageResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: MyPageResponse;
}

export interface MemberResponse {
  /** @format int64 */
  id?: number;
  email?: string;
  name?: string;
  nickname?: string;
  studentNumber?: string;
  department?: string;
  githubLink?: string;
  linkedinLink?: string;
  portfolio?: string;
  profileImage?: string;
  /** @format int64 */
  point?: number;
  role?: 'UNKNOWN' | 'STUDENT' | 'GRADUATE';
  /** @format int32 */
  grade?: number;
  businessCardImage?: string;
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
  company?: string;
  /** @format int32 */
  careerYear?: number;
}

export interface MyPageResponse {
  profile?: MemberResponse;
  activity?: ActivityStats;
  techStacks?: TechStackResponse[];
  targetJobs?: TargetJobResponse[];
  jobPosts?: JobPostResponse[];
}

export interface ApiResponseMemberResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: MemberResponse;
}

/** 구직 공고 수정 정보 */
export interface UpdateJobPostRequest {
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
  country?: string;
  location?: string;
  fullLocation?: string;
  /** @format date */
  deadline?: string;
  detailUrl?: string;
  preferredLanguages?: string[];
  companyName?: string;
}

/** 변경할 상태 정보 (ACCEPTED / REJECTED) */
export interface UpdateCoffeeChatStatusRequest {
  status?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface ApiResponseListRoadmapResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: RoadmapResponse[];
}

export interface ApiResponseListQuestionResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: QuestionResponse[];
}

export interface ApiResponseListAnswerResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: AnswerResponse[];
}

export interface SseEmitter {
  /** @format int64 */
  timeout?: number;
}

export interface ApiResponseListJobPostResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: JobPostResponse[];
}

export interface ApiResponseListCoffeeChatResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: CoffeeChatResponse[];
}

export interface ApiResponseListMatchedCandidateDetailResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: MatchedCandidateDetailResponse[];
}

export interface MatchedCandidateDetailResponse {
  /** @format int64 */
  memberId?: number;
  role?: 'UNKNOWN' | 'STUDENT' | 'GRADUATE';
  nickname?: string;
  department?: string;
  jobCategories?: (
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
    | 'ETC'
  )[];
  techStacks?: (
    | 'JAVA'
    | 'PYTHON'
    | 'JAVASCRIPT'
    | 'TYPESCRIPT'
    | 'KOTLIN'
    | 'SWIFT'
    | 'C'
    | 'CPP'
    | 'GO'
    | 'RUST'
    | 'RUBY'
    | 'PHP'
    | 'SCALA'
    | 'REACT'
    | 'VUE'
    | 'ANGULAR'
    | 'SPRING'
    | 'DJANGO'
    | 'NODE_JS'
    | 'DOCKER'
    | 'KUBERNETES'
    | 'AWS'
    | 'GCP'
    | 'AZURE'
  )[];
  enrollmentYear?: string;
  /** @format int32 */
  grade?: number;
  company?: string;
  /** @format int32 */
  careerYear?: number;
  region?: string;
  portfolio?: string;
  githubLink?: string;
  linkedinLink?: string;
  businessCardImage?: string;
  jobPosts?: JobPostResponse[];
}

export interface ApiResponseMatchedCandidateDetailResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: MatchedCandidateDetailResponse;
}

export interface AlarmResponse {
  type?: 'ANSWER' | 'JOB' | 'ROADMAP' | 'COFFEE_CHAT';
  /** @format int64 */
  id?: number;
  /** @format int64 */
  refId?: number;
  content?: string;
  isRead?: boolean;
  /** @format date-time */
  createdAt?: string;
  relativeTime?: string;
}

export interface ApiResponseListAlarmResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: AlarmResponse[];
}

export interface ApiResponseAlarmResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: AlarmResponse;
}

export interface RoadmapCreateBody {
  /** @format int32 */
  grade: number;
  /** @format float */
  gpa: number;
  major: string;
  targetJob: string;
  currentSkills: string[];
  targetCompany: string;
}

export interface RoadmapListItem {
  /** @format int64 */
  id: number;
  title: string;
  /** @format date-time */
  createdAt: string;
}

export interface ApiResponseRoadmapListResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: RoadmapListItem[];
}

export interface RoadmapDetailResponse {
  /** @format int64 */
  id: number;
  /** @format int64 */
  memberId: number;
  content: string;
  /** @format date-time */
  createdAt: string;
}

export interface ApiResponseRoadmapDetailResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: RoadmapDetailResponse;
}

export interface RoadmapDownloadUrlResult {
  fileUrl: string;
  fileName: string;
  /** @format date-time */
  expiresAt: string;
}

export interface ApiResponseRoadmapDownloadUrl {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: RoadmapDownloadUrlResult;
}
