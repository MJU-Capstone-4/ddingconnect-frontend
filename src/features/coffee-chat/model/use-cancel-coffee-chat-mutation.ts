import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/shared/query/query-keys';
import { cancelCoffeeChatRequest } from '../api';

export function useCancelCoffeeChatMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (coffeeChatId: number) => cancelCoffeeChatRequest(coffeeChatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.coffeeChat.sent() });
      queryClient.invalidateQueries({ queryKey: queryKeys.myActivity.all });
    },
  });
}
