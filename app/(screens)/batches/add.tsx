import { Stack } from "expo-router";
import { ContainerView } from "../../../components/ContainerView";
import { BatchForm } from "../../../components/BatchForm";

export default function AddBatchScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar lote" }} />
			<BatchForm />
		</ContainerView>
	);
}
