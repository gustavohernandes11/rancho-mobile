import { Stack } from "expo-router";
import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";

export default function AddBatchScreen() {
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Adicionar lote" }} />
			<Heading size="small">Adicionar lote</Heading>
		</ContainerView>
	);
}
