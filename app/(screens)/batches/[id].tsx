import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Loading } from "components/Loading";
import { SimpleTable } from "components/SimpleTable";
import { Span } from "components/Span";
import { SubTitle } from "components/SubTitle";
import { StorageService } from "database/StorageService";
import {
	Stack,
	router,
	useFocusEffect,
	useLocalSearchParams,
} from "expo-router";
import { useData } from "hooks/useData";
import { useSelectionMode } from "hooks/useSelectionMode";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Animal, Batch } from "types";
import { serializeBatchInfo } from "utils/serializers";

export default function ViewBatchDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { batches, refreshAnimals, refreshBatches } = useData();
	const [batchAnimals, setBatchAnimals] = useState<Animal[]>();
	const { clearSelection } = useSelectionMode();
	const [isLoading, setIsLoading] = useState(true);
	const batch = batches.find((b) => b.id === Number(id));

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				setIsLoading(true);
				const animalsFromBatch = await StorageService.loadBatchAnimals(
					Number(id)
				);
				setBatchAnimals(animalsFromBatch);
				setIsLoading(false);
			};
			fetchData();
		}, [id])
	);

	useEffect(() => {
		clearSelection();

		return () => {
			clearSelection();
			refreshAnimals();
		};
	}, []);

	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Detalhes do lote" }} />
			<Heading>{batch?.name}</Heading>
			<SubTitle>Detalhes do lote</SubTitle>

			<Span flexWrap="wrap">
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

			{!!batch?.count ||
				(batch?.description && (
					<Span direction="column">
						<Heading size="small">Informações Gerais</Heading>
						<SimpleTable data={serializeBatchInfo(batch)} />
					</Span>
				))}
			<Span direction="column">
				<Heading size="small">Animais do lote</Heading>
				{isLoading ? (
					<Loading />
				) : (
					<AnimalTable animals={batchAnimals || []} />
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
