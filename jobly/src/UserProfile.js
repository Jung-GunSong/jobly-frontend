import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

//takes in updated user information and sends this to JoblyApp to be updated
//
// states:
// -profileData: data about the user that is to be updated
// ex: {username:...}
// -errors: holds errors messages as either a string or array to pass into
// ErrorMessages
// ex: ["instance error.."]
// -success: boolean used to determine if changes were successful
// ex: false
//
// props:
// -user: state that includes user data
// -patchUser: function that updates user information
// -success: boolean to determine to show success message

function UserProfile({ user, patchUser }) {

  const initialProfileData = {
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);


  /** Updates profileData state when user types in form */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setProfileData(p => ({ ...p, [name]: value }));
  }

  /** Sends user  information to JoblyApp on submit, resets form,
   * if error, updates profileData state to include errors and
   * renders errorMessage component
   * if successful, displays success message
   */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {

      await patchUser(profileData);
      setSuccess(true);
      setErrors(null);

    } catch (err) {
      setErrors(err[0].message);
      setSuccess(false);
    }

  }

  return (
    <div className="UserProfile-container">
      <h1>Edit Profile</h1>
      <div className="row">
        <div className="col"></div>
        <form className="UserProfile col" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Username:
            </label>
            <input
              name="username"
              value={profileData.username}
              disabled
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              First Name:
            </label>
            <input
              name="firstName"
              value={profileData.firstName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Last Name:
            </label>
            <input
              name="lastName"
              value={profileData.lastName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Email:
            </label>
            <input
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="form-control"
              type="email"
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
        <div className="col"></div>
      </div>
      {success && <p>Information successfully updated!</p>}
      {errors && <ErrorMessage errorMessages={errors} />}
    </div>
  );
}

export default UserProfile;