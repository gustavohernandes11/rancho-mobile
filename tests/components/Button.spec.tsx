import { Button } from "components/Button";
import Theme from "styles/Theme";
import { render, screen } from "tests/setupTests";

describe("Button", () => {
    it("should render the component", () => {
        render(<Button title="button_title" />);
        const sut = screen.getByText("button_title");
        expect(sut).toBeTruthy();
    });

    it("should render the text title", () => {
        render(<Button title="button_title" />);
        const sut = screen.getByText("button_title");
        expect(sut).toHaveTextContent("button_title");
    });

    describe("Type", () => {
        it("should render a white text when type primary", () => {
            const { getByText } = render(
                <Button type="primary" title="white_text_title" />
            );

            expect(getByText("white_text_title")).toHaveStyle({
                color: Theme.colors.white,
            });
        });

        it("should render a red text when type danger", () => {
            const { getByText } = render(
                <Button type="danger" title="red_text_title" />
            );

            expect(getByText("red_text_title")).toHaveStyle({
                color: Theme.colors.red,
            });
        });
    });
});
