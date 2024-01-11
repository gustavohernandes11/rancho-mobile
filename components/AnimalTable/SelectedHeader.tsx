import React, { useState } from "react";
import { Alert, StyleSheet, View, ViewProps } from "react-native";
import Colors from "../../constants/Colors";
import { Text } from "react-native";
import { Span } from "../Span";
import { IconButton } from "react-native-paper";
import { createStorageService } from "../../database/createStorageServiceFactory";
import { ChooseBatchModal } from "./ChooseBatchModal";

const storageService = createStorageService();

interface SelectedHeaderProps {
	count: React.ReactNode;
	setIsEditMode: (isEditMode: boolean) => any;
	setSelectedIDs: React.Dispatch<React.SetStateAction<string[]>>;
	selectedIDs: string[];
}

const showConfirmationAndDeleteAll = (selectedIDs: string[]) => {
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
					selectedIDs.map((id) => storageService.deleteAnimal(id)),
				style: "destructive",
			},
		]
	);
};
export const SelectedHeader: React.FC<SelectedHeaderProps & ViewProps> = ({
	count,
	setIsEditMode,
	setSelectedIDs,
	selectedIDs,
	...props
}) => {
	const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);
	return (
		<>
			<View style={styles.container} {...props}>
				<ChooseBatchModal
					selectedIDs={selectedIDs}
					visible={isBatchModalVisible}
					onDismiss={() => setIsBatchModalVisible(false)}
					setIsBatchModalVisible={setIsBatchModalVisible}
				/>
				<Span
					justifyContent="space-between"
					marginVertical={0}
					alignItems="center"
				>
					<IconButton
						iconColor={Colors.white}
						icon="close"
						onPress={() => {
							setIsEditMode(false);
							setSelectedIDs([]);
						}}
						style={{ margin: 0 }}
						size={20}
					/>
					<Text style={styles.text}>
						{count} animais selecionados
					</Text>
					<View style={{ flexDirection: "row", gap: 4 }}>
						<IconButton
							iconColor={Colors.white}
							icon="delete"
							onPress={() =>
								showConfirmationAndDeleteAll(selectedIDs)
							}
							style={{ margin: 0 }}
							size={20}
						/>
						<IconButton
							iconColor={Colors.white}
							icon="gate-arrow-right"
							onPress={() => setIsBatchModalVisible(true)}
							style={{ margin: 0 }}
							size={20}
						/>
					</View>
				</Span>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: Colors.border,
		backgroundColor: Colors.green,
	},
	text: {
		color: Colors.white,
		flexShrink: 1,
	},
});
