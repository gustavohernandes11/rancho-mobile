import { Stack } from "expo-router";
import { screenOptions } from "../(screenOptions)";

export default function CommonPagesLayout() {
	return (
		<Stack screenOptions={screenOptions}>
			<Stack.Screen name="edit" options={{ headerShown: false }} />
		</Stack>
	);
}
