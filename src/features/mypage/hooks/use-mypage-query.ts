import { useQuery } from '@tanstack/react-query';
import { getMyPage } from '../api';

export function useMyPageQuery() {
  return useQuery({
    queryKey: ['mypage'],
    queryFn: getMyPage,
    retry: 1,
  });
}
