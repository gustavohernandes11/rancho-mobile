import { Stack } from "expo-router";
import Colors from "../../../../constants/Colors";
import Fonts from "../../../../constants/Fonts";
import { GoBackButton } from "../../../../components/GoBackButton";

export default function CommonPagesLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.green,
				},
				headerTintColor: Colors.white,
				headerTitleStyle: {
					fontWeight: "bold",
					fontFamily: Fonts.primaryFamily,
				},
				headerLeft: () => <GoBackButton />,
			}}
		/>
	);
}
