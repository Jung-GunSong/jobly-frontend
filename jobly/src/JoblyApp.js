import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import RouteList from "./RouteList";
import { useEffect, useState } from "react";
import userContext from "./userContext";
import JoblyApi from "./api";
import jwtDecode from "jwt-decode";
import Loading from "./Loading";

/**
 * JoblyApp: Renders NavBar component and Routes
 *
 * State:
 * -user: contains data about the user including personal data and applications
 * completed
 * ex: {username:...}
 * -token: jwt token used for authentication
 * ex:"fhwuioehfuw..."
 * - isLoading: boolean to determine if user info is still loading or available
 *
 * JoblyApp => {NavBar, RouteList} => Page => Panel
 *
 */
function JoblyApp() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);



  /**Decodes jwt token, gets user information every time token is updated, and
   * sets user state
   */
  useEffect(function () {
    async function getUser(username) {
      const userData = await JoblyApi.getUser(username);
      setUser(userData);
      setIsLoading(false);
    }

    if (token) {
      try {
        const { username } = jwtDecode(token);
        JoblyApi.token = token;
        getUser(username);
      }
      catch (err) {
        console.warn("TOKEN INVALID", err);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }

  }, [token]);


  /** Gets token from backend, sets token for user based on user info from
   * login form, logs in user*/
  async function loginUser(loginInfo) {
    const { username, password } = loginInfo;

    const token = await JoblyApi.login(username, password);
    localStorage.setItem("token", token);
    setToken(token);
    setIsLoading(true);
  }

  /** Resets token and user info, logs out user */
  function logOutUser() {
    setUser(null);
    JoblyApi.token = "";
    localStorage.clear();

    setToken(null);
  }

  /** Gets new user info from register form, gets token for user from backend,
   * sets token state
  */
  async function registerUser(registerInfo) {
    const { username, password, firstName, lastName, email } = registerInfo;

    const token = await JoblyApi.register(
      username,
      password,
      firstName,
      lastName,
      email
    );

    JoblyApi.token = token;
    setToken(token);
    localStorage.setItem("token", token);
  }

  // takes in user info and updates user information in database,
  // then returns user info back
  async function patchUser (patchInfo) {
    const { username, firstName, lastName, email } = patchInfo;

    const patchedUserData = await JoblyApi.patch(username, firstName,
      lastName,
      email);

      setUser(patchedUserData);
  }

  if (isLoading === true) return <Loading />;

  return (
    <div>
      <BrowserRouter>
        <userContext.Provider value={{ username: user?.username }}>
          <NavBar user={user} logOutUser={logOutUser} />
          <RouteList
            loginUser={loginUser}
            registerUser={registerUser}
            user={user}
            patchUser={patchUser}
          />
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default JoblyApp;