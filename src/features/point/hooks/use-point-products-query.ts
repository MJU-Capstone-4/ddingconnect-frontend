import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/query/query-keys';
import { getPointProducts } from '../api';

export function usePointProductsQuery() {
  return useQuery({
    queryKey: queryKeys.point.products(),
    queryFn: getPointProducts,
    retry: 1,
  });
}
