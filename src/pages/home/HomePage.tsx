import AlarmIcon from '@/shared/assets/icons/alarm.svg?react';
import BagIcon from '@/shared/assets/icons/bag.svg?react';
import ChevronRightIcon from '@/shared/assets/icons/chevron-right.svg?react';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import CommentIcon from '@/shared/assets/icons/comment.svg?react';
import LogoIcon from '@/shared/assets/icons/logo.svg?react';
import MapIcon from '@/shared/assets/icons/map.svg?react';
import MaruIcon from '@/shared/assets/icons/maru.svg?react';
import PointIcon from '@/shared/assets/icons/point.svg?react';
import { ActivitySummary } from '@/shared/ui/activity-summary';
import type { ActivitySummaryItemData } from '@/shared/ui/activity-summary';
import { Chip } from '@/shared/ui/chip';

import * as styles from './home-page.styles';

const MOCK_USER = {
  name: '띵지대',
  major: '컴퓨터공학과',
  grade: '3학년',
  point: 1250,
};

const MOCK_ACTIVITY: ActivitySummaryItemData[] = [
  { icon: CoffeeIcon, count: 12, label: '커피챗', tone: 'blue' },
  { icon: MapIcon, count: 3, label: '로드맵', tone: 'purple' },
  { icon: CommentIcon, count: 5, label: 'QnA', tone: 'pink' },
];

export function HomePage() {
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
            <Chip leftIcon={PointIcon} size="md" className={styles.pointChip}>
              {MOCK_USER.point.toLocaleString()}P
            </Chip>
            <button type="button" className={styles.bellButton} aria-label="알림">
              <AlarmIcon className={styles.bellIcon} aria-hidden="true" />
              <span className={styles.bellDot} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className={styles.heroBody}>
          <div className={styles.heroText}>
            <p className={styles.heroName}>{MOCK_USER.name}님,</p>
            <p className={styles.heroGreeting}>안녕하세요</p>
            <p className={styles.heroMajor}>{MOCK_USER.major}</p>
            <div className={styles.heroGradeRow}>
              <span className={styles.heroGradeDot} aria-hidden="true" />
              <span className={styles.heroGradeText}>{MOCK_USER.grade}</span>
            </div>
          </div>
          <div className={styles.heroMascotWrap} aria-hidden="true">
            <MaruIcon className={styles.heroMascot} />
          </div>
        </div>

        <div className={styles.activityWrap}>
          <ActivitySummary items={MOCK_ACTIVITY} />
        </div>
      </section>

      {/* CTA 카드 */}
      <div className={styles.ctaSection}>
        <button
          type="button"
          className={`${styles.ctaCard} ${styles.ctaCoffee}`}
          aria-label="커피챗 매칭"
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
          <button type="button" className={styles.moreCard} aria-label="QnA 게시판으로 이동">
            <div className={styles.moreCardTop}>
              <div className={styles.moreQnaIconWrap}>
                <CommentIcon className={styles.moreQnaIcon} aria-hidden="true" />
              </div>
              <ChevronRightIcon className={styles.moreChevron} aria-hidden="true" />
            </div>
            <p className={styles.moreCardTitle}>QnA 게시판</p>
            <p className={styles.moreCardSubtitle}>익명 질문하기</p>
          </button>

          <button type="button" className={styles.moreCard} aria-label="구직정보로 이동">
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
    </div>
  );
}
