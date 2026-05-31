import { useQuery } from '@tanstack/react-query';

import { getQuestionDetail } from '../api';
import { queryKeys } from '@/shared/query/query-keys';

export function useQuestionDetailQuery(questionId: number | undefined) {
  return useQuery({
    queryKey: questionId !== undefined ? queryKeys.qna.detail(questionId) : ([] as const),
    queryFn: () => getQuestionDetail(questionId!),
    enabled: questionId !== undefined && !Number.isNaN(questionId),
  });
}
