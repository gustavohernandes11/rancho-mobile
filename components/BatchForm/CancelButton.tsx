import { Button } from "components/Button";
import { useNavigation } from "expo-router";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import React from "react";

export const CancelButton: React.FC = () => {
    const navigation = useNavigation();
    const clearSelection = useAnimalSelectionStore(
        state => state.clearSelection
    );

    const handleCancel = () => {
        clearSelection();
        navigation.goBack();
    };

    return <Button type="light" title="Cancelar" onPress={handleCancel} />;
};
