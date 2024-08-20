import { CheckboxItem } from "components/CheckboxItem";
import { Paragraph } from "components/Paragraph";
import { Batch } from "types/Batch";

type DialogContentProps = {
    batch: Batch;
    handleCheck: () => void;
    shouldDeleteAnimals: boolean;
};

export const DialogContent = ({
    batch,
    handleCheck,
    shouldDeleteAnimals,
}: DialogContentProps) => (
    <>
        <Paragraph>
            Tem certeza que deseja deletar o lote "{batch.name}"?
        </Paragraph>
        <CheckboxItem
            isChecked={shouldDeleteAnimals ? "checked" : "unchecked"}
            onPress={handleCheck}
            label="Deletar animais vinculados."
        />
    </>
);
