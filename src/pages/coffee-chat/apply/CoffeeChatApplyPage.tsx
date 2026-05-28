import BagIcon from '@/shared/assets/icons/bag.svg?react';
import ClockIcon from '@/shared/assets/icons/clock.svg?react';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import LocationIcon from '@/shared/assets/icons/location.svg?react';
import { HeroSection, Chip } from '@/shared/ui';
import { SeniorProfileCard } from '@/features/coffee-chat/components/senior-profile-card';
import {
  CareerFieldsSection,
  JobPostingSection,
  BusinessCardSection,
  PortfolioSection,
  SocialLinkSection,
} from '@/features/mypage';
import type { SocialLinkItem } from '@/features/mypage';

import * as S from './coffee-chat-apply-page.styles';

type SeniorProfile = {
  name: string;
  department: string;
  company: string;
  position: string;
  experience: string;
  region: string;
  jobType: string;
  techStacks: string[];
  portfolio: { title: string; url: string } | null;
  jobPostingLink: string;
  socialLinks: SocialLinkItem[];
};

const MOCK_SENIOR: SeniorProfile = {
  name: '이선배',
  department: "컴퓨터공학과 '18",
  company: '네이버',
  position: '백엔드 개발자',
  experience: '경력 3년',
  region: '경기 성남시',
  jobType: '백엔드 개발자',
  techStacks: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker'],
  portfolio: {
    title: '이선배의 포트폴리오',
    url: 'portfolio.honggildong.com',
  },
  jobPostingLink: 'recruit.navercorp.com/rcrt/list.do',
  socialLinks: [
    { id: 'github', platform: 'github', label: 'GitHub', url: 'github.com/honggildong' },
    {
      id: 'linkedin',
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'linkedin.com/in/honggildong',
    },
  ],
};

const handleApply = () => {
  // TODO: 커피챗 신청 API 연동
  console.log('apply coffee chat');
};

const handlePortfolioClick = () => {
  // TODO: 포트폴리오 링크 이동
  console.log('open portfolio');
};

const handleJobPostingClick = () => {
  // TODO: 공고 링크 이동
  console.log('open job posting');
};

const handleSaveBusinessCard = () => {
  // TODO: 명함 저장 기능 구현
  console.log('save business card');
};

export function CoffeeChatApplyPage() {
  const careerFields = [
    {
      label: '직군',
      value: MOCK_SENIOR.jobType,
      icon: <BagIcon className="w-5 h-5" aria-hidden="true" />,
      iconClassName: S.iconJobType,
    },
    {
      label: '회사',
      value: MOCK_SENIOR.company,
      icon: <LocationIcon className="w-5 h-5" aria-hidden="true" />,
      iconClassName: S.iconCompany,
    },
    {
      label: '경력',
      value: MOCK_SENIOR.experience,
      icon: <ClockIcon className="w-5 h-5" aria-hidden="true" />,
      iconClassName: S.iconExperience,
    },
  ];

  return (
    <div className={S.page}>
      <HeroSection
        variant="coffeeChat"
        title="커피챗 매칭"
        description="선배들과 1:1로 연결되어 진로 고민을 해결하세요"
        icon={<CoffeeIcon className="w-7 h-7 text-white" aria-hidden="true" />}
        className={S.heroBreakout}
      />

      <div className={S.content}>
        {/* 선배 프로필 요약 카드 */}
        <SeniorProfileCard
          name={MOCK_SENIOR.name}
          department={MOCK_SENIOR.department}
          company={MOCK_SENIOR.company}
          job={MOCK_SENIOR.position}
          career={MOCK_SENIOR.experience}
          region={MOCK_SENIOR.region}
          buttonLabel="커피챗 신청하기"
          onClick={handleApply}
          className={S.profileCard}
        />

        {/* 경력 정보 */}
        <CareerFieldsSection fields={careerFields} />

        {/* 기술 스택 */}
        <section className="rounded-card bg-surface px-5 pt-6 pb-5" aria-label="기술 스택">
          <h2 className="text-[15px] font-semibold text-text-primary mb-4">기술 스택</h2>
          <div className="flex flex-wrap gap-2">
            {MOCK_SENIOR.techStacks.map((stack) => (
              <Chip key={stack} tone="gray" size="sm" className="pointer-events-none">
                {stack}
              </Chip>
            ))}
          </div>
        </section>

        {/* 포트폴리오 */}
        <PortfolioSection
          mode="view"
          portfolio={MOCK_SENIOR.portfolio}
          onClick={handlePortfolioClick}
        />

        {/* 이 선배의 공고 */}
        <JobPostingSection link={MOCK_SENIOR.jobPostingLink} onClick={handleJobPostingClick} />

        {/* 선배 명함 */}
        <BusinessCardSection onButtonClick={handleSaveBusinessCard} />

        {/* 소셜 링크 */}
        <SocialLinkSection links={MOCK_SENIOR.socialLinks} />
      </div>
    </div>
  );
}
