import { useId, useState } from 'react';

import { RoadmapResultCard } from '@/features/roadmap/components';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg?react';
import MapIcon from '@/shared/assets/icons/map.svg?react';
import { HeroSection } from '@/shared/ui/hero-section';
import { cn } from '@/shared/utils/cn';

import * as styles from './roadmap-result-page.styles';

const MOCK_ROADMAPS = [
  { id: 1, title: '백엔드 개발자 로드맵', date: '2026. 04. 09', time: '오전 10:00' },
  { id: 2, title: '백엔드 개발자 로드맵', date: '2026. 04. 08', time: '오전 10:00' },
  { id: 3, title: '백엔드 개발자 로드맵', date: '2026. 04. 07', time: '오전 10:00' },
];

export function RoadmapResultPage() {
  const infoContentId = useId();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  function handleDownload(id: number) {
    // TODO: 로드맵 다운로드 API 연동
    console.log(id);
  }

  return (
    <div className={styles.page}>
      <HeroSection
        variant="roadmap"
        title="취업 로드맵"
        description="AI 기반 맞춤형 취업 준비 계획을 세워보세요"
        icon={<MapIcon className="w-7 h-7 text-white" aria-hidden="true" />}
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
            {/* TODO: 정보 입력 폼 */}
          </div>
        )}
      </div>

      <section className={styles.roadmapSection}>
        <h2 className={styles.sectionTitle}>생성된 로드맵</h2>
        <ul className={styles.cardList}>
          {MOCK_ROADMAPS.map((roadmap) => (
            <li key={roadmap.id}>
              <RoadmapResultCard
                title={roadmap.title}
                createdAt={`${roadmap.date}  •  ${roadmap.time}`}
                onDownload={() => handleDownload(roadmap.id)}
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
