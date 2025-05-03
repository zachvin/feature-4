import React, { useEffect, useState } from "react";
import { checkUser, loginUser } from "../../Services/auth";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import Nav from "../Shared/Nav";

const AuthLogin = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
  });

  // flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  // redirect already authenticated users to marketplace
  useEffect(() => {
    if (checkUser()) {
      navigate("/marketplace");
    }
  }, [navigate]);

  // useEffect that runs when changes are made to the state variable flags
  useEffect(() => {
    if (currentUser && add) {
      // redirects user to marketplace when they're logged in
      loginUser(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          navigate("/marketplace");
        }
        setAdd(false);
      });
    }
  }, [navigate, currentUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);

    setCurrentUser({
      ...currentUser,
      [name]: newValue,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <>
      <Nav />
      <div>
        <AuthForm
          user={currentUser}
          isLogin={true}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
        />
      </div>
    </>
  );
};

export default AuthLogin;
