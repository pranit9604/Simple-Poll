import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuestionList from "../components/QuestionList";

// Group tests
describe("QuestionList", () => {
  const sampleQuestions = [
    {
      id: "q1",
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid"],
    },
    {
      id: "q2",
      question: "What is 5 + 3?",
      options: ["6", "7", "8"],
    },
  ];

  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockReset(); // Reset before each test
  });

  test("renders questions and options", () => {
    render(<QuestionList questions={sampleQuestions} onSubmit={mockSubmit} />);

    // Use custom text matchers since the number and question are in separate nodes
    expect(
      screen.getByText((_, element) =>
        element.textContent === "1. What is the capital of France?"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, element) =>
        element.textContent === "2. What is 5 + 3?"
      )
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Paris")).toBeInTheDocument();
    expect(screen.getByLabelText("Berlin")).toBeInTheDocument();
    expect(screen.getByLabelText("Madrid")).toBeInTheDocument();

    expect(screen.getByLabelText("6")).toBeInTheDocument();
    expect(screen.getByLabelText("7")).toBeInTheDocument();
    expect(screen.getByLabelText("8")).toBeInTheDocument();
  });

  test("shows error if not all questions are answered", () => {
    render(<QuestionList questions={sampleQuestions} onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByLabelText("Paris")); // only first question answered
    fireEvent.click(screen.getByText("Submit Answers"));

    expect(screen.getByText("All questions are mandatory")).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("submits correctly when all questions are answered", () => {
    render(<QuestionList questions={sampleQuestions} onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByLabelText("Paris"));
    fireEvent.click(screen.getByLabelText("8"));
    fireEvent.click(screen.getByText("Submit Answers"));

    expect(mockSubmit).toHaveBeenCalledWith({
      q1: "Paris",
      q2: "8",
    });
    expect(screen.queryByText("All questions are mandatory")).not.toBeInTheDocument();
  });
});
