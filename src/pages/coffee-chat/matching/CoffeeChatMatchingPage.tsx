import { useState } from 'react';

import { CareerProfileForm } from '@/features/career';
import type { CareerProfileFormValues } from '@/features/career';
import { useMatchingMutation } from '@/features/coffee-chat/hooks';
import { labelsToTargetJobs, labelsToTechStacks } from '@/features/mypage';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import { HeroSection } from '@/shared/ui/hero-section';
import { getApiError } from '@/shared/utils/get-api-error';

import * as styles from './coffee-chat-matching-page.styles';

const INITIAL_DATA: CareerProfileFormValues = {
  grade: '',
  gpa: '',
  major: '',
  targetJob: '',
  skills: [],
  targetCompany: '',
};

export function CoffeeChatMatchingPage() {
  const [formData, setFormData] = useState<CareerProfileFormValues>(INITIAL_DATA);
  const matchingMutation = useMatchingMutation();

  function handleChange<K extends keyof CareerProfileFormValues>(
    field: K,
    value: CareerProfileFormValues[K],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleMatch() {
    matchingMutation.mutate({
      grade: Number(formData.grade),
      gpa: formData.gpa,
      major: formData.major,
      interestedJob: labelsToTargetJobs([formData.targetJob])[0] ?? '',
      capability: labelsToTechStacks(formData.skills).join(','),
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
