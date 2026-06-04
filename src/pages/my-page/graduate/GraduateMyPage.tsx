import { useRef, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { QNA_TAB } from '@/shared/constants/activity-tabs';
import { useQueryClient } from '@tanstack/react-query';
import { clearAccessToken, clearUserRole } from '@/features/auth/model/auth-state';
import { useDeleteAccountMutation } from '@/features/auth/hooks';

import BagIcon from '@/shared/assets/icons/bag.svg?react';
import CardIcon from '@/shared/assets/icons/card.svg?react';
import CheckIcon from '@/shared/assets/icons/check.svg?react';
import ChevronRightIcon from '@/shared/assets/icons/chevron-right.svg?react';
import ClockIcon from '@/shared/assets/icons/clock.svg?react';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import CommentIcon from '@/shared/assets/icons/comment.svg?react';
import EditIcon from '@/shared/assets/icons/edit.svg?react';
import GraduationIcon from '@/shared/assets/icons/graduation.svg?react';
import LocationIcon from '@/shared/assets/icons/location.svg?react';
import MailIcon from '@/shared/assets/icons/mail.svg?react';
import PortfolioIcon from '@/shared/assets/icons/portfolio.svg?react';
import PlusIcon from '@/shared/assets/icons/plus.svg?react';
import ProfileIcon from '@/shared/assets/icons/profile.svg?react';
import UserIcon from '@/shared/assets/icons/user.svg?react';

import { ActivitySummary } from '@/shared/ui/activity-summary';
import type { ActivitySummaryItemData } from '@/shared/ui/activity-summary';
import { Button, FileUpload, Input, Modal, Select } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
import {
  AccountSettingSection,
  BasicInfoSection,
  CareerInfoSection,
  PortfolioSection,
  SocialLinkSection,
  useMyPageQuery,
  useUpdateGraduateMyPageMutation,
  useProfileImageUploadMutation,
  usePortfolioUploadMutation,
  useBusinessCardUploadMutation,
  techStacksToLabels,
  labelsToTechStacks,
  jobTypeToLabel,
  labelToJobType,
  careerYearToLabel,
  labelToCareerYear,
  TECH_STACK_OPTIONS,
  JOB_TYPE_OPTIONS,
} from '@/features/mypage';
import type { BasicInfoItem, SocialLinkItem } from '@/features/mypage';
import type { MyPageResponse } from '@/shared/api/generated/api';

// import { MOCK_GRADUATE_PROFILE } from './graduate-my-page.mock';
import * as S from './graduate-my-page.styles';

// const IS_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK === 'true' && import.meta.env.DEV;

type GraduateProfile = {
  name: string;
  nickname: string;
  email: string;
  studentId: string;
  department: string;
  jobType: string;
  company: string;
  experience: string;
  skills: string[];
  socialLinks: SocialLinkItem[];
  portfolio: { title: string; url: string } | null;
  jobPostingLinks: string[];
  businessCardImageUrl: string;
  profileImage: string | null;
};

// const MOCK_PROFILE: GraduateProfile = MOCK_GRADUATE_PROFILE;
const EMPTY_GRADUATE_PROFILE: GraduateProfile = {
  name: '',
  nickname: '',
  email: '',
  studentId: '',
  department: '',
  jobType: '',
  company: '',
  experience: '',
  skills: [],
  socialLinks: [
    { id: 'github', platform: 'github', label: 'GitHub', url: '' },
    { id: 'linkedin', platform: 'linkedin', label: 'LinkedIn', url: '' },
  ],
  portfolio: null,
  jobPostingLinks: [],
  businessCardImageUrl: '',
  profileImage: null,
};

// const MOCK_ACTIVITY: ActivitySummaryItemData[] = [
//   { icon: CoffeeIcon, count: 12, label: '커피챗', tone: 'blue' },
//   { icon: CommentIcon, count: 5, label: 'Q&A', tone: 'pink' },
// ];

function mapApiToProfile(data: MyPageResponse): GraduateProfile {
  const p = data.profile ?? {};
  return {
    name: p.name ?? '',
    nickname: p.nickname ?? '',
    email: p.email ?? '',
    studentId: p.studentNumber ?? '',
    department: p.department ?? '',
    jobType: jobTypeToLabel(p.jobType),
    company: p.company ?? '',
    experience: careerYearToLabel(p.careerYear),
    skills: techStacksToLabels(data.techStacks),
    socialLinks: [
      { id: 'github', platform: 'github', label: 'GitHub', url: p.githubLink ?? '' },
      { id: 'linkedin', platform: 'linkedin', label: 'LinkedIn', url: p.linkedinLink ?? '' },
    ],
    portfolio: p.portfolio ? { title: '포트폴리오', url: p.portfolio } : null,
    jobPostingLinks: (data.jobPosts ?? []).map((j) => j.detailUrl ?? '').filter(Boolean),
    businessCardImageUrl: p.businessCardImage ?? '',
    profileImage: p.profileImage ?? null,
  };
}

export function GraduateMyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccountMutation();
  const [draftProfile, setDraftProfile] = useState<GraduateProfile>(EMPTY_GRADUATE_PROFILE);

  const { data: mypageData } = useMyPageQuery();
  const { mutate: updateGraduateMyPage, isPending: isSaving } = useUpdateGraduateMyPageMutation();
  const profileImageUploadMutation = useProfileImageUploadMutation();
  const portfolioUploadMutation = usePortfolioUploadMutation();
  const businessCardUploadMutation = useBusinessCardUploadMutation();
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const profile = useMemo(() => {
    if (mypageData) return mapApiToProfile(mypageData);
    return EMPTY_GRADUATE_PROFILE;
  }, [mypageData]);

  const originalJobPosts = useMemo(() => mypageData?.jobPosts ?? [], [mypageData]);

  const originalJobPostUrls = useMemo(
    () => originalJobPosts.map((j) => j.detailUrl ?? '').filter(Boolean),
    [originalJobPosts],
  );

  const activityItems: ActivitySummaryItemData[] = mypageData?.activity
    ? [
        {
          icon: CoffeeIcon,
          count: mypageData.activity.coffeeChatCount ?? 0,
          label: '커피챗',
          tone: 'blue',
        },
        {
          icon: CommentIcon,
          count: mypageData.activity.questionCount ?? 0,
          label: 'Q&A',
          tone: 'pink',
        },
      ]
    : [];

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

    const currentUrls = draftProfile.jobPostingLinks;
    const addedUrls = currentUrls.filter((url) => !originalJobPostUrls.includes(url));
    const removedIds = originalJobPosts
      .filter((j) => j.detailUrl && !currentUrls.includes(j.detailUrl))
      .map((j) => j.id)
      .filter((id): id is number => id != null);

    const jobPostsToAdd =
      addedUrls.length > 0 ? addedUrls.map((url) => ({ detailUrl: url })) : undefined;
    const jobPostIdsToDelete = removedIds.length > 0 ? removedIds : undefined;

    const techStackValues = labelsToTechStacks(draftProfile.skills);

    updateGraduateMyPage(
      {
        profile: {
          name: draftProfile.name || undefined,
          nickname: draftProfile.nickname || undefined,
          studentNumber: draftProfile.studentId || undefined,
          department: draftProfile.department || undefined,
          githubLink: github || undefined,
          linkedinLink: linkedin || undefined,
          portfolio: draftProfile.portfolio?.url || undefined,
          profileImage: draftProfile.profileImage || undefined,
          jobType: labelToJobType(draftProfile.jobType),
          company: draftProfile.company || undefined,
          careerYear: labelToCareerYear(draftProfile.experience),
          businessCardImage: draftProfile.businessCardImageUrl || undefined,
        },
        techStacks: techStackValues.length > 0 ? techStackValues : undefined,
        jobPostsToAdd,
        jobPostIdsToDelete,
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

  const openJobPosting = () => {
    const url = profile.jobPostingLinks[0];
    if (!url) return;
    const href = url.startsWith('http') ? url : `https://${url}`;
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const handleAddSkill = (_groupLabel: string, value: string) => {
    setDraftProfile((p) => ({ ...p, skills: [...p.skills, value] }));
  };

  const handleRemoveSkill = (_groupLabel: string, item: string) => {
    setDraftProfile((p) => ({ ...p, skills: p.skills.filter((s) => s !== item) }));
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

  // Portfolio modal
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [pendingPortfolioFile, setPendingPortfolioFile] = useState<File | null>(null);

  const handlePortfolioUploadConfirm = async () => {
    if (!pendingPortfolioFile) return;
    try {
      const fileUrl = await portfolioUploadMutation.mutateAsync(pendingPortfolioFile);
      setDraftProfile((p) => ({
        ...p,
        portfolio: { title: pendingPortfolioFile.name, url: fileUrl },
      }));
      setPendingPortfolioFile(null);
      setIsPortfolioModalOpen(false);
    } catch {
      // error accessible via portfolioUploadMutation.error — keep modal open
    }
  };

  // Business card modal
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [pendingCardFile, setPendingCardFile] = useState<File | null>(null);

  const handleCardUploadConfirm = async () => {
    if (!pendingCardFile) return;
    try {
      const fileUrl = await businessCardUploadMutation.mutateAsync(pendingCardFile);
      setDraftProfile((p) => ({ ...p, businessCardImageUrl: fileUrl }));
      setPendingCardFile(null);
      setIsCardModalOpen(false);
    } catch {
      // error accessible via businessCardUploadMutation.error — keep modal open
    }
  };

  const handleDeleteCard = () => {
    setDraftProfile((p) => ({ ...p, businessCardImageUrl: '' }));
  };

  const handleDeleteJobPosting = () => {
    setDraftProfile((p) => ({ ...p, jobPostingLinks: [] }));
  };

  // Job posting modal
  const [isJobPostingModalOpen, setIsJobPostingModalOpen] = useState(false);
  const [pendingJobLinks, setPendingJobLinks] = useState<string[]>(['']);

  const handleOpenJobPostingModal = () => {
    setPendingJobLinks(
      draftProfile.jobPostingLinks.length > 0 ? [...draftProfile.jobPostingLinks, ''] : [''],
    );
    setIsJobPostingModalOpen(true);
  };

  const handleAddJobLink = () => {
    setPendingJobLinks((links) => [...links, '']);
  };

  const handleJobLinkChange = (index: number, value: string) => {
    setPendingJobLinks((links) => links.map((l, i) => (i === index ? value : l)));
  };

  const handleDeleteJobLink = (index: number) => {
    setPendingJobLinks((links) => links.filter((_, i) => i !== index));
  };

  const handleJobPostingUploadConfirm = () => {
    const validLinks = pendingJobLinks.filter((l) => l.trim());
    setDraftProfile((p) => ({ ...p, jobPostingLinks: validLinks }));
    setIsJobPostingModalOpen(false);
  };

  const currentData = isEditMode ? draftProfile : profile;

  const careerFields = [
    {
      label: '직군',
      value: currentData.jobType,
      icon: <BagIcon className="w-5 h-5" aria-hidden="true" />,
      iconClassName: S.iconJobType,
      options: JOB_TYPE_OPTIONS,
      onChange: isEditMode
        ? (v: string) => setDraftProfile((p) => ({ ...p, jobType: v }))
        : undefined,
    },
    {
      label: '회사',
      value: currentData.company,
      icon: <LocationIcon className="w-5 h-5" aria-hidden="true" />,
      iconClassName: S.iconCompany,
      onChange: isEditMode
        ? (v: string) => setDraftProfile((p) => ({ ...p, company: v }))
        : undefined,
    },
    {
      label: '경력',
      value: currentData.experience,
      icon: <ClockIcon className="w-5 h-5" aria-hidden="true" />,
      iconClassName: S.iconExperience,
      onChange: isEditMode
        ? (v: string) => setDraftProfile((p) => ({ ...p, experience: v }))
        : undefined,
    },
  ];

  const basicInfoItems: BasicInfoItem[] = [
    {
      label: '이름',
      value: currentData.name,
      icon: <UserIcon className="w-5 h-5" aria-hidden="true" />,
      iconWrapperClassName: S.iconName,
      onChange: isEditMode ? (v) => setDraftProfile((p) => ({ ...p, name: v })) : undefined,
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
      label: '졸업 학과',
      value: currentData.department,
      icon: <GraduationIcon className="w-5 h-5" aria-hidden="true" />,
      iconWrapperClassName: S.iconDepartment,
      onChange: isEditMode ? (v) => setDraftProfile((p) => ({ ...p, department: v })) : undefined,
    },
  ];

  const skillGroups = [
    {
      label: '기술 스택',
      items: currentData.skills,
      tone: 'gray' as const,
      placeholder: '기술 스택 입력하기',
      options: TECH_STACK_OPTIONS,
    },
  ];

  const hasJobPosting = currentData.jobPostingLinks.length > 0;

  const isUploading =
    profileImageUploadMutation.isPending ||
    portfolioUploadMutation.isPending ||
    businessCardUploadMutation.isPending ||
    isSaving;

  return (
    <div className={S.page}>
      {/* Hero */}
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
              placeholder="닉네임 입력"
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
            <span className={S.verifiedBadge}>졸업생 인증완료</span>
            <div className={S.activityWrapper}>
              <ActivitySummary
                items={activityItems}
                onTitleClick={() => navigate('/my/activity')}
                onItemClick={(label) => {
                  const tab = label === 'QnA' ? QNA_TAB : label;
                  navigate(`/my/activity?tab=${encodeURIComponent(tab)}`);
                }}
              />
            </div>
          </>
        )}
      </section>

      <div className={S.sectionsWrapper}>
        {/* 경력 정보 */}
        <section className={S.careerSection} aria-label="경력 정보">
          <h2 className={S.careerSectionTitle}>경력 정보</h2>
          <ul>
            {careerFields.map((field) => (
              <li key={field.label} className={S.careerRow}>
                <div className={cn(S.careerIconWrapper, field.iconClassName)} aria-hidden="true">
                  {field.icon}
                </div>
                <div className={S.careerItemContent}>
                  <span className={S.careerItemLabel}>{field.label}</span>
                  {isEditMode ? (
                    field.options ? (
                      <Select
                        fullWidth
                        options={field.options.map((opt) => ({ label: opt, value: opt }))}
                        value={field.value}
                        onChange={field.onChange ?? undefined}
                        placeholder={`${field.label} 선택`}
                      />
                    ) : (
                      <Input
                        value={field.value}
                        onChange={
                          field.onChange ? (e) => field.onChange!(e.target.value) : undefined
                        }
                        readOnly={!field.onChange}
                        aria-label={field.label}
                      />
                    )
                  ) : (
                    <p className={S.careerItemValue}>{field.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 기본 정보 */}
        <BasicInfoSection mode={isEditMode ? 'edit' : 'view'} items={basicInfoItems} />

        {/* 기술 스택 */}
        <CareerInfoSection
          title="기술 스택"
          mode={isEditMode ? 'edit' : 'view'}
          groups={skillGroups}
          onAddItem={isEditMode ? handleAddSkill : undefined}
          onRemoveItem={isEditMode ? handleRemoveSkill : undefined}
        />

        {/* 포트폴리오 */}
        <PortfolioSection
          mode={isEditMode ? 'edit' : 'view'}
          portfolio={currentData.portfolio}
          onClick={isEditMode ? () => setIsPortfolioModalOpen(true) : undefined}
          onDelete={isEditMode ? handleDeletePortfolio : undefined}
        />

        {/* 나의 공고 올리기 */}
        <section
          className={S.jobPostingSection}
          aria-label={isEditMode ? '나의 공고 올리기' : '공고'}
        >
          <h2 className={S.jobPostingSectionTitle}>{isEditMode ? '나의 공고 올리기' : '공고'}</h2>

          {!hasJobPosting ? (
            <div
              className={S.jobPostingCardRow}
              {...(isEditMode && {
                role: 'button' as const,
                tabIndex: 0,
                onClick: handleOpenJobPostingModal,
                onKeyDown: (e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenJobPostingModal();
                  }
                },
                'aria-label': '공고 올리기',
              })}
            >
              <span className={S.jobPostingIconWrapper}>
                <PlusIcon className={S.jobPostingPlusIcon} aria-hidden="true" />
              </span>
              <div className={S.jobPostingTextContent}>
                <span className={S.jobPostingTextLabel}>
                  {isEditMode ? '공고 올리기' : '공고 링크'}
                </span>
                <span className={S.jobPostingTextMain}>공고를 올려주세요</span>
              </div>
              <ChevronRightIcon className={S.jobPostingChevron} aria-hidden="true" />
            </div>
          ) : isEditMode ? (
            <div className={S.jobPostingCardRowStatic}>
              <span className={S.jobPostingViewIconWrapper}>
                <BagIcon className={S.jobPostingBagIcon} aria-hidden="true" />
              </span>
              <div className={S.jobPostingTextContent}>
                <span className={S.jobPostingTextLabel}>공고 올리기</span>
                <span className={S.jobPostingTextMain}>{currentData.jobPostingLinks[0]}</span>
              </div>
              <Button
                type="button"
                size="delete"
                tone="red"
                onClick={handleDeleteJobPosting}
                aria-label="공고 삭제"
              >
                삭제
              </Button>
            </div>
          ) : (
            <div
              className={S.jobPostingCardRow}
              role="button"
              tabIndex={0}
              onClick={openJobPosting}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openJobPosting();
                }
              }}
              aria-label={`${profile.nickname}의 채용공고 확인`}
            >
              <span className={S.jobPostingViewIconWrapper}>
                <BagIcon className={S.jobPostingBagIcon} aria-hidden="true" />
              </span>
              <div className={S.jobPostingTextContent}>
                <span className={S.jobPostingTextLabel}>공고 링크</span>
                <span className={S.jobPostingViewTextMain}>{profile.jobPostingLinks[0]}</span>
              </div>
              <ChevronRightIcon className={S.jobPostingChevron} aria-hidden="true" />
            </div>
          )}
        </section>

        {/* 내 명함 */}
        <section className={S.cardSection} aria-label="내 명함">
          <div className={S.cardSectionHeader}>
            <h2 className={S.cardSectionTitle}>내 명함</h2>
            {isEditMode && !!currentData.businessCardImageUrl && (
              <Button
                type="button"
                size="tiny"
                tone="red"
                onClick={handleDeleteCard}
                aria-label="명함 삭제"
              >
                삭제
              </Button>
            )}
          </div>

          <div className={S.cardPreviewArea}>
            {currentData.businessCardImageUrl ? (
              <>
                <span className={S.cardRegisteredBadge}>
                  <CheckIcon className={S.cardBadgeCheck} aria-hidden="true" />
                  등록됨
                </span>
                <img
                  src={currentData.businessCardImageUrl}
                  alt="명함"
                  className="w-full h-full object-contain p-3"
                />
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-text-secondary">
                <CardIcon className="w-8 h-8 text-gray-300" aria-hidden="true" />
                <p className={S.cardEmptyText}>명함을 등록해주세요</p>
              </div>
            )}
          </div>

          {isEditMode && (
            <Button
              type="button"
              tone="blue"
              size="accountSetting"
              fullWidth
              onClick={() => setIsCardModalOpen(true)}
            >
              명함 변경하기
            </Button>
          )}
        </section>

        {/* 소셜 링크 */}
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

        {/* 계정 설정 */}
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

      {/* 회원 탈퇴 확인 Modal */}
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

      {/* 포트폴리오 업로드 Modal */}
      <Modal
        open={isPortfolioModalOpen}
        onOpenChange={(open) => {
          setIsPortfolioModalOpen(open);
          if (!open) {
            setPendingPortfolioFile(null);
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
              file={pendingPortfolioFile}
              onFileChange={setPendingPortfolioFile}
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
              disabled={!pendingPortfolioFile || portfolioUploadMutation.isPending}
            >
              {portfolioUploadMutation.isPending ? '업로드 중...' : '업로드 완료'}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* 명함 업로드 Modal */}
      <Modal
        open={isCardModalOpen}
        onOpenChange={(open) => {
          setIsCardModalOpen(open);
          if (!open) {
            setPendingCardFile(null);
            businessCardUploadMutation.reset();
          }
        }}
      >
        <Modal.Content size="lg">
          <Modal.Header tone="yellow">
            <Modal.Icon>
              <PortfolioIcon className="w-5 h-5" aria-hidden="true" />
            </Modal.Icon>
            <Modal.Title>명함 업로드하기</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body className="flex flex-col items-center gap-3">
            <FileUpload
              file={pendingCardFile}
              onFileChange={setPendingCardFile}
              variant="modal"
              accept="image/png,image/jpeg,image/webp"
              description="PNG, JPEG, WebP 형식의 파일만 가능합니다"
            />
            {businessCardUploadMutation.error && (
              <p className="text-xs text-red-500">{businessCardUploadMutation.error.message}</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              tone="blue"
              size="upload"
              onClick={handleCardUploadConfirm}
              disabled={!pendingCardFile || businessCardUploadMutation.isPending}
            >
              {businessCardUploadMutation.isPending ? '업로드 중...' : '업로드 완료'}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* 나의 공고 올리기 Modal */}
      <Modal
        open={isJobPostingModalOpen}
        onOpenChange={(open) => {
          setIsJobPostingModalOpen(open);
          if (!open) setPendingJobLinks(['']);
        }}
      >
        <Modal.Content size="lg">
          <Modal.Header tone="green">
            <Modal.Icon>
              <BagIcon className="w-5 h-5" aria-hidden="true" />
            </Modal.Icon>
            <Modal.Title>나의 공고 올리기</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <div className={S.jobModalLinkHeader}>
              <span className={S.jobModalLinkLabel}>나의 공고 링크</span>
              <button type="button" className={S.jobModalAddButton} onClick={handleAddJobLink}>
                + 링크 추가
              </button>
            </div>
            <div className={S.jobModalLinkList}>
              {pendingJobLinks.map((link, index) => (
                <div key={index} className={S.jobModalLinkRow}>
                  <div className="flex-1">
                    <Input
                      value={link}
                      onChange={(e) => handleJobLinkChange(index, e.target.value)}
                      placeholder="링크를 붙여넣기해주세요"
                      aria-label={`공고 링크 ${index + 1}`}
                    />
                  </div>
                  {link.trim() !== '' && (
                    <Button
                      type="button"
                      size="delete"
                      tone="red"
                      onClick={() => handleDeleteJobLink(index)}
                      aria-label="링크 삭제"
                    >
                      삭제
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" tone="blue" size="upload" onClick={handleJobPostingUploadConfirm}>
              링크 업로드 완료
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
