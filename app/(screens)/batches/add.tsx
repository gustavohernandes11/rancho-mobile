import { BatchForm } from "components/BatchForm";
import { ContainerView } from "components/ContainerView";
import { Stack } from "expo-router";

export default function AddBatchScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar lote" }} />
			<BatchForm />
		</ContainerView>
	);
}
