import { useNavigate } from 'react-router';
import { SubHeader } from '@/shared/layout/header';
import * as styles from './qna-detail-page.styles';

export function QnaDetailPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <SubHeader
        title="Q&A"
        onBackClick={() => navigate(-1)}
        className={styles.subHeaderBreakout}
      />
      <div className={styles.placeholder}>
        {/* TODO: QnA 상세 API 연동 */}
        <p className={styles.placeholderText}>게시글을 불러오는 중입니다...</p>
      </div>
    </div>
  );
}
