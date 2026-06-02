import { apiClient, type ApiResponse } from '@/shared/api';

export interface PointBalanceResponse {
  point: number;
}

export interface PointProduct {
  id: number;
  points: number;
  price: number;
  recommended: boolean;
}

export interface PointProductsResponse {
  point: number;
  products: PointProduct[];
}

export const getPoint = async (): Promise<PointBalanceResponse> => {
  const { data } = await apiClient.get<ApiResponse<PointBalanceResponse>>(
    '/api/v1/members/me/point',
  );
  if (data.isSuccess === false)
    throw new Error(data.message ?? data.code ?? '포인트 정보를 불러오지 못했습니다.');
  if (!data.result) throw new Error('포인트 데이터를 불러오지 못했습니다.');
  return data.result;
};

export const getPointProducts = async (): Promise<PointProductsResponse> => {
  const { data } = await apiClient.get<ApiResponse<PointProductsResponse>>(
    '/api/v1/members/me/point/products',
  );
  if (data.isSuccess === false)
    throw new Error(data.message ?? data.code ?? '충전 상품 정보를 불러오지 못했습니다.');
  if (!data.result) throw new Error('충전 상품 데이터를 불러오지 못했습니다.');
  return data.result;
};
