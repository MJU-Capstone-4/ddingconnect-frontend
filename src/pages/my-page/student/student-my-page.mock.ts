export const MOCK_STUDENT_PROFILE = {
  nickname: '닉네임',
  email: 'dding_connect@mju.ac.kr',
  studentId: '60211234',
  department: '응용소프트웨어',
  grade: '3학년',
  interests: ['백엔드 개발', '데이터 엔지니어', '클라우드 엔지니어'],
  skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker'],
  socialLinks: [
    { id: 'github', platform: 'github' as const, label: 'GitHub', url: 'github.com/honggildong' },
    {
      id: 'linkedin',
      platform: 'linkedin' as const,
      label: 'LinkedIn',
      url: 'linkedin.com/in/honggildong',
    },
  ],
  portfolio: {
    title: '후배 포트폴리오',
    url: 'portfolio.honggildong.com',
  },
  profileImage: null as string | null,
};
