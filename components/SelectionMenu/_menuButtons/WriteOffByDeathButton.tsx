import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import React from "react";
import { Menu } from "react-native-paper";
import { commonStyles } from "styles/Common";
import { confirmWriteOffByDeath } from "../confirmWriteOffByDeath";

type WriteOffByDeathButtonProps = {
    onSuccess: (message: string) => void;
};

export const WriteOffByDeathButton = ({
    onSuccess,
}: WriteOffByDeathButtonProps) => {
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);

    const handleWriteOffByDeath = () => {
        confirmWriteOffByDeath(selectedIDs, () =>
            onSuccess("Animais atualizados.")
        );
    };

    return (
        <Menu.Item
            titleStyle={commonStyles.text}
            onPress={handleWriteOffByDeath}
            title="Dar baixa de morte"
            leadingIcon="coffin"
        />
    );
};
