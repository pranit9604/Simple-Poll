import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: jest.fn(),
  };
});

describe("ResultCard", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  const mockProps = {
    name: "Akshay",
    email: "akshay@example.com",
    score: 8,
    rank: 2,
    status: "Passed",
  };

  test("renders result details correctly", () => {
    render(
      <MemoryRouter>
        <ResultCard {...mockProps} />
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
      screen.getByText((_, el) => el.textContent === "Score: 8")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el.textContent === "Rank: 2")
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el.textContent === "Status: Passed")
    ).toBeInTheDocument();
  });

  test("navigates to all results page on button click", () => {
    render(
      <MemoryRouter>
        <ResultCard {...mockProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("View All Results"));
    expect(mockNavigate).toHaveBeenCalledWith("/all-results");
  });
});
