import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import moment from "moment";
import React, { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Theme from "styles/Theme";
import { DayProduction } from "types/Production";
import { formatDateToShortPtBR, formatMonthToISO } from "utils/formatters";
import { Point } from "./Point";

type ProductionChartType = {
    production: DayProduction[];
};

const isEqual = (prev: ProductionChartType, next: ProductionChartType) => {
    const getMonthString = (dayString: string) =>
        formatMonthToISO(moment(dayString).toDate());

    const prevMonth = prev.production.length > 0 ? prev.production[0]?.day : "";
    const nextMonth = next.production.length > 0 ? next.production[0]?.day : "";

    return getMonthString(prevMonth) === getMonthString(nextMonth);
};

export const ProductionChart = ({ production }: ProductionChartType) => {
    type Point = {
        value: number;
        label: string;
        date: string;
    };

    const data =
        production?.map(p => ({
            value: p.quantity,
            label: moment(p.day).format("DD"),
            date: p.day,
        })) || [];

    const hasProduction = production?.some(day => day.quantity > 0);

    return (
        <View style={styles.container}>
            {hasProduction ? (
                <Span my={0} mx={8}>
                    <Paragraph secondary>
                        Gráfico de litros produzidos por dia
                    </Paragraph>
                    <BarChart
                        data={data}
                        barWidth={16}
                        barBorderTopLeftRadius={2}
                        barBorderTopRightRadius={2}
                        renderTooltip={(p: Point) => (
                            <Point
                                formattedValue={`${p.value || 0} litros`}
                                formattedTime={formatDateToShortPtBR(
                                    moment(p.date).toDate()
                                )}
                            />
                        )}
                        height={200}
                        spacing={8}
                        color={Theme.colors.primary}
                        frontColor={Theme.colors.primary}
                        isAnimated
                        showScrollIndicator
                        barStyle={{
                            borderRadius: 6,
                        }}
                    />
                </Span>
            ) : (
                <Paragraph>
                    Adicione litros de leite produzidos para gerar um gráfico.
                </Paragraph>
            )}
        </View>
    );
};

export const MemoProductionChart = memo(ProductionChart, isEqual);

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("screen").width - 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Theme.colors.lightGray,
        paddingVertical: 8,
        overflow: "hidden",
    },
});
