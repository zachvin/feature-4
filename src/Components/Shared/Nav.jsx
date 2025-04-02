import { Link } from "react-router-dom";
import AuthLogout from "../Auth/AuthLogout";
import { checkUser } from "../Auth/AuthService";

const Nav = () => {
  // Link instead of <a> doesn't force reload
  return (
    <nav>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/identifier">
          <li>Identifier</li>
        </Link>
        {checkUser() ? (
          <AuthLogout />
        ) : (
          <Link to="/auth">
            <li>Login</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
