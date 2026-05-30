import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateMyPageRequest } from '@/shared/api/generated/api';
import { updateMyPage } from '../api';

export function useUpdateMyPageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateMyPageRequest) => updateMyPage(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
  });
}
