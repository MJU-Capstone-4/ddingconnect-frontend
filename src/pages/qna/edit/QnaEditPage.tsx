import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

import { useQuestionDetailQuery, useUpdateQuestionMutation } from '@/features/qna/hooks';
import { UI_TO_API_CATEGORY, API_TO_UI_CATEGORY } from '@/features/qna/model/question.constants';
import type { UiCategory } from '@/features/qna/model/question.constants';
import type { QuestionResponse } from '@/shared/api/generated/api';
import AlertCircleIcon from '@/shared/assets/icons/alert-circle.svg?react';
import SendIcon from '@/shared/assets/icons/send.svg?react';
import { SubHeader } from '@/shared/layout/header';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

import * as styles from '../shared/qna-page.styles';

const CATEGORIES: UiCategory[] = ['취업 준비', '기술 질문', '진로 고민', '포트폴리오', '기타'];

type FormProps = {
  question: QuestionResponse;
  questionId: number;
};

function QnaEditForm({ question, questionId }: FormProps) {
  const navigate = useNavigate();

  // 데이터 로드 후 마운트되므로 useEffect 없이 question 값으로 초기화 가능
  const [category, setCategory] = useState<UiCategory>(
    API_TO_UI_CATEGORY[question.category ?? 'ETC'],
  );
  const [title, setTitle] = useState(question.title ?? '');
  const [content, setContent] = useState(question.content ?? '');
  const [validationError, setValidationError] = useState('');

  const updateMutation = useUpdateQuestionMutation(questionId, {
    onSuccess: (data) => {
      navigate(`/qna/${data.id ?? questionId}`);
    },
  });

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

    updateMutation.mutate({
      category: UI_TO_API_CATEGORY[category],
      title: title.trim(),
      content: content.trim(),
    });
  }

  function getSubmitError(): string {
    if (!updateMutation.isError) return '';
    const err = updateMutation.error;
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message ?? '질문 수정에 실패했습니다.';
    }
    if (err instanceof Error) return err.message;
    return '질문 수정에 실패했습니다.';
  }

  const isPending = updateMutation.isPending;
  const errorMessage = validationError || getSubmitError();

  return (
    <div className={styles.page}>
      <div className={styles.writeHeader}>
        <span className={styles.writeTitle}>질문 수정</span>
        <span className={styles.writeDesc}>내용을 수정해보세요</span>
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
        <label htmlFor="qna-edit-title" className={styles.sectionLabel}>
          제목
        </label>
        <input
          id="qna-edit-title"
          className={styles.inputField}
          placeholder="질문의 제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
        />
      </div>

      <div className={styles.section}>
        <label htmlFor="qna-edit-content" className={styles.sectionLabel}>
          본문 내용
        </label>
        <textarea
          id="qna-edit-content"
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
          onClick={() => navigate(-1)}
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
          {isPending ? '수정 중...' : '수정 완료'}
        </Button>
      </div>
    </div>
  );
}

export function QnaEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const questionId = id ? parseInt(id, 10) : undefined;

  const { data: question, isLoading, isError } = useQuestionDetailQuery(questionId);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full">
        <SubHeader
          title="질문 수정"
          onBackClick={() => navigate(-1)}
          className="-mx-page-x -mt-page-y w-[calc(100%+36px)]"
        />
        <div className="flex flex-1 items-center justify-center py-20">
          <p className="text-sm text-text-secondary">질문을 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (isError || !question || !questionId) {
    return (
      <div className="flex flex-col min-h-full">
        <SubHeader
          title="질문 수정"
          onBackClick={() => navigate(-1)}
          className="-mx-page-x -mt-page-y w-[calc(100%+36px)]"
        />
        <div className="flex flex-1 flex-col items-center justify-center py-20 gap-3">
          <p className="text-sm text-text-secondary">질문을 불러오지 못했습니다.</p>
          <button
            type="button"
            className="text-xs text-primary underline"
            onClick={() => navigate('/qna')}
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return <QnaEditForm question={question} questionId={questionId} />;
}
