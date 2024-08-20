import React from "react";
import { AnimalStatusOptions } from "types/Animal";
import { Batch } from "types/Batch";
import { OrderByOptions } from "types/StorageServicesMethods";
import { Span } from "../Span";
import { BatchSelect } from "./BatchSelect";
import { SortBySelect } from "./SortBySelect";
import { StatusFilterSegmented } from "./StatusFilterSegmented";

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
    return (
        <Span flexWrap="wrap" marginY={8}>
            <Span>
                <BatchSelect
                    availableBatches={availableBatches}
                    selectedBatchId={selectedBatchId}
                    onSelectBatch={onSelectBatch}
                />
                <SortBySelect
                    orderBy={orderBy}
                    onSelectOrdering={onSelectOrdering}
                />
            </Span>
            <Span marginY={0}>
                <StatusFilterSegmented
                    onCheckStatus={onCheckStatus}
                    statusFilterCheckedOptions={statusFilterCheckedOptions}
                />
            </Span>
        </Span>
    );
};
