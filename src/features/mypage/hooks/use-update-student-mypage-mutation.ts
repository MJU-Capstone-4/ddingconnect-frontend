import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateStudentMyPageRequest } from '../api/mypage.api';
import { updateStudentMyPage } from '../api/mypage.api';

export function useUpdateStudentMyPageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateStudentMyPageRequest) => updateStudentMyPage(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
  });
}
