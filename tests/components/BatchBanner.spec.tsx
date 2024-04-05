import { BatchBanner } from "components/BatchBanner";
import { render, screen } from "tests/setupTests";

describe("BatchBanner", () => {
	const mockedBatch = {
		id: 1,
		name: "fake name",
		description: "fake description",
		count: 10,
	};
	it("should render the batch information on the screen", () => {
		render(<BatchBanner batch={mockedBatch} />);
		expect(screen.getByText("fake name")).toBeOnTheScreen();
		expect(screen.getByText("fake description")).toBeOnTheScreen();
		expect(screen.getByText("10 animais")).toBeOnTheScreen();
	});
	it("should render the grammatical flexion 'animal' when count is 1", () => {
		render(
			<BatchBanner
				batch={{
					id: 1,
					name: "fake name",
					description: "fake description",
					count: 1,
				}}
			/>
		);
		expect(screen.getByText("1 animal")).toBeOnTheScreen();
	});
	it("should render the grammatical flexion 'animais' when count is bigger then 0", () => {
		render(
			<BatchBanner
				batch={{
					id: 1,
					name: "fake name",
					description: "fake description",
					count: 10,
				}}
			/>
		);
		expect(screen.getByText("10 animais")).toBeOnTheScreen();
	});
});
