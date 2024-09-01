import { Storage } from "services/StorageService";
import { AnimalPreview, AnimalStatusOptions, OrderByOptions } from "types";
import { create } from "zustand";

interface AnimalFiltersState {
    searchText: string;
    orderBy: OrderByOptions;
    statusFilter: AnimalStatusOptions[];
    filterByBatchID?: number;
    filteredAnimals: AnimalPreview[];
    isLoading: boolean;
    showFilters: boolean;
    checkActiveFilters: () => boolean;
    setIsLoading: (value: boolean) => void;
    setSearchText: (text: string) => void;
    setOrderBy: (order: OrderByOptions) => void;
    setStatusFilter: (status: AnimalStatusOptions[]) => void;
    setFilterByBatchID: (batchID?: number) => void;
    toggleShowFilters: () => void;
    fetchFilteredAnimals: () => Promise<void>;
    handleClearAndHideFilters: () => void;
}

export const useAnimalFiltersStore = create<AnimalFiltersState>((set, get) => ({
    searchText: "",
    orderBy: "alfabetic",
    statusFilter: ["active"],
    filterByBatchID: undefined,
    filteredAnimals: [],
    isLoading: true,
    showFilters: false,

    setSearchText: text => {
        set(() => ({ searchText: text, isLoading: true }));
    },
    setIsLoading: value => {
        set(() => ({ isLoading: value }));
    },
    setOrderBy: order => {
        set(() => ({ orderBy: order, isLoading: true }));
    },
    setStatusFilter: status => set(() => ({ statusFilter: status })),
    setFilterByBatchID: batchID => {
        set(() => ({ filterByBatchID: batchID, isLoading: true }));
    },
    toggleShowFilters: () =>
        set(state => ({ showFilters: !state.showFilters })),

    fetchFilteredAnimals: async () => {
        const { orderBy, filterByBatchID, searchText, statusFilter } = get();

        const animals = await Storage.listAnimalPreview({
            orderBy,
            batchID: filterByBatchID,
            searchText,
            status: statusFilter,
        });

        set(() => ({ filteredAnimals: animals, isLoading: false }));
    },
    handleClearAndHideFilters: () => {
        set(() => ({
            statusFilter: ["active"],
            filterByBatchID: undefined,
            orderBy: "alfabetic",
            showFilters: false,
        }));
        get().fetchFilteredAnimals();
    },
    checkActiveFilters: () => {
        const { orderBy, filterByBatchID, statusFilter } = get();

        return Boolean(
            orderBy !== "alfabetic" ||
                filterByBatchID ||
                statusFilter.length !== 1 ||
                statusFilter.includes("active")
        );
    },
}));
