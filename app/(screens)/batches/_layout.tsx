import { SplashScreen, Stack } from "expo-router";
import { screenOptions } from "config/screenOptions";

SplashScreen.preventAutoHideAsync();

export default function CommonPagesLayout() {
	return (
		<Stack screenOptions={screenOptions}>
			<Stack.Screen name="edit" options={{ headerShown: false }} />
		</Stack>
	);
}
