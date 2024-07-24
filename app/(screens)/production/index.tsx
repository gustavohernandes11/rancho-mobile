import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import DatePicker from "react-native-modern-datepicker";

import { Span } from "components/Span";
import { Stack } from "expo-router";
import moment from "moment";

import { Button } from "components/Button";
import { InfoCard } from "components/InfoCard";
import { calendarLocalePtBr } from "components/MonthProductionCalendar";
import { Paragraph } from "components/Paragraph";
import { MemoProductionChart } from "components/ProductionChart";
import React, { useEffect, useState } from "react";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { MonthDetails } from "types/MonthDetails";
import { DayProduction } from "types/Production";
import { formatInfo, formatMonthToISO } from "utils/formatters";

export default function ViewProductionReportsPage() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [production, setProduction] = useState<DayProduction[]>();
    const [monthDetails, setMonthDetails] = useState<MonthDetails>();

    const getProduction = async () => {
        await Storage.listPopulatedMonthProduction(date).then(prod => {
            setProduction(prod);
        });
    };
    const getMonthDetails = async () => {
        await Storage.getMonthDetails(date).then(details => {
            if (details) setMonthDetails(details);
        });
    };

    useEffect(() => {
        getProduction();
        getMonthDetails();
    }, [formatMonthToISO(date)]);

    const handleShowMonthPicker = () => {
        setShow(prev => !prev);
    };

    const handleMonthYearChange = (dateString: string) => {
        const newDate = moment(dateString, "YYYY MM").toDate();
        setDate(newDate);
        setShow(false);
    };

    const title = `Informações de ${moment(date).format("MMMM [de] YYYY")}`;
    const producedAmount = production?.reduce(
        (total, day) => total + day.quantity,
        0
    );
    const calculateTotal = () => {
        if (producedAmount && monthDetails?.pricePerLiter) {
            return (producedAmount * monthDetails.pricePerLiter).toFixed(2);
        }
    };

    return (
        <ContainerView>
            <Stack.Screen
                options={{
                    headerTitle: "Relatórios de produção",
                }}
            />
            <Button
                title={
                    show
                        ? "Cancelar"
                        : moment(date).format("MMMM/YYYY").toUpperCase()
                }
                type="secondary"
                onPress={handleShowMonthPicker}
            />
            {show ? (
                <Span>
                    <DatePicker
                        // @ts-ignore
                        configs={calendarLocalePtBr}
                        options={{
                            mainColor: Theme.colors.primary,
                        }}
                        locale="pt-br"
                        mode="monthYear"
                        onMonthYearChange={handleMonthYearChange}
                    />
                </Span>
            ) : null}
            <Span direction="column">
                <Heading>{title}</Heading>
                <MemoProductionChart production={production || []} />
            </Span>
            <Span direction="column">
                <Heading size="small">Vendas</Heading>
                <Span
                    align="stretch"
                    justify="space-between"
                    flexWrap="wrap"
                    marginY={0}
                >
                    <InfoCard
                        label="Litros produzidos"
                        title={formatInfo(producedAmount)}
                    />
                    <InfoCard
                        label="Preço unitário"
                        title={`R$ ${formatInfo(
                            monthDetails?.pricePerLiter?.toFixed(2)
                        )}`}
                    />
                    <InfoCard
                        size="small"
                        label="Valor total"
                        title={`R$ ${formatInfo(calculateTotal())}`}
                    />
                </Span>
                <Heading size="small">Qualidade</Heading>
                <Span align="stretch" justify="space-between" marginY={0}>
                    <InfoCard
                        label="Gordura"
                        title={`${formatInfo(
                            monthDetails?.fatPorcentage?.toFixed(1)
                        )} %`}
                    />
                    <InfoCard
                        label="Proteína"
                        title={`${formatInfo(
                            monthDetails?.proteinPorcentage?.toFixed(1)
                        )} %`}
                    />
                    <InfoCard
                        label="Lactose"
                        title={`${formatInfo(
                            monthDetails?.lactosePorcentage?.toFixed(1)
                        )} %`}
                    />
                </Span>
                <Span align="stretch" justify="space-between" marginY={0}>
                    <InfoCard
                        label="CBT (mil/mL)"
                        title={formatInfo(monthDetails?.totalBacteria)}
                    />
                    <InfoCard
                        label="CCS (mil/mL)"
                        title={formatInfo(monthDetails?.totalSomaticCell)}
                    />
                </Span>
                {monthDetails?.observation ? (
                    <>
                        <Heading size="small">Observação</Heading>
                        <Paragraph>
                            {formatInfo(monthDetails.observation)}
                        </Paragraph>
                    </>
                ) : null}
            </Span>
        </ContainerView>
    );
}
