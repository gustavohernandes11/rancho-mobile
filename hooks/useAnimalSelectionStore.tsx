import { Animal } from "types";
import { create } from "zustand";

export type SelectionState = {
    selectedIDs: number[];
    isSelectionMode: boolean;
    setSelectedIDs: (ids: number[]) => void;
    toggleCheckID: (id: number) => void;
    clearSelection: () => void;
    setIsSelectionMode: (isSelectionMode: boolean) => void;
    selectAll: (animals: Animal[]) => void;
};

export const useAnimalSelectionStore = create<SelectionState>(set => ({
    selectedIDs: [],
    isSelectionMode: false,
    setSelectedIDs: ids => set({ selectedIDs: ids }),
    toggleCheckID: id =>
        set(state => ({
            selectedIDs: state.selectedIDs.includes(id)
                ? state.selectedIDs.filter(item => item !== id)
                : [...state.selectedIDs, id],
        })),
    clearSelection: () => set({ selectedIDs: [], isSelectionMode: false }),
    setIsSelectionMode: isSelectionMode => set({ isSelectionMode }),
    selectAll: animals =>
        set({ selectedIDs: animals.map(animal => animal.id) }),
}));
