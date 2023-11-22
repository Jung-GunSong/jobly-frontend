import { render,} from '@testing-library/react';
import HomePage from './HomePage';
import userContext from './userContext';

describe("HomePage", function () {
  it("renders without crashing", function () {
    render(
    <userContext.Provider value={{ username: "bob" }}>
      <HomePage />
    </userContext.Provider>);
  });

  // it("matches snapshot", function (){
  //   const {container} = render(<HomePage />)

  //   expect(container).toMatchSnapshot();
  // })
});

