import { Slot } from "expo-router";
import { SplashScreen } from "expo-router";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function FormPagesLayout() {
	return <Slot />;
}
