import { Link } from "react-router-dom";
import AuthLogout from "../Auth/AuthLogout";
import { checkUser } from "../Auth/AuthService";

const Nav = () => {
  // Link instead of <a> doesn't force reload
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="w-screen flex flex-wrap items-center align-middle justify-between p-4">
        <h1 className="block text-2xl font-extrabold w-xs">TESTIFY</h1>
        <div
          className="items-center justify-between w-full md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  gap-8 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8  md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block p-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block p-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/identifier"
                className="block p-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Models
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex justify-end align-middle gap-12 w-xs">
          {checkUser() ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className="block p-2 text-indigo-500 rounded-sm bg-gray-100 hover:text-gray-100 hover:bg-indigo-500"
                >
                  Profile
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/auth/login"
                  className="block p-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/register"
                  className="block p-2 text-indigo-500 rounded-sm bg-gray-100 hover:text-gray-100 hover:bg-indigo-500"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
