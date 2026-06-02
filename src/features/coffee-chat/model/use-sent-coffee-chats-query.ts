import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/query/query-keys';
import { getSentCoffeeChats } from '../api';

export function useSentCoffeeChatsQuery() {
  return useQuery({
    queryKey: queryKeys.coffeeChat.sent(),
    queryFn: getSentCoffeeChats,
  });
}
