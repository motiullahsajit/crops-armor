import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AuthProvider from "./providers/AuthProvider";
import Root from "./components/Root"; // Import the correct Root component
import PastStat from "./components/PastStat";
import PrivateRoute from "./components/routes/PrivateRoute";
import Analysis from "./components/Analysis";
import Community from "./components/Community";
import HelpDesk from "./components/HelpDesk";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>, // Use the correct Root component
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home></Home>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/past_stat",
        element: (
          <PrivateRoute>
            <PastStat></PastStat>
          </PrivateRoute>
        ),
      },
      {
        path: "/analysis",
        element: (
          <PrivateRoute>
            <Analysis></Analysis>
          </PrivateRoute>
        ),
      },
      {
        path: "/community",
        element: (
          <PrivateRoute>
            <Community />
          </PrivateRoute>
        ),
      },
      {
        path: "/help",
        element: (
          <PrivateRoute>
            <HelpDesk />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
