import { useMutation } from '@tanstack/react-query';
import { getPortfolioPresignedUrl, uploadFileToPresignedUrl } from '../api/mypage.api';

const MAX_PORTFOLIO_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export function usePortfolioUploadMutation() {
  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const contentType = file.type;
      if (contentType !== 'application/pdf') {
        throw new Error('PDF 형식의 파일만 업로드 가능합니다');
      }
      if (file.size > MAX_PORTFOLIO_SIZE_BYTES) {
        throw new Error('파일 크기는 최대 10MB입니다');
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
