import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Header from "../Header";

vi.mock("@/hooks/usePrefersReducedMotion", () => ({ default: () => true }));

const appendAnchor = (id: string) => {
  const element = document.createElement("div");
  element.id = id;
  document.body.appendChild(element);
  return element;
};

describe("Header", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("renders primary navigation links", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /resume/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
  });

  it("activates navigation and scrolls to the target section", async () => {
    const user = userEvent.setup();
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;
    appendAnchor("projects");

    render(<Header />);
    const projectsLink = screen.getByRole("link", { name: "Projects" });

    await user.click(projectsLink);

    expect(scrollIntoViewMock).toHaveBeenCalled();
    expect(projectsLink).toHaveAttribute("aria-current", "page");
  });
});
