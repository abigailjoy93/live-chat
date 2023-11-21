import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import components

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // error element?
    children: [
      // components here
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
