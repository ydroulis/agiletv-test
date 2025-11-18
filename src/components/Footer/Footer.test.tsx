import { render, screen } from "@testing-library/react";
import Footer from "./index";

describe("<Footer />", () => {
    it("should render the footer", () => {
        render(<Footer />);
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("should render the year", () => {
        render(<Footer />);
        expect(screen.getByText(/Google 2021/i)).toBeInTheDocument();
    });

    it("should render the version", () => {
        render(<Footer />);
        expect(screen.getByText("0.1.0")).toBeInTheDocument();
    });

    it("should render the version aria-label", () => {
        render(<Footer />);
        const versionElement = screen.getByLabelText("App version: 0.1.0");
        expect(versionElement).toBeInTheDocument();
    });

    it("should render the footer aria-label", () => {
        render(<Footer />);
        const footer = screen.getByRole("contentinfo");
        expect(footer).toHaveAttribute("aria-label", "Footer informations");
    });
});
