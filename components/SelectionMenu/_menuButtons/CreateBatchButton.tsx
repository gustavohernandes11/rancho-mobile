import { router } from "expo-router";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import React from "react";
import { Menu } from "react-native-paper";
import { commonStyles } from "styles/Common";

export const CreateBatchButton = () => {
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);

    const handleCreateBatchWithSelectedAnimals = () => {
        router.push(
            "/(screens)/batches/add-with-selected-animals/" +
                JSON.stringify(selectedIDs)
        );
    };

    return (
        <Menu.Item
            titleStyle={commonStyles.text}
            onPress={handleCreateBatchWithSelectedAnimals}
            title="Agrupar em novo lote"
            leadingIcon={require("../../../assets/images/FolderPlusIcon.png")}
        />
    );
};
