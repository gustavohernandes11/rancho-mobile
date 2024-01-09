import { ContainerView } from "../../../components/ContainerView";
import { createStorageService } from "../../../database/createStorageServiceFactory";
import { useEffect, useState } from "react";
import { Animal } from "../../../types/Animal";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { SimpleTable } from "../../../components/SimpleTable";
import { Batch } from "../../../types/Batch";
import { getFormattedAge } from "../../../utils/getFormattedAge";
import { Item } from "../../../types/Item";
import { Heading } from "../../../components/Heading";
import { HelperText } from "react-native-paper";
import { BatchInfo } from "../../../components/BatchInfo";
import { AnimalInfo } from "../../../components/AnimalInfo";
import { getFormattedGender } from "../../../utils/getFormattedGender";
import { Input } from "../../../components/Input";
import { Span } from "../../../components/Span";
import { Button } from "../../../components/Button";

export default function ViewAnimalDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [animal, setAnimal] = useState<Animal>();
	const [paternityAnimal, setPaternityAnimal] = useState<Animal>();
	const [maternityAnimal, setMaternityAnimal] = useState<Animal>();
	const [batch, setBatch] = useState<Batch>();

	const storageService = createStorageService();
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
			<HelperText style={{ padding: 0, marginBottom: 8 }} type="info">
				{`Detalhes do animal "${animal?.name}"`}
			</HelperText>
			<Heading size="small">Informações gerais</Heading>
			<SimpleTable data={serializeAnimalToKeyValue(animal)} />
			<Heading size="small">Lote</Heading>
			{batch && (
				<Link href={`/(screens)/batches/${batch.id}`} asChild>
					<BatchInfo batch={batch} />
				</Link>
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
					<Input value={animal.observation} disabled />
				</>
			)}
			<Span justifyContent="flex-end">
				<Button type="danger" title="Deletar" />
				<Button title="Editar" />
			</Span>
		</ContainerView>
	);
}

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
	if (animal.birthdate)
		items.push({
			key: "Idade",
			value: getFormattedAge(animal.birthdate),
		});
	if (animal.observation)
		items.push({ key: "Observação", value: animal.observation });

	return items;
};
