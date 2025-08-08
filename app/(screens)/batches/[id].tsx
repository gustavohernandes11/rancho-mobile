import { AnimalTable } from "components/AnimalTable";
import { BatchPageHeaderButtons } from "components/BatchPageHeaderButtons";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { PageSkeleton } from "components/PageSkeleton";
import { Paragraph } from "components/Paragraph";
import { SearchBar } from "components/SearchBar";
import { SelectionMenu } from "components/SelectionMenu";
import { Span } from "components/Span";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useAnimalFiltersStore } from "hooks/useAnimalFiltersStore";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import useDebounce from "hooks/useDebounce";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useCallback, useEffect, useState } from "react";
import { Icon, IconButton } from "react-native-paper";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { Animal, OrderByOptions, PopulatedBatch } from "types";
import { isActive } from "utils/filters";

export default function ViewBatchDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [batch, setBatch] = useState<PopulatedBatch>();
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [orderBy, setOrderBy] = useState<OrderByOptions>("alfabetic");
    const isSelectionMode = useAnimalSelectionStore(
        store => store.isSelectionMode
    );
    const clearSelection = useAnimalSelectionStore(
        store => store.clearSelection
    );
    const batches = useGlobalStore(state => state.batches);

    const searchText = useAnimalFiltersStore(store => store.searchText);
    const setSearchText = useAnimalFiltersStore(store => store.setSearchText);

    useEffect(() => {
        setIsLoading(true);
        Storage.getPopulatedBatch(Number(id))
            .then(batch => {
                setBatch(batch);
                setAnimals(batch.animals);
            })
            .finally(() => setIsLoading(false));

        () => clearFiltersAndSelection;
    }, [batches]);

    const StackScreen = () => (
        <Stack.Screen
            options={{
                headerTitle: "Ver lote",
                headerRight: () =>
                    batch ? <BatchPageHeaderButtons batch={batch} /> : null,
            }}
        />
    );

    const fetchAnimals = async () => {
        if (!batch) return [];

        await Storage.listAnimalPreview({
            orderBy,
            batchID: batch.id,
            searchText,
            status: ["active"],
        }).then(animals => setAnimals(animals));
    };

    const clearFiltersAndSelection = () => {
        setSearchText("");
        clearSelection();
    };

    const countAnimals = () => {
        if (!batch) return "Vazio";
        const animalCount = batch.animals.filter(isActive).length;
        return `${animalCount > 0 ? `${animalCount}` : "Vazio"}`;
    };

    const triggerFetch = useCallback(() => {
        fetchAnimals();
    }, [orderBy, searchText]);

    useDebounce(triggerFetch, [orderBy, searchText], 300);

    useEffect(() => {
        triggerFetch();
    }, []);

    useFocusEffect(
        useCallback(() => {
            triggerFetch();
        }, [])
    );

    return (
        <ContainerView immediateContent={<StackScreen />}>
            {isLoading ? (
                <PageSkeleton />
            ) : (
                <>
                    <Span direction="column" gap={0}>
                        <Span marginY={0}>
                            <Paragraph>{countAnimals()}</Paragraph>
                            <Icon
                                size={20}
                                source="cow"
                                color={Theme.colors.mediumGray}
                            />
                        </Span>
                        <Heading size="big">{batch?.name}</Heading>
                        {batch?.description && (
                            <Paragraph secondary>{batch.description}</Paragraph>
                        )}
                    </Span>

                    <Span
                        justify="space-between"
                        align="center"
                        marginY={0}
                        padding={0}
                    >
                        <SearchBar
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholder="Buscar por nome ou código"
                        />
                        <IconButton
                            icon={
                                orderBy === "alfabetic"
                                    ? "sort-alphabetical-ascending"
                                    : "sort-clock-descending-outline"
                            }
                            onPress={() =>
                                setOrderBy(prev =>
                                    prev === "alfabetic" ? "age" : "alfabetic"
                                )
                            }
                            iconColor={Theme.colors.mediumGray}
                        />
                    </Span>

                    <Span direction="column" padding={0}>
                        {isSelectionMode ? <SelectionMenu /> : null}
                        <AnimalTable
                            showAnimalBatch={false}
                            animals={animals}
                        />
                    </Span>
                </>
            )}
        </ContainerView>
    );
}
