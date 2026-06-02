import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import UserIcon from '@/shared/assets/icons/user.svg?react';
import { useSentCoffeeChatsQuery, useCancelCoffeeChatMutation } from '@/features/coffee-chat/model';
import { Button, Chip, HeroSection } from '@/shared/ui';
import { normalizeUrl } from '@/shared/utils/normalize-url';

import * as S from './sent-coffee-chat-page.styles';

const STATUS_LABEL: Record<string, string> = {
  PENDING: '대기 중',
  ACCEPTED: '수락됨',
  REJECTED: '거절됨',
};

const STATUS_TONE: Record<string, 'gray' | 'blue' | 'pink'> = {
  PENDING: 'gray',
  ACCEPTED: 'blue',
  REJECTED: 'pink',
};

export function SentCoffeeChatPage() {
  const { data: sentCoffeeChats, isLoading, isError } = useSentCoffeeChatsQuery();
  const { mutate: cancelChat, isPending } = useCancelCoffeeChatMutation();

  const chats = sentCoffeeChats ?? [];

  return (
    <div className={S.page}>
      <HeroSection
        variant="coffeeChat"
        title="보낸 커피챗 요청"
        description="선배들에게 보낸 커피챗 요청 현황을 확인하세요"
        icon={<CoffeeIcon className="w-7 h-7 text-white" aria-hidden="true" />}
        className={S.heroBreakout}
      />

      <section className={S.section}>
        <h2 className={S.sectionTitle}>
          요청 목록 <span className="text-primary">{chats.length}</span>
        </h2>

        {isLoading ? (
          <p className={S.emptyText}>불러오는 중...</p>
        ) : isError ? (
          <p className={S.emptyText}>요청 목록을 불러오지 못했어요</p>
        ) : chats.length === 0 ? (
          <div className={S.emptyState}>
            <UserIcon className="w-10 h-10 text-gray-300" aria-hidden="true" />
            <p className={S.emptyText}>아직 보낸 요청이 없어요</p>
          </div>
        ) : (
          <ul className={S.cardList}>
            {chats.map((chat, index) => (
              <li key={chat.id}>
                <div className={S.card}>
                  <div className={S.cardHeader}>
                    <p className={S.indexLabel}>커피챗 요청 {index + 1}</p>
                    <Chip
                      tone={STATUS_TONE[chat.status ?? ''] ?? 'gray'}
                      size="sm"
                      className="pointer-events-none shrink-0"
                    >
                      {STATUS_LABEL[chat.status ?? ''] ?? chat.status}
                    </Chip>
                  </div>

                  {chat.kakaoOpenChatLink && (
                    <div className={S.kakaoRow}>
                      <span className={S.kakaoLabel}>카카오 오픈채팅</span>
                      <a
                        href={normalizeUrl(chat.kakaoOpenChatLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={S.kakaoLink}
                      >
                        {chat.kakaoOpenChatLink}
                      </a>
                    </div>
                  )}

                  {chat.status === 'PENDING' && (
                    <Button
                      size="dialogAction"
                      tone="gray"
                      variant="outline"
                      fullWidth
                      disabled={isPending}
                      onClick={() => cancelChat(chat.id!)}
                    >
                      요청 취소
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
