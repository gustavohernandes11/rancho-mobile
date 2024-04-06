import { SubTitle } from "components/SubTitle";
import { render } from "tests/setupTests";

describe("SubTitle", () => {
	it("should render the subtitle on the screen", () => {
		const { getByText } = render(<SubTitle>fake_text</SubTitle>);

		const subTitle = getByText("fake_text");

		expect(subTitle).toBeOnTheScreen();
	});
});
