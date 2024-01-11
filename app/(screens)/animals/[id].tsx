import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { HelperText } from "react-native-paper";
import { AnimalInfo } from "../../../components/AnimalInfo";
import { BatchInfo } from "../../../components/BatchInfo";
import { Button } from "../../../components/Button";
import { ContainerView } from "../../../components/ContainerView";
import { Heading } from "../../../components/Heading";
import { Input } from "../../../components/Input";
import { SimpleTable } from "../../../components/SimpleTable";
import { Span } from "../../../components/Span";
import { createStorageService } from "../../../database/createStorageServiceFactory";
import { Animal } from "../../../types/Animal";
import { Batch } from "../../../types/Batch";
import { Item } from "../../../types/Item";
import { getFormattedAge } from "../../../utils/getFormattedAge";
import { getFormattedGender } from "../../../utils/getFormattedGender";
import { SubTitle } from "../../../components/SubTitle";

const storageService = createStorageService();
export default function ViewAnimalDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [animal, setAnimal] = useState<Animal>();
	const [paternityAnimal, setPaternityAnimal] = useState<Animal>();
	const [maternityAnimal, setMaternityAnimal] = useState<Animal>();
	const [batch, setBatch] = useState<Batch>();

	useEffect(() => {
		const fetchData = async () => {
			const animal = await storageService.loadAnimal(id);
			setAnimal(animal);

			if (animal.batchId) {
				setBatch(await storageService.loadBatchInfo(animal.batchId));
			}
			if (animal.maternityId) {
				setMaternityAnimal(
					await storageService.loadAnimal(animal.maternityId)
				);
			}
			if (animal.paternityId) {
				setPaternityAnimal(
					await storageService.loadAnimal(animal.paternityId)
				);
			}
		};
		fetchData();
	}, []);

	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Detalhes do animal" }} />
			<Heading>{animal?.name}</Heading>
			<SubTitle>{`Detalhes do animal "${animal?.name}"`}</SubTitle>
			<Heading size="small">Informações gerais</Heading>
			<SimpleTable data={serializeAnimalToKeyValue(animal)} />
			{batch && (
				<>
					<Heading size="small">Lote</Heading>
					<Link href={`/(screens)/batches/${batch.id}`} asChild>
						<BatchInfo batch={batch} />
					</Link>
				</>
			)}
			{animal && paternityAnimal && (
				<>
					<Heading size="small">Paternidade</Heading>
					<Link
						href={`/(screens)/animals/${animal.paternityId}`}
						asChild
					>
						<AnimalInfo animal={paternityAnimal} />
					</Link>
				</>
			)}
			{animal && maternityAnimal && (
				<>
					<Heading size="small">Maternidade</Heading>
					<Link
						href={`/(screens)/animals/${animal.maternityId}`}
						asChild
					>
						<AnimalInfo animal={maternityAnimal} />
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
					onPress={() => showConfirmationAndDelete(animal!)}
				/>
				{animal?.id && (
					<Link href={`/(screens)/animals/edit/${animal.id}`} asChild>
						<Button title="Editar" />
					</Link>
				)}
			</Span>
		</ContainerView>
	);
}
const showConfirmationAndDelete = (animal: Animal) => {
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
				onPress: () => storageService.deleteAnimal(animal.id),
				style: "destructive",
			},
		]
	);
};
const serializeAnimalToKeyValue = (animal?: Animal): Item[] => {
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
