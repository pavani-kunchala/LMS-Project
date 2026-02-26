 // src/screen/course/CourseHome.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../config/LocalStorageMethods";
import "../../style/course.css";  

export default function CourseHome() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getItem("course")
      .then((courses) => {
        const arr = Object.values(courses);
        setData(arr);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="course">
      <div className="course-heading">
        <h1>Course</h1>
      </div>

      <div className="course-box">
        {data && data.length > 0 ? (
          data.map((value, index) => (
            <div
              key={index}
              className="course-card"
              onClick={() => navigate("course-detail", { state: value })}
            >
              {value.image ? (
                <img
                  src={value.image}
                  alt={value.courseName}
                  className="course-image"
                />
              ) : (
                <p className="no-image">No Image</p>
              )}

              <div className="course-description">
                <h1 className="course-title">{value.courseName}</h1>
                <p className="course-duration">
                  Course duration: {value.courseDuration} Month
                </p>
                <p className="course-quiz">No. of Quiz: {value.noOfQuiz}</p>
                {/* optional button */}
                {/* <button className="course-btn">Start Quiz</button> */}
              </div>
            </div>
          ))
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  );
}
