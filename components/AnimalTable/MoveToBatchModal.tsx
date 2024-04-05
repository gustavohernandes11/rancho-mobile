import { Button } from "components/Button";
import { CustomDivider } from "components/CustomDivider";
import { Heading } from "components/Heading";
import { Span } from "components/Span";
import Colors from "constants/Colors";
import { StorageService } from "database/StorageService";
import { useGlobalState } from "hooks/useGlobalState";
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
import { showToast } from "utils/displayToast";

interface MoveToBatchModalProps {
	visible: boolean;
	onDismiss: () => void;
	setIsBatchModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	selectedIDs: number[];
	onClearSelection: () => void;
}

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

export const MoveToBatchModal: React.FC<
	MoveToBatchModalProps & Omit<ModalProps, "children">
> = ({
	visible,
	onDismiss,
	setIsBatchModalVisible,
	selectedIDs,
	onClearSelection,
	...props
}) => {
	const [selectedBatch, setSelectedBatch] = useState<Batch | null>();
	const { refreshAnimals, batches, refreshBatches } = useGlobalState();

	const handleMoveSelected = () => {
		StorageService.moveAnimalsToBatch(
			selectedIDs,
			selectedBatch?.id || null
		)
			.then(() => {
				setIsBatchModalVisible(() => false);
				selectedBatch?.id === null
					? showToast("Animais desvinculados de qualquer lote.")
					: showToast(
							"Animais movidos para o lote " +
								selectedBatch!.name +
								"."
					  );
				onClearSelection();
				refreshAnimals();
				refreshBatches();
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
							<Span>
								<Heading>Selecione um lote de destino</Heading>
							</Span>
							<RadioButton.Group
								onValueChange={(id) => {
									if (id == null) {
										setSelectedBatch({
											id: null as unknown as number,
											name: "Null dummy batch",
											count: 0,
										});
									} else {
										setSelectedBatch(
											batches?.find(
												(b) => b.id === Number(id)
											)
										);
									}
								}}
								value={
									selectedBatch?.id === null
										? (null as any)
										: selectedBatch?.id.toString() || ""
								}
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
										checked={selectedBatch?.id === null}
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
									disabled={!selectedBatch}
									onPress={handleMoveSelected}
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
		paddingHorizontal: 16,
		paddingTop: 16,
		borderRadius: 8,
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
