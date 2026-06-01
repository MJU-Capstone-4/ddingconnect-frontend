import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/query/query-keys';
import { getRoadmaps } from '../api';

export function useRoadmapsQuery() {
  return useQuery({
    queryKey: queryKeys.roadmap.lists(),
    queryFn: getRoadmaps,
    refetchOnMount: true,
  });
}
