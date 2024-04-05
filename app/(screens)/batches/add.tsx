import { BatchForm } from "components/BatchForm";
import { ContainerView } from "components/ContainerView";
import { Stack } from "expo-router";

export default function AddBatchScreen() {
	const StackScreen = () => (
		<Stack.Screen options={{ headerTitle: "Adicionar lote" }} />
	);

	return (
		<ContainerView immediateContent={<StackScreen />}>
			<BatchForm />
		</ContainerView>
	);
}
