import { router } from "expo-router";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import React from "react";
import { Menu } from "react-native-paper";
import { commonStyles } from "styles/Common";

export const CreateAnnotationButton = () => {
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);

    const handleCreateAnnotationWithSelectedAnimals = () => {
        router.push(
            "/(screens)/annotations/add-with-selected-animals/" +
                JSON.stringify(selectedIDs)
        );
    };

    return (
        <Menu.Item
            titleStyle={commonStyles.text}
            onPress={handleCreateAnnotationWithSelectedAnimals}
            title="Fazer anotação"
            leadingIcon="bookmark-plus-outline"
        />
    );
};
