import { useQuery } from '@tanstack/react-query';

import { getQuestions } from '../api';
import { queryKeys } from '@/shared/query/query-keys';

export function useQuestionsQuery() {
  return useQuery({
    queryKey: queryKeys.qna.lists(),
    queryFn: getQuestions,
    refetchOnMount: true,
  });
}
