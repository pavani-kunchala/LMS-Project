 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getItem } from "../../config/LocalStorageMethods";
import "../../style/login.css"; // ✅ reuse login.css

export default function SignUp({ role = "user" }) {
  const [currentValue, setCurrentValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    password: "",
  });
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

    if (role === "user") {
      if (!currentValue.firstName.trim()) {
        newErrors.firstName = "First name is required";
      } else if (currentValue.firstName.trim().length < 2) {
        newErrors.firstName = "First name must be at least 2 characters";
      }

      if (!currentValue.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }

      if (!currentValue.contact.trim()) {
        newErrors.contact = "Contact number is required";
      } else if (!/^\d{10}$/.test(currentValue.contact)) {
        newErrors.contact = "Contact must be 10 digits";
      }
    }

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

  const userData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // stop submission if invalid
    }

    setLoading("waiting...");

    try {
      const users = (await getItem("users")) || {};

      if (users[currentValue.email]) {
        setError("An account with this email already exists.");
        setLoading("");
        return;
      }

      const payload =
        role === "admin"
          ? { email: currentValue.email, password: currentValue.password }
          : currentValue;

      await createUser(payload);

      alert("Successfully created");
      setError("");
      setLoading("");
      navigate("/landing?mode=login");
    } catch (err) {
      console.error("Signup error:", err);

      const errorMessage =
        (err && err.message) ||
        (typeof err === "string" ? err : "") ||
        "Error creating user";

      setError(errorMessage);
      setLoading("");
    }
  };

  return (
    <section className="auth signup">
      <h1 className="auth-heading">
        {role === "admin" ? "Admin Signup" : "User Signup"}
      </h1>

      <form className="auth-form" onSubmit={userData}>
        {role === "user" && (
          <>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              onChange={currentV}
              value={currentValue.firstName}
            />
            {errors.firstName && <p className="auth-error">{errors.firstName}</p>}

            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              onChange={currentV}
              value={currentValue.lastName}
            />
            {errors.lastName && <p className="auth-error">{errors.lastName}</p>}

            <input
              type="text"
              placeholder="Enter Contact"
              name="contact"
              onChange={currentV}
              value={currentValue.contact}
            />
            {errors.contact && <p className="auth-error">{errors.contact}</p>}
          </>
        )}

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

        <button type="submit">{loading || "Signup"}</button>
      </form>

      <div className="auth-switch">
        Already have an account?<Link to="/landing?mode=login"> Login</Link>
      </div>
    </section>
  );
}
