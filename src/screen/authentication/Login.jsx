 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../config/LocalStorageMethods";

import "../../style/login.css"; 

export default function Login() {
  const [currentValue, setCurrentValue] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(""); // server/localStorage errors
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const currentV = (e) => {
    const { value, name } = e.target;
    setCurrentValue((val) => ({ ...val, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  // 🔍 Validation logic
  const validateForm = () => {
    let newErrors = {};

    if (!currentValue.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValue.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!currentValue.password.trim()) {
      newErrors.password = "Password is required";
    } else if (currentValue.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const userData = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // stop submission if invalid
    }

    setLoading("waiting...");
    signInUser(currentValue)
      .then((msg) => {
        alert(msg);
        setError("");
        setLoading("");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        setError(err);
        setLoading("");
      });
  };

  return (
    <section className="auth login">
      <h1 className="auth-heading">Login</h1>

      <form className="auth-form" onSubmit={userData}>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={currentV}
          value={currentValue.email}
        />
        {errors.email && <p className="auth-error">{errors.email}</p>}

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={currentV}
          value={currentValue.password}
        />
        {errors.password && <p className="auth-error">{errors.password}</p>}

        {error && <p className="auth-error">{error}</p>}

        <button type="submit">{loading || "Login"}</button>
      </form>

      <div className="auth-switch">
        <Link to="/landing?mode=signup">Signup</Link>
      </div>
    </section>
  );
}
