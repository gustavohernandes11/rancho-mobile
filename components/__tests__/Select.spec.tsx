import { render, screen } from "./setupTests";

import { Item, Select } from "../Select";

describe("Select", () => {
	const mockItems: Item[] = [
		{ option: "First option", value: "1" },
		{ option: "Second option", value: "2" },
	];
	const mockOnSelect = jest.fn();

	it("should render the component", () => {
		render(<Select items={mockItems} onSelect={mockOnSelect} />);
		const sut = screen.getByText("Selecione uma opção");
		expect(sut).toBeOnTheScreen();
	});
});
