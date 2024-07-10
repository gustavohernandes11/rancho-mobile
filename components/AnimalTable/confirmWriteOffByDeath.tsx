import { Alert } from "react-native";
import { Storage } from "services/StorageService";

export const confirmWriteOffByDeath = (
    selectedIDs: number[],
    onDeleteCallback?: () => void
) => {
    Alert.alert(
        `Dar baixa por morte?`,
        `Os animais serão marcados como "mortos", mas não serão deletados.`,
        [
            {
                text: "Dar baixa",
                onPress: () =>
                    Storage.writeOffByDeath(selectedIDs, false).then(
                        () => onDeleteCallback && onDeleteCallback()
                    ),
                style: "default",
            },
            {
                text: "Dar baixa e anotar",
                onPress: () =>
                    Storage.writeOffByDeath(selectedIDs, true).then(
                        () => onDeleteCallback && onDeleteCallback()
                    ),
                style: "default",
            },
            {
                text: "Cancelar",
                style: "cancel",
            },
        ]
    );
};
