import { BatchForm } from "components/BatchForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useState } from "react";
import { StorageService } from "services/StorageService";
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

	const StackScreen = () => (
		<Stack.Screen
			options={{
				headerTitle: `Editando lote "${batch?.name || ""}"`,
			}}
		/>
	);
	return (
		<ContainerView immediateContent={<StackScreen />}>
			{batch && <BatchForm initialValues={batch} />}
		</ContainerView>
	);
}
