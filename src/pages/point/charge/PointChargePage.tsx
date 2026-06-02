import { usePointProductsQuery } from '@/features/point/hooks';
import PointIcon from '@/shared/assets/icons/point.svg?react';
import { HeroSection } from '@/shared/ui/hero-section';
import { PointChargeOption } from '@/features/point/components/point-charge-option';

import * as styles from './point-charge-page.styles';

// Demo fallback: 기말 발표 시연 안정성을 위해 유지
const MOCK_POINT_PRODUCTS = {
  point: 1250,
  products: [
    { id: 1, points: 10, price: 1000, recommended: false },
    { id: 2, points: 30, price: 3000, recommended: false },
    { id: 3, points: 50, price: 5000, recommended: true },
    { id: 4, points: 100, price: 10000, recommended: false },
    { id: 5, points: 300, price: 30000, recommended: false },
    { id: 6, points: 500, price: 50000, recommended: false },
  ],
};

const USE_MOCK_FALLBACK = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_FALLBACK === 'true';

export function PointChargePage() {
  const { data, isLoading, isError, refetch } = usePointProductsQuery();

  const resolvedData = data ?? (isError && USE_MOCK_FALLBACK ? MOCK_POINT_PRODUCTS : null);

  const handleChargeClick = (productId: number, points: number, price: number) => {
    // TODO: 결제 API 확정 후 충전 요청 연동
    console.log({ productId, points, price });
  };

  const renderMyPoint = () => {
    if (isLoading) return <span className={styles.myPointValue}>...</span>;
    if (!resolvedData)
      return (
        <span className={styles.myPointValue} style={{ fontSize: '1rem', color: '#888' }}>
          불러오기 실패
        </span>
      );
    return (
      <>
        <span className={styles.myPointValue}>{resolvedData.point.toLocaleString()}</span>
        <span className={styles.myPointUnit}>P</span>
      </>
    );
  };

  const renderProducts = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12 text-sm text-text-secondary">
          상품 목록을 불러오는 중...
        </div>
      );
    }

    if (!resolvedData) {
      return (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <p className="text-sm text-text-secondary">충전 가능한 상품을 불러오지 못했습니다.</p>
          <button
            type="button"
            className="text-xs text-primary underline"
            onClick={() => refetch()}
          >
            다시 시도
          </button>
        </div>
      );
    }

    if (resolvedData.products.length === 0) {
      return (
        <div className="flex items-center justify-center py-12 text-sm text-text-secondary">
          충전 가능한 상품이 없습니다.
        </div>
      );
    }

    return resolvedData.products.map((product, index) => (
      <PointChargeOption
        key={product.id}
        tokenAmount={product.points}
        price={product.price}
        isPopular={product.recommended}
        showDivider={index < resolvedData.products.length - 1}
        onClick={() => handleChargeClick(product.id, product.points, product.price)}
      />
    ));
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
        <p>{renderMyPoint()}</p>
      </section>

      <div className={styles.grayDivider} aria-hidden="true" />

      <section className={styles.chargeSection} aria-label="포인트 충전">
        <h2 className={styles.chargeSectionTitle}>포인트 충전</h2>
        <div className={styles.chargeCard}>{renderProducts()}</div>
      </section>
    </div>
  );
}
