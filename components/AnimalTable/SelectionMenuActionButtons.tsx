import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Menu, Tooltip } from "react-native-paper";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import { confirmDeleteAll } from "./confirmDeleteAll";

type SelectionMenuActionButtonsProps = {
    selectedIDs: number[];
    onSelectAll: () => void;

    onDeleteMany: () => void;
    onMove: () => void;
    onWriteOffByDeath: () => void;
    onwriteOffBySale: () => void;
    onCreateBatchWithSelectedAnimals: () => void;
    onCreateAnnotationWithSelectedAnimals: () => void;

    isMoreOptionsVisible: boolean;
    onCloseMoreOptions: () => void;
    openMoreOptions: () => void;
};

export const SelectionMenuActionButtons = ({
    onSelectAll,
    selectedIDs,

    onDeleteMany,
    onMove,
    onWriteOffByDeath,
    onwriteOffBySale,
    onCreateBatchWithSelectedAnimals,
    onCreateAnnotationWithSelectedAnimals,

    isMoreOptionsVisible,
    onCloseMoreOptions,
    openMoreOptions,
}: SelectionMenuActionButtonsProps) => (
    <View style={{ flexDirection: "row", gap: 4 }}>
        <Tooltip title="Deletar">
            <IconButton
                iconColor={Colors.white}
                icon="delete"
                onPress={() => confirmDeleteAll(selectedIDs, onDeleteMany)}
                style={{ margin: 0 }}
                size={20}
            />
        </Tooltip>
        <Tooltip title="Selecionar todos">
            <IconButton
                iconColor={Colors.white}
                icon="select-all"
                onPress={onSelectAll}
                style={{ margin: 0 }}
                size={20}
            />
        </Tooltip>
        <Tooltip title="Mais opções">
            <Menu
                contentStyle={commonStyles.inputAspect}
                visible={isMoreOptionsVisible}
                onDismiss={onCloseMoreOptions}
                anchor={
                    <IconButton
                        iconColor={Colors.white}
                        icon="dots-vertical"
                        onPress={openMoreOptions}
                        style={{ margin: 0 }}
                        size={20}
                    />
                }
            >
                <Menu.Item
                    titleStyle={commonStyles.text}
                    onPress={onMove}
                    title="Mover de lote"
                    leadingIcon="folder-move"
                />
                <Menu.Item
                    titleStyle={commonStyles.text}
                    onPress={() => {
                        onCreateBatchWithSelectedAnimals();
                        onCloseMoreOptions();
                    }}
                    title="Agrupar em novo lote"
                    leadingIcon={require("../../assets/images/FolderPlusIcon.png")}
                />
                <Menu.Item
                    titleStyle={commonStyles.text}
                    onPress={onwriteOffBySale}
                    title="Dar baixa de venda"
                    leadingIcon="truck-delivery"
                />
                <Menu.Item
                    titleStyle={commonStyles.text}
                    onPress={onWriteOffByDeath}
                    title="Dar baixa de morte"
                    leadingIcon="coffin"
                />
                <Menu.Item
                    titleStyle={commonStyles.text}
                    onPress={() => {
                        onCreateAnnotationWithSelectedAnimals();
                        onCloseMoreOptions();
                    }}
                    title="Fazer anotação"
                    leadingIcon="bookmark-plus-outline"
                />
            </Menu>
        </Tooltip>
    </View>
);
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.green,
        padding: 4,
    },
    text: {
        color: Colors.white,
        flexShrink: 1,
    },
});
