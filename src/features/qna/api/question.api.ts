import { apiClient } from '@/shared/api';
import type {
  ApiResponseListQuestionResponse,
  ApiResponseQuestionResponse,
  ApiResponseLikeToggleResponse,
  ApiResponseString,
  QuestionResponse,
  LikeToggleResponse,
  CreateQuestionRequest,
  UpdateQuestionRequest,
} from '@/shared/api/generated/api';

export const getMyQuestions = async (): Promise<QuestionResponse[]> => {
  const { data } = await apiClient.get<ApiResponseListQuestionResponse>('/api/v1/questions/me');
  return data.result ?? [];
};

export const getQuestions = async (): Promise<QuestionResponse[]> => {
  const { data } = await apiClient.get<ApiResponseListQuestionResponse>('/api/v1/questions');
  return data.result ?? [];
};

export const getQuestionDetail = async (questionId: number): Promise<QuestionResponse> => {
  const { data } = await apiClient.get<ApiResponseQuestionResponse>(
    `/api/v1/questions/${questionId}`,
  );
  if (!data.result) throw new Error(data.message ?? '질문을 찾을 수 없습니다.');
  return data.result;
};

export const createQuestion = async (body: CreateQuestionRequest): Promise<QuestionResponse> => {
  const { data } = await apiClient.post<ApiResponseQuestionResponse>('/api/v1/questions', body);
  if (!data.result) throw new Error(data.message ?? '질문 등록에 실패했습니다.');
  return data.result;
};

export const toggleQuestionLike = async (questionId: number): Promise<LikeToggleResponse> => {
  const { data } = await apiClient.post<ApiResponseLikeToggleResponse>(
    `/api/v1/questions/${questionId}/like`,
  );
  if (!data.result) throw new Error(data.message ?? '좋아요 처리에 실패했습니다.');
  return data.result;
};

export const deleteQuestion = async (questionId: number): Promise<void> => {
  const { data } = await apiClient.delete<ApiResponseString>(`/api/v1/questions/${questionId}`);
  if (!data.isSuccess) throw new Error(data.message ?? '질문 삭제에 실패했습니다.');
};

export const updateQuestion = async (
  questionId: number,
  body: UpdateQuestionRequest,
): Promise<QuestionResponse> => {
  const { data } = await apiClient.patch<ApiResponseQuestionResponse>(
    `/api/v1/questions/${questionId}`,
    body,
  );
  if (!data.result) throw new Error(data.message ?? '질문 수정에 실패했습니다.');
  return data.result;
};
