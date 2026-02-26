//src\screen\dashboard\DashboardHome.jsx
import { useEffect, useState } from "react";
import { user_is_signin } from "../../config/LocalStorageMethods"; // localStorage methods
import "../../style/dashboardHome.css";

export default function DashboardHome() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    user_is_signin()
      .then((user) => {
        if (user?.email === "admin@admin.com") {
          setIsAdmin(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="dashboardHome">
      <div className="description">
        {isAdmin ? (
          <>
            <h1>Welcome to Admin Panel 😀</h1>
            <p>
              Manage courses, quizzes and registrations all in one place.
              Use the sidebar to navigate through different sections of the admin
              dashboard. This panel gives you full control over your data stored in
              localStorage.
            </p>
          </>
        ) : (
          <>
            <h1>Welcome to Your Profile 👤</h1>
            <p>
              Here you can view your details and manage
              your learning journey. Use the sidebar to explore your available
              options.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
