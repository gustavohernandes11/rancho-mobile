import { CustomDivider } from "components/CustomDivider";
import { render } from "tests/setupTests";
jest.useFakeTimers().setSystemTime(new Date("2024-01-20"));

describe("CustomDivider", () => {
	it("should render the divider on the screen", () => {
		const { getByTestId } = render(
			<CustomDivider testID="custom_divider" />
		);

		const divider = getByTestId("custom_divider");

		expect(divider).toBeOnTheScreen();
	});
});
