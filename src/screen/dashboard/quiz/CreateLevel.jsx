 // src/screen/Public-Quiz/CreateLevel.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import LevelForm from "./LevelForm";
import "../../../style/createLevel.css";  

export default function CreateLevel() {
  const { id } = useParams();

  const [currentQuestion1, setCurrentQuestion1] = useState({ question: "", answer: "" });
  const [currentQuestion2, setCurrentQuestion2] = useState({ question: "", answer: "" });
  const [currentQuestion3, setCurrentQuestion3] = useState({ question: "", answer: "" });

  const onQuestionField1 = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion1((prev) => ({ ...prev, [name]: value }));
  };
  const onQuestionField2 = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion2((prev) => ({ ...prev, [name]: value }));
  };
  const onQuestionField3 = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion3((prev) => ({ ...prev, [name]: value }));
  };

  const [level1, setLevel1] = useState({});
  const [level2, setLevel2] = useState({});
  const [level3, setLevel3] = useState({});
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);

  const [optionValue, setOptionValue] = useState("");
  const [optionValue1, setOptionValue1] = useState("");
  const [optionValue2, setOptionValue2] = useState("");

  const [question1AddOption, setQuestion1AddOption] = useState([]);
  const [question2AddOption, setQuestion2AddOption] = useState([]);
  const [question3AddOption, setQuestion3AddOption] = useState([]);

  const [totalQuestion, setTotalQuestion] = useState([]);
  const [totalQuestion1, setTotalQuestion1] = useState([]);
  const [totalQuestion2, setTotalQuestion2] = useState([]);

  const basicLevel = (e) => {
    e.preventDefault();
    const totalQ = totalQuestion.length;
    const levelObj = {
      ...level1,
      name: "Basic Level",
      totalQuestion: totalQ,
      totalTime: totalQ * 1,
      totalMark: totalQ,
      questions: totalQuestion,
    };
    setLevel1(levelObj);
    setFlag1(true);
    alert(`Basic Level locked! Total Time: ${levelObj.totalTime} minutes`);
  };

  const intermediateLevel = (e) => {
    e.preventDefault();
    const totalQ = totalQuestion1.length;
    const levelObj = {
      ...level2,
      name: "Intermediate Level",
      totalQuestion: totalQ,
      totalTime: totalQ * 1,
      totalMark: totalQ,
      questions: totalQuestion1,
    };
    setLevel2(levelObj);
    setFlag2(true);
    alert(`Intermediate Level locked! Total Time: ${levelObj.totalTime} minutes`);
  };

  const advanceLevel = (e) => {
    e.preventDefault();
    const totalQ = totalQuestion2.length;
    const levelObj = {
      ...level3,
      name: "Advance Level",
      totalQuestion: totalQ,
      totalTime: totalQ * 1,
      totalMark: totalQ,
      questions: totalQuestion2,
    };
    setLevel3(levelObj);
    setFlag3(true);
    alert(`Advance Level locked! Total Time: ${levelObj.totalTime} minutes`);
  };

  const completeData = () => {
    if (!flag1 || !flag2 || !flag3) {
      alert("Lock all three levels first.");
      return;
    }
    try {
      const quizStore = JSON.parse(localStorage.getItem("quiz")) || {};
      if (!quizStore[id]) {
        alert("Quiz not found. Please create category first.");
        return;
      }
      const updated = {
        ...quizStore[id],
        levels: { level01: level1, level02: level2, level03: level3 },
      };
      quizStore[id] = updated;
      localStorage.setItem("quiz", JSON.stringify(quizStore));
      alert("All levels saved!");
    } catch (err) {
      console.log(err);
      alert("Error saving levels");
    }
  };

  return (
    <section className="add-level">
      <h1 className="main-heading">Add Levels to Quiz</h1>

      <LevelForm
        levelName="Basic Level"
        flag={flag1}
        levelState={level1}
        setLevelState={setLevel1}
        optionValue={optionValue}
        setOptionValue={setOptionValue}
        options={question1AddOption}
        setOptions={setQuestion1AddOption}
        questions={totalQuestion}
        setQuestions={setTotalQuestion}
        onSubmit={basicLevel}
        currentQuestion={currentQuestion1}
        setCurrentQuestion={setCurrentQuestion1}
        onQuestionField={onQuestionField1}
      />

      <LevelForm
        levelName="Intermediate Level"
        flag={flag2}
        levelState={level2}
        setLevelState={setLevel2}
        optionValue={optionValue1}
        setOptionValue={setOptionValue1}
        options={question2AddOption}
        setOptions={setQuestion2AddOption}
        questions={totalQuestion1}
        setQuestions={setTotalQuestion1}
        onSubmit={intermediateLevel}
        currentQuestion={currentQuestion2}
        setCurrentQuestion={setCurrentQuestion2}
        onQuestionField={onQuestionField2}
      />

      <LevelForm
        levelName="Advance Level"
        flag={flag3}
        levelState={level3}
        setLevelState={setLevel3}
        optionValue={optionValue2}
        setOptionValue={setOptionValue2}
        options={question3AddOption}
        setOptions={setQuestion3AddOption}
        questions={totalQuestion2}
        setQuestions={setTotalQuestion2}
        onSubmit={advanceLevel}
        currentQuestion={currentQuestion3}
        setCurrentQuestion={setCurrentQuestion3}
        onQuestionField={onQuestionField3}
      />

      <div className="final-actions">
        <button type="button" className="save-btn" onClick={completeData}>
          Save All Levels
        </button>
      </div>
    </section>
  );
}
