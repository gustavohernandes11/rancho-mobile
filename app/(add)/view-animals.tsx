import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";

import { AnimalTable } from "../../components/AnimalTable";
import { createStorageService } from "../../database/createStorageServiceFactory";
import { useEffect, useState } from "react";
import { Animal } from "../../types/Animal";
import { Text } from "react-native";
import { Span } from "../../components/Span";

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
			<Heading>Rebanho</Heading>
			<Span>
				<Text>Clique sobre o animal para ver mais detalhes</Text>
			</Span>
			<AnimalTable animals={animals || []} />
		</ContainerView>
	);
}
