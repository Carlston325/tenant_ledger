import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import UserPage from "./pages/UserPage";
import TenantPage from "./pages/TenantPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tenants" element={<TenantPage />} />
        <Route exact path="/user/:id" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
