import { useState } from 'react';

import PortfolioIcon from '@/shared/assets/icons/portfolio.svg?react';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import MapIcon from '@/shared/assets/icons/map.svg?react';
import CommentIcon from '@/shared/assets/icons/comment.svg?react';
import UserIcon from '@/shared/assets/icons/user.svg?react';
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import ProfileIcon from '@/shared/assets/icons/profile.svg?react';
import GraduationIcon from '@/shared/assets/icons/graduation.svg?react';
import BagIcon from '@/shared/assets/icons/bag.svg?react';
import CheckIcon from '@/shared/assets/icons/check.svg?react';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import EditIcon from '@/shared/assets/icons/edit.svg?react';

import { ActivitySummary } from '@/shared/ui/activity-summary';
import type { ActivitySummaryItemData } from '@/shared/ui/activity-summary';
import { Button } from '@/shared/ui/button';
import { Modal, FileUpload } from '@/shared/ui';
import {
  BasicInfoSection,
  CareerInfoSection,
  SocialLinkSection,
  PortfolioSection,
  AccountSettingSection,
} from '@/features/mypage';
import type { BasicInfoItem, SocialLinkItem } from '@/features/mypage';

import * as S from './student-my-page.styles';

type Profile = {
  nickname: string;
  email: string;
  studentId: string;
  department: string;
  grade: string;
  interests: string[];
  skills: string[];
  socialLinks: SocialLinkItem[];
  portfolio: { title: string; url: string } | null;
};

const MOCK_PROFILE: Profile = {
  nickname: '닉네임',
  email: 'dding_connect@mju.ac.kr',
  studentId: '60211234',
  department: '응용소프트웨어',
  grade: '3학년',
  interests: ['백엔드 개발', '데이터 엔지니어', '클라우드 엔지니어'],
  skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker'],
  socialLinks: [
    { id: 'github', platform: 'github', label: 'GitHub', url: 'github.com/honggildong' },
    { id: 'linkedin', platform: 'linkedin', label: 'LinkedIn', url: 'linkedin.com/in/honggildong' },
  ],
  portfolio: {
    title: '후배 포트폴리오',
    url: 'portfolio.honggildong.com',
  },
};

const MOCK_ACTIVITY: ActivitySummaryItemData[] = [
  { icon: CoffeeIcon, count: 12, label: '커피챗', tone: 'blue' },
  { icon: MapIcon, count: 3, label: '로드맵', tone: 'purple' },
  { icon: CommentIcon, count: 5, label: 'QnA', tone: 'pink' },
];

