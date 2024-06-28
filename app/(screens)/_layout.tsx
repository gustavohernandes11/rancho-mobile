import { Stack } from "expo-router";
import { screenOptions } from "../../config/screenOptions";

export default function CommonPagesLayout() {
	return (
		<Stack screenOptions={screenOptions}>
			<Stack.Screen name="animals" options={{ headerShown: false }} />
			<Stack.Screen name="batches" options={{ headerShown: false }} />
			<Stack.Screen name="annotations" options={{ headerShown: false }} />
		</Stack>
	);
}
