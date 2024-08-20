import { useRouter } from "expo-router";
import { useModal } from "hooks/useModal";
import { IconButton } from "react-native-paper";
import Theme from "styles/Theme";
import { Animal } from "types/Animal";
import { ConfirmDeleteAnimalDialog } from "./ConfirmDeleteAnimalDialog";

export const AnimalPageHeaderButtons = ({ animal }: { animal: Animal }) => {
    const router = useRouter();
    const { openModal, closeModal, isVisible } = useModal();

    const handleEdit = () =>
        router.push(`/(screens)/animals/edit/${animal.id}`);
    const handleCreateNewAnnotation = () =>
        router.push(
            `/(screens)/annotations/add-with-selected-animals/${JSON.stringify([
                animal.id,
            ])}`
        );
    const handleDelete = () => openModal();

    return (
        <>
            <IconButton
                icon="bookmark-plus"
                iconColor={Theme.colors.white}
                onPress={handleCreateNewAnnotation}
            />
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
