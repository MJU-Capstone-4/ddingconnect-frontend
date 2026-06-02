import { apiClient } from '@/shared/api';

import { MOCK_CRAWLED_JOBS, MOCK_GRADUATE_JOBS } from './job-post.mock';
import type { GraduateJobPost, JobPost } from '../types';

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

const useMockFallback = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_FALLBACK === 'true';

export const getGraduateJobPosts = async (): Promise<GraduateJobPost[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<GraduateJobPost[]>>(
      '/api/v1/job-post/graduates',
    );
    return data.result ?? [];
  } catch (error) {
    if (useMockFallback) return MOCK_GRADUATE_JOBS;
    throw error;
  }
};

export const getCrawledJobPosts = async (): Promise<JobPost[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<JobPost[]>>('/api/v1/job-post/crawled');
    return data.result ?? [];
  } catch (error) {
    if (useMockFallback) return MOCK_CRAWLED_JOBS;
    throw error;
  }
};
