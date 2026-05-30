import { useState } from 'react';

import { CareerProfileForm } from '@/features/career';
import type { CareerProfileFormValues } from '@/features/career';
import { useMatchingMutation } from '@/features/coffee-chat/hooks';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import { HeroSection } from '@/shared/ui/hero-section';

import * as styles from './coffee-chat-matching-page.styles';

function getApiError(error: unknown, fallback: string): string {
  const axiosError = error as { response?: { data?: { message?: string } } };
  return axiosError?.response?.data?.message ?? fallback;
}

const INITIAL_DATA: CareerProfileFormValues = {
  grade: '',
  gpa: '',
  major: '',
  targetJob: '',
  skills: '',
  targetCompany: '',
};

export function CoffeeChatMatchingPage() {
  const [formData, setFormData] = useState<CareerProfileFormValues>(INITIAL_DATA);
  const matchingMutation = useMatchingMutation();

  function handleChange(field: keyof CareerProfileFormValues, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleMatch() {
    matchingMutation.mutate({
      grade: Number(formData.grade),
      gpa: formData.gpa,
      major: formData.major,
      interestedJob: formData.targetJob,
      capability: formData.skills,
      targetCompany: formData.targetCompany,
    });
  }

  const errorMessage = matchingMutation.error
    ? getApiError(matchingMutation.error, '매칭 요청에 실패했습니다.')
    : '';

  return (
    <div className={styles.page}>
      <HeroSection
        variant="coffeeChat"
        title="커피챗 매칭"
        description="선배들과 1:1로 연결되어 진로 고민을 해결하세요"
        icon={<CoffeeIcon className="w-7 h-7 text-white" aria-hidden="true" />}
        className={styles.heroBreakout}
      />

      <div className={styles.formCard}>
        <CareerProfileForm
          values={formData}
          submitLabel={matchingMutation.isPending ? '매칭 중...' : '커피챗 매칭하기'}
          tone="blue"
          onChange={handleChange}
          onSubmit={handleMatch}
        />
        {errorMessage && <p className="text-sm text-red-500 text-center pb-4">{errorMessage}</p>}
      </div>
    </div>
  );
}
