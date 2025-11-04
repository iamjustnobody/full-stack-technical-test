import { lazy, Suspense } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageError, { GlobalErrorFallback } from "./pages/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import { toast, Toaster } from "sonner";
// import { EventList } from "./pages/EventList";
// import EventDetail from "./pages/EventDetail";
// import MyEvents from "./pages/MyEvents";
import { LoadingSkeleton } from "./components/base/Skeleton";
import { Layout } from "./components/layout/Layout";

const EventList = lazy(() => import("./pages/EventList"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const MyEvents = lazy(() => import("./pages/MyEvents"));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary
        FallbackComponent={GlobalErrorFallback}
        onError={(error) => toast.error(error.message)}
      >
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            <Route path="/" element={<Layout />} errorElement={<PageError />}>
              <Route index element={<EventList />} />
              <Route path="events/:id" element={<EventDetail />} />
              <Route path="my-events" element={<MyEvents />} />
              <Route
                path="*"
                element={<PageError message="Page not found" />}
              />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Toaster richColors />
    </BrowserRouter>
  );
}

export default App;
