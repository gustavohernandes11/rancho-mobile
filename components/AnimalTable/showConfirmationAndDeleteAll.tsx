import { Alert } from "react-native";
import { StorageService } from "../../database/StorageService";

export const showConfirmationAndDeleteAll = (selectedIDs: string[]) => {
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