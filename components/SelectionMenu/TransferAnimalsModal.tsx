import { BannerRadio } from "components/BannerRadio";
import { Button } from "components/Button";
import { Heading } from "components/Heading";
import { Span } from "components/Span";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useGlobalStore } from "hooks/useGlobalStore";
import React, { useState } from "react";
import {
    Alert,
    AlertButton,
    Modal,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { ModalProps, Portal, RadioButton } from "react-native-paper";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { Batch } from "types";
import { showToast } from "utils/showToast";

interface TransferAnimalsModalProps {
    visible: boolean;
    onDismiss: () => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmptyBatchOption = ({ checked }: { checked: boolean }) => (
    <BannerRadio
        iconSource={require("../../assets/images/NoBatchIcon.png")}
        iconAlt={"null batch"}
        title={"Nenhum"}
        description="Desvincular de qualquer lote"
        value={null as any}
        isChecked={checked}
    />
);

export const TransferAnimalsModal: React.FC<
    TransferAnimalsModalProps & Omit<ModalProps, "children">
> = ({ visible, onDismiss, setIsModalOpen, ...props }) => {
    const [selectedBatch, setSelectedBatch] = useState<Batch | null>();
    const batches = useGlobalStore(state => state.batches);
    const refreshAll = useGlobalStore(state => state.refreshAll);
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);
    const clearSelection = useAnimalSelectionStore(
        state => state.clearSelection
    );

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
            .catch(onError);
    };

    const onSuccess = (message: string) => {
        setIsModalOpen(false);
        showToast(message);
        clearSelection();
        refreshAll();
    };

    const onError = (error: AlertButton[]) => {
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
            setSelectedBatch(batches?.find(b => b.id === Number(id)));
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
                <View style={styles.blur}>
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
                                    <Span direction="column" gap={4}>
                                        {batches?.map(batch => (
                                            <BannerRadio
                                                key={batch.id}
                                                title={batch.name}
                                                description={batch.description}
                                                iconAlt="batch icon"
                                                iconSource={require("../../assets/images/BatchCircleIcon.png")}
                                                value={batch.id.toString()}
                                                isChecked={
                                                    selectedBatch?.id ===
                                                    batch.id
                                                }
                                            />
                                        ))}
                                        <EmptyBatchOption
                                            key={0}
                                            checked={selectedBatch?.id === null}
                                        />
                                    </Span>
                                </ScrollView>
                            </RadioButton.Group>

                            <Span justify="flex-end" py={8} flexWrap="nowrap">
                                <Button
                                    type="light"
                                    title="Cancelar"
                                    onPress={() => setIsModalOpen(false)}
                                />
                                <Button
                                    title="Mover"
                                    disabled={!selectedBatch}
                                    onPress={handleMoveAnimals}
                                />
                            </Span>
                        </>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 16,
        marginVertical: "10%",
        backgroundColor: Theme.colors.white,
        paddingHorizontal: 16,
        paddingTop: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Theme.colors.mediumGray,
        zIndex: 5,
    },
    description: {
        color: Theme.colors.darkGray,
        fontSize: 12,
    },
    blur: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
    },
});
