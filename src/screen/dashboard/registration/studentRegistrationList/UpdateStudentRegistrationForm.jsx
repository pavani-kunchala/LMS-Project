import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SMDropDown from "../../../../components/SMDropDown";
import SMInput from "../../../../components/SMInput";
import { getItem, updateItem } from "../../../../config/LocalStorageMethods"; // localStorage methods

export default function UpdateStudentRegistrationForm() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    course: "",
    key: "",
  });

  const [course, setCourse] = useState([]);

  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    getItem("Section&Course")
      .then((res) => {
        if (res) {
          setCourse(res.courseList || []);
        }
      })
      .catch((err) => console.log(err));

    if (data) {
      setUserInfo(data);
    }
  }, [data]);

  const currentV = (e) => {
    const { value, name } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const userData = (e) => {
    e.preventDefault();
    updateItem(userInfo, "StudentRegistration", userInfo.key)
      .then(() => {
        alert("Successfully updated");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="update-student-registration-form">
      <div className="heading">
        <h1>Update Student Registration Form</h1>
      </div>

      <form onSubmit={userData}>
        <div className="takeValue">
          <SMInput
            type="text"
            name="firstName"
            fnName={currentV}
            placeholder="Enter first name"
            condition={true}
            value={userInfo.firstName}
          />
          <SMInput
            type="text"
            name="lastName"
            fnName={currentV}
            placeholder="Enter last name"
            value={userInfo.lastName}
          />
          <SMInput
            type="email"
            name="email"
            fnName={currentV}
            placeholder="Enter email"
            condition={true}
            value={userInfo.email}
          />
          <SMInput
            type="number"
            placeholder="Enter contact number"
            name="contact"
            fnName={currentV}
            condition={true}
            value={userInfo.contact}
          />
          <SMDropDown
            option={course.length > 0 ? course : ["not available"]}
            name="course"
            fnName={currentV}
            condition={true}
            value={userInfo.course}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </section>
  );
}
