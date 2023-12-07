import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from './SignUp';
import { BrowserRouter } from 'react-router-dom';


describe("SignUp Page", function () {

  function signUpPageRender(registerFnc) {
    render(
      <BrowserRouter>
        <SignUp registerUser={registerFnc} />
      </BrowserRouter>
    );
  }


  it("renders when there is no user", function () {

    signUpPageRender(null);

    expect(screen.getByText("First Name:")).toBeInTheDocument();
    expect(screen.getByText("Last Name:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  it("uses prop registration function without inputs", async function () {

    const regMock = jest.fn();
    signUpPageRender(regMock);

    const submitButton = screen.getByText("Submit");
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(regMock).toHaveBeenCalledTimes(1);
    });

  });

  it("uses prop registration function with valid inputs", async function () {

    const regMock = jest.fn();
    signUpPageRender(regMock);

    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const firstNameInput = screen.getByLabelText("First Name:");
    const lastNameInput = screen.getByLabelText("Last Name:");
    const emailInput = screen.getByLabelText("Email:");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act (() =>{
      userEvent.type(usernameInput, "cheesypuffs");
      userEvent.type(passwordInput, "nomnom");
      userEvent.type(firstNameInput, "Cheddar");
      userEvent.type(lastNameInput, "Raclette");
      userEvent.type(emailInput, "tasty@snack.com");
    })

    expect(usernameInput.value).toBe("cheesypuffs");
    expect(passwordInput.value).toBe("nomnom");
    expect(firstNameInput.value).toBe("Cheddar");
    expect(lastNameInput.value).toBe("Raclette");
    expect(emailInput.value).toBe("tasty@snack.com");

    const submitButton = screen.getByText("Submit");
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(regMock).toHaveBeenCalledTimes(1);
    });

  });
});