import { Link, useNavigate } from 'react-router';

import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg?react';
import GraduationIcon from '@/shared/assets/icons/graduation.svg?react';

import * as S from './signup-select-page.styles';

const SIGNUP_TYPES = [
  {
    id: 'student',
    title: '재학생',
    subtitle: '재학증명서로 인증',
    path: '/auth/student-signup',
    iconWrapperClass: S.iconWrapperStudent,
  },
  {
    id: 'graduate',
    title: '졸업생',
    subtitle: '졸업증명서로 인증',
    path: '/auth/graduate-signup',
    iconWrapperClass: S.iconWrapperGraduate,
  },
] as const;

export function SignupSelectPage() {
  const navigate = useNavigate();

  return (
    <div className={S.page}>
      <header className={S.header}>
        <button
          type="button"
          className={S.backButton}
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <ArrowLeftIcon className={S.backIcon} aria-hidden="true" />
        </button>
        <h1 className={S.title}>회원가입</h1>
      </header>

      <p className={S.description}>회원 유형을 선택해주세요</p>

      <div className={S.cardList}>
        {SIGNUP_TYPES.map(({ id, title, subtitle, path, iconWrapperClass }) => (
          <Link key={id} to={path} className={S.card}>
            <div className={iconWrapperClass}>
              <GraduationIcon className={S.cardIcon} aria-hidden="true" />
            </div>
            <div className={S.cardText}>
              <span className={S.cardTitle}>{title}</span>
              <span className={S.cardSubtitle}>{subtitle}</span>
            </div>
          </Link>
        ))}
      </div>

      <p className={S.loginCta}>
        이미 계정이 있으신가요?{' '}
        <Link to="/auth/login" className={S.loginLink}>
          로그인
        </Link>
      </p>
    </div>
  );
}
