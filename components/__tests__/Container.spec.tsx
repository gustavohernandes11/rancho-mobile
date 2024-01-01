import { render, screen } from "./setupTests";

import { Container } from "../Container";
import { Text } from "react-native";

describe("StyledButton", () => {
	it("should render the component", () => {
		render(<Container testID="container" />);
		const sut = screen.getByTestId("container");
		expect(sut).toBeTruthy();
	});
	it("should render the children", () => {
		render(
			<Container testID="container">
				<Text>text 1</Text>
			</Container>
		);
		const sut = screen.getByTestId("container");
		expect(sut).toHaveTextContent("text 1");
	});
});
