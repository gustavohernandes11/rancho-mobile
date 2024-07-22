import { Loading } from "components/Loading";
import { Paragraph } from "components/Paragraph";
import { useFocus } from "hooks/useFocus";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { DayProduction } from "types/Production";
import { formatDateToShortPtBR } from "utils/formatters";
import { Point } from "./Point";

export const ProductionChart = () => {
    const [production, setProduction] = useState<DayProduction[]>();
    const [isLoading, setIsLoading] = useState(true);

    const getProduction = async () => {
        await Storage.listPopulatedMonthProduction(new Date()).then(prod => {
            setProduction(prod);
        });
    };

    // Update on focus
    useFocus(() => {
        getProduction();
    });

    // First load
    useEffect(() => {
        getProduction().then(() => {
            setIsLoading(false);
        });
    }, []);

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

    if (isLoading) return <Loading />;

    return (
        <View style={styles.container}>
            {hasProduction ? (
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
            ) : (
                <Paragraph>
                    Adicione litros de leite produzidos para gerar um gráfico.
                </Paragraph>
            )}
        </View>
    );
};

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
