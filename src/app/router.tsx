import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout, AuthLayout, ProtectedRoute } from '@/app/layouts';
import { getUserRole } from '@/features/auth/model/auth-state';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/auth/login';
import { SignupSelectPage } from '@/pages/auth/signup-select';
import { StudentSignupPage } from '@/pages/auth/student-signup';
import { GraduateSignupPage } from '@/pages/auth/graduate-signup';
import { CareerMapInputPage } from '@/pages/career-map/input';
import { CareerMapResultPage } from '@/pages/career-map/result';
import { CoffeeChatInputPage } from '@/pages/coffee-chat/input';
import { CoffeeChatMatchingPage } from '@/pages/coffee-chat/matching';
import { MatchingResultPage } from '@/pages/coffee-chat/matching-result';
import { SeniorProfilePage } from '@/pages/coffee-chat/senior-profile';
import { CoffeeChatApplyPage } from '@/pages/coffee-chat/apply';
import { JobInfoPage } from '@/pages/job-info';
import { StudentMyPage } from '@/pages/my-page/student';
import { StudentProfileEditPage } from '@/pages/my-page/student/edit';
import { GraduateMyPage } from '@/pages/my-page/graduate';
import { GraduateProfileEditPage } from '@/pages/my-page/graduate/edit';
import { NotificationPage } from '@/pages/notification';
import { PointChargePage } from '@/pages/point/charge';
import { MyActivityPage } from '@/pages/my/my-activity';
import { RoadmapPage } from '@/pages/roadmap';
import { RoadmapDetailPage } from '@/pages/roadmap/detail';
import { RoadmapResultPage } from '@/pages/roadmap/result';
import { QnaListPage } from '@/pages/qna/list';
import { QnaCreatePage } from '@/pages/qna/create';
import { QnaDetailPage } from '@/pages/qna/detail';
import { QnaEditPage } from '@/pages/qna/edit';

function MyPageRedirect() {
  const role = getUserRole();
  return <Navigate to={role === 'GRADUATE' ? '/my-page/graduate' : '/my-page/student'} replace />;
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/auth/login', element: <LoginPage /> },
      { path: '/auth/signup-select', element: <SignupSelectPage /> },
      { path: '/auth/student-signup', element: <StudentSignupPage /> },
      { path: '/auth/graduate-signup', element: <GraduateSignupPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: '/', element: <HomePage /> },

          // redirects
          { path: '/coffee-chat', element: <Navigate to="/coffee-chat/matching" replace /> },
          { path: '/my', element: <MyPageRedirect /> },

          // roadmap
          { path: '/roadmap', element: <RoadmapPage /> },
          { path: '/roadmap/result', element: <RoadmapResultPage /> },
          { path: '/roadmap/:id', element: <RoadmapDetailPage /> },

          // career-map
          { path: '/career-map/input', element: <CareerMapInputPage /> },
          { path: '/career-map/result', element: <CareerMapResultPage /> },

          // coffee-chat
          { path: '/coffee-chat/input', element: <CoffeeChatInputPage /> },
          { path: '/coffee-chat/matching', element: <CoffeeChatMatchingPage /> },
          { path: '/coffee-chat/matching-result', element: <MatchingResultPage /> },
          { path: '/coffee-chat/senior-profile/:id', element: <SeniorProfilePage /> },
          { path: '/coffee-chat/apply/:id', element: <CoffeeChatApplyPage /> },

          // job-info
          { path: '/job-info', element: <JobInfoPage /> },

          // my
          { path: '/my/activity', element: <MyActivityPage /> },

          // my-page
          { path: '/my-page/student', element: <StudentMyPage /> },
          { path: '/my-page/student/edit', element: <StudentProfileEditPage /> },
          { path: '/my-page/graduate', element: <GraduateMyPage /> },
          { path: '/my-page/graduate/edit', element: <GraduateProfileEditPage /> },

          // notification
          { path: '/notification', element: <NotificationPage /> },

          // point
          { path: '/point/charge', element: <PointChargePage /> },

          // qna
          { path: '/qna', element: <QnaListPage /> },
          { path: '/qna/create', element: <QnaCreatePage /> },
          { path: '/qna/:id', element: <QnaDetailPage /> },
          { path: '/qna/:id/edit', element: <QnaEditPage /> },
        ],
      },
    ],
  },
]);
