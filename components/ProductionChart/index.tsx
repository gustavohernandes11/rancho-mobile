import { ScrollView, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Colors from "styles/Colors";

type ProductionChartProps = {
	data: number[];
};

const countDays = (n: number) => {
	const labels = [];
	for (let i = 0; i < n; i++) {
		labels.push((i + 1).toString());
	}
	return labels;
};

export const ProductionChart = ({ data = [] }: ProductionChartProps) => (
	<View
		style={{
			borderRadius: 8,
		}}
	>
		<ScrollView horizontal={true}>
			<BarChart
				data={{
					labels: countDays(data.length),
					datasets: [
						{
							color: () => Colors.green,
							data,
						},
					],
				}}
				width={850}
				height={240}
				yAxisSuffix="L"
				yAxisInterval={1}
				yAxisLabel=""
				chartConfig={{
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
				}}
				style={{
					borderBottomRightRadius: 15,
					paddingRight: 0,
				}}
				showBarTops={false}
				withInnerLines={false}
				showValuesOnTopOfBars={true}
			/>
		</ScrollView>
	</View>
);
