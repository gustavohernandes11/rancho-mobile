import { Button } from "components/Button";
import { useRouter } from "expo-router";
import { Storage } from "services/StorageService";
import { Animal } from "types/Animal";

type DialogButtonsProps = {
    animal: Animal;
    closeModal: () => void;
    refreshAll: any;
};

export const DialogButtons = ({
    animal,
    closeModal,
    refreshAll,
}: DialogButtonsProps) => {
    const router = useRouter();

    return (
        <>
            <Button title="Cancelar" type="light-danger" onPress={closeModal} />
            <Button
                title="Confirmar"
                type="danger"
                onPress={() => {
                    if (animal) {
                        Storage.deleteAnimal(animal.id).then(() => {
                            refreshAll();
                            router.back();
                        });
                    }
                }}
            />
        </>
    );
};
