// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 
// // components
// import Boilerplate from "./components/Boilerplate";
// import Home from "./screen/Home";
// import Login from "./screen/authentication/Login";
// import SignUp from "./screen/authentication/SignUp";
// import Landing from "./screen/authentication/Landing";
// import Error from "./components/Error";
 
// // course
// import Course from "./screen/course/Course";
// import CourseHome from "./screen/course/CourseHome";
// import CourseDetail from "./screen/course/CourseDetail";
// import CourseList from "./screen/dashboard/course/CourseList";
// import CourseListHome from "./screen/dashboard/course/CourseListHome";
// import CourseUpdate from "./screen/dashboard/course/CourseUpdate";
// import CreateCourse from "./screen/dashboard/course/CreateCourse";
// // import CourseTopics from "./screen/course/CourseTopics";
// // import CourseTopics from "./screen/course/CourseTopics";

 
// // quiz
// import Quiz from "./screen/Public-Quiz/Quiz";
// import QuizCategory from "./screen/Public-Quiz/QuizCategory";
// import QuizLevel from "./screen/Public-Quiz/QuizLevel";
// import DisplayQuiz from "./screen/Public-Quiz/DisplayQuiz";
// import CreateQuiz from "./screen/dashboard/quiz/CreateQuiz";
// import CreateQuizHome from "./screen/dashboard/quiz/CreateQuizHome";
// import CreateLevel from "./screen/dashboard/quiz/CreateLevel";
 
// // registration
// import StudentRegisterForm from "./screen/public-registration-form/StudentRegisterForm";
// import StudentRegistrationList from "./screen/dashboard/registration/studentRegistrationList/StudentRegistrationList";
// import StudentRegistrationListHome from "./screen/dashboard/registration/studentRegistrationList/StudentRegistrationListHome";
// import UpdateStudentRegistrationForm from "./screen/dashboard/registration/studentRegistrationList/UpdateStudentRegistrationForm";
// import StudentRegistrationCourseAndSec from "./screen/dashboard/StudentRegistrationCourseAndSec";
 
 
 
// // enrolled student
// import EnrolledStudent from "./screen/dashboard/enrolledStudent/EnrolledStudent";
// import EnrolledStudentHome from "./screen/dashboard/enrolledStudent/EnrolledStudentHome";
// import UpdateEnrolledStudent from "./screen/dashboard/enrolledStudent/UpdateEnrolledStudent";
 
// // dashboard
// import Dashboard from "./screen/dashboard/Dashboard";
// import DashboardHome from "./screen/dashboard/DashboardHome";
// import UserProfile from "./screen/dashboard/UserProfile";
 
// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Boilerplate />}>
//           <Route index element={<Home />} />
//           <Route path="login" element={<Login />} />
//            <Route path="signup" element={<SignUp role="user" />} />
//            <Route path="admin-signup" element={<SignUp role="admin" />} />
 
//           <Route path="landing" element={<Landing />} />
 
//           {/* Course */}
//           <Route path="course" element={<Course />}>
//           <Route index element={<CourseHome />} />
//          <Route path="course-detail" element={<CourseDetail />} />
//            {/* <Route path="coursetopics" element={<CourseTopics />} /> ✅ keep this */}
//              </Route>
             
 
//           {/* Quiz */}
//           <Route path="quiz" element={<Quiz />}>
//             <Route index element={<QuizCategory />} />
//             <Route path="quiz-level/:id" element={<QuizLevel />} />
//             <Route path="display-quiz" element={<DisplayQuiz />} />
//           </Route>
 
//           {/* Public Registration */}
//           <Route path="student-registration-form" element={<StudentRegisterForm />} />
 
//           {/* Dashboard */}
//           <Route path="dashboard" element={<Dashboard />}>
//             <Route index element={<DashboardHome />} />
 
//             {/* ✅ Add user profile detail route */}
//             <Route path="user-profile" element={<UserProfile />} />
 
//             <Route path="create-course" element={<CreateCourse />} />
 
//             <Route path="create-quiz" element={<CreateQuiz />}>
//               <Route index element={<CreateQuizHome />} />
//               <Route path="add-level/:id" element={<CreateLevel />} />
//             </Route>
 
//             <Route path="course-list" element={<CourseList />}>
//               <Route index element={<CourseListHome />} />
//               <Route path="course-update" element={<CourseUpdate />} />
//             </Route>
 
//             <Route path="student-registration-list" element={<StudentRegistrationList />}>
//               <Route index element={<StudentRegistrationListHome />} />
//               <Route path="update-student-registration-form" element={<UpdateStudentRegistrationForm />} />
//             </Route>
 
             
//             <Route path="student-registration-form-course-and-sec-control" element={<StudentRegistrationCourseAndSec />} />
 
           
 
