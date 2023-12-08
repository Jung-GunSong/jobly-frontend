import { fireEvent, render, screen} from '@testing-library/react';

import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import userContext from './userContext';
import HomePage from './HomePage';
import SignUp from './SignUp';

describe("HomePage", function () {

  function navBarRender(user, logoutFnc){
    render(
    <BrowserRouter>
      <NavBar user={user} logOutUser={logoutFnc} />
    </BrowserRouter>
    );
  }

  it("renders when there is no user", function () {

    navBarRender(null, null);

    expect(screen.getByText("Jobly")).toBeInTheDocument();
    expect(screen.queryByText("Submit")).not.toBeInTheDocument();
  });

  it("changes available links when user is present", function (){

    navBarRender({username:"cheesypuffs"}, null);
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("Companies")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();

  })

  it("takes user to login page when proper link is clicked", function (){

    render(
      <BrowserRouter>
          <NavBar user={null} logOutUser={null} />
          <Login loginUser={null}/>
      </BrowserRouter>
    )

    fireEvent.click(screen.getByRole("link", {name:"Login"}));


    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.queryByText("Sign Up")).not.toBeInTheDocument();

  });

  it("takes user to sign up page when proper link is clicked", function (){

    render(
      <BrowserRouter>
          <NavBar user={null} logOutUser={null} />
          <SignUp registerUser={null}/>
      </BrowserRouter>
    )

    fireEvent.click(screen.getByRole("link",{name:"SignUp"}));


    expect(screen.getByText("First Name:")).toBeInTheDocument();
    expect(screen.queryByRole("button", {name:"Login"})).not.toBeInTheDocument();

  });

  it("takes user to non-user homepage when proper link is clicked", function (){

    render(
      <BrowserRouter>
        <userContext.Provider value={{username:null}}>
          <NavBar user={null} logOutUser={null} />
          <HomePage />
        </userContext.Provider>
      </BrowserRouter>
    )

    fireEvent.click(screen.getByRole("link",{name:"Jobly"}));


    expect(screen.getByRole("button", {name:"Login"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name:"Sign Up"})).toBeInTheDocument();
    expect(screen.queryByRole("button", {name:"Submit"})).not.toBeInTheDocument();

  });

});