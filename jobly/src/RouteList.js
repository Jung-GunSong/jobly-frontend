import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import JobsPage from "./JobsPage";
import CompaniesPage from "./CompaniesPage";
import CompanyJobPage from "./CompanyJobPage";
import Login from "./Login";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
/**
 * Manages routes to each associated component/page, determines whether route
 * can be accessed by checking if user is has been assigned
 *
 * State: none
 *
 * Props:
 * registerUser: function to register user with form data
 * loginUser: function to login user with valid username and password
 * user: holds user data or null value for username key
 * patchUser: function that will update user info
 */
function RouteList({ registerUser, loginUser, user, patchUser }) {

  return (
    <div>
      <Routes>
        {!user &&
          <>
            <Route path="/login"
              element={<Login loginUser={loginUser} />} />
            <Route path="/signup"
              element={<SignUp registerUser={registerUser} />} />
          </>}

        <Route path="/" element={<HomePage />} />

        {user &&
          <>
            <Route path="/profile" element={<UserProfile user={user} patchUser={patchUser} />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/companies/:handle" element={<CompanyJobPage />} />
          </>}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default RouteList;