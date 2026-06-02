import { apiClient } from '@/shared/api';

export type MemberRole = 'STUDENT' | 'GRADUATE' | 'UNKNOWN';

export interface HomeActivity {
  coffeeChatCount: number;
  roadmapCount: number;
  questionCount: number;
}

export interface HomeResponse {
  point: number;
  nickname: string;
  department: string;
  company: string;
  role: MemberRole;
  grade: number;
  careerYear: number;
  activity: HomeActivity;
}

interface ApiResponse<T> {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: T;
}

export const getHome = async (): Promise<HomeResponse> => {
  const { data } = await apiClient.get<ApiResponse<HomeResponse>>('/api/v1/members/me/home');
  if (data.isSuccess === false)
    throw new Error(data.message ?? data.code ?? '홈 화면 정보를 불러오지 못했습니다.');
  if (!data.result) throw new Error('홈 화면 데이터를 불러오지 못했습니다.');
  return data.result;
};
