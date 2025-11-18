import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../Input";
import { useAnimalStore } from "@/store/useAnimalStore";

jest.mock("@/store/useAnimalStore", () => ({
    useAnimalStore: jest.fn(),
}));

jest.mock("react-icons/io", () => {
    const MockSearch = () => <span data-testid="icon-search" />;
    MockSearch.displayName = "MockSearchIcon";

    const MockClose = () => <span data-testid="icon-close" />;
    MockClose.displayName = "MockCloseIcon";

    return {
        IoIosSearch: MockSearch,
        IoMdClose: MockClose,
    };
});

describe("Input Component", () => {
    beforeEach(() => {
        (useAnimalStore as unknown as jest.Mock).mockReturnValue({
            isShowingResults: false,
        });
    });

    it("should render the input", () => {
        render(<Input term="cat" setTerm={jest.fn()} />);

        const input = screen.getByRole("textbox");
        expect(input).toHaveValue("cat");
    });

    it("should update the input", () => {
        const setTermMock = jest.fn();

        render(<Input term="" setTerm={setTermMock} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "lion" } });

        expect(setTermMock).toHaveBeenCalledWith("lion");
    });

    it("should clear the input", () => {
        const setTermMock = jest.fn();

        render(<Input term="dog" setTerm={setTermMock} />);

        const btnClear = screen.getByRole("button", { name: "Clean search" });

        fireEvent.click(btnClear);

        expect(setTermMock).toHaveBeenCalledWith("");
    });

    it("should render the search icon", () => {
        render(<Input term="" setTerm={jest.fn()} />);

        expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
        expect(screen.getByTestId("icon-search")).toBeInTheDocument();
    });

    it("should render the close icon", () => {

        (useAnimalStore as unknown as jest.Mock).mockReturnValueOnce({
            isShowingResults: true,
        });

        render(<Input term="" setTerm={jest.fn()} />);

        const input = screen.getByRole("textbox");
        const container = input.closest("div");

        expect(container).toHaveStyle("height: 30px");
    });
});
