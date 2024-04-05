import { BatchBanner } from "components/BatchBanner";
import { render, screen } from "tests/setupTests";

describe("BatchBanner", () => {
	it("should render the batch information on the screen", () => {
		const { getByText } = render(
			<BatchBanner
				batch={{
					id: 1,
					name: "fake_name",
					description: "fake_description",
					count: 10,
				}}
			/>
		);

		const name = getByText("fake_name");
		const description = getByText("fake_description");
		const count = getByText("10 animais");

		expect(name).toBeOnTheScreen();
		expect(description).toBeOnTheScreen();
		expect(count).toBeOnTheScreen();
	});

	it("should render the singular grammatical flexion when count is 1", () => {
		const { getByText } = render(
			<BatchBanner
				batch={{
					id: 1,
					name: "fake_name",
					description: "fake_description",
					count: 1,
				}}
			/>
		);

		const count = getByText("1 animal");

		expect(count).toBeOnTheScreen();
	});

	it("should render 'Vazio' when count is 0", () => {
		const { getByText } = render(
			<BatchBanner
				batch={{
					id: 1,
					name: "fake_name",
					description: "fake_description",
					count: 0,
				}}
			/>
		);

		const count = getByText("Vazio");

		expect(count).toBeOnTheScreen();
	});

	it("should render the plural grammatical flexion when count is bigger then 0", () => {
		const { getByText } = render(
			<BatchBanner
				batch={{
					id: 1,
					name: "fake_name",
					description: "fake_description",
					count: 10,
				}}
			/>
		);

		const count = getByText("10 animais");

		expect(count).toBeOnTheScreen();
	});
});
