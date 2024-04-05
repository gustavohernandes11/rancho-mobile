import { render, screen } from "tests/setupTests";
import { Card } from "components/Card";
import Colors from "constants/Colors";

jest.mock("assets/images/CowIcon.png");
const cowIcon = require("assets/images/CowIcon.png");

describe("Card", () => {
	it("should render the component", () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				testID="card_id"
				alt="alternative_text"
				title="title_text"
			/>
		);
		const sut = screen.getByTestId("card_id");
		expect(sut).toBeOnTheScreen();
	});

	it("should render the title", () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				alt="alternative_text"
				title="title_text"
			/>
		);
		const title = screen.getByText("title_text");
		expect(title).toBeOnTheScreen();
	});

	it("should render green background as default", async () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				alt=""
				title="default_card"
				testID="default_card"
			/>
		);
		const cardGreen = screen.getByTestId("default_card");
		expect(cardGreen).toHaveStyle({ backgroundColor: Colors.green });
	});

	it("should render the correct green background when color green is provided", async () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				alt=""
				title="green_card"
				testID="green_card"
				color="green"
			/>
		);
		const cardGreen = screen.getByTestId("green_card");
		expect(cardGreen).toHaveStyle({ backgroundColor: Colors.green });
	});

	it("should render the correct blue background when color blue is provided", async () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				alt=""
				title="blue_card"
				testID="blue_card"
				color="blue"
			/>
		);
		const cardBlue = screen.getByTestId("blue_card");
		expect(cardBlue).toHaveStyle({ backgroundColor: Colors.blue });
	});

	it("should render the correct purple background when color purple is provided", async () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				alt=""
				title="purple_card"
				testID="purple_card"
				color="purple"
			/>
		);
		const cardPurple = screen.getByTestId("purple_card");
		expect(cardPurple).toHaveStyle({ backgroundColor: Colors.purple });
	});
});
