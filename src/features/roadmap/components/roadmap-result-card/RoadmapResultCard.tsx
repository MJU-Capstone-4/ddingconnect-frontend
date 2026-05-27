import { cn } from '@/shared/utils/cn';
import DownloadIcon from '@/shared/assets/icons/download.svg?react';
import {
  card,
  textGroup,
  title as titleStyle,
  createdAt as createdAtStyle,
  downloadButton,
  downloadButtonLoading,
  downloadIconSize,
} from './roadmap-result-card.styles';

export type RoadmapResultCardProps = {
  title: string;
  createdAt: string;
  onDownload?: () => void;
  isDownloading?: boolean;
  className?: string;
};

export function RoadmapResultCard({
  title,
  createdAt,
  onDownload,
  isDownloading = false,
  className,
}: RoadmapResultCardProps) {
  return (
    <div className={cn(card, className)}>
      <div className={textGroup}>
        <p className={titleStyle}>{title}</p>
        <p className={createdAtStyle}>{createdAt}</p>
      </div>
      <button
        type="button"
        aria-label="로드맵 다운로드"
        className={cn(downloadButton, isDownloading && downloadButtonLoading)}
        onClick={onDownload}
        disabled={isDownloading}
      >
        <DownloadIcon className={downloadIconSize} aria-hidden="true" />
      </button>
    </div>
  );
}
