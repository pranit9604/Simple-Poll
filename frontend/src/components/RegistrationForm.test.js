import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import { MemoryRouter, useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

//grouping test
describe("RegistrationForm", () => {
  const mockNavigate = jest.fn();

  //Runs code before each test() block
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  //here defining the individual test
  test("renders form", () => {
    render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Start Quiz")).toBeInTheDocument();
  });

  test("shows error on empty submit", () => {
    render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Start Quiz"));
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  test("navigates on valid input", () => {
    render(
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Akshay", name: "name" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "akshay@example.com", name: "email" },
    });

    fireEvent.click(screen.getByText("Start Quiz"));

    expect(mockNavigate).toHaveBeenCalledWith("/quiz", {
      state: { name: "Akshay", email: "akshay@example.com" },
    });
  });
});
