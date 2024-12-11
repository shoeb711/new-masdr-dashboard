import RootLayout from "layout/rootLayout/RootLayout";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <RootLayout />
            </Suspense>
          }
        >
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/querybuilder" element={<div>Query Builder</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
