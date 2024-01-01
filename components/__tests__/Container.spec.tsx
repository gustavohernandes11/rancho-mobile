import { render, screen } from "./setupTests";

import { ContainerView } from "../ContainerView";
import { Text } from "react-native";

describe("StyledButton", () => {
	it("should render the component", () => {
		render(<ContainerView testID="container" />);
		const sut = screen.getByTestId("container");
		expect(sut).toBeTruthy();
	});
	it("should render the children", () => {
		render(
			<ContainerView testID="container">
				<Text>text 1</Text>
			</ContainerView>
		);
		const sut = screen.getByTestId("container");
		expect(sut).toHaveTextContent("text 1");
	});
});
