import { Stack } from "expo-router";
import { screenOptions } from "../../(screenOptions)";

export default function CommonPagesLayout() {
	return <Stack screenOptions={screenOptions} />;
}
