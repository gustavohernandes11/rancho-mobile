import { render, screen } from "./setupTests";

import { Heading } from "../Heading";

describe("Heading", () => {
	it("should render the text", () => {
		render(<Heading>FOO</Heading>);
		const sut = screen.getByRole("text");
		expect(sut).toHaveTextContent("FOO");
		expect(sut).toBeOnTheScreen();
	});
	it("should set the fontSize on 14 when size is small", () => {
		render(<Heading size="small">FOO</Heading>);
		const sut = screen.getByRole("text");
		expect(sut).toHaveStyle({ fontSize: 14 });
	});
	it("should set the fontSize on 16 when no size is provided", () => {
		render(<Heading>FOO</Heading>);
		const sut = screen.getByRole("text");
		expect(sut).toHaveStyle({ fontSize: 16 });
	});
});
