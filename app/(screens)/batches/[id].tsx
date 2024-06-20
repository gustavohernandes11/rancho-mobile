import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Loading } from "components/Loading";
import { SimpleTable } from "components/SimpleTable";
import { Skeleton } from "components/Skeleton";
import { Span } from "components/Span";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useAnimalTable } from "hooks/useAnimalTable";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Storage } from "services/StorageService";
import { Batch, PopulatedBatch } from "types";
import { serializeBatchInfo } from "utils/serializers";

export default function ViewBatchDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [isLoading, setIsLoading] = useState(true);
	const { refreshAll, batches } = useGlobalState();
	const [batch, setBatch] = useState<PopulatedBatch>();
	const table = useAnimalTable();

	const fetchBatch = async () => {
		await Storage.getPopulatedBatch(Number(id)).then((populatedBatch) =>
			setBatch(populatedBatch)
		);
	};

	useEffect(() => {
		setIsLoading(() => true);
		fetchBatch().then(() => setIsLoading(() => false));
	}, []);

	useEffect(() => {
		fetchBatch();
	}, [batches]);

	useEffect(() => {
		table.clearSelection();
		fetchBatch();

		return () => {
			table.clearSelection();
		};
	}, []);

	const StackScreen = () => (
		<Stack.Screen
			options={{ headerTitle: `Lote "${batch?.name || ""}"` }}
		/>
	);

	return (
		<ContainerView immediateContent={<StackScreen />}>
			{isLoading ? (
				<Skeleton width={300} />
			) : (
				<Heading>{batch?.name}</Heading>
			)}

			<Span flexWrap="wrap">
				<Button
					type="danger"
					icon="exclamation"
					title="Deletar tudo"
					onPress={() =>
						showConfirmationAndDeleteAll(batch!, () => {
							refreshAll();
							router.back();
						})
					}
					disabled={isLoading}
				/>
				<Button
					type="danger"
					icon="delete"
					title="Deletar lote"
					onPress={() =>
						showConfirmationAndDeleteOnlyBatch(batch!, () => {
							refreshAll();
							router.back();
						})
					}
					disabled={isLoading}
				/>
				<Button
					title="Editar"
					icon="pencil"
					onPress={() =>
						router.push(`/(screens)/batches/edit/${batch!.id}`)
					}
					disabled={isLoading}
				/>
				<Button
					title="Novo animal"
					icon={require("../../../assets/images/AddAnimalIcon.png")}
					onPress={() =>
						router.push(
							`/(screens)/batches/register-animal-to-batch/${
								batch!.id
							}`
						)
					}
					disabled={isLoading}
				/>
			</Span>

			{isLoading ? (
				<>
					<Skeleton width={200} />
					<Skeleton height={200} />
				</>
			) : (
				batch && (
					<Span direction="column">
						<Heading size="small">Informações Gerais</Heading>
						<SimpleTable data={serializeBatchInfo(batch)} />
					</Span>
				)
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
					Storage.deleteBatchWithAnimals(batch.id).then(() =>
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
		`Você têm certeza que deseja deletar o lote "${
			batch?.name || ""
		}"? Os animais serão apenas desvinculados e não serão deletados.`,

		[
			{
				text: "Cancelar",
				style: "cancel",
			},
			{
				text: "Deletar",
				onPress: () =>
					Storage.deleteBatch(batch.id).then(() =>
						onConfirmCallback()
					),
				style: "destructive",
			},
		]
	);
};
