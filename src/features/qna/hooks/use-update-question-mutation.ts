import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateQuestion } from '../api';
import { queryKeys } from '@/shared/query/query-keys';
import type { QuestionResponse, UpdateQuestionRequest } from '@/shared/api/generated/api';

type Options = {
  onSuccess?: (data: QuestionResponse) => void;
};

export function useUpdateQuestionMutation(questionId: number, options?: Options) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateQuestionRequest) => updateQuestion(questionId, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.detail(questionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.lists() });
      options?.onSuccess?.(data);
    },
  });
}
