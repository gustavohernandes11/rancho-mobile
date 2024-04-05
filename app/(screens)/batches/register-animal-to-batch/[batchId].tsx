import { AnimalForm } from "components/AnimalForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";

export default function RegisterAnimalToBatchScreen() {
	const { batchId } = useLocalSearchParams<{ batchId: string }>();

	const StackScreen = () => (
		<Stack.Screen options={{ headerTitle: "Adicionar animal" }} />
	);
	return (
		<ContainerView immediateContent={<StackScreen />}>
			<AnimalForm initialValues={{ batchId: Number(batchId) }} />
		</ContainerView>
	);
}
