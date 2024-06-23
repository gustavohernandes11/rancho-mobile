import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Item } from "types/Item";
import { Cell } from "./Cell";
import { MonthAndYearSelect } from "./MonthAndYearSelect";
import { WeekDayHeader } from "./WeekDayHeader";

interface MonthProductionCalendarProps {
	onSelectDate: (date: string) => void;
	onSelectMonth: (item: Item) => void;
	onSelectYear: (item: Item) => void;
	selectedDate: Date | null;
	month: number;
	year: number;
}

export type DayItem = {
	key: string;
	value: string;
	date: string;
	isCurrentMonth: boolean;
};

export const MonthProductionCalendar: React.FC<
	MonthProductionCalendarProps
> = ({
	onSelectDate,
	selectedDate,
	onSelectMonth,
	onSelectYear,
	month,
	year,
}) => {
	const [days, setDays] = useState<DayItem[]>([]);

	useEffect(() => {
		generateCalendar();
	}, [month, year]);

	const makeDayItem = (day: moment.Moment): DayItem => ({
		key: day.format("D"),
		value: day.format("D"),
		date: day.toISOString(),
		isCurrentMonth: true,
	});

	const generateCalendar = () => {
		const startOfMonth = moment(`${month}-${year}`, "MM-YYYY").startOf(
			"month"
		);
		const daysInMonth = startOfMonth.daysInMonth();

		let calendarDays: DayItem[] = [];

		for (let i = 1; i <= daysInMonth; i++) {
			const day = moment(startOfMonth).add(i - 1, "days");
			calendarDays.push(makeDayItem(day));
		}

		setDays(calendarDays);
	};

	const renderItem = ({ item }: { item: DayItem }) => {
		return (
			<Cell
				item={item}
				isSelected={
					selectedDate
						? moment(item.date).isSame(selectedDate, "day")
						: false
				}
				onSelect={() => onSelectDate(item.date)}
			/>
		);
	};

	return (
		<View>
			<MonthAndYearSelect
				month={month}
				year={year}
				onSelectMonth={onSelectMonth}
				onSelectYear={onSelectYear}
			/>
			<WeekDayHeader />
			<FlatList
				data={days}
				numColumns={7}
				keyExtractor={(item) => item.key}
				renderItem={renderItem}
			/>
		</View>
	);
};

export default MonthProductionCalendar;
