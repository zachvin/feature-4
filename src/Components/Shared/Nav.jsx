import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/identifier">Identifier</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
