import { BatchForm } from "components/BatchForm";
import { ContainerView } from "components/ContainerView";
import { StorageService } from "database/StorageService";
import { Stack, useLocalSearchParams } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useState } from "react";
import { PopulatedBatch } from "types/Batch";

export default function EditAnimalScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { refreshAnimals } = useGlobalState();
	const [batch, setBatch] = useState<PopulatedBatch>();

	useEffect(() => {
		const fetchData = async () => {
			await StorageService.loadBatch(Number(id)).then((batch) =>
				setBatch(batch)
			);
			refreshAnimals();
		};
		fetchData();
	}, []);

	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: `Editando lote "${batch?.name || "..."}"`,
				}}
			/>
			{batch && <BatchForm initialValues={batch} />}
		</ContainerView>
	);
}
