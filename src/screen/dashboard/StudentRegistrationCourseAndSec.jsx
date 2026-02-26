 // src/screen/dashboard/StudentRegistrationCourseAndSec.jsx
import { useEffect, useState } from "react";
import { addItemWithoutKey, getItem } from "../../config/LocalStorageMethods";
import "../../style/studentRegistrationCourseAndSec.css";  

export default function StudentRegistrationCourseAndSec() {
  const [currentCourse, setCurrentCourse] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [waiting, setWaiting] = useState("");

  useEffect(() => {
    getItem("Section&Course")
      .then((res) => {
        if (res) {
          setCourseList(res.courseList || []);
        } else {
          setCourseList([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const addCourse = () => {
    if (currentCourse.trim()) {
      setCourseList((prev) => [...prev, currentCourse.trim()]);
      setCurrentCourse("");
    }
  };

  const deleteCourse = (index) => {
    setCourseList((prev) => prev.filter((_, i) => i !== index));
  };

  const submitData = () => {
    setWaiting("waiting...");
    addItemWithoutKey({ courseList }, "Section&Course")
      .then((msg) => {
        alert("Course list updated successfully");
        console.log(msg);
        setWaiting("");
      })
      .catch((err) => {
        alert("Error saving data");
        console.log(err);
        setWaiting("");
      });
  };

  return (
    <section className="course-control">
      <h1 className="course-heading">Student Registration Form: Course Control</h1>

      {/* Course List */}
      {courseList.length > 0 && (
        <ul className="course-list">
          {courseList.map((course, index) => (
            <li key={index} className="course-item">
              {course}
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteCourse(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <input
        type="text"
        placeholder="Add course"
        name="course"
        value={currentCourse}
        onChange={(e) => setCurrentCourse(e.target.value)}
        className="course-input"
      />
      <button type="button" className="primary-btn" onClick={addCourse}>
        Add Course
      </button>

      <hr className="divider" />

      {waiting ? (
        <button className="primary-btn" disabled>{waiting}</button>
      ) : (
        <button type="button" className="primary-btn" onClick={submitData}>
          Submit
        </button>
      )}
    </section>
  );
}
