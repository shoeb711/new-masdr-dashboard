import Auth from "components/Auth";
import RootLayout from "layout/rootLayout/RootLayout";
import Dashboard from "pages/dashboard/Dashboard";
import EditQueryBuilder from "pages/edit-querybuilder/EditQueryBuilder";
import QueryBuilder from "pages/queryBuilder/QueryBuilder";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrimaryLoader from "shared/components/primaryLoader/PrimaryLoader";
import { PATH, userRole } from "shared/constant";
import GlobalProvider from "shared/context/GlobalContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
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
                <Route path={PATH.dashboard} element={<Dashboard />} />
              </Route>
              <Route
                element={
                  <Auth allowedRoles={[userRole.SUPER_ADMIN, userRole.ADMIN]} />
                }
              >
                <Route path={PATH.queryBuilder} element={<QueryBuilder />} />
                <Route
                  path={`${PATH.editqueryBuilder}/:chartId`}
                  element={<EditQueryBuilder />}
                />
              </Route>
            </Route>
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
