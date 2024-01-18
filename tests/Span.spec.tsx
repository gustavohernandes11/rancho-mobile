import { Span } from "components/Span";
import { Text } from "react-native";
import { render, screen } from "utils/setup-tests";

describe("Span", () => {
	it("should render the component", () => {
		render(<Span testID="span"></Span>);
		const sut = screen.getByTestId("span");
		expect(sut).toBeOnTheScreen();
	});
	it("should render the children components", () => {
		render(
			<Span testID="span">
				<Text>child-1</Text>
				<Text>child-2</Text>
			</Span>
		);
		const sut = screen.getByTestId("span");
		expect(sut).not.toBeEmptyElement();
		expect(sut).toHaveTextContent("child-1");
		expect(sut).toHaveTextContent("child-2");
	});
});
