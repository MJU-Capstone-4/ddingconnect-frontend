import { apiClient, type ApiResponse } from '@/shared/api';

// import { MOCK_CRAWLED_JOBS, MOCK_GRADUATE_JOBS } from './job-post.mock';
import type { GraduateJobPost, JobPost } from '../types';

// const useMockFallback = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_FALLBACK === 'true';

export const getGraduateJobPosts = async (): Promise<GraduateJobPost[]> => {
  const { data } = await apiClient.get<ApiResponse<GraduateJobPost[]>>(
    '/api/v1/job-post/graduates',
  );
  return data.result ?? [];
};

export const getCrawledJobPosts = async (): Promise<JobPost[]> => {
  const { data } = await apiClient.get<ApiResponse<JobPost[]>>('/api/v1/job-post/crawled');
  return data.result ?? [];
};
