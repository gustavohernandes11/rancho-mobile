import { ContainerView } from "../../../components/ContainerView";
import { AnimalTable } from "../../../components/AnimalTable";
import { createStorageService } from "../../../database/createStorageServiceFactory";
import { useEffect, useState } from "react";
import { Animal } from "../../../types/Animal";
import { Span } from "../../../components/Span";
import { Link, Stack } from "expo-router";
import { Button } from "../../../components/Button";
import { Heading } from "../../../components/Heading";
import { HelperText } from "react-native-paper";

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
			<Heading>Todos seus animais</Heading>
			<HelperText
				style={{ padding: 0, marginBottom: 8 }}
				type="info"
			>{`Total: ${animals?.length}`}</HelperText>
			<HelperText style={{ padding: 0, marginBottom: 8 }} type="info">
				Clique sobre o animal para ver mais detalhes
			</HelperText>

			<AnimalTable animals={animals || []} />
			<Span justifyContent="flex-end">
				<Link href="/(screens)/animals/add" asChild>
					<Button title="Adicionar novo animal" />
				</Link>
			</Span>
		</ContainerView>
	);
}
