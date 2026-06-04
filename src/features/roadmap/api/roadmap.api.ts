import { apiClient } from '@/shared/api';
import type {
  RoadmapCreateBody,
  RoadmapListItem,
  RoadmapDetailResponse,
  RoadmapDownloadUrlResult,
  ApiResponseRoadmapListResponse,
  ApiResponseRoadmapDetailResponse,
  ApiResponseRoadmapDownloadUrl,
  ApiResponseString,
} from '@/shared/api/generated/api';

export const getRoadmaps = async (): Promise<RoadmapListItem[]> => {
  const { data } = await apiClient.get<ApiResponseRoadmapListResponse>('/api/v1/roadmaps');
  return data.result ?? [];
};

export const createRoadmap = async (body: RoadmapCreateBody): Promise<RoadmapListItem> => {
  const { data } = await apiClient.post<ApiResponseRoadmapListResponse>('/api/v1/roadmaps', body, {
    timeout: 120_000,
  });
  const list = data.result ?? [];
  if (list.length === 0) throw new Error(data.message ?? '로드맵 생성에 실패했습니다.');
  return list[0];
};

export const getRoadmapDetail = async (roadmapId: number): Promise<RoadmapDetailResponse> => {
  const { data } = await apiClient.get<ApiResponseRoadmapDetailResponse>(
    `/api/v1/roadmaps/${roadmapId}`,
  );
  if (!data.result) throw new Error(data.message ?? '로드맵을 찾을 수 없습니다.');
  return data.result;
};

export const deleteRoadmap = async (roadmapId: number): Promise<void> => {
  const { data } = await apiClient.delete<ApiResponseString>(`/api/v1/roadmaps/${roadmapId}`);
  if (!data.isSuccess) throw new Error(data.message ?? '로드맵 삭제에 실패했습니다.');
};

export const getRoadmapDownloadUrl = async (
  roadmapId: number,
): Promise<RoadmapDownloadUrlResult> => {
  const { data } = await apiClient.get<ApiResponseRoadmapDownloadUrl>(
    `/api/v1/roadmaps/${roadmapId}/download`,
  );
  if (!data.result) throw new Error(data.message ?? '다운로드 URL 발급에 실패했습니다.');
  return data.result;
};
