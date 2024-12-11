import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "shared/components/errorBoundary/ErrorBoundary";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import Sidebar from "shared/components/sidebar/Sidebar";

const RootLayout = () => {
  return (
    <div>
      <Sidebar />
      <main className="py-5 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <ErrorBoundary>
            <Suspense fallback={<PrimaryLoader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
