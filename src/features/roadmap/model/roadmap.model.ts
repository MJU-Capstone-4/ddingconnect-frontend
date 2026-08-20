import type { CareerProfileFormValues } from '@/features/career';
import type { RoadmapCreateBody } from '@/shared/api/generated/api';
import { labelsToTargetJobs, labelsToTechStacks } from '@/shared/constants/profile-options';

export function toRoadmapCreateBody(form: CareerProfileFormValues): RoadmapCreateBody {
  return {
    grade: parseInt(form.grade, 10) || 1,
    gpa: parseFloat(form.gpa) || 0,
    major: form.major,
    targetJob: labelsToTargetJobs([form.targetJob])[0] ?? '',
    currentSkills: labelsToTechStacks(form.skills),
    targetCompany: form.targetCompany,
  };
}
