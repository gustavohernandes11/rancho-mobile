import { SelectionModeProvider } from "contexts/SelectionContext";
import { Stack } from "expo-router";
import { screenOptions } from "../../../config/screenOptions";

export default function CommonPagesLayout() {
	return (
		<SelectionModeProvider>
			<Stack screenOptions={screenOptions}>
				<Stack.Screen name="edit" options={{ headerShown: false }} />
			</Stack>
		</SelectionModeProvider>
	);
}
