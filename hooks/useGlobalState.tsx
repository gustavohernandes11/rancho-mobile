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

	selectedIDs: number[];
	isSelectionMode: boolean;
	setSelectedIDs: (IDs: number[]) => void;
	clearSelection: () => void;
	setIsSelectionMode: (isSelection: boolean) => void;
	toggleCheckID: (ID: number) => void;
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

	selectedIDs: [],
	isSelectionMode: false,
	setSelectedIDs: (IDs: number[]) => set(() => ({ selectedIDs: IDs })),
	clearSelection: () =>
		set(() => ({ selectedIDs: [], isSelectionMode: false })),
	setIsSelectionMode: (isSelection: boolean) =>
		set(() => ({ isSelectionMode: isSelection })),
	toggleCheckID: (ID: number) =>
		set((state) =>
			state.selectedIDs.includes(ID)
				? {
						selectedIDs: state.selectedIDs.filter(
							(itemID) => itemID !== ID
						),
				  }
				: { selectedIDs: [...state.selectedIDs, ID] }
		),
}));
