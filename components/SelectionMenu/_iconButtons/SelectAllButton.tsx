import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useGlobalStore } from "hooks/useGlobalStore";
import React from "react";
import { IconButton } from "react-native-paper";
import Colors from "styles/Colors";

export const SelectAllButton = () => {
    const animals = useGlobalStore(state => state.animals);
    const setSelectedIDs = useAnimalSelectionStore(
        state => state.setSelectedIDs
    );

    const handleSelectAll = () => setSelectedIDs(animals.map(al => al.id));
    return (
        <IconButton
            iconColor={Colors.white}
            icon="select-all"
            onPress={handleSelectAll}
            style={{ margin: 0 }}
            size={24}
        />
    );
};
