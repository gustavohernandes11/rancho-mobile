import { Span } from "components/Span";
import { Text } from "react-native";
import { render, screen } from "tests/setupTests";

describe("Span", () => {
    it("should render the component", () => {
        render(<Span testID="span"></Span>);
        const sut = screen.getByTestId("span");
        expect(sut).toBeOnTheScreen();
    });
    it("should render the children components", () => {
        render(
            <Span testID="span">
                <Text>child_1</Text>
                <Text>child_2</Text>
            </Span>
        );
        const sut = screen.getByTestId("span");
        expect(sut).not.toBeEmptyElement();
        expect(sut).toHaveTextContent("child_1");
        expect(sut).toHaveTextContent("child_2");
    });
});
