import { RouteProps } from "react-router-dom";
import { Home } from "../components/views/pages/Home";
import { Login } from "../components/views/pages/Login";
import { VerifyProfile } from "../components/views/pages/VerifyProfile";
import { PrivateRoute } from "./PrivateRoute";

export const routes: RouteProps[] = [
  { path: "/login", exact: true, component: Login },
];

export const privateRoutes: React.ComponentProps<typeof PrivateRoute>[] = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/verifyProfile",
    exact: true,
    component: VerifyProfile,
  },
];
