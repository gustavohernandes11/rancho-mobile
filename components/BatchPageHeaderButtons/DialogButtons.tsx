import { Button } from "components/Button";

type DialogButtonsProps = {
    closeModal: () => void;
    handleConfirmDelete: () => void;
};

export const DialogButtons = ({
    closeModal,
    handleConfirmDelete,
}: DialogButtonsProps) => (
    <>
        <Button title="Cancelar" type="light-danger" onPress={closeModal} />
        <Button title="Confirmar" type="danger" onPress={handleConfirmDelete} />
    </>
);
