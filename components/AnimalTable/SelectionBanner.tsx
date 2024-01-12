import { Span } from "components/Span";
import Colors from "constants/Colors";
import { useSelectionMode } from "hooks/useSelectionMode";
import React, { useState } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { IconButton } from "react-native-paper";
import { MoveToBatchModal } from "./MoveToBatchModal";
import { showConfirmationAndDeleteAll } from "./showConfirmationAndDeleteAll";

interface SelectionBannerProps {
	allAnimalIDs: string[];
}

export const SelectionBanner: React.FC<SelectionBannerProps & ViewProps> = ({
	allAnimalIDs,
	...props
}) => {
	const { setIsSelectionMode, selectedIDs, setSelectedIDs } =
		useSelectionMode();
	const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);
	return (
		<View style={styles.container} {...props}>
			<MoveToBatchModal
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
						setIsSelectionMode(false);
						setSelectedIDs([]);
					}}
					style={{
						margin: 0,
					}}
					size={20}
				/>
				<Text style={styles.text}>
					{selectedIDs.length} animais selecionados
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
						icon="select-all"
						onPress={() => setSelectedIDs(allAnimalIDs)}
						style={{ margin: 0 }}
						size={20}
					/>
					<IconButton
						iconColor={Colors.white}
						icon="folder-move"
						onPress={() => setIsBatchModalVisible(true)}
						style={{ margin: 0 }}
						size={20}
					/>
				</View>
			</Span>
		</View>
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
