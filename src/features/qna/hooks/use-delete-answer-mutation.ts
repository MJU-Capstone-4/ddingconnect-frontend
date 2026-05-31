import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAnswer } from '../api';
import { queryKeys } from '@/shared/query/query-keys';

type Options = {
  onSuccess?: () => void;
};

export function useDeleteAnswerMutation(questionId: number, options?: Options) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answerId: number) => deleteAnswer(questionId, answerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.answers(questionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.detail(questionId) });
      options?.onSuccess?.();
    },
  });
}
