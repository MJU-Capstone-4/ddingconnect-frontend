import { useMutation } from '@tanstack/react-query';
import { getBusinessCardPresignedUrl, uploadFileToPresignedUrl } from '../api/mypage.api';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export function useBusinessCardUploadMutation() {
  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const contentType = file.type;
      if (!ALLOWED_TYPES.includes(contentType)) {
        throw new Error('PNG, JPEG, WebP 형식의 이미지만 업로드 가능합니다');
      }
      const { uploadUrl, fileUrl } = await getBusinessCardPresignedUrl({
        fileName: file.name,
        contentType,
      });
      await uploadFileToPresignedUrl(uploadUrl, file, contentType);
      return fileUrl;
    },
  });
}
