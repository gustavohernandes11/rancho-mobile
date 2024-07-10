import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { BackHandler } from "react-native";
import { useAnimalSelectionStore } from "./useAnimalSelectionStore";

export const useClearSelectionOnHardwareBack = () => {
    const clearSelection = useAnimalSelectionStore(
        state => state.clearSelection
    );
    const isSelectionMode = useAnimalSelectionStore(
        state => state.isSelectionMode
    );
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);

    useFocusEffect(
        useCallback(() => {
            const backAction = () => {
                if (isSelectionMode) {
                    clearSelection();
                    return true;
                } else {
                    return false;
                }
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [isSelectionMode, selectedIDs])
    );
};
