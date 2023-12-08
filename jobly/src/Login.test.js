import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';


describe("Login Page", function () {

  function loginPageRender(loginFnc) {
    render(
      <BrowserRouter>
        <Login loginUser={loginFnc} />
      </BrowserRouter>
    );
  }


  it("renders when there is no user", function () {

    loginPageRender(null);

    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.queryByText("First Name:")).not.toBeInTheDocument();
    expect(screen.queryByText("Sign Up")).not.toBeInTheDocument();
  });

  it("uses passed in login function with no inputs", async function () {

    const loginMock = jest.fn();
    loginPageRender(loginMock);
    const submitButton = screen.getByText("Submit");
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledTimes(1);
    });

  });

  it("calls passed in login function with valid inputs", async function () {

    const loginMock = jest.fn();

    loginPageRender(loginMock);

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act( () => {
      userEvent.type(usernameInput, "testadmin");
      userEvent.type(passwordInput, "password");
    })

    expect(usernameInput.value).toBe("testadmin");
    expect(passwordInput.value).toBe("password");

    const submitButton = screen.getByText("Submit");

    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledTimes(1);
    });

  });

  // This test can be run only if backend server is also running

  // it ("completes login with correct user information", async function (){
  //   render(
  //    <JoblyApp>
  //   </JoblyApp>
  //     );

  //     fireEvent.click(screen.getByRole("button", {name: "Login"}));

  //     const usernameInput = screen.getByLabelText("Username:");
  //     const passwordInput = screen.getByLabelText("Password:");

  //     // eslint-disable-next-line testing-library/no-unnecessary-act
  //     act( () => {
  //       userEvent.type(usernameInput, "testadmin");
  //       userEvent.type(passwordInput, "password");
  //     })

  //     const submitButton = screen.getByText("Submit");

  //     fireEvent.submit(submitButton);

  //     await waitFor(() => {
  //       expect(screen.getByText("Welcome back testadmin!")).toBeInTheDocument();

  //     });

  //     expect(screen.queryByText("Login")).not.toBeInTheDocument();
  // })



});