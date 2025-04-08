import Parse from "parse";
import { useNavigate } from "react-router-dom";

// used in auth register component
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);
  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// used in auth login component
export const loginUser = (currUser) => {
  const user = new Parse.User();

  user.set("password", currUser.password);
  user.set("username", currUser.email);

  console.log("User: ", user);
  console.log();
  return user
    .logIn(user.email, user.password)
    .then((currUserSaved) => {
      return currUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const checkUser = () => {
  return Parse.User.current()?.authenticated;
};

export const logoutUser = () => {
  return Parse.User.logOut()
    .then(() => {
      console.log("Logged out successfully.");
      window.location.reload();
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const readUser = () => {
  return Parse.User.current();
};
