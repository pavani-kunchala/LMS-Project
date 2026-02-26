 // src/screen/dashboard/registration/studentRegistrationList/StudentRegistrationListHome.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getItem, addItem } from "../../../../config/LocalStorageMethods"; // localStorage methods

export default function StudentRegistrationListHome() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getItem("StudentRegistration")
      .then((res) => {
        if (res) {
          setData(Object.values(res));
        } else {
          setData([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const updateStudentRegistrationForm = (value) => {
    navigate("update-student-registration-form", { state: value });
  };

  const deleteStudentRegistration = (value, index) => {
    deleteItem("StudentRegistration", value.key)
      .then((msg) => {
        console.log(msg);
        setData((prev) => prev.filter((_, i) => i !== index));
      })
      .catch((err) => console.log(err));
  };

  // ✅ Enroll student with simplified fields
  const enrollStudent = (value, index) => {
    const enrolledData = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      contact: value.contact,
      course: value.course,
      isApproved: "yes",
      active: "yes",
    };

    addItem(enrolledData, "EnrolledStudent")
      .then(() => {
        alert(`${value.firstName} ${value.lastName} enrolled successfully`);
        deleteStudentRegistration(value, index);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section style={{ padding: "10px", width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h2 style={{ fontSize: "18px" }}>Student Registration List</h2>
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
            border: "2px solid black",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "6px" }}>First Name</th>
              <th style={{ border: "1px solid #ddd", padding: "6px" }}>Last Name</th>
              <th style={{ border: "1px solid #ddd", padding: "6px" }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: "6px" }}>Contact</th>
              <th style={{ border: "1px solid #ddd", padding: "6px" }}>Course</th>
              <th style={{ border: "1px solid #ddd", padding: "6px" }}>Delete</th>
              <th style={{ border: "1px solid #ddd", padding: "6px" }}>Update</th>
              <th style={{ border: "1px solid #ddd", padding: "6px" }}>Enroll</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((value, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "6px" }}>{value.firstName || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "6px" }}>{value.lastName || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "6px" }}>{value.email || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "6px" }}>{value.contact || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "6px" }}>{value.course || "-"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "6px" }}>
                    <button
                      onClick={() => deleteStudentRegistration(value, index)}
                      style={{
                        padding: "2px 6px",
                        fontSize: "11px",
                        backgroundColor: "#ff4d4d",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Del
                    </button>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "6px" }}>
                    <button
                      onClick={() => updateStudentRegistrationForm(value)}
                      style={{
                        padding: "2px 6px",
                        fontSize: "11px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Upd
                    </button>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "6px" }}>
                    <button
                      onClick={() => enrollStudent(value, index)}
                      style={{
                        padding: "2px 6px",
                        fontSize: "11px",
                        backgroundColor: "#2196F3",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Enroll
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "8px" }}>
                  No student registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
