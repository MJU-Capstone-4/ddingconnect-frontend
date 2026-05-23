import { cn } from '@/shared/utils/cn';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/input/PasswordInput';
import UserIcon from '@/shared/assets/icons/user.svg?react';
import LockIcon from '@/shared/assets/icons/lock.svg?react';

import * as styles from './account-info-section.styles';

type AccountInfoSectionProps = {
  nickname: string;
  password: string;
  passwordConfirm: string;
  onNicknameChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onPasswordConfirmChange?: (value: string) => void;
  className?: string;
};

export function AccountInfoSection({
  nickname,
  password,
  passwordConfirm,
  onNicknameChange,
  onPasswordChange,
  onPasswordConfirmChange,
  className,
}: AccountInfoSectionProps) {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.field}>
        <p className={styles.label}>닉네임</p>
        <Input
          type="text"
          aria-label="닉네임"
          placeholder="사용할 닉네임"
          value={nickname}
          onChange={(e) => onNicknameChange?.(e.target.value)}
          leftIcon={UserIcon}
        />
      </div>

      <div className={styles.field}>
        <p className={styles.label}>비밀번호</p>
        <PasswordInput
          aria-label="비밀번호"
          placeholder="비밀번호 (8자 이상)"
          value={password}
          onChange={(e) => onPasswordChange?.(e.target.value)}
          leftIcon={LockIcon}
        />
      </div>

      <div className={styles.field}>
        <p className={styles.label}>비밀번호 확인</p>
        <PasswordInput
          aria-label="비밀번호 확인"
          placeholder="비밀번호 재입력"
          value={passwordConfirm}
          onChange={(e) => onPasswordConfirmChange?.(e.target.value)}
          leftIcon={LockIcon}
        />
      </div>
    </div>
  );
}
