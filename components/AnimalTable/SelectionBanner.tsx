import { Span } from "components/Span";
import Colors from "constants/Colors";
import React, { useState } from "react";
import { Text, View, ViewProps } from "react-native";
import { IconButton } from "react-native-paper";
import { MoveToBatchModal } from "./MoveToBatchModal";
import { SelectionActionButtons, styles } from "./SelectionActionButtons";

interface SelectionBannerProps {
	showActions?: boolean;
	showCloseButton?: boolean;
	onClearSelection: () => void;
	selectedIDs: number[];
	onSelectAll: () => void;
	onDeleteMany: () => void;
}

export const SelectionBanner: React.FC<SelectionBannerProps & ViewProps> = ({
	showActions = true,
	showCloseButton = true,
	onClearSelection,
	selectedIDs,
	onSelectAll,
	onDeleteMany,
	...props
}) => {
	const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);

	return (
		<>
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
						<SelectionActionButtons
							onDeleteMany={onDeleteMany}
							onSelectAll={onSelectAll}
							selectedIDs={selectedIDs}
							onMove={() => setIsBatchModalVisible(true)}
						/>
					)}
				</Span>
			</View>
		</>
	);
};
