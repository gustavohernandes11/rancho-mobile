import { useEffect, useState } from "react";
import { Animal } from "types/Animal";

export type ControlledAnimalTableProps = {
	selectedIDs: number[];
	isSelectionMode: boolean | undefined;
	setSelectedIDs: React.Dispatch<React.SetStateAction<number[]>>;
	toggleCheckID: (id: number) => void;
	clearSelection: () => void;
	setIsSelectionMode: React.Dispatch<React.SetStateAction<boolean>>;
	selectAll: (animals: Animal[]) => void;
};

export const useAnimalTable = (
	initialSelectedIDs = []
): ControlledAnimalTableProps => {
	const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
	const [isSelectionMode, setIsSelectionMode] = useState(false);

	useEffect(() => {
		setSelectedIDs(initialSelectedIDs);
		setIsSelectionMode(false);
	}, []);

	const toggleCheckID = (id: number) => {
		setSelectedIDs((prevSelectedIDs) =>
			prevSelectedIDs.includes(id)
				? prevSelectedIDs.filter((item) => item !== id)
				: [...prevSelectedIDs, id]
		);
	};

	const clearSelection = () => {
		setSelectedIDs([]);
		setIsSelectionMode(false);
	};

	const selectAll = (animals: Animal[]) => {
		setSelectedIDs(animals.map((animal) => animal.id));
	};

	return {
		selectedIDs,
		isSelectionMode,
		setIsSelectionMode,
		setSelectedIDs,
		toggleCheckID,
		clearSelection,
		selectAll,
	};
};
