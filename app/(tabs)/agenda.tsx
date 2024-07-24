import { Button } from "components/Button";
import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { DayProductionForm } from "components/DayProductionForm";
import { Heading } from "components/Heading";
import { MonthDetailsForm } from "components/MonthDetailsForm";
import { MonthProductionCalendar } from "components/MonthProductionCalendar";
import { Span } from "components/Span";
import { Stack, useRouter } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { formatDateToLongPtBR, formatMonthToISO } from "utils/formatters";

export default function ViewAgendaScreen() {
    const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate());
    const router = useRouter();

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
                    headerRight: () => (
                        <Button
                            title="Nova anotação"
                            icon="bookmark-plus"
                            onPress={() =>
                                router.push(
                                    `/(screens)/annotations/add-with-selected-date/${selectedDate.toISOString()}`
                                )
                            }
                        />
                    ),
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
                <DayProductionForm selectedDate={selectedDate} />
            </Span>
            <Span direction="column">
                <Heading>{monthDetailsLabel}</Heading>
                <MonthDetailsForm month={formatMonthToISO(selectedDate)} />
            </Span>
        </ContainerView>
    );
}
