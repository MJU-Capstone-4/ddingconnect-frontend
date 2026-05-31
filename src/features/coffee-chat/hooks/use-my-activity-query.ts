import { useQuery } from '@tanstack/react-query';
import { getMyActivity } from '../api';

export function useMyActivityQuery() {
  return useQuery({
    queryKey: ['coffeechat', 'my-activity'],
    queryFn: getMyActivity,
  });
}
