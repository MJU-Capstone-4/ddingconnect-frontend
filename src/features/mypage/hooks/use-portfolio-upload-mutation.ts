import { useMutation } from '@tanstack/react-query';
import { getPortfolioPresignedUrl, uploadFileToPresignedUrl } from '../api/mypage.api';

export function usePortfolioUploadMutation() {
  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const contentType = file.type;
      if (contentType !== 'application/pdf') {
        throw new Error('PDF 형식의 파일만 업로드 가능합니다');
      }
      const { uploadUrl, fileUrl } = await getPortfolioPresignedUrl({
        fileName: file.name,
        contentType,
      });
      await uploadFileToPresignedUrl(uploadUrl, file, contentType);
      return fileUrl;
    },
  });
}
