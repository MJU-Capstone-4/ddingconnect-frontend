import { cn } from '@/shared/utils/cn';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import SendIcon from '@/shared/assets/icons/send.svg?react';

import * as styles from './email-verification-section.styles';

type VerificationTone = 'green' | 'purple';

type EmailVerificationSectionProps = {
  tone?: VerificationTone;
  email: string;
  verificationCode: string;
  onEmailChange?: (value: string) => void;
  onVerificationCodeChange?: (value: string) => void;
  onSendCode?: () => void;
  onVerify?: () => void;
  className?: string;
};

export function EmailVerificationSection({
  tone = 'green',
  email,
  verificationCode,
  onEmailChange,
  onVerificationCodeChange,
  onSendCode,
  onVerify,
  className,
}: EmailVerificationSectionProps) {
  return (
    <div className={cn(styles.container, className)}>
      <p className={styles.label}>이메일 (@mju.ac.kr)</p>

      <div className={styles.row}>
        <Input
          type="email"
          aria-label="이메일"
          placeholder="example@mju.ac.kr"
          value={email}
          onChange={(e) => onEmailChange?.(e.target.value)}
          leftIcon={MailIcon}
          wrapperClassName={styles.inputWrapper}
          className={styles.inputBox}
        />
        <Button
          type="button"
          size="verification"
          tone="blue"
          leftIcon={<SendIcon className="w-3.5 h-3.5" aria-hidden="true" />}
          onClick={onSendCode}
          disabled={!onSendCode}
        >
          인증번호발송
        </Button>
      </div>

      <div className={styles.row}>
        <Input
          type="text"
          aria-label="인증번호"
          placeholder="인증번호 6자리"
          value={verificationCode}
          onChange={(e) => onVerificationCodeChange?.(e.target.value)}
          wrapperClassName={styles.inputWrapper}
          className={styles.inputBox}
          maxLength={6}
          inputMode="numeric"
        />
        <Button
          type="button"
          size="verification"
          tone={tone}
          onClick={onVerify}
          disabled={!onVerify}
        >
          인증 확인
        </Button>
      </div>
    </div>
  );
}
