import { render, screen } from "tests/setupTests";

import { Button } from "components/Button";
import Colors from "constants/Colors";

describe("Button", () => {
	it("should render the component", () => {
		render(<Button title="any-button-title" />);
		const sut = screen.getByText("any-button-title");
		expect(sut).toBeTruthy();
	});
	it("should render the text title", () => {
		render(<Button title="any-button-title" />);
		const sut = screen.getByText("any-button-title");
		expect(sut).toHaveTextContent("any-button-title");
	});
	describe("Type", () => {
		it("should render a white text when type danger", () => {
			const { getByText } = render(
				<Button type="primary" title="any-title" />
			);

			expect(getByText("any-title")).toHaveStyle({
				color: Colors.white,
			});
		});

		it("should render a red text when type danger", () => {
			const { getByText } = render(
				<Button type="danger" title="any-title" />
			);

			expect(getByText("any-title")).toHaveStyle({
				color: Colors.red,
			});
		});
	});
});
