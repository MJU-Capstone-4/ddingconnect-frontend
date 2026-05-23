import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

import * as S from './account-setting-section.styles';

export type AccountSettingSectionProps = {
  onResetPassword?: () => void;
  onLogout?: () => void;
  onWithdraw?: () => void;
  className?: string;
};

export function AccountSettingSection({
  onResetPassword,
  onLogout,
  onWithdraw,
  className,
}: AccountSettingSectionProps) {
  return (
    <section className={cn(S.section, className)}>
      <h2 className={S.sectionTitle}>계정 설정</h2>

      <div className={S.buttonGroup}>
        <Button
          type="button"
          variant="outline"
          tone="gray"
          size="accountSetting"
          className="justify-start"
          onClick={onResetPassword}
        >
          비밀번호 재설정
        </Button>

        <Button
          type="button"
          variant="outline"
          tone="gray"
          size="accountSetting"
          className="justify-start"
          onClick={onLogout}
        >
          로그아웃
        </Button>

        <Button
          type="button"
          variant="outline"
          tone="red"
          size="accountSetting"
          className="justify-start bg-red-50"
          onClick={onWithdraw}
        >
          회원 탈퇴
        </Button>
      </div>
    </section>
  );
}
