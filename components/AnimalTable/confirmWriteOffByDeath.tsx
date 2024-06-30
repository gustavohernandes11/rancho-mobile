import { Alert } from "react-native";
import { Storage } from "services/StorageService";

export const confirmWriteOffByDeath = (
    selectedIDs: number[],
    onDeleteCallback?: () => void
) => {
    Alert.alert(
        `Dar baixa por morte?`,
        `Os animais serão marcados como "mortos", mas não serão deletados. Deseja salvar uma anotação automática sobre?`,
        [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Dar baixa e salvar",
                onPress: () =>
                    Storage.writeOffByDeath(selectedIDs, true).then(
                        () => onDeleteCallback && onDeleteCallback()
                    ),
                style: "default",
            },
            {
                text: "Dar baixa",
                onPress: () =>
                    Storage.writeOffByDeath(selectedIDs, false).then(
                        () => onDeleteCallback && onDeleteCallback()
                    ),
                style: "default",
            },
        ]
    );
};
