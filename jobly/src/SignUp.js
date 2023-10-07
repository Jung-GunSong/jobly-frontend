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
      <h1>Sign Up</h1>
      <form className="SignUp" onSubmit={handleSubmit}>
        username:
        <input
          name="username"
          value={signUpData.username}
          onChange={handleChange}
        />
        password:
        <input
          name="password"
          value={signUpData.password}
          onChange={handleChange}
        />
        first name:
        <input
          name="firstName"
          value={signUpData.firstName}
          onChange={handleChange}
        />
        last name:
        <input
          name="lastName"
          value={signUpData.lastName}
          onChange={handleChange}
        />
        email:
        <input
          name="email"
          value={signUpData.email}
          onChange={handleChange}
        />
        <button className="btn btn-primary">Submit</button>
      </form>
      {errors && <ErrorMessage errorMessages={errors} />}
    </div>
  );
}

export default SignUp;