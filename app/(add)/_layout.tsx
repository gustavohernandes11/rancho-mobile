import { Stack } from "expo-router";
import { SplashScreen } from "expo-router";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function FormPagesLayout() {
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
