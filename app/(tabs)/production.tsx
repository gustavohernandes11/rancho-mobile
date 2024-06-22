import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { DatePicker } from "components/DatePicker";
import { Heading } from "components/Heading";
import { Input } from "components/Input";
import MonthProductionCalendar from "components/MonthProductionCalendar";
import { monthItems } from "components/MonthProductionCalendar/monthItems";
import { serializeLastTenYears } from "components/MonthProductionCalendar/serializeLastTenYears";
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

	console.log(selectedDate);
	console.log(month);
	console.log(year);

	// To do
	// build the new calendar when changing month
	// implement Storage services to production
	// add month production chart

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

	const handleSelectDate = (date: Date) => {
		setMonth(date.getMonth() + 1);
		setSelectedDate(date);
	};

	const actualMonth = monthItems
		.find((item) => item.value === moment().month() + 1)
		?.key.toString();

	const actualYear = moment().year().toString();

	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: "Produção mensal",
				}}
			/>
			<Heading>{`Produção de ${actualMonth}/${year}`}</Heading>
			<Span direction="row">
				<Select
					label="Mês"
					items={monthItems}
					defaultValue={actualMonth}
					onSelect={handleSelectMonth}
					defaultButtonText={actualMonth}
				/>
				<Select
					label="Ano"
					items={serializeLastTenYears()}
					defaultValue={actualYear}
					onSelect={handleSelectYear}
					defaultButtonText={actualYear}
				/>
			</Span>

			<Span direction="row">
				<MonthProductionCalendar
					month={month}
					onSelectDate={handleSelectDate}
					selectedDate={selectedDate}
				/>
			</Span>

			<Span direction="column">
				<Heading size="small">
					Atualizar litros de leite produzidos
				</Heading>
				<DatePicker
					label="Dia"
					inputMode={"start"}
					value={selectedDate}
					onChange={(date) => setSelectedDate(moment(date).toDate())}
				/>
				<Input label="Litros" keyboardType="numeric" />
				<Span direction="row" justify="flex-end">
					<Button onPress={() => {}} title="Salvar" />
				</Span>
			</Span>
		</ContainerView>
	);
}
