import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import GlobalProvider from "shared/context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <BrowserRouter> */}
      {/* <GlobalProvider> */}
        <App />
      {/* </GlobalProvider> */}
    {/* </BrowserRouter> */}
  </StrictMode>
);
