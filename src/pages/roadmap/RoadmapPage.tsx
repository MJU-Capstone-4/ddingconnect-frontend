import { useState } from 'react';
import { useNavigate } from 'react-router';

import { CareerProfileForm } from '@/features/career';
import type { CareerProfileFormValues } from '@/features/career';
import { labelsToTargetJobs, labelsToTechStacks } from '@/features/mypage';
import { useCreateRoadmapMutation } from '@/features/roadmap/hooks';
import MapIcon from '@/shared/assets/icons/map.svg?react';
import { HeroSection } from '@/shared/ui/hero-section';
import { getApiError } from '@/shared/utils/get-api-error';

import * as styles from './roadmap-page.styles';

const INITIAL_DATA: CareerProfileFormValues = {
  grade: '',
  gpa: '',
  major: '',
  targetJob: '',
  skills: [],
  targetCompany: '',
};

function toCreateBody(form: CareerProfileFormValues) {
  return {
    grade: parseInt(form.grade, 10) || 1,
    gpa: parseFloat(form.gpa) || 0,
    major: form.major,
    targetJob: labelsToTargetJobs([form.targetJob])[0] ?? '',
    currentSkills: labelsToTechStacks(form.skills),
    targetCompany: form.targetCompany,
  };
}

export function RoadmapPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CareerProfileFormValues>(INITIAL_DATA);

  const {
    mutate: createRoadmap,
    isPending,
    error,
  } = useCreateRoadmapMutation({
    onSuccess: () => {
      navigate('/roadmap/result');
    },
  });

  const errorMessage = error
    ? getApiError(error, '로드맵 생성에 실패했습니다. 다시 시도해 주세요.')
    : '';

  function handleChange<K extends keyof CareerProfileFormValues>(
    field: K,
    value: CareerProfileFormValues[K],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleGenerateRoadmap() {
    createRoadmap(toCreateBody(formData));
  }

  return (
    <div className={styles.page}>
      <HeroSection
        variant="roadmap"
        title="취업 로드맵"
        description="AI 기반 맞춤형 취업 준비 계획을 세워보세요"
        icon={<MapIcon className="w-7 h-7 text-white" aria-hidden="true" />}
        className={styles.heroBreakout}
      />

      <CareerProfileForm
        values={formData}
        submitLabel={isPending ? 'AI 로드맵 생성 중...' : '맞춤 로드맵 생성'}
        tone="purple"
        onChange={handleChange}
        onSubmit={handleGenerateRoadmap}
      />

      {errorMessage && (
        <p role="alert" className="text-sm text-red-500 text-center mt-2">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
