import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { signup } from '../api';

export function useSignupMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => signup(formData),
    onSuccess: () => {
      navigate('/auth/login');
    },
  });
}
