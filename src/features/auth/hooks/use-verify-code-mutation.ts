import { useMutation } from '@tanstack/react-query';
import type { VerifyCodeRequest } from '@/shared/api/generated/api';
import { verifyCode } from '../api';

export function useVerifyCodeMutation() {
  return useMutation({
    mutationFn: (body: VerifyCodeRequest) => verifyCode(body),
  });
}
