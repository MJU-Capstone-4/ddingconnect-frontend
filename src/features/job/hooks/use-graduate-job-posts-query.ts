import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/query/query-keys';

import { getGraduateJobPosts } from '../api';

export function useGraduateJobPostsQuery() {
  return useQuery({
    queryKey: queryKeys.job.graduates(),
    queryFn: getGraduateJobPosts,
  });
}
