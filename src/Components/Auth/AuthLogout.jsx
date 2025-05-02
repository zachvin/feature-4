import React from "react";
import { logoutUser } from "../../Services/auth";
import { useNavigate } from "react-router-dom";

const AuthLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // log out with back4app
    navigate("/auth");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default AuthLogout;
