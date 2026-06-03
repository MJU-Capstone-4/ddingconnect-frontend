import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createQuestion } from '../api';
import { queryKeys } from '@/shared/query/query-keys';
import type { CreateQuestionRequest } from '@/shared/api/generated/api';

export function useCreateQuestionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateQuestionRequest) => createQuestion(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.lists() });
    },
  });
}
