import { render, screen } from "tests/setupTests";

import { Select } from "components/Select";
import { Item } from "types";

describe("Select", () => {
    const mockItems: Item[] = [
        { key: "first_option", value: "1" },
        { key: "second_option", value: "2" },
    ];

    it("should render the component", () => {
        const mockOnSelect = jest.fn();
        render(<Select items={mockItems} onSelect={mockOnSelect} />);
        const sut = screen.getByText("Selecione uma opção");
        expect(sut).toBeOnTheScreen();
    });
});
