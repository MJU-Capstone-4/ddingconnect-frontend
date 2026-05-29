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
import {
  useSendCodeMutation,
  useVerifyCodeMutation,
  useSignupMutation,
} from '@/features/auth/hooks';
import { setUserRole } from '@/features/auth/model/auth-state';

import * as styles from './student-signup-page.styles';

const MJU_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@mju\.ac\.kr$/;

function getApiError(error: unknown, fallback: string): string {
  const axiosError = error as { response?: { data?: { message?: string } } };
  return axiosError?.response?.data?.message ?? fallback;
}

export function StudentSignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [sendCodeError, setSendCodeError] = useState('');
  const [sendCodeSuccess, setSendCodeSuccess] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const sendCodeMutation = useSendCodeMutation();
  const verifyCodeMutation = useVerifyCodeMutation();
  const signupMutation = useSignupMutation();

  const handleSendCode = () => {
    setSendCodeError('');
    setSendCodeSuccess('');

    if (!email) {
      setSendCodeError('이메일을 입력해주세요.');
      return;
    }
    if (!MJU_EMAIL_REGEX.test(email)) {
      setSendCodeError('mju.ac.kr 이메일 주소를 입력해주세요.');
      return;
    }

    sendCodeMutation.mutate(
      { email },
      {
        onSuccess: () => setSendCodeSuccess('인증번호가 발송되었습니다.'),
        onError: (error) => setSendCodeError(getApiError(error, '인증번호 발송에 실패했습니다.')),
      },
    );
  };

  const handleVerify = () => {
    setVerifyError('');

    if (!verificationCode) {
      setVerifyError('인증번호를 입력해주세요.');
      return;
    }

    verifyCodeMutation.mutate(
      { email, code: verificationCode },
      {
        onSuccess: () => setIsEmailVerified(true),
        onError: (error) =>
          setVerifyError(getApiError(error, '인증에 실패했습니다. 코드를 확인해주세요.')),
      },
    );
  };

  const handleSubmit = () => {
    setSubmitError('');

    if (!isEmailVerified) {
      setSubmitError('이메일 인증을 완료해주세요.');
      return;
    }
    if (!nickname) {
      setSubmitError('닉네임을 입력해주세요.');
      return;
    }
    if (!password) {
      setSubmitError('비밀번호를 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setSubmitError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!uploadedFile) {
      setSubmitError('재학증명서를 첨부해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify({ email, password, nickname, role: 'STUDENT' })], {
        type: 'application/json',
      }),
    );
    formData.append('certificate', uploadedFile);

    signupMutation.mutate(formData, {
      onSuccess: () => setUserRole('STUDENT'),
      onError: (error) => setSubmitError(getApiError(error, '회원가입에 실패했습니다.')),
    });
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
            <span className={styles.bannerText}>재학생 회원가입</span>
          </div>

          <div className={styles.section}>
            <EmailVerificationSection
              tone="green"
              email={email}
              verificationCode={verificationCode}
              onEmailChange={(v) => {
                setEmail(v);
                setIsEmailVerified(false);
              }}
              onVerificationCodeChange={(v) => {
                setVerificationCode(v);
                setIsEmailVerified(false);
              }}
              onSendCode={handleSendCode}
              onVerify={handleVerify}
              isSendingCode={sendCodeMutation.isPending}
              isVerifying={verifyCodeMutation.isPending}
              isCodeVerified={isEmailVerified}
            />
            {sendCodeError && <p className="text-sm text-red-500 mt-1">{sendCodeError}</p>}
            {!sendCodeError && sendCodeSuccess && (
              <p className="text-sm text-green-600 mt-1">{sendCodeSuccess}</p>
            )}
            {verifyError && <p className="text-sm text-red-500 mt-1">{verifyError}</p>}
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
              label="재학증명서 제출"
              file={uploadedFile}
              onFileChange={setUploadedFile}
            />
          </div>

          {submitError && <p className="text-sm text-red-500 text-center mt-2">{submitError}</p>}

          <div className={styles.submitArea}>
            <Button
              type="button"
              size="auth"
              fullWidth
              withDecoration
              onClick={handleSubmit}
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? '처리 중...' : '회원가입'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
