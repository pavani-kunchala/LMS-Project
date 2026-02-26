 // src/screen/course/Course.jsx
import { Outlet } from "react-router-dom";

export default function Course() {
  return (
    <section>
      <Outlet /> {/* ✅ Required for nested routes */}
    </section>
  );
}
