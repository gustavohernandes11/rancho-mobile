import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { MonthAndYearSelect } from "components/MonthProductionCalendar/MonthAndYearSelect";
import { ProductionChart } from "components/ProductionChart";
import { SimpleTable } from "components/SimpleTable";
import { Span } from "components/Span";
import { Stack } from "expo-router";
import React from "react";

export default function ViewProductionReportsPage() {
    return (
        <ContainerView>
            <Stack.Screen
                options={{
                    headerTitle: "Relatórios de produção",
                }}
            />
            <MonthAndYearSelect
                selectedDate={new Date()}
                setSelectedDate={() => {}}
            />
            <Span direction="column">
                <Heading size="small">
                    Gráfico de produção do mês de _Agosto
                </Heading>
                <ProductionChart />
            </Span>
            <Span direction="column">
                <Heading size="small">Informações do mês</Heading>
                <SimpleTable
                    data={[
                        { key: "Litros produzidos", value: "5689" },
                        {
                            key: "Preço de venda unitário",
                            value: "R$ 2,50",
                        },
                        {
                            key: "Valor total",
                            value: "R$ 14.222,50",
                        },
                        {
                            key: "Gordura média (%)",
                            value: "3,54%",
                        },
                        {
                            key: "Proteína média (%)",
                            value: "4,4%",
                        },
                    ]}
                />
            </Span>
        </ContainerView>
    );
}
