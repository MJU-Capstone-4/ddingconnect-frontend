import { useNavigate } from 'react-router';

import { RoadmapResultCard } from '@/features/roadmap/components';
import {
  useDeleteRoadmapMutation,
  useRoadmapDownloadMutation,
  useRoadmapsQuery,
} from '@/features/roadmap/hooks';
import MapIcon from '@/shared/assets/icons/map.svg?react';
import { HeroSection } from '@/shared/ui/hero-section';

import * as styles from './roadmap-result-page.styles';

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = d.getHours();
  const minute = String(d.getMinutes()).padStart(2, '0');
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${year}. ${month}. ${day}  •  ${period} ${displayHour}:${minute}`;
}

export function RoadmapResultPage() {
  const navigate = useNavigate();
  const { data: roadmaps = [], isLoading, isError } = useRoadmapsQuery();
  const {
    mutate: download,
    isPending: isDownloading,
    variables: downloadingId,
  } = useRoadmapDownloadMutation();
  const { mutate: deleteRoadmap } = useDeleteRoadmapMutation();

  function handleDelete(id: number) {
    if (!window.confirm('로드맵을 삭제하시겠습니까?')) return;
    deleteRoadmap(id);
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

      <section className={styles.roadmapSection}>
        <h2 className={styles.sectionTitle}>생성된 로드맵</h2>

        {isLoading && (
          <p className="text-sm text-text-muted text-center py-8">로드맵을 불러오는 중...</p>
        )}

        {isError && (
          <p className="text-sm text-text-muted text-center py-8">
            로드맵을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        )}

        {!isLoading && !isError && roadmaps.length === 0 && (
          <p className="text-sm text-text-muted text-center py-8">아직 생성된 로드맵이 없습니다.</p>
        )}

        {roadmaps.length > 0 && (
          <ul className={styles.cardList}>
            {roadmaps.map((roadmap) => (
              <li key={roadmap.id}>
                <RoadmapResultCard
                  title={roadmap.title}
                  createdAt={formatDate(roadmap.createdAt)}
                  onCardClick={() => navigate(`/roadmap/${roadmap.id}`)}
                  onDownload={() => download(roadmap.id)}
                  onDelete={() => handleDelete(roadmap.id)}
                  isDownloading={isDownloading && downloadingId === roadmap.id}
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
