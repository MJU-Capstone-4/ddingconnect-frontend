import { apiClient } from '@/shared/api';
import type {
  ApiResponseMyPageResponse,
  ApiResponseMemberResponse,
  MyPageResponse,
  MemberResponse,
  UpdateMyPageRequest,
  UpdateMemberRequest,
} from '@/shared/api/generated/api';

export const getMyPage = async (): Promise<MyPageResponse> => {
  const { data } = await apiClient.get<ApiResponseMyPageResponse>('/api/v1/members/mypage');
  if (!data.result) throw new Error('마이페이지 데이터를 불러오지 못했습니다');
  return data.result;
};

export const updateMyPage = async (body: UpdateMyPageRequest): Promise<MyPageResponse> => {
  const { data } = await apiClient.patch<ApiResponseMyPageResponse>('/api/v1/members/mypage', body);
  if (!data.result) throw new Error('마이페이지 수정에 실패했습니다');
  return data.result;
};

export const getMe = async (): Promise<MemberResponse> => {
  const { data } = await apiClient.get<ApiResponseMemberResponse>('/api/v1/members/me');
  if (!data.result) throw new Error('프로필 데이터를 불러오지 못했습니다');
  return data.result;
};

export const updateMe = async (body: UpdateMemberRequest): Promise<MemberResponse> => {
  const { data } = await apiClient.patch<ApiResponseMemberResponse>('/api/v1/members/me', body);
  if (!data.result) throw new Error('프로필 수정에 실패했습니다');
  return data.result;
};
