import { ContainerView } from "../../../components/ContainerView";
import { createStorageService } from "../../../database/createStorageServiceFactory";
import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Batch } from "../../../types/Batch";
import { Animal } from "../../../types/Animal";
import { AnimalTable } from "../../../components/AnimalTable";
import { Heading } from "../../../components/Heading";
import { HelperText } from "react-native-paper";
import { SimpleTable } from "../../../components/SimpleTable";
import { Item } from "../../../types/Item";

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
			<Stack.Screen options={{ headerTitle: "Detalhes do lote" }} />
			<Heading>{batch?.name}</Heading>
			<HelperText style={{ padding: 0, marginBottom: 8 }} type="info">
				{`Detalhes do lote "${batch?.name}"`}
			</HelperText>
			<Heading size="small">Informações Gerais</Heading>
			<SimpleTable data={serializeBatchInfoToKeyValue(batch)} />
			<Heading size="small">Animais</Heading>
			<AnimalTable animals={animals || []} />
		</ContainerView>
	);
}

const serializeBatchInfoToKeyValue = (batch?: Batch) => {
	let items: Item[] = [];
	if (!batch) return items;

	if (batch.description)
		items.push({ key: "Descrição", value: batch.description });
	if (batch.count)
		items.push({
			key: "Número de animais",
			value: batch?.count.toString(),
		});

	return items;
};
