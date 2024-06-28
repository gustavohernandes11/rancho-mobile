import { nullifyFalsyFields } from "utils/nullifyFalsyFields";

describe("nullifyFalsyFields", () => {
    it("should turn empty string into null", () => {
        let obj = { name: "fake_name", description: "" };
        const result = nullifyFalsyFields(obj);
        expect(result.name).toBe("fake_name");
        expect(result.description).toBeNull();
    });

    it("should turn undefined string into null", () => {
        let obj = { name: "fake_name", description: undefined };
        const result = nullifyFalsyFields(obj);
        expect(result.name).toBe("fake_name");
        expect(result.description).toBeNull();
    });
});
