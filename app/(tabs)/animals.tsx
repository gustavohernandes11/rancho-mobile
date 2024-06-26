import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Loading } from "components/Loading";
import { SearchBar } from "components/SearchBar";
import { Select } from "components/Select";
import { Span } from "components/Span";
import { SubTitle } from "components/SubTitle";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import useDebounce from "hooks/useDebounce";
import { useGlobalState } from "hooks/useGlobalState";
import { useCallback, useEffect, useState } from "react";
import { Storage } from "services/StorageService";
import { Animal } from "types/Animal";
import { OrderByOptions } from "types/StorageRepository";
import { serializeBatches } from "utils/serializers";

export default function ViewAnimalsScreen() {
	const router = useRouter();
	const { animals, batches } = useGlobalState();
	const [searchText, setSearchText] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [orderBy, setOrderBy] = useState<OrderByOptions>("alfabetic");
	const [filterByBatchID, setFilterByBatchID] = useState<
		number | undefined
	>();
	const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);

	const fetchFilteredAnimals = () => {
		Storage.listAnimals({
			orderBy,
			batchID: filterByBatchID,
			searchText,
		})
			.then((animals) => setFilteredAnimals(() => animals))
			.finally(() => setIsLoading(false));
	};

	// when changing filters
	useDebounce(
		() => {
			fetchFilteredAnimals();
		},
		[orderBy, filterByBatchID, searchText],
		300
	);

	// first fetch
	useEffect(() => {
		setIsLoading(true);
		fetchFilteredAnimals();
	}, []);

	// update when going back to table
	useFocusEffect(
		useCallback(() => {
			fetchFilteredAnimals();
		}, [animals, orderBy, filterByBatchID, searchText])
	);

	function getDisplayInfo() {
		const totalCount = animals ? animals.length : 0;
		const filteredCount = filteredAnimals ? filteredAnimals.length : 0;

		return `Exibindo ${filteredCount} de ${totalCount}`;
	}

	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: "Rebanho",
					headerRight: () => (
						<Button
							title="Novo animal"
							icon={require("../../assets/images/AddAnimalIcon.png")}
							onPress={() =>
								router.push("/(screens)/animals/add")
							}
						/>
					),
				}}
			/>
			<Span justify="space-between" my={8} align="center">
				<Heading>Todos seus animais</Heading>
				<SubTitle>{getDisplayInfo()}</SubTitle>
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
					onSelect={(option) => setFilterByBatchID(option.value)}
					size="small"
					backgroundColor="transparent"
				/>
			</Span>

			{isLoading ? (
				<Loading />
			) : (
				<Span py={16}>
					<AnimalTable animals={filteredAnimals} />
				</Span>
			)}

			<Span justify="flex-end" direction="row" py={8}>
				<Button
					title="Registrar animal"
					onPress={() => router.push("/(screens)/animals/add")}
				/>
			</Span>
		</ContainerView>
	);
}
