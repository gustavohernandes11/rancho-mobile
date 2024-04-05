import { AnimalForm } from "components/AnimalForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";

export default function RegisterAnimalToBatchScreen() {
	const { batchId } = useLocalSearchParams<{ batchId: string }>();

	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar animal" }} />
			<AnimalForm initialValues={{ batchId: Number(batchId) }} />
		</ContainerView>
	);
}
