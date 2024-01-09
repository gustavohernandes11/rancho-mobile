import { ContainerView } from "../../../components/ContainerView";
import { createStorageService } from "../../../database/createStorageServiceFactory";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Span } from "../../../components/Span";
import { Stack, useLocalSearchParams } from "expo-router";
import { Batch } from "../../../types/Batch";
import { Animal } from "../../../types/Animal";

export default function ViewBatchDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [animals, setBatches] = useState<Animal[]>();
	const [batch, setBatch] = useState<Batch>();

	useEffect(() => {
		const storageService = createStorageService();
		const fetchData = async () => {
			const animals = await storageService.loadBatchAnimals(id);
			setBatches(animals);
			const batch = await storageService.loadBatchInfo(id);
			setBatch(batch);
		};
		fetchData();
	}, []);

	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: batch?.name }} />
			<Span>
				<Text>Detalhes do lote {batch?.name}</Text>
			</Span>
		</ContainerView>
	);
}
