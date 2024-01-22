import { Button } from "components/Button";
import { CustomDivider } from "components/CustomDivider";
import { Heading } from "components/Heading";
import { Span } from "components/Span";
import Colors from "constants/Colors";
import { StorageService } from "database/StorageService";
import { useData } from "hooks/useData";
import { useSelectionMode } from "hooks/useSelectionMode";
import React, { Fragment, useState } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { ModalProps, Portal, RadioButton } from "react-native-paper";
import { Batch } from "types/Batch";

interface MoveToBatchModalProps {
	visible: boolean;
	onDismiss: () => void;
	setIsBatchModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MoveToBatchModal: React.FC<
	MoveToBatchModalProps & Omit<ModalProps, "children">
> = ({ visible, onDismiss, setIsBatchModalVisible, ...props }) => {
	const [selectedBatch, setSelectedBatch] = useState<Batch | null>();
	const { refreshAnimals, batches } = useData();
	const { selectedIDs, clearSelection } = useSelectionMode();

	const moveAllAnimalsTo = () => {
		StorageService.moveAnimalsToBatch(
			selectedIDs,
			selectedBatch?.id || null
		)
			.then(() => {
				setIsBatchModalVisible(() => false);
				selectedBatch === null
					? Alert.alert(
							"Ok!",
							"Animais desvinculados de qualquer lote."
					  )
					: Alert.alert(
							"Ok!",
							"Animais movidos para o lote " +
								selectedBatch!.name +
								"."
					  );
				clearSelection();
				refreshAnimals();
			})
			.catch((error) => {
				Alert.alert(
					"Oops!",
					"Houve um erro ao mover os animais.",
					error
				);
			});
	};

	return (
		<Portal>
			<Modal
				visible={visible}
				onRequestClose={onDismiss}
				dismissable={true}
				transparent={true}
				{...props}
			>
				<TouchableOpacity style={styles.blur} onPress={onDismiss}>
					<View onStartShouldSetResponder={() => true}>
						<TouchableWithoutFeedback style={styles.modal}>
							<Heading>Selecione um lote de destino</Heading>
							<RadioButton.Group
								onValueChange={(id) =>
									setSelectedBatch(
										batches?.find(
											(b) => b.id === Number(id)
										)
									)
								}
								value={selectedBatch?.id.toString() || ""}
							>
								<CustomDivider />
								<ScrollView style={{ height: "75%" }}>
									{batches?.map((batch) => (
										<Fragment key={batch.id}>
											<Span
												onStartShouldSetResponder={() =>
													true
												}
												justify="space-between"
												align="center"
											>
												<View
													onStartShouldSetResponder={() =>
														true
													}
												>
													<Text>{batch.name}</Text>
													<Text
														style={
															styles.description
														}
													>
														{batch.description}
													</Text>
												</View>
												<RadioButton
													color={Colors.green}
													value={batch.id.toString()}
													status={
														selectedBatch?.id ===
														batch.id
															? "checked"
															: "unchecked"
													}
												/>
											</Span>
											<CustomDivider />
										</Fragment>
									))}
									<EmptyBatchOption
										checked={selectedBatch === null}
									/>
								</ScrollView>
							</RadioButton.Group>

							<Span justify="flex-end" py={8} flexWrap="nowrap">
								<Button
									type="light"
									title="Cancelar"
									onPress={() =>
										setIsBatchModalVisible(false)
									}
								/>
								<Button
									title="Mover"
									disabled={!selectedBatch?.id}
									onPress={moveAllAnimalsTo}
								/>
							</Span>
						</TouchableWithoutFeedback>
					</View>
				</TouchableOpacity>
			</Modal>
		</Portal>
	);
};

const styles = StyleSheet.create({
	modal: {
		marginHorizontal: 16,
		marginVertical: "20%",
		backgroundColor: Colors.white,
		padding: 16,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: Colors.border,
		zIndex: 5,
	},
	description: {
		color: Colors.darkGray,
		fontSize: 12,
	},
	blur: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.2)",
	},
});

const EmptyBatchOption = ({ checked }: { checked: boolean }) => (
	<Fragment>
		<Span
			onStartShouldSetResponder={() => true}
			justify="space-between"
			align="center"
		>
			<View onStartShouldSetResponder={() => true}>
				<Text>Nenhum lote</Text>
				<Text style={styles.description}>
					Desvincular animal de qualquer lote
				</Text>
			</View>
			<RadioButton
				color={Colors.green}
				value={null as any}
				status={checked ? "checked" : "unchecked"}
			/>
		</Span>
		<CustomDivider />
	</Fragment>
);
