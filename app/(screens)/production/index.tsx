import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { InfoCard } from "components/InfoCard";
import { Paragraph } from "components/Paragraph";
import { MemoProductionChart } from "components/ProductionChart";
import { Span } from "components/Span";
import { calendarLocalePtBr } from "config/calendarLocalePtBr";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import moment from "moment";
import React, { useCallback, useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { MonthDetails } from "types/MonthDetails";
import { DayProduction } from "types/Production";
import { formatMonthToISO } from "utils/formatters";
import { valueOrHyphen } from "utils/valueOrHyphen";

export default function ViewProductionReportsPage() {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [production, setProduction] = useState<DayProduction[]>();
    const [monthDetails, setMonthDetails] = useState<MonthDetails>();
    const router = useRouter();

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

    useFocusEffect(
        useCallback(() => {
            getProduction();
            getMonthDetails();
        }, [formatMonthToISO(date)])
    );

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
    const countDaysWithAnyProduction = production?.filter(
        prod => prod.quantity > 0
    ).length;
    const monthAverage = () => {
        if (producedAmount && countDaysWithAnyProduction) {
            return producedAmount / countDaysWithAnyProduction;
        }
        return null;
    };
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
                        label="Total"
                        title={valueOrHyphen(producedAmount)}
                    />
                    <InfoCard
                        label="Média por dia"
                        title={valueOrHyphen(monthAverage())}
                    />
                </Span>
                <Span
                    align="stretch"
                    justify="space-between"
                    flexWrap="wrap"
                    marginY={0}
                >
                    <InfoCard
                        label="Preço unitário"
                        title={`R$ ${valueOrHyphen(
                            monthDetails?.pricePerLiter?.toFixed(2)
                        )}`}
                    />
                    <InfoCard
                        label="Valor total esperado"
                        title={`R$ ${valueOrHyphen(calculateTotal())}`}
                    />
                </Span>
                <Heading size="small">Qualidade</Heading>
                <Span align="stretch" justify="space-between" marginY={0}>
                    <InfoCard
                        label="Gordura"
                        title={`${valueOrHyphen(
                            monthDetails?.fatPorcentage?.toFixed(1)
                        )} %`}
                    />
                    <InfoCard
                        label="Proteína"
                        title={`${valueOrHyphen(
                            monthDetails?.proteinPorcentage?.toFixed(1)
                        )} %`}
                    />
                    <InfoCard
                        label="Lactose"
                        title={`${valueOrHyphen(
                            monthDetails?.lactosePorcentage?.toFixed(1)
                        )} %`}
                    />
                </Span>

                <Span align="stretch" justify="space-between" marginY={0}>
                    <InfoCard
                        label="CBT (mil/mL)"
                        title={valueOrHyphen(monthDetails?.totalBacteria)}
                    />
                    <InfoCard
                        label="CCS (mil/mL)"
                        title={valueOrHyphen(monthDetails?.totalSomaticCell)}
                    />
                </Span>
                <Span justify="flex-end" paddingY={8}>
                    <Button
                        title="Editar informações do mês"
                        icon="pencil"
                        onPress={() =>
                            router.push(
                                "/(screens)/production/add-month-details/" +
                                    formatMonthToISO(date)
                            )
                        }
                    />
                </Span>
                {monthDetails?.observation ? (
                    <>
                        <Heading size="small">Observação</Heading>
                        <Paragraph>
                            {valueOrHyphen(monthDetails.observation)}
                        </Paragraph>
                    </>
                ) : null}
            </Span>
        </ContainerView>
    );
}
