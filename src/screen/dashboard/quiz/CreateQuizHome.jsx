 // src/screen/dashboard/quiz/CreateQuizHome.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../config/LocalStorageMethods";
import "../../../style/createQuizHome.css";

export default function CreateQuizHome() {
  const [currentValue, setCurrentValue] = useState({
    category: "",
    description: "",
  });
  const [flag, setFlag] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);

  const navigate = useNavigate();

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentValue((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFlag("Waiting...");

    uploadImage(image, "category", currentValue, "quiz")
      .then((newId) => {
        setId(newId);
        navigate(`add-level/${newId}`, { state: newId });
        setFlag("");
      })
      .catch((err) => setFlag(err));
  };

  return (
    <section className="create-course">
      <div className="form-heading">
        <h1>Add Quiz</h1>
      </div>

      <form className="course-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="category"
          placeholder="Enter category"
          value={currentValue.category}
          onChange={handleInputChange}
          className="form-input"
        />

        <textarea
          name="description"
          placeholder="Enter description"
          value={currentValue.description}
          onChange={handleInputChange}
          className="form-textarea"
        />

        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-file"
        />

        <button type="submit" className="form-btn">
          {flag || "Add Category"}
        </button>
      </form>
    </section>
  );
}
