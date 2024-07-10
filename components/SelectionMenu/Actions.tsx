import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useGlobalStore } from "hooks/useGlobalStore";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Tooltip } from "react-native-paper";
import { showToast } from "utils/showToast";
import { DeleteAnimalsButton } from "./_iconButtons/DeleteAnimalsButton";
import { SelectAllButton } from "./_iconButtons/SelectAllButton";
import { MoreOptionsMenu } from "./MoreOptionsMenu";

export const Actions = () => {
    const refreshAll = useGlobalStore(state => state.refreshAll);

    const clearSelection = useAnimalSelectionStore(
        state => state.clearSelection
    );

    const onSuccess = (message: string) => {
        refreshAll();
        clearSelection();
        showToast(message);
    };

    return (
        <View style={styles.actions}>
            <Tooltip title="Deletar">
                <DeleteAnimalsButton onSuccess={onSuccess} />
            </Tooltip>
            <Tooltip title="Selecionar todos">
                <SelectAllButton />
            </Tooltip>
            <Tooltip title="Mais opções">
                <MoreOptionsMenu onSuccess={onSuccess} />
            </Tooltip>
        </View>
    );
};
const styles = StyleSheet.create({
    actions: {
        flexDirection: "row",
        gap: 4,
    },
});
