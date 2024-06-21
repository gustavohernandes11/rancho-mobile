import { AddAnimal, Animal, PopulatedAnimal, UpdateAnimal } from "./Animal";
import { AddBatch, Batch, PopulatedBatch, UpdateBatch } from "./Batch";
import { Count } from "./Count";

export type OrderByOptions = "alfabetic" | "age";
export type QueryOptions = {
	orderBy?: OrderByOptions;
	batchID?: number;
	searchText?: string;
};

export interface StorageServicesMethods {
	count(): Promise<Count>;

	insertAnimal(animal: AddAnimal): Promise<number | undefined>;
	insertBatch(batch: AddBatch): Promise<number | undefined>;

	getAnimal(animalID: number): Promise<Animal>;
	getPopulatedAnimal(animalID: number): Promise<PopulatedAnimal>;
	getPopulatedBatch(batchID: number): Promise<PopulatedBatch>;

	listAnimals(query?: QueryOptions): Promise<Animal[]>;
	listBatches(): Promise<Batch[]>;

	updateAnimal(updateData: UpdateAnimal | UpdateAnimal[]): Promise<boolean>;
	updateBatch(updateData: UpdateBatch): Promise<boolean>;

	deleteAnimal(animalID: number | number[]): Promise<boolean>;
	deleteBatch(batchID: number): Promise<boolean>;
	deleteBatchWithAnimals(batchID: number): Promise<boolean>;

	moveAnimalToBatch(
		animalIDsToMove: number | number[],
		batchID: number | null
	): Promise<boolean>;

	compareBatchAnimalsWithSelectedAndUpdate(
		animalIDsToCompare: number[],
		batchID: number
	): Promise<boolean>;
}
