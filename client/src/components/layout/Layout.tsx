import { Outlet, useLocation } from "react-router-dom";

import { Header } from "../sections/Header";
import { PageContainer } from "./PageContainer";

export function Layout() {
  const location = useLocation();
  const isEventDetail = /^\/events\/[^/]+$/.test(location.pathname); // matches /events/:id
  return (
    <div className="min-h-screen flex flex-col bg-dark-3 text-gray-100 transition-colors duration-300 min-w-fit">
      <Header className="bg-dark-1 text-white fixed top-0 left-0 w-full z-50 shadow-lg" />

      <main className="flex-1 bg-dark-3 relative flex flex-col pt-16 w-full">
        <PageContainer className={isEventDetail ? "flex" : ""}>
          <Outlet />
        </PageContainer>
      </main>

      <footer className="bg-dark-2 text-center text-sm text-gray-300 w-full py-4 border-t border-gray-800">
        © {new Date().getFullYear()} Events Platform. All rights reserved.
      </footer>
    </div>
  );
}
