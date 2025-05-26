import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import AllResult from "../pages/AllResult";
import { fetchAllResults } from "../services/quizService";

jest.mock("../services/quizService");
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: jest.fn(),
  };
});

describe("AllResult", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    fetchAllResults.mockResolvedValueOnce([]);
    render(
      <MemoryRouter>
        <AllResult />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading results...")).toBeInTheDocument();
    await waitFor(() => expect(fetchAllResults).toHaveBeenCalled());
  });

  test("renders results correctly", async () => {
    const mockData = [
      {
        name: "Akshay",
        email: "akshay@example.com",
        score: 9,
        rank: 1,
        status: "Passed",
        submittedAt: "2024-01-01T10:30:00Z",
      },
      {
        name: "Tanushree",
        email: "tanushree@example.com",
        score: 7,
        rank: 2,
        status: "Passed",
        submittedAt: "2024-01-02T11:00:00Z",
      },
    ];

    fetchAllResults.mockResolvedValueOnce(mockData);

    render(
      <MemoryRouter>
        <AllResult />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("All Results")).toBeInTheDocument();
      expect(screen.getByText("⭐ Rank 1")).toBeInTheDocument();
      expect(screen.getByText("Akshay")).toBeInTheDocument();
      expect(screen.getByText("Tanushree")).toBeInTheDocument();
    });
  });

  test("renders error message on failure", async () => {
    fetchAllResults.mockRejectedValueOnce(new Error("Fetch failed"));

    render(
      <MemoryRouter>
        <AllResult />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch results. Please try again later.")).toBeInTheDocument();
    });
  });

  test("navigates back to registration on home button click", async () => {
    fetchAllResults.mockResolvedValueOnce([]);
    render(
      <MemoryRouter>
        <AllResult />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("🏠 Back to Registration"));

    fireEvent.click(screen.getByText("🏠 Back to Registration"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("shows no results message if result list is empty", async () => {
    fetchAllResults.mockResolvedValueOnce([]);
    render(
      <MemoryRouter>
        <AllResult />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No results available.")).toBeInTheDocument();
    });
  });
});
