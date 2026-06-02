import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import UserIcon from '@/shared/assets/icons/user.svg?react';
import {
  useReceivedCoffeeChatsQuery,
  useUpdateCoffeeChatStatusMutation,
} from '@/features/coffee-chat/model';
import { Button, Chip, HeroSection } from '@/shared/ui';
import { normalizeUrl } from '@/shared/utils/normalize-url';

import * as S from './received-coffee-chat-page.styles';

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

export function ReceivedCoffeeChatPage() {
  const { data: receivedCoffeeChats, isLoading, isError } = useReceivedCoffeeChatsQuery();
  const { mutate: updateStatus, isPending } = useUpdateCoffeeChatStatusMutation();

  const chats = receivedCoffeeChats ?? [];

  return (
    <div className={S.page}>
      <HeroSection
        variant="coffeeChat"
        title="받은 커피챗 요청"
        description="후배들의 커피챗 요청을 확인하고 응답해보세요"
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
            <p className={S.emptyText}>아직 받은 요청이 없어요</p>
          </div>
        ) : (
          <ul className={S.cardList}>
            {chats.map((chat) => (
              <li key={chat.coffeeChatId}>
                <div className={S.card}>
                  <div className={S.cardHeader}>
                    <div className={S.profileRow}>
                      {chat.profileImage ? (
                        <img
                          src={chat.profileImage}
                          alt={chat.name}
                          className="w-10 h-10 rounded-xl object-cover shrink-0"
                        />
                      ) : (
                        <div className={S.profilePlaceholder} aria-hidden="true" />
                      )}
                      <div className={S.nameGroup}>
                        <p className={S.name}>{chat.name}</p>
                        <p className={S.department}>
                          {chat.department}
                          {chat.studentNumberPrefix ? ` · ${chat.studentNumberPrefix}학번` : ''}
                        </p>
                      </div>
                    </div>
                    <Chip
                      tone={STATUS_TONE[chat.status] ?? 'gray'}
                      size="sm"
                      className="pointer-events-none shrink-0"
                    >
                      {STATUS_LABEL[chat.status] ?? chat.status}
                    </Chip>
                  </div>

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

                  <div className={S.buttonRow}>
                    <Button
                      size="dialogAction"
                      tone="gray"
                      variant="outline"
                      fullWidth
                      disabled={isPending || chat.status !== 'PENDING'}
                      onClick={() =>
                        updateStatus({
                          coffeeChatId: chat.coffeeChatId,
                          body: { status: 'REJECTED' },
                        })
                      }
                    >
                      거절하기
                    </Button>
                    <Button
                      size="dialogAction"
                      tone="blue"
                      variant="solid"
                      fullWidth
                      disabled={isPending || chat.status !== 'PENDING'}
                      onClick={() =>
                        updateStatus({
                          coffeeChatId: chat.coffeeChatId,
                          body: { status: 'ACCEPTED' },
                        })
                      }
                    >
                      수락하기
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
