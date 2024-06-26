import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
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
	date: Date;
};

export const MonthProductionCalendar: React.FC<
	MonthProductionCalendarProps
> = ({ onSelectDate, selectedDate }) => {
	const [days, setDays] = useState<DayItem[]>([]);

	useEffect(() => {
		generateCells();
	}, [selectedDate]);

	const makeDayItem = (day: Date): DayItem => ({
		value: moment(day).format("D"),
		date: moment(day).toDate(),
	});

	const generateCells = () => {
		const startOfMonth = moment(selectedDate.toISOString()).startOf(
			"month"
		);
		const daysInMonth = startOfMonth.daysInMonth();
		let calendarDays: DayItem[] = [];

		for (let i = 1; i <= daysInMonth; i++) {
			const day = moment(startOfMonth).add(i - 1, "days");
			calendarDays.push(makeDayItem(day.toDate()));
		}

		setDays(calendarDays);
	};

	return (
		<View style={styles.calendar}>
			<MonthAndYearSelect
				selectedDate={selectedDate}
				setSelectedDate={onSelectDate}
			/>
			<WeekDayHeader />
			<View style={styles.daysContainer}>
				{days.map((item) => (
					<Cell
						key={item.date.toISOString()}
						item={item}
						isSelected={
							selectedDate
								? moment(item.date).isSame(selectedDate, "day")
								: false
						}
						onSelect={() => onSelectDate(new Date(item.date))}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	calendar: {
		borderColor: Colors.border,
		borderRadius: 8,
		elevation: 1,
	},
	daysContainer: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
	},
});
