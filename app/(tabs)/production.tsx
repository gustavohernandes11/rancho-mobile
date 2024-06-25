import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { MonthProductionCalendar } from "components/MonthProductionCalendar";
import { ProductionChart } from "components/ProductionChart";
import { ProductionForm } from "components/ProductionForm";
import { Span } from "components/Span";
import { Stack } from "expo-router";
import { useForceUpdate } from "hooks/useForceUpdate";
import moment from "moment";
import React, { useState } from "react";
import { Text } from "react-native-paper";
import {
	getFormattedMonthAndYear,
	getFormattedPtBRDate,
} from "utils/formatters";

const exampleData = [
	1, 5, 3, 5, 12, 4, 2, 3, 12, 23, 1, 5, 3, 5, 12, 1, 5, 3, 5, 12, 4, 2, 3,
	12, 23, 1, 5, 3, 5, 12, 12,
];

export default function ViewProductionScreen() {
	const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate());
	const forceUpdate = useForceUpdate();

	const handleSelectDate = (date: Date) => {
		setSelectedDate(date);
	};

	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: "Produção mensal",
				}}
			/>
			<Heading>{`Calendário de produção`}</Heading>
			<Heading size="small">
				Selecione uma data no calendário e insira a quantidade
				produzida.
			</Heading>
			<Span direction="row">
				<MonthProductionCalendar
					onSelectDate={handleSelectDate}
					selectedDate={selectedDate}
				/>
			</Span>
			<Text>
				{"Dia selecionado: " + getFormattedPtBRDate(selectedDate)}
			</Text>
			<Span direction="column">
				<ProductionForm
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					onSubmitCallback={forceUpdate}
				/>
			</Span>
			<Span direction="row">
				<Heading>
					{"Gráfico de produção " +
						getFormattedMonthAndYear(selectedDate)}
				</Heading>
				<ProductionChart data={exampleData} />
			</Span>
		</ContainerView>
	);
}
