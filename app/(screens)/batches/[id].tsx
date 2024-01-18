import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Loading } from "components/Loading";
import { SimpleTable } from "components/SimpleTable";
import { Span } from "components/Span";
import { SubTitle } from "components/SubTitle";
import { StorageService } from "database/StorageService";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useData } from "hooks/useData";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Batch, Item } from "types";

export default function ViewBatchDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { animals, batches, setAnimals, refreshAnimals } = useData();
	const [isLoading, setIsLoading] = useState(true);
	const batch = batches.find((b) => b.id === Number(id));

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const animals = await StorageService.loadBatchAnimals(Number(id));
			setAnimals(() => animals);
			setIsLoading(false);
		};
		fetchData();

		return () => {
			refreshAnimals();
		};
	}, []);

	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Detalhes do lote" }} />
			<Heading>{batch?.name}</Heading>
			<SubTitle>{`Detalhes do lote "${batch?.name || "?"}"`}</SubTitle>

			{!!batch?.count ||
				(batch?.description && (
					<>
						<Heading size="small">Informações Gerais</Heading>
						<SimpleTable
							data={serializeBatchInfoToKeyValue(batch)}
						/>
					</>
				))}
			<Heading size="small">Animais do lote</Heading>
			{isLoading ? <Loading /> : <AnimalTable animals={animals} />}
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
			value: batch.count > 0 ? batch.count.toString() : "Vazio",
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
				onPress: () =>
					StorageService.deleteBatchAndItsAnimals(batch.id).then(() =>
						router.replace("/(screens)/batches/")
					),
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
				onPress: () =>
					StorageService.deleteBatch(batch.id).then(() =>
						router.replace("/(screens)/batches/")
					),
				style: "destructive",
			},
		]
	);
};