//             <Route path="enrolled-student" element={<EnrolledStudent />}>
//               <Route index element={<EnrolledStudentHome />} />
//               <Route path="update-enrolled-student" element={<UpdateEnrolledStudent />} />
//             </Route>
 
           
//           </Route>
 
         
 
//           {/* Error fallback */}
//           <Route path="*" element={<Error />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// // components
// import Boilerplate from "./components/Boilerplate";
// import Home from "./screen/Home";
// import Login from "./screen/authentication/Login";
// import SignUp from "./screen/authentication/SignUp";
// import Landing from "./screen/authentication/Landing";
// import Error from "./components/Error";

// // course
// import Course from "./screen/course/Course";
// import CourseHome from "./screen/course/CourseHome";
// import CourseDetail from "./screen/course/CourseDetail";
// import CourseTopics from "./screen/course/CourseTopics"; // ✅ new import
// import CourseList from "./screen/dashboard/course/CourseList";
// import CourseListHome from "./screen/dashboard/course/CourseListHome";
// import CourseUpdate from "./screen/dashboard/course/CourseUpdate";
// import CreateCourse from "./screen/dashboard/course/CreateCourse";

// // quiz
// import Quiz from "./screen/Public-Quiz/Quiz";
// import QuizCategory from "./screen/Public-Quiz/QuizCategory";
// import QuizLevel from "./screen/Public-Quiz/QuizLevel";
// import DisplayQuiz from "./screen/Public-Quiz/DisplayQuiz";
// import CreateQuiz from "./screen/dashboard/quiz/CreateQuiz";
// import CreateQuizHome from "./screen/dashboard/quiz/CreateQuizHome";
// import CreateLevel from "./screen/dashboard/quiz/CreateLevel";

// // registration
// import StudentRegisterForm from "./screen/public-registration-form/StudentRegisterForm";
// import StudentRegistrationList from "./screen/dashboard/registration/studentRegistrationList/StudentRegistrationList";
// import StudentRegistrationListHome from "./screen/dashboard/registration/studentRegistrationList/StudentRegistrationListHome";
// import UpdateStudentRegistrationForm from "./screen/dashboard/registration/studentRegistrationList/UpdateStudentRegistrationForm";
// import StudentRegistrationCourseAndSec from "./screen/dashboard/StudentRegistrationCourseAndSec";

// // enrolled student
// import EnrolledStudent from "./screen/dashboard/enrolledStudent/EnrolledStudent";
// import EnrolledStudentHome from "./screen/dashboard/enrolledStudent/EnrolledStudentHome";
// import UpdateEnrolledStudent from "./screen/dashboard/enrolledStudent/UpdateEnrolledStudent";

// // dashboard
// import Dashboard from "./screen/dashboard/Dashboard";
// import DashboardHome from "./screen/dashboard/DashboardHome";
// import UserProfile from "./screen/dashboard/UserProfile";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Boilerplate />}>
//           <Route index element={<Home />} />
//           <Route path="login" element={<Login />} />
//           <Route path="signup" element={<SignUp role="user" />} />
//           <Route path="admin-signup" element={<SignUp role="admin" />} />
//           <Route path="landing" element={<Landing />} />

//           {/* Course */}
//           <Route path="course" element={<Course />}>
//             <Route index element={<CourseHome />} />
//             <Route path="course-detail" element={<CourseDetail />} />
//             <Route path="course-topics" element={<CourseTopics />} /> {/* ✅ new route */}
//           </Route>

//           {/* Quiz */}
//           <Route path="quiz" element={<Quiz />}>
//             <Route index element={<QuizCategory />} />
//             <Route path="quiz-level/:id" element={<QuizLevel />} />
//             <Route path="display-quiz" element={<DisplayQuiz />} />
//           </Route>

//           {/* Public Registration */}
//           <Route path="student-registration-form" element={<StudentRegisterForm />} />

//           {/* Dashboard */}
//           <Route path="dashboard" element={<Dashboard />}>
//             <Route index element={<DashboardHome />} />
//             <Route path="user-profile" element={<UserProfile />} />
//             <Route path="create-course" element={<CreateCourse />} />

//             <Route path="create-quiz" element={<CreateQuiz />}>
//               <Route index element={<CreateQuizHome />} />
//               <Route path="add-level/:id" element={<CreateLevel />} />
//             </Route>

//             <Route path="course-list" element={<CourseList />}>
//               <Route index element={<CourseListHome />} />
//               <Route path="course-update" element={<CourseUpdate />} />
//             </Route>

//             <Route path="student-registration-list" element={<StudentRegistrationList />}>
//               <Route index element={<StudentRegistrationListHome />} />
//               <Route path="update-student-registration-form" element={<UpdateStudentRegistrationForm />} />
//             </Route>

