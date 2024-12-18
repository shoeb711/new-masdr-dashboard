import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "shared/components/errorBoundary/ErrorBoundary";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import Sidebar from "shared/components/sidebar/Sidebar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RootLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem("role", "super-admin");
  }, []);
 

  return (
    <div className="h-full">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className={classNames(
          "flex-1 transition-all duration-300 h-[calc(100%-64px)]",
          isSidebarOpen ? "pl-72" : "pl-16"
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8 h-full">
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
