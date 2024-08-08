import React from "react";
import { AnimalStatusOptions } from "types/Animal";
import { Batch } from "types/Batch";
import { OrderByOptions } from "types/StorageServicesMethods";
import { serializeBatches } from "utils/serializers";
import SegmentedButtonsInput from "./SegmentedButtonsInput";
import { Select } from "./Select";
import { Span } from "./Span";

interface AnimalFiltersType {
    statusFilterCheckedOptions: AnimalStatusOptions[];
    onSelectBatch: (option: any) => void;
    onSelectOrdering: (option: any) => void;
    onCheckStatus: (option: any) => void;
    availableBatches: Batch[];
    orderBy: OrderByOptions;
    selectedBatchId?: number;
}

export const AnimalFilters = ({
    availableBatches,
    orderBy,
    selectedBatchId,
    statusFilterCheckedOptions,
    onSelectBatch,
    onSelectOrdering,
    onCheckStatus,
}: AnimalFiltersType) => {
    const getDefaultOrderText = () =>
        orderBy === "alfabetic" ? "Alfabética" : "Idade";

    const getDefaultBatchText = () =>
        selectedBatchId
            ? availableBatches.find(b => b.id === selectedBatchId)?.name || ""
            : "Todos";

    return (
        <Span flexWrap="wrap" marginY={8}>
            <Span>
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
                <Select
                    label="Ordenar"
                    items={[
                        {
                            key: "Alfabética",
                            value: "alfabetic",
                        },
                        {
                            key: "Idade",
                            value: "age",
                        },
                    ]}
                    defaultValue="alfabetic"
                    defaultButtonText={getDefaultOrderText()}
                    onSelect={onSelectOrdering}
                    size="small"
                    search={false}
                />
            </Span>
            <Span marginY={0}>
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
            </Span>
        </Span>
    );
};
