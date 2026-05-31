import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

import {
  useQuestionDetailQuery,
  useToggleQuestionLikeMutation,
  useDeleteQuestionMutation,
  useAnswersQuery,
  useCreateAnswerMutation,
  useUpdateAnswerMutation,
  useDeleteAnswerMutation,
  useToggleAnswerLikeMutation,
} from '@/features/qna/hooks';
import { API_TO_UI_CATEGORY } from '@/features/qna/model/question.constants';
import { getUserRole } from '@/features/auth/model/auth-state';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg?react';
import CommentIcon from '@/shared/assets/icons/comment.svg?react';
import EditIcon from '@/shared/assets/icons/edit.svg?react';
import EyeIcon from '@/shared/assets/icons/eye.svg?react';
import LikeIcon from '@/shared/assets/icons/like.svg?react';
import PlusIcon from '@/shared/assets/icons/plus.svg?react';
import { Button, Chip, HeroSection, Modal } from '@/shared/ui';

import * as styles from './qna-detail-page.styles';

// 기말 발표 시연용 mock 답변 — 답변 API 응답이 비어있을 때 fallback
const MOCK_ANSWERS = [
  {
    id: 1,
    author: '이선배',
    profileDescription: '네이버 · 백엔드 개발자',
    createdAt: '1시간 전',
    content:
      '백엔드 개발자 포트폴리오에는 다음이 필수적입니다:\n1. RESTful API 프로젝트 - CRUD 기능이 포함된 백엔드 API\n2. 데이터베이스 설계 - MySQL/PostgreSQL 등 RDB 활용\n3. 배포 경험 - AWS/GCP 등 클라우드 배포\n\n실제 사용자가 있는 서비스를 만들어보면 더 좋습니다. GitHub에 코드를 잘 정리해서 올려두세요!',
    likeCount: 24,
  },
  {
    id: 2,
    author: '이선배',
    profileDescription: '네이버 · 백엔드 개발자',
    createdAt: '1시간 전',
    content:
      '백엔드 개발자 포트폴리오에는 다음이 필수적입니다:\n1. RESTful API 프로젝트 - CRUD 기능이 포함된 백엔드 API - 적절한 에러 핸들링\n2. 데이터베이스 설계 - MySQL/PostgreSQL 등 RDB 활용 - 정규화된 테이블 설계\n3. 배포 경험 - AWS/GCP 등 클라우드 배포 - Docker 컨테이너화\n\n실제 사용자가 있는 서비스를 만들어보면 더 좋습니다. GitHub에 코드를 잘 정리해서 올려두세요!',
    likeCount: 24,
  },
];

