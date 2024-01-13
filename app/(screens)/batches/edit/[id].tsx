import { BatchForm } from "components/BatchForm";
import { ContainerView } from "components/ContainerView";
import { StorageService } from "database/StorageService";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Batch } from "types/Batch";

export default function EditAnimalScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [batch, setBatch] = useState<Batch>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await StorageService.loadBatchInfo(id);
			setBatch(response);
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
