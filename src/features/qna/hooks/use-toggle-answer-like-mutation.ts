import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleAnswerLike } from '../api';
import { queryKeys } from '@/shared/query/query-keys';
import type { AnswerResponse } from '@/shared/api/generated/api';

export function useToggleAnswerLikeMutation(questionId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answerId: number) => toggleAnswerLike(questionId, answerId),
    onMutate: async (answerId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.qna.answers(questionId) });

      const prevAnswers = queryClient.getQueryData<AnswerResponse[]>(
        queryKeys.qna.answers(questionId),
      );

      if (prevAnswers) {
        queryClient.setQueryData<AnswerResponse[]>(
          queryKeys.qna.answers(questionId),
          prevAnswers.map((a) =>
            a.id === answerId
              ? {
                  ...a,
                  likedByMe: !a.likedByMe,
                  likeCount: (a.likeCount ?? 0) + (a.likedByMe ? -1 : 1),
                }
              : a,
          ),
        );
      }

      return { prevAnswers };
    },
    onSuccess: (data, answerId) => {
      queryClient.setQueryData<AnswerResponse[]>(queryKeys.qna.answers(questionId), (prev) =>
        prev?.map((a) =>
          a.id === answerId ? { ...a, likedByMe: data.liked, likeCount: data.likeCount } : a,
        ),
      );
    },
    onError: (_, __, context) => {
      if (context?.prevAnswers) {
        queryClient.setQueryData(queryKeys.qna.answers(questionId), context.prevAnswers);
      }
    },
  });
}
