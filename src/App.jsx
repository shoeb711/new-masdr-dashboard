import Auth from "components/Auth";
import RootLayout from "layout/rootLayout/RootLayout";
import Dashboard from "pages/dashboard/Dashboard";
import EditQueryBuilder from "pages/edit-querybuilder/EditQueryBuilder";
import QueryBuilder from "pages/queryBuilder/QueryBuilder";
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
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route
            element={
              // <Auth allowedRoles={[userRole.SUPER_ADMIN, userRole.ADMIN]} />
              <Auth allowedRoles={[userRole.SUPER_ADMIN, userRole.ADMIN]} />
            }
          >
            <Route path="/querybuilder" element={<QueryBuilder />} />
          </Route>
          <Route
            element={
              <Auth allowedRoles={[userRole.SUPER_ADMIN, userRole.ADMIN]} />
              // <Auth allowedRoles={[userRole.SUPER_ADMIN]} />
            }
          >
            <Route path="/edit-querybuilder" element={<EditQueryBuilder />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
