import { StorageService } from "database/StorageService";
import { Animal } from "types/Animal";
import { Batch } from "types/Batch";
import { create } from "zustand";

interface GlobalState {
	animals: Animal[];
	setAnimals: (animals: Animal[]) => void;
	refreshAnimals: () => void;
	refreshBatches: () => void;
	batches: Batch[];
	setBatches: (batches: Batch[]) => void;
}

export const useGlobalState = create<GlobalState>()((set) => ({
	animals: [],
	batches: [],
	refreshBatches: async () => {
		StorageService.listAllBatchesInfo().then((batches) =>
			set(() => ({ batches }))
		);
	},
	refreshAnimals: async () => {
		StorageService.listAnimals().then((animals) =>
			set(() => ({ animals }))
		);
	},
	setAnimals: (animals) => set(() => ({ animals })),
	setBatches: (batches) => set(() => ({ batches })),
}));
