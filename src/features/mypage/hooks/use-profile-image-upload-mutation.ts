import { useMutation } from '@tanstack/react-query';
import { getProfileImagePresignedUrl, uploadFileToPresignedUrl } from '../api/mypage.api';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export function useProfileImageUploadMutation() {
  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const contentType = file.type;
      if (!ALLOWED_TYPES.includes(contentType)) {
        throw new Error('PNG, JPEG, WebP 형식의 이미지만 업로드 가능합니다');
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        throw new Error('파일 크기는 최대 5MB까지 업로드 가능합니다');
      }
      const { uploadUrl, fileUrl } = await getProfileImagePresignedUrl({
        fileName: file.name,
        contentType,
      });
      await uploadFileToPresignedUrl(uploadUrl, file, contentType);
      return fileUrl;
    },
  });
}
