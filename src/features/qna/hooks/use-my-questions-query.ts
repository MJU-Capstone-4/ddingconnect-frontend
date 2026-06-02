import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/query/query-keys';
import { getMyQuestions } from '../api';

export function useMyQuestionsQuery() {
  return useQuery({
    queryKey: queryKeys.myActivity.questions(),
    queryFn: getMyQuestions,
  });
}
