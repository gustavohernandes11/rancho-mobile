import { Dialog } from "components/Dialog";
import { useGlobalStore } from "hooks/useGlobalStore";
import { Animal } from "types/Animal";
import { DialogButtons } from "./DialogButtons";
import { DialogContent } from "./DialogContent";

type ConfirmDeleteAnimalDialogProps = {
    animal: Animal;
    isVisible: boolean;
    closeModal: () => void;
};

export const ConfirmDeleteAnimalDialog = ({
    animal,
    isVisible,
    closeModal,
}: ConfirmDeleteAnimalDialogProps) => {
    const refreshAll = useGlobalStore(store => store.refreshAll);

    return (
        <Dialog
            title="Deletar animal?"
            visible={isVisible}
            content={<DialogContent animalName={animal && animal.name} />}
            buttons={
                <DialogButtons
                    animal={animal}
                    closeModal={closeModal}
                    refreshAll={refreshAll}
                />
            }
            onDismiss={closeModal}
        />
    );
};
