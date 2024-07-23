import { Button } from "components/Button";
import { Dialog } from "components/Dialog";
import { useRouter } from "expo-router";
import { useModal } from "hooks/useModal";
import { IconButton, Paragraph } from "react-native-paper";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { Annotation } from "types/Annotation";

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

type ConfirmDeleteAnnotationDialogProps = {
    annotation: Annotation;
    isVisible: boolean;
    closeModal: () => void;
};

const ConfirmDeleteAnnotationDialog = ({
    annotation,
    isVisible,
    closeModal,
}: ConfirmDeleteAnnotationDialogProps) => {
    const router = useRouter();

    return (
        <Dialog
            title="Deletar anotação?"
            visible={isVisible}
            content={
                <>
                    <Paragraph>
                        Tem certeza que deseja deletar a anotação "
                        {annotation.title}"?
                    </Paragraph>
                </>
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
                            Storage.deleteAnnotation(annotation.id).then(() => {
                                closeModal();
                                router.back();
                            });
                        }}
                    />
                </>
            }
            onDismiss={closeModal}
        />
    );
};
