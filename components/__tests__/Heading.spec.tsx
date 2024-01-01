import { render, screen } from "./setupTests";

import { Heading } from "../Heading";

describe("StyledButton", () => {
	it("should render the text", () => {
		render(<Heading>FOO</Heading>);
		const sut = screen.getByRole("text");
		expect(sut).toHaveTextContent("FOO");
	});
});
