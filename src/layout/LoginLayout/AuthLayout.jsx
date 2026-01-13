import React from "react";
import { Outlet } from "react-router";
import Login from "../../pages/login/Login";
import Register from "../../pages/registration/Register";

const AuthLayout = () => {
  return (
    <div>
      <Outlet>
        <Login></Login>
        <Register></Register>
      </Outlet>
    </div>
  );
};

export default AuthLayout;
