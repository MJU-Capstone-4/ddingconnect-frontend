import { apiClient } from '@/shared/api';
import type {
  ApiResponseListAnswerResponse,
  ApiResponseAnswerResponse,
  ApiResponseString,
  AnswerResponse,
  CreateAnswerRequest,
  UpdateAnswerRequest,
  LikeToggleResponse,
  ApiResponseLikeToggleResponse,
} from '@/shared/api/generated/api';

export const getAnswers = async (questionId: number): Promise<AnswerResponse[]> => {
  const { data } = await apiClient.get<ApiResponseListAnswerResponse>(
    `/api/v1/questions/${questionId}/answers`,
  );
  return data.result ?? [];
};

export const createAnswer = async (
  questionId: number,
  body: CreateAnswerRequest,
): Promise<AnswerResponse> => {
  const { data } = await apiClient.post<ApiResponseAnswerResponse>(
    `/api/v1/questions/${questionId}/answers`,
    body,
  );
  if (!data.result) throw new Error(data.message ?? '답변 등록에 실패했습니다.');
  return data.result;
};

export const updateAnswer = async (
  questionId: number,
  answerId: number,
  body: UpdateAnswerRequest,
): Promise<AnswerResponse> => {
  const { data } = await apiClient.patch<ApiResponseAnswerResponse>(
    `/api/v1/questions/${questionId}/answers/${answerId}`,
    body,
  );
  if (!data.result) throw new Error(data.message ?? '답변 수정에 실패했습니다.');
  return data.result;
};

export const deleteAnswer = async (questionId: number, answerId: number): Promise<void> => {
  const { data } = await apiClient.delete<ApiResponseString>(
    `/api/v1/questions/${questionId}/answers/${answerId}`,
  );
  if (!data.isSuccess) throw new Error(data.message ?? '답변 삭제에 실패했습니다.');
};

export const toggleAnswerLike = async (
  questionId: number,
  answerId: number,
): Promise<LikeToggleResponse> => {
  const { data } = await apiClient.post<ApiResponseLikeToggleResponse>(
    `/api/v1/questions/${questionId}/answers/${answerId}/like`,
  );
  if (!data.result) throw new Error(data.message ?? '좋아요 처리에 실패했습니다.');
  return data.result;
};
