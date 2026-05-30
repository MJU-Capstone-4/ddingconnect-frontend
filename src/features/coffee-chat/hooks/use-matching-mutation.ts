import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { requestMatching } from '../api';
import type { MatchingRequest } from '../types';

export function useMatchingMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: MatchingRequest) => requestMatching(body),
    onSuccess: (data) => {
      navigate('/coffee-chat/matching-result', { state: { candidates: data } });
    },
  });
}
