import { Button, PillButton, BannerButton } from '@/shared/ui';

export function HomePage() {
  return (
    <div>
      <h1>Button Components</h1>

      <section>
        <h2>Button</h2>
        <div className="space-y-3">
          <Button>로그인</Button>
          <Button className="bg-purple-500 hover:bg-purple-600 active:bg-purple-700">
            맞춤 로드맵 생성
          </Button>
        </div>
      </section>

      <section>
        <h2>BannerButton</h2>
        <div className="space-y-3">
          <BannerButton color="blue">선배 페이지 둘러보기</BannerButton>
          <BannerButton color="green">커피챗 신청하기</BannerButton>
        </div>
      </section>

      <section>
        <h2>PillButton</h2>
        <div className="flex flex-wrap items-center gap-3">
          <PillButton color="blue">인증번호 발송</PillButton>
          <PillButton color="purple">로드맵 보기</PillButton>
          <PillButton color="green">인증 확인</PillButton>
          <PillButton color="outline">취소</PillButton>
        </div>
      </section>
    </div>
  );
}
