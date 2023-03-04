import AuthWrapper from "./pages/AuthWrapper";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Redirect from "./pages/Redirect";
import RegisterAsCompany from "./pages/RegisterCompany";
import RegisterAsUser from "./pages/RegisterUser";

const AppRoutes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/user/register',
    element: <RegisterAsUser />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/company/register',
    element: <RegisterAsCompany />
  },
  {
    path: '/redirect',
    element: <Redirect />
  }
];

export default AppRoutes;
