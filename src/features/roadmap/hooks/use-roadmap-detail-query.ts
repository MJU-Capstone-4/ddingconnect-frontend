import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/query/query-keys';
import { getRoadmapDetail } from '../api';

export function useRoadmapDetailQuery(roadmapId: number) {
  return useQuery({
    queryKey: queryKeys.roadmap.detail(roadmapId),
    queryFn: () => getRoadmapDetail(roadmapId),
    enabled: roadmapId > 0,
  });
}