export function StudentMyPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState<Profile>(MOCK_PROFILE);
  const [draftProfile, setDraftProfile] = useState<Profile>(MOCK_PROFILE);
  const enterEditMode = () => {
    setDraftProfile(profile);
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setDraftProfile(profile);
    setIsEditMode(false);
  };

  const handleSave = () => {
    // TODO: 프로필 수정 API 연동
    console.log(draftProfile);
    setProfile(draftProfile);
    setIsEditMode(false);
  };

  const handleAddCareerItem = (groupLabel: string, value: string) => {
    setDraftProfile((p) => {
      if (groupLabel === '관심 직군') return { ...p, interests: [...p.interests, value] };
      return { ...p, skills: [...p.skills, value] };
    });
  };

  const handleRemoveCareerItem = (groupLabel: string, item: string) => {
    setDraftProfile((p) => {
      if (groupLabel === '관심 직군')
        return { ...p, interests: p.interests.filter((i) => i !== item) };
      return { ...p, skills: p.skills.filter((i) => i !== item) };
    });
  };

  const handleLinkUrlChange = (id: string, value: string) => {
    setDraftProfile((p) => ({
      ...p,
      socialLinks: p.socialLinks.map((l) => (l.id === id ? { ...l, url: value } : l)),
    }));
  };

  const handleDeleteLink = (id: string) => {
    setDraftProfile((p) => ({
      ...p,
      socialLinks: p.socialLinks.map((l) => (l.id === id ? { ...l, url: '' } : l)),
    }));
  };

  const handleDeletePortfolio = () => {
    setDraftProfile((p) => ({ ...p, portfolio: null }));
  };

  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const handleAddPortfolio = () => {
    setIsPortfolioModalOpen(true);
  };

  const handlePortfolioUploadConfirm = () => {
    if (!pendingFile) return;
    // TODO: 파일 업로드 API 연동
    setDraftProfile((p) => ({
      ...p,
      portfolio: { title: pendingFile.name, url: '' },
    }));
    setPendingFile(null);
    setIsPortfolioModalOpen(false);
  };

  const currentData = isEditMode ? draftProfile : profile;

  const basicInfoItems: BasicInfoItem[] = [
    {
      label: '이름',
      value: currentData.nickname,
      icon: <UserIcon className="w-5 h-5" aria-hidden="true" />,
      iconWrapperClassName: S.iconName,
      onChange: isEditMode ? (v) => setDraftProfile((p) => ({ ...p, nickname: v })) : undefined,
    },
    {
      label: '이메일',
      value: currentData.email,
      icon: <MailIcon className="w-5 h-5" aria-hidden="true" />,
      iconWrapperClassName: S.iconEmail,
    },
    {
      label: '학번',
      value: currentData.studentId,
      icon: <ProfileIcon className="w-5 h-5" aria-hidden="true" />,
      iconWrapperClassName: S.iconStudentId,
    },
    {
      label: '재학 학과',
      value: currentData.department,
      icon: <GraduationIcon className="w-5 h-5" aria-hidden="true" />,
      iconWrapperClassName: S.iconDepartment,
      onChange: isEditMode ? (v) => setDraftProfile((p) => ({ ...p, department: v })) : undefined,
    },
    {
      label: '학년',
      value: currentData.grade,
      icon: <BagIcon className="w-5 h-5" aria-hidden="true" />,
      iconWrapperClassName: S.iconGrade,
      onChange: isEditMode ? (v) => setDraftProfile((p) => ({ ...p, grade: v })) : undefined,
    },
  ];

  const careerGroups = [
    {
      label: '관심 직군',
      items: currentData.interests,
      tone: 'blue' as const,
      placeholder: '관심직군 입력하기',
    },
    {
      label: '기술 스택',
      items: currentData.skills,
      tone: 'gray' as const,
      placeholder: '기술 스택 입력하기',
    },
  ];

  return (
    <div className={S.page}>
      {/* Hero / Profile 상단 영역 */}
      <section className={S.heroSection} aria-label="프로필">
        <div className={S.avatarWrapper}>
          <div className={S.avatarCircle} aria-hidden="true">
            {currentData.nickname.charAt(0)}
          </div>

          {!isEditMode && (
            <button
              type="button"
              className={S.avatarEditButton}
              onClick={enterEditMode}
              aria-label="프로필 수정"
            >
              <EditIcon className="w-3 h-3" aria-hidden="true" />
            </button>
          )}
        </div>

        {isEditMode ? (
          <>
            <input
              type="text"
              value={draftProfile.nickname}
              onChange={(e) => setDraftProfile((p) => ({ ...p, nickname: e.target.value }))}
              placeholder="닉네임입력"
              aria-label="닉네임"
              className={S.nicknameInput}
            />
            <div className={S.editActionRow}>
              <Button
                type="button"
                tone="blue"
                size="compact"
                leftIcon={<CheckIcon className="w-3.5 h-3.5" />}
                onClick={handleSave}
                className={S.editSaveButton}
              >
                수정 완료
              </Button>
              <Button
                type="button"
                variant="outline"
                tone="gray"
                size="compact"
                leftIcon={<CloseIcon className="w-3.5 h-3.5" />}
                onClick={handleCancel}
                className={S.editCancelButton}
              >
                취소
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className={S.nickname}>{profile.nickname}</p>
            <span className={S.verifiedBadge}>재학생 인증완료</span>
            <div className={S.activityWrapper}>
              <ActivitySummary items={MOCK_ACTIVITY} />
            </div>
          </>
        )}
      </section>

      {/* 정보 섹션 */}
      <div className={S.sectionsWrapper}>
        <BasicInfoSection mode={isEditMode ? 'edit' : 'view'} items={basicInfoItems} />

        <CareerInfoSection
          title="진로 정보"
          mode={isEditMode ? 'edit' : 'view'}
          groups={careerGroups}
          onAddItem={isEditMode ? handleAddCareerItem : undefined}
          onRemoveItem={isEditMode ? handleRemoveCareerItem : undefined}
        />

        {isEditMode ? (
          <SocialLinkSection
            mode="edit"
            links={draftProfile.socialLinks}
            onUrlChange={handleLinkUrlChange}
            onDelete={handleDeleteLink}
          />
        ) : (
          <SocialLinkSection links={profile.socialLinks} />
        )}

        <PortfolioSection
          mode={isEditMode ? 'edit' : 'view'}
          portfolio={currentData.portfolio}
          label="이후배 포트폴리오"
          onClick={isEditMode ? handleAddPortfolio : undefined}
          onDelete={isEditMode ? handleDeletePortfolio : undefined}
        />

        <AccountSettingSection
          onResetPassword={() => {}}
          onLogout={() => {}}
          onWithdraw={() => {}}
        />
      </div>

      <Modal
        open={isPortfolioModalOpen}
        onOpenChange={(open) => {
          setIsPortfolioModalOpen(open);
          if (!open) setPendingFile(null);
        }}
      >
        <Modal.Content size="lg">
          <Modal.Header tone="yellow">
            <Modal.Icon>
              <PortfolioIcon className="w-5 h-5" aria-hidden="true" />
            </Modal.Icon>
            <Modal.Title>포트폴리오 업로드하기</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body className="flex items-center justify-center">
            <FileUpload file={pendingFile} onFileChange={setPendingFile} variant="modal" />
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              tone="blue"
              size="upload"
              onClick={handlePortfolioUploadConfirm}
              disabled={!pendingFile}
            >
              업로드 완료
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
