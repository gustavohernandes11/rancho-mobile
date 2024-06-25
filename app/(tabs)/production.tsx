import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { MonthProductionCalendar } from "components/MonthProductionCalendar";
import { ProductionChart } from "components/ProductionChart";
import { ProductionForm } from "components/ProductionForm";
import { Span } from "components/Span";
import { Stack } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { Text } from "react-native-paper";
import {
	getFormattedMonthAndYear,
	getFormattedPtBRDate,
} from "utils/formatters";

export default function ViewProductionScreen() {
	const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate());
	const [updateUINumber, setUpdateUINumber] = useState(0);

	const handleSelectDate = (date: Date) => {
		setSelectedDate(date);
	};

	const updateUI = () => {
		setUpdateUINumber(updateUINumber + 1);
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
					onSubmitCallback={updateUI}
				/>
			</Span>
			<Span direction="row">
				<Heading>
					{"Gráfico de produção " +
						getFormattedMonthAndYear(selectedDate)}
				</Heading>
				<Span>
					<ProductionChart
						key={updateUINumber}
						yearNumber={Number(moment(selectedDate).year())}
						monthNumber={Number(moment(selectedDate).month() + 1)}
					/>
				</Span>
			</Span>
		</ContainerView>
	);
}
