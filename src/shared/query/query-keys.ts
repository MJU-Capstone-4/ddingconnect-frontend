export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  member: {
    all: ['member'] as const,
    me: () => [...queryKeys.member.all, 'me'] as const,
    detail: (id: number) => [...queryKeys.member.all, id] as const,
  },

  coffeeChat: {
    all: ['coffeeChat'] as const,
    lists: () => [...queryKeys.coffeeChat.all, 'list'] as const,
    list: (params?: Record<string, unknown>) => [...queryKeys.coffeeChat.lists(), params] as const,
    sent: () => [...queryKeys.coffeeChat.all, 'sent'] as const,
    received: () => [...queryKeys.coffeeChat.all, 'received'] as const,
    detail: (id: number) => [...queryKeys.coffeeChat.all, id] as const,
  },

  myActivity: {
    all: ['myActivity'] as const,
  },

  qna: {
    all: ['qna'] as const,
    lists: () => [...queryKeys.qna.all, 'list'] as const,
    list: (params?: Record<string, unknown>) => [...queryKeys.qna.lists(), params] as const,
    detail: (id: number) => [...queryKeys.qna.all, id, 'detail'] as const,
    answers: (questionId: number) => [...queryKeys.qna.all, questionId, 'answers'] as const,
  },

  jobInfo: {
    all: ['jobInfo'] as const,
    lists: () => [...queryKeys.jobInfo.all, 'list'] as const,
    list: (params?: Record<string, unknown>) => [...queryKeys.jobInfo.lists(), params] as const,
    detail: (id: number) => [...queryKeys.jobInfo.all, id] as const,
  },

  job: {
    all: ['job'] as const,
    graduates: () => [...queryKeys.job.all, 'graduates'] as const,
    crawled: () => [...queryKeys.job.all, 'crawled'] as const,
  },

  roadmap: {
    all: ['roadmap'] as const,
    lists: () => [...queryKeys.roadmap.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.roadmap.all, id] as const,
  },

  notification: {
    all: ['notification'] as const,
    lists: () => [...queryKeys.notification.all, 'list'] as const,
  },

  point: {
    all: ['point'] as const,
    balance: () => [...queryKeys.point.all, 'balance'] as const,
    history: () => [...queryKeys.point.all, 'history'] as const,
  },
};
