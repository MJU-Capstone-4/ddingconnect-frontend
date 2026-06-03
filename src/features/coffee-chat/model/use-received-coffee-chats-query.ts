import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/query/query-keys';
import { getReceivedCoffeeChats } from '../api';

export function useReceivedCoffeeChatsQuery() {
  return useQuery({
    queryKey: queryKeys.coffeeChat.received(),
    queryFn: getReceivedCoffeeChats,
  });
}
