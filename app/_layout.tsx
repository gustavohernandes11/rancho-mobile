import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DataProvider } from "contexts/DataContext";
import { SelectionModeProvider } from "contexts/SelectionContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider } from "react-native-paper";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		OpenSans: require("assets/fonts/OpenSans.ttf"),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<Provider>
			<SelectionModeProvider>
				<DataProvider>
					<Stack>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="(screens)"
							options={{ headerShown: false }}
						/>
					</Stack>
					<StatusBar style="light" />
				</DataProvider>
			</SelectionModeProvider>
		</Provider>
	);
}
