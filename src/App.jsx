import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import * as Env from "./environments.js";
import Parse from "parse";
import Components from "./Components/Components";

const Env = {
  APPLICATION_ID: "",
  JAVASCRIPT_KEY: "",
  SERVER_URL: "https://parseapi.back4app.com",
};

// Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
// Parse.serverURL(Env.SERVER_URL);

function App() {
  return <Components />;
}

export default App;
