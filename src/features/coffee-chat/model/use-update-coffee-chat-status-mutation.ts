import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateCoffeeChatStatusRequest } from '@/shared/api/generated/api';
import { queryKeys } from '@/shared/query/query-keys';
import { updateCoffeeChatStatus } from '../api';

export function useUpdateCoffeeChatStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      coffeeChatId,
      body,
    }: {
      coffeeChatId: number;
      body: UpdateCoffeeChatStatusRequest;
    }) => updateCoffeeChatStatus(coffeeChatId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.coffeeChat.sent() });
      queryClient.invalidateQueries({ queryKey: queryKeys.coffeeChat.received() });
      queryClient.invalidateQueries({ queryKey: queryKeys.myActivity.all });
    },
  });
}
