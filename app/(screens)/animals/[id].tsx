import { ContainerView } from "../../../components/ContainerView";
import { createStorageService } from "../../../database/createStorageServiceFactory";
import { useEffect, useState } from "react";
import { Animal } from "../../../types/Animal";
import { Text } from "react-native";
import { Span } from "../../../components/Span";
import { Stack, useLocalSearchParams } from "expo-router";
import { SimpleTable } from "../../../components/SimpleTable";
import { Batch } from "../../../types/Batch";
import { getFormattedAge } from "../../../utils/getFormattedAge";

export default function ViewAnimalDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [animal, setAnimal] = useState<Animal>();
	const [batch, setBatch] = useState<Batch>();

	useEffect(() => {
		const storageService = createStorageService();
		const fetchData = async () => {
			const animal = await storageService.loadAnimal(id);
			setAnimal(animal);
			const batch = await storageService.loadBatchInfo(id);
			setBatch(batch);
		};
		fetchData();
	}, []);

	return (
		<ContainerView>
			<Stack.Screen
				options={{ headerTitle: animal?.name || "Detalhes do animal" }}
			/>
			<Span>
				<Text>Detalhes do animal {animal?.name}</Text>
			</Span>
			<Text>{JSON.stringify(animal)}</Text>
			<SimpleTable
				data={[
					{
						key: "Nome",
						value: animal?.name || "",
					},
					{ key: "Lote", value: batch?.name || "Nenhum lote" },
					{
						key: "Idade",
						value: getFormattedAge(animal?.birthdate || ""),
					},
					{
						key: "Observação",
						value: animal?.observation || "",
					},
				]}
			/>
		</ContainerView>
	);
}
