import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from "./utils/contexts/AuthContext";
import { PostContextProvider } from "./utils/contexts/PostContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <StrictMode>
        <BrowserRouter>
        <AuthContextProvider>
          <PostContextProvider>
            <App />
          </PostContextProvider>
        </AuthContextProvider>
        </BrowserRouter>
    </StrictMode>
  </>
);
