import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import pages --> then pages will import the components
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Join from './pages/Join.jsx';
import Chatroom from './pages/Chatroom.jsx';
import Profile from './pages/Profile.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            }, {
                path: '/login',
                element: <Login />
            }, {
                path: '/signup',
                element: <Signup />
            }, {
                path: '/profiles/:username',
                element: <Profile />
            }, {
                path: '/me',
                element: <Profile />
            }, {
                path: '/thoughts/:thoughtId',
                element: <SingleThought />
            }
        ]
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
