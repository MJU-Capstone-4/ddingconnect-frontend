// Demo mock data — 기말 발표 시 사용
// 사용 방법: 각 페이지에서 API 호출 대신 아래 데이터로 교체

import type { MatchingCandidate, MatchingDetail } from '../types';
import type { SocialLinkItem } from '@/features/mypage';

export const MOCK_MATCHED_SENIORS: MatchingCandidate[] = [
  {
    memberId: 1,
    role: 'GRADUATE',
    nickname: '이선배',
    department: "컴퓨터공학과 '18",
    jobCategories: ['백엔드 개발자'],
    techStacks: ['React', 'TypeScript'],
    enrollmentYear: '2018',
    grade: 0,
    company: '네이버',
    careerYear: 3,
    region: '경기 성남시',
  },
  {
    memberId: 2,
    role: 'GRADUATE',
    nickname: '이선배',
    department: "컴퓨터공학과 '18",
    jobCategories: ['백엔드 개발자'],
    techStacks: ['React', 'TypeScript'],
    enrollmentYear: '2018',
    grade: 0,
    company: '네이버',
    careerYear: 3,
    region: '경기 성남시',
  },
  {
    memberId: 3,
    role: 'GRADUATE',
    nickname: '이선배',
    department: "컴퓨터공학과 '18",
    jobCategories: ['백엔드 개발자'],
    techStacks: ['React', 'TypeScript'],
    enrollmentYear: '2018',
    grade: 0,
    company: '네이버',
    careerYear: 3,
    region: '경기 성남시',
  },
];

export const MOCK_SENIOR_DETAIL: MatchingDetail = {
  memberId: 1,
  role: 'GRADUATE',
  nickname: '이선배',
  department: "컴퓨터공학과 '18",
  jobCategories: ['백엔드 개발자'],
  techStacks: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker'],
  enrollmentYear: '2018',
  grade: 0,
  company: '네이버',
  careerYear: 3,
  region: '경기 성남시',
  portfolio: 'portfolio.honggildong.com',
  githubLink: 'github.com/honggildong',
  linkedinLink: 'linkedin.com/in/honggildong',
  businessCardImage: '',
  jobPosts: [],
};

export const MOCK_SENIOR_SOCIAL_LINKS: SocialLinkItem[] = [
  { id: 'github', platform: 'github', label: 'GitHub', url: 'github.com/honggildong' },
  { id: 'linkedin', platform: 'linkedin', label: 'LinkedIn', url: 'linkedin.com/in/honggildong' },
];
