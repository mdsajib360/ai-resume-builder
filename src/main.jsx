import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import SignInPage from "./auth/sign-in/Index.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";



import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import EditResume from "./pages/dashboard/resume/[resumeId]/edit/EditResume.jsx";
import ViewResume from "./pages/my-resume/[resumeId]/view/ViewResume.jsx";
console.log('viewresuem',ViewResume);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "dashboard/resume/:resumeId/edit", element: <EditResume /> },
      { path: "my-resume/:resumeId/view", element: <ViewResume /> },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) throw new Error("Missing Clerk Publishable Key");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
