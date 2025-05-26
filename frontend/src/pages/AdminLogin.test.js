import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import axios from "axios";

jest.mock("axios");

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: jest.fn(),
  };
});

describe("AdminLogin", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders input fields and login button", () => {
    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("submits form and navigates on successful login", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Admin" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "admin@example.com" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/admin/login"),
        {
          name: "Admin",
          email: "admin@example.com",
        }
      );

      expect(localStorage.getItem("adminName")).toBe("Admin");
      expect(localStorage.getItem("adminEmail")).toBe("admin@example.com");
      expect(mockNavigate).toHaveBeenCalledWith("/admin-dashboard");
    });
  });

  test("shows error on failed login", async () => {
    axios.post.mockRejectedValue(new Error("Unauthorized"));

    render(
      <MemoryRouter>
        <AdminLogin />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Wrong" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Login failed")).toBeInTheDocument();
    });
  });
});
