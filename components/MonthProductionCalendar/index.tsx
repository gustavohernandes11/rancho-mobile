import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Colors from "styles/Colors";
import { Cell } from "./Cell";
import { MonthAndYearSelect } from "./MonthAndYearSelect";
import { WeekDayHeader } from "./WeekDayHeader";

interface MonthProductionCalendarProps {
	onSelectDate: (date: Date) => void;
	selectedDate: Date;
}

export type DayItem = {
	value: string;
	date: string;
};

export const MonthProductionCalendar: React.FC<
	MonthProductionCalendarProps
> = ({ onSelectDate, selectedDate }) => {
	const [days, setDays] = useState<DayItem[]>([]);

	useEffect(() => {
		generateCalendar();
	}, [selectedDate]);

	const makeDayItem = (day: moment.Moment): DayItem => ({
		value: day.format("D"),
		date: day.toISOString(),
	});

	const generateCalendar = () => {
		console.log("build calendar");
		console.log("selected date: " + selectedDate);
		const startOfMonth = moment(selectedDate.toISOString()).startOf(
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
				onSelect={() => onSelectDate(new Date(item.date))}
			/>
		);
	};

	return (
		<View
			style={{
				borderColor: Colors.border,
				borderWidth: 1,
				borderRadius: 8,
				shadowColor: "black",
				shadowOpacity: 0.1,
				elevation: 2,
			}}
		>
			<MonthAndYearSelect
				selectedDate={selectedDate}
				setSelectedDate={onSelectDate}
			/>
			<WeekDayHeader />
			<FlatList
				data={days}
				numColumns={7}
				keyExtractor={(item) => item.date}
				renderItem={renderItem}
			/>
		</View>
	);
};
