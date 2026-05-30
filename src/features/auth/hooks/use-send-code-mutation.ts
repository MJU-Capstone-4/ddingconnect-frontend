import { useMutation } from '@tanstack/react-query';
import type { CodeSendRequest } from '@/shared/api/generated/api';
import { sendCode } from '../api';

export function useSendCodeMutation() {
  return useMutation({
    mutationFn: (body: CodeSendRequest) => sendCode(body),
  });
}
