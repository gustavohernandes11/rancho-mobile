import { Storage } from "services/StorageService";
import { AnimalPreview, Batch } from "types";
import { create } from "zustand";

interface GlobalState {
    animals: AnimalPreview[];
    refreshAnimals: () => void;
    refreshBatches: () => void;
    refreshAll: () => void;
    batches: Batch[];
}

export const useGlobalStore = create<GlobalState>()((set, get) => ({
    animals: [],
    batches: [],
    refreshBatches: async () => {
        Storage.listBatches().then(batches => set(() => ({ batches })));
    },
    refreshAnimals: async () => {
        Storage.listAnimalPreview({}).then(animals => set(() => ({ animals })));
    },
    refreshAll: async () => {
        get().refreshBatches();
        get().refreshAnimals();
    },
}));
