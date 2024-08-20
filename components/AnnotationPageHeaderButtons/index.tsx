import { useRouter } from "expo-router";
import { useModal } from "hooks/useModal";
import { IconButton } from "react-native-paper";
import Theme from "styles/Theme";
import { Annotation } from "types/Annotation";
import { ConfirmDeleteAnnotationDialog } from "./ConfirmDeleteAnnotationDialog";

export const AnnotationPageHeaderButtons = ({
    annotation,
}: {
    annotation: Annotation;
}) => {
    const router = useRouter();
    const { openModal, closeModal, isVisible } = useModal();

    const handleDelete = () => {
        openModal();
    };

    const handleEdit = () => {
        if (annotation) {
            router.push(`/(screens)/annotations/edit/${annotation.id}`);
        }
    };

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
            <ConfirmDeleteAnnotationDialog
                annotation={annotation}
                closeModal={closeModal}
                isVisible={isVisible}
            />
        </>
    );
};
