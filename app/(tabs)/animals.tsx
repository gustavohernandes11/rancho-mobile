import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Loading } from "components/Loading";
import { SearchBar } from "components/SearchBar";
import { Span } from "components/Span";
import { SubTitle } from "components/SubTitle";
import { StorageService } from "database/StorageService";
import { Link, Stack } from "expo-router";
import { useData } from "hooks/useData";
import { useEffect, useState } from "react";

export default function ViewAnimalsScreen() {
	const { animals, refreshAnimals, setAnimals } = useData();
	const [searchText, setSearchText] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!searchText) refreshAnimals();
		return () => refreshAnimals();
	}, []);

	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Rebanho" }} />
			<Span justify="space-between" my={0} align="center">
				<Heading>Todos seus animais</Heading>
				<SubTitle>{`Total: ${animals?.length || "?"}`}</SubTitle>
			</Span>
			<Span>
				<SearchBar
					onChangeText={(text) => {
						if (text === "") refreshAnimals();
						else {
							setIsLoading(true);
							setSearchText(text);
							StorageService.searchAnimals(searchText)
								.then((animals) => setAnimals(animals))
								.finally(() => setIsLoading(false));
						}
					}}
					value={searchText}
					placeholder="Busque por nome, observação ou código."
				/>
			</Span>
			<SubTitle>
				Clique sobre o animal para ver mais detalhes. Pressione para
				selecionar vários.
			</SubTitle>
			{isLoading ? <Loading /> : <AnimalTable animals={animals || []} />}
			<Span justify="flex-end" py={8}>
				<Link href="/(screens)/animals/add" asChild>
					<Button title="Adicionar novo animal" />
				</Link>
			</Span>
		</ContainerView>
	);
}
