import { nullifyFalsyFields } from "utils/nullifyFalsyFields";

describe("nullifyFalsyFields", () => {
	it("should turn empty string into null", () => {
		let obj = { name: "A", description: "" };
		const result = nullifyFalsyFields(obj);
		expect(result.name).toBe("A");
		expect(result.description).toBeNull();
	});
	it("should turn undefined string into null", () => {
		let obj = { name: "A", description: undefined };
		const result = nullifyFalsyFields(obj);
		expect(result.name).toBe("A");
		expect(result.description).toBeNull();
	});
});
