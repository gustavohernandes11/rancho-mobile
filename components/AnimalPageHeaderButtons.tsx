import { Button } from "components/Button";
import { Dialog } from "components/Dialog";
import { useRouter } from "expo-router";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useModal } from "hooks/useModal";
import { IconButton, Paragraph } from "react-native-paper";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { Animal } from "types/Animal";

type ConfirmDeleteAnimalDialogProps = {
    animal: Animal;
    isVisible: boolean;
    closeModal: () => void;
};

const ConfirmDeleteAnimalDialog = ({
    animal,
    isVisible,
    closeModal,
}: ConfirmDeleteAnimalDialogProps) => {
    const { refreshAll } = useGlobalStore();
    const router = useRouter();

    return (
        <Dialog
            title="Deletar animal?"
            visible={isVisible}
            content={
                <Paragraph>
                    Você têm certeza que deseja deletar o animal "{animal?.name}
                    "
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
                            if (animal) {
                                Storage.deleteAnimal(animal.id).then(() => {
                                    refreshAll();
                                    router.back();
                                });
                            }
                        }}
                    />
                </>
            }
            onDismiss={closeModal}
        />
    );
};

export const AnimalPageHeaderButtons = ({ animal }: { animal: Animal }) => {
    const router = useRouter();
    const { openModal, closeModal, isVisible } = useModal();

    const handleEdit = () =>
        router.push(`/(screens)/animals/edit/${animal.id}`);
    const handleDelete = () => openModal();

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
            <ConfirmDeleteAnimalDialog
                animal={animal!}
                closeModal={closeModal}
                isVisible={isVisible}
            />
        </>
    );
};
