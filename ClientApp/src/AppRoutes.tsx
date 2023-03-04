import AuthWrapper from "./pages/AuthWrapper";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Project from "./pages/Project";

const AppRoutes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
];

export default AppRoutes;
