import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { MonthDetailsForm } from "components/MonthDetailsForm";
import { MonthProductionCalendar } from "components/MonthProductionCalendar";
import { ProductionForm } from "components/ProductionForm";
import { SimpleTable } from "components/SimpleTable";
import { Span } from "components/Span";
import { Stack } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { formatDateToLongPtBR, formatMonthToISO } from "utils/formatters";

export default function ViewAgendaScreen() {
    const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate());

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
    };

    const dayDetailsLabel = `Informações do dia ${formatDateToLongPtBR(
        selectedDate
    )}`;
    const monthDetailsLabel = `Informações do mês de ${moment(
        selectedDate
    ).format("MMMM/YYYY")}`;

    return (
        <ContainerView>
            <Stack.Screen
                options={{
                    headerTitle: "Agenda",
                }}
            />
            <Span>
                <Card
                    iconSource={require("assets/images/BookMarkIcon.png")}
                    alt="Ir para anotações"
                    href="/annotations"
                    title="Anotações"
                    color="cian"
                    size="small"
                />
                <Card
                    href="/production"
                    alt="Production"
                    iconSource={require("assets/images/ChartIcon.png")}
                    title="Produção"
                    color="purple"
                    size="small"
                />
            </Span>
            <MonthProductionCalendar
                onSelectDate={handleSelectDate}
                selectedDate={selectedDate}
            />
            <Span direction="column">
                <Heading>{dayDetailsLabel}</Heading>
                <ProductionForm
                    selectedDate={selectedDate}
                    onSubmitCallback={() => {}}
                />
            </Span>
            <Span direction="column">
                <Heading>{monthDetailsLabel}</Heading>
                <SimpleTable
                    data={[
                        { key: "Total de litros produzidos", value: "5689" },
                        {
                            key: "Valor esperado (preço 2,50)",
                            value: "R$ 14.222,50",
                        },
                    ]}
                />
            </Span>
            <Span direction="column">
                <Heading size="small">Qualidade do leite</Heading>
                <MonthDetailsForm month={formatMonthToISO(selectedDate)} />
            </Span>
        </ContainerView>
    );
}
