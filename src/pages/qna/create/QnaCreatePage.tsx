import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import { useCreateQuestionMutation } from '@/features/qna/hooks';
import { UI_TO_API_CATEGORY } from '@/features/qna/model/question.constants';
import AlertCircleIcon from '@/shared/assets/icons/alert-circle.svg?react';
import SendIcon from '@/shared/assets/icons/send.svg?react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

import * as styles from './qna-create-page.styles';

const CATEGORIES = ['취업 준비', '기술 질문', '진로 고민', '포트폴리오', '기타'] as const;
type Category = (typeof CATEGORIES)[number];

export function QnaCreatePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>('취업 준비');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationError, setValidationError] = useState('');

  const createMutation = useCreateQuestionMutation();

  function handleSubmit() {
    if (!title.trim()) {
      setValidationError('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      setValidationError('본문 내용을 입력해주세요.');
      return;
    }
    setValidationError('');

    createMutation.mutate(
      { category: UI_TO_API_CATEGORY[category], title: title.trim(), content: content.trim() },
      { onSuccess: (data) => navigate(data.id ? `/qna/${data.id}` : '/qna') },
    );
  }

  function getSubmitError(): string {
    if (!createMutation.isError) return '';
    const err = createMutation.error;
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message ?? '질문 등록에 실패했습니다.';
    }
    if (err instanceof Error) return err.message;
    return '질문 등록에 실패했습니다.';
  }

  const isPending = createMutation.isPending;
  const errorMessage = validationError || getSubmitError();

  return (
    <div className={styles.page}>
      <div className={styles.writeHeader}>
        <span className={styles.writeTitle}>질문 작성</span>
        <span className={styles.writeDesc}>익명으로 질문을 작성해보세요</span>
      </div>

      <div className={styles.noticeBox}>
        <div className={styles.noticeIconWrapper}>
          <AlertCircleIcon className="w-5 h-5 text-pink-500" aria-hidden="true" />
        </div>
        <div>
          <p className={styles.noticeTitle}>익명 질문</p>
          <p className={styles.noticeText}>
            모든 질문은 익명으로 게시되며,
            <br />
            게시된 내용에 따라 졸업생의 답변을 받아볼 수 있습니다.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>카테고리</p>
        <div className={styles.categoryGrid}>
          {CATEGORIES.slice(0, 4).map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={category === cat}
              className={cn(
                styles.categoryBtn,
                category === cat ? styles.categoryBtnActive : styles.categoryBtnInactive,
              )}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={styles.categoryLastRow}>
          <button
            type="button"
            aria-pressed={category === '기타'}
            className={cn(
              styles.categoryBtn,
              styles.categoryBtnLast,
              category === '기타' ? styles.categoryBtnActive : styles.categoryBtnInactive,
            )}
            onClick={() => setCategory('기타')}
          >
            기타
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <label htmlFor="qna-title" className={styles.sectionLabel}>
          제목
        </label>
        <input
          id="qna-title"
          className={styles.inputField}
          placeholder="질문의 제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
        />
      </div>

      <div className={styles.section}>
        <label htmlFor="qna-content" className={styles.sectionLabel}>
          본문 내용
        </label>
        <textarea
          id="qna-content"
          className={styles.textarea}
          placeholder="질문 내용을 상세히 작성해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
        />
      </div>

      {errorMessage && <p className="text-xs text-red-500 -mt-2">{errorMessage}</p>}

      <div className={styles.buttonRow}>
        <Button
          variant="outline"
          tone="gray"
          size="qnaSubmit"
          className="flex-1"
          onClick={() => navigate('/qna')}
          disabled={isPending}
        >
          취소
        </Button>
        <Button
          variant="solid"
          tone="blue"
          size="qnaSubmit"
          className="flex-1"
          leftIcon={<SendIcon className="w-4 h-4" aria-hidden="true" />}
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? '등록 중...' : '질문 등록'}
        </Button>
      </div>
    </div>
  );
}
