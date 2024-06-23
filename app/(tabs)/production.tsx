import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import MonthProductionCalendar from "components/MonthProductionCalendar";
import { monthItems } from "components/MonthProductionCalendar/monthItems";
import { serializeLastTenYears } from "components/MonthProductionCalendar/serializeLastTenYears";
import ProductionForm from "components/ProductionForm";
import { Select } from "components/Select";
import { Span } from "components/Span";
import { Stack } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Item } from "types/Item";

export default function ViewProductionScreen() {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [month, setMonth] = useState<number>(
		moment(selectedDate).month() + 1
	);
	const [year, setYear] = useState<number>(selectedDate.getFullYear());

	useEffect(() => {
		if (month && selectedDate) {
			const newDate = moment(selectedDate)
				.month(month - 1)
				.toDate();
			setSelectedDate(newDate);
		}
	}, [month]);

	useEffect(() => {
		if (year && selectedDate) {
			const newDate = moment(selectedDate).year(year).toDate();
			setSelectedDate(newDate);
		}
	}, [year]);

	const handleSelectMonth = ({ value }: Item) => setMonth(+value);

	const handleSelectYear = ({ value }: Item) => setYear(+value);

	const handleSelectDate = (date: string) =>
		setSelectedDate(moment(date).toDate());

	const getMonthName = () =>
		monthItems.find((item) => item.value === month)?.key.toString() || " ";

	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: "Produção mensal",
				}}
			/>
			<Heading>{`Produção de ${moment(selectedDate).format(
				"MM"
			)}/${year}`}</Heading>
			<Span direction="row">
				<Select
					label="Mês"
					items={monthItems}
					defaultValue={`${month}`}
					onSelect={handleSelectMonth}
					defaultButtonText={getMonthName()}
				/>
				<Select
					label="Ano"
					items={serializeLastTenYears()}
					defaultValue={`${year}`}
					onSelect={handleSelectYear}
					defaultButtonText={`${year}`}
				/>
			</Span>

			<Span direction="row">
				<MonthProductionCalendar
					year={year}
					month={month}
					onSelectDate={handleSelectDate}
					selectedDate={selectedDate}
				/>
			</Span>

			<ProductionForm
				initialQuantity={0}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>
		</ContainerView>
	);
}