//             <Route path="student-registration-form-course-and-sec-control" element={<StudentRegistrationCourseAndSec />} />

//             <Route path="enrolled-student" element={<EnrolledStudent />}>
//               <Route index element={<EnrolledStudentHome />} />
//               <Route path="update-enrolled-student" element={<UpdateEnrolledStudent />} />
//             </Route>
//           </Route>

//           {/* Error fallback */}
//           <Route path="*" element={<Error />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import Boilerplate from "./components/Boilerplate";
import Home from "./screen/Home";
import Login from "./screen/authentication/Login";
import SignUp from "./screen/authentication/SignUp";
import Landing from "./screen/authentication/Landing";
import Error from "./components/Error";

// course
import Course from "./screen/course/Course";
import CourseHome from "./screen/course/CourseHome";
import CourseDetail from "./screen/course/CourseDetail";
// import CourseTopics from "./screen/course/CourseTopics"; // ✅ import
import CourseList from "./screen/dashboard/course/CourseList";
import CourseListHome from "./screen/dashboard/course/CourseListHome";
import CourseUpdate from "./screen/dashboard/course/CourseUpdate";
import CreateCourse from "./screen/dashboard/course/CreateCourse";

// quiz
import Quiz from "./screen/Public-Quiz/Quiz";
import QuizCategory from "./screen/Public-Quiz/QuizCategory";
import QuizLevel from "./screen/Public-Quiz/QuizLevel";
import DisplayQuiz from "./screen/Public-Quiz/DisplayQuiz";
import CreateQuiz from "./screen/dashboard/quiz/CreateQuiz";
import CreateQuizHome from "./screen/dashboard/quiz/CreateQuizHome";
import CreateLevel from "./screen/dashboard/quiz/CreateLevel";

// registration
import StudentRegisterForm from "./screen/public-registration-form/StudentRegisterForm";
import StudentRegistrationList from "./screen/dashboard/registration/studentRegistrationList/StudentRegistrationList";
import StudentRegistrationListHome from "./screen/dashboard/registration/studentRegistrationList/StudentRegistrationListHome";
import UpdateStudentRegistrationForm from "./screen/dashboard/registration/studentRegistrationList/UpdateStudentRegistrationForm";
import StudentRegistrationCourseAndSec from "./screen/dashboard/StudentRegistrationCourseAndSec";

// enrolled student
import EnrolledStudent from "./screen/dashboard/enrolledStudent/EnrolledStudent";
import EnrolledStudentHome from "./screen/dashboard/enrolledStudent/EnrolledStudentHome";
import UpdateEnrolledStudent from "./screen/dashboard/enrolledStudent/UpdateEnrolledStudent";

// dashboard
import Dashboard from "./screen/dashboard/Dashboard";
import DashboardHome from "./screen/dashboard/DashboardHome";
import UserProfile from "./screen/dashboard/UserProfile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Boilerplate />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp role="user" />} />
          <Route path="admin-signup" element={<SignUp role="admin" />} />
          <Route path="landing" element={<Landing />} />

          {/* Course */}
          <Route path="course" element={<Course />}>
            <Route index element={<CourseHome />} />
            <Route path="course-detail" element={<CourseDetail />} />
            {/* <Route path="course-topics" element={<CourseTopics />} /> ✅ active */}
          </Route>

          {/* Quiz */}
          <Route path="quiz" element={<Quiz />}>
            <Route index element={<QuizCategory />} />
            <Route path="quiz-level/:id" element={<QuizLevel />} />
            <Route path="display-quiz" element={<DisplayQuiz />} />
          </Route>

          {/* Public Registration */}
          <Route path="student-registration-form" element={<StudentRegisterForm />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="create-course" element={<CreateCourse />} />

            <Route path="create-quiz" element={<CreateQuiz />}>
              <Route index element={<CreateQuizHome />} />
              <Route path="add-level/:id" element={<CreateLevel />} />
            </Route>

            <Route path="course-list" element={<CourseList />}>
              <Route index element={<CourseListHome />} />
              <Route path="course-update" element={<CourseUpdate />} />
            </Route>

            <Route path="student-registration-list" element={<StudentRegistrationList />}>
              <Route index element={<StudentRegistrationListHome />} />
              <Route path="update-student-registration-form" element={<UpdateStudentRegistrationForm />} />
            </Route>

            <Route path="student-registration-form-course-and-sec-control" element={<StudentRegistrationCourseAndSec />} />

            <Route path="enrolled-student" element={<EnrolledStudent />}>
              <Route index element={<EnrolledStudentHome />} />
              <Route path="update-enrolled-student" element={<UpdateEnrolledStudent />} />
            </Route>
          </Route>

          {/* Error fallback */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}
