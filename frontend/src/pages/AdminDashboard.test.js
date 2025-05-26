import React from "react";
import { render, screen } from "@testing-library/react";
import ResultTable from "../components/ResultTable";

describe("ResultTable", () => {
  test("renders 'No results available.' when results is undefined", () => {
    render(<ResultTable results={undefined} />);
    expect(screen.getByText("No results available.")).toBeInTheDocument();
  });

  test("renders 'No results available.' when results is an empty array", () => {
    render(<ResultTable results={[]} />);
    expect(screen.getByText("No results available.")).toBeInTheDocument();
  });

  test("renders table with results", () => {
    const mockResults = [
      {
        name: "Akshay",
        email: "akshay@example.com",
        score: 9,
        rank: 1,
        status: "Passed",
      },
      {
        name: "Tanushree",
        email: "tanushree@example.com",
        score: 7,
        rank: 2,
        status: "Passed",
      },
    ];

    render(<ResultTable results={mockResults} />);

    // Table headers
    expect(screen.getByText("Rank")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    // First row (Rank 1)
    expect(screen.getByText("⭐ Rank 1")).toBeInTheDocument();
    expect(screen.getByText("Akshay")).toBeInTheDocument();
    expect(screen.getByText("akshay@example.com")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();

    // Second row (Rank 2)
    expect(screen.getByText("Rank 2")).toBeInTheDocument();
    expect(screen.getByText("Tanushree")).toBeInTheDocument();
    expect(screen.getByText("tanushree@example.com")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();

    // Status check
    const statusElements = screen.getAllByText("Passed");
    expect(statusElements).toHaveLength(2);
  });
});
