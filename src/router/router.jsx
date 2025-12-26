import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/main/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
  },
]);
