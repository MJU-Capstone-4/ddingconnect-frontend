import { apiClient } from '@/shared/api';
import type { MatchingRequest, MatchingCandidate, MatchingDetail, MyActivityItem } from '../types';

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: T | null;
};

export const requestMatching = async (body: MatchingRequest): Promise<MatchingCandidate[]> => {
  const { data } = await apiClient.post<ApiResponse<MatchingCandidate[]>>(
    '/api/v1/coffeechat/matching',
    body,
  );
  return data.result ?? [];
};

export const getMatchingDetail = async (memberId: number): Promise<MatchingDetail> => {
  const { data } = await apiClient.get<ApiResponse<MatchingDetail>>(
    `/api/v1/coffeechat/matching/${memberId}`,
  );
  if (!data.result) throw new Error('매칭 상세 정보를 불러오지 못했습니다.');
  return data.result;
};

export const getMyActivity = async (): Promise<MyActivityItem[]> => {
  const { data } = await apiClient.get<ApiResponse<MyActivityItem[]>>(
    '/api/v1/coffeechat/my-activity',
  );
  return data.result ?? [];
};
