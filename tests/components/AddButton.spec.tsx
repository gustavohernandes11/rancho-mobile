import { AddButton } from "components/AddButton";
import { render } from "tests/setupTests";
jest.useFakeTimers().setSystemTime(new Date("2024-01-20"));

describe("AnimalBanner", () => {
	it("should render the button on the screen", () => {
		const { getByTestId } = render(
			<AddButton href="dummy_href" testID="add_animal_icon_button" />
		);
		const button = getByTestId("add_animal_icon_button");
		expect(button).toBeOnTheScreen();
	});
	it("should render the icon", () => {
		const { getByLabelText } = render(
			<AddButton href="dummy_href" testID="add_animal_icon_button" />
		);
		const button = getByLabelText("Add animal icon");
		expect(button).toBeOnTheScreen();
	});
});
