import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeroSection from "../HeroSection";

vi.mock("@/hooks/usePrefersReducedMotion", () => ({ default: () => true }));
vi.mock("@/assets/portrait.png", () => ({ default: "portrait.png" }), { virtual: true });

describe("HeroSection", () => {
  it("shows the headline and primary calls to action", async () => {
    render(<HeroSection />);

    expect(screen.getByRole("heading", { name: /babji kilaru/i })).toBeInTheDocument();
    expect(screen.getAllByText(/software engineer/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /view projects/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /book a call/i })).toBeInTheDocument();
  });
});
