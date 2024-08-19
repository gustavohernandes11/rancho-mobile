import { Button } from "components/Button";
import { Calendar } from "components/Calendar";
import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { DayProductionForm } from "components/DayProductionForm";
import { Heading } from "components/Heading";
import { Span } from "components/Span";
import { Stack, useRouter } from "expo-router";
import { useControlledCalendar } from "hooks/useControlledCalendar";
import moment from "moment";
import React from "react";
import { IconButton } from "react-native-paper";

export default function ViewAgendaScreen() {
    const {
        selectedDateId,
        setSelectedDateId,
        onPressNextMonth,
        onPressPrevMonth,
    } = useControlledCalendar();
    const router = useRouter();

    const monthQualityDetailsLabel = `Inserir qualidade do leite em ${moment(
        selectedDateId
    ).format("MMMM/YYYY")}`;

    const monthLabel = moment(selectedDateId).format("MMMM/YYYY");

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
                                    `/(screens)/annotations/add-with-selected-date/${selectedDateId}`
                                )
                            }
                        />
                    ),
                }}
            />
            <Span justify="space-between" align="center" marginY={0}>
                <IconButton icon={"arrow-left"} onPress={onPressPrevMonth} />
                <Heading>{monthLabel}</Heading>
                <IconButton icon={"arrow-right"} onPress={onPressNextMonth} />
            </Span>
            <Span>
                <Calendar
                    onSelectDate={setSelectedDateId}
                    selectedDate={selectedDateId}
                />
            </Span>
            <Span>
                <Heading size="small">Informações do dia selecionado</Heading>
                <Span marginY={0}>
                    <DayProductionForm selectedDate={selectedDateId} />
                </Span>
            </Span>
            <Span>
                <Heading size="small">Mais ações</Heading>
                <Span marginY={0}>
                    <Card
                        href={"/production/add-month-details/" + selectedDateId}
                        alt="Production"
                        iconSource={require("assets/images/ChartIcon_green.png")}
                        title={monthQualityDetailsLabel}
                    />
                </Span>
                <Span>
                    <Card
                        iconSource={require("assets/images/BookMarkIcon_green.png")}
                        alt="Ir para anotações"
                        href="/annotations"
                        title="Ver todas as anotações"
                        color="cian"
                    />
                    <Card
                        href="/production"
                        alt="Production"
                        iconSource={require("assets/images/ChartIcon_green.png")}
                        title="Relatório de produção"
                        color="purple"
                    />
                </Span>
            </Span>
        </ContainerView>
    );
}
