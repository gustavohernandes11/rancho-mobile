import { render, screen } from "./setupTests";
import { Input } from "../Input";

describe("Input", () => {
	it("should render the component", () => {
		render(<Input placeholder="input text" />);
		const sut = screen.getByPlaceholderText("input text");
		expect(sut).toBeOnTheScreen();
	});
	it("should render a label text when the prop 'label' is provided", () => {
		render(<Input testID="input" label="Name" />);
		const label = screen.getByText("Name");
		expect(label).toBeOnTheScreen();
	});
	it("should render a error text when the prop 'error' is provided", () => {
		render(<Input testID="input" error="Error message" />);
		const error = screen.getByText("Error message");
		expect(error).toBeOnTheScreen();
	});
});
