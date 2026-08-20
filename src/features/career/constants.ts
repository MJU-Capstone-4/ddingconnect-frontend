export const MAJOR_OPTIONS = ['응용소프트웨어전공', '데이터사이언스전공', '인공지능전공'] as const;

export type MajorOption = (typeof MAJOR_OPTIONS)[number];
