import axios from 'axios';
import { apiClient } from '@/shared/api';
import type {
  ApiResponseMyPageResponse,
  MyPageResponse,
  UpdateMemberRequest,
  UpdateMyPageRequest,
} from '@/shared/api/generated/api';

export type TechStackName = NonNullable<UpdateMyPageRequest['techStacks']>[number];
export type TargetJobCategory = NonNullable<UpdateMyPageRequest['targetJobs']>[number];

export interface UpdateStudentMyPageRequest {
  profile?: UpdateMemberRequest;
  techStacks?: TechStackName[];
  targetJobs?: TargetJobCategory[];
}

export interface UpdateGraduateMyPageRequest {
  profile?: UpdateMemberRequest;
  techStacks?: TechStackName[];
  jobPostsToAdd?: { detailUrl: string }[];
  jobPostIdsToDelete?: number[];
}

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export interface PresignedUrlResult {
  uploadUrl: string;
  fileUrl: string;
  key: string;
  expiresAt: string;
}

interface ApiResponsePresignedUrl {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: PresignedUrlResult;
}

export const getMyPage = async (): Promise<MyPageResponse> => {
  const { data } = await apiClient.get<ApiResponseMyPageResponse>('/api/v1/members/mypage');
  if (data.isSuccess === false)
    throw new Error(data.message ?? data.code ?? '마이페이지 조회에 실패했습니다');
  if (!data.result) throw new Error('마이페이지 데이터를 불러오지 못했습니다');
  return data.result;
};

export const updateStudentMyPage = async (
  body: UpdateStudentMyPageRequest,
): Promise<MyPageResponse> => {
  const { data } = await apiClient.patch<ApiResponseMyPageResponse>(
    '/api/v1/members/mypage/student',
    body,
  );
  if (data.isSuccess === false)
    throw new Error(data.message ?? data.code ?? '마이페이지 수정에 실패했습니다');
  if (!data.result) throw new Error('마이페이지 수정에 실패했습니다');
  return data.result;
};

export const updateGraduateMyPage = async (
  body: UpdateGraduateMyPageRequest,
): Promise<MyPageResponse> => {
  const { data } = await apiClient.patch<ApiResponseMyPageResponse>(
    '/api/v1/members/mypage/graduate',
    body,
  );
  if (data.isSuccess === false)
    throw new Error(data.message ?? data.code ?? '마이페이지 수정에 실패했습니다');
  if (!data.result) throw new Error('마이페이지 수정에 실패했습니다');
  return data.result;
};

export const getProfileImagePresignedUrl = async (
  body: PresignedUrlRequest,
): Promise<PresignedUrlResult> => {
  const { data } = await apiClient.post<ApiResponsePresignedUrl>(
    '/api/v1/members/me/profile-image/presigned-url',
    body,
  );
  if (data.isSuccess === false)
    throw new Error(data.message ?? data.code ?? '프로필 이미지 업로드 URL을 가져오지 못했습니다');
  if (!data.result) throw new Error('프로필 이미지 업로드 URL을 가져오지 못했습니다');
  return data.result;
};

export const getPortfolioPresignedUrl = async (
  body: PresignedUrlRequest,
): Promise<PresignedUrlResult> => {
  const { data } = await apiClient.post<ApiResponsePresignedUrl>(
    '/api/v1/members/me/portfolio/presigned-url',
    body,
  );
  if (data.isSuccess === false)
    throw new Error(data.message ?? data.code ?? '포트폴리오 업로드 URL을 가져오지 못했습니다');
  if (!data.result) throw new Error('포트폴리오 업로드 URL을 가져오지 못했습니다');
  return data.result;
};

export const getBusinessCardPresignedUrl = async (
  body: PresignedUrlRequest,
): Promise<PresignedUrlResult> => {
  const { data } = await apiClient.post<ApiResponsePresignedUrl>(
    '/api/v1/members/me/business-card/presigned-url',
    body,
  );
  if (data.isSuccess === false)
    throw new Error(data.message ?? data.code ?? '명함 업로드 URL을 가져오지 못했습니다');
  if (!data.result) throw new Error('명함 업로드 URL을 가져오지 못했습니다');
  return data.result;
};

export const uploadFileToPresignedUrl = async (
  uploadUrl: string,
  file: File,
  contentType: string,
): Promise<void> => {
  try {
    await axios.put(uploadUrl, file, {
      headers: { 'Content-Type': contentType },
    });
  } catch (err) {
    const status = axios.isAxiosError(err) ? err.response?.status : undefined;
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(
      `파일 업로드에 실패했습니다${status ? ` (status: ${status})` : ''}: ${message}`,
      { cause: err },
    );
  }
};
