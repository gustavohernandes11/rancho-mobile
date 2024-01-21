import { AnimalBanner } from "components/AnimalBanner";
import { BatchBanner } from "components/BatchBanner";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Input } from "components/Input";
import { SimpleTable } from "components/SimpleTable";
import { Span } from "components/Span";
import { SubTitle } from "components/SubTitle";
import { StorageService } from "database/StorageService";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { useData } from "hooks/useData";
import { useEffect } from "react";
import { Alert } from "react-native";
import { Animal } from "types";
import { serializeAnimalInfo } from "utils/serializers";

export default function ViewAnimalDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { refreshAnimals, refreshBatches, batches, animals } = useData();

	const animal = animals.find((a) => a.id === Number(id));
	const batch = batches.find((b) => b.id === animal?.batchId);
	const maternity = animals.find((a) => a.id === animal?.maternityId);
	const paternity = animals.find((a) => a.id === animal?.paternityId);

	useEffect(() => {
		return () => refreshAnimals();
	}, []);

	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Detalhes do animal" }} />
			<Heading>{animal?.name}</Heading>
			<SubTitle>Detalhes do animal</SubTitle>
			<Span py={8}>
				<Heading size="small">Informações gerais</Heading>
				<SimpleTable data={serializeAnimalInfo(animal)} />
			</Span>
			{batch && (
				<Span py={8}>
					<Heading size="small">Lote</Heading>
					<Link href={`/(screens)/batches/${batch.id}`} asChild>
						<BatchBanner batch={batch} />
					</Link>
				</Span>
			)}
			{animal && paternity && (
				<Span py={8}>
					<Heading size="small">Paternidade</Heading>
					<Link
						href={`/(screens)/animals/${animal.paternityId}`}
						asChild
					>
						<AnimalBanner animal={paternity} />
					</Link>
				</Span>
			)}
			{animal && maternity && (
				<Span py={8}>
					<Heading size="small">Maternidade</Heading>
					<Link
						href={`/(screens)/animals/${animal.maternityId}`}
						asChild
					>
						<AnimalBanner animal={maternity} />
					</Link>
				</Span>
			)}
			{animal && animal.observation && (
				<Span py={8}>
					<Heading size="small">Observação</Heading>
					<Input value={animal.observation} multiline disabled />
				</Span>
			)}
			<Span justify="flex-end" py={16}>
				<Button
					type="danger"
					title="Deletar"
					onPress={() =>
						showConfirmationAndDelete(animal!, () => {
							refreshAnimals();
							refreshBatches();
							router.back();
						})
					}
				/>
				<Button
					title="Editar"
					onPress={() => router.push(`/(screens)/animals/edit/${id}`)}
				/>
			</Span>
		</ContainerView>
	);
}
const showConfirmationAndDelete = (
	animal: Animal,
	onDeleteCallback: () => void
) => {
	Alert.alert(
		`Deletar animal?`,
		`Você têm certeza que deseja deletar o animal "${animal.name}"?`,
		[
			{
				text: "Cancelar",
				style: "cancel",
			},
			{
				text: "Deletar",
				onPress: () =>
					StorageService.deleteAnimal(animal.id).then(() =>
						onDeleteCallback()
					),
				style: "destructive",
			},
		]
	);
};
