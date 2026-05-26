import PointIcon from '@/shared/assets/icons/point.svg?react';
import { HeroSection } from '@/shared/ui/hero-section';
import { PointChargeOption } from '@/features/point/components/point-charge-option';

import * as styles from './point-charge-page.styles';

const POINT_OPTIONS: { token: number; price: number; isPopular?: boolean }[] = [
  { token: 10, price: 1000 },
  { token: 30, price: 3000 },
  { token: 50, price: 5000, isPopular: true },
  { token: 100, price: 10000 },
  { token: 300, price: 30000 },
  { token: 500, price: 50000 },
];

export function PointChargePage() {
  const handleChargeClick = (token: number, price: number) => {
    // TODO: 포인트 충전 API 연동
    console.log({ token, price });
  };

  return (
    <div className={styles.page}>
      <HeroSection
        title="포인트 충전하기"
        variant="point"
        icon={<PointIcon className="w-7 h-7 text-white" aria-hidden="true" />}
        className={styles.heroBreakout}
        contentClassName={styles.heroContent}
      />

      <section className={styles.myPointSection} aria-label="내 포인트">
        <p className={styles.myPointLabel}>내 포인트</p>
        <p>
          <span className={styles.myPointValue}>1,250</span>
          <span className={styles.myPointUnit}>P</span>
        </p>
      </section>

      <div className={styles.grayDivider} aria-hidden="true" />

      <section className={styles.chargeSection} aria-label="포인트 충전">
        <h2 className={styles.chargeSectionTitle}>포인트 충전</h2>
        <div className={styles.chargeCard}>
          {POINT_OPTIONS.map((option, index) => (
            <PointChargeOption
              key={option.token}
              tokenAmount={option.token}
              price={option.price}
              isPopular={option.isPopular}
              showDivider={index < POINT_OPTIONS.length - 1}
              onClick={() => handleChargeClick(option.token, option.price)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
