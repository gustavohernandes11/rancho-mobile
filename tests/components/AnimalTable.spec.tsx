import { AnimalTable } from "components/AnimalTable";
import { render, screen } from "../setupTests";

describe("AnimalTable", () => {
	it("should render the table on the screen", () => {
		render(<AnimalTable animals={[]} />);
		const table = screen.getByTestId("animal-table");
		expect(table).toBeOnTheScreen();
	});
});
