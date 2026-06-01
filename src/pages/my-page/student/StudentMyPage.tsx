import { useRef, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { clearAccessToken, clearUserRole } from '@/features/auth/model/auth-state';
import { useDeleteAccountMutation } from '@/features/auth/hooks';

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
import { cn } from '@/shared/utils/cn';
import {
  BasicInfoSection,
  CareerInfoSection,
  SocialLinkSection,
  PortfolioSection,
  AccountSettingSection,
  useMyPageQuery,
  useUpdateStudentMyPageMutation,
  useProfileImageUploadMutation,
  usePortfolioUploadMutation,
  techStacksToLabels,
  targetJobsToLabels,
  labelsToTechStacks,
  labelsToTargetJobs,
  gradeToLabel,
  labelToGrade,
} from '@/features/mypage';
import type { BasicInfoItem, SocialLinkItem } from '@/features/mypage';
import type { MyPageResponse } from '@/shared/api/generated/api';

import { MOCK_STUDENT_PROFILE } from './student-my-page.mock';
import * as S from './student-my-page.styles';

const IS_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK === 'true' && import.meta.env.DEV;

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
  profileImage: string | null;
};

const MOCK_PROFILE: Profile = MOCK_STUDENT_PROFILE;

const MOCK_ACTIVITY: ActivitySummaryItemData[] = [
  { icon: CoffeeIcon, count: 12, label: '커피챗', tone: 'blue' },
  { icon: MapIcon, count: 3, label: '로드맵', tone: 'purple' },
  { icon: CommentIcon, count: 5, label: 'QnA', tone: 'pink' },
];

function mapApiToProfile(data: MyPageResponse): Profile {
  const p = data.profile ?? {};
  return {
    nickname: p.nickname ?? '',
    email: p.email ?? '',
    studentId: p.studentNumber ?? '',
    department: p.department ?? '',
    grade: gradeToLabel(p.grade),
    interests: targetJobsToLabels(data.targetJobs),
    skills: techStacksToLabels(data.techStacks),
    socialLinks: [
      { id: 'github', platform: 'github', label: 'GitHub', url: p.githubLink ?? '' },
      { id: 'linkedin', platform: 'linkedin', label: 'LinkedIn', url: p.linkedinLink ?? '' },
    ],
    portfolio: p.portfolio ? { title: '포트폴리오', url: p.portfolio } : null,
    profileImage: p.profileImage ?? null,
  };
}

