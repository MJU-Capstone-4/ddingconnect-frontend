import GithubIcon from '@/shared/assets/icons/github.svg?react';
import LinkedinIcon from '@/shared/assets/icons/linkedin.svg?react';
import ChevronRightIcon from '@/shared/assets/icons/chevron-right.svg?react';
import PlusIcon from '@/shared/assets/icons/plus.svg?react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';

import * as S from './social-link-section.styles';

export type SocialLinkItem = {
  id: string;
  platform: 'github' | 'linkedin';
  label: string;
  url: string;
  href?: string;
};

type SocialLinkSectionViewProps = {
  mode?: 'view';
  links: SocialLinkItem[];
  className?: string;
};

type SocialLinkSectionEditProps = {
  mode: 'edit';
  links: SocialLinkItem[];
  onUrlChange: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  addValue: string;
  onAddChange: (value: string) => void;
  className?: string;
};

export type SocialLinkSectionProps = SocialLinkSectionViewProps | SocialLinkSectionEditProps;

function getSafeHref(url: string): string {
  try {
    const { protocol } = new URL(url);
    return protocol === 'http:' || protocol === 'https:' ? url : '#';
  } catch {
    return '#';
  }
}

const iconWrapperVariant: Record<SocialLinkItem['platform'], string> = {
  github: S.iconWrapperGithub,
  linkedin: S.iconWrapperLinkedin,
};

function PlatformIcon({ platform }: { platform: SocialLinkItem['platform'] }) {
  if (platform === 'github') {
    return <GithubIcon className={S.iconGithub} aria-hidden="true" />;
  }
  return <LinkedinIcon className={S.iconLinkedin} aria-hidden="true" />;
}

export function SocialLinkSection(props: SocialLinkSectionProps) {
  const { links, className } = props;

  return (
    <section className={cn(S.section, className)}>
      <h2 className={S.sectionTitle}>소셜 링크</h2>

      <div className={S.itemsWrapper}>
        {props.mode !== 'edit' ? (
          links.map((link) => (
            <div key={link.id} className={S.viewItemRow}>
              <a
                href={getSafeHref(link.href ?? link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className={S.viewItemLink}
              >
                <span className={cn(S.iconWrapperBase, iconWrapperVariant[link.platform])}>
                  <PlatformIcon platform={link.platform} />
                </span>
                <div className={S.linkContent}>
                  <span className={S.linkLabel}>{link.label}</span>
                  <span className={S.linkUrl}>{link.url}</span>
                </div>
                <ChevronRightIcon className={S.chevronIcon} aria-hidden="true" />
              </a>
            </div>
          ))
        ) : (
          <>
            {links.map((link) => (
              <div key={link.id} className={S.editItemBlock}>
                <span className={S.editItemLabel}>{link.label}</span>
                <div className={S.editItemRow}>
                  <span className={cn(S.iconWrapperBase, iconWrapperVariant[link.platform])}>
                    <PlatformIcon platform={link.platform} />
                  </span>
                  <Input
                    value={link.url}
                    onChange={(e) => props.onUrlChange(link.id, e.target.value)}
                    wrapperClassName="flex-1"
                    aria-label={`${link.label} URL`}
                  />
                  <Button
                    size="delete"
                    tone="red"
                    onClick={() => props.onDelete(link.id)}
                    aria-label={`${link.label} 삭제`}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            ))}
            <div className={S.editItemBlock}>
              <span className={S.editItemLabel}>링크추가하기</span>
              <div className={S.editItemRow}>
                <span className={cn(S.iconWrapperBase, S.iconWrapperAdd)}>
                  <PlusIcon className={S.iconAdd} aria-hidden="true" />
                </span>
                <Input
                  value={props.addValue}
                  onChange={(e) => props.onAddChange(e.target.value)}
                  placeholder="링크를 입력해주세요"
                  wrapperClassName="flex-1"
                  aria-label="링크 추가"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
