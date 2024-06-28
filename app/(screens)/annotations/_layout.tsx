import { Stack } from "expo-router";
import { screenOptions } from "../../../config/screenOptions";

export default function CommonPagesLayout() {
	return (
		<Stack screenOptions={screenOptions}>
			<Stack.Screen name="edit" options={{ headerShown: false }} />
		</Stack>
	);
}
