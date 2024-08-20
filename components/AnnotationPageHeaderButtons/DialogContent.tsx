import { Paragraph } from "components/Paragraph";

type DialogContentProps = {
    annotationTitle: string;
};

export const DialogContent = ({ annotationTitle }: DialogContentProps) => {
    return (
        <>
            <Paragraph>
                Tem certeza que deseja deletar a anotação "{annotationTitle}"?
            </Paragraph>
        </>
    );
};
