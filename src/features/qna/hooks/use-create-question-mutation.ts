import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createQuestion } from '../api';
import { queryKeys } from '@/shared/query/query-keys';
import type { CreateQuestionRequest, QuestionResponse } from '@/shared/api/generated/api';

export function useCreateQuestionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateQuestionRequest) => createQuestion(body),
    onSuccess: (newQuestion) => {
      queryClient.setQueryData<QuestionResponse[]>(queryKeys.qna.lists(), (old) =>
        old ? [newQuestion, ...old] : [newQuestion],
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.myActivity.questions() });
    },
  });
}
