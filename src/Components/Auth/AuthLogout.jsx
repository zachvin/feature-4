import React from "react";
import { logoutUser } from "./AuthService";
import { useNavigate } from "react-router-dom";

const AuthLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Clear user session or tokens
    alert("You have been logged out.");
    navigate("/auth");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default AuthLogout;
