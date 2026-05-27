import { useState } from 'react';
import { useNavigate } from 'react-router';

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

  function handleSubmit() {
    // TODO: 질문 등록 API 연동
    console.log({ category, title, content });
  }

  return (
    <div className={styles.page}>
      {/* 작성 안내 */}
      <div className={styles.writeHeader}>
        <span className={styles.writeTitle}>질문 작성</span>
        <span className={styles.writeDesc}>익명으로 질문을 작성해보세요</span>
      </div>

      {/* 익명 질문 안내 박스 */}
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

      {/* 카테고리 */}
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

      {/* 제목 */}
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
        />
      </div>

      {/* 본문 내용 */}
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
        />
      </div>

      {/* 하단 버튼 */}
      <div className={styles.buttonRow}>
        <Button
          variant="outline"
          tone="gray"
          size="qnaSubmit"
          className="flex-1"
          onClick={() => navigate('/qna')}
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
        >
          질문 등록
        </Button>
      </div>
    </div>
  );
}
