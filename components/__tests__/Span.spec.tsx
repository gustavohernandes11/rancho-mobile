import { render, screen } from "./setupTests";

import { Span } from "../Span";
import { Text } from "react-native";

describe("Span", () => {
	it("should render the component", () => {
		render(<Span testID="span"></Span>);
		const sut = screen.getByTestId("span");
		expect(sut).toBeOnTheScreen();
	});
	it("should render the children components", () => {
		render(
			<Span testID="span">
				<Text>Child 1</Text>
				<Text>Child 2</Text>
			</Span>
		);
		const sut = screen.getByTestId("span");
		expect(sut).not.toBeEmptyElement();
		expect(sut).toHaveTextContent("Child 1");
		expect(sut).toHaveTextContent("Child 2");
	});
});
