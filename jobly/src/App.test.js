import React from "react";
import { render,} from '@testing-library/react';
import App from "./App";

describe("jobly app", function () {
  it("renders without crashing", function () {
    render(<App />);
  });
});