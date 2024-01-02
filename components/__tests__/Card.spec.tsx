import { render, screen } from "./setupTests";
import { Card } from "../Card";
jest.mock("../../assets/images/CowIcon.png");
const cowIcon = require("../../assets/images/CowIcon.png");

describe("Card", () => {
	it("should render the component", () => {
		render(
			<Card
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
				iconSource={cowIcon}
				alt="alternative text"
				title="title text"
			/>
		);
		expect(screen.toJSON().children.length).toBe(2);
	});
});
