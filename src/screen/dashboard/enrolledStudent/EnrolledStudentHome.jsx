 // src/screen/dashboard/enrolledStudent/EnrolledStudentHome.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getItem } from "../../../config/LocalStorageMethods";
import  "../../../style/EnrolledStudentHome.css";

export default function EnrolledStudentHome() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getItem("EnrolledStudent")
      .then((students) => {
        if (students) {
          setData(Object.values(students));
        } else {
          setData([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteItem12 = (value, index) => {
    deleteItem("EnrolledStudent", value.key)
      .then((msg) => {
        console.log(msg);
        setData((val) => val.filter((_, inx) => inx !== index));
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="enrolled-section">
      <div className="enrolled-header">
        <h2>Enrolled Student List</h2>
      </div>

      <div className="enrolled-table-wrapper">
        <table className="enrolled-table">
          <thead>
            <tr>
              {[
                "S.No",
                "First Name",
                "Last Name",
                "Email",
                "Contact",
                "Course",
                "Delete",
                "Update",
              ].map((heading, i) => (
                <th key={i} className="enrolled-th">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((value, index) => (
                <tr key={index}>
                  <td className="enrolled-td">{index + 1}</td>
                  <td className="enrolled-td">{value.firstName || "-"}</td>
                  <td className="enrolled-td">{value.lastName || "-"}</td>
                  <td className="enrolled-td">{value.email || "-"}</td>
                  <td className="enrolled-td">{value.contact || "-"}</td>
                  <td className="enrolled-td">{value.course || "-"}</td>
                  <td className="enrolled-td">
                    <button
                      onClick={() => deleteItem12(value, index)}
                      className="btn-delete"
                    >
                      Del
                    </button>
                  </td>
                  <td className="enrolled-td">
                    <button
                      onClick={() =>
                        navigate("update-enrolled-student", { state: value })
                      }
                      className="btn-update"
                    >
                      Upd
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No enrolled students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
