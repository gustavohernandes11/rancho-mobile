import { StorageService } from "database/StorageService";
import { Alert } from "react-native";

export const showConfirmationAndDeleteAll = (
	selectedIDs: number[],
	onDeleteCallback?: () => void
) => {
	Alert.alert(
		`Deletar animais?`,
		`Você têm certeza que deseja deletar ${selectedIDs.length} animais?`,
		[
			{
				text: "Cancelar",
				style: "cancel",
			},
			{
				text: "Deletar",
				onPress: () =>
					StorageService.deleteManyAnimals(selectedIDs).then(() => {
						if (onDeleteCallback) onDeleteCallback();
					}),
				style: "destructive",
			},
		]
	);
};
