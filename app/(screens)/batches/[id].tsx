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
import { useSelectionMode } from "hooks/useSelectionMode";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Batch } from "types";
import { serializeBatchInfo } from "utils/serializers";

export default function ViewBatchDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { animals, batches, setAnimals, refreshAnimals, refreshBatches } =
		useData();
	const { clearSelection } = useSelectionMode();
	const [isLoading, setIsLoading] = useState(true);
	const batch = batches.find((b) => b.id === Number(id));

	useEffect(() => {
		clearSelection();
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
			<SubTitle>Detalhes do lote</SubTitle>

			{!!batch?.count ||
				(batch?.description && (
					<>
						<Heading size="small">Informações Gerais</Heading>
						<SimpleTable data={serializeBatchInfo(batch)} />
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
					onPress={() =>
						showConfirmationAndDeleteAll(batch!, () => {
							refreshAnimals();
							refreshBatches();
							router.back();
						})
					}
				/>
				<Button
					type="danger"
					title="Deletar lote"
					onPress={() =>
						showConfirmationAndDeleteOnlyBatch(batch!, () => {
							refreshAnimals();
							refreshBatches();
							router.back();
						})
					}
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

export const showConfirmationAndDeleteAll = (
	batch: Batch,
	onConfirmCallback: () => void
) => {
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
						onConfirmCallback()
					),
				style: "destructive",
			},
		]
	);
};

export const showConfirmationAndDeleteOnlyBatch = (
	batch: Batch,
	onConfirmCallback: () => void
) => {
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
						onConfirmCallback()
					),
				style: "destructive",
			},
		]
	);
};
