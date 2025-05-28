import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import SignInPage from "./auth/sign-in/Index.jsx";
import "./index.css";
import Home from "./pages/Home/Home.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/auth/sign-in",

    element: <SignInPage />,
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
    
    <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
