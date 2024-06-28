import { Alert } from "react-native";
import { Storage } from "services/StorageService";

export const showConfirmationAndDeleteAll = (
    selectedIDs: number[],
    onDeleteCallback?: () => void
) => {
    const count = selectedIDs.length;
    Alert.alert(
        `Deletar animais?`,
        `Você têm certeza que deseja deletar ${count} ${
            count > 1 ? "animais" : "animal"
        }?`,
        [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Deletar",
                onPress: () =>
                    Storage.deleteAnimal(selectedIDs).then(() => {
                        if (onDeleteCallback) onDeleteCallback();
                    }),
                style: "destructive",
            },
        ]
    );
};
