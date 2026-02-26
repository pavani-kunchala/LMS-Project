//src\screen\dashboard\quiz\LevelForm.jsx
import React from "react";

export default function LevelForm({
  levelName,
  flag,
  levelState,
  setLevelState,
  optionValue,
  setOptionValue,
  options,
  setOptions,
  questions,
  setQuestions,
  onSubmit,
  currentQuestion,
  setCurrentQuestion,
  onQuestionField,
}) {
  // Add option
  const addOption = () => {
    if (!optionValue.trim()) return;
    setOptions((prev) => [...prev, optionValue.trim()]);
    setOptionValue("");
  };

  // Add question
  const addQuestion = () => {
    if (!currentQuestion.question.trim() || !currentQuestion.answer.trim()) {
      alert("Enter question and correct answer");
      return;
    }
    const qObj = { ...currentQuestion, option: [...options] };
    setQuestions((prev) => [...prev, qObj]);
    setCurrentQuestion({ question: "", answer: "" });
    setOptions([]);
  };

  // Handle level config inputs
  const handleLevelInput = (e) => {
    const { name, value } = e.target;
    setLevelState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="level-form">
      <div className="heading">
        <h3>{levelName}</h3>
      </div>

      {/* Question Add Form */}
      <form>
        <input
          type="text"
          placeholder="Enter question"
          name="question"
          value={currentQuestion.question}
          onChange={onQuestionField}
          disabled={flag}
        />
        <input
          type="text"
          placeholder="Enter correct answer"
          name="answer"
          value={currentQuestion.answer}
          onChange={onQuestionField}
          disabled={flag}
        />
        <br />

        {/* Options */}
        <div className="displayQuestion">
          <ul>
            {options.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>

        <input
          type="text"
          placeholder="Enter option"
          value={optionValue}
          onChange={(e) => setOptionValue(e.target.value)}
          disabled={flag}
        />
        <button type="button" onClick={addOption} disabled={flag}>
          Add Option
        </button>

        <div className="buttons">
          <button type="button" onClick={addQuestion} disabled={flag}>
            Add Question
          </button>
        </div>

        {/* Questions List */}
        <ul>
          {questions.map((value, index) => (
            <li key={index}>
              <p>{value.question}</p>
              <p>{value.answer}</p>
              <ul>
                {(value.option || []).map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </form>

      {/* Level Config Form */}
      <form onSubmit={onSubmit}>
        <input
          type="number"
          placeholder="How many questions"
          name="totalQuestion"
          value={levelState.totalQuestion}
          onChange={handleLevelInput}
          disabled={flag}
        />
         
        <button type="submit" disabled={flag}>Add</button>
      </form>
    </div>
  );
}
