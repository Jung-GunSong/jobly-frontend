import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';
import JoblyApp from './JoblyApp';

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

});