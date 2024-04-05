import { AnimalBanner } from "components/AnimalBanner";
import moment from "moment";
import { Animal } from "types/Animal";
import { render, screen } from "tests/setupTests";
jest.useFakeTimers().setSystemTime(new Date("2024-01-20"));

describe("AnimalBanner", () => {
	const maleAnimal: Animal = {
		id: 1,
		name: "fake_name",
		gender: "M",
		birthdate: moment().toISOString(),
	};
	const femaleAnimal: Animal = {
		id: 2,
		name: "fake_name",
		gender: "F",
		birthdate: moment().toISOString(),
	};

	it("should render the animal information on the screen", () => {
		const { getByText } = render(<AnimalBanner animal={maleAnimal} />);

		const name = getByText("fake_name");
		const age = getByText("0 dias");

		expect(name).toBeOnTheScreen();
		expect(age).toBeOnTheScreen();
	});

	it("should render jupter symbol when animal is female", () => {
		const { getByLabelText } = render(
			<AnimalBanner animal={femaleAnimal} />
		);
		const symbol = getByLabelText("Jupter icon");
		expect(symbol).toBeOnTheScreen();
	});

	it("should render mars symbol when animal is male", () => {
		const { getByLabelText } = render(<AnimalBanner animal={maleAnimal} />);
		const symbol = getByLabelText("Mars icon");
		expect(symbol).toBeOnTheScreen();
	});
});
