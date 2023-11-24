import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Error from "./pages/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";
import ChatApp from "./pages/ChatApp.jsx";
// import Profilez from "./pages/Profile.jsx";
// import Join from "./pages/Join.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      //Make sure to revert back to Home - just testing pages as we can set up the elements properly 
      {
        index: true,
        element: <ChatApp />,
      }
      // , {
      //   path: '/ChatApp',
      //   element: <ChatApp />
      // }, {
      //   path: '/profile',
      //   element: <Profilez />
      // }, {
      //   path: '/join',
      //   element: <Join />
      // }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
