import { StorageService } from "database/StorageService";
import { Alert } from "react-native";

export const showConfirmationAndDeleteAll = (selectedIDs: number[]) => {
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
					selectedIDs.map((id) => StorageService.deleteAnimal(id)),
				style: "destructive",
			},
		]
	);
};
