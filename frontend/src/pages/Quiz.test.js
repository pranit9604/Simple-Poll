import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Quiz from "../pages/Quiz";
import { submitAnswers } from "../services/quizService";

// Mocks
jest.mock("../components/QuestionList", () => ({ questions, onSubmit }) => (
  <div data-testid="question-list">
    <button onClick={() => onSubmit({ q1: "A" })}>Mock Submit</button>
    {questions.map((q) => (
      <div key={q.id} data-testid="question">
        {q.question}
      </div>
    ))}
  </div>
));

jest.mock("../services/quizService", () => ({
  submitAnswers: jest.fn(),
}));

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useLocation: () => ({
      state: { name: "Akshay", email: "akshay@example.com" },
    }),
    useNavigate: jest.fn(),
  };
});

global.fetch = jest.fn();

describe("Quiz", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  });

  test("shows loading initially", async () => {
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          { _id: "q1", text: "Question 1?", options: ["A", "B"] },
        ]),
    });

    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading questions...")).toBeInTheDocument();
    await waitFor(() => screen.getByTestId("question-list"));
  });

  test("renders fetched questions", async () => {
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          { _id: "q1", text: "What is React?", options: ["A", "B"] },
        ]),
    });

    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("What is React?")).toBeInTheDocument();
    });
  });

  test("calls submitAnswers and navigates on quiz submission", async () => {
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          { _id: "q1", text: "Question 1?", options: ["A", "B"] },
        ]),
    });

    submitAnswers.mockResolvedValueOnce({ score: 9, rank: 1, status: "Passed" });

    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    // Wait for questions to load
    await waitFor(() => screen.getByTestId("question-list"));

    // Simulate clicking the submit button in the mocked QuestionList
    fireEvent.click(screen.getByText("Mock Submit"));

    await waitFor(() => {
      expect(submitAnswers).toHaveBeenCalledWith({
        name: "Akshay",
        email: "akshay@example.com",
        answers: { q1: "A" },
      });

      expect(mockNavigate).toHaveBeenCalledWith("/result", {
        state: {
          name: "Akshay",
          email: "akshay@example.com",
          score: 9,
          rank: 1,
          status: "Passed",
        },
      });
    });
  });

  test("shows alert on submission failure", async () => {
    global.alert = jest.fn();

    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          { _id: "q1", text: "Question 1?", options: ["A", "B"] },
        ]),
    });

    submitAnswers.mockRejectedValueOnce(new Error("Failed"));

    render(
      <MemoryRouter>
        <Quiz />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByTestId("question-list"));

    fireEvent.click(screen.getByText("Mock Submit"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Failed to submit quiz. Please try again.");
    });
  });
});
