import { useId, useState } from 'react';

import { SeniorProfileCard } from '@/features/coffee-chat/components';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg?react';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import { HeroSection } from '@/shared/ui/hero-section';
import { cn } from '@/shared/utils/cn';

import * as styles from './coffee-chat-matching-result-page.styles';

const MOCK_MATCHED_SENIORS = [
  {
    id: 1,
    name: '이선배',
    department: "컴퓨터공학과 '18",
    company: '네이버',
    job: '백엔드 개발자',
    career: '경력 3년',
    techStacks: ['React', 'TypeScript'],
  },
  {
    id: 2,
    name: '이선배',
    department: "컴퓨터공학과 '18",
    company: '네이버',
    job: '백엔드 개발자',
    career: '경력 3년',
    techStacks: ['React', 'TypeScript'],
  },
  {
    id: 3,
    name: '이선배',
    department: "컴퓨터공학과 '18",
    company: '네이버',
    job: '백엔드 개발자',
    career: '경력 3년',
    techStacks: ['React', 'TypeScript'],
  },
];

export function MatchingResultPage() {
  const infoContentId = useId();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  function handleOpenSeniorPage(id: number) {
    // TODO: 선배 상세 페이지 이동
    console.log(id);
  }

  return (
    <div className={styles.page}>
      <HeroSection
        variant="coffeeChat"
        title="커피챗 매칭"
        description="선배들과 1:1로 연결되어 진로 고민을 해결하세요"
        icon={<CoffeeIcon className="w-7 h-7 text-white" aria-hidden="true" />}
        className={styles.heroBreakout}
      />

      <div className={styles.infoCard}>
        <button
          type="button"
          className={styles.infoToggleButton}
          onClick={() => setIsInfoOpen((prev) => !prev)}
          aria-expanded={isInfoOpen}
          aria-controls={infoContentId}
        >
          <span className={styles.infoToggleTitle}>정보 입력</span>
          <ArrowDownIcon
            className={cn(styles.chevronIcon, isInfoOpen && styles.chevronIconOpen)}
            aria-hidden="true"
          />
        </button>

        {isInfoOpen && (
          <div id={infoContentId} className={styles.infoContent}>
            {/* TODO: 입력된 정보 표시 */}
          </div>
        )}
      </div>

      <section className={styles.seniorsSection}>
        <h2 className={styles.sectionTitle}>매칭된 선배</h2>
        <ul className={styles.cardList}>
          {MOCK_MATCHED_SENIORS.map((senior) => (
            <li key={senior.id}>
              <SeniorProfileCard
                name={senior.name}
                department={senior.department}
                company={senior.company}
                job={senior.job}
                career={senior.career}
                techStacks={senior.techStacks}
                onClick={() => handleOpenSeniorPage(senior.id)}
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
