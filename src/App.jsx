import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import * as Env from "./environments.js";
import Parse from "parse";
import Components from "./Components/Components";

// Database key information
const Env = {
  APPLICATION_ID: "ysAuCSKWYWxVfhPPKgDbkgJy0aA2A5OYjeYv67MU",
  JAVASCRIPT_KEY: "BP7kRKTm116TbuHNACX8dH8zI62kJxfFmj5PcsW8",
  SERVER_URL: "https://parseapi.back4app.com",
};

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return <Components />;
}

export default App;
