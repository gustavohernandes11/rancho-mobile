import { useAnimalFiltersStore } from "hooks/useAnimalFiltersStore";
import { useGlobalStore } from "hooks/useGlobalStore";
import React from "react";
import { AnimalStatusOptions } from "types/Animal";
import { Span } from "../Span";
import { BatchSelect } from "./BatchSelect";
import { SortBySelect } from "./SortBySelect";
import { StatusFilterSegmented } from "./StatusFilterSegmented";

export const AnimalFilters = () => {
    const batches = useGlobalStore(store => store.batches);
    const orderBy = useAnimalFiltersStore(store => store.orderBy);
    const setOrderBy = useAnimalFiltersStore(store => store.setOrderBy);
    const filterByBatchID = useAnimalFiltersStore(
        store => store.filterByBatchID
    );
    const setFilterByBatchID = useAnimalFiltersStore(
        store => store.setFilterByBatchID
    );
    const statusFilter = useAnimalFiltersStore(store => store.statusFilter);
    const setStatusFilter = useAnimalFiltersStore(
        store => store.setStatusFilter
    );

    return (
        <Span flexWrap="wrap" marginY={8}>
            <Span>
                <BatchSelect
                    availableBatches={batches}
                    selectedBatchId={filterByBatchID}
                    onSelectBatch={batchItem =>
                        setFilterByBatchID(batchItem.value)
                    }
                />
                <SortBySelect
                    orderBy={orderBy}
                    onSelectOrdering={option => setOrderBy(option.value)}
                />
            </Span>
            <Span marginY={0}>
                <StatusFilterSegmented
                    onCheckStatus={(options: AnimalStatusOptions[]) =>
                        setStatusFilter(options)
                    }
                    statusFilterCheckedOptions={statusFilter}
                />
            </Span>
        </Span>
    );
};
