import { Heading } from "components/Heading";
import { render, screen } from "tests/setupTests";

describe("Heading", () => {
    it("should render the text", () => {
        render(<Heading>FOO</Heading>);
        const sut = screen.getByRole("text");
        expect(sut).toHaveTextContent("FOO");
        expect(sut).toBeOnTheScreen();
    });

    it("should set the fontSize on 16 when size is small", () => {
        render(<Heading size="small">FOO</Heading>);
        const sut = screen.getByRole("text");
        expect(sut).toHaveStyle({ fontSize: 16 });
    });

    it("should set the fontSize on 20 when no size is provided", () => {
        render(<Heading>FOO</Heading>);
        const sut = screen.getByRole("text");
        expect(sut).toHaveStyle({ fontSize: 20 });
    });

    it("should set the fontSize on 24 when the size is big", () => {
        render(<Heading size="big">FOO</Heading>);
        const sut = screen.getByRole("text");
        expect(sut).toHaveStyle({ fontSize: 24 });
    });
});
