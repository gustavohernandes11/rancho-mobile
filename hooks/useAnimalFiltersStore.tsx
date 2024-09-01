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
    hasFilters: boolean;
    setIsLoading: (value: boolean) => void;
    updateHasFilters: () => void;
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
    hasFilters: false, // Initialize hasFilters

    setSearchText: text => {
        set(() => ({ searchText: text, isLoading: true }));
        get().updateHasFilters();
    },
    setIsLoading: value => {
        set(() => ({ isLoading: value }));
    },
    setOrderBy: order => {
        set(() => ({ orderBy: order, isLoading: true }));
        get().updateHasFilters();
    },
    setStatusFilter: status => {
        set(() => ({ statusFilter: status }));
        get().updateHasFilters();
    },
    setFilterByBatchID: batchID => {
        set(() => ({ filterByBatchID: batchID, isLoading: true }));
        get().updateHasFilters();
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
        get().updateHasFilters();
    },
    updateHasFilters: () => {
        const { orderBy, filterByBatchID, statusFilter } = get();

        const hasFilters = Boolean(
            orderBy !== "alfabetic" ||
                filterByBatchID ||
                !(statusFilter.length === 1 && statusFilter.includes("active"))
        );

        set(() => ({ hasFilters }));
    },
}));
