import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import ChatApp from "./pages/ChatApp.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Profile from "./pages/Profile.jsx";
import Join from "./pages/Join.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      //Make sure to revert back to Home - just testing pages as we can set up the elements properly 
      {
        index: true,
        element: <Join />,
      }
      , {
        path: '/chatapp',
        element: <ChatApp />
      }, {
        path: '/profile',
        element: <Profile />
      }, {
        path: '/join',
        element: <Join />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
