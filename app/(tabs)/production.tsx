import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import MonthProductionCalendar from "components/MonthProductionCalendar";
import ProductionForm from "components/ProductionForm";
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

	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: "Produção mensal",
				}}
			/>
			<Heading>{`Salve seu histórico de produção`}</Heading>

			<Span direction="row">
				<MonthProductionCalendar
					onSelectDate={handleSelectDate}
					onSelectMonth={handleSelectMonth}
					onSelectYear={handleSelectYear}
					selectedDate={selectedDate}
					year={year}
					month={month}
				/>
			</Span>
			<Span direction="column">
				<Heading size="small">
					Selecione uma data no calendário ou no campo abaixo:
				</Heading>
				<ProductionForm
					initialQuantity={0}
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
				/>
			</Span>
		</ContainerView>
	);
}
