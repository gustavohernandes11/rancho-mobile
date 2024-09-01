import { AnimalFilters } from "components/AnimalFilters";
import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Loading } from "components/Loading";
import { Paragraph } from "components/Paragraph";
import { SearchBar } from "components/SearchBar";
import { SelectionMenu } from "components/SelectionMenu";
import { Span } from "components/Span";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useAnimalFiltersStore } from "hooks/useAnimalFiltersStore";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import useDebounce from "hooks/useDebounce";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useCallback, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import Theme from "styles/Theme";
import { isActive } from "utils/filters";

export default function ViewAnimalsScreen() {
    const searchText = useAnimalFiltersStore(store => store.searchText);
    const setSearchText = useAnimalFiltersStore(store => store.setSearchText);
    const isLoading = useAnimalFiltersStore(store => store.isLoading);
    const orderBy = useAnimalFiltersStore(store => store.orderBy);
    const filterByBatchID = useAnimalFiltersStore(
        store => store.filterByBatchID
    );
    const statusFilter = useAnimalFiltersStore(store => store.statusFilter);
    const setIsLoading = useAnimalFiltersStore(store => store.setIsLoading);
    const filteredAnimals = useAnimalFiltersStore(
        store => store.filteredAnimals
    );
    const hasFilters = useAnimalFiltersStore(store => store.hasFilters);
    const fetchFilteredAnimals = useAnimalFiltersStore(
        store => store.fetchFilteredAnimals
    );
    const handleClearAndHideFilters = useAnimalFiltersStore(
        store => store.handleClearAndHideFilters
    );

    const router = useRouter();
    const animals = useGlobalStore(state => state.animals);
    const isSelectionMode = useAnimalSelectionStore(
        state => state.isSelectionMode
    );

    const [showFilters, setShowFilters] = useState(false);

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

    const toggleShowFilters = () => setShowFilters(() => !showFilters);

    function getDisplayInfo() {
        const totalCount = animals?.filter(isActive).length ?? 0;
        const filteredCount = filteredAnimals?.length ?? 0;
        const visibleInactiveCount = filteredCount - totalCount;

        let displayMessage = `Exibindo ${filteredCount} animal${
            filteredCount !== 1 ? "s" : ""
        }`;

        if (visibleInactiveCount > 0) {
            displayMessage += ` (incluindo ${visibleInactiveCount} inativo${
                visibleInactiveCount !== 1 ? "s" : ""
            })`;
        }

        if (hasFilters) {
            displayMessage += " (filtros ativos)";
        }

        return displayMessage;
    }

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
            {showFilters ? <AnimalFilters /> : null}

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
                    icon={require("../../assets/images/CowIcon.png")}
                    onPress={() => router.push("/(screens)/animals/add")}
                />
            </Span>
        </ContainerView>
    );
}
