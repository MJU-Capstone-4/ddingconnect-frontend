import { useId, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

import { SeniorProfileCard } from '@/features/coffee-chat/components';
import type { MatchingCandidate } from '@/features/coffee-chat/types';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg?react';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import { HeroSection } from '@/shared/ui/hero-section';
import { cn } from '@/shared/utils/cn';

import * as styles from './coffee-chat-matching-result-page.styles';

// Mock data (기말 발표 데모용)
// import { MOCK_MATCHED_SENIORS } from '@/features/coffee-chat/mock/mock';

export function MatchingResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const infoContentId = useId();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const candidates: MatchingCandidate[] = location.state?.candidates ?? [];

  useEffect(() => {
    if (!location.state) {
      navigate('/coffee-chat/matching', { replace: true });
    }
  }, [location.state, navigate]);

  function handleOpenSeniorPage(memberId: number) {
    navigate(`/coffee-chat/apply/${memberId}`);
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

        {candidates.length === 0 ? (
          <p className="text-sm text-center text-gray-400 py-8">매칭된 선배가 없습니다.</p>
        ) : (
          <ul className={styles.cardList}>
            {candidates.map((candidate) => (
              <li key={candidate.memberId}>
                <SeniorProfileCard
                  profileImage={candidate.profileImage}
                  name={candidate.nickname}
                  department={candidate.department ?? ''}
                  company={candidate.company ?? ''}
                  job={candidate.jobCategories?.[0] ?? ''}
                  career={candidate.careerYear ? `${candidate.careerYear}년차` : '경력 정보 없음'}
                  techStacks={candidate.techStacks}
                  onClick={() => handleOpenSeniorPage(candidate.memberId)}
                  className="w-full"
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
