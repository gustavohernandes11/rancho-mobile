import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import Colors from "styles/Colors";

export const chartConfig: AbstractChartConfig = {
    backgroundColor: Colors.white,
    backgroundGradientFrom: Colors.white,
    backgroundGradientTo: Colors.white,
    decimalPlaces: 0,
    color: () => Colors.darkGreen,
    fillShadowGradient: Colors.green,
    fillShadowGradientTo: Colors.darkGreen,
    fillShadowGradientOpacity: 1,
    fillShadowGradientToOpacity: 1,
    labelColor: () => Colors.text,
    style: {
        display: "flex",
        borderRadius: 16,
        borderWidth: 1,
        alignSelf: "flex-start",
    },
    barPercentage: 0.75,
    barRadius: 2,
};
