import { Button } from "components/Button";
import { CheckboxItem } from "components/CheckboxItem";
import { Dialog } from "components/Dialog";
import { Input } from "components/Input";
import { Span } from "components/Span";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useModal } from "hooks/useModal";
import React, { useState } from "react";
import { Menu, Paragraph } from "react-native-paper";
import { Storage } from "services/StorageService";
import { commonStyles } from "styles/Common";
import { showToast } from "utils/showToast";

type ConfirmWriteOffBySaleDialogProps = {
    selectedIDs: number[];
    isVisible: boolean;
    closeModal: () => void;
    onSuccess: () => void;
};

const ConfirmWriteOffBySaleDialog = ({
    selectedIDs,
    isVisible,
    closeModal,
    onSuccess,
}: ConfirmWriteOffBySaleDialogProps) => {
    const [shouldAnnotate, setShouldAnnotate] = useState(false);
    const [description, setDescription] = useState("");

    const handleCheck = () => setShouldAnnotate(prev => !prev);

    const handleConfirmWriteOff = () => {
        if (shouldAnnotate && !description) {
            showToast("Digite a descrição para salvar uma anotação.");
        } else {
            Storage.writeOffBySale(selectedIDs, shouldAnnotate, description)
                .then(() => {
                    onSuccess();
                    closeModal();
                })
                .catch(() => {
                    showToast("Ocorreu um erro ao dar baixa. Tente novamente.");
                });
        }
    };

    return (
        <Dialog
            title="Dar baixa por venda?"
            visible={isVisible}
            content={
                <>
                    <Paragraph>
                        Os animais serão marcados como vendidos, mas não serão
                        deletados.
                    </Paragraph>
                    <CheckboxItem
                        isChecked={shouldAnnotate ? "checked" : "unchecked"}
                        onPress={handleCheck}
                        label="Adicionar anotação"
                    />
                    {shouldAnnotate && (
                        <Span>
                            <Input
                                label="Descrição da venda"
                                onChangeText={setDescription}
                                value={description}
                            />
                        </Span>
                    )}
                </>
            }
            buttons={
                <>
                    <Button
                        title="Cancelar"
                        type="secondary"
                        onPress={closeModal}
                    />
                    <Button title="Dar baixa" onPress={handleConfirmWriteOff} />
                </>
            }
            onDismiss={closeModal}
        />
    );
};

type WriteOffBySaleButtonProps = {
    onSuccess: (message: string) => void;
};

export const WriteOffBySaleButton = ({
    onSuccess,
}: WriteOffBySaleButtonProps) => {
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);
    const { isVisible, closeModal, openModal } = useModal();

    const handleWriteOffBySale = () => {
        openModal();
    };

    return (
        <>
            <Menu.Item
                titleStyle={commonStyles.text}
                onPress={handleWriteOffBySale}
                title="Dar baixa de venda"
                leadingIcon="truck-delivery"
            />
            <ConfirmWriteOffBySaleDialog
                selectedIDs={selectedIDs}
                isVisible={isVisible}
                closeModal={closeModal}
                onSuccess={() => onSuccess("Animais atualizados.")}
            />
        </>
    );
};
