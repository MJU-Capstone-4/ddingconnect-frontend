import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/shared/query/query-keys';
import { deleteRoadmap } from '../api';

type Options = {
  onSuccess?: () => void;
};

export function useDeleteRoadmapMutation(options?: Options) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (roadmapId: number) => deleteRoadmap(roadmapId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roadmap.lists() });
      options?.onSuccess?.();
    },
  });
}
