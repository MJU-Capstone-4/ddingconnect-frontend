import { useNavigate, useParams } from 'react-router';

import { useRoadmapDetailQuery, useRoadmapDownloadMutation } from '@/features/roadmap/hooks';
import MapIcon from '@/shared/assets/icons/map.svg?react';
import { Button } from '@/shared/ui';
import { HeroSection } from '@/shared/ui/hero-section';

import * as styles from './roadmap-detail-page.styles';

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

type RoadmapContentValue =
  | string
  | number
  | boolean
  | null
  | RoadmapContentValue[]
  | RoadmapContentObject;
type RoadmapContentObject = { [key: string]: RoadmapContentValue };

function RoadmapContentRenderer({
  data,
  depth = 0,
}: {
  data: RoadmapContentValue;
  depth?: number;
}) {
  if (data === null || data === undefined) return null;

  if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
    return <p className={styles.sectionItem}>{String(data)}</p>;
  }

  if (Array.isArray(data)) {
    return (
      <ul className="flex flex-col gap-1.5">
        {data.map((item, i) => (
          <li key={i} className={styles.bulletItem}>
            <span className={styles.bullet} />
            <RoadmapContentRenderer data={item} depth={depth + 1} />
          </li>
        ))}
      </ul>
    );
  }

  if (typeof data === 'object') {
    return (
      <div className="flex flex-col gap-3">
        {Object.entries(data).map(([key, value]) => {
          const label = key.replace(/_/g, ' ');
          if (typeof value === 'object' && value !== null) {
            return (
              <div key={key} className="flex flex-col gap-2">
                <p className={styles.sectionTitle}>{label}</p>
                <RoadmapContentRenderer data={value} depth={depth + 1} />
              </div>
            );
          }
          return (
            <div key={key} className="flex flex-col gap-1">
              <p className={styles.sectionTitle}>{label}</p>
              <p className={styles.sectionItem}>{String(value)}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}

export function RoadmapDetailPage() {
  const { id } = useParams<{ id: string }>();
  const roadmapId = Number(id);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useRoadmapDetailQuery(roadmapId);
  const { mutate: download, isPending: isDownloading } = useRoadmapDownloadMutation();

  let parsedContent: RoadmapContentValue = null;
  let parseError = false;
  if (data?.content) {
    try {
      parsedContent = JSON.parse(data.content) as RoadmapContentValue;
    } catch {
      parseError = true;
    }
  }

  const roadmapTitle =
    parsedContent && typeof parsedContent === 'object' && !Array.isArray(parsedContent)
      ? String((parsedContent as RoadmapContentObject).roadmap_title ?? '취업 로드맵')
      : '취업 로드맵';

  if (isLoading) {
    return (
      <div className={styles.page}>
        <HeroSection
          variant="roadmap"
          title="취업 로드맵"
          description="AI 기반 맞춤형 취업 준비 계획을 세워보세요"
          icon={<MapIcon className="w-7 h-7 text-white" aria-hidden="true" />}
          className={styles.heroBreakout}
        />
        <p className={styles.loadingBox}>로드맵을 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={styles.page}>
        <HeroSection
          variant="roadmap"
          title="취업 로드맵"
          description="AI 기반 맞춤형 취업 준비 계획을 세워보세요"
          icon={<MapIcon className="w-7 h-7 text-white" aria-hidden="true" />}
          className={styles.heroBreakout}
        />
        <div className={styles.errorBox}>
          <p className={styles.errorText}>로드맵을 불러올 수 없습니다.</p>
          <button
            type="button"
            onClick={() => navigate('/roadmap/result')}
            className="text-sm text-purple-500 underline mt-1"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
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

      <div className={styles.contentCard}>
        <div className="flex flex-col gap-1">
          <p className={styles.roadmapTitle}>{roadmapTitle}</p>
          <p className={styles.metaDate}>{formatDate(data.createdAt)}</p>
        </div>

        <hr className={styles.divider} />

        {parseError || parsedContent === null ? (
          <pre className={styles.rawContent}>{data.content}</pre>
        ) : (
          <RoadmapContentRenderer data={parsedContent} />
        )}
      </div>

      <div className="mt-4">
        <Button
          tone="purple"
          size="auth"
          fullWidth
          onClick={() => download(roadmapId)}
          disabled={isDownloading}
        >
          {isDownloading ? 'PDF 준비 중...' : 'PDF 다운로드'}
        </Button>
      </div>
    </div>
  );
}
