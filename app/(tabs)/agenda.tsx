import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Input } from "components/Input";
import { MonthProductionCalendar } from "components/MonthProductionCalendar";
import { SimpleTable } from "components/SimpleTable";
import { Span } from "components/Span";
import { Stack } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { formatDateToLongPtBR } from "utils/formatters";

export default function ViewAgendaScreen() {
    const [selectedDate, setSelectedDate] = useState<Date>(moment().toDate());

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
    };

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
                <Heading>{`Informações do dia ${formatDateToLongPtBR(
                    selectedDate
                )}`}</Heading>
                <Input label="Litros de leite produzidos" />
            </Span>
            <Span direction="column">
                <Heading>
                    {`Informações do mês de ${moment(selectedDate).format(
                        "MMMM/YYYY"
                    )}`}
                </Heading>
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
                <Span my={0}>
                    <Input label="Gordura (%)" />
                    <Input label="Proteína (%)" />
                </Span>
                <Span my={0}>
                    <Input label="Contagem bacteriana total (CBT)" />
                    <Input label="Contagem células somáticas (CCS)" />
                </Span>
                <Span my={0} justify="flex-end">
                    <Input label="Preço de venda por litro" />
                    <Input label="Nível de lactose" />
                </Span>
                <Span my={0}>
                    <Input multiline label="Observação" />
                </Span>
            </Span>
        </ContainerView>
    );
}
