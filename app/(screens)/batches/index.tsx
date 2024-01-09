import { Stack } from "expo-router";
import { ContainerView } from "../../../components/ContainerView";

export default function ViewBatchesScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Ver lotes" }} />
		</ContainerView>
	);
}
