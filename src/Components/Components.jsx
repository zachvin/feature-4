import Home from "./Home/Home";
import About from "./About/About";
import Nav from "./Shared/Nav";
import Identifier from "./Identifier/Identifier";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// component tree diagram - hand drawn?
// UML diagram
// submit both diagrams alongside zip
// do readme
// create release
// semver 0.2.0, include 0.1.0 info in changelog
// first digit switches to 1 when actual users in db
// changelog examples exist

export default function Components() {
  return (
    <div>
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}
