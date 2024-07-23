import { Button } from "components/Button";
import { CheckboxItem } from "components/CheckboxItem";
import { Dialog } from "components/Dialog";
import { Input } from "components/Input";
import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useModal } from "hooks/useModal";
import React, { useState } from "react";
import { Menu } from "react-native-paper";
import { Storage } from "services/StorageService";
import { commonStyles } from "styles/Common";
import { showToast } from "utils/showToast";

type ConfirmWriteOffByDeathDialogProps = {
    selectedIDs: number[];
    isVisible: boolean;
    closeModal: () => void;
    onSuccess: () => void;
};

const ConfirmWriteOffByDeathDialog = ({
    selectedIDs,
    isVisible,
    closeModal,
    onSuccess,
}: ConfirmWriteOffByDeathDialogProps) => {
    const [shouldAnnotate, setShouldAnnotate] = useState(false);
    const [annotationReason, setAnnotationReason] = useState("");

    const handleCheck = () => setShouldAnnotate(prev => !prev);

    const handleConfirmWriteOff = () => {
        if (shouldAnnotate && !annotationReason) {
            showToast("Digite o motivo para salvar uma anotação.");
        } else {
            Storage.writeOffByDeath(
                selectedIDs,
                shouldAnnotate,
                annotationReason
            ).then(() => {
                onSuccess();
                closeModal();
            });
        }
    };

    return (
        <Dialog
            title="Dar baixa por morte?"
            visible={isVisible}
            content={
                <>
                    <Paragraph>
                        Os animais serão marcados como "mortos", mas não serão
                        deletados.
                    </Paragraph>
                    <CheckboxItem
                        isChecked={shouldAnnotate ? "checked" : "unchecked"}
                        onPress={handleCheck}
                        label="Adicionar anotação."
                    />
                    {shouldAnnotate && (
                        <Span>
                            <Input
                                label="Motivo da morte"
                                onChangeText={setAnnotationReason}
                                value={annotationReason}
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

type WriteOffByDeathButtonProps = {
    onSuccess: (message: string) => void;
};

export const WriteOffByDeathButton = ({
    onSuccess,
}: WriteOffByDeathButtonProps) => {
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);
    const { isVisible, closeModal, openModal } = useModal();

    return (
        <>
            <Menu.Item
                titleStyle={commonStyles.text}
                onPress={openModal}
                title="Dar baixa de morte"
                leadingIcon="coffin"
            />
            <ConfirmWriteOffByDeathDialog
                selectedIDs={selectedIDs}
                isVisible={isVisible}
                closeModal={closeModal}
                onSuccess={() => onSuccess("Animais atualizados.")}
            />
        </>
    );
};
