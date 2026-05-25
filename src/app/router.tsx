import { createBrowserRouter } from 'react-router';
import { RootLayout, AuthLayout } from '@/app/layouts';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/auth/login';
import { SignupSelectPage } from '@/pages/auth/signup-select';
import { StudentSignupPage } from '@/pages/auth/student-signup';
import { GraduateSignupPage } from '@/pages/auth/graduate-signup';
import { CareerMapInputPage } from '@/pages/career-map/input';
import { CareerMapResultPage } from '@/pages/career-map/result';
import { CoffeeChatInputPage } from '@/pages/coffee-chat/input';
import { MatchingResultPage } from '@/pages/coffee-chat/matching-result';
import { SeniorProfilePage } from '@/pages/coffee-chat/senior-profile';
import { JobInfoPage } from '@/pages/job-info';
import { StudentMyPage } from '@/pages/my-page/student';
import { StudentProfileEditPage } from '@/pages/my-page/student/edit';
import { GraduateMyPage } from '@/pages/my-page/graduate';
import { GraduateProfileEditPage } from '@/pages/my-page/graduate/edit';
import { NotificationPage } from '@/pages/notification';
import { PointChargePage } from '@/pages/point/charge';
import { QnaListPage } from '@/pages/qna/list';
import { QnaCreatePage } from '@/pages/qna/create';
import { QnaDetailPage } from '@/pages/qna/detail';

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
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },

      // career-map
      { path: '/career-map/input', element: <CareerMapInputPage /> },
      { path: '/career-map/result', element: <CareerMapResultPage /> },

      // coffee-chat
      { path: '/coffee-chat/input', element: <CoffeeChatInputPage /> },
      { path: '/coffee-chat/matching-result', element: <MatchingResultPage /> },
      { path: '/coffee-chat/senior-profile/:id', element: <SeniorProfilePage /> },

      // job-info
      { path: '/job-info', element: <JobInfoPage /> },

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
    ],
  },
]);
