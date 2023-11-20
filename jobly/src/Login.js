
import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";


const initialLoginFormData = { username: "", password: "" };

/**
 * Login: Renders login form for user to input username/password
 *
 * State:
 * - loginData: {username:..., password: ...}
 *
 * Props:
 * - loginUser: function that sends user login info to JoblyApp
 */
function Login({ loginUser }) {
  const [loginData, setLoginData] = useState(initialLoginFormData);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();


  /** Updates loginData state as user types in form */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginData(l => ({ ...l, [name]: value }));
  }

  /** Sends user login info to JoblyApp, resets form, redirects to home page
   * if error, updates loginData state and shows errorMessage component
   */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await loginUser(loginData);
      setLoginData(initialLoginFormData);
      navigate("/");
    } catch (err) {
      setErrors(err[0].message);
    }
  }

  return (
    <div className="Login-container">
      <h1>Log In</h1>
      <div className="row">
        <div className="col"></div>
        <form className="Login col" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Username:
            </label>
            <input
              name="username"
              value={loginData.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Password:
            </label>
            <input
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="form-control"
              type="password"
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
        <div className="col"></div>
      </div>
      {errors && <ErrorMessage errorMessages={errors} />}
    </div>
  );
}

export default Login;