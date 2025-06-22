import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../components";
import { FAQPage, TermsAndConditions } from "../pages/main";
import LoadingSpinner from "../components/Loading";

const LanguageSelector = lazy(() => import("../pages/main/LanguageSelector"));
const Welcome = lazy(() => import("../pages/main/Welcome"));
const SignUp = lazy(() => import("../pages/main/SignUp"));
const JoinChannel = lazy(() => import("../pages/main/JoinChannel"));
const Survey = lazy(() => import("../pages/main/Survey"));

const withSuspense = (Component) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(LanguageSelector),
  },
  {
    path: "/welcome",
    element: withSuspense(Welcome),
  },
  {
    path: "/faqs",
    element: withSuspense(FAQPage),
  },
  {
    path: "/terms-and-conditions",
    element: withSuspense(TermsAndConditions),
  },
  {
    path: "/signup",
    element: withSuspense(SignUp),
  },
  {
    path: "/join",
    element: withSuspense(JoinChannel),
  },
  {
    path: "/survey",
    element: withSuspense(() => (
      <ProtectedRoute>
        <Survey />
      </ProtectedRoute>
    )),
  },
]);

export default router;
