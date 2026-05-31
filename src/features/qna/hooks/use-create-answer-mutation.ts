import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAnswer } from '../api';
import { queryKeys } from '@/shared/query/query-keys';
import type { CreateAnswerRequest } from '@/shared/api/generated/api';

export function useCreateAnswerMutation(questionId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateAnswerRequest) => createAnswer(questionId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.answers(questionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.detail(questionId) });
    },
  });
}
