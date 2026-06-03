import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateCoffeeChatRequest } from '@/shared/api/generated/api';
import { queryKeys } from '@/shared/query/query-keys';
import { createCoffeeChatRequest } from '../api';

export function useCreateCoffeeChatMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateCoffeeChatRequest) => createCoffeeChatRequest(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.coffeeChat.sent() });
      queryClient.invalidateQueries({ queryKey: queryKeys.myActivity.all });
    },
  });
}
