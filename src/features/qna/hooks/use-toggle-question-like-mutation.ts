import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleQuestionLike } from '../api';
import { queryKeys } from '@/shared/query/query-keys';
import type { QuestionResponse } from '@/shared/api/generated/api';

export function useToggleQuestionLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId: number) => toggleQuestionLike(questionId),
    onMutate: async (questionId: number) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.qna.lists() });
      await queryClient.cancelQueries({ queryKey: queryKeys.qna.detail(questionId) });

      const prevList = queryClient.getQueryData<QuestionResponse[]>(queryKeys.qna.lists());
      const prevDetail = queryClient.getQueryData<QuestionResponse>(
        queryKeys.qna.detail(questionId),
      );

      if (prevList) {
        queryClient.setQueryData<QuestionResponse[]>(
          queryKeys.qna.lists(),
          prevList.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  likedByMe: !q.likedByMe,
                  likeCount: (q.likeCount ?? 0) + (q.likedByMe ? -1 : 1),
                }
              : q,
          ),
        );
      }

      if (prevDetail) {
        queryClient.setQueryData<QuestionResponse>(queryKeys.qna.detail(questionId), {
          ...prevDetail,
          likedByMe: !prevDetail.likedByMe,
          likeCount: (prevDetail.likeCount ?? 0) + (prevDetail.likedByMe ? -1 : 1),
        });
      }

      return { prevList, prevDetail };
    },
    onError: (_, questionId, context) => {
      if (context?.prevList) {
        queryClient.setQueryData(queryKeys.qna.lists(), context.prevList);
      }
      if (context?.prevDetail) {
        queryClient.setQueryData(queryKeys.qna.detail(questionId), context.prevDetail);
      }
    },
    onSettled: (_, __, questionId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.qna.detail(questionId) });
    },
  });
}
