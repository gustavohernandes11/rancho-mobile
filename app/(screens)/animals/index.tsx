import { ContainerView } from "../../../components/ContainerView";
import { AnimalTable } from "../../../components/AnimalTable";
import { createStorageService } from "../../../database/createStorageServiceFactory";
import { useEffect, useState } from "react";
import { Animal } from "../../../types/Animal";
import { Text } from "react-native";
import { Span } from "../../../components/Span";
import { Link, Stack } from "expo-router";

export default function ViewAnimalsScreen() {
	const storageService = createStorageService();
	const [animals, setAnimals] = useState<Animal[]>();

	useEffect(() => {
		const fetchData = async () => {
			const animals = await storageService.listAnimals();
			setAnimals(animals);
		};
		fetchData();
	}, []);
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Rebanho" }} />

			<Span>
				<Text>Clique sobre o animal para ver mais detalhes</Text>
			</Span>

			<AnimalTable animals={animals || []} />
			<Link
				href={{
					pathname: `/(screens)/animals/[id]`,
					params: { id: "1" },
				}}
			>
				Link para ID 1
			</Link>
		</ContainerView>
	);
}
