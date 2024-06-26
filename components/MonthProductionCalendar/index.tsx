import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Colors from "styles/Colors";
import { MemoizedCell } from "./Cell";
import { MonthAndYearSelect } from "./MonthAndYearSelect";

interface MonthProductionCalendarProps {
	onSelectDate: (date: Date) => void;
	selectedDate: Date;
	updateUINumber: number;
}

export type DayItem = {
	value: string;
	date: Date;
};

export const MonthProductionCalendar: React.FC<
	MonthProductionCalendarProps
> = ({ onSelectDate, selectedDate, updateUINumber }) => {
	const [days, setDays] = useState<DayItem[]>([]);

	useEffect(() => {
		generateCells();
	}, [selectedDate]);

	const month = selectedDate.getMonth();
	const year = selectedDate.getFullYear();

	const generateCells = useCallback(() => {
		const startOfMonth = moment(new Date(year, month)).startOf("month");
		const daysInMonth = startOfMonth.daysInMonth();
		let calendarDays: DayItem[] = [];

		for (let i = 1; i <= daysInMonth; i++) {
			const day = moment(startOfMonth).add(i - 1, "days");

			calendarDays.push({
				value: day.format("D"),
				date: day.toDate(),
			});
		}

		setDays(calendarDays);
	}, [month, year]);

	return (
		<View style={styles.calendar}>
			<MonthAndYearSelect
				selectedDate={selectedDate}
				setSelectedDate={onSelectDate}
			/>
			{/* <WeekDayHeader />  need adjust */}
			<View style={styles.daysContainer}>
				{days.map((item) => (
					<MemoizedCell
						key={item.date.toISOString()}
						updateUINumber={updateUINumber}
						item={item}
						isSelected={
							selectedDate
								? moment(item.date).isSame(selectedDate, "day")
								: false
						}
						onSelect={onSelectDate}
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
