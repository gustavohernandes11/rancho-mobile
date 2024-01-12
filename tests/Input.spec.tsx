import { render, screen } from "utils/setupTests";
import { Input } from "components/Input";

describe("Input", () => {
	it("should render the component", () => {
		render(<Input placeholder="input-text" />);
		const sut = screen.getByPlaceholderText("input-text");
		expect(sut).toBeOnTheScreen();
	});
	it("should render a error text when the prop 'error' is provided", () => {
		render(<Input testID="input" errorText="error-message" />);
		const error = screen.getByText("error-message");
		expect(error).toBeOnTheScreen();
	});
});
