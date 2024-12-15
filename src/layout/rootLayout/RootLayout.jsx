import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "shared/components/errorBoundary/ErrorBoundary";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import Sidebar from "shared/components/sidebar/Sidebar";

const RootLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <main className="py-5 lg:pl-72"> */}
      <main  className={classNames(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "pl-72" : "pl-16"
        )}>
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
