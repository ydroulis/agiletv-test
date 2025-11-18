import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../Form";
import { useRouter } from "next/navigation";
import { useAnimalStore } from "@/store/useAnimalStore";
import { useSearchStore } from "@/store/useSearchStore";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/store/useAnimalStore", () => ({
    useAnimalStore: jest.fn(),
}));

jest.mock("@/store/useSearchStore", () => ({
    useSearchStore: jest.fn(),
}));

jest.mock("../Input", () => {
    const MockInput = ({ term, setTerm }: { term: string; setTerm: (term: string) => void }) => (
        <input
            aria-label="mock-search-input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
        />
    );
    MockInput.displayName = "MockSearchInput";
    return MockInput;
});

jest.mock("../../Button", () => {
    const MockButton = ({ children, ...props }: { children: React.ReactNode }) => (
        <button {...props}>{children}</button>
    );
    MockButton.displayName = "MockButton";
    return MockButton;
});

describe("Form Component", () => {
    const routerPush = jest.fn();
    const setTermMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useRouter as jest.Mock).mockReturnValue({
            push: routerPush,
        });

        (useAnimalStore as unknown as jest.Mock).mockReturnValue({
            isShowingResults: false,
        });

        (useSearchStore as unknown as jest.Mock).mockReturnValue({
            term: "",
            setTerm: setTermMock,
        });
    });

    it("should render the form", () => {
        render(<Form />);

        expect(screen.getByLabelText("mock-search-input")).toBeInTheDocument();
    });

    it("should not render the button when isShowingResults=true", () => {
        (useAnimalStore as unknown as jest.Mock).mockReturnValueOnce({
            isShowingResults: true,
        });

        render(<Form />);

        const btn = screen.queryByRole("button", { name: /buscar/i });
        expect(btn).not.toBeInTheDocument();
    });

    it("should render the button", () => {
        render(<Form />);

        const btn = screen.getByRole("button", { name: /buscar/i });
        expect(btn).toBeInTheDocument();
    });

    it("should submit the form", () => {
        (useSearchStore as unknown as jest.Mock).mockReturnValueOnce({
            term: "lion",
            setTerm: setTermMock,
        });

        render(<Form />);

        const form = screen.getByRole("search");
        fireEvent.submit(form);

        expect(routerPush).toHaveBeenCalledWith("/results?search=lion");
    });

    it("should update the input", () => {
        render(<Form />);

        const input = screen.getByLabelText("mock-search-input");

        fireEvent.change(input, { target: { value: "cat" } });

        expect(setTermMock).toHaveBeenCalledWith("cat");
    });
});
