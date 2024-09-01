import { useAnimalFiltersStore } from "hooks/useAnimalFiltersStore";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import React from "react";
import { IconButton } from "react-native-paper";
import Theme from "styles/Theme";

export const SelectAllButton = () => {
    const filteredAnimals = useAnimalFiltersStore(
        state => state.filteredAnimals
    );
    const setSelectedIDs = useAnimalSelectionStore(
        state => state.setSelectedIDs
    );

    const handleSelectAll = () =>
        setSelectedIDs(filteredAnimals.map(al => al.id));
    return (
        <IconButton
            iconColor={Theme.colors.white}
            icon="select-all"
            onPress={handleSelectAll}
            style={{ margin: 0 }}
            size={24}
        />
    );
};
