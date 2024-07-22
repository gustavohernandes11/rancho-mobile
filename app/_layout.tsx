import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import "moment/locale/pt-br";
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

moment.locale("pt-br");

function RootLayoutNav() {
    return (
        <Provider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="(screens)"
                    options={{ headerShown: false }}
                />
            </Stack>
            <StatusBar style="light" />
        </Provider>
    );
}
