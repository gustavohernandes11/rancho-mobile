import Colors from "constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Tooltip } from "react-native-paper";
import { showConfirmationAndDeleteAll } from "./showConfirmationAndDeleteAll";

type SelectionMenuActionButtonsProps = {
	selectedIDs: number[];
	onSelectAll: () => void;
	onDeleteMany: () => void;
	onMove: () => void;
};
export const SelectionMenuActionButtons = ({
	onDeleteMany,
	onSelectAll,
	selectedIDs,
	onMove,
}: SelectionMenuActionButtonsProps) => (
	<View style={{ flexDirection: "row", gap: 4 }}>
		<Tooltip title="Deletar">
			<IconButton
				iconColor={Colors.white}
				icon="delete"
				onPress={() =>
					showConfirmationAndDeleteAll(selectedIDs, onDeleteMany)
				}
				style={{ margin: 0 }}
				size={20}
			/>
		</Tooltip>
		<Tooltip title="Selecionar todos">
			<IconButton
				iconColor={Colors.white}
				icon="select-all"
				onPress={onSelectAll}
				style={{ margin: 0 }}
				size={20}
			/>
		</Tooltip>
		<Tooltip title="Mover de lote">
			<IconButton
				iconColor={Colors.white}
				icon="folder-move"
				onPress={onMove}
				style={{ margin: 0 }}
				size={20}
			/>
		</Tooltip>
	</View>
);
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: Colors.border,
		backgroundColor: Colors.green,
		padding: 4,
	},
	text: {
		color: Colors.white,
		flexShrink: 1,
	},
});
