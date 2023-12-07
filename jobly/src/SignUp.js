import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const initialSignUpData = {
  username: "", password: "",
  firstName: "", lastName: "",
  email: ""
};
/**
 * SignUp: Renders form for user to input username/password
 *
 * State:
 * - signUpData: {username:..., ...}
 *
 * Prop:
 * -registerUser: function that sends user registration information to JoblyApp
 *
 */
function SignUp({ registerUser }) {
  const [signUpData, setSignUpData] = useState(initialSignUpData);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  /** Updates signUpData state when user types in form */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setSignUpData(s => ({ ...s, [name]: value }));
  }

  /** Sends user registration information to JoblyApp on submit, resets form,
   * redirects user to home page
   * if error, updates signUpData state to include errors and
   * renders errorMessage component
   */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {

      await registerUser(signUpData);
      setSignUpData(initialSignUpData);
      navigate("/");

    } catch (err) {
      setErrors(err[0].message);
    }

  }

  return (
    <div className="SignUp-container">
      <h1 className="mb-2">Sign Up</h1>
      <div className="row">
        <div className="col"></div>
        <form className="SignUp w-25 col" onSubmit={handleSubmit}>


            <div className="mb-3">
              <label className="form-label" htmlFor="username"
              >Username:</label>
              <input
                id="username"
                name="username"
                value={signUpData.username}
                onChange={handleChange}
                className="form-control"
              />
            </div>

          <div className="mb-3">
          <label className="form-label" htmlFor="password"
              >Password:</label>
            <input
              id="password"
              name="password"
              value={signUpData.password}
              onChange={handleChange}
              className="form-control"
              type="password"
            />
          </div>
          <div className="mb-3">
          <label className="form-label" htmlFor="firstName"
              >First Name:</label>
            <input
              id="firstName"
              name="firstName"
              value={signUpData.firstName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
          <label className="form-label" htmlFor="lastName"
              >Last Name:</label>
            <input
              id="lastName"
              name="lastName"
              value={signUpData.lastName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
          <label className="form-label" htmlFor="email"
              >Email:</label>
            <input
              id="email"
              name="email"
              value={signUpData.email}
              onChange={handleChange}
              className="form-control"
              type="email"
            />
          </div>
          <button className="btn btn-primary mt-3">Submit</button>
        </form>
        <div className="col"></div>
      </div>
      {errors && <ErrorMessage errorMessages={errors} />}
    </div>
  );
}

export default SignUp;