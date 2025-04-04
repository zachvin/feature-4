import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          {!isLogin ? "Sign up" : "Log in"}
        </h2>
        <form onSubmit={onSubmit} autoComplete="off" className="space-y-4">
          {!isLogin ? (
            <>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  id="first-name-input"
                  value={user.firstName}
                  onChange={onChange}
                  name="firstName"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  id="last-name-input"
                  value={user.lastName}
                  onChange={onChange}
                  name="lastName"
                  placeholder="Last name"
                  required
                />
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              id="email-input"
              value={user.email}
              onChange={onChange}
              name="Email"
              required
            />
          </div>{" "}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              id="password-input"
              value={user.password}
              onChange={onChange}
              name="Password"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
              onSubmit={onSubmit}
            >
              Submit
            </button>
          </div>
          {!isLogin ? (
            <h3 className="text-gray-700">
              Already have an account?{" "}
              <Link to="/auth/login" className="font-bold text-indigo-600">
                Log in
              </Link>
              .
            </h3>
          ) : (
            <h3 className="text-gray-700">
              Don't have an account?{" "}
              <Link to="/auth/register" className="font-bold text-indigo-600">
                Register
              </Link>
              .
            </h3>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
