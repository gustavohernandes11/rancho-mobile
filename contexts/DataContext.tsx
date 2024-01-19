import { StorageService } from "database/StorageService";
import { createContext, useState } from "react";
import { Animal, Batch } from "types";

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
		StorageService.listAllBatchesInfo().then((batches) =>
			setBatches(batches)
		);
	};
	const refreshAnimals = async () => {
		StorageService.listAnimals().then((animals) => setAnimals(animals));
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
