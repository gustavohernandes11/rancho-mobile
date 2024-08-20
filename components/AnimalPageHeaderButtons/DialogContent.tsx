import { Paragraph } from "components/Paragraph";

type DialogContentProps = {
    animalName: string;
};

export const DialogContent = ({ animalName }: DialogContentProps) => (
    <Paragraph>
        Você têm certeza que deseja deletar o animal "{animalName}"
    </Paragraph>
);
