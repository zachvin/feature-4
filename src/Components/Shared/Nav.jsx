import { Link } from "react-router-dom";
import AuthLogout from "../Auth/AuthLogout";

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
        <AuthLogout />
      </ul>
    </nav>
  );
};

export default Nav;
