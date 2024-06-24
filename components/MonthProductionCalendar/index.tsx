import moment from "moment";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
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
		generateCells();
	}, [selectedDate]);

	const makeDayItem = (day: moment.Moment): DayItem => ({
		value: day.format("D"),
		date: day.toISOString(),
	});

	const generateCells = () => {
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

	return (
		<View
			style={{
				borderColor: Colors.border,
				borderRadius: 8,
				elevation: 2,
			}}
		>
			<MonthAndYearSelect
				selectedDate={selectedDate}
				setSelectedDate={onSelectDate}
			/>
			<WeekDayHeader />

			<View
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
				}}
			>
				{days.map((item) => (
					<Cell
						key={item.date}
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
