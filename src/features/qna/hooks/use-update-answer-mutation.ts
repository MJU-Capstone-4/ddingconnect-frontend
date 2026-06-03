import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAnswer } from '../api';
import { queryKeys } from '@/shared/query/query-keys';
import type { UpdateAnswerRequest } from '@/shared/api/generated/api';

export function useUpdateAnswerMutation(questionId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ answerId, body }: { answerId: number; body: UpdateAnswerRequest }) =>
      updateAnswer(questionId, answerId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.answers(questionId) });
    },
  });
}
