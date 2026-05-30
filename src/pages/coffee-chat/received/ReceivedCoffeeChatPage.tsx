import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import UserIcon from '@/shared/assets/icons/user.svg?react';
import {
  useReceivedCoffeeChatsQuery,
  useUpdateCoffeeChatStatusMutation,
} from '@/features/coffee-chat/model';
import { Button, Chip, HeroSection } from '@/shared/ui';

import * as S from './received-coffee-chat-page.styles';

// Demo data — 기말 발표용 시연 데이터 (삭제 금지)
const MOCK_RECEIVED_REQUESTS = [
  {
    name: '김학생',
    department: "컴퓨터공학과 '22",
    kakaoOpenChatLink: 'https://open.kakao.com/o/example1',
  },
  {
    name: '이후배',
    department: "소프트웨어학과 '23",
    kakaoOpenChatLink: 'https://open.kakao.com/o/example2',
  },
  {
    name: '박지원',
    department: "정보통신공학과 '23",
    kakaoOpenChatLink: 'https://open.kakao.com/o/example3',
  },
];

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
  const { data: receivedCoffeeChats } = useReceivedCoffeeChatsQuery();
  const { mutate: updateStatus, isPending } = useUpdateCoffeeChatStatusMutation();

  const displayCount = receivedCoffeeChats?.length ?? MOCK_RECEIVED_REQUESTS.length;

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
          요청 목록 <span className="text-primary">{displayCount}</span>
        </h2>

        {MOCK_RECEIVED_REQUESTS.length === 0 && !receivedCoffeeChats?.length ? (
          <div className={S.emptyState}>
            <UserIcon className="w-10 h-10 text-gray-300" aria-hidden="true" />
            <p className={S.emptyText}>아직 받은 요청이 없어요</p>
          </div>
        ) : (
          <ul className={S.cardList}>
            {MOCK_RECEIVED_REQUESTS.map((mock, i) => {
              const realChat = receivedCoffeeChats?.[i];
              const status = realChat?.status ?? 'PENDING';
              const kakaoLink = realChat?.kakaoOpenChatLink ?? mock.kakaoOpenChatLink;

              return (
                <li key={i}>
                  <div className={S.card}>
                    <div className={S.cardHeader}>
                      <div className={S.profileRow}>
                        <div className={S.profilePlaceholder} aria-hidden="true" />
                        <div className={S.nameGroup}>
                          <p className={S.name}>{mock.name}</p>
                          <p className={S.department}>{mock.department}</p>
                        </div>
                      </div>
                      <Chip
                        tone={STATUS_TONE[status] ?? 'gray'}
                        size="sm"
                        className="pointer-events-none shrink-0"
                      >
                        {STATUS_LABEL[status] ?? status}
                      </Chip>
                    </div>

                    <div className={S.kakaoRow}>
                      <span className={S.kakaoLabel}>카카오 오픈채팅</span>
                      <a
                        href={kakaoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={S.kakaoLink}
                      >
                        {kakaoLink}
                      </a>
                    </div>

                    {status === 'PENDING' && realChat?.id !== undefined && (
                      <div className={S.buttonRow}>
                        <Button
                          size="dialogAction"
                          tone="gray"
                          variant="outline"
                          fullWidth
                          disabled={isPending}
                          onClick={() =>
                            updateStatus({
                              coffeeChatId: realChat.id!,
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
                          disabled={isPending}
                          onClick={() =>
                            updateStatus({
                              coffeeChatId: realChat.id!,
                              body: { status: 'ACCEPTED' },
                            })
                          }
                        >
                          수락하기
                        </Button>
                      </div>
                    )}

                    {status !== 'PENDING' && (
                      <div className={S.buttonRow}>
                        <Button
                          size="dialogAction"
                          tone="gray"
                          variant="outline"
                          fullWidth
                          disabled
                        >
                          거절하기
                        </Button>
                        <Button size="dialogAction" tone="blue" variant="solid" fullWidth disabled>
                          수락하기
                        </Button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
