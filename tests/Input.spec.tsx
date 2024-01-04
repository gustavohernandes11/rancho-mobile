import { render, screen } from "../utils/setupTests";
import { Input } from "../components/Input";

describe("Input", () => {
	it("should render the component", () => {
		render(<Input placeholder="input-text" />);
		const sut = screen.getByPlaceholderText("input-text");
		expect(sut).toBeOnTheScreen();
	});
	it("should render a label text when the prop 'label' is provided", () => {
		render(<Input testID="input" label="name" />);
		const label = screen.getByText("name");
		expect(label).toBeOnTheScreen();
	});
	it("should render a error text when the prop 'error' is provided", () => {
		render(<Input testID="input" error="error-message" />);
		const error = screen.getByText("error-message");
		expect(error).toBeOnTheScreen();
	});
});
