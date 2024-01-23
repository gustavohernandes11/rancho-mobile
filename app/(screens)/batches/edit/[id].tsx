import { BatchForm } from "components/BatchForm";
import { ContainerView } from "components/ContainerView";
import { StorageService } from "database/StorageService";
import { Stack, useLocalSearchParams } from "expo-router";
import { useData } from "hooks/useData";
import { useEffect, useState } from "react";
import { Batch } from "types/Batch";

export default function EditAnimalScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { refreshAnimals } = useData();
	const [batch, setBatch] = useState<Batch>();

	useEffect(() => {
		const fetchData = async () => {
			await StorageService.loadBatchInfo(Number(id)).then((batch) =>
				setBatch(batch)
			);
			refreshAnimals();
		};
		fetchData();
	}, []);
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Editar lote" }} />
			{batch && <BatchForm initialValues={batch} />}
		</ContainerView>
	);
}
