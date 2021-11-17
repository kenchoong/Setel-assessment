import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    const { getByText } = render(<Home />);

    const heading = getByText("Scenario 1");

    //expect(heading).toBeInTheDocument();
  });
});
