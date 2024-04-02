import { AddButton } from "components/AddIconButton";
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
import { Stack, router } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useState } from "react";
import { OrderByOptions } from "types/Repository";
import { serializeBatches } from "utils/serializers";

export default function ViewAnimalsScreen() {
	const { animals, batches, refreshAnimals, setAnimals } = useGlobalState();
	const [searchText, setSearchText] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [orderBy, setOrderBy] = useState<OrderByOptions>("alfabetic");
	const [filterByBatchId, setFilterByBatchId] = useState<
		number | undefined
	>();
	const [handledAnimals, setHandleAnimals] = useState(animals);

	const fetchFilteredAnimals = () => {
		setIsLoading(true);

		StorageService.listAnimals({
			orderBy,
			batchId: filterByBatchId,
		})
			.then((animals) => setHandleAnimals(animals))
			.then(() => setIsLoading(false));
	};

	useEffect(() => {
		fetchFilteredAnimals();
	}, [animals, orderBy, filterByBatchId]);

	useEffect(() => {
		setIsLoading(false);
		if (!searchText) refreshAnimals();
		return () => refreshAnimals();
	}, []);

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
						handledAnimals &&
						handledAnimals.length !== animals.length
							? ` | filtrado: ${handledAnimals.length}`
							: ""
					}`}
				</SubTitle>
			</Span>
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

			{isLoading ? <Loading /> : <AnimalTable animals={handledAnimals} />}

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
