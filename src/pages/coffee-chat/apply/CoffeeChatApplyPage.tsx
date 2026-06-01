import { useNavigate, useParams } from 'react-router';

import { useMatchingDetailQuery } from '@/features/coffee-chat/hooks';
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
import { getApiError } from '@/shared/utils/get-api-error';

import * as S from './coffee-chat-apply-page.styles';

// Mock data (기말 발표 데모용)
// import { MOCK_SENIOR_DETAIL, MOCK_SENIOR_SOCIAL_LINKS } from '@/features/coffee-chat/mock/mock';

function normalizeUrl(input: string): string {
  return /^https?:\/\//i.test(input) ? input : `https://${input}`;
}

const handleSaveBusinessCard = () => {
  // TODO: 명함 저장 기능 구현
};

export function CoffeeChatApplyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const memberId = Number(id);

  const handleApply = () => {
    navigate('/coffee-chat/input', { state: { receiverId: Number(id) } });
  };

  const { data: senior, isLoading, isError, error } = useMatchingDetailQuery(memberId);

  const careerFields = [
    {
      label: '직군',
      value: senior?.jobCategories[0] ?? '직군 정보 없음',
      icon: <BagIcon className="w-5 h-5" aria-hidden="true" />,
      iconClassName: S.iconJobType,
    },
    {
      label: '회사',
      value: senior?.company || '회사 정보 없음',
      icon: <LocationIcon className="w-5 h-5" aria-hidden="true" />,
      iconClassName: S.iconCompany,
    },
    {
      label: '경력',
      value: senior
        ? senior.careerYear != null
          ? `경력 ${senior.careerYear}년`
          : '경력 정보 없음'
        : '',
      icon: <ClockIcon className="w-5 h-5" aria-hidden="true" />,
      iconClassName: S.iconExperience,
    },
  ];

  const portfolio = senior?.portfolio ? { title: '포트폴리오', url: senior.portfolio } : null;

  const jobPostingLink = senior?.jobPosts[0]?.detailUrl ?? undefined;

  const socialLinks: SocialLinkItem[] = [];
  if (senior?.githubLink) {
    socialLinks.push({ id: 'github', platform: 'github', label: 'GitHub', url: senior.githubLink });
  }
  if (senior?.linkedinLink) {
    socialLinks.push({
      id: 'linkedin',
      platform: 'linkedin',
      label: 'LinkedIn',
      url: senior.linkedinLink,
    });
  }

  if (isLoading) {
    return (
      <div className={S.page}>
        <HeroSection
          variant="coffeeChat"
          title="커피챗 매칭"
          description="선배들과 1:1로 연결되어 진로 고민을 해결하세요"
          icon={<CoffeeIcon className="w-7 h-7 text-white" aria-hidden="true" />}
          className={S.heroBreakout}
        />
        <p className="text-sm text-center text-gray-400 py-12">불러오는 중...</p>
      </div>
    );
  }

  if (isError || !senior) {
    return (
      <div className={S.page}>
        <HeroSection
          variant="coffeeChat"
          title="커피챗 매칭"
          description="선배들과 1:1로 연결되어 진로 고민을 해결하세요"
          icon={<CoffeeIcon className="w-7 h-7 text-white" aria-hidden="true" />}
          className={S.heroBreakout}
        />
        <p className="text-sm text-center text-red-500 py-12">
          {getApiError(error, '선배 정보를 불러오지 못했습니다.')}
        </p>
      </div>
    );
  }

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
        <SeniorProfileCard
          name={senior.nickname}
          department={senior.department}
          company={senior.company}
          job={senior.jobCategories[0] ?? ''}
          career={senior.careerYear != null ? `경력 ${senior.careerYear}년` : '경력 정보 없음'}
          region={senior.region}
          buttonLabel="커피챗 신청하기"
          onClick={handleApply}
          className={S.profileCard}
        />

        <CareerFieldsSection fields={careerFields} />

        <section className={S.techStackSection} aria-label="기술 스택">
          <h2 className={S.techStackTitle}>기술 스택</h2>
          {senior.techStacks.length === 0 ? (
            <p className="text-sm text-text-muted">기술 스택 정보 없음</p>
          ) : (
            <div className={S.techStackList}>
              {senior.techStacks.map((stack) => (
                <Chip key={stack} tone="gray" size="sm" className="pointer-events-none">
                  {stack}
                </Chip>
              ))}
            </div>
          )}
        </section>

        <PortfolioSection
          mode="view"
          portfolio={portfolio}
          onClick={
            portfolio
              ? () => window.open(normalizeUrl(portfolio.url), '_blank', 'noopener,noreferrer')
              : undefined
          }
        />

        <JobPostingSection
          link={jobPostingLink}
          onClick={
            jobPostingLink
              ? () => window.open(normalizeUrl(jobPostingLink), '_blank', 'noopener,noreferrer')
              : undefined
          }
        />

        <BusinessCardSection
          onButtonClick={handleSaveBusinessCard}
          businessCardImage={senior.businessCardImage || undefined}
        />

        <SocialLinkSection links={socialLinks} />
      </div>
    </div>
  );
}
