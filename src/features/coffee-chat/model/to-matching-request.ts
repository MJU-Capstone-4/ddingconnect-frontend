import type { CareerProfileFormValues } from '@/features/career';
import { labelsToTargetJobs, labelsToTechStacks } from '@/shared/constants/profile-options';
import type { MatchingRequest } from '../types';

export function toMatchingRequest(form: CareerProfileFormValues): MatchingRequest {
  return {
    grade: Number(form.grade),
    gpa: form.gpa,
    major: form.major,
    interestedJob: labelsToTargetJobs([form.targetJob])[0] ?? '',
    capability: labelsToTechStacks(form.skills).join(','),
    targetCompany: form.targetCompany,
  };
}
