import { useState } from 'react';

import { CareerProfileForm } from '@/features/career';
import type { CareerProfileFormValues } from '@/features/career';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import { HeroSection } from '@/shared/ui/hero-section';

import * as styles from './coffee-chat-matching-page.styles';

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

  function handleChange(field: keyof CareerProfileFormValues, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleMatch() {
    // TODO: 커피챗 매칭 API 연동
    console.log(formData);
  }

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
          submitLabel="커피챗 매칭하기"
          tone="blue"
          onChange={handleChange}
          onSubmit={handleMatch}
        />
      </div>
    </div>
  );
}
