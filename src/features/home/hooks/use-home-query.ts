import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/query/query-keys';
import { getHome } from '../api';

export function useHomeQuery() {
  return useQuery({
    queryKey: queryKeys.home.me(),
    queryFn: getHome,
    retry: 1,
    staleTime: 0,
    refetchOnMount: true,
  });
}
