import { Select } from "components/Select";
import { Span } from "components/Span";
import { Item } from "types/Item";
import { monthItems } from "./monthItems";
import { serializeLastTenYears } from "./serializeLastTenYears";

type MonthAndYearSelectProps = {
	month: number;
	year: number;
	onSelectMonth: (item: Item) => void;
	onSelectYear: (item: Item) => void;
};

export const MonthAndYearSelect = ({
	month,
	year,
	onSelectMonth,
	onSelectYear,
}: MonthAndYearSelectProps) => {
	const getMonthName = () =>
		monthItems.find((item) => item.value === month)?.key.toString() || " ";

	return (
		<Span direction="row">
			<Select
				label="Mês"
				items={monthItems}
				defaultValue={`${month}`}
				onSelect={onSelectMonth}
				defaultButtonText={getMonthName()}
			/>
			<Select
				label="Ano"
				items={serializeLastTenYears()}
				defaultValue={`${year}`}
				onSelect={onSelectYear}
				defaultButtonText={`${year}`}
			/>
		</Span>
	);
};
