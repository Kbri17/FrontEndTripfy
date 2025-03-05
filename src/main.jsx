import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import './index.css'
import { AuthProvider } from './auth/context/AuthContext';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider  router={router} />
    </AuthProvider>
  </StrictMode>
);
