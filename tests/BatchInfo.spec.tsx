import { render, screen } from "../utils/setupTests";

import { BatchInfo } from "../components/BatchInfo";

describe("BatchInfo", () => {
	const mockedBatch = {
		name: "Bezerros",
		description: "Bezerros de 1 a 2 anos de idade",
		count: 23,
	};
	it("should render the batch information on the screen", () => {
		render(<BatchInfo batch={mockedBatch} />);
		expect(screen.getByText("Bezerros")).toBeOnTheScreen();
		expect(
			screen.getByText("Bezerros de 1 a 2 anos de idade")
		).toBeOnTheScreen();
		expect(screen.getByText("23 animais")).toBeOnTheScreen();
	});
	it("should render the grammatical flexion 'animal' [pt-BR] when count is 1", () => {
		render(
			<BatchInfo batch={{ name: "any", description: "any", count: 1 }} />
		);
		expect(screen.getByText("1 animal")).toBeOnTheScreen();
	});
	it("should render the grammatical flexion 'animais' [pt-BR] when count is bigger then 0", () => {
		render(
			<BatchInfo
				batch={{ name: "any", description: "any", count: 123 }}
			/>
		);
		expect(screen.getByText("123 animais")).toBeOnTheScreen();
	});
});
