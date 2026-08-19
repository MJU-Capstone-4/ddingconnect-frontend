import { Button, Input, MultiSelect, Select } from '@/shared/ui';
import type { SelectOption } from '@/shared/ui';
import { TARGET_JOB_OPTIONS, TECH_STACK_OPTIONS } from '@/shared/constants/profile-options';
import { cn } from '@/shared/utils/cn';

import { MAJOR_OPTIONS } from '../../constants';
import {
  container,
  formBody,
  sectionTitle,
  submitWrapper,
  twoColRow,
} from './career-profile-form.styles';

const GRADE_OPTIONS: SelectOption[] = [
  { label: '1학년', value: '1' },
  { label: '2학년', value: '2' },
  { label: '3학년', value: '3' },
  { label: '4학년', value: '4' },
];

const MAJOR_SELECT_OPTIONS: SelectOption[] = MAJOR_OPTIONS.map((major) => ({
  label: major,
  value: major,
}));

const TARGET_JOB_SELECT_OPTIONS: SelectOption[] = TARGET_JOB_OPTIONS.map((job) => ({
  label: job,
  value: job,
}));

export type CareerProfileFormValues = {
  grade: string;
  gpa: string;
  major: string;
  targetJob: string;
  skills: string[];
  targetCompany: string;
};

export type CareerProfileFormProps = {
  values: CareerProfileFormValues;
  submitLabel: string;
  tone?: 'blue' | 'purple';
  onChange: <K extends keyof CareerProfileFormValues>(
    field: K,
    value: CareerProfileFormValues[K],
  ) => void;
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
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.();
  }

  const isValid = Boolean(values.major) && Boolean(values.targetJob) && values.skills.length > 0;

  return (
    <div className={cn(container, className)}>
      <p className={sectionTitle}>정보 입력</p>

      <form className={formBody} onSubmit={handleSubmit}>
        <div className={twoColRow}>
          <Select
            label="현재 학년"
            options={GRADE_OPTIONS}
            value={values.grade}
            placeholder="1"
            onChange={(value) => onChange('grade', value)}
          />
          <Input
            label="현재 학점"
            value={values.gpa}
            placeholder="3.5 / 4.5"
            onChange={(e) => onChange('gpa', e.target.value)}
            wrapperClassName="flex-1"
          />
        </div>

        <Select
          label="전공"
          options={MAJOR_SELECT_OPTIONS}
          value={values.major}
          placeholder="전공을 선택해주세요"
          onChange={(value) => onChange('major', value)}
        />

        <Select
          label="관심 직무"
          options={TARGET_JOB_SELECT_OPTIONS}
          value={values.targetJob}
          placeholder="직무를 선택해주세요"
          onChange={(value) => onChange('targetJob', value)}
        />

        <MultiSelect
          label="현재 보유 역량"
          options={TECH_STACK_OPTIONS}
          value={values.skills}
          placeholder="기술 스택을 선택해주세요"
          chipTone="gray"
          onChange={(next) => onChange('skills', next)}
        />

        <Input
          label="목표 기업"
          value={values.targetCompany}
          placeholder="기업명, 기업규모 등"
          onChange={(e) => onChange('targetCompany', e.target.value)}
        />

        <div className={submitWrapper}>
          <Button type="submit" tone={tone} size="auth" fullWidth disabled={!isValid}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
