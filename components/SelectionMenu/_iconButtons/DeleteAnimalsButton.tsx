import { Button } from "components/Button";
import { Dialog } from "components/Dialog";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useModal } from "hooks/useModal";
import React from "react";
import { IconButton, Paragraph } from "react-native-paper";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";

type DeleteAnimalsButtonProps = {
    onSuccess: (message: string) => void;
};

export const DeleteAnimalsButton = ({
    onSuccess,
}: DeleteAnimalsButtonProps) => {
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);
    const { closeModal, isVisible, openModal } = useModal();

    const handleDeleteMany = () => {
        Storage.deleteAnimal(selectedIDs).then(() =>
            onSuccess("Animais removidos com sucesso.")
        );
    };

    return (
        <>
            <IconButton
                iconColor={Theme.colors.white}
                icon="delete"
                onPress={openModal}
                style={{ margin: 0 }}
                size={24}
            />

            <Dialog
                title="Deletar Animais?"
                visible={isVisible}
                content={
                    <Paragraph>
                        Tem certeza que deseja deletar os animais selecionados?
                    </Paragraph>
                }
                buttons={
                    <>
                        <Button
                            title="Cancelar"
                            type="light-danger"
                            onPress={closeModal}
                        />
                        <Button
                            title="Confirmar"
                            type="danger"
                            onPress={() => {
                                handleDeleteMany();
                                closeModal();
                            }}
                        />
                    </>
                }
                onDismiss={closeModal}
            />
        </>
    );
};
