export const MOCK_GRADUATE_PROFILE = {
  nickname: '이선배',
  email: 'dding_connect@mju.ac.kr',
  studentId: '60211234',
  department: '응용소프트웨어',
  jobType: '백엔드 개발자',
  company: '네이버',
  experience: '3년차',
  skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker'],
  socialLinks: [
    { id: 'github', platform: 'github' as const, label: 'GitHub', url: 'github.com/honggildong' },
    {
      id: 'linkedin',
      platform: 'linkedin' as const,
      label: 'LinkedIn',
      url: 'linkodin.com/in/honggildong',
    },
  ],
  portfolio: {
    title: '이선배의 포트폴리오',
    url: 'portfolio.honggildong.com',
  },
  jobPostingLinks: ['recruit.navercorp.com/rcrt/list.do'],
  businessCardImageUrl: '',
  profileImage: null as string | null,
};
