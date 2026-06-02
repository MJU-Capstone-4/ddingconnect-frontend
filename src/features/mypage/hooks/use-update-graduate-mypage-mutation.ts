import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateGraduateMyPageRequest } from '../api/mypage.api';
import { updateGraduateMyPage } from '../api/mypage.api';

export function useUpdateGraduateMyPageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateGraduateMyPageRequest) => updateGraduateMyPage(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
  });
}
