import { Button } from "components/Button";
import { useRouter } from "expo-router";
import { useGlobalStore } from "hooks/useGlobalStore";
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
    const refreshAll = useGlobalStore(store => store.refreshAll);

    return (
        <>
            <Button title="Cancelar" type="light-danger" onPress={closeModal} />
            <Button
                title="Confirmar"
                type="danger"
                onPress={() => {
                    Storage.deleteAnnotation(annotationId).then(() => {
                        closeModal();
                        refreshAll();
                        router.back();
                    });
                }}
            />
        </>
    );
};
