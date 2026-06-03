import { useQuery } from '@tanstack/react-query';
import { getMatchingDetail } from '../api';

export function useMatchingDetailQuery(memberId: number) {
  return useQuery({
    queryKey: ['coffeechat', 'matching', memberId],
    queryFn: () => getMatchingDetail(memberId),
    enabled: !!memberId,
  });
}
