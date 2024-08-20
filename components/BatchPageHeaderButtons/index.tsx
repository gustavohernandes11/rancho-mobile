import { useRouter } from "expo-router";
import { useModal } from "hooks/useModal";
import { IconButton } from "react-native-paper";
import Theme from "styles/Theme";
import { Batch } from "types/Batch";
import { ConfirmDeleteBatchDialog } from "./ConfirmDeleteBatchDialog";

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
