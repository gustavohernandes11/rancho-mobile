import { Select } from "components/Select";
import { Span } from "components/Span";
import moment from "moment";
import { useState } from "react";
import { Item } from "types/Item";
import { monthItems } from "./monthItems";
import { serializeLastTenYears } from "./serializeLastTenYears";

type MonthAndYearSelectProps = {
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
};

export const MonthAndYearSelect = ({
	selectedDate,
	setSelectedDate,
}: MonthAndYearSelectProps) => {
	const [year, setYear] = useState<number>(selectedDate.getFullYear());
	const [month, setMonth] = useState<number>(
		moment(selectedDate).month() + 1
	);

	const handleSelectMonth = ({ value }: Item) => {
		setMonth(() => Number(value));

		if (month) {
			const newDate = moment(`${month}-${year}`, "MM-YYYY")
				.month(month - 1)
				.toDate();

			setSelectedDate(newDate);
		}
	};

	const handleSelectYear = ({ value }: Item) => {
		setYear(() => Number(value));

		if (year) {
			const newDate = moment(`${month}-${year}`, "MM-YYYY")
				.year(year)
				.toDate();
			setSelectedDate(newDate);
		}
	};

	const getMonthName = () =>
		monthItems.find((item) => item.value === month)?.key.toString() || " ";

	return (
		<Span direction="row">
			<Select
				backgroundColor="transparent"
				items={monthItems}
				defaultValue={`${month}`}
				onSelect={handleSelectMonth}
				defaultButtonText={getMonthName()}
			/>
			<Select
				backgroundColor="transparent"
				items={serializeLastTenYears()}
				defaultValue={`${year}`}
				onSelect={handleSelectYear}
				defaultButtonText={`${year}`}
			/>
		</Span>
	);
};
