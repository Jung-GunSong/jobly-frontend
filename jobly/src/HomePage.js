import { Link } from "react-router-dom";
import userContext from "./userContext";
import { useContext } from "react";

/**
 * HomePage: renders page at "/"
 *
 *
 */
function HomePage() {

  const { username } = useContext(userContext);

  return (
    <div className="HomePage-container mt-5">
      <h1>Jobly</h1>
      {!username ?
        <div className="mt-5" >
          <Link to="/login">
            <button className="btn btn-primary me-5">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-primary ml-5">Sign Up</button>
          </Link>
        </div> :
        <h1>Welcome back {username}!</h1>}
    </div>
  );
}

export default HomePage;;