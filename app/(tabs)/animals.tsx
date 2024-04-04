import { AddButton } from "components/AddButton";
import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Loading } from "components/Loading";
import { SearchBar } from "components/SearchBar";
import { Select } from "components/Select";
import { Span } from "components/Span";
import { SubTitle } from "components/SubTitle";
import { StorageService } from "database/StorageService";
import { Stack, router, useFocusEffect } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import { useCallback, useEffect, useState } from "react";
import { Animal } from "types/Animal";
import { OrderByOptions } from "types/Repository";
import { serializeBatches } from "utils/serializers";

export default function ViewAnimalsScreen() {
	const { animals, batches } = useGlobalState();
	const [searchText, setSearchText] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [orderBy, setOrderBy] = useState<OrderByOptions>("alfabetic");
	const [filterByBatchId, setFilterByBatchId] = useState<
		number | undefined
	>();
	const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);

	const fetchFilteredAnimals = () => {
		StorageService.listAnimals({
			orderBy,
			batchId: filterByBatchId,
			searchText,
		})
			.then((animals) => setFilteredAnimals(animals))
			.then(() => setIsLoading(false));
	};

	// when changing filters
	useEffect(() => {
		setIsLoading(true);
		fetchFilteredAnimals();
	}, [orderBy, filterByBatchId, searchText]);

	// first fetch
	useEffect(() => {
		setIsLoading(true);
		fetchFilteredAnimals();
	}, []);

	// update when going back to table
	useFocusEffect(
		useCallback(() => {
			fetchFilteredAnimals();
		}, [animals])
	);

	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: "Rebanho",
					headerRight: () => (
						<AddButton href="/(screens)/animals/add" />
					),
				}}
			/>
			<Span justify="space-between" my={4} align="center">
				<Heading>Todos seus animais</Heading>
				<SubTitle>
					{`total: ${animals?.length || "0"} ${
						filteredAnimals &&
						filteredAnimals.length !== animals.length
							? ` | filtrado: ${filteredAnimals.length}`
							: ""
					}`}
				</SubTitle>
			</Span>
			<SearchBar
				onChangeText={(text) => setSearchText(text)}
				value={searchText}
				placeholder="Busque por nome, observação ou código."
			/>
			<Span direction="row" my={4}>
				<Select
					label="Ordenar por"
					items={[
						{ key: "Alfabética", value: "alfabetic" },
						{ key: "Idade", value: "age" },
					]}
					defaultValue={"Alfabética"}
					defaultButtonText="Alfabética"
					onSelect={(option) => {
						setOrderBy(option.value);
					}}
					size="small"
					backgroundColor="transparent"
				/>
				<Select
					label="Lote"
					items={[
						{
							key: "Todos",
							value: undefined as unknown as string,
						},
						...serializeBatches(batches),
					]}
					defaultValue={"Todos"}
					defaultButtonText={"Todos"}
					onSelect={(option) => setFilterByBatchId(option.value)}
					size="small"
					backgroundColor="transparent"
				/>
			</Span>

			{isLoading ? (
				<Loading />
			) : (
				<AnimalTable animals={filteredAnimals} />
			)}

			{animals.length === 0 ? (
				<Span justify="center" py={8}>
					<Button
						title="Registrar novo animal"
						onPress={() => router.push("/(screens)/animals/add")}
					/>
				</Span>
			) : null}
		</ContainerView>
	);
}
