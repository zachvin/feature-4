import Home from "./Home/Home";
import About from "./About/About";
import Nav from "./Shared/Nav";
import Identifier from "./Identifier/Identifier";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./Shared/nav.css";
import "./Identifier/identifier.css";

export default function Components() {
  // Everything to be routed must be inside <Router> element
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/identifier"
          element={<ProtectedRoute element={<Identifier />} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
