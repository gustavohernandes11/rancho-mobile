import { AnimalBanner } from "components/AnimalBanner";
import moment from "moment";
import { Animal } from "types/Animal";
import { render, screen } from "tests/setupTests";
jest.useFakeTimers().setSystemTime(new Date("2024-01-20"));

describe("AnimalBanner", () => {
	const mockedAnimal: Animal = {
		id: 1,
		name: "fake_name",
		gender: "F",
		birthdate: moment().toISOString(),
	};

	it("should render the animal information on the screen", () => {
		render(<AnimalBanner animal={mockedAnimal} />);
		expect(screen.getByText("fake_name")).toBeOnTheScreen();
		expect(screen.getByText("0 dias")).toBeOnTheScreen();
	});
});
