import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import SignInPage from "./auth/sign-in/Index.jsx";
import "./index.css";
import Home from "./pages/Home/Home.jsx";

import { ClerkProvider } from "@clerk/clerk-react";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import EditResume from './pages/dashboard/resume/[resumeId]/edit/EditResume';
import ViewResume from "./pages/my-resume/[resumeId]/view/ViewResume.jsx";
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume/>
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
    {
    path:'/my-resume/:resumeId/view',
    element:<ViewResume/>
  }
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
