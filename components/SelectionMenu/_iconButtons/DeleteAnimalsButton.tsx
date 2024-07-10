import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import React from "react";
import { IconButton } from "react-native-paper";
import { Storage } from "services/StorageService";
import Colors from "styles/Colors";
import { confirmDeleteAll } from "../confirmDeleteAll";

type DeleteAnimalsButtonProps = {
    onSuccess: (message: string) => void;
};

export const DeleteAnimalsButton = ({
    onSuccess,
}: DeleteAnimalsButtonProps) => {
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);

    const handleDeleteMany = () => {
        Storage.deleteAnimal(selectedIDs).then(() =>
            onSuccess("Animais removidos com sucesso.")
        );
    };

    return (
        <IconButton
            iconColor={Colors.white}
            icon="delete"
            onPress={() => confirmDeleteAll(selectedIDs, handleDeleteMany)}
            style={{ margin: 0 }}
            size={24}
        />
    );
};