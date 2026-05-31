import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createQuestion } from '../api';
import { queryKeys } from '@/shared/query/query-keys';
import type { QuestionResponse, CreateQuestionRequest } from '@/shared/api/generated/api';

type Options = {
  onSuccess?: (data: QuestionResponse) => void;
};

export function useCreateQuestionMutation(options?: Options) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateQuestionRequest) => createQuestion(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.lists() });
      options?.onSuccess?.(data);
    },
  });
}
