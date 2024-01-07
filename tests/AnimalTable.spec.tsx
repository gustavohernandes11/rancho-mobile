import { render, screen } from "../utils/setupTests";

import { AnimalTable } from "../components/AnimalTable";
import { Animal } from "../types/Animal";
jest.useFakeTimers();

describe("AnimalTable", () => {
	const mockedAnimals: Animal[] = [
		{ id: 1, name: "name-1", gender: "F" },
		{ id: 2, name: "name-2", gender: "M" },
		{ id: 3, name: "name-3", gender: "M" },
		{ id: 4, name: "name-4", gender: "F" },
	];
	it("should render all the animals", () => {
		render(<AnimalTable animals={mockedAnimals} />);
		expect(screen.getByText("name-1")).toBeOnTheScreen();
		expect(screen.getByText("name-2")).toBeOnTheScreen();
		expect(screen.getByText("name-3")).toBeOnTheScreen();
		expect(screen.getByText("name-4")).toBeOnTheScreen();
	});
});
