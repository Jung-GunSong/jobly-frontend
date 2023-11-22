import { render,} from '@testing-library/react';
import JoblyApp from './JoblyApp';
import { BrowserRouter } from 'react-router-dom';

describe("JoblyApp", function () {
  it("renders without crashing", function () {
    render(<JoblyApp />);
  });
});

describe("BrowseRouter", function () {
  it("renders without crashing", function () {
    render(<BrowserRouter />);
  });
});