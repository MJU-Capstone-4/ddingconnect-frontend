import { useMutation } from '@tanstack/react-query';

import type { RoadmapCreateBody, RoadmapListItem } from '@/shared/api/generated/api';
import { createRoadmap } from '../api';

type Options = {
  onSuccess?: (data: RoadmapListItem) => void;
  onError?: (error: Error) => void;
};

export function useCreateRoadmapMutation(options?: Options) {
  return useMutation({
    mutationFn: (body: RoadmapCreateBody) => createRoadmap(body),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
