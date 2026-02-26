 // src/screen/Public-Quiz/DisplayQuiz.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../style/displayQuiz.css";  

export default function DisplayQuiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [count, setCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (location.state) {
      setData(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    if (quizFinished) return;
    if (timeLeft === 0) {
      nextQuestion();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizFinished]);

  const nextQuestion = () => {
    if (selectedAnswer === data.questions[count].answer) {
      setScore((prev) => prev + 1);
    }
    setSelectedAnswer(null);

    if (count < data.questions.length - 1) {
      setCount((prev) => prev + 1);
      setTimeLeft(60);
    } else {
      setQuizFinished(true);
    }
  };

  const checkAnswer = (option) => setSelectedAnswer(option);

  const startOver = () => {
    setCount(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
    setTimeLeft(60);
  };

  const percentage =
    data.totalQuestion > 0 ? (score / data.totalQuestion) * 100 : 0;

  return (
    <section className="displayQuiz">
      {!quizFinished ? (
        <>
          <div className="quiz-heading">
            <h1>Quiz is Started</h1>
            <p className="quiz-timer">⏱ Time Left: {timeLeft}s</p>
          </div>

          <div className="quiz-form">
            <div className="quiz-questions">
              <div className="quiz-question">
                <p>
                  Q#{count + 1}: {data?.questions?.[count]?.question}?
                </p>
              </div>
              <div className="quiz-options">
                <ul>
                  {data?.questions?.[count]?.option.map((option, index) => (
                    <li
                      key={index}
                      className={`quiz-option ${
                        selectedAnswer === option ? "selected" : ""
                      }`}
                      onClick={() => checkAnswer(option)}
                    >
                      {index + 1}: {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="next-btn"
              onClick={nextQuestion}
              disabled={!selectedAnswer && timeLeft > 0}
            >
              Next Question
            </button>
          </div>
        </>
      ) : (
        <div className="quiz-result">
          <div className="quiz-heading">
            <h1>Well Played 🤗</h1>
            <p>Let's check your result.</p>
          </div>
          <div className="quiz-result-body">
            <h2>Result</h2>
            <h4>
              Total Questions:{" "}
              <span>{String(data.totalQuestion).padStart(2, "0")}</span>
            </h4>
            <h4>
              Total Marks: <span>{String(data.totalMark).padStart(2, "0")}</span>
            </h4>
            <h4>
              Your Marks:{" "}
              <span>
                {(
                  (Number(data.totalMark) / data.totalQuestion) *
                  score
                ).toFixed(0)}
              </span>
            </h4>
            <h4>
              Wrong:{" "}
              <span>{String(data.totalQuestion - score).padStart(2, "0")}</span>
            </h4>
            <h4>
              Correct: <span>{String(score).padStart(2, "0")}</span>
            </h4>

            <h3
              className={`quiz-status ${
                percentage >= 60 ? "passed" : "failed"
              }`}
            >
              {percentage >= 60 ? "🎉 You Passed!" : "❌ You Failed!"}
            </h3>

            <button className="retake-btn" onClick={startOver}>
              Retake Quiz
            </button>
            <button className="goto-btn" onClick={() => navigate("/quiz")}>
              Go to Quiz
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
