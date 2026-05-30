import { apiClient } from '@/shared/api';
import type {
  CreateCoffeeChatRequest,
  CoffeeChatResponse,
  ApiResponseCoffeeChatResponse,
  ApiResponseListCoffeeChatResponse,
  ApiResponseString,
  UpdateCoffeeChatStatusRequest,
} from '@/shared/api/generated/api';

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

export const getReceivedCoffeeChats = async (): Promise<CoffeeChatResponse[]> => {
  const { data } = await apiClient.get<ApiResponseListCoffeeChatResponse>(
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
