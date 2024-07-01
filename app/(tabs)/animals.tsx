import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import CheckboxInput from "components/CheckboxInput";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Loading } from "components/Loading";
import { Paragraph } from "components/Paragraph";
import { SearchBar } from "components/SearchBar";
import { Select } from "components/Select";
import { Span } from "components/Span";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import useDebounce from "hooks/useDebounce";
import { useGlobalState } from "hooks/useGlobalState";
import { useCallback, useEffect, useState } from "react";
import { Storage } from "services/StorageService";
import { Animal, AnimalStatusOptions, OrderByOptions } from "types";
import { serializeBatches } from "utils/serializers";

export default function ViewAnimalsScreen() {
    const router = useRouter();
    const { animals, batches } = useGlobalState();
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [orderBy, setOrderBy] = useState<OrderByOptions>("alfabetic");
    const [statusFilter, setStatusFilter] = useState<AnimalStatusOptions[]>([
        "active",
    ]);
    const [filterByBatchID, setFilterByBatchID] = useState<
        number | undefined
    >();
    const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);

    const fetchFilteredAnimals = () => {
        Storage.listAnimals({
            orderBy,
            batchID: filterByBatchID,
            searchText,
            status: statusFilter,
        })
            .then(animals => setFilteredAnimals(() => animals))
            .finally(() => setIsLoading(false));
    };

    // when changing filters
    useDebounce(
        () => {
            fetchFilteredAnimals();
        },
        [orderBy, filterByBatchID, searchText, statusFilter],
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
        }, [animals, orderBy, filterByBatchID, searchText, statusFilter])
    );

    const handleClearFilters = () => {
        setStatusFilter(["active"]);
        setFilterByBatchID(undefined);
        setOrderBy("alfabetic");
    };

    const hasFilters =
        orderBy !== "alfabetic" ||
        !!filterByBatchID ||
        statusFilter.length !== 1 ||
        !statusFilter.includes("active");

    const toggleShowFilters = () => setShowFilters(() => !showFilters);

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
                            icon={require("../../assets/images/CowIcon.png")}
                            onPress={() =>
                                router.push("/(screens)/animals/add")
                            }
                        />
                    ),
                }}
            />
            <Span justify="space-between" my={8} align="center">
                <Heading>Todos seus animais</Heading>
                <Paragraph>{getDisplayInfo()}</Paragraph>
            </Span>
            <SearchBar
                onChangeText={text => setSearchText(text)}
                value={searchText}
                placeholder="Busque por nome, código ou observação"
            />

            <Span direction="row">
                {showFilters && (
                    <>
                        <Span flexWrap="wrap" my={0}>
                            <Select
                                label="Ordenar por"
                                items={[
                                    { key: "Alfabética", value: "alfabetic" },
                                    { key: "Idade", value: "age" },
                                ]}
                                defaultValue="Alfabética"
                                defaultButtonText="Alfabética"
                                onSelect={option => {
                                    setOrderBy(option.value);
                                }}
                                size="small"
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
                                defaultValue="Todos"
                                defaultButtonText="Todos"
                                onSelect={option =>
                                    setFilterByBatchID(option.value)
                                }
                                size="small"
                            />
                            <Span my={0}>
                                <CheckboxInput
                                    onValueChange={options =>
                                        setStatusFilter(options)
                                    }
                                    label="Situação do animal"
                                    selectedValues={statusFilter}
                                    options={[
                                        { label: "Ativo", value: "active" },
                                        { label: "Morto", value: "dead" },
                                        { label: "Vendido", value: "sold" },
                                    ]}
                                />
                            </Span>
                        </Span>
                    </>
                )}
                <Span my={0}>
                    <Button
                        type="light"
                        title={`${showFilters ? "Esconder" : "Ver"} filtros${
                            hasFilters ? "*" : ""
                        }`}
                        onPress={toggleShowFilters}
                    />
                    {hasFilters && (
                        <Button
                            type="light"
                            title="Limpar filtros"
                            onPress={handleClearFilters}
                        />
                    )}
                </Span>
            </Span>

            {isLoading ? (
                <Loading />
            ) : (
                <Span>
                    <AnimalTable animals={filteredAnimals} />
                </Span>
            )}

            <Span justify="flex-end" direction="row">
                <Button
                    title="Registrar animal"
                    onPress={() => router.push("/(screens)/animals/add")}
                />
            </Span>
        </ContainerView>
    );
}
