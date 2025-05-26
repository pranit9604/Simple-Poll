import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import RegistrationForm from "../components/RegistrationForm";

jest.mock("../components/RegistrationForm", () => () => (
  <div data-testid="registration-form">Mocked Registration Form</div>
));

describe("Home", () => {
  test("renders RegistrationForm", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId("registration-form")).toBeInTheDocument();
  });
});
