import { Button } from "components/Button";
import { useRouter } from "expo-router";
import { Storage } from "services/StorageService";

type DialogButtonsProps = {
    annotationId: number;
    closeModal: () => void;
};

export const DialogButtons = ({
    annotationId,
    closeModal,
}: DialogButtonsProps) => {
    const router = useRouter();

    return (
        <>
            <Button title="Cancelar" type="light-danger" onPress={closeModal} />
            <Button
                title="Confirmar"
                type="danger"
                onPress={() => {
                    Storage.deleteAnnotation(annotationId).then(() => {
                        closeModal();
                        router.back();
                    });
                }}
            />
        </>
    );
};
