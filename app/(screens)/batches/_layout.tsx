import { Stack } from "expo-router";
import { SplashScreen } from "expo-router";
import Colors from "../../../constants/Colors";
import Fonts from "../../../constants/Fonts";

SplashScreen.preventAutoHideAsync();

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
			}}
		/>
	);
}
