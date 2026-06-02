import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/query/query-keys';
import { getPoint } from '../api';

export function usePointQuery() {
  return useQuery({
    queryKey: queryKeys.point.me(),
    queryFn: getPoint,
    retry: 1,
  });
}
