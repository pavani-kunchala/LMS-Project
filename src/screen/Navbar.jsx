 import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { user_is_signin, signOutUser } from "../config/LocalStorageMethods";

import "../style/navbar.css";  

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    user_is_signin()
      .then((user) => setIsSignedIn(!!user))
      .catch((err) => console.log(err));
  }, []);

  const logoutUser = () => {
    signOutUser()
      .then((msg) => {
        alert(msg);
        setIsSignedIn(false);
        navigate("/landing?mode=login");
      })
      .catch((err) => console.log(err));
  };

  const toggleMobileNav = () => {
    setMobileOpen((prev) => !prev);
    document.body.style.overflow = mobileOpen ? "auto" : "hidden";
  };

  if (location.pathname.startsWith("/dashboard")) return null;

  return (
    <nav className="navbar">
      {/* Top bar */}
      <div className="navbar-top">
        <div className="navbar-top-inner">
          <div className="navbar-right"></div>
          <div className="navbar-left">
            <Link to="/student-registration-form">Public Student Registration Form</Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="navbar-bottom">
        <div className="navbar-bottom-inner">
          <div className="navbar-logo">
            <h1 onClick={() => navigate("/")}>The Pro Academy</h1>
          </div>

          <ul className="navbar-links">
            <li><Link to="/course">Course</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            {isSignedIn ? (
              <>
                <li><button onClick={logoutUser} className="logout-btn">Log Out</button></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/landing?mode=login">Login</Link></li>
                <li><Link to="/landing?mode=signup">Signup</Link></li>
              </>
            )}
          </ul>

          <div className="hamburger" onClick={toggleMobileNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/course">Course</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            {isSignedIn ? (
              <>
                <li><button onClick={logoutUser} className="logout-btn">Log Out</button></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signUp">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
