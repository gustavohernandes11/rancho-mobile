import { Alert } from "react-native";
import { Storage } from "services/StorageService";

export const confirmWriteOffBySell = (
    selectedIDs: number[],
    onSellCallback?: () => void
) => {
    Alert.alert(
        `Confirmar venda?`,
        `Os animais serão marcados como "vendidos", mas não serão deletados.`,
        [
            {
                text: "Vender",
                onPress: () =>
                    Storage.writeOffBySale(selectedIDs, false).then(
                        () => onSellCallback && onSellCallback()
                    ),
                style: "default",
            },
            {
                text: "Vender e anotar",
                onPress: () =>
                    Storage.writeOffBySale(selectedIDs, true).then(
                        () => onSellCallback && onSellCallback()
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
