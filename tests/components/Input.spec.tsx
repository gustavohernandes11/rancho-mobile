import { Input } from "components/Input";
import { render, screen } from "tests/setupTests";
jest.useFakeTimers();

describe("Input", () => {
	it("should render the component", () => {
		render(<Input placeholder="input_text" />);
		const sut = screen.getByPlaceholderText("input_text");
		expect(sut).toBeOnTheScreen();
	});

	it("should render a error text when the prop 'error' is provided", () => {
		render(<Input testID="input" errorText="error_message" />);
		const error = screen.getByText("error_message");
		expect(error).toBeOnTheScreen();
	});
});
