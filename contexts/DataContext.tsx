import { StorageService } from "database/StorageService";
import { createContext, useState } from "react";
import { Animal } from "types/Animal";
import { Batch } from "types/Batch";

export const DataContext = createContext<
	| {
			animals: Animal[];
			setAnimals: React.Dispatch<React.SetStateAction<Animal[]>>;
			refreshAnimals: () => void;
			refreshBatches: () => void;
			batches: Batch[];
			setBatches: React.Dispatch<React.SetStateAction<Batch[]>>;
	  }
	| undefined
>(undefined);

export const DataProvider: React.FC<any> = ({ children }) => {
	const [animals, setAnimals] = useState<Animal[]>([]);
	const [batches, setBatches] = useState<Batch[]>([]);
	const refreshBatches = async () => {
		const batches = await StorageService.listAllBatchesInfo();
		setBatches(batches);
	};
	const refreshAnimals = async () => {
		const batches = await StorageService.listAnimals();
		setAnimals(batches);
	};
	return (
		<DataContext.Provider
			value={{
				animals,
				setAnimals,
				batches,
				setBatches,
				refreshAnimals,
				refreshBatches,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
