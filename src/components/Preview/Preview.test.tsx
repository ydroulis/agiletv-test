import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Preview from "../Preview";
import { useAnimalStore } from "@/store/useAnimalStore";
import { Animal } from "@/types/animal";

jest.mock("@/store/useAnimalStore");

jest.mock("next/image", () => {
    type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;
    const MockImage = (props: ImgProps) => {
        return <img {...props} alt={props.alt ?? ""} />;
    };
    MockImage.displayName = "MockNextImage";
    return MockImage;
});

const mockSetIsShowingPreview = jest.fn();
const mockSetRemoveScrolled = jest.fn();

describe("Preview component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockAnimal = {
        id: 1,
        type: 'lion',
        title: 'Lion',
        description: 'The king of the jungle',
        url: 'https://example.com',
        image: 'https://example.com/image.jpg',
    };

    const setupStore = (selected: Animal) => {
        (useAnimalStore as unknown as jest.Mock).mockReturnValue({
            selectedAnimal: selected,
        });
    };

    const renderPreview = () =>
        render(
            <Preview
                setIsShowingPreview={mockSetIsShowingPreview}
                setRemoveScrolled={mockSetRemoveScrolled}
                removeScrolled={true}
            />
        );

    it("should render the preview", () => {
        setupStore(mockAnimal);

        renderPreview();

        expect(
            screen.getByRole("dialog", { name: /lion preview/i })
        ).toBeInTheDocument();

        expect(screen.getByText("The king of the jungle")).toBeInTheDocument();
    });

    it("should set focus on close button", () => {
        setupStore(mockAnimal);

        renderPreview();

        const closeButton = screen.getByRole("button", { name: /close preview/i });
        expect(closeButton).toHaveFocus();
    });

    it("should close the preview", () => {
        setupStore(mockAnimal);

        renderPreview();

        const overlay = screen.getByRole("presentation");
        fireEvent.click(overlay);

        expect(mockSetIsShowingPreview).toHaveBeenCalledWith(false);
    });

    it("should close the preview with escape", () => {
        setupStore(mockAnimal);

        renderPreview();

        fireEvent.keyDown(document, { key: "Escape" });

        expect(mockSetIsShowingPreview).toHaveBeenCalledWith(false);
    });

    it("should close the preview with tab", () => {
        setupStore(mockAnimal);

        renderPreview();

        const dialog = screen.getByRole("dialog");
        const closeButton = screen.getByRole("button", { name: /close preview/i });

        fireEvent.keyDown(dialog, { key: "Tab" });

        expect(closeButton).toHaveFocus();
    });

    it("should have aria-modal", () => {
        setupStore(mockAnimal);

        renderPreview();

        const dialog = screen.getByRole("dialog");

        expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(dialog).toHaveAccessibleName("Lion preview");
    });
});
