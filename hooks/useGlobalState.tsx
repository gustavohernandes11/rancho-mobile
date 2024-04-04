import { StorageService } from "database/StorageService";
import { Animal } from "types/Animal";
import { Batch } from "types/Batch";
import { create } from "zustand";

interface GlobalState {
	animals: Animal[];
	refreshAnimals: () => void;
	refreshBatches: () => void;
	refreshAll: () => void;
	batches: Batch[];
}

export const useGlobalState = create<GlobalState>()((set, get) => ({
	animals: [],
	batches: [],
	refreshBatches: async () => {
		StorageService.listAllBatchesInfo().then((batches) =>
			set(() => ({ batches }))
		);
	},
	refreshAnimals: async () => {
		StorageService.listAnimals({}).then((animals) =>
			set(() => ({ animals }))
		);
	},
	refreshAll: async () => {
		get().refreshBatches();
		get().refreshAnimals();
	},
}));
