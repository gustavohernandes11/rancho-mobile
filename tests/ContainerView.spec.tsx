import { render, screen } from "../utils/setupTests";

import { ContainerView } from "../components/ContainerView";
import { Text } from "react-native";

describe("ContainerView", () => {
	it("should render the component", () => {
		render(<ContainerView testID="container-id" />);
		const sut = screen.getByTestId("container-id");
		expect(sut).toBeOnTheScreen();
	});
	it("should render the children", () => {
		render(
			<ContainerView testID="container-id">
				<Text>text 1</Text>
			</ContainerView>
		);
		const sut = screen.getByTestId("container-id");
		expect(sut).toHaveTextContent("text 1");
	});
});
