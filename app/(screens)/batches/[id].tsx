import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { SimpleTable } from "components/SimpleTable";
import { Span } from "components/Span";
import { SubTitle } from "components/SubTitle";
import { StorageService } from "database/StorageService";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Animal } from "types/Animal";
import { Batch } from "types/Batch";
import { Item } from "types/Item";

export default function ViewBatchDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [animals, setBatches] = useState<Animal[]>();
	const [batch, setBatch] = useState<Batch>();

	useEffect(() => {
		const fetchData = async () => {
			const animals = await StorageService.loadBatchAnimals(id);
			setBatches(animals);
			const batch = await StorageService.loadBatchInfo(id);
			setBatch(batch);
		};
		fetchData();
	}, []);

	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Detalhes do lote" }} />
			<Heading>{batch?.name}</Heading>
			<SubTitle>{`Detalhes do lote "${batch?.name}"`}</SubTitle>

			<Heading size="small">Informações Gerais</Heading>
			<SimpleTable data={serializeBatchInfoToKeyValue(batch)} />

			<Heading size="small">Animais do lote</Heading>
			<AnimalTable animals={animals || []} />

			<Span
				flexWrap="wrap"
				justifyContent="flex-end"
				paddingVertical={16}
			>
				<Button
					type="danger"
					title="Deletar lote e animais"
					onPress={() => showConfirmationAndDeleteAll(batch!)}
				/>
				<Button
					type="danger"
					title="Deletar lote"
					onPress={() => showConfirmationAndDeleteOnlyBatch(batch!)}
				/>
				<Button
					title="Editar"
					onPress={() =>
						router.push(`/(screens)/batches/edit/${batch!.id}`)
					}
				/>
			</Span>
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

export const showConfirmationAndDeleteAll = (batch: Batch) => {
	Alert.alert(
		`Deletar tudo?`,
		`Você têm certeza que deseja deletar o lote "${batch.name}" e todos seus animais?`,
		[
			{
				text: "Cancelar",
				style: "cancel",
			},
			{
				text: "Deletar tudo",
				onPress: () => {},
				style: "destructive",
			},
		]
	);
};

export const showConfirmationAndDeleteOnlyBatch = (batch: Batch) => {
	Alert.alert(
		`Deletar apenas o lote?`,
		`Você têm certeza que deseja deletar o lote "${batch.name}"? Os animais serão apenas desvinculados e não serão deletados.`,

		[
			{
				text: "Cancelar",
				style: "cancel",
			},
			{
				text: "Deletar",
				onPress: () => {},
				style: "destructive",
			},
		]
	);
};
