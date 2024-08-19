import { useModal } from "hooks/useModal";
import React from "react";
import { Menu } from "react-native-paper";
import { commonStyles } from "styles/Common";
import { TransferAnimalsModal } from "../TransferAnimalsModal";

export const MoveToBatchButton = () => {
    const { closeModal, isVisible, openModal } = useModal();

    return (
        <>
            <TransferAnimalsModal
                visible={isVisible}
                onDismiss={closeModal}
                closeModal={closeModal}
            />
            <Menu.Item
                titleStyle={commonStyles.text}
                onPress={openModal}
                title="Mover de lote"
                leadingIcon="folder-move"
            />
        </>
    );
};
