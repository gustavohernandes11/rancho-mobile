import { Stack } from "expo-router";
import { screenOptions } from "./(screenOptions)";

export default function CommonPagesLayout() {
	return (
		<Stack screenOptions={screenOptions}>
			<Stack.Screen name="animals" options={{ headerShown: false }} />
			<Stack.Screen name="batches" options={{ headerShown: false }} />
		</Stack>
	);
}
