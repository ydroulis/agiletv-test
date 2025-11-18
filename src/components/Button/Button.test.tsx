import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("<Button />", () => {
    it("should render a button", () => {
        render(<Button />);
        expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
    });

    it("should render a button with children", () => {
        render(<Button>Enviar</Button>);
        expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
    });

    it("should click on button", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Clique</Button>);

        fireEvent.click(screen.getByRole("button", { name: "Clique" }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not click on disabled button", () => {
        const handleClick = jest.fn();
        render(
            <Button disabled onClick={handleClick}>
                Disabled
            </Button>
        );

        fireEvent.click(screen.getByRole("button", { name: "Disabled" }));
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("should have aria-label", () => {
        render(<Button ariaLabel="botao-de-busca" />);

        expect(
            screen.getByRole("button", { name: "botao-de-busca" })
        ).toBeInTheDocument();
    });

    it("should have type", () => {
        render(<Button type="submit">Enviar</Button>);

        expect(screen.getByRole("button", { name: "Enviar" })).toHaveAttribute(
            "type",
            "submit"
        );
    });
});
