import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { SearchBar } from "components/SearchBar";
import { Span } from "components/Span";
import { SubTitle } from "components/SubTitle";
import { StorageService } from "database/StorageService";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Animal } from "types/Animal";

export default function ViewAnimalsScreen() {
	const [animals, setAnimals] = useState<Animal[]>();
	const [searchText, setSearchText] = useState("");

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
			<Span
				justifyContent="space-between"
				marginVertical={0}
				alignItems="center"
			>
				<Heading>Todos seus animais</Heading>
				<SubTitle>{`Total: ${animals?.length}`}</SubTitle>
			</Span>
			<Span>
				<SearchBar
					onChangeText={(text) => setSearchText(text)}
					value={searchText}
					placeholder="Busque por nome, observação ou código."
				/>
			</Span>
			<SubTitle>Clique sobre o animal para ver mais detalhes</SubTitle>

			<AnimalTable
				animals={filterAnimalsByText(animals, searchText) || []}
			/>
			<Span justifyContent="flex-end" paddingVertical={16}>
				<Link href="/(screens)/animals/add" asChild>
					<Button title="Adicionar novo animal" />
				</Link>
			</Span>
		</ContainerView>
	);
}

const filterAnimalsByText = (animals?: Animal[], text?: string) => {
	if (!text || !animals) return animals;
	return animals?.filter((animal) => {
		const lowerCaseText = text.toLowerCase();
		const animalName = animal.name.toLowerCase();
		const animalObservation = animal.observation?.toLowerCase() || "";
		const animalCode = animal.code?.toString().toLowerCase() || "";

		return (
			animalName.includes(lowerCaseText) ||
			animalObservation.includes(lowerCaseText) ||
			animalCode.includes(lowerCaseText)
		);
	});
};
