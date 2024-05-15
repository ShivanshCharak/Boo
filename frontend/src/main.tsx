import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from "./utils/contexts/AuthContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <StrictMode>
        <BrowserRouter>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
        </BrowserRouter>
    </StrictMode>
  </>
);
