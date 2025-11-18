import { render, screen } from "@testing-library/react";
import Header from "../Header";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock("@/store/useAnimalStore", () => ({
    useAnimalStore: () => ({
        isShowingResults: false,
        setIsShowingResults: jest.fn(),
    }),
}));

jest.mock("../Search", () => {
    const MockSearch = () => <div data-testid="mock-search">Search</div>;
    MockSearch.displayName = "MockSearch";
    return MockSearch;
});

jest.mock("next/image", () => {
    type MockImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

    const MockImage = (props: MockImageProps) => {
        return <img {...props} alt={props.alt ?? ""} />;
    };

    MockImage.displayName = "MockNextImage";

    return MockImage;
});

describe("Header component", () => {
    it("should render the title", () => {
        render(<Header />);

        expect(
            screen.getByRole("heading", { name: /Agile Content Frontend test/i })
        ).toBeInTheDocument();
    });

    it("should render the menu button", () => {
        render(<Header />);

        const menuButton = screen.getByRole("button", {
            name: /open menu/i,
        });

        expect(menuButton).toBeInTheDocument();
    });

    it("should render the profile button", () => {
        render(<Header />);

        const profileButton = screen.getByRole("button", {
            name: /open user profile/i,
        });

        expect(profileButton).toBeInTheDocument();
    });

    it("should not render the search", () => {
        render(<Header />);
        expect(screen.queryByTestId("mock-search")).not.toBeInTheDocument();
    });
});
