import { Stack } from "expo-router";
import { screenOptions } from "../(screenOptions)";
import { SelectionModeProvider } from "../../../contexts/selectionContext";

export default function CommonPagesLayout() {
	return (
		<SelectionModeProvider>
			<Stack screenOptions={screenOptions}>
				<Stack.Screen name="edit" options={{ headerShown: false }} />
			</Stack>
		</SelectionModeProvider>
	);
}
