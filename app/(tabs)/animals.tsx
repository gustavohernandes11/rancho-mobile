import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Loading } from "components/Loading";
import { Paragraph } from "components/Paragraph";
import { SearchBar } from "components/SearchBar";
import SegmentedButtonsInput from "components/SegmentedButtonsInput";
import { Select } from "components/Select";
import { SelectionMenu } from "components/SelectionMenu";
import { Span } from "components/Span";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import useDebounce from "hooks/useDebounce";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useCallback, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { AnimalPreview, AnimalStatusOptions, OrderByOptions } from "types";
import { serializeBatches } from "utils/serializers";

export default function ViewAnimalsScreen() {
    const router = useRouter();
    const animals = useGlobalStore(state => state.animals);
    const batches = useGlobalStore(state => state.batches);
    const isSelectionMode = useAnimalSelectionStore(
        state => state.isSelectionMode
    );

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
    const [filteredAnimals, setFilteredAnimals] = useState<AnimalPreview[]>([]);

    const fetchFilteredAnimals = () => {
        Storage.listAnimalPreview({
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

    const handleClearAndHideFilters = () => {
        setStatusFilter(["active"]);
        setFilterByBatchID(undefined);
        setOrderBy("alfabetic");

        setShowFilters(() => false);
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

        return `Exibindo ${filteredCount} de ${totalCount} ${
            hasFilters ? "(filtros ativos)" : ""
        }`;
    }

    const getDefaultOrderText = () =>
        orderBy === "alfabetic" ? "Alfabética" : "Idade";

    const getDefaultBatchText = () =>
        filterByBatchID
            ? batches.find(b => b.id === filterByBatchID)?.name || ""
            : "Todos";

    return (
        <ContainerView>
            <Stack.Screen
                options={{
                    headerTitle: "Rebanho",
                    headerRight: () => (
                        <Button
                            title="Registrar animal"
                            icon={require("../../assets/images/CowIcon.png")}
                            onPress={() =>
                                router.push("/(screens)/animals/add")
                            }
                        />
                    ),
                }}
            />
            <Span justify="space-between" gap={0} marginY={0} align="center">
                <SearchBar
                    onChangeText={text => setSearchText(text)}
                    value={searchText}
                    placeholder="Busque por nome ou código"
                />
                {hasFilters && (
                    <IconButton
                        icon="filter-remove"
                        onPress={handleClearAndHideFilters}
                    />
                )}
                <IconButton
                    icon="filter"
                    iconColor={
                        showFilters
                            ? Theme.colors.primary
                            : Theme.colors.mediumGray
                    }
                    onPress={toggleShowFilters}
                />
            </Span>
            {showFilters ? (
                <Span flexWrap="wrap" marginY={8}>
                    <Span>
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
                            defaultButtonText={getDefaultBatchText()}
                            onSelect={option =>
                                setFilterByBatchID(option.value)
                            }
                            size="small"
                            search={false}
                        />
                        <Select
                            label="Ordenar"
                            items={[
                                {
                                    key: "Alfabética",
                                    value: "alfabetic",
                                },
                                {
                                    key: "Idade",
                                    value: "age",
                                },
                            ]}
                            defaultValue="alfabetic"
                            defaultButtonText={getDefaultOrderText()}
                            onSelect={option => setOrderBy(option.value)}
                            size="small"
                            search={false}
                        />
                    </Span>
                    <Span marginY={0}>
                        <SegmentedButtonsInput
                            label="Incluir animais em estão"
                            options={[
                                { label: "Ativos", value: "active" },
                                { label: "Mortos", value: "dead" },
                                { label: "Vendidos", value: "sold" },
                            ]}
                            selectedValues={statusFilter}
                            onValueChange={(options: AnimalStatusOptions[]) =>
                                setStatusFilter(options)
                            }
                        />
                    </Span>
                </Span>
            ) : null}

            {isLoading ? (
                <Loading />
            ) : (
                <Span>
                    {isSelectionMode ? <SelectionMenu /> : null}
                    <Span>
                        <Paragraph secondary>{getDisplayInfo()}</Paragraph>
                        <AnimalTable animals={filteredAnimals} />
                    </Span>
                </Span>
            )}

            <Span justify="flex-end" direction="row">
                <Button
                    title="Registrar animal"
                    icon={require("../../assets/images/CowIcon_green.png")}
                    onPress={() => router.push("/(screens)/animals/add")}
                />
            </Span>
        </ContainerView>
    );
}
