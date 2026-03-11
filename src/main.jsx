import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/router.jsx";
import AuthProvider from "./Context/Authcontext/AuthProvider.jsx";
import App from "./App.jsx";

const queryClient = new QueryClient();
// <StrictMode>

/* <App /> */
// </StrictMode>,
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </QueryClientProvider>,
);
