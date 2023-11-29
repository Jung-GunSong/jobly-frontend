import { fireEvent, render, screen} from '@testing-library/react';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';
import userContext from './userContext';
import RouteList from './RouteList';
import NavBar from './NavBar';



describe("HomePage", function () {

  function homePageRender(val){
    render(
    <BrowserRouter>
      <userContext.Provider value= {{username: val}}>
        <HomePage />
      </userContext.Provider>
    </BrowserRouter>
    );
  }

  it("renders when there is no user", function () {

    homePageRender(null);

    expect(screen.getByText("Jobly")).toBeInTheDocument();
    expect(screen.queryByText("Welcome")).not.toBeInTheDocument();
  });

  it("renders when there is a user", function () {

    homePageRender("bob");

    expect(screen.getByText("Jobly")).toBeInTheDocument();
    expect(screen.getByText("Welcome back bob!")).toBeInTheDocument();
  });

  it("pressing login button takes user to login page", function () {

    const { container } = render(
    <BrowserRouter>
      <userContext.Provider value= {{username: null}}>
        <RouteList>
        </RouteList>
      </userContext.Provider>
    </BrowserRouter>
    );

   fireEvent.click(container.querySelector(".login"));

   expect(screen.getByText("Log In")).toBeInTheDocument();
   expect(screen.getByText("Username:")).toBeInTheDocument();
   expect(screen.getByText("Password:")).toBeInTheDocument();

  });

  it("pressing sign up button takes user to sign up page", function () {

    const { container } = render(
    <BrowserRouter>
      <userContext.Provider value= {{username: null}}>
        <NavBar />
        <RouteList>
        </RouteList>
      </userContext.Provider>
    </BrowserRouter>
    );

      fireEvent.click(container.querySelector(".homepage"));
      fireEvent.click(container.querySelector(".signup"));

   expect(screen.getByText("Sign Up")).toBeInTheDocument();
   expect(screen.getByText("Username:")).toBeInTheDocument();
   expect(screen.getByText("Password:")).toBeInTheDocument();
   expect(screen.getByText("First Name:")).toBeInTheDocument();
   expect(screen.getByText("Last Name:")).toBeInTheDocument();
   expect(screen.getByText("Email:")).toBeInTheDocument();

  });

});

