 // src/screen/Public-Quiz/QuizLevel.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem } from "../../config/LocalStorageMethods";

import "../../style/quizLevel.css";  

export default function QuizLevel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [levels, setLevels] = useState({});

  useEffect(() => {
    getItem("quiz")
      .then((res) => {
        if (res && res[id] && res[id].levels) {
          setLevels(res[id].levels);
        } else {
          setLevels({});
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const renderLevelBox = (level, keyName) => {
    if (!level) return null;
    return (
      <div className="level-card" key={keyName}>
        <div className="level-description">
          <h2>{level.name || "Untitled Level"}</h2>
          <p>
            Total Question:{" "}
            <span className="highlight">
              {String(level.totalQuestion).padStart(2, "0")}
            </span>
          </p>
          <p>
            Total Mark:{" "}
            <span className="highlight">
              {String(level.totalMark).padStart(2, "0")}
            </span>
          </p>
          <p>
            Total Time:{" "}
            <span className="highlight">
              {String(level.totalTime).padStart(2, "0")}
            </span>
          </p>
          <button
            className="start-btn"
            onClick={() =>
              navigate("/quiz/display-quiz", {
                state: level,
              })
            }
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="quiz-level">
      <h1 className="quiz-heading">Quiz Level</h1>

      {levels && Object.keys(levels).length > 0 ? (
        <div className="level-grid">
          {renderLevelBox(levels.level01, "level01")}
          {renderLevelBox(levels.level02, "level02")}
          {renderLevelBox(levels.level03, "level03")}
        </div>
      ) : (
        <p className="no-data">No levels available for this quiz.</p>
      )}
    </section>
  );
}
