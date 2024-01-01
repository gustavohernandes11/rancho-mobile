import { Text } from "react-native";
import { Stack } from "expo-router";
import { ContainerView } from "../../components/ContainerView";

export default function AddBatchScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar lote" }} />

			<Text>Adicionar lote</Text>
		</ContainerView>
	);
}
