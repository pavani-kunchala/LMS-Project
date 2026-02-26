import { useNavigate } from "react-router-dom";
 
import "../style/error.css";

export default function Error() {
  let navigate = useNavigate();

  return (
    <section className="error">
      <h1>Oops!</h1>
      <h4>Error 404-Page Not Found</h4>
      <p>The page you requested could not be found.</p>
      <p>
        We're working on it{" "}
        <span style={{ color: "#6c63ff", fontWeight: "bold" }}>:)</span>
      </p>
       

      <button onClick={() => navigate("/")}>Go To Home</button>
    </section>
  );
}
