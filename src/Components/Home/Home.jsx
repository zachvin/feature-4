import Nav from "../Shared/Nav";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Nav />
      <section className="w-2/3 h-screen flex flex-col justify-center mx-52">
        <h1 className="font-extrabold text-7xl text-indigo-900 p-4">
          Get high-quality human feedback.{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-sky-500 to-emerald-300 inline-block text-transparent bg-clip-text">
            Instantly.
          </span>
        </h1>
        <h2 className="font-medium text-md p-4 w-1/2 text-gray-900">
          Automatically get your neural network connected to thousands of
          testers. No complicated documentation and one-click hosting. Simply
          upload your model and see your data collection in real time.
        </h2>
        <div className="flex gap-8 items-center">
          <Link
            to="/auth/register"
            className="m-3 self-start bg-indigo-500 text-gray-100 px-4 py-2 rounded-full hover:bg-indigo-700 transition-all uppercase tracking-wider"
          >
            Get started
          </Link>
          <Link
            to="/about"
            className="text-indigo-500 hover:text-indigo-700 transition-all underline"
          >
            Learn more
          </Link>
        </div>
      </section>
    </>
  );
}
