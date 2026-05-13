import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import MapIcon from '@/shared/assets/icons/map.svg?react';
import ProfileIcon from '@/shared/assets/icons/profile.svg?react';
import BagIcon from '@/shared/assets/icons/bag.svg?react';
import PointIcon from '@/shared/assets/icons/point.svg?react';

import { HeroSection } from '@/shared/ui';

export function HomePage() {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <HeroSection
        variant="coffeeChat"
        icon={<CoffeeIcon className="size-8 text-text-on-primary" />}
        title="커피챗 매칭"
        description="선배들과 1:1로 연결되어 진로 고민을 해결하세요"
      />

      <HeroSection
        variant="roadmap"
        icon={<MapIcon className="size-8 text-text-on-primary" />}
        title="취업 로드맵"
        description="나만의 커리어 로드맵을 만들어보세요"
      />

      <HeroSection
        variant="qna"
        icon={<ProfileIcon className="size-8 text-text-on-primary" />}
        title="Q&A 게시판"
        description="궁금한 점을 질문하고 답변을 받아보세요"
      />

      <HeroSection
        variant="jobInfo"
        icon={<BagIcon className="size-8 text-text-on-primary" />}
        title="구직 정보"
        description="최신 채용 공고와 취업 정보를 확인하세요"
      />

      <HeroSection
        variant="point"
        icon={<PointIcon className="size-8 text-text-on-primary" />}
        title="포인트 충전하기"
        description="포인트를 충전하고 서비스를 이용하세요"
      />

      <HeroSection
        variant="activity"
        icon={<ProfileIcon className="size-8 text-text-on-primary" />}
        title="나의 활동"
        description="내 활동 내역을 한눈에 확인하세요"
      />
    </div>
  );
}
