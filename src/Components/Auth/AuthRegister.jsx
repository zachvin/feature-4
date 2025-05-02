import React, { useEffect, useState } from "react";
import { checkUser, createUser } from "../../Services/auth";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import Nav from "../Shared/Nav";

const AuthRegister = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
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

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        // redirects user to marketplace after registering
        if (userCreated) {
          navigate("/marketplace");
        }
        setAdd(false);
      });
    }
  }, [navigate, newUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);

    setNewUser({
      ...newUser,
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
          user={newUser}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
        />
      </div>
    </>
  );
};

export default AuthRegister;
