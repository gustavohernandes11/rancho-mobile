import { SegmentedButtonsInput } from "components/SegmentedButtonsInput";
import { AnimalStatusOptions } from "types/Animal";

type StatusFilterSegmentedProps = {
    onCheckStatus: (option: any) => void;
    statusFilterCheckedOptions: AnimalStatusOptions[];
};

export const StatusFilterSegmented = ({
    onCheckStatus,
    statusFilterCheckedOptions,
}: StatusFilterSegmentedProps) => {
    return (
        <SegmentedButtonsInput
            label="Incluir animais em estão"
            options={[
                { label: "Ativos", value: "active" },
                { label: "Mortos", value: "dead" },
                { label: "Vendidos", value: "sold" },
            ]}
            selectedValues={statusFilterCheckedOptions}
            onValueChange={onCheckStatus}
        />
    );
};
