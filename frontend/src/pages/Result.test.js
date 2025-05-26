import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate, useLocation } from "react-router-dom";
import Result from "../pages/Result";

// Mocks
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
  };
});

describe("Result", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    require("react-router-dom").useLocation.mockReturnValue({
      state: {
        name: "Akshay",
        email: "akshay@example.com",
        score: 9,
        rank: 1,
        status: "Passed",
      },
    });
  });

  test("renders result details correctly", () => {
    render(
      <MemoryRouter>
        <Result />
      </MemoryRouter>
    );

    expect(screen.getByText("Your Result")).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el.textContent === "Name: Akshay")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el.textContent === "Email: akshay@example.com")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el.textContent === "Score: 9")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el.textContent === "Rank: 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el.textContent === "Status: Passed")
    ).toBeInTheDocument();
  });

  test("navigates to all results page on button click", () => {
    render(
      <MemoryRouter>
        <Result />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("View All Results"));
    expect(mockNavigate).toHaveBeenCalledWith("/all-results");
  });
});
