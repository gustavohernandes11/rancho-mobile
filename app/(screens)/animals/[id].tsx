import { AnimalBanner } from "components/AnimalBanner";
import { BatchBanner } from "components/BatchBanner";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Input } from "components/Input";
import { SimpleTable } from "components/SimpleTable";
import { Span } from "components/Span";
import { StorageService } from "database/StorageService";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Animal, PopulatedAnimal } from "types";
import { serializeAnimalInfo } from "utils/serializers";

export default function ViewAnimalDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { refreshAll, animals } = useGlobalState();
	const [animal, setAnimal] = useState<PopulatedAnimal>();

	const fetchPopulatedAnimal = () => {
		StorageService.loadPopulatedAnimal(Number(id)).then((animal) =>
			setAnimal(animal)
		);
	};

	useEffect(() => {
		fetchPopulatedAnimal();
	}, [animals]);

	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: `Detalhes de "${animal?.name || ""}"`,
				}}
			/>
			<Heading>{animal?.name}</Heading>
			<Span direction="column">
				<Heading size="small">Informações gerais</Heading>
				<SimpleTable data={serializeAnimalInfo(animal)} />
			</Span>
			{animal && animal?.batch && (
				<Span direction="column">
					<Heading size="small">Lote</Heading>
					<Link
						href={`/(screens)/batches/${animal.batch.id}`}
						asChild
					>
						<BatchBanner batch={animal.batch} />
					</Link>
				</Span>
			)}
			{animal && animal?.paternity && (
				<Span direction="column">
					<Heading size="small">Paternidade</Heading>
					<Link
						href={`/(screens)/animals/${animal.paternityId}`}
						asChild
					>
						<AnimalBanner animal={animal.paternity} />
					</Link>
				</Span>
			)}
			{animal && animal?.maternity && (
				<Span direction="column">
					<Heading size="small">Maternidade</Heading>
					<Link
						href={`/(screens)/animals/${animal.maternityId}`}
						asChild
					>
						<AnimalBanner animal={animal.maternity} />
					</Link>
				</Span>
			)}
			{animal && animal?.offspring.length > 0 && (
				<Span direction="column">
					<Heading size="small">Prole</Heading>
					{animal.offspring.map((calf) => (
						<Link href={`/(screens)/animals/${calf.id}`} asChild>
							<AnimalBanner animal={calf} />
						</Link>
					))}
				</Span>
			)}
			{animal && animal.observation && (
				<Span direction="column">
					<Heading size="small">Observação</Heading>
					<Input value={animal.observation} multiline disabled />
				</Span>
			)}
			<Span justify="flex-end" py={8}>
				<Button
					type="danger"
					title="Deletar"
					onPress={() =>
						showConfirmationAndDelete(animal!, () => {
							refreshAll();
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
