import React, { useEffect, useState } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Divider, ModalProps, Portal, RadioButton } from "react-native-paper";
import Colors from "../../constants/Colors";
import { Batch } from "../../types/Batch";
import { Button } from "../Button";
import { Heading } from "../Heading";
import { Span } from "../Span";
import { StorageService } from "../../database/StorageService";

interface ChooseBatchModalProps {
	visible: boolean;
	onDismiss: () => void;
	selectedIDs: string[];
	setIsBatchModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ChooseBatchModal: React.FC<
	ChooseBatchModalProps & Omit<ModalProps, "children">
> = ({ visible, onDismiss, selectedIDs, setIsBatchModalVisible, ...props }) => {
	const [selectedBatch, setSelectedBatch] = useState<Batch>();

	const [batches, setBatches] = useState<Batch[]>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await StorageService.listAllBatchesInfo();
			setBatches(response);
		};
		fetchData();
	}, []);

	const moveAllAnimalsTo = () => {
		const promises = selectedIDs.map((id: string) =>
			StorageService.updateAnimal({
				id,
				batchId: selectedBatch!.id,
			})
		);

		Promise.all(promises)
			.then(() => {
				setIsBatchModalVisible(() => false);
				Alert.alert(
					"Ok!",
					"Animais movidos para o lote " + selectedBatch!.name + "."
				);
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
						<TouchableWithoutFeedback style={styles.content}>
							<Heading>Selecione um lote de destino</Heading>
							<RadioButton.Group
								onValueChange={(id) =>
									setSelectedBatch(
										batches?.find((b) => b.id === id)
									)
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
												<Text
													style={styles.description}
												>
													{batch.description}
												</Text>
											</View>
											<RadioButton
												color={Colors.green}
												value={batch.id}
												status={
													selectedBatch?.id ===
													batch.id
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
const CustomDivider = () => (
	<Divider style={{ backgroundColor: Colors.border }} />
);

const styles = StyleSheet.create({
	content: {
		marginHorizontal: 16,
		marginVertical: "50%",
		backgroundColor: Colors.white,
		padding: 16,
		borderRadius: 4,
		borderWidth: 2,
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
