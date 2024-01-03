import { render, screen } from "./setupTests";

import { AnimalTable } from "../AnimalTable";
import { Animal } from "../../types/Animal";

describe("AnimalTable", () => {
	const mockedAnimals: Animal[] = [
		{ id: 1, name: "Name 1", gender: "F" },
		{ id: 2, name: "Name 2", gender: "M" },
		{ id: 3, name: "Name 3", gender: "M" },
		{ id: 4, name: "Name 4", gender: "F" },
	];
	it("should render the all the animals", () => {
		render(<AnimalTable animals={mockedAnimals} />);
		expect(screen.getByText("Name 1")).toBeOnTheScreen();
		expect(screen.getByText("Name 2")).toBeOnTheScreen();
		expect(screen.getByText("Name 3")).toBeOnTheScreen();
		expect(screen.getByText("Name 4")).toBeOnTheScreen();
	});
});
