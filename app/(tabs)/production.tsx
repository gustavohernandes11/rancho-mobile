import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { MonthProductionCalendar } from "components/MonthProductionCalendar";
import ProductionForm from "components/ProductionForm";
import { Span } from "components/Span";
import { Stack } from "expo-router";
import moment from "moment";
import React, { useState } from "react";

export default function ViewProductionScreen() {
	const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate());

	const handleSelectDate = (date: Date) => setSelectedDate(date);

	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: "Produção mensal",
				}}
			/>
			<Heading>{`Produção mensal`}</Heading>

			<Span direction="row">
				<MonthProductionCalendar
					onSelectDate={handleSelectDate}
					selectedDate={selectedDate}
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
