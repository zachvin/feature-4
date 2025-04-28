import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";
import Nav from "../Shared/Nav";

const AuthModule = () => {
  const navigate = useNavigate();

  // redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Nav />
      <div className="text-gray-100 w-screen h-screen flex flex-col justify-center align-middle gap-8">
        <Link to="/auth/register" className="flex justify-center">
          <button className="p-2 bg-indigo-600 cursor-pointer rounded-sm">
            Register
          </button>
        </Link>
        <Link to="/auth/login" className="flex justify-center">
          <button className="p-2 bg-indigo-600 cursor-pointer rounded-sm">
            Login
          </button>
        </Link>
        <Link to="/" className="flex justify-center">
          <button className="p-2 bg-indigo-600 cursor-pointer rounded-sm">
            Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default AuthModule;
