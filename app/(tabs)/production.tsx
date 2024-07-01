import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { MonthProductionCalendar } from "components/MonthProductionCalendar";
import { ProductionForm } from "components/ProductionForm";
import { Span } from "components/Span";
import { Stack } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { Text } from "react-native";
import { commonStyles } from "styles/Common";

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
            <Heading>Calendário de produção</Heading>
            <Span direction="row">
                <MonthProductionCalendar
                    updateUINumber={updateUINumber}
                    onSelectDate={handleSelectDate}
                    selectedDate={selectedDate}
                />
            </Span>
            <Text style={commonStyles.text}>
                Selecione uma data no calendário e insira a quantidade
                produzida.
            </Text>
            <Span direction="column">
                <ProductionForm
                    selectedDate={selectedDate}
                    onSubmitCallback={updateUI}
                />
            </Span>
        </ContainerView>
    );
}
