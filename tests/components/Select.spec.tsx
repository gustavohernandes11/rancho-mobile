import { render, screen } from "tests/setupTests";

import { Select } from "components/Select";
import { Item } from "types";

describe("Select", () => {
	const mockItems: Item[] = [
		{ key: "first-option", value: "1" },
		{ key: "second-option", value: "2" },
	];
	const mockOnSelect = jest.fn();
	it("should render the component", () => {
		render(<Select items={mockItems} onSelect={mockOnSelect} />);
		const sut = screen.getByText("Selecione uma opção");
		expect(sut).toBeOnTheScreen();
	});
});
