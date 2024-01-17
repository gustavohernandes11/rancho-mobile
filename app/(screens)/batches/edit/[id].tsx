import { BatchForm } from "components/BatchForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";
import { useData } from "hooks/useData";

export default function EditAnimalScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { batches } = useData();
	const batch = batches.find((batch) => batch.id === Number(id));

	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Editar lote" }} />
			{batch && <BatchForm initialValues={batch} />}
		</ContainerView>
	);
}
