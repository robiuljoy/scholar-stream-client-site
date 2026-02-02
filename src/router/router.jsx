import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/main/MainLayout";
import AuthLayout from "../layout/LoginLayout/AuthLayout";
import Login from "../pages/login/Login";
import Register from "../pages/registration/Register";
import Home from "../pages/home/Home";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import ErrorPage from "../pages/errorPage/ErrorPage";
import AllScholarships from "../pages/allScholarships/AllScholarships";
import ContactUs from "../pages/contactUs/ContactUs";
import PrivateRoute from "./PrivateRoute";
import ScholarshipDetails from "../pages/ScholarshipDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/scholarships",
        element: (
          <PrivateRoute>
            <AllScholarships></AllScholarships>
          </PrivateRoute>
        ),
      },
      {
        path: "/scholarship/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
  },
]);

export default router;
