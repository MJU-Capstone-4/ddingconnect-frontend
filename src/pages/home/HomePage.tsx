import { useState } from 'react';
import { useNavigate } from 'react-router';
import { QNA_TAB } from '@/shared/constants/activity-tabs';
import { useHomeQuery } from '@/features/home/hooks';
import { usePointQuery } from '@/features/point/hooks';
import AlarmIcon from '@/shared/assets/icons/alarm.svg?react';
import BagIcon from '@/shared/assets/icons/bag.svg?react';
import CardIcon from '@/shared/assets/icons/card.svg?react';
import ChevronRightIcon from '@/shared/assets/icons/chevron-right.svg?react';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import CommentIcon from '@/shared/assets/icons/comment.svg?react';
import LogoIcon from '@/shared/assets/icons/logo.svg?react';
import MapIcon from '@/shared/assets/icons/map.svg?react';
import MaruIcon from '@/shared/assets/icons/maru.svg?react';
import PointIcon from '@/shared/assets/icons/point.svg?react';
import { ActivitySummary } from '@/shared/ui/activity-summary';
import type { ActivitySummaryItemData } from '@/shared/ui/activity-summary';
import { Button } from '@/shared/ui/button';
import { Chip } from '@/shared/ui/chip';
import { Modal } from '@/shared/ui/modal';

import * as styles from './home-page.styles';

// Demo fallback: 기말 발표 시연 안정성을 위해 유지
// const MOCK_POINT = 1250;
//
// const MOCK_HOME_DATA = {
//   point: MOCK_POINT,
//   nickname: '띵지대',
//   department: '컴퓨터공학과',
//   company: '',
//   role: 'STUDENT' as const,
//   grade: 3,
//   careerYear: 0,
//   activity: {
//     coffeeChatCount: 12,
//     roadmapCount: 3,
//     questionCount: 5,
//   },
// };
//
// const MOCK_ACTIVITY_ITEMS: ActivitySummaryItemData[] = [
//   { icon: CoffeeIcon, count: 12, label: '커피챗', tone: 'blue' },
//   { icon: MapIcon, count: 3, label: '로드맵', tone: 'purple' },
//   { icon: CommentIcon, count: 5, label: 'QnA', tone: 'pink' },
// ];
//
// const USE_MOCK_FALLBACK = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_FALLBACK === 'true';

