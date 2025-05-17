import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    // Check for token cookie
    const token = document.cookie
      .split(";")
      .map(c => c.trim())
      .find(c => c.startsWith("token="))
      ?.split("=")[1];

    if (token && token !== "" && token.length > 20) {
      setIsLoggedIn(true);
      // Decode JWT to check for admin status
      try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(base64.length + ((4 - base64.length % 4) % 4), "=");
        const payload = JSON.parse(atob(padded));
        setIsAdmin(payload.email && payload.email.toLowerCase().includes("admin"));
      } catch {
        setIsAdmin(false);
      }
      return;
    }

    // Fallback: Check auth status via protected endpoint
    try {
      const response = await fetch("http://localhost:3000/dashboard", {
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(true);
        const text = await response.text();
        const emailMatch = text.match(/Welcome to your dashboard, (.*?)!/);
        const email = emailMatch ? emailMatch[1] : "";
        setIsAdmin(email.toLowerCase().includes("admin"));
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location]); // Re-run checkAuth when the route changes

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
    })
      .then(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate("/login");
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate("/login");
      });
  };

  return (
    <nav className="main-navbar">
      <div className="nav-logo">Task<span>Mint</span></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {isAdmin && <Link to="/upload-csv">Upload CSV</Link>}
            <button
              className="auth-submit-btn"
              style={{ width: "auto", padding: "0.3rem 1.1rem", margin: 0 }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;