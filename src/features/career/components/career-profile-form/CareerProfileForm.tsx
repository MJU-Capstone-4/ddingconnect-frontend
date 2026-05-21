import { Button, FormField, Input, Select } from '@/shared/ui';
import type { SelectOption } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';

import {
  container,
  formBody,
  sectionTitle,
  selectFullWidth,
  submitWrapper,
  twoColRow,
} from './career-profile-form.styles';

const GRADE_OPTIONS: SelectOption[] = [
  { label: '1학년', value: '1' },
  { label: '2학년', value: '2' },
  { label: '3학년', value: '3' },
  { label: '4학년', value: '4' },
];

export type CareerProfileFormValues = {
  grade: string;
  gpa: string;
  major: string;
  targetJob: string;
  skills: string;
  targetCompany: string;
};

export type CareerProfileFormProps = {
  values: CareerProfileFormValues;
  submitLabel: string;
  tone?: 'blue' | 'purple';
  onChange: (field: keyof CareerProfileFormValues, value: string) => void;
  onSubmit?: () => void;
  className?: string;
};

export function CareerProfileForm({
  values,
  submitLabel,
  tone = 'blue',
  onChange,
  onSubmit,
  className,
}: CareerProfileFormProps) {
  return (
    <div className={cn(container, className)}>
      <p className={sectionTitle}>정보 입력</p>

      <div className={formBody}>
        <div className={twoColRow}>
          <Select
            label="현재 학년"
            options={GRADE_OPTIONS}
            value={values.grade}
            placeholder="1"
            onChange={(value) => onChange('grade', value)}
            className={selectFullWidth}
          />
          <Input
            label="현재 학점"
            value={values.gpa}
            placeholder="3.5 / 4.5"
            onChange={(e) => onChange('gpa', e.target.value)}
          />
        </div>

        <Input
          label="전공"
          value={values.major}
          placeholder="컴퓨터공학과"
          onChange={(e) => onChange('major', e.target.value)}
        />

        <Input
          label="관심 직무"
          value={values.targetJob}
          placeholder="백엔드 개발자, 데이터 엔지니어 등"
          onChange={(e) => onChange('targetJob', e.target.value)}
        />

        <FormField
          label="현재 보유 역량"
          multiline
          value={values.skills}
          placeholder="프로그래밍 언어, 프로젝트 경험 등"
          onChange={(e) => onChange('skills', e.target.value)}
        />

        <Input
          label="목표 기업"
          value={values.targetCompany}
          placeholder="기업명, 기업규모 등"
          onChange={(e) => onChange('targetCompany', e.target.value)}
        />

        <div className={submitWrapper}>
          <Button type="button" tone={tone} size="auth" fullWidth onClick={onSubmit}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
