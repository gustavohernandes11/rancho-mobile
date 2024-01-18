import { AnimalInfo } from "components/AnimalInfo";
import { BatchInfo } from "components/BatchInfo";
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
import { Animal } from "types/Animal";
import { Item } from "types/Item";
import { getFormattedAge, getFormattedGender } from "utils/formatters";

export default function ViewAnimalDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { refreshAnimals, batches, animals } = useData();

	const animal = animals.find((a) => a.id === Number(id));
	const batch = batches.find((b) => b.id === animal?.batchId);
	const maternity = animals.find((a) => a.id === animal?.maternityId);
	const paternity = animals.find((a) => a.id === animal?.paternityId);

	useEffect(() => {
		refreshAnimals();

		return () => refreshAnimals();
	}, []);

	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Detalhes do animal" }} />
			<Heading>{animal?.name}</Heading>
			<SubTitle>Detalhes do animal</SubTitle>
			<Heading size="small">Informações gerais</Heading>
			<SimpleTable data={serializeAnimalInfoToKeyValue(animal)} />
			{batch && (
				<>
					<Heading size="small">Lote</Heading>
					<Link href={`/(screens)/batches/${batch.id}`} asChild>
						<BatchInfo batch={batch} />
					</Link>
				</>
			)}
			{animal && paternity && (
				<>
					<Heading size="small">Paternidade</Heading>
					<Link
						href={`/(screens)/animals/${animal.paternityId}`}
						asChild
					>
						<AnimalInfo animal={paternity} />
					</Link>
				</>
			)}
			{animal && maternity && (
				<>
					<Heading size="small">Maternidade</Heading>
					<Link
						href={`/(screens)/animals/${animal.maternityId}`}
						asChild
					>
						<AnimalInfo animal={maternity} />
					</Link>
				</>
			)}
			{animal && animal.observation && (
				<>
					<Heading size="small">Observação</Heading>
					<Input value={animal.observation} multiline disabled />
				</>
			)}
			<Span justifyContent="flex-end">
				<Button
					type="danger"
					title="Deletar"
					onPress={() =>
						showConfirmationAndDelete(animal!, refreshAnimals)
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
const serializeAnimalInfoToKeyValue = (animal?: Animal): Item[] => {
	let items: Item[] = [];
	if (!animal) return items;

	if (animal.name) items.push({ key: "Nome", value: animal.name });
	if (animal.gender)
		items.push({
			key: "Gênero",
			value: getFormattedGender(animal.gender),
		});
	if (animal.code)
		items.push({ key: "Código", value: animal.code.toString() });
	if (animal.birthdate) {
		items.push({
			key: "Idade",
			value: getFormattedAge(animal.birthdate),
		});
		items.push({
			key: "Data de nascimento",
			value: new Date(animal.birthdate).toLocaleDateString(),
		});
	}
	if (animal.observation)
		items.push({ key: "Observação", value: animal.observation });

	return items;
};
