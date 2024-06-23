import moment from "moment";
import { Item } from "types/Item";

export const serializeLastTenYears = (): Item[] => {
	const currentYear = moment().year();
	const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

	return years.map((year) => ({
		key: year.toString(),
		value: year,
	}));
};
