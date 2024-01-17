import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { DataProvider } from "contexts/DataContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
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
	const colorScheme = useColorScheme();

	return (
		<Provider>
			<ThemeProvider
				value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			>
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
				</DataProvider>
			</ThemeProvider>
		</Provider>
	);
}
