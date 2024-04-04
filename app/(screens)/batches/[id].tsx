import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Loading } from "components/Loading";
import { SimpleTable } from "components/SimpleTable";
import { Span } from "components/Span";
import { StorageService } from "database/StorageService";
import {
	Stack,
	router,
	useFocusEffect,
	useLocalSearchParams,
} from "expo-router";
import { useAnimalTable } from "hooks/useAnimalTable";
import { useGlobalState } from "hooks/useGlobalState";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Batch, PopulatedBatch } from "types";
import { serializeBatchInfo } from "utils/serializers";

export default function ViewBatchDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [isLoading, setIsLoading] = useState(true);
	const { refreshAll } = useGlobalState();
	const [batch, setBatch] = useState<PopulatedBatch>();
	const table = useAnimalTable();

	const fetchBatch = async () => {
		setIsLoading(true);
		await StorageService.loadBatch(Number(id))
			.then((populatedBatch) => setBatch(populatedBatch))
			.then(() => setIsLoading(false));
	};

	useFocusEffect(
		useCallback(() => {
			fetchBatch();
		}, [id])
	);

	useEffect(() => {
		table.clearSelection();
		fetchBatch();

		return () => {
			table.clearSelection();
		};
	}, []);

	return (
		<ContainerView>
			<Stack.Screen
				options={{ headerTitle: `Lote "${batch?.name || "..."}"` }}
			/>
			<Heading>{batch?.name}</Heading>

			<Span flexWrap="wrap">
				<Button
					type="danger"
					title="Deletar lote e animais"
					onPress={() =>
						showConfirmationAndDeleteAll(batch!, () => {
							refreshAll();
							router.back();
						})
					}
				/>
				<Button
					type="danger"
					title="Deletar lote"
					onPress={() =>
						showConfirmationAndDeleteOnlyBatch(batch!, () => {
							refreshAll();
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

			{batch && (
				<Span direction="column">
					<Heading size="small">Informações Gerais</Heading>
					<SimpleTable data={serializeBatchInfo(batch)} />
				</Span>
			)}
			<Span direction="column">
				<Heading size="small">Animais do lote</Heading>
				{isLoading ? (
					<Loading />
				) : (
					<AnimalTable
						liftedController={table}
						animals={batch?.animals || []}
					/>
				)}
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
