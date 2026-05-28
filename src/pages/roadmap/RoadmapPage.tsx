import { useState } from 'react';
import { useNavigate } from 'react-router';

import { CareerProfileForm } from '@/features/career';
import type { CareerProfileFormValues } from '@/features/career';
import MapIcon from '@/shared/assets/icons/map.svg?react';
import { HeroSection } from '@/shared/ui/hero-section';

import * as styles from './roadmap-page.styles';

const INITIAL_DATA: CareerProfileFormValues = {
  grade: '',
  gpa: '',
  major: '',
  targetJob: '',
  skills: '',
  targetCompany: '',
};

export function RoadmapPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CareerProfileFormValues>(INITIAL_DATA);

  function handleChange(field: keyof CareerProfileFormValues, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleGenerateRoadmap() {
    // TODO: 로드맵 생성 API 연동
    navigate('/roadmap/result');
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
        submitLabel="맞춤 로드맵 생성"
        tone="purple"
        onChange={handleChange}
        onSubmit={handleGenerateRoadmap}
      />
    </div>
  );
}
