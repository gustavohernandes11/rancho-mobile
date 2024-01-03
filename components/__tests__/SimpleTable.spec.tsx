import { render, screen } from "./setupTests";

import { SimpleTable } from "../SimpleTable";
import { Item } from "../../types/Item";

describe("SimpleTable", () => {
	const mockItems: Item[] = [
		{ key: "FOO", value: "1" },
		{ key: "BAR", value: "2" },
		{ key: "BAZ", value: "3" },
	];
	it("should render the rows", () => {
		render(<SimpleTable data={mockItems} />);
		expect(screen.getByText("FOO")).toBeOnTheScreen();
		expect(screen.getByText("BAR")).toBeOnTheScreen();
		expect(screen.getByText("BAZ")).toBeOnTheScreen();
	});
});
