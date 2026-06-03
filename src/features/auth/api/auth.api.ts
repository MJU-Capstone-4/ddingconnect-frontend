import { apiClient } from '@/shared/api';
import type {
  LoginRequest,
  TokenResponse,
  CodeSendRequest,
  VerifyCodeRequest,
  ApiResponseTokenResponse,
  ApiResponseString,
  ApiResponseMyPageResponse,
} from '@/shared/api/generated/api';
import type { UserRole } from '../model/auth-state';

export const login = async (body: LoginRequest): Promise<TokenResponse> => {
  const { data } = await apiClient.post<ApiResponseTokenResponse>('/api/v1/auth/login', body);
  if (!data.result) throw new Error('Missing auth result from login response');
  return data.result;
};

export const sendCode = async (body: CodeSendRequest): Promise<string> => {
  const { data } = await apiClient.post<ApiResponseString>('/api/v1/auth/send-code', body);
  return data.result ?? '';
};

export const verifyCode = async (body: VerifyCodeRequest): Promise<string> => {
  const { data } = await apiClient.post<ApiResponseString>('/api/v1/auth/verify-code', body);
  return data.result ?? '';
};

export const signup = async (formData: FormData): Promise<string> => {
  const { data } = await apiClient.post<ApiResponseString>('/api/v1/auth/signup', formData);
  return data.result ?? '';
};

export const deleteAccount = async (): Promise<void> => {
  await apiClient.delete('/api/v1/members/me');
};

export const getMyRole = async (): Promise<UserRole | null> => {
  const { data } = await apiClient.get<ApiResponseMyPageResponse>('/api/v1/members/mypage');
  const role = data.result?.profile?.role;
  if (role === 'STUDENT' || role === 'GRADUATE') return role;
  return null;
};
