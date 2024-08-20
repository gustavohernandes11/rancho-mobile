import { Dialog } from "components/Dialog";
import { useRouter } from "expo-router";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useState } from "react";
import { Storage } from "services/StorageService";
import { Batch } from "types/Batch";
import { DialogButtons } from "./DialogButtons";
import { DialogContent } from "./DialogContent";

type ConfirmDeleteBatchDialogProps = {
    batch: Batch;
    isVisible: boolean;
    closeModal: () => void;
    goBack?: boolean;
};

export const ConfirmDeleteBatchDialog = ({
    batch,
    isVisible,
    closeModal,
    goBack = true,
}: ConfirmDeleteBatchDialogProps) => {
    const { refreshAll } = useGlobalStore();
    const [shouldDeleteAnimals, setShouldDeleteAnimals] = useState(false);
    const router = useRouter();

    const handleCheck = () => setShouldDeleteAnimals(prev => !prev);

    const handleConfirmDelete = () => {
        const onSucess = () => {
            refreshAll();
            goBack && router.back();
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
                <DialogContent
                    batch={batch}
                    handleCheck={handleCheck}
                    shouldDeleteAnimals={shouldDeleteAnimals}
                />
            }
            buttons={
                <DialogButtons
                    closeModal={closeModal}
                    handleConfirmDelete={handleConfirmDelete}
                />
            }
            onDismiss={closeModal}
        />
    );
};
