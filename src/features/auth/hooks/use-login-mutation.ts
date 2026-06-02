import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import type { LoginRequest } from '@/shared/api/generated/api';
import { login, getMyRole } from '../api';
import { setAccessToken, setUserRole } from '../model/auth-state';

export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: LoginRequest) => login(body),
    onSuccess: async (data) => {
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        try {
          const role = await getMyRole();
          if (role) setUserRole(role);
        } catch (err) {
          console.error('역할 조회 실패:', err);
        } finally {
          navigate('/');
        }
      }
    },
  });
}
