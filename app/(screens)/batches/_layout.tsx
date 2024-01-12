import { SplashScreen, Stack } from "expo-router";
import { screenOptions } from "../../../config/screenOptions";

SplashScreen.preventAutoHideAsync();

export default function CommonPagesLayout() {
	return <Stack screenOptions={screenOptions} />;
}
