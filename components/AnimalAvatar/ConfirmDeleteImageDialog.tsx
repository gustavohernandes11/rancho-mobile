import { Button } from "components/Button";
import { Dialog } from "components/Dialog";
import { Paragraph } from "components/Paragraph";

type ConfirmDeleteImageDialogProps = {
    isVisible: boolean;
    closeModal: () => void;
    handleDeleteImage: () => void;
};

export const ConfirmDeleteImageDialog = ({
    isVisible,
    closeModal,
    handleDeleteImage,
}: ConfirmDeleteImageDialogProps) => {
    return (
        <Dialog
            title="Confirmação"
            content={<Paragraph>Deletar a imagem desse animal?</Paragraph>}
            visible={isVisible}
            buttons={
                <>
                    <Button
                        title="Cancelar"
                        type="light-danger"
                        onPress={closeModal}
                    />
                    <Button
                        title="Deletar"
                        type="danger"
                        onPress={handleDeleteImage}
                    />
                </>
            }
            onDismiss={closeModal}
        />
    );
};
