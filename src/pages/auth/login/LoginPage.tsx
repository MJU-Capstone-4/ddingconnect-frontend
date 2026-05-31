import { useState } from 'react';
import { Link } from 'react-router';

import LockIcon from '@/shared/assets/icons/lock.svg?react';
import LogoIcon from '@/shared/assets/icons/logo.svg?react';
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import { Button } from '@/shared/ui/button';
import { Input, PasswordInput } from '@/shared/ui/input';
import { useLoginMutation } from '@/features/auth/hooks';
import { getApiError } from '@/shared/utils/get-api-error';

import * as styles from './login-page.styles';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogin, setKeepLogin] = useState(false);
  const [validationError, setValidationError] = useState('');

  const loginMutation = useLoginMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError('');

    if (!email) {
      setValidationError('이메일을 입력해주세요.');
      return;
    }
    if (!password) {
      setValidationError('비밀번호를 입력해주세요.');
      return;
    }

    loginMutation.mutate({ email, password });
  };

  const errorMessage =
    validationError ||
    (loginMutation.error ? getApiError(loginMutation.error, '로그인에 실패했습니다.') : '');

  return (
    <form className={styles.page} onSubmit={handleSubmit}>
      <div className={styles.logoSection}>
        <LogoIcon className={styles.logoIcon} aria-hidden="true" />
        <h1 className={styles.serviceName}>DdingConnect</h1>
        <p className={styles.serviceDesc}>명지대학교 선후배 연결 플랫폼</p>
      </div>

      <div className={styles.formSection}>
        <Input
          label="이메일"
          type="email"
          size="xl"
          placeholder="example@mju.ac.kr"
          leftIcon={MailIcon}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          label="비밀번호"
          size="xl"
          placeholder="비밀번호를 입력하세요"
          leftIcon={LockIcon}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={styles.optionsRow}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={keepLogin}
              onChange={(e) => setKeepLogin(e.target.checked)}
              className={styles.checkbox}
            />
            <span>로그인 유지</span>
          </label>
          <a href="#" className={styles.resetLink} onClick={(e) => e.preventDefault()}>
            비밀번호 재설정
          </a>
        </div>

        {errorMessage && <p className="text-sm text-red-500 text-center">{errorMessage}</p>}
      </div>

      <div className={styles.bottomSection}>
        <Button type="submit" size="auth" withDecoration disabled={loginMutation.isPending}>
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </Button>
        <p className={styles.signupRow}>
          계정이 없으신가요?{' '}
          <Link to="/auth/signup-select" className={styles.signupLink}>
            회원가입
          </Link>
        </p>
      </div>
    </form>
  );
}
