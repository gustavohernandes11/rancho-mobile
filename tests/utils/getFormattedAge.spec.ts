import moment from "moment";
import { getFormattedAge } from "utils/formatters";
jest.useFakeTimers().setSystemTime(new Date("2024-01-20"));

describe("getFormattedAge", () => {
	it("should return 0 days if the age is less than one day", () => {
		const date = moment().toISOString();
		const formatted = getFormattedAge(date);
		expect(formatted).toBe("0 dias");
	});
	it("should return the days, if the age is less than one month", () => {
		const date = moment().subtract(14, "days").toISOString();
		const formatted = getFormattedAge(date);
		expect(formatted).toBe("14 dias");
	});
	it("should return in the singular inflexion 'day', when 'days' is equal 1", () => {
		const date = moment().subtract(1, "days").toISOString();
		const formatted = getFormattedAge(date);
		expect(formatted).toBe("1 dia");
	});
	it("should return the months, if the age is less than a year", () => {
		const date = moment().subtract(3, "M").toISOString();
		const formatted = getFormattedAge(date);
		expect(formatted).toBe("3 meses");
	});
	it("should return the singular inflexion 'month', when 'months' is equal 1", () => {
		const date = moment().subtract(1, "M").toISOString();
		const formatted = getFormattedAge(date);
		expect(formatted).toBe("1 mês");
	});
	it("should return only the years, if the age have complete years with 0 remaining months", () => {
		const date = moment()
			.subtract(2, "years")
			.subtract(3, "days")
			.toISOString();
		const formatted = getFormattedAge(date);
		expect(formatted).toBe("2 anos");
	});
	it("should return the singular inflexion 'year', when 'years' is equal 1", () => {
		const date = moment()
			.subtract(1, "years")
			.subtract(3, "days")
			.toISOString();
		const formatted = getFormattedAge(date);
		expect(formatted).toBe("1 ano");
	});
	it("should return the singular inflexion 'year' or 'month', when 'years' or 'months' is equal 1", () => {
		const date = moment()
			.subtract(1, "years")
			.subtract(1, "months")
			.subtract(3, "days")
			.toISOString();
		const formatted = getFormattedAge(date);
		expect(formatted).toBe("1 ano e 1 mês");
	});
	it("should return the singular inflexion 'year', when 'years' is equal 1 even though months > 1", () => {
		const date = moment()
			.subtract(1, "years")
			.subtract(2, "months")
			.subtract(3, "days")
			.toISOString();
		const formatted = getFormattedAge(date);
		expect(formatted).toBe("1 ano e 2 meses");
	});
	it("should return only the years and months, if the age have complete years and months remaining", () => {
		const date = moment().subtract(2, "y").subtract(3, "M").toISOString();
		const formatted = getFormattedAge(date);
		expect(formatted).toBe("2 anos e 3 meses");
	});
});
