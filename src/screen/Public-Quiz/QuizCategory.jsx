 // src/screen/Public-Quiz/QuizCategory.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getItem, user_is_signin } from "../../config/LocalStorageMethods"; // ✅ include user_is_signin
import "../../style/quizCategory.css";

export default function QuizCategory() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ track login state
  const navigate = useNavigate();

  useEffect(() => {
    getItem("quiz")
      .then((res) => {
        if (res) {
          // Convert object to array with key included
          const quizzes = Object.entries(res).map(([key, value]) => ({
            key,
            ...value,
          }));
          setData(quizzes);
        } else {
          setData([]);
        }
      })
      .catch((err) => console.log(err));

    // ✅ Check login status
    user_is_signin()
      .then((user) => {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ Start quiz handler
  const handleStartQuiz = (quizKey) => {
    if (!isLoggedIn) {
      alert("You should login first to start the quiz");
      navigate("/landing?mode=login");
      return;
    }
    navigate(`/quiz/quiz-level/${quizKey}`);
  };

  return (
    <section className="quizCategory">
      <div className="heading">
        <h1>Quiz Category</h1>
      </div>

      <div className="box">
        {data && data.length > 0 ? (
          data.map((value, index) => (
            <div className="box1" key={index}>
              {value.image ? (
                <img src={value.image} alt={value.category} width="300px" />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
              <div className="description">
                <h1>{value.category || "Untitled Quiz"}</h1>
                <p>{value.description || "No description available."}</p>

                {/* ✅ Use login check before navigating */}
                <button onClick={() => handleStartQuiz(value.key)}>
                  Start Quiz
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No quizzes available. Please add a quiz first.</p>
        )}
      </div>
    </section>
  );
}
