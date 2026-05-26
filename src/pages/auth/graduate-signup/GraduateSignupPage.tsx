import { useState } from 'react';
import { useNavigate } from 'react-router';

import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg?react';
import GraduationIcon from '@/shared/assets/icons/graduation.svg?react';
import { Button } from '@/shared/ui/button';
import {
  EmailVerificationSection,
  AccountInfoSection,
  CertificateUploadSection,
} from '@/features/auth';

import * as styles from './graduate-signup-page.styles';

export function GraduateSignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSubmit = () => {
    // TODO: 회원가입 API 연동
    console.log({ email, verificationCode, nickname, password, passwordConfirm, uploadedFile });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <ArrowLeftIcon className={styles.backIcon} aria-hidden="true" />
        </button>
        <h1 className={styles.title}>회원가입</h1>
      </header>

      <div className={styles.scrollArea}>
        <div className={styles.content}>
          <div className={styles.banner}>
            <span className={styles.bannerDecorationLeft} aria-hidden="true" />
            <span className={styles.bannerDecorationRight} aria-hidden="true" />
            <GraduationIcon className={styles.bannerIcon} aria-hidden="true" />
            <span className={styles.bannerText}>졸업생 회원가입</span>
          </div>

          <div className={styles.section}>
            <EmailVerificationSection
              tone="purple"
              email={email}
              verificationCode={verificationCode}
              onEmailChange={setEmail}
              onVerificationCodeChange={setVerificationCode}
            />
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <AccountInfoSection
              nickname={nickname}
              password={password}
              passwordConfirm={passwordConfirm}
              onNicknameChange={setNickname}
              onPasswordChange={setPassword}
              onPasswordConfirmChange={setPasswordConfirm}
            />
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <CertificateUploadSection
              label="졸업증명서 제출"
              file={uploadedFile}
              onFileChange={setUploadedFile}
            />
          </div>

          <div className={styles.submitArea}>
            <Button type="button" size="auth" fullWidth withDecoration onClick={handleSubmit}>
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
