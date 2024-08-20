import { Select } from "components/Select";
import { Batch } from "types/Batch";
import { serializeBatches } from "utils/serializers";

type BatchSelectProps = {
    availableBatches: Batch[];
    selectedBatchId?: number;
    onSelectBatch: (option: any) => void;
};

export const BatchSelect = ({
    availableBatches,
    selectedBatchId,
    onSelectBatch,
}: BatchSelectProps) => {
    const getDefaultBatchText = () =>
        selectedBatchId
            ? availableBatches.find(b => b.id === selectedBatchId)?.name || ""
            : "Todos";

    return (
        <Select
            label="Lote"
            items={[
                {
                    key: "Todos",
                    value: undefined as unknown as string,
                },
                ...serializeBatches(availableBatches),
            ]}
            defaultValue="Todos"
            defaultButtonText={getDefaultBatchText()}
            onSelect={onSelectBatch}
            size="small"
            search={false}
        />
    );
};