export function StudentMyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccountMutation();
  const [draftProfile, setDraftProfile] = useState<Profile>(MOCK_PROFILE);

  const { data: mypageData } = useMyPageQuery();
  const { mutate: updateStudentMyPage, isPending: isSaving } = useUpdateStudentMyPageMutation();
  const profileImageUploadMutation = useProfileImageUploadMutation();
  const portfolioUploadMutation = usePortfolioUploadMutation();
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const profile = useMemo(() => {
    if (mypageData) return mapApiToProfile(mypageData);
    return IS_MOCK_FALLBACK ? MOCK_PROFILE : MOCK_PROFILE;
  }, [mypageData]);

  const activityItems: ActivitySummaryItemData[] = mypageData?.activity
    ? [
        {
          icon: CoffeeIcon,
          count: mypageData.activity.coffeeChatCount ?? 0,
          label: '커피챗',
          tone: 'blue',
        },
        {
          icon: MapIcon,
          count: mypageData.activity.roadmapCount ?? 0,
          label: '로드맵',
          tone: 'purple',
        },
        {
          icon: CommentIcon,
          count: mypageData.activity.questionCount ?? 0,
          label: 'QnA',
          tone: 'pink',
        },
      ]
    : MOCK_ACTIVITY;

  const enterEditMode = () => {
    setDraftProfile(profile);
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  const handleSave = () => {
    const github = draftProfile.socialLinks.find((l) => l.id === 'github')?.url;
    const linkedin = draftProfile.socialLinks.find((l) => l.id === 'linkedin')?.url;

    updateStudentMyPage(
      {
        profile: {
          nickname: draftProfile.nickname || undefined,
          studentNumber: draftProfile.studentId || undefined,
          department: draftProfile.department || undefined,
          grade: labelToGrade(draftProfile.grade),
          githubLink: github || undefined,
          linkedinLink: linkedin || undefined,
          portfolio: draftProfile.portfolio?.url || undefined,
          profileImage: draftProfile.profileImage || undefined,
        },
        techStacks: labelsToTechStacks(draftProfile.skills),
        targetJobs: labelsToTargetJobs(draftProfile.interests),
      },
      {
        onSuccess: () => setIsEditMode(false),
      },
    );
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const fileUrl = await profileImageUploadMutation.mutateAsync(file);
      setDraftProfile((p) => ({ ...p, profileImage: fileUrl }));
    } catch {
      // error accessible via profileImageUploadMutation.error
    }
    e.target.value = '';
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

  const handlePortfolioUploadConfirm = async () => {
    if (!pendingFile) return;
    try {
      const fileUrl = await portfolioUploadMutation.mutateAsync(pendingFile);
      setDraftProfile((p) => ({
        ...p,
        portfolio: { title: pendingFile.name, url: fileUrl },
      }));
      setPendingFile(null);
      setIsPortfolioModalOpen(false);
    } catch {
      // error accessible via portfolioUploadMutation.error — keep modal open
    }
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
      onChange: isEditMode ? (v) => setDraftProfile((p) => ({ ...p, studentId: v })) : undefined,
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

  const isUploading =
    profileImageUploadMutation.isPending || portfolioUploadMutation.isPending || isSaving;

  return (
    <div className={S.page}>
      <section className={S.heroSection} aria-label="프로필">
        <div className={S.avatarWrapper}>
          <div
            className={cn(S.avatarCircle, currentData.profileImage && 'overflow-hidden')}
            aria-hidden="true"
          >
            {currentData.profileImage ? (
              <img
                src={currentData.profileImage}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            ) : (
              currentData.nickname.charAt(0)
            )}
          </div>

          {isEditMode ? (
            <>
              <input
                ref={profileImageInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleProfileImageChange}
                aria-label="프로필 이미지 선택"
              />
              <button
                type="button"
                className={S.avatarEditButton}
                onClick={() => profileImageInputRef.current?.click()}
                disabled={profileImageUploadMutation.isPending}
                aria-label="프로필 이미지 변경"
              >
                <EditIcon className="w-3 h-3" aria-hidden="true" />
              </button>
            </>
          ) : (
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
            {profileImageUploadMutation.error && (
              <p className="text-xs text-red-500 mb-2">
                {profileImageUploadMutation.error.message}
              </p>
            )}
            <div className={S.editActionRow}>
              <Button
                type="button"
                tone="blue"
                size="compact"
                leftIcon={<CheckIcon className="w-3.5 h-3.5" />}
                onClick={handleSave}
                disabled={isUploading}
                className={S.editSaveButton}
              >
                {isSaving ? '저장 중...' : '수정 완료'}
              </Button>
              <Button
                type="button"
                variant="outline"
                tone="gray"
                size="compact"
                leftIcon={<CloseIcon className="w-3.5 h-3.5" />}
                onClick={handleCancel}
                disabled={isUploading}
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
              <ActivitySummary
                items={activityItems}
                onTitleClick={() => navigate('/my/activity')}
              />
            </div>
          </>
        )}
      </section>

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
          onClick={isEditMode ? () => setIsPortfolioModalOpen(true) : undefined}
          onDelete={isEditMode ? handleDeletePortfolio : undefined}
        />

        <AccountSettingSection
          onResetPassword={() => {}}
          onLogout={() => {
            clearAccessToken();
            clearUserRole();
            queryClient.clear();
            navigate('/auth/login', { replace: true });
          }}
          onWithdraw={() => setIsWithdrawModalOpen(true)}
        />
      </div>

      <Modal open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen}>
        <Modal.Content size="lg">
          <Modal.Header tone="blue">
            <Modal.Title>회원 탈퇴</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <p className="text-center text-sm text-text-primary py-2">
              정말 탈퇴하시겠습니까?
              <br />
              탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              tone="red"
              size="upload"
              onClick={() => deleteAccount()}
              disabled={isDeleting}
            >
              {isDeleting ? '처리 중...' : '탈퇴하기'}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal
        open={isPortfolioModalOpen}
        onOpenChange={(open) => {
          setIsPortfolioModalOpen(open);
          if (!open) {
            setPendingFile(null);
            portfolioUploadMutation.reset();
          }
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
          <Modal.Body className="flex flex-col items-center gap-3">
            <FileUpload
              file={pendingFile}
              onFileChange={setPendingFile}
              variant="modal"
              accept="application/pdf"
              description="PDF 형식의 파일만 가능합니다"
            />
            {portfolioUploadMutation.error && (
              <p className="text-xs text-red-500">{portfolioUploadMutation.error.message}</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              tone="blue"
              size="upload"
              onClick={handlePortfolioUploadConfirm}
              disabled={!pendingFile || portfolioUploadMutation.isPending}
            >
              {portfolioUploadMutation.isPending ? '업로드 중...' : '업로드 완료'}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
