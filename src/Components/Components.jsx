import Home from "./Home/Home";
import About from "./About/About";
import Nav from "./Shared/Nav";
import Identifier from "./Identifier/Identifier";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./Shared/nav.css";
import "./Identifier/identifier.css";

export default function Components() {
  // Everything to be routed must be inside <Router> element
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/identifier" element={<Identifier />} />
      </Routes>
    </Router>
  );
}
