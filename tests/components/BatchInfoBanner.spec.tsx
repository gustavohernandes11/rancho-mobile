import { BatchBanner } from "components/BatchBanner";
import { render, screen } from "utils/setup-tests";

describe("BatchBanner", () => {
	const mockedBatch = {
		id: 1,
		name: "Bezerros",
		description: "Bezerros de 1 a 2 anos de idade",
		count: 23,
	};
	it("should render the batch information on the screen", () => {
		render(<BatchBanner batch={mockedBatch} />);
		expect(screen.getByText("Bezerros")).toBeOnTheScreen();
		expect(
			screen.getByText("Bezerros de 1 a 2 anos de idade")
		).toBeOnTheScreen();
		expect(screen.getByText("23 animais")).toBeOnTheScreen();
	});
	it("should render the grammatical flexion 'animal' [pt-BR] when count is 1", () => {
		render(
			<BatchBanner
				batch={{ id: 1, name: "any", description: "any", count: 1 }}
			/>
		);
		expect(screen.getByText("1 animal")).toBeOnTheScreen();
	});
	it("should render the grammatical flexion 'animais' [pt-BR] when count is bigger then 0", () => {
		render(
			<BatchBanner
				batch={{ id: 1, name: "any", description: "any", count: 123 }}
			/>
		);
		expect(screen.getByText("123 animais")).toBeOnTheScreen();
	});
});
