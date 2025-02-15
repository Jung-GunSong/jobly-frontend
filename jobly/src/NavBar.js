import { NavLink } from "react-router-dom";
import "./NavBar.css";


/**
 * NavBar: renders links to routes for each page
 *
 * State: none
 *
 * Props:
 * user: user state that contains user data
 * logOutUser: function used to log out the user
 *
 */
function NavBar({ user, logOutUser }) {

  /** Calls logOutUser function to reset user info and token on click */
  function handleClick() {
    logOutUser();
  }

  return (
    <div className="NavBar navbar">
      <NavLink className="homepage" to="/">Jobly</NavLink>
      {!user ?
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">SignUp</NavLink>
        </> :
        <>
          <NavLink to="/jobs">Opportunities</NavLink>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/profile">User Profile</NavLink>
          <NavLink onClick={handleClick} to="/logout">Sign Off {user.username}</NavLink>
        </>
      }
    </div>
  );
}

export default NavBar;