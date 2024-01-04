import { render, screen } from "../utils/setupTests";

import { ContainerView } from "../components/ContainerView";
import { Text } from "react-native";

describe("ContainerView", () => {
	it("should render the component", () => {
		render(<ContainerView testID="container" />);
		const sut = screen.getByTestId("container");
		expect(sut).toBeOnTheScreen();
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
