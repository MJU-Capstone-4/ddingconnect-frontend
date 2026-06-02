import { apiClient } from '@/shared/api';
import type {
  CreateCoffeeChatRequest,
  CoffeeChatResponse,
  ApiResponseCoffeeChatResponse,
  ApiResponseListCoffeeChatResponse,
  ApiResponseString,
  UpdateCoffeeChatStatusRequest,
} from '@/shared/api/generated/api';
import type {
  MatchingRequest,
  MatchingCandidate,
  MatchingDetail,
  MyActivityItem,
  ReceivedCoffeeChatItem,
  CoffeeChatActivityItem,
} from '../types';

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: T | null;
};

export const createCoffeeChatRequest = async (
  body: CreateCoffeeChatRequest,
): Promise<CoffeeChatResponse> => {
  const { data } = await apiClient.post<ApiResponseCoffeeChatResponse>('/api/v1/coffeechat', body);
  if (!data.result) throw new Error('Missing result from createCoffeeChatRequest response');
  return data.result;
};

export const getSentCoffeeChats = async (): Promise<CoffeeChatResponse[]> => {
  const { data } =
    await apiClient.get<ApiResponseListCoffeeChatResponse>('/api/v1/coffeechat/sent');
  return data.result ?? [];
};

export const getReceivedCoffeeChats = async (): Promise<ReceivedCoffeeChatItem[]> => {
  const { data } = await apiClient.get<ApiResponse<ReceivedCoffeeChatItem[]>>(
    '/api/v1/coffeechat/received',
  );
  return data.result ?? [];
};

export const updateCoffeeChatStatus = async (
  coffeeChatId: number,
  body: UpdateCoffeeChatStatusRequest,
): Promise<CoffeeChatResponse> => {
  const { data } = await apiClient.patch<ApiResponseCoffeeChatResponse>(
    `/api/v1/coffeechat/${coffeeChatId}/status`,
    body,
  );
  if (!data.result) throw new Error('Missing result from updateCoffeeChatStatus response');
  return data.result;
};

export const cancelCoffeeChatRequest = async (coffeeChatId: number): Promise<string> => {
  const { data } = await apiClient.delete<ApiResponseString>(`/api/v1/coffeechat/${coffeeChatId}`);
  return data.result ?? '';
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

export const getMyCoffeeChats = async (): Promise<CoffeeChatActivityItem[]> => {
  const { data } = await apiClient.get<ApiResponse<CoffeeChatActivityItem[]>>(
    '/api/v1/members/me/activity/coffeechats',
  );
  return data.result ?? [];
};
