import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import { Divider, ModalProps, Portal, RadioButton } from "react-native-paper";
import Colors from "../../constants/Colors";
import { createStorageService } from "../../database/createStorageServiceFactory";
import { Batch } from "../../types/Batch";
import { Button } from "../Button";
import { Heading } from "../Heading";
import { Span } from "../Span";

interface ChooseBatchModalProps {
	visible: boolean;
	onDismiss: () => void;
	selectedIDs: string[];
	setIsBatchModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const storageService = createStorageService();

export const ChooseBatchModal: React.FC<
	ChooseBatchModalProps & Omit<ModalProps, "children">
> = ({ visible, onDismiss, selectedIDs, setIsBatchModalVisible, ...props }) => {
	const [selectedBatch, setSelectedBatch] = useState<Batch>();

	const [batches, setBatches] = useState<Batch[]>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await storageService.listAllBatchesInfo();
			setBatches(response);
		};
		fetchData();
	}, []);
	return (
		<Portal>
			<Modal
				visible={visible}
				presentationStyle="formSheet"
				onDismiss={onDismiss}
				dismissable={true}
				transparent={true}
				{...props}
			>
				<View style={styles.content}>
					<Heading>Selecione um lote de destino</Heading>
					<RadioButton.Group
						onValueChange={(id) =>
							setSelectedBatch(batches?.find((b) => b.id === id))
						}
						value={selectedBatch?.id || ""}
					>
						<CustomDivider />
						{batches?.map((batch) => (
							<>
								<Span
									justifyContent="space-between"
									alignItems="center"
								>
									<View>
										<Text>{batch.name}</Text>
										<Text style={styles.description}>
											{batch.description}
										</Text>
									</View>
									<RadioButton
										color={Colors.green}
										value={batch.id}
										status={
											selectedBatch?.id === batch.id
												? "checked"
												: "unchecked"
										}
									/>
								</Span>
								<CustomDivider />
							</>
						))}
					</RadioButton.Group>

					<Span justifyContent="flex-end" marginVertical={16}>
						<Button
							type="light"
							title="Cancelar"
							onPress={() => setIsBatchModalVisible(false)}
						/>
						<Button
							title="Mover"
							disabled={!selectedBatch?.id}
							onPress={() => {
								selectedIDs.map((id) =>
									storageService
										.updateAnimal({
											id,
											batchId: selectedBatch!.id,
										})
										.then(() => {
											console.log(
												"Animais movidos para o lote " +
													selectedBatch!.name
											);
											Alert.alert(
												"Ok!",
												"Animais movidos para o lote " +
													selectedBatch!.name
											);
										})
								);
							}}
						/>
					</Span>
				</View>
			</Modal>
		</Portal>
	);
};
const CustomDivider = () => (
	<Divider style={{ backgroundColor: Colors.border }} />
);

const styles = StyleSheet.create({
	content: {
		marginHorizontal: 16,
		marginVertical: "auto",
		backgroundColor: Colors.white,
		padding: 16,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: Colors.border,
	},
	description: {
		color: Colors.darkGray,
		fontSize: 12,
	},
});
