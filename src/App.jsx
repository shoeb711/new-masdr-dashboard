import Auth from "components/Auth";
import RootLayout from "layout/rootLayout/RootLayout";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import { userRole } from "shared/constant";

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <Suspense fallback={<PrimaryLoader />}>
              <RootLayout />
            </Suspense>
          }
        >
          <Route
            element={
              <Auth
                allowedRoles={[
                  userRole.ADMIN,
                  userRole.SUPER_ADMIN,
                  userRole.USER,
                ]}
              />
            }
          >
            <Route path="/" element={<div>Dashboard</div>} />
          </Route>
          <Route
            element={
              <Auth allowedRoles={[userRole.SUPER_ADMIN, userRole.ADMIN]} />
            }
          >
            <Route path="/querybuilder" element={<div>Query Builder</div>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
