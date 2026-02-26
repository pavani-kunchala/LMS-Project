import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updateItem } from "../../../config/LocalStorageMethods"; // localStorage methods

export default function UpdateEnrolledStudent() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    course: "",
    key: "",
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setData(location.state);
    }
  }, [location.state]);

  const currentV = (e) => {
    const { value, name } = e.target;
    setData((val) => ({ ...val, [name]: value }));
  };

  const userInfo = (e) => {
    e.preventDefault();
    updateItem(data, "EnrolledStudent", data.key)
      .then(() => {
        alert("Student updated successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="UpdateEnrolledStudent">
      <div className="heading">
        <h1>Update Enrolled Student</h1>
      </div>

      <form onSubmit={userInfo}>
        <input
          type="text"
          placeholder="Enter first name"
          name="firstName"
          value={data.firstName}
          onChange={currentV}
        />
        <input
          type="text"
          placeholder="Enter last name"
          name="lastName"
          value={data.lastName}
          onChange={currentV}
        />
        <input
          type="email"
          placeholder="Student email"
          name="email"
          value={data.email}
          onChange={currentV}
        />
        <input
          type="number"
          placeholder="Enter contact number"
          name="contact"
          value={data.contact}
          onChange={currentV}
        />
        <input
          type="text"
          name="course"
          placeholder="Course name"
          value={data.course}
          onChange={currentV}
        />

        <button type="submit">Update</button>
      </form>
    </section>
  );
}
