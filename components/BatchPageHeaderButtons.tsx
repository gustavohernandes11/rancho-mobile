import { Button } from "components/Button";
import { CheckboxItem } from "components/CheckboxItem";
import { Dialog } from "components/Dialog";
import { useRouter } from "expo-router";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useModal } from "hooks/useModal";
import { useState } from "react";
import { IconButton, Paragraph } from "react-native-paper";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { Batch } from "types/Batch";

type ConfirmDeleteBatchDialogProps = {
    batch: Batch;
    isVisible: boolean;
    closeModal: () => void;
};

const ConfirmDeleteBatchDialog = ({
    batch,
    isVisible,
    closeModal,
}: ConfirmDeleteBatchDialogProps) => {
    const { refreshAll } = useGlobalStore();
    const [shouldDeleteAnimals, setShouldDeleteAnimals] = useState(false);
    const router = useRouter();

    const handleCheck = () => setShouldDeleteAnimals(prev => !prev);

    const handleConfirmDelete = () => {
        const onSucess = () => {
            refreshAll();
            router.back();
        };
        if (batch) {
            if (shouldDeleteAnimals) {
                Storage.deleteBatchWithAnimals(batch.id).then(onSucess);
            } else {
                Storage.deleteBatch(batch.id).then(onSucess);
            }
        }
    };

    return (
        <Dialog
            title="Deletar lote?"
            visible={isVisible}
            content={
                <>
                    <Paragraph>
                        Tem certeza que deseja deletar o lote "{batch.name}"?
                    </Paragraph>
                    <CheckboxItem
                        isChecked={
                            shouldDeleteAnimals ? "checked" : "unchecked"
                        }
                        onPress={handleCheck}
                        label="Deletar animais vinculados."
                    />
                </>
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
                        onPress={handleConfirmDelete}
                    />
                </>
            }
            onDismiss={closeModal}
        />
    );
};

export const BatchPageHeaderButtons = ({ batch }: { batch: Batch }) => {
    const router = useRouter();
    const { openModal, closeModal, isVisible } = useModal();

    const handleEdit = () => router.push(`/(screens)/batches/edit/${batch.id}`);
    const handleDelete = () => openModal();
    const handleRegisterAnimal = () =>
        router.push(`/(screens)/batches/register-animal-to-batch/${batch.id}`);

    return (
        <>
            <IconButton
                icon="pencil"
                iconColor={Theme.colors.white}
                onPress={handleEdit}
            />
            <IconButton
                icon="delete"
                iconColor={Theme.colors.white}
                onPress={handleDelete}
            />
            <IconButton
                icon={require("../assets/images/AddCowIcon.png")}
                iconColor={Theme.colors.white}
                onPress={handleRegisterAnimal}
            />
            <ConfirmDeleteBatchDialog
                batch={batch!}
                closeModal={closeModal}
                isVisible={isVisible}
            />
        </>
    );
};
