 import { useEffect, useState } from "react";
import SMDropDown from "../../components/SMDropDown";
import SMInput from "../../components/SMInput";
import { addItem, getItem } from "../../config/LocalStorageMethods";

import "../../style/studentRegisterForm.css";  

export default function StudentRegisterForm() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    course: "",
  });

  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState([]);

  useEffect(() => {
    getItem("Section&Course")
      .then((res) => {
        if (res) {
          setCourse(res.courseList || []);
        } else {
          setCourse([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const currentV = (e) => {
    const { value, name } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  // 🔍 Validation logic
  const validateForm = () => {
    let newErrors = {};

    if (!userInfo.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!userInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!userInfo.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(userInfo.contact)) {
      newErrors.contact = "Contact must be 10 digits";
    }
    if (!userInfo.course.trim()) {
      newErrors.course = "Please select a course";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const userData = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // stop submission if invalid
    }

    const date = new Date();
    const updatedUser = {
      ...userInfo,
      registrationDate: date.toLocaleDateString(),
      registrationYear: String(date.getFullYear()),
      isFeeSubmited: "no",
      isApproved: "no",
      active: "no",
    };

    addItem(updatedUser, "StudentRegistration")
      .then(() => {
        alert("Successfully registered");
        setUserInfo({
          firstName: "",
          lastName: "",
          email: "",
          contact: "",
          course: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="register-form">
      <h1 className="form-heading">Public Student Register Form 👨‍🎓👩‍🎓</h1>

       <form className="form-body" onSubmit={userData}>
  <div className="form-fields">
    <SMInput
      type="text"
      name="firstName"
      fnName={currentV}
      placeholder="Enter your first name"
      value={userInfo.firstName}
    />
    {errors.firstName && <p className="error">{errors.firstName}</p>}  {/* inline error */}

    <SMInput
      type="text"
      name="lastName"
      fnName={currentV}
      placeholder="Enter your last name"
      value={userInfo.lastName}
    />
    {errors.lastName && <p className="error">{errors.lastName}</p>}  {/* inline error */}

    <SMInput
      type="email"
      name="email"
      fnName={currentV}
      placeholder="Enter your email"
      value={userInfo.email}
    />
    {errors.email && <p className="error">{errors.email}</p>}  {/* inline error */}

    <SMInput
      type="number"
      name="contact"
      fnName={currentV}
      placeholder="Enter your contact number"
      value={userInfo.contact}
    />
    {errors.contact && <p className="error">{errors.contact}</p>}  {/* inline error */}

    <SMDropDown
      option={course.length > 0 ? course : ["not available"]}
      name="course"
      fnName={currentV}
      value={userInfo.course}
    />
    {errors.course && <p className="error">{errors.course}</p>}  {/* inline error */}
  </div>

  <div className="form-actions">
    <button type="submit" className="submit-btn">Submit</button>
  </div>
</form>

    </section>
  );
}
