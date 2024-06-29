import { Loading } from "components/Loading";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Storage } from "services/StorageService";
import Colors from "styles/Colors";
import { DayProduction } from "types";
import { chartConfig } from "./chartConfig";

type ProductionChartProps = {
    monthNumber: number;
    yearNumber: number;
};

const serializeDays = (n: number) => {
    const labels = [];
    for (let i = 0; i < n; i++) {
        labels.push((i + 1).toString());
    }
    return labels;
};

export const ProductionChart = ({
    monthNumber,
    yearNumber,
}: ProductionChartProps) => {
    const [monthProduction, setMonthProduction] = useState<DayProduction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const date = new Date(yearNumber, monthNumber - 1);
        setIsLoading(true);
        Storage.listMonthProduction(date)
            .then(prod => {
                setMonthProduction(prod);
            })
            .finally(() => setIsLoading(false));
    }, [monthNumber, yearNumber]);

    const generateData = (): number[] => {
        const daysInMonth = new Date(yearNumber, monthNumber, 0).getDate();
        const data = Array(daysInMonth).fill(0);

        monthProduction.forEach(prod => {
            const day = parseInt(prod.day.split("-")[2], 10);
            data[day - 1] = prod.quantity;
        });

        return data;
    };

    // const getTotal = () => {
    //     return monthProduction.reduce((acc, prod) => acc + prod.quantity, 0);
    // };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <View
            style={{
                borderRadius: 8,
            }}
        >
            <ScrollView horizontal={true}>
                <BarChart
                    data={{
                        labels: serializeDays(
                            new Date(yearNumber, monthNumber, 0).getDate()
                        ),
                        datasets: [
                            {
                                color: () => Colors.green,
                                data: generateData(),
                            },
                        ],
                    }}
                    width={850}
                    height={240}
                    yAxisSuffix="L"
                    yAxisInterval={1}
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    style={styles.chartStyle}
                    showBarTops={false}
                    withInnerLines={true}
                    showValuesOnTopOfBars={true}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    chartStyle: {
        borderBottomRightRadius: 15,
        paddingRight: 0,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.border,
    },
});
