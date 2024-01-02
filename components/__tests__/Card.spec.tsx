import { render, screen } from "./setupTests";
import { Card } from "../Card";
import Colors from "../../constants/Colors";
jest.mock("../../assets/images/CowIcon.png");
const cowIcon = require("../../assets/images/CowIcon.png");

describe("Card", () => {
	it("should render the component", () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				testID="card-id"
				alt="alternative text"
				title="title text"
			/>
		);
		const sut = screen.getByTestId("card-id");
		expect(sut).toBeOnTheScreen();
	});
	it("should render the title", () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				alt="alternative text"
				title="title text"
			/>
		);
		const title = screen.getByText("title text");
		expect(title).toBeOnTheScreen();
	});
	it("should render the 2 children elements", async () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				alt="alternative text"
				title="title text"
			/>
		);
		expect(screen.toJSON().children.length).toBe(2);
	});
	it("should render green background as default", async () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				alt=""
				title="Default card"
				testID="Default card"
			/>
		);
		const cardGreen = screen.getByTestId("Default card");
		expect(cardGreen).toHaveStyle({ backgroundColor: Colors.green });
	});

	it("should render the correct green background when color green is provided", async () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				alt=""
				title="Green card"
				testID="Green card"
				color="green"
			/>
		);
		const cardGreen = screen.getByTestId("Green card");
		expect(cardGreen).toHaveStyle({ backgroundColor: Colors.green });
	});

	it("should render the correct blue background when color blue is provided", async () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				alt=""
				title="Blue card"
				testID="Blue card"
				color="blue"
			/>
		);
		const cardBlue = screen.getByTestId("Blue card");
		expect(cardBlue).toHaveStyle({ backgroundColor: Colors.blue });
	});

	it("should render the correct purple background when color purple is provided", async () => {
		render(
			<Card
				href="/"
				iconSource={cowIcon}
				alt=""
				title="Purple card"
				testID="Purple card"
				color="purple"
			/>
		);
		const cardPurple = screen.getByTestId("Purple card");
		expect(cardPurple).toHaveStyle({ backgroundColor: Colors.purple });
	});
});
