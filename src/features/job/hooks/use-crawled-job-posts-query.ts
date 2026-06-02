import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/query/query-keys';

import { getCrawledJobPosts } from '../api';

export function useCrawledJobPostsQuery() {
  return useQuery({
    queryKey: queryKeys.job.crawled(),
    queryFn: getCrawledJobPosts,
  });
}
