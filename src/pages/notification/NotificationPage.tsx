import { useState } from 'react';
import { useNavigate } from 'react-router';

import { NotificationItem } from '@/features/notification/components';
import type { NotificationType } from '@/features/notification/components';
import CheckIcon from '@/shared/assets/icons/check.svg?react';
import CloseIcon from '@/shared/assets/icons/close.svg?react';
import CoffeeIcon from '@/shared/assets/icons/coffee.svg?react';
import { SubHeader } from '@/shared/layout/header';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';

import * as styles from './notification-page.styles';

type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  createdAt: string;
  isUnread?: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'coffeechat',
    title: '새로운 커피챗 요청이 들어왔어요!',
    description: '응용소프트웨어학과 김후배님이 커피챗을 요청했어요!',
    createdAt: '2시간 전',
    isUnread: true,
  },
  {
    id: 2,
    type: 'job',
    title: '새로운 구직 정보가 업데이트되었습니다',
    description: '관심 직무에 5개의 새로운 공고가 등록되었습니다',
    createdAt: '5시간 전',
  },
  {
    id: 3,
    type: 'qna',
    title: 'QnA에 새로운 답변이 달렸습니다',
    description: '"백엔드 개발자 포트폴리오 질문" 글에 답변이 달렸습니다',
    createdAt: '1일 전',
  },
  {
    id: 4,
    type: 'roadmap',
    title: '로드맵 생성이 완료되었습니다',
    description: '백엔드 개발자 맞춤 로드맵을 확인하세요',
    createdAt: '2일 전',
  },
  {
    id: 5,
    type: 'coffeechat',
    title: '커피챗 신청이 접수되었습니다',
    description: '카카오 프론트엔드 개발자에게 매칭 신청을 보냈습니다',
    createdAt: '3일 전',
  },
];

export function NotificationPage() {
  const navigate = useNavigate();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  return (
    <div className={styles.page}>
      <SubHeader
        title="알림"
        onBackClick={() => navigate(-1)}
        className={styles.subHeaderBreakout}
      />

      <div className="flex flex-col gap-2 py-2">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            title={notification.title}
            description={notification.description}
            createdAt={notification.createdAt}
            isUnread={notification.isUnread}
            onClick={
              notification.type === 'coffeechat' && notification.isUnread
                ? () => setSelectedNotification(notification)
                : undefined
            }
          />
        ))}
      </div>

      <Modal
        open={selectedNotification !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedNotification(null);
        }}
      >
        <Modal.Content size="sm">
          <Modal.Header tone="blue" layout="row">
            <Modal.Icon className={styles.modalIcon}>
              <CoffeeIcon className="w-5 h-5 text-primary" aria-hidden="true" />
            </Modal.Icon>
            <div className={styles.modalHeaderText}>
              <Modal.Title className={styles.modalTitle}>{selectedNotification?.title}</Modal.Title>
              <Modal.Description>{selectedNotification?.createdAt}</Modal.Description>
            </div>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <p className={styles.modalBodyText}>{selectedNotification?.description}</p>
          </Modal.Body>
          <Modal.Footer layout="row">
            <Button
              size="dialogAction"
              tone="blue"
              leftIcon={<CheckIcon className="w-3.5 h-3.5" />}
              className="flex-1 w-auto!"
              onClick={() => {
                // TODO: 커피챗 수락 API 연동
                setSelectedNotification(null);
              }}
            >
              수락하기
            </Button>
            <Button
              size="dialogAction"
              variant="outline"
              tone="gray"
              leftIcon={<CloseIcon className="w-3.5 h-3.5" />}
              className="flex-1 w-auto!"
              onClick={() => {
                // TODO: 커피챗 거절 API 연동
                setSelectedNotification(null);
              }}
            >
              거절하기
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
