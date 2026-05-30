import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import type { LoginRequest } from '@/shared/api/generated/api';
import { login } from '../api';
import { setAccessToken } from '../model/auth-state';

export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: LoginRequest) => login(body),
    onSuccess: (data) => {
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        navigate('/');
      }
    },
  });
}
