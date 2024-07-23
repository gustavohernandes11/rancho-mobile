import { BannerRadio } from "components/BannerRadio";
import { Button } from "components/Button";
import { Dialog } from "components/Dialog";
import { Span } from "components/Span";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useGlobalStore } from "hooks/useGlobalStore";
import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { Storage } from "services/StorageService";
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

export const TransferAnimalsModal: React.FC<TransferAnimalsModalProps> = ({
    visible,
    onDismiss,
    setIsModalOpen,
}) => {
    const [selectedBatch, setSelectedBatch] = useState<Batch | null>();
    const batches = useGlobalStore(state => state.batches);
    const refreshAll = useGlobalStore(state => state.refreshAll);
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);
    const clearSelection = useAnimalSelectionStore(
        state => state.clearSelection
    );

    const handleMoveAnimals = () => {
        if (selectedBatch?.id === undefined)
            return showToast("Escolha um lote");
        const isDestinationNull = selectedBatch?.id === null;
        Storage.moveAnimalToBatch(selectedIDs, selectedBatch?.id || null)
            .then(() =>
                onSuccess(
                    isDestinationNull
                        ? `Animais desvinculados de qualquer lote`
                        : `Animais movidos para o lote ${selectedBatch!.name}`
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

    const onError = (error: any) => {
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
        <Dialog
            title="Selecione um lote de destino"
            visible={visible}
            onDismiss={onDismiss}
            scrollableContent={
                <RadioButton.Group
                    onValueChange={onValueChange}
                    value={getValue}
                >
                    <Span direction="column" gap={4}>
                        {batches?.map(batch => (
                            <BannerRadio
                                key={batch.id}
                                title={batch.name}
                                description={batch.description}
                                iconAlt="batch icon"
                                iconSource={require("../../assets/images/BatchCircleIcon.png")}
                                value={batch.id.toString()}
                                isChecked={selectedBatch?.id === batch.id}
                            />
                        ))}

                        <EmptyBatchOption
                            key={0}
                            checked={selectedBatch?.id === null}
                        />
                    </Span>
                </RadioButton.Group>
            }
            buttons={
                <>
                    <Button
                        type="light"
                        title="Cancelar"
                        onPress={() => setIsModalOpen(false)}
                    />
                    <Button title="Mover" onPress={handleMoveAnimals} />
                </>
            }
        />
    );
};

const styles = StyleSheet.create({
    scrollView: {
        height: "75%",
    },
});
