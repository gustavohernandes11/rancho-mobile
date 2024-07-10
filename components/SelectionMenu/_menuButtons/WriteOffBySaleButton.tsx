import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import React from "react";
import { Menu } from "react-native-paper";
import { commonStyles } from "styles/Common";
import { confirmwriteOffBySale } from "../confirmwriteOffBySale";

type WriteOffBySaleButtonProps = {
    onSuccess: (message: string) => void;
};

export const WriteOffBySaleButton = ({
    onSuccess,
}: WriteOffBySaleButtonProps) => {
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);

    const handleWriteOffBySale = () => {
        confirmwriteOffBySale(selectedIDs, () =>
            onSuccess("Animais atualizados.")
        );
    };

    return (
        <Menu.Item
            titleStyle={commonStyles.text}
            onPress={handleWriteOffBySale}
            title="Dar baixa de venda"
            leadingIcon="truck-delivery"
        />
    );
};
