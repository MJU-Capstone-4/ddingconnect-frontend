import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteQuestion } from '../api';
import { queryKeys } from '@/shared/query/query-keys';

type Options = {
  onSuccess?: () => void;
};

export function useDeleteQuestionMutation(options?: Options) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (questionId: number) => deleteQuestion(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.myActivity.questions() });
      queryClient.invalidateQueries({ queryKey: queryKeys.home.me() });
      options?.onSuccess?.();
    },
  });
}
