import type { QuestionResponse } from '@/shared/api/generated/api';

export type ApiCategory = NonNullable<QuestionResponse['category']>;
export type UiCategory = '기술 질문' | '진로 고민' | '취업 준비' | '포트폴리오' | '기타';

export const API_TO_UI_CATEGORY: Record<ApiCategory, UiCategory> = {
  TECHNICAL: '기술 질문',
  CAREER: '진로 고민',
  STUDY: '취업 준비',
  PROJECT: '포트폴리오',
  ETC: '기타',
};

export const UI_TO_API_CATEGORY: Record<UiCategory, ApiCategory> = {
  '기술 질문': 'TECHNICAL',
  '진로 고민': 'CAREER',
  '취업 준비': 'STUDY',
  포트폴리오: 'PROJECT',
  기타: 'ETC',
};
