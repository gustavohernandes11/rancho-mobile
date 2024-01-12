import { Stack } from "expo-router";
import { screenOptions } from "../../config/screenOptions";
import { SelectionModeProvider } from "contexts/SelectionContext";

export default function CommonPagesLayout() {
	return (
		<SelectionModeProvider>
			<Stack screenOptions={screenOptions}>
				<Stack.Screen name="animals" options={{ headerShown: false }} />
				<Stack.Screen name="batches" options={{ headerShown: false }} />
			</Stack>
		</SelectionModeProvider>
	);
}
