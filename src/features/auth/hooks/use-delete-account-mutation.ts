import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { deleteAccount } from '../api';
import { clearAccessToken, clearUserRole } from '../model/auth-state';

export function useDeleteAccountMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      clearAccessToken();
      clearUserRole();
      navigate('/auth/login', { replace: true });
    },
  });
}
