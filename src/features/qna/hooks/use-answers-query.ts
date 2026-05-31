import { useQuery } from '@tanstack/react-query';

import { getAnswers } from '../api';
import { queryKeys } from '@/shared/query/query-keys';

export function useAnswersQuery(questionId: number | undefined) {
  return useQuery({
    queryKey: questionId !== undefined ? queryKeys.qna.answers(questionId) : ([] as const),
    queryFn: () => getAnswers(questionId!),
    enabled: questionId !== undefined && !Number.isNaN(questionId),
  });
}
