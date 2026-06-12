import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/query/query-keys';
import { getMyCoffeeChats } from '../api';

export function useMyCoffeeChatsQuery() {
  return useQuery({
    queryKey: queryKeys.myActivity.coffeeChats(),
    queryFn: getMyCoffeeChats,
    staleTime: 0,
    refetchOnMount: true,
  });
}
