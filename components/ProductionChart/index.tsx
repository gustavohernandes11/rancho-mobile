import { Loading } from "components/Loading";
import { Paragraph } from "components/Paragraph";
import { useFocus } from "hooks/useFocus";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LineChart from "react-native-simple-line-chart";
import { Storage } from "services/StorageService";
import Colors from "styles/Colors";
import { DayProduction } from "types/Production";
import { formatDateToShortPtBR } from "utils/formatters";
import { Point } from "./Point";

export function ProductionChart() {
    const [production, setProduction] = useState<DayProduction[]>();
    const [isLoading, setIsLoading] = useState(true);

    const getProduction = async () => {
        await Storage.listPopulatedMonthProduction(new Date()).then(prod =>
            setProduction(prod)
        );
    };

    // udpate on focus
    useFocus(() => {
        getProduction();
    });

    // first load
    useEffect(() => {
        getProduction().then(() => {
            setIsLoading(false);
        });
    }, []);

    const data =
        production?.map(p => ({
            y: p.quantity,
            x: new Date(p.day).getTime(),
            extraData: {
                formattedValue: `${p.quantity} litros`,
                formattedTime: formatDateToShortPtBR(new Date(p.day)),
            },
        })) || [];

    if (isLoading) return <Loading />;
    const hasProduction = production?.some(day => day.quantity > 0);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                {hasProduction ? (
                    <LineChart
                        lines={[
                            {
                                data,
                                activePointConfig: {
                                    color: Colors.darkGreen,
                                    showVerticalLine: true,
                                },
                                lineColor: Colors.green,
                                curve: "linear",
                                endPointConfig: {
                                    color: Colors.green,
                                    radius: 5,
                                    animated: true,
                                },
                                activePointComponent: (point: any) => (
                                    <Point
                                        formattedValue={
                                            point?.extraData?.formattedValue
                                        }
                                        formattedTime={
                                            point?.extraData?.formattedTime
                                        }
                                    />
                                ),
                            },
                        ]}
                        backgroundColor={undefined}
                        height={200}
                        width={Dimensions.get("screen").width - 16}
                    />
                ) : (
                    <Paragraph>
                        Adicione litros de leite produzidos para gerar um
                        gráfico.
                    </Paragraph>
                )}
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.border,
        padding: 8,
        overflow: "hidden",
    },
});
