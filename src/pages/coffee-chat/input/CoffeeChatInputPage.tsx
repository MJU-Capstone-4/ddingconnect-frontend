import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { useCreateCoffeeChatMutation } from '@/features/coffee-chat/model';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import { Button, HeroSection } from '@/shared/ui';

type LocationState = { receiverId?: number };

export function CoffeeChatInputPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState | null };
  const receiverId = state?.receiverId;

  const [kakaoOpenChatLink, setKakaoOpenChatLink] = useState('');

  const { mutate, isPending } = useCreateCoffeeChatMutation();

  if (!receiverId) return <Navigate to="/coffee-chat/matching" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiverId || !kakaoOpenChatLink.trim()) return;
    mutate(
      { receiverId, kakaoOpenChatLink: kakaoOpenChatLink.trim() },
      { onSuccess: () => navigate(-1) },
    );
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      <HeroSection
        variant="coffeeChat"
        title="커피챗 신청"
        description="카카오 오픈채팅 링크를 입력해주세요"
        icon={<CoffeeIcon className="w-7 h-7 text-white" aria-hidden="true" />}
        className="-mx-page-x w-auto"
      />

      <form className="flex flex-col gap-4 px-1" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="kakao-link" className="text-sm font-medium text-gray-700">
            카카오 오픈채팅 링크
          </label>
          <input
            id="kakao-link"
            type="url"
            value={kakaoOpenChatLink}
            onChange={(e) => setKakaoOpenChatLink(e.target.value)}
            placeholder="https://open.kakao.com/o/..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            required
          />
        </div>

        <Button
          type="submit"
          fullWidth
          size="jobApply"
          tone="blue"
          variant="solid"
          disabled={isPending || !kakaoOpenChatLink.trim()}
        >
          {isPending ? '신청 중...' : '커피챗 신청하기'}
        </Button>
      </form>
    </div>
  );
}
