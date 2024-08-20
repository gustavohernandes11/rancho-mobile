import { Dialog } from "components/Dialog";
import { Annotation } from "types/Annotation";
import { DialogButtons } from "./DialogButtons";
import { DialogContent } from "./DialogContent";

type ConfirmDeleteAnnotationDialogProps = {
    annotation: Annotation;
    isVisible: boolean;
    closeModal: () => void;
};

export const ConfirmDeleteAnnotationDialog = ({
    annotation,
    isVisible,
    closeModal,
}: ConfirmDeleteAnnotationDialogProps) => {
    return (
        <Dialog
            title="Deletar anotação?"
            visible={isVisible}
            content={<DialogContent annotationTitle={annotation.title} />}
            buttons={
                <DialogButtons
                    annotationId={annotation.id}
                    closeModal={closeModal}
                />
            }
            onDismiss={closeModal}
        />
    );
};
