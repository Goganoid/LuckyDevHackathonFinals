import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import LogoutPage from "./pages/Logout";
import RegisterAsCompany from "./pages/RegisterCompany";
import RegisterAsUser from "./pages/RegisterUser";
import Profile from "./pages/Profile";
import RedirectPage from "./pages/Redirect";
import UsersPage from "./pages/UsersPage";
import Project from "./pages/Project";
import ProjectsPage from "./pages/ProjectsPage";

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
    element: <RedirectPage />
  },
  {
    path: '/logout',
    element: <LogoutPage />
  },
  {
    path: '/profile/:id',
    index: true,
    element: <Profile />
  },
  {
    path: '/users',
    element: <UsersPage />
  },
  {
    path: '/projects',
    element: <ProjectsPage />
  },
  {
    path: '/project/:id',
    index: true,
    element: <Project />
  }
];

export default AppRoutes;
