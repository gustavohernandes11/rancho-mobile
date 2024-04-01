import { Span } from "components/Span";
import Colors from "constants/Colors";
import React, { useState } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { IconButton, Tooltip } from "react-native-paper";
import { MoveToBatchModal } from "./MoveToBatchModal";
import { showConfirmationAndDeleteAll } from "./showConfirmationAndDeleteAll";

interface SelectionBannerProps {
	showActions?: boolean;
	showCloseButton?: boolean;
	active: boolean;
	onClearSelection: () => void;
	selectedIDs: number[];
	onSelectAll: () => void;
	onDeleteMany: () => void;
}

export const SelectionBanner: React.FC<SelectionBannerProps & ViewProps> = ({
	showActions = true,
	showCloseButton = true,
	active,
	onClearSelection,
	selectedIDs,
	onSelectAll,
	onDeleteMany,
	...props
}) => {
	const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);

	return (
		<>
			{active && (
				<View
					style={[styles.container, !showActions && { padding: 12 }]}
					{...props}
				>
					<MoveToBatchModal
						visible={isBatchModalVisible}
						onDismiss={() => setIsBatchModalVisible(false)}
						setIsBatchModalVisible={setIsBatchModalVisible}
						onClearSelection={onClearSelection}
						selectedIDs={selectedIDs}
					/>
					<Span align="center" justify="space-between" my={0}>
						{showCloseButton && (
							<IconButton
								iconColor={Colors.white}
								icon="close"
								onPress={onClearSelection}
								style={{
									margin: 0,
								}}
								size={20}
							/>
						)}
						<Text style={styles.text}>
							{selectedIDs.length} selecionado(s).
						</Text>
						{showActions && (
							<View style={{ flexDirection: "row", gap: 4 }}>
								<Tooltip title="Deletar">
									<IconButton
										iconColor={Colors.white}
										icon="delete"
										onPress={() =>
											showConfirmationAndDeleteAll(
												selectedIDs,
												() => onDeleteMany
											)
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
										onPress={() =>
											setIsBatchModalVisible(true)
										}
										style={{ margin: 0 }}
										size={20}
									/>
								</Tooltip>
							</View>
						)}
					</Span>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 4,
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
