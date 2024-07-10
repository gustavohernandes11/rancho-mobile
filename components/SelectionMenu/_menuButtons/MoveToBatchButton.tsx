import React, { useState } from "react";
import { Menu } from "react-native-paper";
import { commonStyles } from "styles/Common";
import { TransferAnimalsModal } from "../TransferAnimalsModal";

export const MoveToBatchButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <TransferAnimalsModal
                visible={isModalOpen}
                onDismiss={() => setIsModalOpen(false)}
                setIsModalOpen={setIsModalOpen}
            />
            <Menu.Item
                titleStyle={commonStyles.text}
                onPress={() => setIsModalOpen(true)}
                title="Mover de lote"
                leadingIcon="folder-move"
            />
        </>
    );
};