export function HomePage() {
  const navigate = useNavigate();
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);

  const homeQuery = useHomeQuery();
  const pointQuery = usePointQuery();

  const homeData = homeQuery.data ?? null;
  const point = homeData?.point ?? pointQuery.data?.point ?? 0;

  const activityItems: ActivitySummaryItemData[] = homeData
    ? homeData.role === 'GRADUATE'
      ? [
          {
            icon: CoffeeIcon,
            count: homeData.activity.coffeeChatCount,
            label: '커피챗',
            tone: 'blue',
          },
          { icon: CommentIcon, count: homeData.activity.questionCount, label: 'QnA', tone: 'pink' },
        ]
      : [
          {
            icon: CoffeeIcon,
            count: homeData.activity.coffeeChatCount,
            label: '커피챗',
            tone: 'blue',
          },
          { icon: MapIcon, count: homeData.activity.roadmapCount, label: '로드맵', tone: 'purple' },
          { icon: CommentIcon, count: homeData.activity.questionCount, label: 'QnA', tone: 'pink' },
        ]
    : [];

  const subLabel = homeData?.role === 'GRADUATE' ? homeData.company : (homeData?.department ?? '');
  const gradeLabel =
    homeData?.role === 'GRADUATE'
      ? `${homeData.careerYear}년차`
      : homeData?.grade
        ? `${homeData.grade}학년`
        : '';

  const isHeroLoading = homeQuery.isLoading;
  const isPointLoading = homeData?.point == null && pointQuery.isLoading;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-label="홈 히어로">
        <div className={styles.heroTopBar}>
          <div className={styles.logoWrap}>
            <LogoIcon className={styles.logoIcon} aria-hidden="true" />
            <span className={styles.logoText}>DdingConnect</span>
          </div>
          <div className={styles.heroTopRight}>
            <Chip
              leftIcon={PointIcon}
              size="md"
              className={styles.pointChip}
              onClick={() => setIsPointModalOpen(true)}
            >
              {isPointLoading ? '...' : `${point.toLocaleString()}P`}
            </Chip>
            <button
              type="button"
              className={styles.bellButton}
              aria-label="알림"
              onClick={() => navigate('/notification')}
            >
              <AlarmIcon className={styles.bellIcon} aria-hidden="true" />
              <span className={styles.bellDot} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className={styles.heroBody}>
          <div className={styles.heroText}>
            {isHeroLoading ? (
              <>
                <p className={styles.heroName}>불러오는 중...</p>
                <p className={styles.heroGreeting}>안녕하세요</p>
              </>
            ) : homeData ? (
              <>
                <p className={styles.heroName}>{homeData.nickname}님,</p>
                <p className={styles.heroGreeting}>안녕하세요</p>
                <p className={styles.heroMajor}>{subLabel}</p>
                {gradeLabel && (
                  <div className={styles.heroGradeRow}>
                    <span className={styles.heroGradeDot} aria-hidden="true" />
                    <span className={styles.heroGradeText}>{gradeLabel}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className={styles.heroName}>홈 정보를</p>
                <p className={styles.heroGreeting}>불러오지 못했습니다</p>
              </>
            )}
          </div>
          <div className={styles.heroMascotWrap} aria-hidden="true">
            <MaruIcon className={styles.heroMascot} />
          </div>
        </div>

        <div className={styles.activityWrap}>
          <ActivitySummary
            items={activityItems}
            onTitleClick={() => navigate('/my/activity')}
            onItemClick={(label) => {
              const tab = label === 'QnA' ? QNA_TAB : label;
              navigate(`/my/activity?tab=${encodeURIComponent(tab)}`);
            }}
          />
        </div>
      </section>

      {/* CTA 카드 */}
      <div className={styles.ctaSection}>
        <button
          type="button"
          className={`${styles.ctaCard} ${styles.ctaCoffee}`}
          aria-label="커피챗 매칭"
          onClick={() => navigate('/coffee-chat/matching')}
        >
          <span className={styles.ctaDeco1} />
          <span className={styles.ctaDeco2} />
          <div className={styles.ctaIconWrap}>
            <CoffeeIcon className={styles.ctaIcon} aria-hidden="true" />
          </div>
          <div className={styles.ctaSpacer} />
          <p className={styles.ctaTitle}>커피챗 매칭</p>
          <p className={styles.ctaDesc}>
            선배들과 1:1로 연결되어
            <br />
            진로 고민을 해결하세요
          </p>
        </button>

        <button
          type="button"
          className={`${styles.ctaCard} ${styles.ctaRoadmap}`}
          aria-label="취업 로드맵"
          onClick={() => navigate('/roadmap')}
        >
          <span className={styles.ctaDeco1} />
          <span className={styles.ctaDeco2} />
          <div className={styles.ctaIconWrap}>
            <MapIcon className={styles.ctaIcon} aria-hidden="true" />
          </div>
          <div className={styles.ctaSpacer} />
          <p className={styles.ctaTitle}>취업 로드맵</p>
          <p className={styles.ctaDesc}>
            AI 기반 맞춤형 취업 준비 계획을
            <br />
            세워보세요
          </p>
        </button>
      </div>

      {/* 더 알아보기 */}
      <section className={styles.moreSection} aria-label="더 알아보기">
        <h2 className={styles.moreSectionTitle}>더 알아보기</h2>
        <div className={styles.moreGrid}>
          <button
            type="button"
            className={styles.moreCard}
            aria-label="QnA 게시판으로 이동"
            onClick={() => navigate('/qna')}
          >
            <div className={styles.moreCardTop}>
              <div className={styles.moreQnaIconWrap}>
                <CommentIcon className={styles.moreQnaIcon} aria-hidden="true" />
              </div>
              <ChevronRightIcon className={styles.moreChevron} aria-hidden="true" />
            </div>
            <p className={styles.moreCardTitle}>QnA 게시판</p>
            <p className={styles.moreCardSubtitle}>익명 질문하기</p>
          </button>

          <button
            type="button"
            className={styles.moreCard}
            aria-label="구직정보로 이동"
            onClick={() => navigate('/job-info')}
          >
            <div className={styles.moreCardTop}>
              <div className={styles.moreJobIconWrap}>
                <BagIcon className={styles.moreJobIcon} aria-hidden="true" />
              </div>
              <ChevronRightIcon className={styles.moreChevron} aria-hidden="true" />
            </div>
            <p className={styles.moreCardTitle}>구직정보</p>
            <p className={styles.moreCardSubtitle}>채용 공고 보기</p>
          </button>
        </div>
      </section>

      <Modal open={isPointModalOpen} onOpenChange={setIsPointModalOpen}>
        <Modal.Content size="md" withDecoration decorationTone="yellow">
          <Modal.Body className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center justify-center size-14 rounded-2xl bg-point mb-2">
              <PointIcon className="w-8 h-8 text-gray-800" aria-hidden="true" />
            </div>
            <p className="text-sm text-text-secondary">내 포인트</p>
            <p className="text-2xl font-bold text-yellow-500">
              {isPointLoading ? '...' : `${point.toLocaleString()}P`}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              size="modal"
              tone="yellow"
              leftIcon={<CardIcon className="w-4 h-4" />}
              onClick={() => {
                setIsPointModalOpen(false);
                navigate('/point/charge');
              }}
            >
              포인트 충전하기
            </Button>
            <Button
              type="button"
              size="modal"
              tone="gray"
              onClick={() => setIsPointModalOpen(false)}
            >
              닫기
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
