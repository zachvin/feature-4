import Home from "./Home/Home";
import About from "./About/About";
import Identifier from "./Identifier/Identifier";
import AuthModule from "./Auth/Auth";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

import "./Shared/nav.css";
import "./Identifier/identifier.css";

export default function Components() {
  // Everything to be routed must be inside <Router> element
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
        <Route
          path="/identifier"
          element={<ProtectedRoute element={<Identifier />} />}
        />
      </Routes>
    </Router>
  );
}
