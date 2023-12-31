import { render, screen } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

import { StyledButton } from "../StyledButton";
import Colors from "../../constants/Colors";

describe("StyledButton", () => {
	it("should render the component", () => {
		render(<StyledButton title="any-button-title" />);
		const sut = screen.getByText("any-button-title");
		expect(sut).toBeTruthy();
	});
	it("should render the text title", () => {
		render(<StyledButton title="any-button-title" />);
		const sut = screen.getByText("any-button-title");
		expect(sut).toHaveTextContent("any-button-title");
	});
	describe("Type", () => {
		it("should render a green background when type primary", () => {
			const { getByTestId } = render(
				<StyledButton
					testID="button-id"
					type="primary"
					title="any-title"
				/>
			);

			expect(getByTestId("button-id")).toHaveStyle({
				backgroundColor: Colors.green,
			});
		});
		it("should render a white text when type danger", () => {
			const { getByText } = render(
				<StyledButton type="primary" title="any-title" />
			);

			expect(getByText("any-title")).toHaveStyle({
				color: Colors.white,
			});
		});

		it("should render a gray background and border when type light or danger", () => {
			const { getByTestId } = render(
				<>
					<StyledButton
						testID="button-light-id"
						type="light"
						title="any-title"
					/>
					<StyledButton
						testID="button-danger-id"
						type="light"
						title="any-title"
					/>
				</>
			);

			expect(getByTestId("button-light-id")).toHaveStyle({
				backgroundColor: Colors.gray,
				borderColor: Colors.border,
			});
			expect(getByTestId("button-danger-id")).toHaveStyle({
				backgroundColor: Colors.gray,
				borderColor: Colors.border,
			});
		});
		it("should render a red text when type danger", () => {
			const { getByText } = render(
				<StyledButton type="danger" title="any-title" />
			);

			expect(getByText("any-title")).toHaveStyle({
				color: Colors.red,
			});
		});
	});
});
