import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { MonthProductionCalendar } from "components/MonthProductionCalendar";
import { ProductionForm } from "components/ProductionForm";
import { Span } from "components/Span";
import { Stack } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { Text } from "react-native-paper";
import { getFormattedPtBRDate } from "utils/formatters";

export default function ViewProductionScreen() {
	const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate());

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
				/>
			</Span>
		</ContainerView>
	);
}
