import { render, screen } from "./setupTests";

import { IconButton } from "../IconButton";
import Colors from "../../constants/Colors";

describe("IconButton", () => {
	it("should render the component", () => {
		render(
			<IconButton
				icon="apple"
				testID="icon-button-id"
				label="any-label"
			/>
		);
		const sut = screen.getByTestId("icon-button-id");
		expect(sut).toBeOnTheScreen();
	});

	describe("Type", () => {
		it("should render a green background when type primary", () => {
			render(
				<IconButton
					testID="icon-button-id"
					type="primary"
					icon="apple"
				/>
			);
			expect(screen.getByTestId("icon-button-id")).toHaveStyle({
				backgroundColor: Colors.green,
			});
		});

		it("should render a gray background and border when type light or danger", () => {
			render(
				<>
					<IconButton
						testID="button-light-id"
						type="light"
						icon="apple"
					/>
					<IconButton
						testID="button-danger-id"
						type="light"
						icon="apple"
					/>
				</>
			);

			expect(screen.getByTestId("button-light-id")).toHaveStyle({
				backgroundColor: Colors.gray,
				borderColor: Colors.border,
			});
			expect(screen.getByTestId("button-danger-id")).toHaveStyle({
				backgroundColor: Colors.gray,
				borderColor: Colors.border,
			});
		});
	});
});
