 import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getItem, user_is_signin } from "../config/LocalStorageMethods";
import "../style/Home.css";  

export default function Home() {
  const [course, setCourse] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getItem("course")
      .then((res) => setCourse(res ? Object.values(res) : []))
      .catch((err) => console.log(err));

    getItem("quiz")
      .then((res) => {
        const values = res ? Object.values(res) : [];
        setQuiz(values);
        setQuizList(values);
      })
      .catch((err) => console.log(err));

    getItem("EnrolledStudent")
      .then((res) => setEnrolledStudents(res ? Object.values(res) : []))
      .catch((err) => console.log(err));

    user_is_signin()
      .then((user) => setIsLoggedIn(!!user))
      .catch((err) => console.log(err));
  }, []);

  const formatCount = (count) => (!count ? "00" : count < 10 ? `0${count}` : count);

  const handleStartQuiz = (quizKey) => {
    if (!isLoggedIn) {
      alert("You should login first to start the quiz");
      navigate("/landing?mode=login");
      return;
    }
    navigate(`quiz/quiz-level/${quizKey}`);
  };

  return (
    <section className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-left">
          <h1>The Pro Academy</h1>
          <p>Welcome to The Pro Academy. Explore our courses and quizzes to start your journey.</p>
          <button onClick={() => navigate("/course")}>Check Course</button>
        </div>
        <div className="hero-right">
          <div className="hero-image"></div>
        </div>
      </div>

      {/* Short Info */}
      <div className="short-info">
        <div className="info-card">
          <h1 className="heading">Courses</h1>
          <p>All our total courses so far.</p>
          <h1>{formatCount(course.length)}</h1>
        </div>

        <div className="info-card">
          <h1 className="heading">Quiz</h1>
          <p>Total Quiz</p>
          <h1>{formatCount(quiz.length)}</h1>
        </div>

        <div className="info-card">
          <h1 className="heading">Students</h1>
          <p>Total Enrolled Students</p>
          <h1>{formatCount(enrolledStudents.length)}</h1>
        </div>
      </div>

      {/* Courses */}
      <div className="courses">
        <h1 className="section-heading">Course</h1>
        <div className="card-grid">
          {course.length > 0 ? (
            course.map((value, index) => (
              <div
                key={index}
                className="card"
                onClick={() => navigate("course/course-detail", { state: value })}
              >
                {value.image ? (
                  <img src={value.image} alt={value.courseName} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <div className="card-description">
                  <h2>{value.courseName || "Untitled Course"}</h2>
                  <p>Course duration: {value.courseDuration || "N/A"} Month</p>
                  <p>No. of Quiz: {value.noOfQuiz || 0}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>

      {/* Quizzes */}
      <div className="quizzes">
        <h1 className="section-heading">Quiz</h1>
        <div className="card-grid">
          {quizList.length > 0 ? (
            quizList.map((value, index) => (
              <div className="card" key={index}>
                {value.image ? (
                  <img src={value.image} alt={value.category} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <div className="card-description">
                  <h2>{value.category || "Untitled Quiz"}</h2>
                  <p>{value.description || "No description available."}</p>
                  <button onClick={() => handleStartQuiz(value.key)}>Start Quiz</button>
                </div>
              </div>
            ))
          ) : (
            <p>No quizzes available</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-box">
            <div className="logo">
              <h1 onClick={() => navigate("/")}>TPA</h1>
              <p>The Pro Academy</p>
            </div>
          </div>
          <div className="footer-box">
            <h1>Pages</h1>
            <ul>
              <li><Link to="course">Course</Link></li>
              <li><Link to="quiz">Quiz</Link></li>
              <li><Link to="/landing?mode=login">Login</Link></li>
              <li><Link to="/landing?mode=signup">Signup</Link></li>
            </ul>
          </div>
          <div className="footer-box">
            <h1>Registration Form</h1>
            <ul>
              <li><Link to="student-registration-form">Student Registration Form</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <h4>Copyright © 2025 TPA (The Pro Academy) All rights reserved</h4>
          <div
            className="go-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <i className="fa-solid fa-angle-up"></i>
          </div>
        </div>
      </footer>
    </section>
  );
}
