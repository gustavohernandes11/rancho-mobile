import { BannerRadio } from "components/BannerRadio";
import { Button } from "components/Button";
import { Heading } from "components/Heading";
import { Span } from "components/Span";
import { useGlobalState } from "hooks/useGlobalState";
import React, { useState } from "react";
import {
	Alert,
	AlertButton,
	Modal,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { ModalProps, Portal, RadioButton } from "react-native-paper";
import { Storage } from "services/StorageService";
import Colors from "styles/Colors";
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
	<BannerRadio
		iconSource={0}
		iconAlt={"null batch"}
		title={"Nenhum"}
		description="Desvincular de qualquer lote"
		value={null as any}
		isChecked={checked}
	/>
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
	const { batches, refreshAll } = useGlobalState();

	const handleMoveAnimals = () => {
		const isDestinationNull = selectedBatch?.id === null;
		Storage.moveAnimalToBatch(selectedIDs, selectedBatch?.id || null)
			.then(() =>
				onSuccess(
					isDestinationNull
						? `Animais desvinculados de qualquer lote.`
						: `Animais movidos para o lote ${selectedBatch!.name}.`
				)
			)
			.catch(onFail);
	};

	const onSuccess = (message: string) => {
		setIsBatchModalVisible(false);
		showToast(message);
		onClearSelection();
		refreshAll();
	};

	const onFail = (error: AlertButton[]) => {
		Alert.alert("Oops!", "Houve um erro ao mover os animais.", error);
	};

	const onValueChange = (id: string) => {
		if (id === null) {
			setSelectedBatch({
				id: null as unknown as number,
				name: "None",
				count: 0,
			});
		} else {
			setSelectedBatch(batches?.find((b) => b.id === Number(id)));
		}
	};

	const getValue =
		selectedBatch?.id === null
			? (null as any)
			: selectedBatch?.id.toString();

	return (
		<Portal>
			<Modal
				visible={visible}
				onRequestClose={onDismiss}
				dismissable={true}
				transparent={true}
				onDismiss={onDismiss}
				style={styles.blur}
				{...props}
			>
				<TouchableOpacity style={styles.blur} onPress={onDismiss}>
					<View style={styles.modal}>
						<>
							<Span>
								<Heading>Selecione um lote de destino</Heading>
							</Span>
							<RadioButton.Group
								onValueChange={onValueChange}
								value={getValue}
							>
								<ScrollView style={{ height: "75%" }}>
									<Span direction="column">
										{batches?.map((batch) => (
											<BannerRadio
												key={batch.id}
												title={batch.name}
												description={batch.description}
												iconAlt="batch icon"
												iconSource={require("../../assets/images/RoundedBatchIcon.png")}
												value={batch.id.toString()}
												isChecked={
													selectedBatch?.id ===
													batch.id
												}
											/>
										))}
									</Span>

									<EmptyBatchOption
										key={0}
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
									onPress={handleMoveAnimals}
								/>
							</Span>
						</>
					</View>
				</TouchableOpacity>
			</Modal>
		</Portal>
	);
};

const styles = StyleSheet.create({
	modal: {
		marginHorizontal: 16,
		marginVertical: "10%",
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
