import Home from "./Home/Home";
import About from "./About/About";
import Marketplace from "./Marketplace/Marketplace";
import AuthModule from "./Auth/Auth";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import Dash from "./Dashboard/Dash";
import Models from "./Models/Models";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

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
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dash />} />}
        />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
        <Route
          path="/marketplace"
          element={<ProtectedRoute element={<Marketplace />} />}
        />
        <Route
          path="/models"
          element={<ProtectedRoute element={<Models />} />}
        />
      </Routes>
    </Router>
  );
}
