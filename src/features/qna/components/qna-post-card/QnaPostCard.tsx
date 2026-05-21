import CommentIcon from '@/shared/assets/icons/comment.svg?react';
import EyeIcon from '@/shared/assets/icons/eye.svg?react';
import LikeIcon from '@/shared/assets/icons/like.svg?react';
import { Chip } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

import {
  actionButton,
  actionCount,
  actionIcon,
  actions,
  card,
  contentSection,
  dot,
  footer,
  header,
  iconWrapper,
  metaGroup,
  metaText,
  preview as previewStyle,
  title as titleStyle,
  viewCountText,
  viewGroup,
  viewIcon,
} from './qna-post-card.styles';

export type QnaPostCategory = '취업 준비' | '기술 질문' | '진로 고민' | '포트폴리오';

export type QnaPostCardProps = {
  category: QnaPostCategory;
  author: string;
  createdAt: string;
  title: string;
  preview: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  onClick?: () => void;
  onLikeClick?: () => void;
  onCommentClick?: () => void;
  className?: string;
};

export function QnaPostCard({
  category,
  author,
  createdAt,
  title,
  preview,
  likeCount,
  commentCount,
  viewCount,
  onClick,
  onLikeClick,
  onCommentClick,
  className,
}: QnaPostCardProps) {
  const isClickable = Boolean(onClick);

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.target instanceof Element && e.target.closest('button')) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(card, isClickable && 'cursor-pointer', className)}
    >
      <div className={header}>
        <Chip size="sm" tone="blue" tabIndex={-1} className="pointer-events-none">
          {category}
        </Chip>
        <div className={metaGroup}>
          <span className={metaText}>{author}</span>
          <span className={dot} aria-hidden="true">
            ·
          </span>
          <span className={metaText}>{createdAt}</span>
        </div>
      </div>

      <div className={contentSection}>
        <p className={titleStyle}>{title}</p>
        <p className={previewStyle}>{preview}</p>
      </div>

      <div className={footer}>
        <div className={actions}>
          <button
            type="button"
            className={actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onLikeClick?.();
            }}
            aria-label={`좋아요 ${likeCount}개`}
          >
            <span className={iconWrapper}>
              <LikeIcon className={actionIcon} aria-hidden="true" />
            </span>
            <span className={actionCount}>{likeCount}</span>
          </button>

          <button
            type="button"
            className={actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onCommentClick?.();
            }}
            aria-label={`댓글 ${commentCount}개`}
          >
            <span className={iconWrapper}>
              <CommentIcon className={actionIcon} aria-hidden="true" />
            </span>
            <span className={actionCount}>{commentCount}</span>
          </button>
        </div>

        <div className={viewGroup}>
          <EyeIcon className={viewIcon} aria-hidden="true" />
          <span className={viewCountText} aria-label={`조회수 ${viewCount}`}>
            {viewCount}
          </span>
        </div>
      </div>
    </div>
  );
}
