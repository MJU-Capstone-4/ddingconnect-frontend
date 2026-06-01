import { useMutation } from '@tanstack/react-query';

import { getRoadmapDownloadUrl } from '../api';

export function useRoadmapDownloadMutation() {
  return useMutation({
    mutationFn: (roadmapId: number) => getRoadmapDownloadUrl(roadmapId),
    onSuccess: ({ fileUrl }) => {
      window.location.href = fileUrl;
    },
  });
}
