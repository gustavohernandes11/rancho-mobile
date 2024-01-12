import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { AnimalTable } from "../../../components/AnimalTable";
import { Button } from "../../../components/Button";
import { ContainerView } from "../../../components/ContainerView";
import { Heading } from "../../../components/Heading";
import { Span } from "../../../components/Span";
import { SubTitle } from "../../../components/SubTitle";
import { Animal } from "../../../types/Animal";
import { StorageService } from "../../../database/StorageService";

export default function ViewAnimalsScreen() {
	const [animals, setAnimals] = useState<Animal[]>();

	useEffect(() => {
		const fetchData = async () => {
			const animals = await StorageService.listAnimals();
			setAnimals(animals);
		};
		fetchData();
	}, []);
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Rebanho" }} />
			<Span justifyContent="space-between">
				<Heading>Todos seus animais</Heading>
				<SubTitle>{`Total: ${animals?.length}`}</SubTitle>
			</Span>
			<SubTitle>Clique sobre o animal para ver mais detalhes</SubTitle>

			<AnimalTable animals={animals || []} />
			<Span justifyContent="flex-end" paddingVertical={16}>
				<Link href="/(screens)/animals/add" asChild>
					<Button title="Adicionar novo animal" />
				</Link>
			</Span>
		</ContainerView>
	);
}