function getApiError(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export function QnaDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const questionId = id ? parseInt(id, 10) : undefined;

  const isGraduate = getUserRole() === 'GRADUATE';

  const [isDeleteQuestionModalOpen, setIsDeleteQuestionModalOpen] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [answerDraft, setAnswerDraft] = useState('');
  const [editingAnswerId, setEditingAnswerId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState('');
  const [deletingAnswerId, setDeletingAnswerId] = useState<number | null>(null);

  const createFormRef = useRef<HTMLDivElement>(null);

  const { data: question, isLoading, isError, error } = useQuestionDetailQuery(questionId);
  const { data: apiAnswers } = useAnswersQuery(questionId);

  const toggleQuestionLikeMutation = useToggleQuestionLikeMutation();
  const deleteQuestionMutation = useDeleteQuestionMutation({
    onSuccess: () => navigate('/qna'),
  });

  const createAnswerMutation = useCreateAnswerMutation(questionId!);
  const updateAnswerMutation = useUpdateAnswerMutation(questionId!);
  const deleteAnswerMutation = useDeleteAnswerMutation(questionId!, {
    onSuccess: () => setDeletingAnswerId(null),
  });
  const toggleAnswerLikeMutation = useToggleAnswerLikeMutation(questionId!);

  const hasApiAnswers = apiAnswers && apiAnswers.length > 0;
  const useMockFallback = !hasApiAnswers;

  const handleQuestionLike = () => {
    if (!questionId) return;
    toggleQuestionLikeMutation.mutate(questionId);
  };

  const handleDeleteQuestion = () => {
    if (!questionId) return;
    deleteQuestionMutation.mutate(questionId);
  };

  const handleOpenCreateForm = () => {
    setIsCreateFormOpen(true);
    setTimeout(() => {
      createFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const handleCreateAnswer = () => {
    if (!answerDraft.trim()) return;
    createAnswerMutation.mutate(
      { content: answerDraft.trim() },
      {
        onSuccess: () => {
          setAnswerDraft('');
          setIsCreateFormOpen(false);
        },
      },
    );
  };

  const handleStartEdit = (answerId: number, content: string) => {
    setEditingAnswerId(answerId);
    setEditDraft(content);
  };

  const handleUpdateAnswer = (answerId: number) => {
    if (!editDraft.trim()) return;
    updateAnswerMutation.mutate(
      { answerId, body: { content: editDraft.trim() } },
      { onSuccess: () => setEditingAnswerId(null) },
    );
  };

  const handleDeleteAnswer = () => {
    if (deletingAnswerId == null) return;
    deleteAnswerMutation.mutate(deletingAnswerId);
  };

  const handleAnswerLike = (answerId: number) => {
    if (!questionId) return;
    toggleAnswerLikeMutation.mutate(answerId);
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <HeroSection
          variant="qna"
          title="Q&A 게시판"
          description="익명으로 질문하고 졸업생의 답변을 받아보세요"
          icon={<CommentIcon className="w-7 h-7 text-white" aria-hidden="true" />}
          className={styles.heroBreakout}
        />
        <div className="flex flex-1 items-center justify-center py-20">
          <p className="text-sm text-text-secondary">질문을 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (isError || !question) {
    return (
      <div className={styles.page}>
        <HeroSection
          variant="qna"
          title="Q&A 게시판"
          description="익명으로 질문하고 졸업생의 답변을 받아보세요"
          icon={<CommentIcon className="w-7 h-7 text-white" aria-hidden="true" />}
          className={styles.heroBreakout}
        />
        <div className="flex flex-1 flex-col items-center justify-center py-20 gap-3">
          <p className="text-sm text-text-secondary">
            {isError
              ? getApiError(error, '질문을 불러오지 못했습니다.')
              : '질문을 찾을 수 없습니다.'}
          </p>
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

  const isQuestionLiked = question.likedByMe ?? false;
  const questionLikeCount = question.likeCount ?? 0;
  const answerCount = hasApiAnswers ? apiAnswers.length : (question.answerCount ?? 0);
  const category = API_TO_UI_CATEGORY[question.category ?? 'ETC'];
  const deleteQuestionError = deleteQuestionMutation.isError
    ? getApiError(deleteQuestionMutation.error, '삭제에 실패했습니다.')
    : '';

  return (
    <div className={styles.page}>
      <HeroSection
        variant="qna"
        title="Q&A 게시판"
        description="익명으로 질문하고 졸업생의 답변을 받아보세요"
        icon={<CommentIcon className="w-7 h-7 text-white" aria-hidden="true" />}
        className={styles.heroBreakout}
      />

      <div className={styles.sectionHeader}>
        <button
          type="button"
          className={styles.sectionBackButton}
          onClick={() => navigate(-1)}
          aria-label="이전 페이지로 이동"
        >
          <ArrowLeftIcon className="w-5 h-5" aria-hidden="true" />
        </button>
        <span className={styles.sectionLabel}>질문</span>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className={styles.questionActionTextButton}
            onClick={() => navigate(`/qna/${questionId}/edit`)}
            aria-label="질문 수정"
          >
            <EditIcon className="w-4 h-4" aria-hidden="true" />
            <span>수정</span>
          </button>
          <button
            type="button"
            className={styles.questionDeleteTextButton}
            onClick={() => setIsDeleteQuestionModalOpen(true)}
            aria-label="질문 삭제"
          >
            삭제
          </button>
        </div>
      </div>

      <div className={styles.questionCard}>
        <div className={styles.questionMeta}>
          <Chip size="sm" tone="pink" className="pointer-events-none">
            {category}
          </Chip>
          <span className={styles.questionMetaText}>익명</span>
        </div>

        <h1 className={styles.questionTitle}>{question.title}</h1>

        <p className={styles.questionBody}>{question.content}</p>

        <div className={styles.questionDivider} aria-hidden="true" />

        <div className={styles.questionActions}>
          <div className={styles.questionActionsLeft}>
            <button
              type="button"
              className={
                isQuestionLiked ? styles.questionActionPillLiked : styles.questionActionPill
              }
              onClick={handleQuestionLike}
              disabled={toggleQuestionLikeMutation.isPending}
              aria-pressed={isQuestionLiked}
              aria-label={`좋아요 ${questionLikeCount}개`}
            >
              <LikeIcon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{questionLikeCount}</span>
            </button>

            <button
              type="button"
              className={styles.questionActionPill}
              aria-label={`답변 ${answerCount}개`}
            >
              <CommentIcon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{answerCount}</span>
            </button>
          </div>

          <div className={styles.questionViewCount}>
            <EyeIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span aria-label={`조회수 ${question.viewCount ?? 0}`}>{question.viewCount ?? 0}</span>
          </div>
        </div>
      </div>

      <section className={styles.answersSection} aria-label="답변 목록">
        <div className={styles.answersSectionHeader}>
          <h2 className={styles.answersSectionTitle}>답변</h2>
          <span className={styles.answersCount}>{answerCount}</span>
        </div>

        {hasApiAnswers ? (
          <ul className={styles.answersList}>
            {apiAnswers.map((answer) => {
              const isLiked = answer.likedByMe ?? false;
              const likeCount = answer.likeCount ?? 0;
              const isEditing = editingAnswerId === answer.id;

              return (
                <li key={answer.id}>
                  <div className={styles.answerCard}>
                    <div className={styles.answerCardHeader}>
                      <div className={styles.answerAuthorRow}>
                        <div className={styles.answerAvatar} aria-hidden="true">
                          졸
                        </div>
                        <div className={styles.answerAuthorInfo}>
                          <span className={styles.answerAuthorName}>졸업생</span>
                        </div>
                      </div>
                      {isGraduate && !isEditing && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className={styles.questionActionTextButton}
                            onClick={() => handleStartEdit(answer.id!, answer.content ?? '')}
                            aria-label="답변 수정"
                          >
                            <EditIcon className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>수정</span>
                          </button>
                          <button
                            type="button"
                            className={styles.questionDeleteTextButton}
                            onClick={() => setDeletingAnswerId(answer.id!)}
                            aria-label="답변 삭제"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          className="w-full text-[13px] text-text-primary leading-relaxed border border-border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[96px]"
                          value={editDraft}
                          onChange={(e) => setEditDraft(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            tone="gray"
                            size="filter"
                            className="w-auto"
                            onClick={() => setEditingAnswerId(null)}
                            disabled={updateAnswerMutation.isPending}
                          >
                            취소
                          </Button>
                          <Button
                            variant="solid"
                            tone="blue"
                            size="filter"
                            className="w-auto"
                            onClick={() => handleUpdateAnswer(answer.id!)}
                            disabled={updateAnswerMutation.isPending || !editDraft.trim()}
                          >
                            {updateAnswerMutation.isPending ? '저장 중...' : '저장'}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className={styles.answerBody}>{answer.content}</p>
                    )}

                    {!isEditing && (
                      <button
                        type="button"
                        className={isLiked ? styles.answerLikeButtonLiked : styles.answerLikeButton}
                        onClick={() => handleAnswerLike(answer.id!)}
                        disabled={toggleAnswerLikeMutation.isPending}
                        aria-pressed={isLiked}
                        aria-label={`좋아요 ${likeCount}개`}
                      >
                        <LikeIcon className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{likeCount}</span>
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : useMockFallback ? (
          <ul className={styles.answersList}>
            {MOCK_ANSWERS.map((answer) => (
              <li key={answer.id}>
                <div className={styles.answerCard}>
                  <div className={styles.answerCardHeader}>
                    <div className={styles.answerAuthorRow}>
                      <div className={styles.answerAvatar} aria-hidden="true">
                        {answer.author.charAt(0)}
                      </div>
                      <div className={styles.answerAuthorInfo}>
                        <span className={styles.answerAuthorName}>{answer.author}</span>
                        <span className={styles.answerAuthorDesc}>{answer.profileDescription}</span>
                      </div>
                    </div>
                    <span className={styles.answerTime}>{answer.createdAt}</span>
                  </div>
                  <p className={styles.answerBody}>{answer.content}</p>
                  <button
                    type="button"
                    className={styles.answerLikeButton}
                    aria-label={`좋아요 ${answer.likeCount}개`}
                  >
                    <LikeIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{answer.likeCount}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-text-muted">아직 답변이 없습니다.</p>
          </div>
        )}

        {isGraduate && isCreateFormOpen && (
          <div ref={createFormRef} className="flex flex-col gap-2 mt-4">
            <textarea
              className="w-full text-[13px] text-text-primary leading-relaxed border border-border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[120px]"
              placeholder="답변을 입력하세요..."
              value={answerDraft}
              onChange={(e) => setAnswerDraft(e.target.value)}
            />
            {createAnswerMutation.isError && (
              <p className="text-xs text-red-500">
                {getApiError(createAnswerMutation.error, '답변 등록에 실패했습니다.')}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                tone="gray"
                size="filter"
                className="w-auto"
                onClick={() => {
                  setIsCreateFormOpen(false);
                  setAnswerDraft('');
                }}
                disabled={createAnswerMutation.isPending}
              >
                취소
              </Button>
              <Button
                variant="solid"
                tone="blue"
                size="filter"
                className="w-auto"
                onClick={handleCreateAnswer}
                disabled={createAnswerMutation.isPending || !answerDraft.trim()}
              >
                {createAnswerMutation.isPending ? '등록 중...' : '등록'}
              </Button>
            </div>
          </div>
        )}
      </section>

      {isGraduate && (
        <Button
          size="floating"
          tone="blue"
          className={styles.floatingButton}
          leftIcon={<PlusIcon className="w-4 h-4 text-white" aria-hidden="true" />}
          onClick={handleOpenCreateForm}
          aria-label="답변 등록"
        >
          답변등록
        </Button>
      )}

      <Modal open={isDeleteQuestionModalOpen} onOpenChange={setIsDeleteQuestionModalOpen}>
        <Modal.Content size="sm">
          <Modal.Header tone="blue" layout="stacked">
            <Modal.Title>질문 삭제</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <Modal.Description className="text-text-primary">
              이 질문을 삭제하시겠습니까? 삭제된 질문은 복구할 수 없습니다.
            </Modal.Description>
            {deleteQuestionError && (
              <p className="text-xs text-red-500 mt-2 text-center">{deleteQuestionError}</p>
            )}
          </Modal.Body>
          <Modal.Footer layout="row">
            <Button
              variant="outline"
              tone="gray"
              size="dialogAction"
              className="flex-1"
              onClick={() => setIsDeleteQuestionModalOpen(false)}
              disabled={deleteQuestionMutation.isPending}
            >
              취소
            </Button>
            <Button
              variant="solid"
              tone="blue"
              size="dialogAction"
              className="flex-1"
              onClick={handleDeleteQuestion}
              disabled={deleteQuestionMutation.isPending}
            >
              {deleteQuestionMutation.isPending ? '삭제 중...' : '삭제'}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal
        open={deletingAnswerId !== null}
        onOpenChange={(open) => !open && setDeletingAnswerId(null)}
      >
        <Modal.Content size="sm">
          <Modal.Header tone="blue" layout="stacked">
            <Modal.Title>답변 삭제</Modal.Title>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>
            <Modal.Description className="text-text-primary">
              이 답변을 삭제하시겠습니까? 삭제된 답변은 복구할 수 없습니다.
            </Modal.Description>
            {deleteAnswerMutation.isError && (
              <p className="text-xs text-red-500 mt-2 text-center">
                {getApiError(deleteAnswerMutation.error, '삭제에 실패했습니다.')}
              </p>
            )}
          </Modal.Body>
          <Modal.Footer layout="row">
            <Button
              variant="outline"
              tone="gray"
              size="dialogAction"
              className="flex-1"
              onClick={() => setDeletingAnswerId(null)}
              disabled={deleteAnswerMutation.isPending}
            >
              취소
            </Button>
            <Button
              variant="solid"
              tone="blue"
              size="dialogAction"
              className="flex-1"
              onClick={handleDeleteAnswer}
              disabled={deleteAnswerMutation.isPending}
            >
              {deleteAnswerMutation.isPending ? '삭제 중...' : '삭제'}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
