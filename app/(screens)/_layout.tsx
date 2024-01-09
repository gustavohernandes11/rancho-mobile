import { Stack } from "expo-router";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

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
		>
			<Stack.Screen name="animals" options={{ headerShown: false }} />
			<Stack.Screen name="batches" options={{ headerShown: false }} />
		</Stack>
	);
}
