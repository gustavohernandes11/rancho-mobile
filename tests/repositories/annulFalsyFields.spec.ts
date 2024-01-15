import { annulFalsyFields } from "utils/annulFalsyFields";

describe("annulFalsyFields", () => {
	it("should turn empty string into null", () => {
		let obj = { name: "A", description: "" };
		annulFalsyFields(obj);
		expect(obj.name).toBe("A");
		expect(obj.description).toBeNull();
	});
	it("should turn undefined string into null", () => {
		let obj = { name: "A", description: undefined };
		annulFalsyFields(obj);
		expect(obj.name).toBe("A");
		expect(obj.description).toBeNull();
	});
});
