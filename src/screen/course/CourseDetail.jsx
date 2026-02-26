 // src/screen/dashboard/CourseDetail.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addItem, user_is_signin, getItem } from "../../config/LocalStorageMethods";
import "../../style/courseDetail.css";  

export default function CourseDetail() {
  const [data, setData] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setData(location.state);
    }

    user_is_signin()
      .then((user) => {
        if (user) {
          setIsLoggedIn(true);
          setCurrentUser(user);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.log(err));
  }, [location.state]);

  const enrollStudent = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (currentUser.role === "admin") {
      alert("Admins cannot enroll in courses");
      return;
    }

    try {
      const users = await getItem("users");
      const userDetails = users[currentUser.email];
      const enrolledStudents = (await getItem("EnrolledStudent")) || {};

      const alreadyEnrolled = Object.values(enrolledStudents).some(
        (student) =>
          student.email === currentUser.email &&
          student.course === data.courseName
      );

      if (alreadyEnrolled) {
        alert("You are already enrolled in this course");
        return;
      }

      const newItem = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        contact: userDetails.contact,
        course: data.courseName,
        image: data.image,
      };

      await addItem(newItem, "EnrolledStudent");
      alert("Student enrolled successfully");
    } catch (err) {
      console.log(err);
      alert("Error enrolling student");
    }
  };

  return (
    <section className="course-detail">
      {data && (
        <div className="detail-card">
          <div className="description-block">
            <div className="description-header">
              <h1 className="course-title">{data.courseName}</h1>
              <p className="course-text">
                {data.description || "No description available"}
              </p>
            </div>

            <div className="topics-block">
              <h3>What you will learn:</h3>
              <ul>
                {data.topics && data.topics.length > 0 ? (
                  data.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))
                ) : (
                  <p>No topics available</p>
                )}
              </ul>
            </div>

            <div className="duration-block">
              <h4>
                Course Duration:{" "}
                <span className="highlight">{data.courseDuration} Month</span>
              </h4>
            </div>

            <div className="quiz-block">
              <h4>
                No. Of Quiz:{" "}
                <span className="highlight">
                  {Number(data.noOfQuiz) < 10
                    ? `0${data.noOfQuiz}`
                    : data.noOfQuiz}
                </span>
              </h4>
            </div>
          </div>

          <div className="image-block">
            {data.image ? (
              <img src={data.image} alt={data.courseName} />
            ) : (
              <p>No Image</p>
            )}
          </div>
        </div>
      )}

      <div className="form-block">
        <h1 className="form-heading">Enroll</h1>

        <div className="form-actions">
          {!isLoggedIn && (
            <button className="login-btn" onClick={enrollStudent}>
              Login to Enroll
            </button>
          )}

          {isLoggedIn && currentUser?.role !== "admin" && (
            <button className="enroll-btn" onClick={enrollStudent}>
              Enroll
            </button>
          )}

          {isLoggedIn && currentUser?.role === "admin" && (
            <p className="admin-message">Admins cannot enroll in courses</p>
          )}
        </div>
      </div>
    </section>
  );
}
