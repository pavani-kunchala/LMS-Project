 // src/screen/dashboard/UserProfile.jsx
import { useEffect, useState } from "react";
import { getItem, user_is_signin } from "../../config/LocalStorageMethods";
import "../../style/UserProfile.css";  

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    user_is_signin().then((loggedUser) => {
      if (loggedUser) {
        setUser(loggedUser);
        getItem("EnrolledStudent").then((res) => {
          if (res) {
            const allEnrolled = Object.values(res);
            const myCourses = allEnrolled.filter(
              (student) => student.email === loggedUser.email
            );
            setEnrolledCourses(myCourses);
          }
        });
      }
    });
  }, []);

  return (
    <section className="user-profile">
      {!user && <p className="no-user">No user logged in</p>}

      <div className="enrolled-courses">
        <h2 className="courses-heading">My Enrolled Courses</h2>
        {enrolledCourses.length > 0 ? (
          <div className="course-grid">
            {enrolledCourses.map((course, index) => (
              <div className="course-card" key={index}>
                {course.image ? (
                  <img src={course.image} alt={course.course} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <div className="course-info">
                  <h3>{course.course}</h3>
                  <p>
                    Enrolled as: {course.firstName} {course.lastName}
                  </p>
                  <p>Contact: {course.contact}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-course">You have not enrolled in any courses yet.</p>
        )}
      </div>
    </section>
  );
}
