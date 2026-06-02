import { cn } from '@/shared/utils/cn';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import DownloadIcon from '@/shared/assets/icons/download.svg?react';
import {
  card,
  clickableArea,
  title as titleStyle,
  createdAt as createdAtStyle,
  downloadButton,
  downloadButtonLoading,
  downloadIconSize,
  deleteButton,
  deleteIconSize,
} from './roadmap-result-card.styles';

export type RoadmapResultCardProps = {
  title: string;
  createdAt: string;
  onCardClick?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  isDownloading?: boolean;
  className?: string;
};

export function RoadmapResultCard({
  title,
  createdAt,
  onCardClick,
  onDownload,
  onDelete,
  isDownloading = false,
  className,
}: RoadmapResultCardProps) {
  return (
    <div className={cn(card, className)}>
      <div
        className={clickableArea}
        onClick={onCardClick}
        role={onCardClick ? 'button' : undefined}
        tabIndex={onCardClick ? 0 : undefined}
        onKeyDown={
          onCardClick
            ? (e) => {
                if (e.key === 'Enter') onCardClick();
                if (e.key === ' ' || e.key === 'Spacebar') {
                  e.preventDefault();
                  onCardClick();
                }
              }
            : undefined
        }
      >
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
      {onDelete && (
        <button type="button" aria-label="로드맵 삭제" className={deleteButton} onClick={onDelete}>
          <CloseIcon className={deleteIconSize} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
